import { createFileRoute, Link } from "@tanstack/react-router";
import { REACTIONS, SECTIONS, SEED_AVIS } from "@/data/billet";
import { setState, useStore } from "@/lib/store";

export const Route = createFileRoute("/moderation")({
  head: () => ({
    meta: [
      { title: "Modération — Billets ouverts" },
      { name: "description", content: "File de modération et avis agrégés du billet." },
      { property: "og:title", content: "Modération — Billets ouverts" },
      { property: "og:description", content: "File de modération et avis agrégés du billet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Moderation,
});

function Moderation() {
  const myAvis = useStore((s) => s.myAvis);
  const queue = useStore((s) => s.queue);
  const passages = SECTIONS.flatMap((s) => s.passages);
  const decide = (id: string, status: "approved" | "rejected") =>
    setState((s) => ({ ...s, queue: s.queue.map((q) => (q.id === id ? { ...q, status } : q)) }));

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link to="/" className="text-sm text-primary">← Retour au billet</Link>
      <h1 className="mt-4 text-4xl">Modération</h1>

      <section className="mt-10" aria-labelledby="h-avis">
        <h2 id="h-avis" className="text-2xl">Avis par passage</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-3">Passage</th>
                {REACTIONS.map((r) => <th key={r.id} className="px-2 py-2">{r.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {passages.map((p, i) => (
                <tr key={p.id} className="border-b border-border">
                  <td className="max-w-xs truncate py-2 pr-3 text-muted-foreground">¶{i + 1} {p.text.replace(/\[\[\w+\|([^\]]+)\]\]/g, "$1").slice(0, 60)}…</td>
                  {REACTIONS.map((r) => (
                    <td key={r.id} className="px-2 text-center">{(SEED_AVIS[p.id]?.[r.id] ?? 0) + (myAvis[p.id] === r.id ? 1 : 0) || "·"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="h-queue">
        <h2 id="h-queue" className="text-2xl">File d'attente</h2>
        {queue.length === 0 && <p className="mt-4 text-muted-foreground">Aucune contribution pour l'instant.</p>}
        <ul className="mt-4 space-y-3">
          {[...queue].reverse().map((q) => (
            <li key={q.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-label text-orange">{q.kind}</span>
                {q.passageId && <span className="text-muted-foreground">passage {q.passageId.slice(1)}</span>}
                {q.name && <span className="text-muted-foreground">· {q.name}</span>}
                <span className={`ml-auto rounded px-2 py-0.5 ${q.status === "approved" ? "bg-accent text-primary" : q.status === "rejected" ? "bg-rose/10 text-rose" : "bg-gold/15 text-ink"}`}>
                  {q.status === "pending" ? "en attente" : q.status === "approved" ? "approuvé" : "rejeté"}
                </span>
              </div>
              <p className="mt-2 text-ink">{q.text}</p>
              {q.url && <a href={q.url} className="text-sm text-primary underline" target="_blank" rel="noreferrer">{q.url}</a>}
              <div className="mt-3 flex gap-2">
                <button onClick={() => decide(q.id, "approved")} className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">Approuver</button>
                <button onClick={() => decide(q.id, "rejected")} className="rounded-md border border-border px-3 py-1 text-sm">Rejeter</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
