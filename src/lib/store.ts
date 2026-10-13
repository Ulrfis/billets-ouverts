import { useSyncExternalStore } from "react";
import type { ReactionId } from "@/data/billet";
import { addTrace, normalizeTraces, removeTrace, toggleTraceSelection, TRACES_VERSION, type Trace } from "@/lib/traces";

export type QueueItem = {
  id: string;
  kind: "commentaire" | "tangente" | "note" | "résonance";
  passageId?: string | undefined;
  text: string;
  url?: string | undefined;
  name?: string | undefined;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

type State = {
  myAvis: Record<string, ReactionId>;
  queue: QueueItem[];
  consent: boolean | null;
  spent: number; // mock $ spent this month
  traces: Trace[];
  tracesVersion: number;
  storageError: boolean;
};

const KEY = "billets-ouverts-v1";
const initial: State = { myAvis: {}, queue: [], consent: null, spent: 4.2, traces: [], tracesVersion: TRACES_VERSION, storageError: false };
let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...initial, ...parsed, traces: normalizeTraces(parsed?.traces), tracesVersion: TRACES_VERSION, storageError: false };
    }
  } catch {
    /* ignore */
  }
}

export function setState(fn: (s: State) => State) {
  load();
  state = fn(state);
  try {
    const { storageError: _ignored, ...persisted } = state;
    localStorage.setItem(KEY, JSON.stringify(persisted));
    if (state.storageError) state = { ...state, storageError: false };
  } catch {
    // keep traces in memory: reading continues even if the device refuses to save
    state = { ...state, storageError: true };
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  // notify once after load so hydrated clients pick up stored state
  queueMicrotask(() => l());
  return () => {
    listeners.delete(l);
  };
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => sel(state),
    () => sel(initial),
  );
}

export function addToQueue(item: Omit<QueueItem, "id" | "status" | "createdAt">) {
  setState((s) => ({
    ...s,
    queue: [
      ...s.queue,
      { ...item, id: crypto.randomUUID(), status: "pending", createdAt: new Date().toISOString() },
    ],
  }));
}

export function setAvis(passageId: string, r: ReactionId) {
  setState((s) => ({ ...s, myAvis: { ...s.myAvis, [passageId]: r } }));
}

export function keepTrace(input: Omit<Trace, "id" | "createdAt">) {
  setState((s) => ({ ...s, traces: addTrace(s.traces, input, crypto.randomUUID(), new Date().toISOString()) }));
}

export function forgetTrace(id: string) {
  setState((s) => ({ ...s, traces: removeTrace(s.traces, id) }));
}

export function selectTrace(id: string) {
  setState((s) => ({ ...s, traces: toggleTraceSelection(s.traces, id) }));
}
