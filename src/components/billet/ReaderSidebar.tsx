import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cloud, TreePine, Pause, Play, PanelLeft, UserRound, Bookmark, Snowflake, Sparkles, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useReader } from "./ReaderContext";
import cloud from "@/assets/cloud-vagues.gif.asset.json";
import tree from "@/assets/comet-arbre.gif.asset.json";
import cloudStill from "@/assets/cloud-still.jpg.asset.json";
import treeStill from "@/assets/tree-still.jpg.asset.json";

const samples = [
  { id: "fragment", label: "Fragment", icon: Bookmark, title: "Le cinéma embrasse le web", text: "Un fragment peut devenir un point de départ, pas une conclusion.", source: "Exemple préparé · billet pilote" },
  { id: "keyword", label: "Mot-clé", icon: Hash, title: "Traversées", text: "Entre le texte, l'écran et ce qui nous reste.", source: "Exemple préparé" },
  { id: "ice", label: "Glaçon", icon: Snowflake, title: "Une idée en suspension", text: "Ce que l'on garde n'a pas besoin d'être figé.", source: "Exemple préparé · sans attribution" },
  { id: "dream", label: "Rêve", icon: Sparkles, title: "La branche et l'écran", text: "Un écran devient une branche. Une image y pousse, puis s'envole vers quelqu'un d'autre.", source: "Texte préparé · pas une génération IA" },
];

function SidebarBody() {
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
      <div className="mt-10 flex items-center justify-between border-b border-sidebar-border pb-3">
        <h2 className="font-label text-xs text-sidebar-foreground">Le fil des traces</h2>
        <span className="text-xs text-muted-foreground">Exemples</span>
      </div>
      <ol className="trace-thread mt-4">
        {samples.map((trace) => <li key={trace.id} className="trace-item">
          <details>
            <summary className="cursor-pointer list-none py-3 focus-visible:outline-ring">
              <span className="flex items-center gap-2 text-xs text-primary"><trace.icon className="size-3.5" aria-hidden />{trace.label}</span>
              <span className="mt-1.5 block font-display text-base leading-snug text-sidebar-foreground">{trace.title}</span>
            </summary>
            <div className="pb-4 text-sm leading-relaxed text-muted-foreground"><p>{trace.text}</p><p className="mt-2 text-xs">{trace.source}</p></div>
          </details>
        </li>)}
      </ol>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">Maquette · traces d’exemple, non personnelles.</p>
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
        <SheetHeader className="sr-only"><SheetTitle>Le fil de vos traces</SheetTitle><SheetDescription>Exemples de fragments, mots-clés, glaçons et rêves.</SheetDescription></SheetHeader>
        {drawer && <SidebarBody />}
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