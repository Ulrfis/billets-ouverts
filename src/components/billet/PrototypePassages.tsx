import { useRef, useState } from "react";
import { ArrowUp, ChevronDown, ArrowUpRight, Cloud, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReader } from "./ReaderContext";

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

export function PrototypeDoor({ number }: { number: number | string }) {
  const { universe, dose } = useReader();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const returnButton = useRef<HTMLButtonElement>(null);
  const position = useRef(0);
  const day = universe === "day";
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => {
      trigger.current?.focus({ preventScroll: true });
      window.scrollTo({ top: position.current, behavior: "instant" });
    });
  };
  return <div className="prototype-door my-10" data-open={open} onKeyDown={(event) => { if (open && event.key === "Escape") { event.preventDefault(); close(); } }}>
    <div className="door-jaw door-jaw-top" />
    <Button ref={trigger} variant="ghost" className="door-trigger w-full text-muted-foreground" aria-expanded={open} aria-controls={`world-${number}`} aria-label={`Ouvrir la porte ${number} · ${day ? "jour" : "nuit"}`} onClick={() => {
      if (open) { close(); return; }
      position.current = window.scrollY;
      setOpen(true);
      requestAnimationFrame(() => returnButton.current?.focus({ preventScroll: true }));
    }}>
      <span className="door-line" /><ChevronDown aria-hidden className={open ? "rotate-180" : ""} />
      {dose === "interactive" && <span className="text-xs">Une porte · {day ? "jour" : "nuit"}</span>}<span className="door-line" />
    </Button>
    {open && <section id={`world-${number}`} aria-label={`Monde de ${day ? "jour" : "nuit"} · maquette`} className="prototype-world animate-fade-rise">
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-muted-foreground">Maquette · porte {number}</span><Button ref={returnButton} variant="ghost" size="sm" onClick={close}><ArrowUp aria-hidden />Revenir au texte</Button></div>
      <div className="py-10 md:py-16">
        {day ? <Cloud className="mb-5 size-8 text-primary" aria-hidden /> : <TreePine className="mb-5 size-8 text-primary" aria-hidden />}
        <h3 className="font-display text-3xl">{day ? "Les idées en suspension" : "La branche et l’écran"}</h3>
        {day ? <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <blockquote className="border-l border-primary pl-5">« Une image peut devenir un chemin. »</blockquote>
          <blockquote className="border-l border-gold pl-5">« Ce que l’on garde continue de bouger. »</blockquote>
          <p className="text-xs">Phrases d’exemple préparées · pas encore de glaçons 3D ni de récolte.</p>
        </div> : <div className="dream-path mt-8 space-y-6 pl-6 text-lg leading-relaxed text-muted-foreground">
          <p>Une comète traverse l’écran. Là où elle touche la terre, un arbre se met à pousser.</p>
          <p>Chaque branche porte une image. Elles se tournent vers le vent, et le vent devient une voix silencieuse.</p>
          <p className="text-xs">Rêve préparé pour la maquette · aucune génération IA ni voix lancée.</p>
        </div>}
      </div>
    </section>}
    <div className="door-jaw door-jaw-bottom" />
  </div>;
}