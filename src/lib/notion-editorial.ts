export type EditorialSpan = {
  text: string;
  href: string | null;
  pageId: string | null;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  code: boolean;
};
export type EditorialBlock = {
  id: string;
  type: string;
  spans: EditorialSpan[];
  children: EditorialBlock[];
  url: string | null;
  caption: EditorialSpan[];
  targetPageId: string | null;
  checked: boolean;
};
export type EditorialFragment = { blockId: string; excerpt: string; keyword: string; url: string | null; start: number };
type Raw = Record<string, unknown>;
const record = (value: unknown): Raw => value && typeof value === "object" ? value as Raw : {};
export function safeEditorialUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; }
}
export function notionPageId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const raw = value.replace(/-/g, "");
  if (/^[a-f0-9]{32}$/i.test(raw)) return raw.toLowerCase();
  try {
    const url = new URL(value);
    if (!(url.hostname === "notion.so" || url.hostname.endsWith(".notion.so") || url.hostname.endsWith(".notion.site"))) return null;
    const match = url.pathname.match(/([a-f0-9]{32}|[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})\/?$/i);
    return match?.[1]?.replace(/-/g, "").toLowerCase() ?? null;
  } catch { return null; }
}
export function editorialSpans(value: unknown): EditorialSpan[] {
  if (!Array.isArray(value)) return [];
  return value.map((raw) => {
    const item = record(raw), annotations = record(item['annotations']), text = record(item['text']);
    const pageId = notionPageId(record(record(item['mention'])['page'])['id']);
    return { text: typeof item['plain_text'] === "string" ? item['plain_text'] : typeof text['content'] === "string" ? text['content'] : "",
      href: safeEditorialUrl(item['href'] ?? record(text['link'])['url']), pageId,
      bold: annotations['bold'] === true, italic: annotations['italic'] === true, underline: annotations['underline'] === true,
      strike: annotations['strikethrough'] === true, code: annotations['code'] === true };
  });
}
export const editorialText = (block: EditorialBlock): string => block.spans.map((span) => span.text).join("");
export function parseEditorialBlock(raw: Raw, children: EditorialBlock[] = []): EditorialBlock {
  const type = typeof raw['type'] === "string" ? raw['type'] : "unsupported";
  const body = record(raw[type]);
  const spans = editorialSpans(body['rich_text']);
  const file = record(body[typeof body['type'] === "string" ? body['type'] : "external"]);
  const url = safeEditorialUrl(body['url'] ?? file['url']);
  // A callout links through its own text or a direct child line (e.g. a page mention at the bottom of the box).
  const linkSpans = [...spans, ...children.filter((child) => child.type === "paragraph").flatMap((child) => child.spans)];
  const targetPageId = type === "callout" ? linkSpans.map((span) => span.pageId ?? notionPageId(span.href)).find((id) => id !== null) ?? null : null;
  return { id: typeof raw['id'] === "string" ? raw['id'] : "", type, spans, children, url,
    caption: editorialSpans(body['caption']), targetPageId, checked: body['checked'] === true };
}
export function flattenEditorialBlocks(blocks: EditorialBlock[]): EditorialBlock[] {
  return blocks.flatMap((block) => [block, ...flattenEditorialBlocks(block.children)]);
}
export function exactFragment(block: EditorialBlock, excerpt: string, keyword: string, url: unknown = null): EditorialFragment | null {
  const text = editorialText(block);
  if (!excerpt) return null;
  const start = text.indexOf(excerpt);
  if (start < 0 || text.indexOf(excerpt, start + 1) !== -1) return null;
  return { blockId: block.id, excerpt, keyword, url: safeEditorialUrl(url), start };
}
// Only this explicit editorial prefix is eligible; ordinary comments and authors never leave the server.
export function fragmentFromComment(block: EditorialBlock, text: string): EditorialFragment | null {
  const prefix = "billet-fragment:";
  if (!text.startsWith(prefix)) return null;
  try {
    const data = record(JSON.parse(text.slice(prefix.length)));
    if (typeof data['extrait'] !== "string" || typeof data['motCle'] !== "string") return null;
    return exactFragment(block, data['extrait'], data['motCle'], data['lien']);
  } catch { return null; }
}
export function allowedCalloutTarget(blocks: EditorialBlock[], blockId: string, rootId: string): string | null {
  const block = flattenEditorialBlocks(blocks).find((item) => item.id === blockId && item.type === "callout");
  const target = block?.targetPageId;
  return target && target !== notionPageId(rootId) ? target : null;
}