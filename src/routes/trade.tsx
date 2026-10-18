import { createFileRoute } from "@tanstack/react-router";
import { Store, Truck, Hammer, Ruler, Building2, Briefcase, ArrowRight } from "lucide-react";
import { Breadcrumbs, PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { tradeCategories } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/trade")({
  head: () => seo("Carpet Underlay Suppliers — Trade & Professionals", "Trade enquiries for flooring retailers, distributors, installers, architects and builders. Become a FOOTMATE stockist or request a trade sample kit.", "/trade"),
  component: TradePage,
});

const audiences = [
  { icon: Store, t: "Retailers", d: "A clear four-product story that's easy to present and easy for customers to choose from." },
  { icon: Truck, t: "Distributors", d: "Talk to us about regional supply and distribution opportunities across Australia." },
  { icon: Hammer, t: "Installers", d: "Practical 9 mm and 11 mm profiles, with staircase-suited options in Cosy and Serenity." },
  { icon: Ruler, t: "Architects & interior designers", d: "Product classifications and specification support, with documentation added as it's verified." },
  { icon: Building2, t: "Builders & developers", d: "A consistent underlay range for multi-dwelling and residential projects." },
  { icon: Briefcase, t: "Commercial flooring buyers", d: "Discuss volume requirements and the right product for your project." },
];

function TradePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Trade & Professionals" }]} />
      <PageHero eyebrow="Trade & professionals" title="A partner for the Australian flooring trade." intro="Sarva Australia supplies a clearly differentiated underlay range, backed by an emphasis on product information, quality and trade relationships." />

      <section className="container-site py-24">
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.t} delay={i * 60} className="bg-background p-8 md:p-10">
              <a.icon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-8 text-xl font-bold">{a.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="container-site py-20">
          <p className="eyebrow text-ink-foreground/60">Commercial pathways</p>
          <ul className="mt-8 grid gap-px bg-ink-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {tradeCategories.map((c) => (
              <li key={c}>
                <a href="#trade-form" className="group flex h-full items-center justify-between gap-4 bg-ink p-6 text-lg font-semibold hover:bg-ink-foreground/5">
                  {c} <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="trade-form" className="container-site grid scroll-mt-24 gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Trade enquiry" title="Start a conversation." intro="Tell us about your business and what you need. Our team will review your enquiry and respond by email." />
        </div>
        <div className="lg:col-span-8"><EnquiryForm mode="trade" /></div>
      </section>
    </>
  );
}
