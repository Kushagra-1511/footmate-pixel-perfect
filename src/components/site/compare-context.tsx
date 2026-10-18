import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ProductSlug } from "@/data/products";

interface CompareCtx {
  selected: ProductSlug[];
  toggle: (slug: ProductSlug) => void;
  clear: () => void;
  has: (slug: ProductSlug) => boolean;
  setAll: (slugs: ProductSlug[]) => void;
}

const Ctx = createContext<CompareCtx | null>(null);
const KEY = "footmate-compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ProductSlug[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSelected(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: ProductSlug[]) => {
    setSelected(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <Ctx.Provider
      value={{
        selected,
        has: (s) => selected.includes(s),
        toggle: (s) =>
          persist(selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s].slice(-4)),
        clear: () => persist([]),
        setAll: persist,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCompare() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCompare must be used within CompareProvider");
  return c;
}
