import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FileText, Check } from "lucide-react";
import stairs from "@/assets/stairs.jpg";
import hero from "@/assets/hero-interior.jpg";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, Reveal } from "@/components/site/primitives";
import { onAccent, ColourBadge, CompareToggle, ProductCard, ProductRatings, ProductSwatch, SpecTable } from "@/components/site/product";
import { accentClasses, getProduct, products } from "@/data/products";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Product unavailable | FOOTMATE" }, { name: "robots", content: "noindex" }] };
    const base = seo(
      `FOOTMATE ${p.name} — ${p.thicknessMm} mm ${p.densityCategory} Carpet Underlay`,
      `${p.shortDescription} FOOTMATE ${p.name} is a ${p.thicknessMm} mm ${p.densityCategory} recycled polyurethane foam carpet underlay.`,
      `/products/${params.slug}`,
      "product",
    );
    return {
      ...base,
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: `FOOTMATE ${p.name}`, description: p.shortDescription, brand: { "@type": "Brand", name: "FOOTMATE" }, color: p.colourName }) }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const a = accentClasses[p.slug];
  const related = products.filter((x) => x.slug !== p.slug);

  return (
    <>
      <section aria-label={`FOOTMATE ${p.name}`} className={cn("grain relative overflow-hidden", a.bg, onAccent[p.slug])}>
        <img src={p.textureImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply" />
        <div className="container-site relative z-[2] pb-10 pt-12 md:pt-16">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.22em] opacity-80">
            <span>FOOTMATE · {p.colourName}</span>
            <span>{p.thicknessMm} mm · {p.densityCategory}</span>
          </div>
          <p aria-hidden className="display-product rise mt-10 select-none">{p.name}</p>
        </div>
      </section>
      <Breadcrumbs items={[{ label: "Products", to: "/products" }, { label: p.name }]} />
      <section className="container-site grid gap-10 pb-20 pt-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductSwatch product={p} large className="aspect-square rounded-[2rem] lg:sticky lg:top-24" />
        </div>
        <div className="lg:col-span-5 lg:pt-6">
          <ColourBadge product={p} />
          <h1 className="display-xl mt-6">{p.name}</h1>
          <p className="mt-4 text-xl font-semibold">{p.thicknessMm} mm · {p.densityCategory} classification</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p.fullDescription}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg"><Link to="/request-samples" search={{ product: p.slug }}>Request a {p.name} sample</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/trade">Trade enquiry</Link></Button>
          </div>
          <div className="mt-6"><CompareToggle product={p} /></div>

          <div className="mt-12 border-t border-border pt-8">
            <h2 className="eyebrow mb-5">Sample-book ratings</h2>
            <ProductRatings product={p} />
          </div>

          <div className="mt-12">
            <h2 className="eyebrow mb-5">Key features</h2>
            <ul className="space-y-3">
              {p.keyBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className={cn("mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full", a.bg)}><Check className="h-3 w-3 text-foreground" /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="eyebrow mb-5">Recommended applications</h2>
            {p.suitableApplications.length ? (
              <div className="flex flex-wrap gap-2">
                {p.suitableApplications.map((s) => <span key={s} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">{s}</span>)}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Verified application guidance is available on request. <Link to="/contact" className="underline underline-offset-2">Ask our team</Link>.</p>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold">Technical specifications</h2>
            <p className="mt-3 text-sm text-muted-foreground">Values marked "Available on request" will be published once verified documentation is supplied.</p>
            <div className="mt-8"><SpecTable product={p} /></div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-bold">Documentation</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {p.downloadableDocuments.map((d) => (
                <li key={d.kind} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3 text-sm font-semibold"><FileText className="h-4 w-4" strokeWidth={1.5} />{d.label}</span>
                  {d.url ? (
                    <Button asChild size="sm" variant="outline"><a href={d.url} target="_blank" rel="noreferrer">Download</a></Button>
                  ) : (
                    <Link to="/contact" className="text-xs font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground">Available on request</Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <img src={p.staircaseSuitability ? stairs : hero} alt="Carpeted interior" width={1280} height={1600} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="flex flex-col justify-end bg-secondary p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{p.sustainabilityInformation}</p>
                <Link to="/sustainability" className="mt-4 text-sm font-semibold underline underline-offset-2">Our approach</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display-lg">Explore the rest of the range.</h2>
          <Button asChild variant="outline"><Link to="/products/compare">Compare {p.name} with others</Link></Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <ProductCard key={r.slug} product={r} />)}
        </div>
      </section>
    </>
  );
}
