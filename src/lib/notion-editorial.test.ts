import { describe, expect, it } from "vitest";
import { allowedCalloutTarget, editorialText, exactFragment, fragmentFromComment, parseEditorialBlock, safeEditorialUrl } from "./notion-editorial";

const block = parseEditorialBlock({ id: "block-1", type: "paragraph", paragraph: { rich_text: [{ plain_text: "Les idées nous traversent.", annotations: { bold: true }, href: "https://example.org/source" }] } });
describe("Notion editorial grammar", () => {
  it("preserves the original sentences, inline links, formatting and block identity", () => {
    expect(editorialText(block)).toBe("Les idées nous traversent.");
    expect(block.id).toBe("block-1");
    expect(block.spans[0]).toMatchObject({ bold: true, href: "https://example.org/source" });
  });
  it("never guesses an ambiguous exact excerpt", () => {
    const repeated = { ...block, spans: [{ ...block.spans[0], text: "idées et idées", href: null, pageId: null, bold: false, italic: false, underline: false, strike: false, code: false }] };
    expect(exactFragment(repeated, "idées", "mot")).toBeNull();
    expect(exactFragment(block, "idées", "traversée")?.start).toBe(4);
  });
  it("excludes ordinary and malformed comments from public editorial fragments", () => {
    expect(fragmentFromComment(block, "Une note privée")).toBeNull();
    expect(fragmentFromComment(block, 'billet-fragment: {"extrait":"idées","motCle":"traversée"}')).toMatchObject({ excerpt: "idées", keyword: "traversée", blockId: "block-1" });
    expect(fragmentFromComment(block, 'billet-fragment: {"extrait":"absent","motCle":"x"}')).toBeNull();
  });
  it("only authorizes linked callouts, rejecting arbitrary pages and cycles", () => {
    const root = "3f651168-2fc3-8163-9bc3-f108577ca8b8";
    const callout = parseEditorialBlock({ id: "callout", type: "callout", callout: { rich_text: [{ plain_text: "page", mention: { page: { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" } } }] } });
    expect(allowedCalloutTarget([callout], "callout", root)).toBe("a".repeat(32));
    expect(allowedCalloutTarget([callout], "unknown", root)).toBeNull();
    expect(allowedCalloutTarget([{ ...callout, targetPageId: root.replace(/-/g, "") }], "callout", root)).toBeNull();
  });
  it("rejects executable media and link URLs", () => {
    expect(safeEditorialUrl("javascript:alert(1)")).toBeNull();
    expect(safeEditorialUrl("https://example.org/image.gif")).toBe("https://example.org/image.gif");
  });
});