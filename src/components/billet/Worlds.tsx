import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUp, Bookmark, Check, Dices, Square, TreePine, Volume2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { dreamSettingsQuery } from "@/lib/ai-settings-query";
import { Button } from "@/components/ui/button";
import { EXAMPLE_QUOTES, DREAM_LIMITS, type Quote } from "@/data/quotes";
import { generateDream, speak, getDreamSettings } from "@/lib/api.functions";
import { keepTrace, useStore } from "@/lib/store";
import { hasTrace, selectedTraces } from "@/lib/traces";
import { useReader } from "./ReaderContext";
import { cn } from "@/lib/utils";

/**
 * Les mondes derrière les séparateurs. Version calme en HTML : aucune 3D,
 * génération OpenRouter après geste explicite la nuit. Le jour dérive entre des citations-glaçons
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

const DREAM_DAY_KEY = "billets-ouverts-dreams";
function dreamsToday(): number {
  try {
    const v = JSON.parse(localStorage.getItem(DREAM_DAY_KEY) || "{}") as { day?: string; n?: number };
    return v.day === new Date().toISOString().slice(0, 10) ? v.n ?? 0 : 0;
  } catch { return 0; }
}
function countDream() {
  try {
    localStorage.setItem(DREAM_DAY_KEY, JSON.stringify({ day: new Date().toISOString().slice(0, 10), n: dreamsToday() + 1 }));
  } catch { /* stockage refusé : on continue */ }
}

function NightWorld() {
  const traces = useStore((s) => s.traces);
  const chosen = selectedTraces(traces);
  const [diceRolled, setDiceRolled] = useState(false);
  const [dream, setDream] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [voice, setVoice] = useState<"idle" | "loading" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const runDream = useServerFn(generateDream);
  const runSpeak = useServerFn(speak);
  const readSettings = useServerFn(getDreamSettings);
  const { data: settings } = useQuery(dreamSettingsQuery);
  const maxTraces = settings?.maxTraces ?? DREAM_LIMITS.maxTraces;
  const tooMany = chosen.length > maxTraces;
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  async function roll() {
    setDiceRolled(true);
    setError(null);
    setBusy(true);
    try {
      const current = await readSettings();
      if (!current.active) { setError("Le rêve est désactivé pour le moment."); return; }
      if (chosen.length > current.maxTraces) { setError(`Choisissez au plus ${current.maxTraces} traces.`); return; }
      if (dreamsToday() >= current.perDay) {
        setError(`${current.perDay} rêves par jour sur cet appareil : la nuit reprendra demain.`); return;
      }
      const r = await runDream({ data: { traces: chosen.map((t) => t.text.slice(0, 1200)) } });
      if (r.ok) { setDream(r.text); countDream(); } else setError(r.error);
    } catch { setError("Le rêve est momentanément indisponible."); }
    finally { setBusy(false); }
  }

  async function listen() {
    if (!dream) return;
    if (voice === "playing") { audioRef.current?.pause(); setVoice("idle"); return; }
    setVoice("loading");
    const r = await runSpeak({ data: { text: dream.slice(0, 3000), usage: "reve.nuit" } });
    if (!r.ok) { setError(r.error); setVoice("idle"); return; }
    const audio = new Audio(`data:${r.mime};base64,${r.audio}`);
    audioRef.current = audio;
    audio.onended = () => setVoice("idle");
    await audio.play().catch(() => setVoice("idle"));
    setVoice("playing");
  }
  return (
    <div className="world-night">
      <div className="dream-trunk" aria-hidden />
      <div className="relative mx-auto max-w-xl">
        <TreePine className="mx-auto mb-6 size-8 text-primary" aria-hidden />
        <h3 className="text-center font-display text-3xl">La branche et l’écran</h3>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Le rêve naîtra de vos traces, et d’elles seulement. Choisissez-les dans le fil de traces
          (au plus {maxTraces}), puis lancez le dé.
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
              {chosen.length} traces choisies : choisissez-en au plus {maxTraces} dans le fil.
            </p>
          )}
          <Button
            size="lg"
            disabled={chosen.length === 0 || tooMany || busy || settings?.active === false}
            aria-disabled={chosen.length === 0 || tooMany || busy || settings?.active === false}
            onClick={roll}
          >
            <Dices aria-hidden /> {busy ? "Le rêve se forme…" : dream ? "Relancer le dé" : "Lancer le dé"}
          </Button>
          {settings?.active === false && <p role="status" className="mt-4 text-sm text-muted-foreground">Le rêve est désactivé pour le moment.</p>}
          {diceRolled && error && (
            <p role="alert" className="mx-auto mt-6 max-w-md text-sm text-rose">{error}</p>
          )}
          {dream && (
            <div role="status" className="animate-fade-rise mx-auto mt-8 max-w-xl space-y-4 text-left">
              {dream.split(/\n+/).map((p, i) => (
                <p key={i} className="font-display text-xl leading-relaxed">{p}</p>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={listen} disabled={voice === "loading"}>
                  {voice === "playing" ? <Square aria-hidden /> : <Volume2 aria-hidden />}
                  {voice === "loading" ? "La voix arrive…" : voice === "playing" ? "Arrêter" : "Écouter le rêve"}
                </Button>
                <span className="text-xs text-muted-foreground">Rêve généré par IA, à partir de vos traces seulement.</span>
              </div>
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
