import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { accentClasses, materialLayers, products, RATING_MAX } from "@/data/products";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "What is carpet underlay?", a: "Carpet underlay is the cushioning layer installed between your carpet and the subfloor. You never see it once the carpet is laid, but it shapes how the floor feels, sounds and wears." },
  { q: "How thick should carpet underlay be?", a: "FOOTMATE comes in two thicknesses: 9 mm (Cosy and Serenity) and 11 mm (Comfort and Plush). The 9 mm profiles are the ones the FOOTMATE booklet lists as suitable for staircases; the 11 mm profiles add extra cushioning for living areas and bedrooms. Your flooring professional can confirm the right choice for your carpet." },
  { q: "What is the best carpet underlay for stairs?", a: "Within the FOOTMATE range, Cosy (9 mm HD+) and Serenity (9 mm UHD) are the two underlays the finalised booklet identifies as ideal for staircases." },
  { q: "What is the best carpet underlay for bedrooms?", a: "For the most cushioned feel, Plush (11 mm UHD) has the highest bounce rating in the FOOTMATE range. Comfort (11 mm HD+) offers balanced everyday cushioning for bedrooms and living areas." },
  { q: "What do HD+ and UHD mean?", a: "They are FOOTMATE's density classifications. UHD sits higher in the range than HD+. Measured density figures are available on request." },
  { q: "What is FOOTMATE carpet underlay made from?", a: `Rebonded polyurethane foam made from post-consumer waste, built in three layers: ${materialLayers.join(", ").toLowerCase()}.` },
];

export const Route = createFileRoute("/carpet-underlay")({
  head: () => {
    const base = seo(
      "Carpet Underlay Guide: Thickness, Stairs & Bedrooms",
      "How to choose carpet underlay in Australia: 9 mm vs 11 mm, the best underlay for stairs and bedrooms, HD+ vs UHD, and recycled polyurethane foam from FOOTMATE.",
      "/carpet-underlay",
      "article",
    );
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.footmate.com.au/" }, { "@type": "ListItem", position: 2, name: "Carpet underlay", item: "https://www.footmate.com.au/carpet-underlay" }] }) },
      ],
    };
  },
  component: CarpetUnderlayPage,
});

const by = (mm: number) => products.filter((p) => p.thicknessMm === mm);

function CarpetUnderlayPage() {
  const stairs = products.filter((p) => p.staircaseSuitability);
  const bedroom = [...products].filter((p) => p.thicknessMm === 11).sort((a, b) => (b.bounceRating ?? 0) - (a.bounceRating ?? 0));
  return (
    <>
      <Breadcrumbs items={[{ label: "Carpet underlay" }]} />
      <PageHero eyebrow="Carpet underlay guide" title="Carpet underlay, explained." intro="How to choose the right carpet underlay for your home — thickness, stairs, bedrooms and recycled foam — using the facts from the FOOTMATE range." />

      <section className="container-site grid gap-16 py-24 lg:grid-cols-2">
        <Reveal><SectionHeading eyebrow="What it does" title="The layer you feel with every step." intro="Carpet underlay sits between your carpet and the subfloor. It cushions each step, supports the carpet through daily use and helps soften footfall." /></Reveal>
        <Reveal delay={100}>
          <img src={products[0]?.interiorImage} alt="FOOTMATE carpet underlay revealed beneath carpet" className="aspect-[1024/572] w-full object-contain" loading="lazy" />
        </Reveal>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="container-site py-24">
          <SectionHeading eyebrow="Thickness" title="9 mm or 11 mm?" intro="FOOTMATE carpet underlay comes in two thicknesses. Thicker isn't automatically better — the right one depends on the room." />
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {[9, 11].map((mm) => (
              <div key={mm} className="bg-background p-8">
                <p className="display-lg">{mm} mm</p>
                <p className="mt-4 text-muted-foreground">{mm === 9 ? "A practical profile, including the two FOOTMATE underlays suited to staircases." : "Extra cushioning for living areas and bedrooms where comfort matters most."}</p>
                <ul className="mt-6 space-y-2">
                  {by(mm).map((p) => (
                    <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className={cn("link-sweep font-medium", accentClasses[p.slug].text)}>FOOTMATE {p.name}</Link> <span className="text-muted-foreground">· {p.densityCategory}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-16 py-24 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Stairs" title="The best carpet underlay for stairs." intro="The finalised FOOTMATE booklet identifies these two 9 mm underlays as ideal for staircases." />
          <ul className="mt-8 space-y-4">{stairs.map((p) => <ProductLine key={p.slug} p={p} />)}</ul>
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="Bedrooms & living areas" title="The best carpet underlay for bedrooms." intro="For deep, cushioned comfort, the 11 mm profiles lead the range. Plush carries the highest bounce rating." />
          <ul className="mt-8 space-y-4">{bedroom.map((p) => <ProductLine key={p.slug} p={p} />)}</ul>
        </Reveal>
      </section>

      <section className="bg-charcoal text-charcoal-foreground">
        <div className="container-site grid gap-16 py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow opacity-70">Recycled foam</p>
            <h2 className="display-lg mt-6">Made from post-consumer waste.</h2>
            <p className="mt-6 max-w-lg leading-relaxed opacity-80">Every FOOTMATE carpet underlay is rebonded polyurethane foam made from post-consumer waste — giving end-of-life polyurethane foam another purpose. Verified recycled-content percentages are available on request.</p>
            <Link to="/sustainability" className="nav-caps link-sweep mt-8 inline-block">Read about sustainability</Link>
          </div>
          <ol className="space-y-px">
            {materialLayers.map((l, i) => (
              <li key={l} className="border border-charcoal-foreground/20 p-6"><span className="nav-caps opacity-60">Layer {i + 1}</span><p className="mt-2 text-lg font-light">{l}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow="Compare" title="The FOOTMATE carpet underlay range." />
        <div className="mt-10 overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50"><tr>{["Underlay", "Thickness", "Density", "Comfort", "Durability", "Bounce", "Stairs"].map((h) => <th key={h} className="nav-caps px-4 py-3 font-medium text-muted-foreground">{h}</th>)}</tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-t border-border">
                  <td className="px-4 py-3"><Link to="/products/$slug" params={{ slug: p.slug }} className={cn("font-medium underline", accentClasses[p.slug].text)}>{p.name}</Link></td>
                  <td className="px-4 py-3">{p.thicknessMm} mm</td><td className="px-4 py-3">{p.densityCategory}</td>
                  <td className="px-4 py-3">{p.comfortRating} / {RATING_MAX}</td><td className="px-4 py-3">{p.durabilityRating} / {RATING_MAX}</td><td className="px-4 py-3">{p.bounceRating} / {RATING_MAX}</td>
                  <td className="px-4 py-3">{p.staircaseSuitability ? "Yes" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Ratings from the finalised FOOTMATE booklet, on a six-point scale.</p>
      </section>

      <section className="container-site pb-24">
        <SectionHeading eyebrow="Questions" title="Carpet underlay FAQs." />
        <div className="mt-10"><FAQAccordion items={faqs} /></div>
      </section>

      <CTASection />
    </>
  );
}

function ProductLine({ p }: { p: (typeof products)[number] }) {
  return (
    <li className="border-l-2 pl-4" style={{ borderColor: p.accentColour }}>
      <Link to="/products/$slug" params={{ slug: p.slug }} className="font-medium link-sweep">FOOTMATE {p.name} — {p.thicknessMm} mm {p.densityCategory}</Link>
      <p className="mt-1 text-sm text-muted-foreground">{p.shortDescription}</p>
    </li>
  );
}
