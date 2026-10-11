import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    headers: { Authorization: `Bearer ${key}`, "Notion-Version": NOTION_VERSION },
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json() as Promise<Record<string, unknown>>;
}

async function allBlocks(pageId: string, key: string): Promise<NotionBlock[]> {
  const out: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const q = cursor ? `?page_size=100&start_cursor=${cursor}` : "?page_size=100";
    const d = await notionGet(`/blocks/${pageId}/children${q}`, key);
    out.push(...((d.results as NotionBlock[]) ?? []));
    cursor = d.has_more ? (d.next_cursor as string) : undefined;
  } while (cursor);
  return out;
}

const blockText = (b: NotionBlock): string => {
  const body = b[b.type] as { rich_text?: { plain_text: string }[] } | undefined;
  return (body?.rich_text ?? []).map((t) => t.plain_text).join("").trim();
};

const propText = (p: NotionProp | undefined): string => {
  if (!p) return "";
  const t = p.type;
  if (t === "title") return ((p.title as { plain_text: string }[]) ?? []).map((x) => x.plain_text).join("").trim();
  if (t === "rich_text") return ((p.rich_text as { plain_text: string }[]) ?? []).map((x) => x.plain_text).join("").trim();
  if (t === "select") return ((p.select as { name?: string } | null)?.name) ?? "";
  if (t === "status") return ((p.status as { name?: string } | null)?.name) ?? "";
  if (t === "url") return (p.url as string) ?? "";
  return "";
};

const propNum = (p: NotionProp | undefined): number | null =>
  p?.type === "number" ? ((p.number as number | null) ?? null) : null;

const propRel = (p: NotionProp | undefined): string[] =>
  p?.type === "relation" ? ((p.relation as { id: string }[]) ?? []).map((r) => r.id) : [];

const blockParagraphs = (blocks: NotionBlock[]): string[] =>
  blocks
    .filter((b) => b.type === "paragraph" || b.type === "quote")
    .map(blockText)
    .filter((t) => t && !t.startsWith("🎚️"));

export type NotionDigression = { id: string; title: string; body: string; anchor: string };
export type NotionResonance = {
  id: string; author: string; source: string; year: number | null;
  lang: string; type: string; voice: string; text: string; url: string;
};

export const getNotionContent = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["NOTION_API_KEY"];
  if (!key) return { ok: false as const, reason: "non configuré" };
  try {
    const page = await notionGet(`/pages/${BILLET_PAGE_ID}`, key);
    const props = page.properties as Record<string, NotionProp>;
    const title = propText(props["Titre"]);
    const date = ((props["Date de publication"]?.date as { start?: string } | null)?.start) ?? "";

    // Corps du billet -> sections / passages
    const blocks = await allBlocks(BILLET_PAGE_ID, key);
    const sections: { title: string; paragraphs: string[] }[] = [];
    for (const b of blocks) {
      const text = blockText(b);
      if (!text || text.startsWith("🎚️")) continue;
      if (b.type.startsWith("heading")) sections.push({ title: text, paragraphs: [] });
      else if (b.type === "paragraph" || b.type === "quote") {
        if (!sections.length) sections.push({ title: "", paragraphs: [] });
        sections[sections.length - 1]!.paragraphs.push(text);
      }
    }
    if (!sections.length) return { ok: false as const, reason: "page vide" };

    // Digressions liées (titre, ancre, corps)
    const digressions: NotionDigression[] = [];
    for (const id of propRel(props["Digressions"])) {
      const dp = await notionGet(`/pages/${id}`, key);
      const dprops = dp.properties as Record<string, NotionProp>;
      const dblocks = await allBlocks(id, key);
      digressions.push({
        id,
        title: propText(dprops["Titre"]),
        anchor: propText(dprops["Ancrage — fragment"]),
        body: blockParagraphs(dblocks).join("\n\n"),
      });
    }
    // Injecter les ancres [[dN|fragment]] dans les passages
    digressions.forEach((d, i) => {
      if (!d.anchor) return;
      const needle = d.anchor.toLowerCase();
      for (const s of sections) {
        const pi = s.paragraphs.findIndex((p) => p.toLowerCase().includes(needle));
        if (pi === -1) continue;
        const p = s.paragraphs[pi]!;
        const at = p.toLowerCase().indexOf(needle);
        const frag = p.slice(at, at + d.anchor.length);
        s.paragraphs[pi] = p.slice(0, at) + `[[d${i + 1}|${frag}]]` + p.slice(at + d.anchor.length);
        d.id = `d${i + 1}`;
        break;
      }
    });

    // Résonances liées
    const resonances: NotionResonance[] = [];
    for (const id of propRel(props["Résonances"])) {
      const rp = await notionGet(`/pages/${id}`, key);
      const rprops = rp.properties as Record<string, NotionProp>;
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
      const cprops = cp.properties as Record<string, NotionProp>;
      const t = propText(cprops["Titre"]);
      const c = propText(cprops["Contenu"]);
      if (t || c) carnet.push(c ? `${t} — ${c}` : t);
    }

    // Versions liées
    const versions: { id: string; title: string; paragraphs: string[] }[] = [];
    for (const id of propRel(props["Versions"])) {
      const vp = await notionGet(`/pages/${id}`, key);
      const vprops = vp.properties as Record<string, NotionProp>;
      const vblocks = await allBlocks(id, key);
      versions.push({ id, title: propText(vprops["Titre"]), paragraphs: blockParagraphs(vblocks) });
    }

    return { ok: true as const, title, date, sections, digressions, resonances, carnet, versions };
  } catch (e) {
    return { ok: false as const, reason: String(e) };
  }
});

const DialogueInput = z.object({
  passage: z.string().max(8000),
  context: z.string().max(12000),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .max(30),
});

export const dialogueReply = createServerFn({ method: "POST" })
  .inputValidator((d) => DialogueInput.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["OPENROUTER_API_KEY"];
    if (!key) return { ok: false as const, error: "Dialogue indisponible (clé manquante)." };
    const system = `Tu es la voix d'un essai intitulé « Et si… le cinéma embrassait le web ? » (2019). Tu dialogues avec un lecteur, en français, sur un ton réflexif, ouvert, sans jamais être péremptoire. Tu admets le doute, tu reformules, tu relances par une question. Réponds en 2 à 5 phrases.
Tu t'appuies STRICTEMENT sur les matériaux ci-dessous. Si une question en sort, dis-le simplement et ramène la conversation au passage.

PASSAGE :
${data.passage}

CARNET ET RÉSONANCES VALIDÉES :
${data.context}`;
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "system", content: system }, ...data.messages],
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        return { ok: false as const, error: `OpenRouter ${res.status}: ${t.slice(0, 200)}` };
      }
      const j = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
        usage?: { total_tokens?: number };
      };
      const text = j.choices?.[0]?.message?.content ?? "";
      const cost = ((j.usage?.total_tokens ?? 500) / 1_000_000) * 0.6;
      return { ok: true as const, text, cost };
    } catch (e) {
      return { ok: false as const, error: String(e) };
    }
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
  .inputValidator((d) => z.object({ text: z.string().max(3000) }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["GRADIUM_API_KEY"];
    if (!key) return { ok: false as const, error: "Synthèse vocale indisponible." };
    try {
      const res = await fetch("https://eu.api.gradium.ai/api/post/speech/tts", {
        method: "POST",
        headers: { "x-api-key": key, "Content-Type": "application/json" },
        body: JSON.stringify({
          text: data.text,
          voice_id: process.env["GRADIUM_VOICE_ID"] || "b35yykvVppLXyw_l",
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
