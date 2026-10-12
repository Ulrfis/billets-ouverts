import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_READER, READER_KEY, readPreferences, switchUniverse, type ReaderPreferences, type ReadingDose } from "@/lib/reader-preferences";

type ReaderContextValue = ReaderPreferences & {
  reducedMotion: boolean;
  toggleUniverse: () => void;
  setDose: (dose: ReadingDose) => void;
  togglePaused: () => void;
  toggleConnected: () => void;
};
const ReaderContext = createContext<ReaderContextValue | null>(null);

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState(DEFAULT_READER);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    try { setPrefs(readPreferences(localStorage.getItem(READER_KEY))); } catch { /* reading remains available */ }
    setReady(true);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", prefs.universe === "night");
    if (ready) {
      try { localStorage.setItem(READER_KEY, JSON.stringify(prefs)); } catch { /* no forced account or remote persistence */ }
    }
  }, [prefs, ready]);
  return <ReaderContext.Provider value={{ ...prefs, reducedMotion,
    toggleUniverse: () => setPrefs(switchUniverse),
    setDose: (dose) => setPrefs((previous) => ({ ...previous, dose })),
    togglePaused: () => setPrefs((previous) => ({ ...previous, paused: !previous.paused })),
    toggleConnected: () => setPrefs((previous) => ({ ...previous, connected: !previous.connected })),
  }}>{children}</ReaderContext.Provider>;
}

export function useReader() {
  const context = useContext(ReaderContext);
  if (!context) throw new Error("Reader controls require the shared reader provider");
  return context;
}