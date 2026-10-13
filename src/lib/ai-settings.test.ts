import { describe, expect, it, vi } from "vitest";
import { completeAi, fallbackSettings, loadAiSettings, parseAiSettings } from "./ai-settings";
import { DREAM_AI, DIALOGUE_AI } from "./ai-config";

const rt = (value: string) => ({ type: "rich_text", rich_text: [{ plain_text: value }] });
const row = (key: string, extra = {}) => ({ properties: { "Clé": { type: "title", title: [{ plain_text: key }] }, ...extra } });

describe("Organique IA settings", () => {
  it("loads dream model and prompt from the explicit usage", () => {
    const settings = parseAiSettings([row("reve.nuit", { "Modèle": rt("anthropic/claude-sonnet-4"), "Prompt système": rt("Transforme les traces du lecteur en une prose sensorielle."), "Température": { number: 0.4 }, "Jetons max": { number: 900 } })], "reve.nuit");
    expect(settings.model).toBe("anthropic/claude-sonnet-4");
    expect(settings.prompt).toBe("Transforme les traces du lecteur en une prose sensorielle.");
    expect(settings.temperature).toBe(0.4);
    expect(settings.maxTokens).toBe(900);
  });
  it("loads dialogue independently without replacing the dream", () => {
    const settings = parseAiSettings([row("dialogue.passage", { "Prompt système": rt("Réponds au lecteur en tenant compte uniquement du passage."), "Modèle": rt("openai/gpt-4.1-mini") })], "dialogue.passage");
    expect(settings.model).toBe("openai/gpt-4.1-mini");
    expect(settings.prompt).not.toBe(DIALOGUE_AI.prompt);
    expect(settings.maxTokens).toBeUndefined();
    expect(parseAiSettings([], "reve.nuit").prompt).toBe(DREAM_AI.prompt);
  });
  it("preserves explicit deactivation and zero daily allowance", () => {
    const settings = parseAiSettings([row("reve.nuit", { "Actif": { type: "checkbox", checkbox: false }, "Usages par jour": { number: 0 } })], "reve.nuit");
    expect(settings.active).toBe(false);
    expect(settings.perDay).toBe(0);
  });
  it("uses current values for missing or invalid fields including the malformed pilot prompt", () => {
    const settings = parseAiSettings([row("reve.nuit", { "Modèle": rt("invalid"), "Prompt système": rt("reve.nuitRêve de nuit à partir des traces choisiesopenai/gpt-4o-mini"), "Température": { number: 8 }, "Traces max": { number: 90 } })], "reve.nuit");
    expect(settings.prompt).toBe(DREAM_AI.prompt);
    expect(settings.model).toBe("openai/gpt-4o-mini");
    expect(settings.maxTraces).toBe(5);
    expect(settings.temperature).toBe(0.9);
  });
  it("loads the dream's limits, words, voice and version", () => {
    const settings = parseAiSettings([row("reve.nuit", { "Traces max": { number: 2 }, "Usages par jour": { number: 1 }, "Mots min": { number: 100 }, "Mots max": { number: 200 }, "Voix": rt("test_voice"), "Version": rt("v2") })], "reve.nuit");
    expect(settings).toMatchObject({ maxTraces: 2, perDay: 1, minWords: 100, maxWords: 200, voice: "test_voice", version: "v2" });
  });
  it("falls back for absent or duplicate usage rows", () => {
    expect(parseAiSettings([], "reve.nuit")).toEqual(fallbackSettings("reve.nuit"));
    expect(parseAiSettings([row("reve.nuit"), row("reve.nuit")], "reve.nuit").source).toBe("fallback");
  });
  it("falls back on a Notion failure for both usages", async () => {
    const request = vi.fn().mockRejectedValue(new Error("offline"));
    expect(await loadAiSettings("reve.nuit", "test-key", request)).toEqual(fallbackSettings("reve.nuit"));
    expect(await loadAiSettings("dialogue.passage", "test-key", request)).toEqual(fallbackSettings("dialogue.passage"));
  });
  it("queries only the requested data source usage and falls back for HTTP errors", async () => {
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ results: [row("reve.nuit", { "Modèle": rt("openai/gpt-4.1-mini") })] })));
    expect((await loadAiSettings("reve.nuit", "test-key", request)).model).toBe("openai/gpt-4.1-mini");
    expect(JSON.parse(request.mock.calls[0]?.[1].body)).toEqual({ filter: { property: "Clé", title: { equals: "reve.nuit" } }, page_size: 2 });
    request.mockResolvedValue(new Response("unavailable", { status: 503 }));
    expect((await loadAiSettings("dialogue.passage", "test-key", request)).source).toBe("fallback");
  });
  it("uses the configured backup model when the primary fails", async () => {
    const request = vi.fn().mockResolvedValueOnce(new Response("unavailable", { status: 503 })).mockResolvedValueOnce(new Response(JSON.stringify({ choices: [{ message: { content: "Réponse du secours" } }] })));
    const settings = { ...fallbackSettings("reve.nuit"), fallbackModel: "openai/gpt-4.1-mini" };
    const result = await completeAi(settings, "test-key", [], request);
    expect(result).toMatchObject({ ok: true, model: "openai/gpt-4.1-mini", text: "Réponse du secours" });
    expect(request).toHaveBeenCalledTimes(2);
  });
});