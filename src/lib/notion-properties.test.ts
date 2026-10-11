import { describe, expect, it } from "vitest";
import { coverUrl, allowsContributorCredit } from "./notion-properties";

describe("Notion image couverture", () => {
  it("preserves external GIFs", () => {
    expect(coverUrl({ type: "files", files: [{ external: { url: "https://example.org/cover.gif" } }] })).toBe("https://example.org/cover.gif");
  });
  it("reads uploaded files", () => {
    expect(coverUrl({ type: "files", files: [{ file: { url: "https://example.org/upload.gif" } }] })).toBe("https://example.org/upload.gif");
  });
  it("supports a URL property", () => {
    expect(coverUrl({ type: "url", url: "https://example.org/cover.gif" })).toBe("https://example.org/cover.gif");
  });
  it("does not fabricate a missing image", () => {
    expect(coverUrl(undefined)).toBe("");
  });
});

describe("contributor credit consent", () => {
  it("only displays profiles with explicit consent", () => {
    expect(allowsContributorCredit({ "Consentement crédits": { type: "checkbox", checkbox: true } })).toBe(true);
    expect(allowsContributorCredit({ "Consentement crédits": { type: "checkbox", checkbox: false } })).toBe(false);
    expect(allowsContributorCredit({})).toBe(false);
  });
});