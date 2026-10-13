import { DREAM_AI, DIALOGUE_AI, type AiUsage } from "./ai-config";

export const AI_DATA_SOURCE = "c66462b5-fbf0-404d-9527-1a96b864bdf5";
export type AiKey = "reve.nuit" | "dialogue.passage";
export type AiSettings = AiUsage & { source: "notion" | "fallback" };
type Property = { type?: string; title?: { plain_text?: string; text?: { content?: string } }[]; rich_text?: { plain_text?: string; text?: { content?: string } }[]; number?: number | null; checkbox?: boolean };
type Row = { properties?: Record<string, Property>; archived?: boolean; in_trash?: boolean };
const text = (p?: Property) => (p?.title ?? p?.rich_text ?? []).map(t => t.plain_text ?? t.text?.content ?? "").join("").trim();
const model = (value: string) => /^[a-zA-Z0-9_.:-]+\/[a-zA-Z0-9_.:/-]+$/.test(value);

export function fallbackSettings(key: AiKey): AiSettings {
  return { ...(key === "reve.nuit" ? DREAM_AI : DIALOGUE_AI), source: "fallback" };
}

export function parseAiSettings(rows: Row[], key: AiKey): AiSettings {
  const fallback = fallbackSettings(key);
  const matches = rows.filter(r => !r.archived && !r.in_trash && text(r.properties?.["Clé"]) === key);
  if (matches.length !== 1) return fallback;
  const p = matches[0]?.properties;
  if (!p) return fallback;
  const result: AiSettings = { ...fallback, source: "notion" };
  if (p["Actif"]?.type === "checkbox" && typeof p["Actif"].checkbox === "boolean") result.active = p["Actif"].checkbox;
  const chosenModel = text(p["Modèle"]);
  if (model(chosenModel)) result.model = chosenModel;
  const backup = text(p["Modèle de secours"]);
  if (model(backup)) result.fallbackModel = backup;
  const prompt = text(p["Prompt système"]);
  // Reject a known malformed cell containing concatenated key/usage/model metadata.
  if (prompt.length >= 20 && prompt.length <= 16000 && !prompt.startsWith(key)) result.prompt = prompt;
  const fields = [
    ["Température", "temperature", 0, 2, false], ["Jetons max", "maxTokens", 1, 16000, true],
    ["Mots min", "minWords", 1, 3000, true], ["Mots max", "maxWords", 1, 3000, true],
    ["Traces max", "maxTraces", 1, 5, true], ["Usages par jour", "perDay", 0, 100, true],
  ] as const;
  for (const [name, field, min, max, integer] of fields) {
    const n = p[name]?.number;
    if (typeof n === "number" && Number.isFinite(n) && n >= min && n <= max && (!integer || Number.isInteger(n))) result[field] = n;
  }
  if (result.minWords !== undefined && result.maxWords !== undefined && result.minWords > result.maxWords) {
    delete result.minWords; delete result.maxWords;
    if (fallback.minWords !== undefined) result.minWords = fallback.minWords;
    if (fallback.maxWords !== undefined) result.maxWords = fallback.maxWords;
  }
  const voice = text(p["Voix"]);
  if (/^[\w-]{1,150}$/.test(voice)) result.voice = voice;
  result.version = text(p["Version"]).slice(0, 150);
  return result;
}

export async function loadAiSettings(key: AiKey, notionKey?: string, request: typeof fetch = fetch): Promise<AiSettings> {
  if (!notionKey) return fallbackSettings(key);
  try {
    const response = await request(`https://api.notion.com/v1/data_sources/${AI_DATA_SOURCE}/query`, {
      method: "POST", headers: { Authorization: `Bearer ${notionKey}`, "Notion-Version": "2025-09-03", "Content-Type": "application/json" },
      body: JSON.stringify({ filter: { property: "Clé", title: { equals: key } }, page_size: 2 }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return fallbackSettings(key);
    const body = await response.json() as { results?: Row[]; has_more?: boolean };
    if (!Array.isArray(body.results) || body.has_more) return fallbackSettings(key);
    return parseAiSettings(body.results, key);
  } catch { return fallbackSettings(key); }
}

export function dreamPrompt(settings: AiSettings): string {
  const prompt = settings.prompt.replace(/Écris entre \d+ et \d+ mots,?/g, "");
  return `${prompt}\nLongueur visée : entre ${settings.minWords ?? 150} et ${settings.maxWords ?? 250} mots.`;
}

export async function completeAi(settings: AiSettings, key: string, messages: { role: string; content: string }[], request: typeof fetch = fetch) {
  const models = [settings.model, settings.fallbackModel].filter((m): m is string => Boolean(m));
  for (const [index, selected] of [...new Set(models)].entries()) {
    try {
      const res = await request("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: selected, temperature: settings.temperature, max_tokens: settings.maxTokens, messages }),
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) { console.error("OpenRouter completion failed", res.status); continue; }
      const body = await res.json() as { choices?: { message?: { content?: string } }[]; usage?: { total_tokens?: number } };
      const text = body.choices?.[0]?.message?.content?.trim();
      if (text) return { ok: true as const, text, model: selected, cost: ((body.usage?.total_tokens ?? 500) / 1_000_000) * 0.6 };
    } catch { console.error("OpenRouter completion unavailable", index); }
  }
  return { ok: false as const, error: "L’IA est momentanément indisponible. Réessayez plus tard." };
}