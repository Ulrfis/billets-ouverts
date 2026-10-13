import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReader } from "./ReaderContext";
import { WorldOverlay } from "./Worlds";

export function PrototypeCallout() {
  const [open, setOpen] = useState(false);
  return <aside className="prototype-callout my-10" aria-label="Callout de démonstration">
    <Button variant="ghost" className="h-auto w-full justify-between whitespace-normal px-0 py-4 text-left" aria-expanded={open} aria-controls="callout-demo-content" onClick={() => setOpen((value) => !value)}>
      <span><span className="mb-1 block text-xs font-normal text-muted-foreground">Maquette · page liée</span><span className="font-display text-xl">Et si le texte était un lieu ?</span></span>
      <ArrowUpRight aria-hidden className={open ? "rotate-90 transition-transform" : "transition-transform"} />
    </Button>
    {open && <div id="callout-demo-content" className="animate-fade-rise border-t border-border py-6">
      <h3 className="font-display text-2xl">Un lieu pour les idées</h3>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">On entre dans un texte comme dans un paysage. Certaines phrases nous retiennent ; d’autres ouvrent un chemin que nous n’avions pas prévu.</p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">Garder un fragment, ce n’est pas le posséder. C’est lui laisser une place pour revenir, se transformer, rencontrer une autre lecture.</p>
      <p className="mt-4 text-xs text-muted-foreground">Contenu préparé pour la maquette, indépendant du billet et de Notion.</p>
    </div>}
  </aside>;
}

/**
 * Séparateur-mâchoire : deux plans qui s’écartent, puis le monde du jour
 * (glaçons) ou de la nuit (rêve) s’ouvre par-dessus. Au retour, le lecteur
 * retrouve le séparateur, sa position de lecture et le focus.
 */
export function PrototypeDoor({ number }: { number: number | string }) {
  const { universe, dose } = useReader();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const position = useRef(0);
  const day = universe === "day";
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => {
      trigger.current?.focus({ preventScroll: true });
      window.scrollTo({ top: position.current, behavior: "instant" });
    });
  };
  return <div className="prototype-door my-10" data-open={open}>
    <div className="door-jaw door-jaw-top" />
    <Button ref={trigger} variant="ghost" className="door-trigger w-full text-muted-foreground" aria-expanded={open} aria-controls="reading-world" aria-label={`Ouvrir la porte ${number} · ${day ? "jour" : "nuit"}`} onClick={() => {
      if (open) { close(); return; }
      position.current = window.scrollY;
      setOpen(true);
    }}>
      <span className="door-line" /><ChevronDown aria-hidden className={open ? "rotate-180" : ""} />
      {dose === "interactive" && <span className="text-xs">Une porte · {day ? "jour" : "nuit"}</span>}<span className="door-line" />
    </Button>
    <WorldOverlay open={open} onClose={close} />
    <div className="door-jaw door-jaw-bottom" />
  </div>;
}
