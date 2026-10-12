import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { forgetTrace, useStore } from "@/lib/store";
import { searchTraces } from "@/lib/traces";
import { Cloud, TreePine, Pause, Play, PanelLeft, UserRound, Bookmark, Hash, Search, Trash2, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useReader } from "./ReaderContext";
import cloud from "@/assets/cloud-vagues.gif.asset.json";
import tree from "@/assets/comet-arbre.gif.asset.json";
import cloudStill from "@/assets/cloud-still.jpg.asset.json";
import treeStill from "@/assets/tree-still.jpg.asset.json";

function goToPassage(passageId: string, navigate: ReturnType<typeof useNavigate>) {
  const target = document.getElementById(`passage-${passageId}`);
  if (!target) { void navigate({ to: "/", hash: `passage-${passageId}` }); return; }
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  target.classList.add("trace-return");
  window.setTimeout(() => target.classList.remove("trace-return"), 1800);
  target.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
}

function TraceThread({ onReturn }: { onReturn?: (() => void) | undefined }) {
  const traces = useStore((s) => s.traces);
  const storageError = useStore((s) => s.storageError);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const shown = searchTraces(traces, query);
  return <>
    <div className="mt-10 flex items-center justify-between border-b border-sidebar-border pb-3">
      <h2 className="font-label text-xs text-sidebar-foreground">Le fil des traces</h2>
      <span className="text-xs text-muted-foreground">{traces.length} {traces.length > 1 ? "traces" : "trace"}</span>
    </div>
    {traces.length > 0 && <div className="relative mt-4">
      <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <label htmlFor="trace-search" className="sr-only">Chercher dans vos traces</label>
      <input id="trace-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Chercher un mot…" className="w-full rounded-md border border-sidebar-border bg-transparent py-1.5 pl-7 pr-2 text-sm text-sidebar-foreground" />
    </div>}
    {storageError && <p role="status" className="mt-3 text-xs text-rose">Cet appareil refuse l’enregistrement : vos traces restent visibles jusqu’à la fermeture de la page.</p>}
    {traces.length === 0 ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Sous chaque passage, « Garder » le dépose ici ; « + Mot-clé » y ajoute un mot qui vous reste.</p>
    : shown.length === 0 ? <p role="status" className="mt-4 text-sm text-muted-foreground">Aucune trace pour « {query} ».</p>
    : <ol className="trace-thread mt-4" aria-live="polite">
      {shown.map((trace) => {
        const Icon = trace.kind === "passage" ? Bookmark : Hash;
        return <li key={trace.id} className="trace-item">
          <details>
            <summary className="cursor-pointer list-none py-3 focus-visible:outline-ring">
              <span className="flex items-center gap-2 text-xs text-primary"><Icon className="size-3.5" aria-hidden />{trace.kind === "passage" ? "Passage" : "Mot-clé"}</span>
              <span className="mt-1.5 block font-display text-base leading-snug text-sidebar-foreground line-clamp-3">{trace.text}</span>
            </summary>
            <div className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {trace.kind === "mot-clé" && <p className="line-clamp-4 italic">« {trace.excerpt}{trace.excerpt.length >= 160 ? "…" : ""} »</p>}
              <div className="mt-2 flex gap-3 text-xs">
                <button type="button" className="inline-flex items-center gap-1 text-primary underline underline-offset-2" onClick={() => { onReturn?.(); window.setTimeout(() => goToPassage(trace.passageId, navigate), onReturn ? 250 : 0); }}><CornerDownLeft className="size-3" aria-hidden />Revenir au passage</button>
                <button type="button" className="inline-flex items-center gap-1 text-muted-foreground underline underline-offset-2 hover:text-rose" onClick={() => forgetTrace(trace.id)} aria-label={`Supprimer la trace : ${trace.text.slice(0, 40)}`}><Trash2 className="size-3" aria-hidden />Supprimer</button>
              </div>
            </div>
          </details>
        </li>;
      })}
    </ol>}
    <p className="mt-8 text-xs leading-relaxed text-muted-foreground">Vos traces restent sur cet appareil.</p>
  </>;
}

function SidebarBody({ onReturn }: { onReturn?: (() => void) | undefined } = {}) {
  const { universe, paused, reducedMotion, togglePaused } = useReader();
  const moving = !paused && !reducedMotion;
  const isDay = universe === "day";
  return <div className="reader-sidebar-body">
    <figure className="reader-figure">
      <img src={moving ? (isDay ? cloud.url : tree.url) : (isDay ? cloudStill.url : treeStill.url)} alt={isDay ? "Nuages et vagues en mouvement" : "Une comète fait naître un arbre"} className="reader-gif" />
      <Button variant="ghost" size="icon" className="reader-media-toggle" onClick={togglePaused} disabled={reducedMotion} aria-label={moving ? "Mettre le GIF en pause" : "Animer le GIF"} title={reducedMotion ? "Image fixe : animations réduites" : moving ? "Mettre le GIF en pause" : "Animer le GIF"}>
        {moving ? <Pause aria-hidden /> : <Play aria-hidden />}
      </Button>
    </figure>
    <div className="px-6 pb-6">
      <p className="font-display text-2xl leading-snug text-sidebar-foreground">Gardez ce qui<br />vous traverse.</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Les idées ne nous appartiennent pas,<br />elles nous traversent.</p>
      <TraceThread onReturn={onReturn} />
    </div>
  </div>;
}

export function ReaderFrame({ children }: { children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  const [account, setAccount] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const drawerTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { universe, toggleUniverse, connected, toggleConnected } = useReader();
  return <div className="reader-layout" data-universe={universe}>
    <aside aria-label="Votre fil de traces" className="reader-sidebar">{desktop && <SidebarBody />}</aside>
    <div className="reader-content">
      <header className="reader-header">
        <Button ref={drawerTrigger} variant="ghost" size="icon" className="reader-drawer-trigger" onClick={() => setDrawer(true)} aria-label="Ouvrir le fil de traces" title="Le fil des traces"><PanelLeft aria-hidden /></Button>
        <Link to="/" className="reader-wordmark"><span className="font-display">Billet ouvert</span><span className="reader-tagline">une expérimentation de lecture immersive</span></Link>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleUniverse} aria-label={universe === "day" ? "Passer à la nuit" : "Passer au jour"} title={universe === "day" ? "Passer à la nuit" : "Passer au jour"}>
            {universe === "day" ? <TreePine aria-hidden /> : <Cloud aria-hidden />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setAccount(true)} aria-label="Connexion simulée" aria-pressed={connected} title="Connexion simulée" className={connected ? "text-primary" : "text-muted-foreground"}><UserRound aria-hidden /></Button>
        </div>
      </header>
      {children}
    </div>
    <Sheet open={drawer} onOpenChange={setDrawer}>
      <SheetContent side="left" onCloseAutoFocus={(event) => { event.preventDefault(); drawerTrigger.current?.focus({ preventScroll: true }); }} className="reader-mobile-sidebar w-[min(88vw,22rem)] overflow-y-auto bg-sidebar p-0">
        <SheetHeader className="sr-only"><SheetTitle>Le fil de vos traces</SheetTitle><SheetDescription>Passages et mots-clés que vous avez gardés.</SheetDescription></SheetHeader>
        {drawer && <SidebarBody onReturn={() => setDrawer(false)} />}
      </SheetContent>
    </Sheet>
    <Dialog open={account} onOpenChange={setAccount}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Connexion simulée</DialogTitle><DialogDescription>Aucun compte n’est créé. Vos choix de lecture restent sur cet appareil, sans synchronisation.</DialogDescription></DialogHeader>
        <p className="text-sm text-muted-foreground">{connected ? "La simulation est active." : "Vous pouvez lire librement, sans connexion."}</p>
        <Button onClick={() => { toggleConnected(); setAccount(false); }}>{connected ? "Quitter la simulation" : "Simuler une connexion"}</Button>
      </DialogContent>
    </Dialog>
  </div>;
}