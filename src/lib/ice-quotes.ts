import type { NotionProperty } from "./notion-properties";

export type IceQuote = { id: string; text: string; year: number | null };

/** Only the explicitly requested public fields; no thesis, notes or contact fields. */
export function iceQuoteFromNotion(row: { id?: unknown; properties?: unknown }): IceQuote | null {
  if (typeof row.id !== "string" || !row.properties || typeof row.properties !== "object") return null;
  const props = row.properties as Record<string, NotionProperty>;
  const citation = props["Citation"];
  if (citation?.type !== "rich_text" || !Array.isArray(citation["rich_text"])) return null;
  const text = citation["rich_text"].map((part: unknown) => {
    if (!part || typeof part !== "object") return "";
    const span = part as { plain_text?: unknown; text?: { content?: unknown } };
    return typeof span.plain_text === "string" ? span.plain_text : typeof span.text?.content === "string" ? span.text.content : "";
  }).join("");
  if (!text.trim()) return null;
  const year = props["Année"]?.type === "number" ? props["Année"]["number"] : null;
  return { id: row.id, text, year: typeof year === "number" && Number.isFinite(year) ? year : null };
}