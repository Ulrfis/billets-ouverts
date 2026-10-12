import { describe, expect, it } from "vitest";
import { DEFAULT_READER, readPreferences, switchUniverse } from "./reader-preferences";

describe("Reader preferences", () => {
  it("starts in the day, without distraction, without an account", () => {
    expect(readPreferences(null)).toEqual({ universe: "day", dose: "quiet", paused: false, connected: false });
  });
  it("only switches universe when explicitly asked and preserves reading choices", () => {
    const start = { ...DEFAULT_READER, dose: "interactive" as const, connected: true };
    expect(switchUniverse(start)).toEqual({ ...start, universe: "night" });
    expect(switchUniverse(switchUniverse(start))).toEqual(start);
  });
  it("restores night and the chosen reading dose after reloading", () => {
    const stored = { universe: "night", dose: "interactive", paused: true, connected: true };
    expect(readPreferences(JSON.stringify(stored))).toEqual(stored);
  });
  it("falls back safely when storage is corrupted", () => {
    expect(readPreferences("broken")).toEqual(DEFAULT_READER);
    expect(readPreferences('{"universe":"automatic","dose":"unknown"}')).toEqual(DEFAULT_READER);
  });
});