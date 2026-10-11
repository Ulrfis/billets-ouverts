import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VERSIONS, type VersionId } from "@/data/billet";
import type { NotionDigression, NotionResonance, NotionContributor } from "@/lib/api.functions";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  carnet: string[];
  digressions: NotionDigression[];
  resonances: NotionResonance[];
  contributors: NotionContributor[];
  version: VersionId;
  onVersion: (version: VersionId) => void;
};

export function RelatedPanel({ open, onOpenChange, carnet, digressions, resonances, contributors, version, onVersion }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="font-display">Autour du billet</SheetTitle>
          <SheetDescription>Carnet, contributeurs, digressions et résonances</SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="carnet" className="p-4">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
            <TabsTrigger value="carnet">Carnet</TabsTrigger>
            <TabsTrigger value="contributors">Contributeurs</TabsTrigger>
            <TabsTrigger value="digressions">Digressions</TabsTrigger>
            <TabsTrigger value="resonances">Résonances</TabsTrigger>
            <TabsTrigger value="versions">Versions</TabsTrigger>
          </TabsList>
          <TabsContent value="carnet" className="mt-6 space-y-6">
            {carnet.length ? carnet.map((text, i) => <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-ink">{text}</p>) : <Empty />}
          </TabsContent>
          <TabsContent value="contributors" className="mt-6 space-y-6">
            {contributors.length ? contributors.map((person) => (
              <article key={person.id} className="border-b border-border pb-5">
                <h3 className="font-display text-xl">{person.name}</h3>
                {person.role && <p className="mt-1 text-sm text-primary">{person.role}</p>}
                {person.text && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{person.text}</p>}
                {person.url && <a href={person.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-primary underline">Site</a>}
              </article>
            )) : <Empty />}
          </TabsContent>
          <TabsContent value="digressions" className="mt-6 space-y-6">
            {digressions.length ? digressions.map((d) => (
              <article key={d.id} className="border-l-2 border-gold pl-4">
                <h3 className="font-display text-xl">{d.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{d.body}</p>
              </article>
            )) : <Empty />}
          </TabsContent>
          <TabsContent value="resonances" className="mt-6 space-y-6">
            {resonances.length ? resonances.map((r) => (
              <article key={r.id} className="border-b border-border pb-5">
                <p className="font-label text-xs text-primary">{r.type} · {r.voice}</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{r.text}</p>
                <p className="mt-2 text-xs text-muted-foreground">{r.author} · <em>{r.source}</em>{r.year ? `, ${r.year}` : ""} ({r.lang})</p>
                {r.url && <a href={r.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-primary underline">Source</a>}
              </article>
            )) : <Empty />}
          </TabsContent>
          <TabsContent value="versions" className="mt-6 space-y-2">
            {VERSIONS.map((v) => <Button key={v.id} variant={version === v.id ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => { onVersion(v.id); onOpenChange(false); }}>{v.label}</Button>)}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

function Empty() {
  return <p className="text-sm text-muted-foreground">Aucun élément lié à ce billet pour le moment.</p>;
}