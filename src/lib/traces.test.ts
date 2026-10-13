import { describe, expect, it } from "vitest";
import { addTrace, cleanPassageText, normalizeTraces, removeTrace, searchTraces, selectedTraces, toggleTraceSelection, type Trace } from "./traces";

const base = { kind: "passage" as const, passageId: "p1", text: "Le cinéma embrasse le web", excerpt: "Le cinéma embrasse le web" };

describe("traces", () => {
  it("refuse un doublon, même avec casse ou accents différents", () => {
    const one = addTrace([], base, "a", "t");
    expect(addTrace(one, { ...base, text: "le cinema EMBRASSE le web" }, "b", "t")).toHaveLength(1);
  });
  it("accepte le même mot-clé sur un autre passage", () => {
    const one = addTrace([], { ...base, kind: "mot-clé", text: "Web" }, "a", "t");
    expect(addTrace(one, { ...base, kind: "mot-clé", passageId: "p2", text: "Web" }, "b", "t")).toHaveLength(2);
  });
  it("accepte une citation et la retrouve dans la recherche", () => {
    const one = addTrace([], { kind: "citation", passageId: "glaçon-3", text: "Une image peut devenir un chemin.", excerpt: "Corpus d’exemple" }, "a", "t");
    expect(one[0]?.kind).toBe("citation");
    expect(searchTraces(one, "chemin")).toHaveLength(1);
  });
  it("sélectionne et désélectionne une trace pour le rêve", () => {
    const one = addTrace([], base, "a", "t");
    const on = toggleTraceSelection(one, "a");
    expect(selectedTraces(on)).toHaveLength(1);
    expect(selectedTraces(toggleTraceSelection(on, "a"))).toHaveLength(0);
  });
  it("la sélection survit à une nouvelle récolte", () => {
    const one = toggleTraceSelection(addTrace([], base, "a", "t"), "a");
    const two = addTrace(one, { ...base, passageId: "p2", text: "Autre passage", excerpt: "Autre passage" }, "b", "t");
    expect(selectedTraces(two).map((t) => t.id)).toEqual(["a"]);
  });
  it("supprime une trace", () => {
    expect(removeTrace(addTrace([], base, "a", "t"), "a")).toEqual([]);
  });
  it("cherche sans tenir compte des accents", () => {
    const list = addTrace([], base, "a", "t");
    expect(searchTraces(list, "CINEMA")).toHaveLength(1);
    expect(searchTraces(list, "théâtre")).toHaveLength(0);
  });
  it("retire les marqueurs de digression", () => {
    expect(cleanPassageText("Un [[d1|château fort]]  ici")).toBe("Un château fort ici");
  });
  it("ignore les données stockées invalides", () => {
    expect(normalizeTraces([{ id: 1 }, null, { ...base, id: "a", createdAt: "t" }] as unknown)).toHaveLength(1);
    expect(normalizeTraces("x")).toEqual([] as Trace[]);
  });
  it("conserve les anciennes traces sans champ de sélection", () => {
    const legacy = [{ ...base, id: "a", createdAt: "t" }] as unknown;
    const traces = normalizeTraces(legacy);
    expect(traces).toHaveLength(1);
    expect(traces[0]?.selected).toBeUndefined();
  });
});
