import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { completeAi, dreamPrompt, loadAiSettings } from "./ai-settings";
import { coverUrl, allowsContributorCredit } from "./notion-properties";
import { iceQuoteFromNotion, type IceQuote } from "./ice-quotes";
import { allowedCalloutTarget, editorialText, exactFragment, flattenEditorialBlocks, fragmentFromComment, parseEditorialBlock, type EditorialBlock, type EditorialFragment } from "./notion-editorial";

export const getFeatureStatus = createServerFn({ method: "GET" }).handler(async () => ({
  dialogue: !!process.env["OPENROUTER_API_KEY"],
  stt: !!process.env["DEEPGRAM_API_KEY"],
  tts: !!process.env["GRADIUM_API_KEY"],
  notion: !!process.env["NOTION_API_KEY"],
}));

// ----- Notion (clé d'intégration directe, api.notion.com) -----

const NOTION_VERSION = "2025-09-03";
// Billet « Et si… le cinéma embrassait le web ? » dans la base « Billets ouverts depuis Wordpress »
const BILLET_PAGE_ID = "3f651168-2fc3-8163-9bc3-f108577ca8b8";

type NotionBlock = { type: string; [k: string]: unknown };
type NotionProp = { type: string; [k: string]: unknown };

async function notionGet(path: string, key: string) {
  // Retry rate limits and transient errors so one hiccup does not drop the whole billet.
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      headers: { Authorization: `Bearer ${key}`, "Notion-Version": NOTION_VERSION },
    });
    if (res.ok) return res.json() as Promise<Record<string, unknown>>;
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt >= 3) throw new Error(`Notion ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const wait = Number(res.headers.get("retry-after")) * 1000 || 400 * 2 ** attempt;
    await new Promise((r) => setTimeout(r, Math.min(wait, 3000)));
  }
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) { const i = next++; out[i] = await fn(items[i] as T); }
  }));
  return out;
}

async function allBlocks(pageId: string, key: string): Promise<NotionBlock[]> {
  const out: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const q = cursor ? `?page_size=100&start_cursor=${cursor}` : "?page_size=100";
    const d = await notionGet(`/blocks/${pageId}/children${q}`, key);
    out.push(...((d["results"] as NotionBlock[]) ?? []));
    cursor = d["has_more"] ? (d["next_cursor"] as string) : undefined;
  } while (cursor);
  return out;
}

async function editorialTree(pageId: string, key: string, depth = 0, budget = { remaining: 800 }, top?: NotionBlock[]): Promise<EditorialBlock[]> {
  if (depth > 8 || budget.remaining <= 0) throw new Error("Notion editorial tree exceeds safe reading bounds");
  const blocks = top ?? await allBlocks(pageId, key);
  budget.remaining -= blocks.length;
  if (budget.remaining < 0) throw new Error("Notion editorial tree exceeds safe reading bounds");
  return mapLimit(blocks, 6, async (block) => {
    const children = block['has_children'] === true && typeof block['id'] === "string"
      ? await editorialTree(block['id'], key, depth + 1, budget) : [];
    return parseEditorialBlock(block, children);
  });
}

async function editorialFragments(blocks: EditorialBlock[], props: Record<string, NotionProp>, key: string) {
  const fragments: EditorialFragment[] = [];
  const flat = flattenEditorialBlocks(blocks);
  let comments: "available" | "unavailable" = "available";
  try {
    // Probe once; a missing comments capability must not make the article fail.
    await notionGet(`/comments?block_id=${BILLET_PAGE_ID}&page_size=100`, key);
    for (const block of flat.filter((item) => item.spans.length > 0)) {
      let cursor: string | undefined;
      do {
        const data = await notionGet(`/comments?block_id=${block.id}&page_size=100${cursor ? `&start_cursor=${encodeURIComponent(cursor)}` : ""}`, key);
        for (const raw of (data['results'] as Record<string, unknown>[] ?? [])) {
          const text = ((raw['rich_text'] as { plain_text: string }[] ?? [])).map((item) => item.plain_text).join("");
          const fragment = fragmentFromComment(block, text);
          if (fragment) fragments.push(fragment);
        }
        cursor = data['has_more'] ? data['next_cursor'] as string : undefined;
      } while (cursor);
    }
  } catch { comments = "unavailable"; }
  // Explicitly related fallback rows only; no general database search or private comments returned.
  for (const id of propRel(props['Repères éditoriaux'])) {
    try {
      const page = await notionGet(`/pages/${id}`, key);
      const fields = page['properties'] as Record<string, NotionProp>;
      const blockId = propText(fields['Bloc']);
      const block = flat.find((item) => item.id.replace(/-/g, "") === blockId.replace(/-/g, ""));
      if (!block) continue;
      const fragment = exactFragment(block, propText(fields['Extrait exact']), propText(fields['Mot-clé']), propText(fields['Lien']));
      if (fragment) fragments.push(fragment);
    } catch { /* unavailable editorial row does not interrupt reading */ }
  }
  return { fragments, comments };
}

const blockText = (b: NotionBlock): string => {
  const body = b[b.type] as { rich_text?: { plain_text: string }[] } | undefined;
  return (body?.rich_text ?? []).map((t) => t.plain_text).join("").trim();
};

const propText = (p: NotionProp | undefined): string => {
  if (!p) return "";
  const t = p.type;
  if (t === "title") return ((p["title"] as { plain_text: string }[]) ?? []).map((x) => x.plain_text).join("").trim();
  if (t === "rich_text") return ((p["rich_text"] as { plain_text: string }[]) ?? []).map((x) => x.plain_text).join("").trim();
  if (t === "select") return ((p["select"] as { name?: string } | null)?.name) ?? "";
  if (t === "status") return ((p["status"] as { name?: string } | null)?.name) ?? "";
  if (t === "url") return (p["url"] as string) ?? "";
  return "";
};

const propNum = (p: NotionProp | undefined): number | null =>
  p?.type === "number" ? ((p["number"] as number | null) ?? null) : null;

const propRel = (p: NotionProp | undefined): string[] =>
  p?.type === "relation" ? ((p["relation"] as { id: string }[]) ?? []).map((r) => r.id) : [];

const blockParagraphs = (blocks: NotionBlock[]): string[] =>
  blocks
    .filter((b) => b.type === "paragraph" || b.type === "quote")
    .map(blockText)
    .filter((t) => t && !t.startsWith("🎚️"));

export type NotionDigression = { id: string; title: string; body: string; anchor: string };
export type NotionContributor = { id: string; name: string; role: string; text: string; url: string };
export type NotionResonance = {
  id: string; author: string; source: string; year: number | null;
  lang: string; type: string; voice: string; text: string; url: string;
};

// Explicitly authorized corpus for the day world, independently of pilot relations.
const RESONANCES_SOURCE_ID = "271cf312-2a64-4dd5-8f29-df9b5e5d684f";
export const getIceQuotes = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["NOTION_API_KEY"];
  if (!key) return { ok: false as const, quotes: [] as IceQuote[] };
  try {
    const quotes: IceQuote[] = [];
    let cursor: string | undefined;
    // Bounded pagination; only Citation and Année leave the server.
    for (let batch = 0; batch < 10; batch++) {
      const response = await fetch(`https://api.notion.com/v1/data_sources/${RESONANCES_SOURCE_ID}/query`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Notion-Version": NOTION_VERSION, "Content-Type": "application/json" },
        body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}), sorts: [{ property: "Année", direction: "ascending" }] }),
      });
      if (!response.ok) throw new Error("Résonances unavailable");
      const data = await response.json() as { results?: { id?: unknown; properties?: unknown }[]; has_more?: boolean; next_cursor?: string };
      for (const row of data.results ?? []) {
        const quote = iceQuoteFromNotion(row);
        if (quote) quotes.push(quote);
      }
      if (!data.has_more) return { ok: true as const, quotes };
      cursor = data.next_cursor;
      if (!cursor) throw new Error("Résonances pagination incomplete");
    }
    throw new Error("Résonances reading budget exceeded");
  } catch (error) {
    console.error("Résonances read failed", error instanceof Error ? error.message : "unknown");
    return { ok: false as const, quotes: [] as IceQuote[] };
  }
});

export const getNotionContent = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["NOTION_API_KEY"];
  if (!key) return { ok: false as const, reason: "non configuré" };
  try {
    const page = await notionGet(`/pages/${BILLET_PAGE_ID}`, key);
    const props = page["properties"] as Record<string, NotionProp>;
    const title = propText(props["Titre"]);
    const date = ((props["Date de publication"]?.["date"] as { start?: string } | null)?.start) ?? "";
    const imageProperty = Object.entries(props).find(([name]) => name.toLowerCase().trim() === "image couverture")?.[1];
    const cover = coverUrl(imageProperty);

    // Corps du billet -> sections / passages
    const editorialBlocks = await editorialTree(BILLET_PAGE_ID, key);
    const editorial = await editorialFragments(editorialBlocks, props, key);
    const blocks = await allBlocks(BILLET_PAGE_ID, key);
    const sections: { title: string; paragraphs: string[] }[] = [];
    for (const b of blocks) {
      const text = blockText(b);
      if (!text || text.startsWith("🎚️")) continue;
      if (b.type.startsWith("heading")) sections.push({ title: text, paragraphs: [] });
      else if (b.type === "paragraph" || b.type === "quote") {
        if (!sections.length) sections.push({ title: "", paragraphs: [] });
        sections.at(-1)?.paragraphs.push(text);
      }
    }
    if (!sections.length) return { ok: false as const, reason: "page vide" };

    // Digressions liées (titre, ancre, corps)
    const digressions: NotionDigression[] = [];
    for (const id of propRel(props["Digressions"])) {
      const dp = await notionGet(`/pages/${id}`, key);
      const dprops = dp["properties"] as Record<string, NotionProp>;
      const dblocks = await allBlocks(id, key);
      digressions.push({
        id,
        title: propText(dprops["Titre"]),
        anchor: propText(dprops["Ancrage — fragment"]),
        body: blockParagraphs(dblocks).join("\n\n"),
      });
    }
    // Digression anchors remain separate from the original sentences.

    // Résonances liées
    const resonances: NotionResonance[] = [];
    for (const id of propRel(props["Résonances"])) {
      const rp = await notionGet(`/pages/${id}`, key);
      const rprops = rp["properties"] as Record<string, NotionProp>;
      resonances.push({
        id,
        author: propText(rprops["Auteur"]),
        source: propText(rprops["Titre"]),
        year: propNum(rprops["Année"]),
        lang: propText(rprops["Langue"]) || "FR",
        type: (propText(rprops["Type"]) || "prolongement").toLowerCase(),
        voice: (propText(rprops["Type de voix"]) || "auteur reconnu").toLowerCase(),
        text: propText(rprops["Citation"]) || propText(rprops["Thèse"]),
        url: propText(rprops["URL"]),
      });
    }

    // Carnet lié
    const carnet: string[] = [];
    for (const id of propRel(props["Carnet"])) {
      const cp = await notionGet(`/pages/${id}`, key);
      const cprops = cp["properties"] as Record<string, NotionProp>;
      const t = propText(cprops["Titre"]);
      const c = propText(cprops["Contenu"]) || blockParagraphs(await allBlocks(id, key)).join("\n\n");
      if (t || c) carnet.push(c ? `${t} — ${c}` : t);
    }

    // Seuls les profils explicitement liés sont lus ; aucun email n'est exposé.
    const contributorIds = new Set(Object.entries(props)
      .filter(([name]) => /^(contributeurs?|contributors?)$/i.test(name.trim()))
      .flatMap(([, property]) => propRel(property)));
    for (const id of propRel(props["Contributions"])) {
      const contribution = await notionGet(`/pages/${id}`, key);
      const fields = contribution["properties"] as Record<string, NotionProp>;
      for (const personId of propRel(fields["Contributeur"])) contributorIds.add(personId);
    }
    const contributors: NotionContributor[] = [];
    for (const id of contributorIds) {
      const person = await notionGet(`/pages/${id}`, key);
      const fields = person["properties"] as Record<string, NotionProp>;
      if (!allowsContributorCredit(fields)) continue;
      const name = propText(fields["Nom affiché"]);
      if (name) contributors.push({ id, name, role: propText(fields["Rôle"]), text: "", url: propText(fields["Lien public"]) });
    }

    // Versions liées
    const versions: { id: string; title: string; paragraphs: string[] }[] = [];
    for (const id of propRel(props["Versions"])) {
      const vp = await notionGet(`/pages/${id}`, key);
      const vprops = vp["properties"] as Record<string, NotionProp>;
      const vblocks = await allBlocks(id, key);
      versions.push({ id, title: propText(vprops["Titre"]), paragraphs: blockParagraphs(vblocks) });
    }

    return { ok: true as const, title, date, cover, sections, editorialBlocks, ...editorial, digressions, resonances, carnet, contributors, versions };
  } catch (e) {
    return { ok: false as const, reason: String(e) };
  }
});

export const getNotionCallout = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ blockId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const key = process.env['NOTION_API_KEY'];
    if (!key) return { ok: false as const, error: "Cette page n’est pas disponible pour le moment." };
    try {
      // Re-read the pilot to authorize the block and its explicit destination on the server.
      const blocks = await editorialTree(BILLET_PAGE_ID, key);
      const target = allowedCalloutTarget(blocks, data.blockId, BILLET_PAGE_ID);
      if (!target) return { ok: false as const, error: "Cette page ne peut pas être ouverte depuis ce billet." };
      const page = await notionGet(`/pages/${target}`, key);
      const props = page['properties'] as Record<string, NotionProp>;
      const title = Object.values(props).filter((property) => property.type === "title").map(propText).join("") || "Page liée";
      const content = await editorialTree(target, key);
      return { ok: true as const, title, blocks: content };
    } catch (error) {
      console.error("Notion linked page unavailable", error instanceof Error ? error.message : "unknown");
      return { ok: false as const, error: "La page liée est indisponible. Vous pouvez poursuivre la lecture." };
    }
  });

const DialogueInput = z.object({
  passage: z.string().max(8000),
  context: z.string().max(12000),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .max(30),
});

export const getDreamSettings = createServerFn({ method: "GET" }).handler(async () => {
  const settings = await loadAiSettings("reve.nuit", process.env["NOTION_API_KEY"]);
  return { active: settings.active !== false, maxTraces: settings.maxTraces ?? 5, perDay: settings.perDay ?? 3, source: settings.source, version: settings.version ?? "" };
});

export const dialogueReply = createServerFn({ method: "POST" })
  .inputValidator((d) => DialogueInput.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["OPENROUTER_API_KEY"];
    if (!key) return { ok: false as const, error: "Dialogue indisponible (clé manquante)." };
    const settings = await loadAiSettings("dialogue.passage", process.env["NOTION_API_KEY"]);
    if (settings.active === false) return { ok: false as const, error: "Le dialogue est désactivé pour le moment." };
    const system = `${settings.prompt}
PASSAGE :
${data.passage}

CARNET ET RÉSONANCES VALIDÉES :
${data.context}`;
    return completeAi(settings, key, [{ role: "system", content: system }, ...data.messages]);
  });

export const generateDream = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ traces: z.array(z.string().min(1).max(1200)).min(1).max(5) }).parse(d),
  )
  .handler(async ({ data }) => {
    const key = process.env["OPENROUTER_API_KEY"];
    if (!key) return { ok: false as const, error: "Le rêve est indisponible (clé OpenRouter manquante)." };
    const settings = await loadAiSettings("reve.nuit", process.env["NOTION_API_KEY"]);
    if (settings.active === false) return { ok: false as const, error: "Le rêve est désactivé pour le moment." };
    if (data.traces.length > (settings.maxTraces ?? 5)) return { ok: false as const, error: `Choisissez au plus ${settings.maxTraces ?? 5} traces pour ce rêve.` };
    return completeAi(settings, key, [
      { role: "system", content: dreamPrompt(settings) },
      { role: "user", content: data.traces.map((t, i) => `Trace ${i + 1} : ${t}`).join("\n\n") },
    ]);
  });

export const transcribe = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ audio: z.string().max(15_000_000), mime: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["DEEPGRAM_API_KEY"];
    if (!key) return { ok: false as const, error: "Transcription indisponible." };
    const bin = Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0));
    const res = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-2&language=fr&smart_format=true",
      { method: "POST", headers: { Authorization: `Token ${key}`, "Content-Type": data.mime }, body: bin },
    );
    if (!res.ok) return { ok: false as const, error: `Deepgram ${res.status}` };
    const j = (await res.json()) as {
      results?: { channels?: { alternatives?: { transcript?: string }[] }[] };
    };
    return { ok: true as const, text: j.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? "" };
  });

export const speak = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ text: z.string().max(3000), usage: z.enum(["reve.nuit", "dialogue.passage"]).default("dialogue.passage") }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["GRADIUM_API_KEY"];
    if (!key) return { ok: false as const, error: "Synthèse vocale indisponible." };
    const settings = await loadAiSettings(data.usage, process.env["NOTION_API_KEY"]);
    if (settings.active === false) return { ok: false as const, error: "Cet usage est désactivé pour le moment." };
    try {
      const res = await fetch("https://eu.api.gradium.ai/api/post/speech/tts", {
        method: "POST",
        headers: { "x-api-key": key, "Content-Type": "application/json" },
        body: JSON.stringify({
          text: data.text,
          voice_id: settings.voice || process.env["GRADIUM_VOICE_ID"] || "b35yykvVppLXyw_l",
          output_format: "wav",
          only_audio: true,
        }),
      });
      if (!res.ok) return { ok: false as const, error: `Gradium ${res.status}: ${(await res.text()).slice(0, 200)}` };
      const buf = new Uint8Array(await res.arrayBuffer());
      let s = "";
      for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      return { ok: true as const, audio: btoa(s), mime: res.headers.get("content-type") || "audio/wav" };
    } catch (e) {
      return { ok: false as const, error: String(e) };
    }
  });
