import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { products, accentClasses } from "@/data/products";
import { onAccent } from "./product";

/** Full-bleed product showcase — the whole section takes on the selected product's colour. */
export function ProductHighlight() {
  const [i, setI] = useState(0);
  const p = products[i] ?? products[0]!;
  const ink = onAccent[p.slug];
  return (
    <section
      aria-label="Product spotlight"
      style={{ backgroundColor: p.accentColour }}
      className={cn("grain overflow-hidden transition-[background-color,color] duration-700", ink)}
    >
      <img src={p.textureImage} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply" />
      <div className="container-site relative z-[2] py-16 md:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="eyebrow text-current opacity-80">The collection — 0{i + 1} / 04</p>
          <div role="tablist" aria-label="Choose a product" className="flex flex-wrap gap-2">
            {products.map((x, idx) => (
              <button
                key={x.slug}
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={cn(
                  "inline-flex items-center gap-2 border px-4 py-2 nav-caps transition-all duration-500",
                  idx === i ? "border-charcoal bg-charcoal text-charcoal-foreground" : "border-current/30 hover:border-current",
                )}
              >
                <span className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-charcoal-foreground/60", accentClasses[x.slug].bg)} />
                {x.name}
              </button>
            ))}
          </div>
        </div>

        <h2 key={p.slug} className="display-product rise mt-10 select-none md:mt-6" aria-live="polite">
          {p.name}
        </h2>

        <div key={p.slug + "b"} className="rise mt-10 grid gap-10 border-t border-current/25 pt-10 [animation-delay:150ms] lg:grid-cols-12">
          <dl className="grid grid-cols-3 gap-6 lg:col-span-5">
            <div><dt className="text-xs font-semibold opacity-70">Thickness</dt><dd className="mt-1 text-4xl font-light tracking-tight md:text-5xl">{p.thicknessMm}<span className="text-lg">mm</span></dd></div>
            <div><dt className="text-xs font-semibold opacity-70">Class</dt><dd className="mt-1 text-4xl font-light tracking-tight md:text-5xl">{p.densityCategory}</dd></div>
            <div><dt className="text-xs font-semibold opacity-70">Colour</dt><dd className="mt-1 text-xl font-light md:text-2xl">{p.colourName}</dd></div>
          </dl>
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-lg font-medium leading-relaxed md:text-xl">{p.fullDescription}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {p.keyBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />{b}
                </li>
              ))}
            </ul>
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="nav-caps group mt-10 inline-flex items-center gap-3 border-b border-current pb-1.5"
            >
              Discover {p.name}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
