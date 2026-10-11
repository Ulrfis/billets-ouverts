import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { BILLET, SECTIONS, MARGINALIA, DIGRESSIONS, CARNET, VERSION_META, GENEALOGY, type Section, type VersionId } from "@/data/billet";
import { PassageBlock } from "@/components/billet/Passage";
import { DialoguePanel } from "@/components/billet/Dialogue";
import { ContributeDialog } from "@/components/billet/Contribute";
import { getFeatureStatus, getNotionContent, type NotionResonance, type NotionDigression, type NotionContributor } from "@/lib/api.functions";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { RelatedPanel } from "@/components/billet/RelatedPanel";

const notionQuery = queryOptions({ queryKey: ["billet-notion"], queryFn: () => getNotionContent(), staleTime: 60_000 });

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(notionQuery),
  head: ({ loaderData }) => ({
    meta: [
      { title: "Billet ouvert - une expérimentation de lecture immersive" },
      { name: "description", content: "Un essai ouvert : réagissez passage par passage, dépliez les digressions, dialoguez avec le texte." },
      { property: "og:title", content: "Et si… le cinéma embrassait le web ?" },
      { property: "og:description", content: "Un billet ouvert sur le cinéma et le web, à lire et à prolonger." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      ...(loaderData?.ok && loaderData.cover ? [
        { property: "og:image", content: loaderData.cover },
        { name: "twitter:image", content: loaderData.cover },
      ] : []),
    ],
  }),
  component: Index,
});

const noteColor = { "écho": "text-primary", contrepoint: "text-rose", prolongement: "text-orange" } as const;

function Index() {
  const [sections, setSections] = useState<Section[]>(SECTIONS);
  const [source, setSource] = useState<"mock" | "notion">("mock");
  const [features, setFeatures] = useState({ dialogue: false, stt: false, tts: false, notion: false });
  const [version, setVersion] = useState<VersionId>("original");
  const [dlg, setDlg] = useState<{ sectionId: string; passage: string; title: string; seed?: string | undefined } | null>(null);
  const [contrib, setContrib] = useState<{ passageId?: string | undefined } | null>(null);
  const [marginFor, setMarginFor] = useState<string | null>(null);
  const [genealogy, setGenealogy] = useState(false);
  const [related, setRelated] = useState(false);
  const [cover, setCover] = useState("");
  const [linkedDigressions, setLinkedDigressions] = useState<NotionDigression[]>([]);
  const [contributors, setContributors] = useState<NotionContributor[]>([]);
  const [meta, setMeta] = useState({ title: BILLET.title, date: BILLET.date });
  const [digressions, setDigressions] = useState<Record<string, { title: string; body: string }> | undefined>(undefined);
  const [resonances, setResonances] = useState<NotionResonance[]>([]);
  const [carnet, setCarnet] = useState<string[] | undefined>(undefined);
  const [relecture, setRelecture] = useState<{ note: string; paragraphs: string[] } | null>(null);
  const queue = useStore((s) => s.queue);
  const status = useServerFn(getFeatureStatus);
  const { data: notionContent } = useSuspenseQuery(notionQuery);

  useEffect(() => {
    status().then(setFeatures).catch(() => {});
    Promise.resolve(notionContent)
      .then((r) => {
        if (!r.ok) return;
        let n = 0;
        setSections(r.sections.map((s, i) => ({ id: `s${i + 1}`, title: s.title, passages: s.paragraphs.map((t) => ({ id: `p${++n}`, text: t })) })));
        if (r.title) setMeta({ title: r.title, date: r.date || BILLET.date });
        const digs: Record<string, { title: string; body: string }> = {};
        for (const d of r.digressions) if (/^d\d+$/.test(d.id)) digs[d.id] = { title: d.title, body: d.body };
        setDigressions(digs);
        setLinkedDigressions(r.digressions);
        setContributors(r.contributors);
        setCover(r.cover);
        setResonances(r.resonances);
        setCarnet(r.carnet);
        const rel = r.versions.find((v) => v.paragraphs.length);
        if (rel) setRelecture({ note: `${rel.title} — version chargée depuis Notion.`, paragraphs: rel.paragraphs });
        setSource("notion");
      })
      .catch(() => {});
  }, [status, notionContent]);

  const findPassage = (pid: string) => {
    for (const s of sections) {
      const p = s.passages.find((x) => x.id === pid);
      if (p) return { s, p };
    }
    return undefined;
  };
  const openDialogue = (pid: string, seed?: string) => {
    const f = findPassage(pid);
    if (f) setDlg({ sectionId: f.s.id, title: f.s.title, passage: f.p.text.replace(/\[\[\w+\|([^\]]+)\]\]/g, "$1"), seed });
  };
  const publishedTangents = useMemo(() => queue.filter((q) => q.kind === "tangente" && q.status === "approved"), [queue]);
  const vm = version !== "original" ? (version === "relecture" && relecture ? relecture : VERSION_META[version]) : null;
  let pIndex = 0;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <p className="font-display text-lg text-ink md:text-xl">Billet ouvert - une expérimentation de lecture immersive</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24">
        <div className="mx-auto max-w-[42rem] pt-16 lg:mr-[calc(16rem+4rem)] lg:ml-auto xl:mr-auto xl:translate-x-[-8rem]">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{meta.title}</h1>
          {cover && <img src={cover} alt={`Couverture du billet « ${meta.title} »`} className="mt-6 h-auto w-full object-contain" />}
          <p className="mt-4 text-sm text-muted-foreground">
            {BILLET.author} · {meta.date}
          </p>

          <Button variant="link" className="mt-5 h-auto px-0" onClick={() => setRelated(true)}><BookOpen aria-hidden="true" />Autour du billet</Button>
        </div>

        <div key={version} className="animate-fade-rise">
          {version === "original" ? (
            sections.map((s) => (
              <section key={s.id} aria-labelledby={`h-${s.id}`} className="mt-14">
                <div className="mx-auto max-w-[42rem] lg:mr-[calc(16rem+4rem)] lg:ml-auto xl:mr-auto xl:translate-x-[-8rem]">
                  <h2 id={`h-${s.id}`} className="text-2xl font-semibold md:text-3xl">{s.title}</h2>
                </div>
                <div className="mt-6 space-y-6">
                  {s.passages.map((p) => {
                    pIndex++;
                    const notes = source === "mock" ? MARGINALIA.filter((n) => n.passageId === p.id) : [];
                    return (
                      <div key={p.id} className="relative mx-auto max-w-[42rem] lg:mr-[calc(16rem+4rem)] lg:ml-auto xl:mr-auto xl:translate-x-[-8rem]">
                        <PassageBlock
                          id={p.id}
                          index={pIndex}
                          text={p.text}
                          onDialogue={openDialogue}
                          onContribute={(pid) => setContrib({ passageId: pid })}
                          onMargin={setMarginFor}
                          digressions={digressions}
                        />
                        {notes.length > 0 && (
                          <aside aria-label="Notes marginales" className="absolute top-1 left-full ml-12 hidden w-64 space-y-4 lg:block">
                            {notes.map((n) => <NoteCard key={n.id} n={n} />)}
                          </aside>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mx-auto mt-6 max-w-[42rem] lg:mr-[calc(16rem+4rem)] lg:ml-auto xl:mr-auto xl:translate-x-[-8rem]">
                  <button
                    onClick={() => { const first = s.passages[0]; if (first) openDialogue(first.id); }}
                    className="group inline-flex items-center gap-2 text-sm text-primary"
                  >
                    <span aria-hidden className="inline-block h-px w-6 bg-primary transition-all group-hover:w-10" />
                    Dialoguer avec ce passage
                  </button>
                </div>
              </section>
            ))
          ) : (
            <div className="mx-auto mt-12 max-w-[42rem] lg:mr-[calc(16rem+4rem)] lg:ml-auto xl:mr-auto xl:translate-x-[-8rem]">
              <p className="mb-6 flex items-center justify-between gap-4 rounded-md bg-paper px-4 py-3 text-sm text-muted-foreground">
                <span>{vm?.note}</span>
                <button onClick={() => setVersion("original")} className="shrink-0 text-primary underline">Revenir à l'original</button>
              </p>
              <div className={cn("space-y-6", version === "remix" && "space-y-4")}>
                {vm?.paragraphs.map((t, i) => (
                  <p key={i} className={cn("prose-billet", version === "remix" && "font-display text-2xl text-ink")}>{t}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto mt-20 max-w-[42rem] border-t border-border pt-10 text-center lg:mr-[calc(16rem+4rem)] lg:ml-auto xl:mr-auto xl:translate-x-[-8rem]">
          <h2 className="text-2xl">Ce billet est ouvert</h2>
          <p className="mt-2 text-muted-foreground">Une note, un commentaire, une résonance, une tangente ?</p>
          <button onClick={() => setContrib({})} className="mt-5 rounded-md bg-primary px-5 py-2.5 text-primary-foreground">Contribuer</button>
        </div>
      </main>

      <footer className="border-t border-border bg-paper py-8 text-center text-xs text-muted-foreground">
        Texte et contributions sous licence{" "}
        <a className="text-primary underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>
        {" "}· Prototype UX
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          <Button variant="link" size="sm" onClick={() => setRelated(true)}>Autour du billet</Button>
          <Button variant="link" size="sm" onClick={() => setGenealogy(true)}>Généalogie</Button>
          <Button asChild variant="link" size="sm"><Link to="/moderation">Modération</Link></Button>
        </div>
      </footer>

      <RelatedPanel open={related} onOpenChange={setRelated} carnet={carnet ?? CARNET}
        digressions={source === "notion" ? linkedDigressions : Object.entries(DIGRESSIONS).map(([id, d]) => ({ id, ...d, anchor: "" }))}
        resonances={source === "notion" ? resonances : MARGINALIA.map((n) => ({ ...n, url: "" }))}
        contributors={contributors} version={version} onVersion={setVersion} />
      <DialoguePanel
        open={!!dlg}
        onOpenChange={(v) => !v && setDlg(null)}
        title={dlg?.title ?? ""}
        passage={dlg?.passage ?? ""}
        seed={dlg?.seed}
        features={features}
        carnet={carnet}
      />
      <ContributeDialog open={!!contrib} onOpenChange={(v) => !v && setContrib(null)} passageId={contrib?.passageId} />

      <Sheet open={!!marginFor} onOpenChange={(v) => !v && setMarginFor(null)}>
        <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-display">Notes marginales</SheetTitle>
            <SheetDescription>Échos, contrepoints et prolongements</SheetDescription>
          </SheetHeader>
          <div className="space-y-5 p-4">
            {MARGINALIA.filter((n) => n.passageId === marginFor).map((n) => <NoteCard key={n.id} n={n} />)}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={genealogy} onOpenChange={setGenealogy}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-display">Généalogie du billet</SheetTitle>
            <SheetDescription>Original, versions, remix et tangentes publiées</SheetDescription>
          </SheetHeader>
          <ol className="space-y-1 p-4">
            {[...GENEALOGY, ...publishedTangents.map((t) => ({ id: t.id, kind: "Tangente", title: t.text.slice(0, 60), by: t.name || "Anonyme", date: t.createdAt.slice(0, 10), depth: 2 }))].map((g) => (
              <li key={g.id} style={{ paddingLeft: `${g.depth * 1.25}rem` }} className="relative">
                <div className={cn("border-l-2 py-2 pl-3", g.kind === "Original" ? "border-primary" : g.kind === "Tangente" ? "border-orange" : g.kind === "Remix" ? "border-rose" : "border-gold")}>
                  <div className="font-label text-[0.65rem] text-muted-foreground">{g.kind}</div>
                  <div className="text-sm font-medium text-ink">{g.title}</div>
                  <div className="text-xs text-muted-foreground">{g.by} · {g.date}</div>
                </div>
              </li>
            ))}
          </ol>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function NoteCard({ n }: { n: (typeof MARGINALIA)[number] }) {
  return (
    <div className="text-sm leading-snug">
      <div className={cn("font-label text-[0.65rem]", noteColor[n.type])}>{n.type} · {n.voice}</div>
      <p className="mt-1 text-muted-foreground">{n.text}</p>
      <p className="mt-1 text-xs text-ink">— {n.author}, <em>{n.source}</em>, {n.year} <span className="text-muted-foreground">({n.lang})</span></p>
    </div>
  );
}
