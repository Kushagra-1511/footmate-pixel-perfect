import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";

/**
 * Interactive spectrum of the four product colours — hover a band to let it
 * breathe and reveal its product. Pure colour, no photography.
 */
export function ColourRibbon() {
  return (
    <section aria-label="The FOOTMATE colour spectrum" className="group/ribbon flex h-[26rem] flex-col md:h-[30rem] md:flex-row">
      {products.map((p) => (
        <Link
          key={p.slug}
          to="/products/$slug"
          params={{ slug: p.slug }}
          className="group/band relative flex flex-1 flex-col justify-between overflow-hidden p-6 transition-[flex-grow] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:flex-[2.2] focus-visible:flex-[2.2] md:p-10"
          style={{ backgroundColor: p.accentColour }}
          aria-label={`Discover FOOTMATE ${p.name}`}
        >
          <p className="nav-caps text-charcoal/70">FOOTMATE</p>
          <div>
            <p className="text-3xl font-light tracking-tight text-charcoal md:text-5xl">{p.name}</p>
            <p className="nav-caps mt-3 text-charcoal/70">{p.densityCategory} · {p.thicknessMm} mm</p>
            <p className="nav-caps mt-6 inline-flex items-center gap-2 text-charcoal opacity-0 transition-opacity duration-500 group-hover/band:opacity-100 group-focus-visible/band:opacity-100">
              Discover <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
