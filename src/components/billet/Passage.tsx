import { useState, type ReactNode } from "react";
import { DIGRESSIONS, REACTIONS, SEED_AVIS, MARGINALIA, type ReactionId } from "@/data/billet";
import { addToQueue, setAvis, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const toneClass: Record<string, string> = {
  primary: "border-primary text-primary bg-accent",
  gold: "border-gold text-ink bg-gold/15",
  rose: "border-rose text-rose bg-rose/10",
  orange: "border-orange text-orange bg-orange/10",
};

export const CONFIRM = "Merci, contribution en attente de modération";

function renderText(text: string, open: Set<string>, toggle: (id: string) => void) {
  const parts: ReactNode[] = [];
  const re = /\[\[(\w+)\|([^\]]+)\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    parts.push(text.slice(last, m.index));
    const id = m[1]!;
    parts.push(
      <button
        key={id}
        type="button"
        aria-expanded={open.has(id)}
        aria-controls={`dig-${id}`}
        onClick={() => toggle(id)}
        className="cursor-pointer rounded-sm text-ink underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-primary"
      >
        {m[2]}
        <span aria-hidden className="ml-0.5 align-super text-[0.65em] text-gold">
          {open.has(id) ? "−" : "+"}
        </span>
        <span className="sr-only"> (digression)</span>
      </button>,
    );
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

export function PassageBlock({
  id,
  index,
  text,
  onDialogue,
  onContribute,
  onMargin,
}: {
  id: string;
  index: number;
  text: string;
  onDialogue: (passageId: string, seed?: string) => void;
  onContribute: (passageId: string) => void;
  onMargin: (passageId: string) => void;
}) {
  const mine = useStore((s) => s.myAvis[id]);
  const [openDig, setOpenDig] = useState<Set<string>>(new Set());
  const [panel, setPanel] = useState(false);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [tangent, setTangent] = useState(false);
  const [tangentText, setTangentText] = useState("");

  const seed = SEED_AVIS[id] ?? {};
  const totalSeed = Object.values(seed).reduce((a, b) => a + (b ?? 0), 0);
  const counts = (r: ReactionId) => (seed[r] ?? 0) + (mine === r ? 1 : 0);
  const notes = MARGINALIA.filter((n) => n.passageId === id);
  const digIds = [...text.matchAll(/\[\[(\w+)\|/g)].map((x) => x[1]!);

  const toggle = (d: string) =>
    setOpenDig((s) => {
      const n = new Set(s);
      n.has(d) ? n.delete(d) : n.add(d);
      return n;
    });

  return (
    <div className="group relative" id={`passage-${id}`}>
      {/* margin trace */}
      {totalSeed + (mine ? 1 : 0) > 0 && (
        <span
          aria-hidden
          className="absolute -left-4 top-2 bottom-2 w-0.5 rounded-full bg-primary transition-opacity"
          style={{ opacity: Math.min(0.15 + (totalSeed + (mine ? 1 : 0)) / 25, 0.7) }}
        />
      )}
      <p className="prose-billet">
        {renderText(text, openDig, toggle)}
        {notes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            onClick={() => onMargin(id)}
            className="ml-1 align-super text-xs font-medium text-orange lg:hidden"
            aria-label={`Note marginale ${i + 1} : ${n.type}`}
          >
            [{n.type[0]}]
          </button>
        ))}
      </p>

      {digIds.map((d) => (
        <div
          key={d}
          id={`dig-${d}`}
          role="region"
          aria-label={`Digression : ${DIGRESSIONS[d].title}`}
          className={cn(
            "grid transition-all duration-500 ease-organic",
            openDig.has(d) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="my-4 border-l-2 border-gold bg-paper px-5 py-4 text-base leading-relaxed text-muted-foreground">
              <div className="font-label mb-1 text-xs text-ink">Digression · {DIGRESSIONS[d].title}</div>
              {DIGRESSIONS[d].body}
              <div>
                <button type="button" onClick={() => toggle(d)} className="mt-2 text-sm text-primary underline">
                  Replier
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* avis marker */}
      <div className="mt-1 flex min-h-7 items-center gap-2 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 data-[active=true]:md:opacity-100" data-active={panel || !!mine}>
        <button
          type="button"
          aria-expanded={panel}
          aria-controls={`avis-${id}`}
          onClick={() => setPanel((v) => !v)}
          className="font-label rounded-full border border-border px-2.5 py-0.5 text-[0.7rem] text-muted-foreground hover:border-primary hover:text-primary"
        >
          {mine ? `Votre avis : ${REACTIONS.find((r) => r.id === mine)?.label}` : `¶ ${index} · Réagir`}
        </button>
      </div>

      {panel && (
        <div id={`avis-${id}`} className="animate-fade-rise mt-2 rounded-md border border-border bg-card p-4 shadow-sm">
          <div role="group" aria-label="Donner un avis sur ce passage" className="flex flex-wrap gap-2">
            {REACTIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={mine === r.id}
                onClick={() => {
                  setAvis(id, r.id);
                  setSent(null);
                }}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition-colors",
                  mine === r.id ? toneClass[r.tone] : "border-border text-muted-foreground hover:border-primary",
                )}
              >
                {r.label}
                {mine && <span className="ml-1.5 text-xs opacity-80">{counts(r.id)}</span>}
              </button>
            ))}
          </div>

          {mine && (
            <div className="animate-fade-rise mt-4 space-y-3">
              {sent ? (
                <p role="status" className="text-sm text-primary">{sent}</p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!comment.trim()) return;
                    addToQueue({ kind: "commentaire", passageId: id, text: comment.trim() });
                    setComment("");
                    setSent(CONFIRM);
                  }}
                  className="space-y-2"
                >
                  <label htmlFor={`why-${id}`} className="text-sm font-medium text-ink">
                    Pourquoi ? <span className="font-normal text-muted-foreground">(facultatif)</span>
                  </label>
                  <textarea
                    id={`why-${id}`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                    className="w-full rounded-md border border-input bg-background p-2 text-sm"
                  />
                  <button type="submit" className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-50" disabled={!comment.trim()}>
                    Envoyer
                  </button>
                </form>
              )}

              <div className="flex flex-wrap gap-3 border-t border-border pt-3 text-sm">
                <span className="font-label text-xs text-muted-foreground self-center">Tangente</span>
                <button
                  type="button"
                  className="text-primary underline underline-offset-2"
                  onClick={() =>
                    onDialogue(id, `J'ai réagi « ${REACTIONS.find((r) => r.id === mine)?.label} » à ce passage.${comment ? " " + comment : ""}`)
                  }
                >
                  Dialoguer à partir de mon avis
                </button>
                <button type="button" aria-expanded={tangent} className="text-orange underline underline-offset-2" onClick={() => setTangent((v) => !v)}>
                  Proposer une tangente publique
                </button>
                <button type="button" className="text-muted-foreground underline underline-offset-2" onClick={() => onContribute(id)}>
                  Contribuer…
                </button>
              </div>
              {tangent && (
                <form
                  className="space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!tangentText.trim()) return;
                    addToQueue({ kind: "tangente", passageId: id, text: tangentText.trim() });
                    setTangentText("");
                    setTangent(false);
                    setSent(CONFIRM);
                  }}
                >
                  <label htmlFor={`tan-${id}`} className="sr-only">Votre tangente</label>
                  <textarea
                    id={`tan-${id}`}
                    value={tangentText}
                    onChange={(e) => setTangentText(e.target.value)}
                    placeholder="Une idée, une contre-proposition…"
                    rows={2}
                    className="w-full rounded-md border border-input bg-background p-2 text-sm"
                  />
                  <button type="submit" className="rounded-md bg-orange px-3 py-1.5 text-sm text-primary-foreground">
                    Proposer
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
