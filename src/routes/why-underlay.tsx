import { createFileRoute } from "@tanstack/react-router";
import stairs from "@/assets/stairs.jpg";
import { Breadcrumbs, PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { LayeredFloor } from "@/components/site/LayeredFloor";
import { FootmateFinder } from "@/components/site/FootmateFinder";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/why-underlay")({
  head: () => seo("Why Carpet Underlay Matters", "A plain-English guide to carpet underlay: comfort, carpet support, noise, warmth, thickness versus density, and how to choose the right FOOTMATE.", "/why-underlay"),
  component: WhyPage,
});

const topics = [
  { t: "Comfort", d: "Underlay adds a cushioned layer between carpet and subfloor, so each step feels softer and more forgiving." },
  { t: "Carpet support", d: "A resilient underlay helps absorb the pressure of foot traffic and furniture, supporting the carpet above it." },
  { t: "Noise reduction", d: "A cushioning layer helps soften footfall and impact sounds, particularly in upstairs rooms and hallways." },
  { t: "Thermal comfort", d: "Underlay adds a layer between the room and a cold subfloor, contributing to a warmer feel underfoot." },
];

const faqs = [
  { q: "What is carpet underlay?", a: "Underlay is the layer installed between your carpet and the subfloor. It's not visible once the carpet is laid, but it shapes how the floor feels, sounds and wears." },
  { q: "Why does underlay quality matter?", a: "A carpet is only as comfortable as what supports it. A well-chosen underlay helps the carpet feel better underfoot and supports it through daily use." },
  { q: "What's the difference between thickness and density?", a: "Thickness is the height of the underlay — FOOTMATE comes in 9 mm and 11 mm. Density classification describes how firmly the foam is bonded — FOOTMATE uses HD+ and UHD classifications, with UHD sitting higher in the range. Thicker isn't automatically better: the right balance depends on the room and the carpet." },
  { q: "Which FOOTMATE is right for stairs?", a: "Cosy and Serenity are both ideal for staircases according to the finalised FOOTMATE booklet. Confirm installation requirements with your flooring professional." },
  { q: "When should underlay be replaced?", a: "Underlay is usually replaced with the carpet. If you're laying a new carpet, it's generally recommended to install new underlay rather than re-using the old layer — your flooring professional can advise." },
  { q: "Are acoustic or thermal ratings available?", a: "Independent Australian testing documentation will be added when available. Until then, we don't publish acoustic or thermal values." },
];

function WhyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Why Underlay" }]} />
      <PageHero eyebrow="Why underlay" title="The part of the floor you never see — and always feel." intro="A clear guide to what carpet underlay does, why quality matters and how to choose the right one for your home." />

      <section className="container-site grid items-center gap-16 py-24 lg:grid-cols-2">
        <Reveal><LayeredFloor accentClass="bg-spring" /></Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="What it is" title="A quiet layer with a big job." intro="Underlay sits between your carpet and the subfloor. It cushions, supports and helps the whole floor perform as one system." />
        </Reveal>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site grid gap-px bg-border py-px md:grid-cols-2 lg:grid-cols-4">
          {topics.map((x, i) => (
            <Reveal key={x.t} delay={i * 80} className="bg-card p-8 md:p-10">
              <span className="text-xs font-semibold text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-6 text-xl font-bold">{x.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img src={stairs} alt="Carpeted staircase in a light-filled home" width={1280} height={1600} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <SectionHeading eyebrow="Thickness vs density" title="Two dials, not one." intro="Thickness sets how much cushion there is. Density classification sets how firmly it's bonded. FOOTMATE gives you both combinations." />
          <table className="mt-10 w-full border-collapse text-sm">
            <thead><tr><th className="border border-border p-4 text-left" /><th className="border border-border p-4 text-left">HD+</th><th className="border border-border p-4 text-left">UHD</th></tr></thead>
            <tbody>
              <tr><th className="border border-border p-4 text-left">9 mm</th><td className="border border-border bg-bounce/30 p-4 font-semibold">Cosy</td><td className="border border-border bg-bloom/30 p-4 font-semibold">Serenity</td></tr>
              <tr><th className="border border-border p-4 text-left">11 mm</th><td className="border border-border bg-spring/30 p-4 font-semibold">Comfort</td><td className="border border-border bg-pulse/30 p-4 font-semibold">Plush</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="finder" className="container-site scroll-mt-24 pb-24">
        <FootmateFinder />
      </section>

      <section className="container-site pb-24">
        <h2 className="display-lg mb-10">Questions, answered.</h2>
        <FAQAccordion items={faqs} />
      </section>
      <CTASection />
    </>
  );
}
