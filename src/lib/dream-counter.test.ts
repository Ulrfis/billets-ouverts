import { describe, expect, it } from "vitest";
import { dreamCount, dreamAllowance } from "./dream-counter";

describe("local dream allowance", () => {
  it("allows fewer than three successes and refuses the third", () => {
    expect(dreamAllowance(2, 3)).toBe(true);
    expect(dreamAllowance(3, 3)).toBe(false);
  });
  it("uses the configured limit including zero", () => {
    expect(dreamAllowance(1, 1)).toBe(false);
    expect(dreamAllowance(0, 0)).toBe(false);
  });
  it("starts a new allowance on the next UTC date", () => {
    expect(dreamCount('{"day":"2026-10-13","n":3}', "2026-10-14")).toBe(0);
    expect(dreamCount('{"day":"2026-10-13","n":3}', "2026-10-13")).toBe(3);
  });
  it("ignores malformed and negative counters", () => {
    for (const raw of ['null', '{', '{"day":"2026-10-13","n":-2}', '{"day":"2026-10-13","n":"3"}']) {
      expect(dreamCount(raw, "2026-10-13")).toBe(0);
    }
  });
});