import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { parseEditorialBlock } from "@/lib/notion-editorial";
import { EditorialArticle } from "./EditorialArticle";

const mocks = vi.hoisted(() => ({ load: vi.fn() }));
vi.mock("@tanstack/react-start", () => ({ useServerFn: () => mocks.load, createServerFn: () => ({ inputValidator: () => ({ handler: () => vi.fn() }), handler: () => vi.fn() }) }));
vi.mock("./PrototypePassages", () => ({ PrototypeDoor: () => null }));
const callout = parseEditorialBlock({ id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", type: "callout", callout: { rich_text: [{ plain_text: "Page publique", mention: { page: { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" } } }] } });
describe("Linked editorial reading", () => {
  it("loads the linked page only after an explicit opening and reuses its content", async () => {
    mocks.load.mockResolvedValue({ ok: true, title: "Destination", blocks: [parseEditorialBlock({ id: "paragraph", type: "paragraph", paragraph: { rich_text: [{ plain_text: "Le contenu original de la page liée." }] } })] });
    render(<EditorialArticle blocks={[callout]} />);
    expect(mocks.load).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Page publique/ }));
    await waitFor(() => expect(screen.getByText("Le contenu original de la page liée.")).toBeTruthy());
    expect(mocks.load).toHaveBeenCalledWith({ data: { blockId: callout.id } });
    fireEvent.click(screen.getByRole("button", { name: "Revenir au texte" }));
    fireEvent.click(await screen.findByRole("button", { name: /Page publique/ }, { timeout: 2000 }));
    expect(mocks.load).toHaveBeenCalledTimes(1);
  });
});