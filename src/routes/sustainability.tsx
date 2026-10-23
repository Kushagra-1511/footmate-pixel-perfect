import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { Breadcrumbs, Motto, PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { CTASection } from "@/components/site/CTASection";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sustainability")({
  head: () => seo("Recycled Polyurethane Underlay — Sustainability", "How FOOTMATE gives recovered polyurethane foam another purpose through rebonding — an evidence-led approach with transparent disclosure.", "/sustainability"),
  component: SustainabilityPage,
});

/** Verified figures go here. Leave empty until documented. */
const verifiedFigures: { label: string; value: string; source: string }[] = [];

const steps = [
  { t: "Recovered foam", d: "Polyurethane foam that has already been produced is collected for re-use rather than treated as waste." },
  { t: "Processing", d: "The foam is sorted and broken down into small pieces of consistent size." },
  { t: "Rebonding", d: "The pieces are bonded together under pressure to form a new, resilient foam sheet." },
  { t: "Comfortable floors", d: "The sheet is cut to FOOTMATE profiles and installed beneath carpet in homes." },
];

const sections = [
  { t: "Material recovery and waste diversion", d: "Rebond foam gives material that already exists a second, practical use. Any quantified diversion figures will be published only once they're independently documented." },
  { t: "Circular-economy principles", d: "Keeping materials in use for longer is at the heart of rebond foam. We aim to apply this thinking across sourcing, production and end-of-life." },
  { t: "Recycled content vs recyclability", d: "Recycled content describes what a product is made from. Recyclability describes what can happen to it after use. They're different claims, and we treat them separately." },
  { t: "Future Australian manufacturing", d: "Sarva Australia's current model is import-led. Establishing manufacturing in Australia is a future ambition, not a current operation." },
  { t: "Testing and transparent disclosure", d: "We'll publish environmental and performance information only when it's backed by documentation. Independent Australian testing documentation will be added when available." },
];

function SustainabilityPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Sustainability" }]} />
      <PageHero eyebrow="Sustainability" title={<Motto />} intro="FOOTMATE is built on a simple idea: give polyurethane foam another purpose, and make it something people genuinely want beneath their floors." />

      <section className="container-site py-24">
        <SectionHeading eyebrow="The process" title="From recovered foam to a comfortable floor." />
        <ol className="mt-14 grid gap-px bg-border md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 100} className="bg-background">
              <li className="flex h-full flex-col p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-foreground text-sm font-bold">0{i + 1}</span>
                <h3 className="mt-10 text-xl font-bold">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-card">
        <div className="container-site grid gap-16 py-24 lg:grid-cols-2">
          <img src={products[0]?.productImage} alt="Comfort panel showing the rebonded polyurethane foam edge" loading="lazy" className="aspect-[4/3] w-full object-contain" />
          <div className="divide-y divide-border">
            {sections.map((s) => (
              <Reveal key={s.t} className="py-7 first:pt-0">
                <h3 className="text-xl font-bold">{s.t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <SectionHeading eyebrow="Verified figures" title="Numbers, when they're proven." />
        {verifiedFigures.length ? (
          <dl className="mt-10 grid gap-6 md:grid-cols-3">
            {verifiedFigures.map((f) => (
              <div key={f.label} className="border-t border-foreground pt-5"><dt className="text-sm text-muted-foreground">{f.label}</dt><dd className="mt-2 text-4xl font-bold">{f.value}</dd><p className="mt-2 text-xs text-muted-foreground">{f.source}</p></div>
            ))}
          </dl>
        ) : (
          <p className="mt-8 max-w-2xl border-l-2 border-foreground pl-6 text-lg text-muted-foreground">
            We don't publish recycled-content percentages, carbon savings or environmental certifications until they're independently verified. This section will be updated as documentation becomes available.
          </p>
        )}
      </section>
      <CTASection title="Comfort with a considered story." primary={{ to: "/products", label: "Explore FOOTMATE" }} secondary={{ to: "/resources", label: "View resources" }} />
    </>
  );
}
