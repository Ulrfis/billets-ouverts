import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { addToQueue, type QueueItem } from "@/lib/store";
import { CONFIRM } from "./Passage";

const KINDS: QueueItem["kind"][] = ["note", "commentaire", "résonance", "tangente"];

export function ContributeDialog({ open, onOpenChange, passageId }: { open: boolean; onOpenChange: (v: boolean) => void; passageId?: string | undefined }) {
  const [kind, setKind] = useState<QueueItem["kind"]>("note");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { if (open) { setDone(false); setText(""); setUrl(""); setOk(false); } }, [open]);

  const field = "w-full rounded-md border border-input bg-background p-2 text-sm";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Contribuer</DialogTitle>
          <DialogDescription>{passageId ? `À propos du passage ${passageId.slice(1)}` : "À propos du billet entier"}</DialogDescription>
        </DialogHeader>
        {done ? (
          <p role="status" className="py-6 text-center text-primary">{CONFIRM}</p>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              addToQueue({ kind, text, url: url || undefined, name, passageId });
              setDone(true);
            }}
          >
            <fieldset>
              <legend className="mb-1 text-sm font-medium text-ink">Type</legend>
              <div className="flex flex-wrap gap-2">
                {KINDS.map((k) => (
                  <label key={k} className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${kind === k ? "border-primary bg-accent text-primary" : "border-border"}`}>
                    <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} className="sr-only" />
                    {k}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="c-text" className="text-sm font-medium text-ink">Votre texte</label>
              <textarea id="c-text" required rows={4} value={text} onChange={(e) => setText(e.target.value)} className={field} />
            </div>
            {kind === "résonance" && (
              <div>
                <label htmlFor="c-url" className="text-sm font-medium text-ink">URL de la résonance</label>
                <input id="c-url" type="url" required value={url} onChange={(e) => setUrl(e.target.value)} className={field} />
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-sm font-medium text-ink">Nom ou pseudonyme</label>
                <input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} className={field} />
              </div>
              <div>
                <label htmlFor="c-mail" className="text-sm font-medium text-ink">E-mail <span className="font-normal text-muted-foreground">(facultatif, jamais affiché)</span></label>
                <input id="c-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" required checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-1" />
              J'accepte la publication sous licence CC BY-NC-SA 4.0 et la modération préalable.
            </label>
            <button type="submit" className="w-full rounded-md bg-primary py-2 text-primary-foreground">Envoyer</button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
