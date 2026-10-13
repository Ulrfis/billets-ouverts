import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNotionCallout, type NotionDigression } from "@/lib/api.functions";
import { editorialText, exactFragment, flattenEditorialBlocks, type EditorialBlock, type EditorialFragment, type EditorialSpan } from "@/lib/notion-editorial";
import { PassageBlock } from "./Passage";
import { PrototypeDoor } from "./PrototypePassages";

function Spans({ spans }: { spans: EditorialSpan[] }) {
  return <>{spans.map((span, index) => {
    let text: ReactNode = span.text;
    if (span.code) text = <code className="bg-muted px-1 font-mono text-base">{text}</code>;
    if (span.bold) text = <strong>{text}</strong>;
    if (span.italic) text = <em>{text}</em>;
    if (span.underline) text = <u>{text}</u>;
    if (span.strike) text = <s>{text}</s>;
    if (span.href) text = <a href={span.href} className="text-primary underline underline-offset-4" target="_blank" rel="noreferrer">{text}</a>;
    return <span key={index}>{text}</span>;
  })}</>;
}

type Rect = { top: number; left: number; width: number; height: number };
const rectOf = (el: Element | null): Rect => {
  const r = el?.getBoundingClientRect();
  return r ? { top: r.top, left: r.left, width: r.width, height: r.height } : { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
};

function Callout({ block, nested, children }: { block: EditorialBlock; nested: boolean; children: ReactNode }) {
  const load = useServerFn(getNotionCallout);
  const ref = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<"closed" | "flip" | "open" | "closing">("closed");
  const [from, setFrom] = useState<Rect | null>(null);
  const [to, setTo] = useState<Rect | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState<{ title: string; blocks: EditorialBlock[] } | null>(null);
  const linked = Boolean(block.targetPageId) && !nested;
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const open = async () => {
    if (!linked || phase !== "closed") return;
    // Overlay covers only the reading column; the reader's sidebar stays untouched.
    const content = rectOf(document.querySelector(".reader-content"));
    const viewport = { top: 0, left: content.left, width: content.width, height: window.innerHeight };
    setFrom(rectOf(ref.current)); setTo(viewport);
    if (reduce()) setPhase("open"); else { setPhase("flip"); window.setTimeout(() => setPhase("open"), 550); }
    if (page || loading) return;
    setLoading(true); setError("");
    try {
      const result = await load({ data: { blockId: block.id } });
      if (result.ok) setPage(result); else setError(result.error);
    } catch { setError("La page liée est indisponible. Vous pouvez poursuivre la lecture."); }
    finally { setLoading(false); }
  };
  const close = () => {
    if (reduce()) { setPhase("closed"); ref.current?.focus(); return; }
    setFrom(rectOf(ref.current)); setPhase("closing");
    window.setTimeout(() => { setPhase("closed"); ref.current?.focus(); }, 550);
  };
  useEffect(() => {
    if (phase === "open") closeRef.current?.focus();
    if (phase === "closed") return undefined;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const box = phase === "open" ? to : from;
  const flipped = phase === "flip" || phase === "open";
  return <aside ref={ref} tabIndex={linked ? 0 : undefined} role={linked ? "button" : undefined}
    aria-label={linked ? `Retourner : ${editorialText(block) || "page liée"}` : "Passage lié"}
    onClick={linked ? open : undefined} onKeyDown={linked ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); void open(); } } : undefined}
    className={`prototype-callout my-8${linked ? " callout-linked" : ""}`} style={{ visibility: phase === "closed" ? "visible" : "hidden" }}>
    {block.spans.length > 0 && <p className="prose-billet py-4 font-semibold"><Spans spans={block.spans} /></p>}
    {children}
    {linked && <p className="mt-2 flex items-center gap-2 text-sm text-primary"><ArrowUpRight aria-hidden className="h-4 w-4" />Retourner la carte</p>}
    {phase !== "closed" && box && typeof document !== "undefined" && createPortal(
      <div className="callout-overlay" role="dialog" aria-modal="true" aria-label={page?.title ?? "Page liée"} onClick={(event) => event.stopPropagation()}>
        <div className="callout-card" style={{ top: box.top, left: box.left, width: box.width, height: box.height }}>
          <div className={`callout-card-inner${flipped ? " is-flipped" : ""}`}>
            <div className="callout-face callout-front" aria-hidden><p className="font-semibold"><Spans spans={block.spans} /></p></div>
            <div className="callout-face callout-back">
              <div className="callout-back-bar">
                <span className="truncate font-display text-lg">{page?.title ?? "Page liée"}</span>
                <Button ref={closeRef} variant="ghost" size="sm" onClick={close}>Revenir au texte</Button>
              </div>
              <div className="callout-back-body" aria-busy={loading}>
                {loading && <p role="status" className="text-sm text-muted-foreground">Ouverture…</p>}
                {error && <p role="status" className="text-sm text-muted-foreground">{error}</p>}
                {page && <><h2 className="mb-6 text-3xl">{page.title}</h2><EditorialArticle blocks={page.blocks} nested /></>}
              </div>
            </div>
          </div>
        </div>
      </div>, document.body)}
  </aside>;
}

type Props = {
  blocks: EditorialBlock[];
  fragments?: EditorialFragment[];
  digressions?: NotionDigression[];
  nested?: boolean;
  interactive?: boolean;
  onDialogue?: (id: string) => void;
  onContribute?: (id: string) => void;
};

export function EditorialArticle({ blocks, fragments = [], digressions = [], nested = false, interactive = false, onDialogue, onContribute }: Props) {
  const flat = flattenEditorialBlocks(blocks);
  const renderBlock = (block: EditorialBlock): ReactNode => {
    const text = editorialText(block);
    const children = block.children.length > 0 ? renderBlocks(block.children) : null;
    const annotation = fragments.filter((fragment) => fragment.blockId === block.id);
    const linked = (interactive ? digressions : []).filter((digression) => {
      if (!exactFragment(block, digression.anchor, "")) return false;
      return flat.filter((item) => exactFragment(item, digression.anchor, "") !== null).length === 1;
    });
    const paragraph = nested || !onDialogue || !onContribute ? <p className="prose-billet whitespace-pre-wrap"><Spans spans={block.spans} /></p> :
      <PassageBlock interactive={interactive} id={block.id} index={flat.indexOf(block) + 1} text={text} content={<Spans spans={block.spans} />} onDialogue={onDialogue} onContribute={onContribute} onMargin={() => {}} showNotes={false} digressions={{}} />;
    let content: ReactNode;
    switch (block.type) {
      case "heading_1": content = <h2 className="mt-12 mb-6 text-3xl"><Spans spans={block.spans} /></h2>; break;
      case "heading_2": content = <h2 className="mt-10 mb-5 text-2xl"><Spans spans={block.spans} /></h2>; break;
      case "heading_3": content = <h3 className="mt-10 mb-5 text-xl"><Spans spans={block.spans} /></h3>; break;
      case "divider": content = nested ? <hr className="my-8" /> : <PrototypeDoor number={block.id} />; break;
      case "callout": return <Callout key={block.id} block={block} nested={nested}>{children}</Callout>;
      case "quote": content = <blockquote className="border-l-2 border-border pl-5">{paragraph}</blockquote>; break;
      case "image": content = block.url ? <figure className="my-8"><img src={block.url} alt={block.caption.map((span) => span.text).join("")} loading="lazy" className="h-auto w-full object-contain" />{block.caption.length > 0 && <figcaption className="mt-2 text-sm text-muted-foreground"><Spans spans={block.caption} /></figcaption>}</figure> : null; break;
      case "video": content = block.url ? <figure className="my-8"><video controls preload="none" src={block.url} className="w-full" /><figcaption><Spans spans={block.caption} /></figcaption></figure> : null; break;
      case "audio": content = block.url ? <audio controls preload="none" src={block.url} className="w-full" /> : null; break;
      case "bookmark": case "embed": case "file": case "pdf": content = block.url ? <a className="text-primary underline" href={block.url} target="_blank" rel="noreferrer">{text || block.url}</a> : paragraph; break;
      case "code": content = <pre className="overflow-x-auto bg-muted p-4"><code>{text}</code></pre>; break;
      case "toggle": return <details key={block.id} className="my-6"><summary className="cursor-pointer prose-billet"><Spans spans={block.spans} /></summary>{children}</details>;
      case "to_do": content = <div className="flex gap-3"><input type="checkbox" checked={block.checked} readOnly aria-label={text} />{paragraph}</div>; break;
      default: content = text ? paragraph : null;
    }
    return <div key={block.id} data-notion-block={block.id} className="my-6">{content}{children}
      {annotation.map((fragment, index) => <details key={index} className="mt-3 border-l border-primary pl-4 text-sm"><summary className="cursor-pointer text-primary">{fragment.keyword || fragment.excerpt}</summary><blockquote className="mt-2 text-muted-foreground">{fragment.excerpt}</blockquote>{fragment.url && <a className="text-primary underline" href={fragment.url} target="_blank" rel="noreferrer">Source</a>}</details>)}
      {linked.map((digression) => <details key={digression.id} className="mt-3 border-l border-gold pl-4 text-sm"><summary className="cursor-pointer text-primary">{digression.anchor} · Digression</summary><h4 className="mt-3 font-display text-lg">{digression.title}</h4><p className="mt-2 whitespace-pre-wrap leading-relaxed text-muted-foreground">{digression.body}</p></details>)}
    </div>;
  };
  const renderBlocks = (items: EditorialBlock[]): ReactNode => {
    const groups: ReactNode[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (!item) continue;
      if (item.type === "bulleted_list_item" || item.type === "numbered_list_item") {
        const list: EditorialBlock[] = [item];
        while (items[index + 1]?.type === item.type) { index++; const next = items[index]; if (next) list.push(next); }
        const entries = list.map((entry) => <li key={entry.id}>{renderBlock(entry)}</li>);
        groups.push(item.type === "numbered_list_item" ? <ol key={item.id} className="editorial-list list-decimal">{entries}</ol> : <ul key={item.id} className="editorial-list list-disc">{entries}</ul>);
      } else groups.push(renderBlock(item));
    }
    return groups;
  };
  return <div className="editorial-page">{renderBlocks(blocks)}</div>;
}