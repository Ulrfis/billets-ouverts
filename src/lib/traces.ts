export type TraceKind = "passage" | "mot-clé";
export type Trace = {
  id: string;
  kind: TraceKind;
  passageId: string;
  text: string;
  excerpt: string;
  createdAt: string;
};

export const TRACES_VERSION = 1;

/** Removes digression markers like [[d1|label]] → label and collapses spaces. */
export function cleanPassageText(text: string): string {
  return text.replace(/\[\[\w+\|([^\]]+)\]\]/g, "$1").replace(/\s+/g, " ").trim();
}

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function hasTrace(traces: Trace[], kind: TraceKind, passageId: string, text: string): boolean {
  return traces.some((t) => t.kind === kind && t.passageId === passageId && norm(t.text) === norm(text));
}

/** Adds a trace unless the same kind/passage/text already exists (accents and case ignored). */
export function addTrace(traces: Trace[], input: Omit<Trace, "id" | "createdAt">, id: string, now: string): Trace[] {
  const text = input.text.trim();
  if (!text || hasTrace(traces, input.kind, input.passageId, text)) return traces;
  return [{ ...input, text, id, createdAt: now }, ...traces];
}

export function removeTrace(traces: Trace[], id: string): Trace[] {
  return traces.filter((t) => t.id !== id);
}

export function searchTraces(traces: Trace[], query: string): Trace[] {
  const q = norm(query);
  if (!q) return traces;
  return traces.filter((t) => norm(t.text).includes(q) || norm(t.excerpt).includes(q));
}

/** Accepts stored data defensively; invalid entries are dropped instead of breaking reading. */
export function normalizeTraces(raw: unknown): Trace[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is Trace =>
    !!t && typeof t === "object" &&
    typeof (t as Trace).id === "string" &&
    ((t as Trace).kind === "passage" || (t as Trace).kind === "mot-clé") &&
    typeof (t as Trace).passageId === "string" &&
    typeof (t as Trace).text === "string" &&
    typeof (t as Trace).excerpt === "string" &&
    typeof (t as Trace).createdAt === "string");
}
