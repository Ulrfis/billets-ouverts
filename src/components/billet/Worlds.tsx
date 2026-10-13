import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUp, Bookmark, Check, Dices, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXAMPLE_QUOTES, DREAM_PROMPT, DREAM_LIMITS, type Quote } from "@/data/quotes";
import { keepTrace, useStore } from "@/lib/store";
import { hasTrace, selectedTraces } from "@/lib/traces";
import { useReader } from "./ReaderContext";
import { cn } from "@/lib/utils";

/**
 * Les mondes derrière les séparateurs. Version calme en HTML : aucune 3D,
 * aucune génération payante. Le jour dérive entre des citations-glaçons
 * collectables ; la nuit parcourt les traces choisies avant le rêve.
 */

function Iceberg({ quote, index }: { quote: Quote; index: number }) {
  const kept = useStore((s) => hasTrace(s.traces, "citation", quote.id, quote.text));
  const drift = (index % 5) - 2; // -2..2 : décalage horizontal doux
  return (
    <figure
      className="iceberg"
      style={{ "--drift": `${drift * 14}px`, "--delay": `${(index % 7) * -2.4}s` } as React.CSSProperties}
    >
      <blockquote className="iceberg-body">
        <p className="font-display text-xl leading-snug md:text-2xl">« {quote.text} »</p>
        <figcaption className="mt-3 text-xs text-muted-foreground">
          Corpus d’exemple · {quote.keywords.join(" · ")}
        </figcaption>
      </blockquote>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2"
        disabled={kept}
        aria-pressed={kept}
        onClick={() => keepTrace({ kind: "citation", passageId: quote.id, text: quote.text, excerpt: `Glaçon d’exemple · ${quote.keywords.join(", ")}` })}
      >
        {kept ? <Check aria-hidden /> : <Bookmark aria-hidden />}
        {kept ? "Gardée" : "Garder cette citation"}
      </Button>
    </figure>
  );
}

function DayWorld() {
  return (
    <div className="world-day">
      <p className="mx-auto max-w-xl text-center text-sm text-muted-foreground">
        Quinze citations dérivent lentement. Ce sont des phrases d’exemple, sans attribution :
        le corpus réel viendra de la base Notion « Citations » une fois validée.
      </p>
      <div className="iceberg-field mt-12">
        {EXAMPLE_QUOTES.map((quote, index) => <Iceberg key={quote.id} quote={quote} index={index} />)}
      </div>
    </div>
  );
}

function NightWorld() {
  const traces = useStore((s) => s.traces);
  const chosen = selectedTraces(traces);
  const [diceRolled, setDiceRolled] = useState(false);
  const tooMany = chosen.length > DREAM_LIMITS.maxTraces;
  return (
    <div className="world-night">
      <div className="dream-trunk" aria-hidden />
      <div className="relative mx-auto max-w-xl">
        <TreePine className="mx-auto mb-6 size-8 text-primary" aria-hidden />
        <h3 className="text-center font-display text-3xl">La branche et l’écran</h3>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Le rêve naîtra de vos traces, et d’elles seulement. Choisissez-les dans le fil de traces
          (au plus {DREAM_LIMITS.maxTraces}), puis lancez le dé.
        </p>

        {chosen.length === 0 ? (
          <div className="dream-path mt-10 space-y-6 pl-6 text-lg leading-relaxed text-muted-foreground">
            <p>Une comète traverse l’écran. Là où elle touche la terre, un arbre se met à pousser.</p>
            <p>Chaque branche porte une image. Elles se tournent vers le vent, et le vent devient une voix silencieuse.</p>
            <p className="text-xs">Exemple affiché faute de traces sélectionnées — ce n’est pas un rêve généré.</p>
          </div>
        ) : (
          <ol className="dream-path mt-10 space-y-6 pl-6" aria-label="Traces choisies pour le rêve">
            {chosen.map((trace) => (
              <li key={trace.id} className="text-lg leading-relaxed text-muted-foreground">
                <span className="font-label block text-xs text-primary">{trace.kind}</span>
                {trace.text}
              </li>
            ))}
          </ol>
        )}

        <div className="mt-10 border-t border-border pt-6 text-center">
          {tooMany && (
            <p role="status" className="mb-4 text-sm text-rose">
              {chosen.length} traces choisies : le rêve n’en retiendra que {DREAM_LIMITS.maxTraces}. Désélectionnez-en dans le fil.
            </p>
          )}
          <Button
            size="lg"
            disabled={chosen.length === 0 || tooMany}
            aria-disabled={chosen.length === 0 || tooMany}
            onClick={() => setDiceRolled(true)}
          >
            <Dices aria-hidden /> Lancer le dé
          </Button>
          {diceRolled && (
            <div role="status" className="animate-fade-rise mx-auto mt-6 max-w-md space-y-3 text-left text-sm text-muted-foreground">
              <p>
                Le dé est lancé — la génération réelle arrive au prochain lot. Elle enverra
                uniquement vos {Math.min(chosen.length, DREAM_LIMITS.maxTraces)} traces choisies
                vers les services de génération et de voix, avec ce prompt modifiable :
              </p>
              <blockquote className="border-l-2 border-primary pl-4 italic">{DREAM_PROMPT}</blockquote>
              <p className="text-xs">
                Limites proposées : {DREAM_LIMITS.maxTraces} traces, {DREAM_LIMITS.minWords}–{DREAM_LIMITS.maxWords} mots,
                {" "}{DREAM_LIMITS.perDay} rêves par jour sur cet appareil.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function WorldOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { universe } = useReader();
  const day = universe === "day";
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div className={cn("world-overlay", day ? "world-overlay-day" : "world-overlay-night")} role="dialog" aria-modal="true" aria-label={day ? "Monde de jour : les glaçons" : "Monde de nuit : la branche et l’écran"}>
      <div className="world-bar">
        <span className="font-label text-xs text-muted-foreground">{day ? "Une porte · jour" : "Une porte · nuit"}</span>
        <Button ref={closeRef} variant="ghost" size="sm" onClick={onClose}><ArrowUp aria-hidden />Revenir au texte</Button>
      </div>
      <div className="world-scroll">
        {day ? <DayWorld /> : <NightWorld />}
      </div>
    </div>,
    document.body,
  );
}
