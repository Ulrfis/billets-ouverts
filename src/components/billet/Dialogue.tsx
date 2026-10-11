import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { dialogueReply, transcribe, speak } from "@/lib/api.functions";
import { CARNET } from "@/data/billet";
import { setState, useStore } from "@/lib/store";

type Msg = { role: "user" | "assistant"; content: string };
const BUDGET = 30;

function toBase64(buf: ArrayBuffer) {
  const b = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode(...b.subarray(i, i + 0x8000));
  return btoa(s);
}

export function DialoguePanel({
  open,
  onOpenChange,
  title,
  passage,
  seed,
  features,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  passage: string;
  seed?: string;
  features: { dialogue: boolean; stt: boolean; tts: boolean };
}) {
  const consent = useStore((s) => s.consent);
  const spent = useStore((s) => s.spent);
  const queue = useStore((s) => s.queue);
  const [step, setStep] = useState<"consent" | "chat">("consent");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"texte" | "voix">("texte");
  const [notice, setNotice] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [live, setLive] = useState("");
  const recRef = useRef<MediaRecorder | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const reply = useServerFn(dialogueReply);
  const stt = useServerFn(transcribe);
  const tts = useServerFn(speak);

  useEffect(() => {
    if (open) {
      setStep("consent");
      setMsgs([]);
      setInput(seed ?? "");
      setNotice(null);
      setMode("texte");
    }
  }, [open, seed]);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, live]);

  const voiceAvailable = features.stt && features.tts;

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next = [...msgs, { role: "user" as const, content: text.trim() }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    const resonances = queue.filter((q) => q.status === "approved" && q.kind === "résonance").map((q) => `- ${q.text} ${q.url ?? ""}`);
    const r = await reply({ data: { passage, context: [...CARNET, ...resonances].join("\n"), messages: next } });
    setBusy(false);
    if (!r.ok) {
      setMsgs([...next, { role: "assistant", content: `⚠ ${r.error}` }]);
      return;
    }
    setMsgs([...next, { role: "assistant", content: r.text }]);
    setState((s) => ({ ...s, spent: s.spent + (r.cost ?? 0.001) }));
    if (mode === "voix") {
      const a = await tts({ data: { text: r.text } });
      if (a.ok) new Audio(`data:${a.mime};base64,${a.audio}`).play().catch(() => {});
      else {
        setNotice("Voix indisponible — passage en mode texte.");
        setMode("texte");
      }
    }
  }

  async function startRec() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setLive("Transcription…");
        const blob = new Blob(chunks, { type: rec.mimeType });
        const r = await stt({ data: { audio: toBase64(await blob.arrayBuffer()), mime: rec.mimeType || "audio/webm" } });
        if (!r.ok) {
          setLive("");
          setNotice("Voix indisponible — passage en mode texte.");
          setMode("texte");
          return;
        }
        setLive(r.text);
        setTimeout(() => setLive(""), 600);
        send(r.text);
      };
      rec.start();
      recRef.current = rec;
      setRecording(true);
      setLive("Écoute…");
    } catch {
      setNotice("Micro inaccessible — passage en mode texte.");
      setMode("texte");
    }
  }
  function stopRec() {
    recRef.current?.stop();
    setRecording(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-display text-xl">Dialoguer avec ce passage</SheetTitle>
          <SheetDescription>{title}</SheetDescription>
          <div className="mt-2" aria-label={`Budget : ${spent.toFixed(2)} sur ${BUDGET} dollars ce mois`}>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="font-label">Budget dialogue</span>
              <span>{spent.toFixed(2)} $ / {BUDGET} $ ce mois</span>
            </div>
            <div className="mt-1 h-1 rounded-full bg-paper">
              <div className="h-1 rounded-full bg-gold transition-all" style={{ width: `${Math.min((spent / BUDGET) * 100, 100)}%` }} />
            </div>
          </div>
        </SheetHeader>

        {step === "consent" ? (
          <div className="flex-1 space-y-4 overflow-y-auto p-5 text-sm leading-relaxed text-muted-foreground">
            <h3 className="font-display text-lg">Avant de commencer</h3>
            <p>Les réponses s'appuient uniquement sur ce passage, les carnets de l'auteur et les résonances validées.</p>
            <p>Acceptez-vous que la transcription de cet échange soit conservée pour nourrir le billet ? Sans votre accord, la conversation est éphémère : rien n'est enregistré.</p>
            {!features.dialogue && <p role="alert" className="text-rose">Le dialogue n'est pas encore configuré (clé OpenRouter manquante).</p>}
            <div className="flex flex-col gap-2 pt-2">
              <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" onClick={() => { setState((s) => ({ ...s, consent: true })); setStep("chat"); }}>
                J'accepte la conservation
              </button>
              <button className="rounded-md border border-border px-4 py-2 text-ink" onClick={() => { setState((s) => ({ ...s, consent: false })); setStep("chat"); }}>
                Conversation éphémère
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-border px-5 py-2 text-xs">
              <span className="text-muted-foreground">{consent ? "Transcription conservée" : "Éphémère — rien n'est stocké"}</span>
              <div role="radiogroup" aria-label="Mode" className="flex gap-1">
                {(["texte", "voix"] as const).map((m) => (
                  <button
                    key={m}
                    role="radio"
                    aria-checked={mode === m}
                    onClick={() => {
                      if (m === "voix" && !voiceAvailable) { setNotice("Voix indisponible — mode texte uniquement."); return; }
                      setMode(m);
                    }}
                    className={`font-label rounded px-2 py-0.5 ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            {notice && <p role="status" className="bg-gold/15 px-5 py-2 text-xs text-ink">{notice}</p>}
            <div className="flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
              <blockquote className="border-l-2 border-primary pl-3 text-sm italic text-muted-foreground line-clamp-4">{passage}</blockquote>
              {msgs.map((m, i) => (
                <div key={i} className={m.role === "user" ? "ml-8 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground" : "text-sm leading-relaxed text-ink"}>
                  {m.content}
                </div>
              ))}
              {busy && <p className="text-sm text-muted-foreground animate-pulse">Le texte réfléchit…</p>}
              {live && <p className="text-sm italic text-orange">« {live} »</p>}
              <div ref={endRef} />
            </div>
            <div className="border-t border-border p-4">
              {mode === "voix" ? (
                <button
                  onClick={recording ? stopRec : startRec}
                  disabled={busy}
                  aria-pressed={recording}
                  className={`w-full rounded-md px-4 py-3 text-primary-foreground ${recording ? "bg-rose" : "bg-primary"}`}
                >
                  {recording ? "Terminer et envoyer" : "Parler"}
                </button>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                  <label htmlFor="dlg-input" className="sr-only">Votre message</label>
                  <textarea
                    id="dlg-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                    rows={2}
                    placeholder="Votre question au texte…"
                    className="flex-1 resize-none rounded-md border border-input bg-background p-2 text-sm"
                  />
                  <button type="submit" disabled={busy || !input.trim()} className="rounded-md bg-primary px-4 text-sm text-primary-foreground disabled:opacity-50">
                    Envoyer
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
