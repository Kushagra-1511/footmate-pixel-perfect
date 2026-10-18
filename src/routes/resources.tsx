import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero } from "@/components/site/primitives";
import { resources, resourceCategories, TESTING_NOTICE } from "@/data/site";
import { products, accentClasses, type ProductSlug } from "@/data/products";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/resources")({
  head: () => seo("Resources — Data Sheets, Guides & Documents", "FOOTMATE technical data sheets, installation guides, warranty information and specifier resources.", "/resources"),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return resources.filter((r) => r.published && (!cat || r.category === cat) && (!s || `${r.title} ${r.description} ${r.category}`.toLowerCase().includes(s)));
  }, [q, cat]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Resources" }]} />
      <PageHero eyebrow="Resources" title="Product information, in one place." intro="Data sheets, guides and documentation for the FOOTMATE range. Documents are published here as they become available." />
      <section className="container-site py-12">
        <p className="mb-8 border-l-2 border-foreground pl-4 text-sm text-muted-foreground">{TESTING_NOTICE}</p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search resources" aria-label="Search resources" className="h-11 rounded-full bg-card pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setCat(null)} aria-pressed={!cat} className={cn("h-9 rounded-full border px-4 text-xs font-semibold", !cat ? "border-foreground bg-foreground text-background" : "border-border bg-card")}>All</button>
            {resourceCategories.map((c) => (
              <button key={c} type="button" onClick={() => setCat(cat === c ? null : c)} aria-pressed={cat === c} className={cn("h-9 rounded-full border px-4 text-xs font-semibold", cat === c ? "border-foreground bg-foreground text-background" : "border-border bg-card")}>{c}</button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">{list.length} resources</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <article key={r.id} className="lift flex flex-col border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5" strokeWidth={1.4} />
                <span className="text-xs font-semibold text-muted-foreground">{r.fileType ?? "—"}</span>
              </div>
              <p className="eyebrow mt-8">{r.category}</p>
              <h3 className="mt-2 text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
              <div className="mt-4 flex gap-1.5">
                {r.applicableProducts.map((s) => (
                  <span key={s} title={products.find((p) => p.slug === s)?.name} className={cn("h-2.5 w-2.5 rounded-full", accentClasses[s as ProductSlug].bg)} />
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5 mt-6">
                <span className="text-xs text-muted-foreground">{r.updatedAt ? `Updated ${r.updatedAt}` : "Coming soon"}</span>
                {r.fileUrl ? (
                  <Button asChild size="sm"><a href={r.fileUrl} target="_blank" rel="noreferrer">Download</a></Button>
                ) : (
                  <Link to="/contact" className="text-xs font-semibold underline underline-offset-2">Request this document</Link>
                )}
              </div>
            </article>
          ))}
        </div>
        {!list.length && <p className="mt-12 text-center text-muted-foreground">No resources match your search.</p>}
      </section>
    </>
  );
}
