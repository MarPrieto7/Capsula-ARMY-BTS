import { useCallback, useEffect, useState } from "react";
import type { Capsule } from "@/data/capsule";

const KEY = "purple-capsule-history";
const MAX = 5;

export function useCapsuleHistory() {
  const [history, setHistory] = useState<Capsule[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persist = (next: Capsule[]) => {
    setHistory(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const add = useCallback((c: Capsule) => {
    setHistory(prev => {
      const filtered = prev.filter(p => p.id !== c.id);
      const next = [c, ...filtered].slice(0, MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const clear = useCallback(() => persist([]), []);

  return { history, add, clear };
}
