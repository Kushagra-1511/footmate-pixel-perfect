import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products, accentClasses } from "@/data/products";
import { ProductSwatch } from "./product";

export function ProductHighlight() {
  const [i, setI] = useState(0);
  const p = products[i] ?? products[0]!;
  const a = accentClasses[p.slug];
  return (
    <section className="border-y border-border bg-card" aria-label="Product spotlight">
      <div className="grid lg:grid-cols-2">
        <div key={p.slug} className="animate-in fade-in duration-700">
          <ProductSwatch product={p} large className="aspect-square lg:aspect-auto lg:h-full lg:min-h-[640px]" />
        </div>
        <div className="flex flex-col justify-between gap-12 p-8 md:p-16">
          <div role="tablist" aria-label="Choose a product" className="flex flex-wrap gap-2">
            {products.map((x, idx) => (
              <button
                key={x.slug}
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  idx === i ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/50",
                )}
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", accentClasses[x.slug].bg)} />
                {x.name}
              </button>
            ))}
          </div>
          <div key={p.slug + "t"} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <p className="eyebrow">Spotlight</p>
            <h2 className="display-lg mt-4">FOOTMATE {p.name}</h2>
            <div className="mt-6 flex gap-8 border-y border-border py-5">
              <div><p className="text-xs text-muted-foreground">Thickness</p><p className="text-2xl font-bold">{p.thicknessMm} mm</p></div>
              <div><p className="text-xs text-muted-foreground">Classification</p><p className="text-2xl font-bold">{p.densityCategory}</p></div>
              <div><p className="text-xs text-muted-foreground">Colour</p><p className="text-2xl font-bold">{p.colourName}</p></div>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.fullDescription}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {p.keyBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm font-medium">
                  <span className={cn("h-1.5 w-1.5 rounded-full", a.bg)} />{b}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-10" size="lg">
              <Link to="/products/$slug" params={{ slug: p.slug }}>Discover {p.name}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
