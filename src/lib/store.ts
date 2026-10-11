import { useSyncExternalStore } from "react";
import type { ReactionId } from "@/data/billet";

export type QueueItem = {
  id: string;
  kind: "commentaire" | "tangente" | "note" | "résonance";
  passageId?: string;
  text: string;
  url?: string;
  name?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

type State = {
  myAvis: Record<string, ReactionId>;
  queue: QueueItem[];
  consent: boolean | null;
  spent: number; // mock $ spent this month
};

const KEY = "billets-ouverts-v1";
const initial: State = { myAvis: {}, queue: [], consent: null, spent: 4.2 };
let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
}

export function setState(fn: (s: State) => State) {
  load();
  state = fn(state);
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  // notify once after load so hydrated clients pick up stored state
  queueMicrotask(l);
  return () => listeners.delete(l);
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
