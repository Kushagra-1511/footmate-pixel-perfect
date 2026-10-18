import { Link, useLocation } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { accentClasses, getProduct } from "@/data/products";
import { useCompare } from "./compare-context";

export function CompareBar() {
  const { selected, toggle, clear } = useCompare();
  const { pathname } = useLocation();
  if (selected.length === 0 || pathname === "/products/compare") return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-full border border-border bg-card/95 py-2 pl-5 pr-2 shadow-lift backdrop-blur">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-sm font-semibold">{selected.length} selected</span>
          <ul className="hidden gap-1.5 sm:flex">
            {selected.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => toggle(s)} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold" aria-label={`Remove ${getProduct(s)?.name}`}>
                  <span className={cn("h-2 w-2 rounded-full", accentClasses[s].bg)} />
                  {getProduct(s)?.name}
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="sm" onClick={clear}>Clear</Button>
          <Button asChild size="sm" disabled={selected.length < 2}>
            <Link to="/products/compare">{selected.length < 2 ? "Select 2+ to compare" : "Compare"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
