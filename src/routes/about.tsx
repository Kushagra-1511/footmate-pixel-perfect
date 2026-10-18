import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-interior.jpg";
import sarvaLogo from "@/assets/sarva-logo.png";
import { Breadcrumbs, PageHero, Reveal } from "@/components/site/primitives";
import { CTASection } from "@/components/site/CTASection";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Sarva Australia", "Sarva Australia Pty Ltd is the Australian home of FOOTMATE carpet underlay, connected to Sarva Foam Industries.", "/about"),
  component: AboutPage,
});

const pillars = [
  { t: "Foam expertise", d: "Sarva Australia is connected to Sarva Foam Industries and its experience in recycled polyurethane foam manufacturing." },
  { t: "Developed for Australia", d: "FOOTMATE was developed as a focused four-product range for Australian homes and the Australian flooring trade." },
  { t: "Comfort and performance", d: "Our focus is carpet underlay — how it feels underfoot, how it supports carpet, and how it performs over time." },
  { t: "Import-led today", d: "Our current operations are import-led while we build the Australian market." },
  { t: "Manufacturing ambitions", d: "Establishing manufacturing in Australia is a long-term ambition, not a current operation." },
  { t: "Transparent relationships", d: "We're committed to quality, honest product information and lasting trade relationships." },
];

function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About Sarva" }]} />
      <PageHero eyebrow="About Sarva" title="Commitment through quality." intro="Sarva Australia Pty Ltd brings FOOTMATE to Australian floors — a premium underlay range built on experience in recycled polyurethane foam." />
      <section className="container-site grid items-center gap-16 py-24 lg:grid-cols-2">
        <img src={hero} alt="Calm, carpeted living space" width={1920} height={1152} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <div>
          <img src={sarvaLogo} alt="Sarva Foam logo" width={800} height={690} loading="lazy" className="h-24 w-auto" />
          <p className="mt-10 text-xl leading-relaxed">
            We believe the best floors start with what's underneath. FOOTMATE is our way of making that layer something worth choosing — comfortable, considered and clearly explained.
          </p>
        </div>
      </section>
      <section className="border-t border-border bg-card">
        <div className="container-site grid gap-px bg-border py-px md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 60} className="bg-card p-8 md:p-10">
              <span className="text-xs font-semibold text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-6 text-xl font-bold">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection title="Let's build something lasting." primary={{ to: "/trade", label: "Trade enquiry" }} secondary={{ to: "/contact", label: "Contact us" }} />
    </>
  );
}
