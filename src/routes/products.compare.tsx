import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero } from "@/components/site/primitives";
import { useCompare } from "@/components/site/compare-context";
import { accentClasses, products, UNVERIFIED, type Product, type Rating } from "@/data/products";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products/compare")({
  head: () => seo("Compare FOOTMATE Carpet Underlay", "Compare FOOTMATE Spring, Bounce, Pulse and Bloom side by side — thickness, density classification, suitability and documentation.", "/products/compare"),
  component: ComparePage,
});

const r = (v: Rating) => (v === null ? UNVERIFIED : `${v} / 5`);
const rows: { label: string; get: (p: Product) => string }[] = [
  { label: "Thickness", get: (p) => `${p.thicknessMm} mm` },
  { label: "Density category", get: (p) => p.densityCategory },
  { label: "Comfort rating", get: (p) => r(p.comfortRating) },
  { label: "Durability rating", get: (p) => r(p.durabilityRating) },
  { label: "Bounce rating", get: (p) => r(p.bounceRating) },
  { label: "Thermal information", get: (p) => p.thermalInformation ?? UNVERIFIED },
  { label: "Sound information", get: (p) => p.soundInformation ?? UNVERIFIED },
  { label: "Staircase suitability", get: (p) => (p.staircaseSuitability === true ? "Suitable" : p.staircaseSuitability === false ? "Not recommended" : UNVERIFIED) },
  { label: "Recommended applications", get: (p) => (p.suitableApplications.length ? p.suitableApplications.join(", ") : UNVERIFIED) },
  { label: "Technical documents", get: (p) => (p.downloadableDocuments.some((d) => d.url) ? "Available to download" : "Available on request") },
];
const muted = (v: string) => v === UNVERIFIED || v === "Available on request";

function ComparePage() {
  const { selected, toggle, setAll } = useCompare();
  const list = products.filter((p) => selected.includes(p.slug));

  return (
    <>
      <Breadcrumbs items={[{ label: "Products", to: "/products" }, { label: "Compare" }]} />
      <PageHero eyebrow="Compare" title="Side by side." intro="Choose two to four FOOTMATE products. Unverified values are clearly marked and never estimated." />
      <section className="container-site py-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2">Selected</span>
          {products.map((p) => {
            const on = selected.includes(p.slug);
            return (
              <button key={p.slug} type="button" aria-pressed={on} onClick={() => toggle(p.slug)} className={cn("inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold", on ? "border-foreground bg-foreground text-background" : "border-border bg-card")}>
                <span className={cn("h-2.5 w-2.5 rounded-full", accentClasses[p.slug].bg)} />{p.name}
              </button>
            );
          })}
          <Button variant="link" size="sm" onClick={() => setAll(products.map((p) => p.slug))}>Select all</Button>
        </div>

        {list.length < 2 ? (
          <div className="mt-12 border border-dashed border-border p-12 text-center">
            <p className="text-lg font-semibold">Select at least two products to compare.</p>
            <Button className="mt-6" onClick={() => setAll(products.map((p) => p.slug))}>Compare all four</Button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-12 hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-56 text-left" scope="col"><span className="sr-only">Attribute</span></th>
                    {list.map((p) => (
                      <th key={p.slug} scope="col" className="p-0 text-left align-bottom">
                        <div className={cn("h-2", accentClasses[p.slug].bg)} />
                        <div className="border-x border-border bg-card p-5">
                          <p className="text-2xl font-bold">{p.name}</p>
                          <p className="mt-1 text-xs font-normal text-muted-foreground">{p.colourName}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-t border-border">
                      <th scope="row" className="py-4 pr-4 text-left font-semibold text-muted-foreground">{row.label}</th>
                      {list.map((p) => {
                        const v = row.get(p);
                        return <td key={p.slug} className={cn("border-x border-border bg-card px-5 py-4", muted(v) ? "italic text-muted-foreground" : "font-semibold")}>{v}</td>;
                      })}
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td />
                    {list.map((p) => (
                      <td key={p.slug} className="border-x border-b border-border bg-card px-5 py-5">
                        <div className="flex flex-col gap-2">
                          <Button asChild size="sm"><Link to="/products/$slug" params={{ slug: p.slug }}>View {p.name}</Link></Button>
                          <Button asChild size="sm" variant="outline"><Link to="/request-samples" search={{ product: p.slug }}>Request sample</Link></Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="mt-10 space-y-6 md:hidden">
              {list.map((p) => (
                <div key={p.slug} className="border border-border bg-card">
                  <div className={cn("h-2", accentClasses[p.slug].bg)} />
                  <div className="p-5">
                    <p className="text-2xl font-bold">{p.name}</p>
                    <dl className="mt-4 divide-y divide-border">
                      {rows.map((row) => {
                        const v = row.get(p);
                        return (
                          <div key={row.label} className="grid grid-cols-2 gap-3 py-3 text-sm">
                            <dt className="text-muted-foreground">{row.label}</dt>
                            <dd className={muted(v) ? "italic text-muted-foreground" : "font-semibold"}>{v}</dd>
                          </div>
                        );
                      })}
                    </dl>
                    <Button asChild size="sm" className="mt-4 w-full"><Link to="/products/$slug" params={{ slug: p.slug }}>View {p.name}</Link></Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
