import { useState, type ReactNode } from "react";
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

function Callout({ block, nested, children }: { block: EditorialBlock; nested: boolean; children: ReactNode }) {
  const load = useServerFn(getNotionCallout);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState<{ title: string; blocks: EditorialBlock[] } | null>(null);
  const toggle = async () => {
    setOpen((value) => !value);
    if (open || page || loading) return;
    setLoading(true); setError("");
    try {
      const result = await load({ data: { blockId: block.id } });
      if (result.ok) setPage(result); else setError(result.error);
    } catch { setError("La page liée est indisponible. Vous pouvez poursuivre la lecture."); }
    finally { setLoading(false); }
  };
  return <aside className="prototype-callout my-8" aria-label="Passage lié">
    {block.targetPageId && !nested ? <Button variant="ghost" className="h-auto w-full justify-between whitespace-normal py-4 text-left" aria-expanded={open} aria-controls={`callout-${block.id}`} onClick={toggle}>
      <span className="font-display text-xl">{editorialText(block) || "Page liée"}</span><ArrowUpRight aria-hidden className={open ? "rotate-90 transition-transform" : "transition-transform"} />
    </Button> : block.spans.length > 0 ? <p className="prose-billet py-4"><Spans spans={block.spans} /></p> : null}
    {children}
    {open && <div id={`callout-${block.id}`} className="editorial-callout-page border-t border-border py-6" aria-busy={loading}>
      {loading && <p role="status" className="text-sm text-muted-foreground">Ouverture…</p>}
      {error && <div role="status"><p className="text-sm text-muted-foreground">{error}</p><Button variant="link" onClick={() => { setOpen(false); }}>Revenir au texte</Button></div>}
      {page && <><h3 className="mb-6 text-2xl">{page.title}</h3><EditorialArticle blocks={page.blocks} nested /><Button variant="link" onClick={() => setOpen(false)}>Replier</Button></>}
    </div>}
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