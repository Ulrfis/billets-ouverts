import { describe, expect, it } from "vitest";
import { iceQuoteFromNotion } from "./ice-quotes";

describe("Résonances ice quotations", () => {
  it("keeps the complete Citation and Année, including all rich text spans", () => {
    const long = "Une citation entière. ".repeat(160);
    expect(iceQuoteFromNotion({ id: "r1", properties: {
      Citation: { type: "rich_text", rich_text: [{ plain_text: long }, { plain_text: "La fin." }] },
      Année: { type: "number", number: 2023 },
      Auteur: { type: "rich_text", rich_text: [{ plain_text: "private unused field" }] },
    } })).toEqual({ id: "r1", text: long + "La fin.", year: 2023 });
  });
  it("does not substitute Thèse or invent a year for missing Citation", () => {
    expect(iceQuoteFromNotion({ id: "r2", properties: { Thèse: { type: "rich_text", rich_text: [{ plain_text: "Not a quotation" }] } } })).toBeNull();
    expect(iceQuoteFromNotion({ id: "r3", properties: { Citation: { type: "rich_text", rich_text: [{ plain_text: "Citation" }] }, Année: { type: "number", number: null } } })).toEqual({ id: "r3", text: "Citation", year: null });
  });
});