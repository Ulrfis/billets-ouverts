import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getFeatureStatus = createServerFn({ method: "GET" }).handler(async () => ({
  dialogue: !!process.env["OPENROUTER_API_KEY"],
  stt: !!process.env["DEEPGRAM_API_KEY"],
  tts: !!process.env["GRADIUM_API_KEY"],
  notion: !!process.env["NOTION_API_KEY"] && !!process.env["NOTION_PAGE_ID"],
}));

type NotionBlock = {
  type: string;
  [k: string]: unknown;
};

export const getNotionContent = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["NOTION_API_KEY"];
  const lovable = process.env["LOVABLE_API_KEY"];
  const pageId = process.env["NOTION_PAGE_ID"];
  if (!key || !lovable || !pageId) return { ok: false as const, reason: "non configuré" };
  try {
    const res = await fetch(
      `https://connector-gateway.lovable.dev/notion/v1/blocks/${pageId}/children?page_size=100`,
      {
        headers: {
          Authorization: `Bearer ${lovable}`,
          "X-Connection-Api-Key": key,
          "Notion-Version": "2025-09-03",
        },
      },
    );
    if (!res.ok) return { ok: false as const, reason: `Notion ${res.status}` };
    const data = (await res.json()) as { results: NotionBlock[] };
    const sections: { title: string; paragraphs: string[] }[] = [];
    for (const b of data.results) {
      const body = b[b.type] as { rich_text?: { plain_text: string }[] } | undefined;
      const text = (body?.rich_text ?? []).map((t) => t.plain_text).join("").trim();
      if (!text) continue;
      if (b.type.startsWith("heading")) sections.push({ title: text, paragraphs: [] });
      else if (b.type === "paragraph") {
        if (!sections.length) sections.push({ title: "", paragraphs: [] });
        sections[sections.length - 1]!.paragraphs.push(text);
      }
    }
    if (!sections.length) return { ok: false as const, reason: "page vide" };
    return { ok: true as const, sections };
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
