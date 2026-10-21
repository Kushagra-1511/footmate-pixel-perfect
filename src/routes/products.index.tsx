import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/product";
import { CTASection } from "@/components/site/CTASection";
import { products, type DensityCategory, type ProductSlug } from "@/data/products";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products/")({
  head: () =>
    seo(
      "The FOOTMATE Range — Rebond Foam Carpet Underlay",
      "Browse and compare FOOTMATE Comfort, Cosy, Plush and Serenity — high-density recycled polyurethane carpet underlay in 9 mm and 11 mm, HD+ and UHD.",
      "/products",
    ),
  component: ProductsPage,
});

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button variant="outline" type="button" aria-pressed={on} onClick={onClick} className={cn("h-9 rounded-none border px-4 text-sm font-semibold transition-colors", on ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/40")}>
      {children}
    </Button>
  );
}

function ProductsPage() {
  const [thick, setThick] = useState<number | null>(null);
  const [density, setDensity] = useState<DensityCategory | null>(null);
  const [only, setOnly] = useState<ProductSlug | null>(null);
  const [stairs, setStairs] = useState(false);

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (thick === null || p.thicknessMm === thick) &&
          (density === null || p.densityCategory === density) &&
          (only === null || p.slug === only) &&
          (!stairs || p.staircaseSuitability === true),
      ),
    [thick, density, only, stairs],
  );
  const active = thick !== null || density !== null || only !== null || stairs;

  return (
    <>
      <Breadcrumbs items={[{ label: "Products" }]} />
      <PageHero eyebrow="The FOOTMATE range" title="Explore the FOOTMATE collection." intro="Four distinct underlays. One commitment to comfort." />

      <section className="container-site py-12 md:py-16">
        <div className="z-30 -mx-5 flex flex-col gap-4 border-b border-border bg-background/90 px-5 py-4 backdrop-blur md:mx-0 md:px-0 lg:sticky lg:top-18 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-1">Thickness</span>
              {[9, 11].map((t) => <Chip key={t} on={thick === t} onClick={() => setThick(thick === t ? null : t)}>{t} mm</Chip>)}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-1">Density</span>
              {(["HD+", "UHD"] as const).map((d) => <Chip key={d} on={density === d} onClick={() => setDensity(density === d ? null : d)}>{d}</Chip>)}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-1">Product</span>
              {products.map((p) => <Chip key={p.slug} on={only === p.slug} onClick={() => setOnly(only === p.slug ? null : p.slug)}>{p.name}</Chip>)}
            </div>
            <div className="flex items-center gap-2">
              <span className="eyebrow mr-1">Use</span>
              <Chip on={stairs} onClick={() => setStairs(!stairs)}>Staircases</Chip>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" aria-live="polite">{list.length} of {products.length} products</span>
            {active && <Button variant="ghost" size="sm" onClick={() => { setThick(null); setDensity(null); setOnly(null); setStairs(false); }}>Reset filters</Button>}
          </div>
        </div>

        {list.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">No products match those filters.</p>
        )}

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border py-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Not sure which to choose?</h2>
            <p className="mt-2 text-muted-foreground">Answer five quick questions, or compare the range side by side.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild><Link to="/why-underlay" hash="finder">Find your FOOTMATE</Link></Button>
            <Button asChild variant="outline"><Link to="/products/compare">Compare products</Link></Button>
          </div>
        </div>
      </section>
      <CTASection title="Feel the difference in person." primary={{ to: "/request-samples", label: "Request Samples" }} secondary={{ to: "/trade", label: "Trade Enquiry" }} />
    </>
  );
}
