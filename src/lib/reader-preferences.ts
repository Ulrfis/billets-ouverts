export type Universe = "day" | "night";
export type ReadingDose = "quiet" | "interactive";
export type ReaderPreferences = { universe: Universe; dose: ReadingDose; paused: boolean; connected: boolean };

export const READER_KEY = "billets-ouverts-reader-v1";
export const DEFAULT_READER: ReaderPreferences = { universe: "day", dose: "quiet", paused: false, connected: false };

export function readPreferences(raw: string | null): ReaderPreferences {
  try {
    const data: unknown = raw ? JSON.parse(raw) : null;
    if (!data || typeof data !== "object") return { ...DEFAULT_READER };
    const value = data as Record<string, unknown>;
    return {
      universe: value['universe'] === "night" ? "night" : "day",
      dose: value['dose'] === "interactive" ? "interactive" : "quiet",
      paused: value['paused'] === true,
      connected: value['connected'] === true,
    };
  } catch { return { ...DEFAULT_READER }; }
}

export function switchUniverse(prefs: ReaderPreferences): ReaderPreferences {
  return { ...prefs, universe: prefs.universe === "day" ? "night" : "day" };
}