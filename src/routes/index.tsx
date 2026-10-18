import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Layers, Thermometer, Volume2, Store, Truck, Hammer, Ruler } from "lucide-react";
import hero from "@/assets/hero-interior.jpg";
import foam from "@/assets/foam-texture.jpg";
import carpet from "@/assets/carpet-texture.jpg";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/product";
import { LayeredFloor } from "@/components/site/LayeredFloor";
import { ProductHighlight } from "@/components/site/ProductHighlight";
import { CTASection } from "@/components/site/CTASection";
import { products } from "@/data/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Carpet Underlay Australia — Luxury from the first step",
      "FOOTMATE recycled polyurethane foam carpet underlay. Four distinct products — Spring, Bounce, Pulse and Bloom — for comfort and lasting performance beneath Australian floors.",
      "/",
    ),
  component: Home,
});

const advantages = [
  { icon: Feather, title: "Everyday Comfort", text: "A softer, more welcoming feel with every step across the room." },
  { icon: Layers, title: "Lasting Support", text: "A resilient layer that helps your carpet keep its shape and feel." },
  { icon: Thermometer, title: "Thermal Insulation", text: "An added layer between your floor and the subfloor below." },
  { icon: Volume2, title: "Sound Absorption", text: "Helps soften footfall and impact noise through the home." },
];

const trade = [
  { icon: Store, title: "Flooring retailers", text: "A clearly differentiated four-product range that's easy to explain at the counter." },
  { icon: Truck, title: "Distributors", text: "Discuss supply and regional distribution opportunities with our team." },
  { icon: Hammer, title: "Installers", text: "Practical 9 mm and 11 mm profiles, including a staircase-suited option." },
  { icon: Ruler, title: "Architects & specifiers", text: "Clear product classifications and documentation as it is published." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="container-site grid gap-10 pb-16 pt-12 lg:grid-cols-12 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-6 lg:pt-10">
            <p className="eyebrow animate-in fade-in duration-700">FOOTMATE by Sarva Australia</p>
            <h1 className="display-xl mt-8 animate-in fade-in slide-in-from-bottom-3 duration-1000">
              Luxury from the first step.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground animate-in fade-in duration-1000">
              Discover FOOTMATE recycled polyurethane foam underlay—designed to bring comfort, support and lasting performance beneath your carpet.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/products">Explore the Range</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/request-samples">Request Samples</Link></Button>
            </div>
            <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              <div><dt className="text-xs text-muted-foreground">Products</dt><dd className="text-2xl font-bold">4</dd></div>
              <div><dt className="text-xs text-muted-foreground">Profiles</dt><dd className="text-2xl font-bold">9 · 11 mm</dd></div>
              <div><dt className="text-xs text-muted-foreground">Classes</dt><dd className="text-2xl font-bold">HD+ · UHD</dd></div>
            </dl>
          </div>
          <div className="relative lg:col-span-6">
            <img src={hero} alt="Sunlit living room with soft neutral carpet" width={1920} height={1152} fetchPriority="high" className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]" />
            <div className="absolute -bottom-6 left-4 w-40 bg-card p-2 shadow-lift md:-left-10 md:w-56">
              <div className="grid grid-rows-[1fr_auto] gap-0">
                <img src={carpet} alt="" aria-hidden className="h-16 w-full object-cover md:h-20" />
                <div className="flex h-8">
                  {products.map((p) => (
                    <span key={p.slug} className={`flex-1 bg-${p.accentToken}`} />
                  ))}
                </div>
              </div>
              <p className="px-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Beneath the surface</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantage */}
      <section className="border-y border-border bg-card">
        <div className="container-site grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 80} className="bg-card p-8 md:p-10">
              <a.icon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-8 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Range */}
      <section className="container-site py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="The range" title="Find your perfect FOOTMATE." intro="Four distinct underlay options, thoughtfully developed for different flooring priorities." />
          <Button asChild variant="link"><Link to="/products/compare">Compare all four <ArrowRight /></Link></Button>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Beneath */}
      <section className="container-site grid items-center gap-16 pb-24 md:pb-32 lg:grid-cols-2">
        <Reveal><LayeredFloor /></Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">What lies beneath matters</p>
          <h2 className="display-lg mt-5">The quality of your floor begins beneath the carpet.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Underlay is the quiet layer that shapes how a carpet feels and performs. It cushions every step, supports the carpet above it and contributes to a calmer, more comfortable room.
          </p>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {["Cushioning underfoot", "Supporting carpet performance", "Reducing impact noise", "Helping with thermal comfort", "Supporting a maintained carpet appearance"].map((t, i) => (
              <li key={t} className="flex items-center gap-5 py-4 text-sm font-semibold">
                <span className="text-xs text-muted-foreground">0{i + 1}</span>{t}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-10"><Link to="/why-underlay">Discover Why Underlay Matters</Link></Button>
        </Reveal>
      </section>

      <ProductHighlight />

      {/* Recycled */}
      <section className="container-site py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Recycled. Remade. Refined.</p>
            <h2 className="display-lg mt-5">Giving polyurethane foam another purpose.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              FOOTMATE is made by recovering polyurethane foam, processing it into fine pieces and rebonding it into a resilient new sheet — turning material that has already been made into a useful layer beneath your floor.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-10"><Link to="/sustainability">Explore Our Approach</Link></Button>
          </div>
          <div className="lg:col-span-7">
            <img src={foam} alt="Close-up of rebonded polyurethane foam" width={1280} height={1280} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <ol className="mt-6 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
              {["Recovered foam", "Processing", "Rebonded underlay", "Comfortable floors"].map((s, i) => (
                <li key={s} className="bg-background p-5">
                  <span className="text-xs font-semibold text-muted-foreground">Step 0{i + 1}</span>
                  <p className="mt-2 font-bold">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Trade */}
      <section className="bg-secondary">
        <div className="container-site py-24 md:py-32">
          <SectionHeading eyebrow="For professionals" title="Built for the flooring trade." intro="A clearly differentiated range, backed by an emphasis on product information, quality and trade support." />
          <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {trade.map((t, i) => (
              <Reveal key={t.title} delay={i * 80} className="bg-secondary p-8">
                <t.icon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-8 text-lg font-bold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/trade">Become a Stockist</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/request-samples">Request Trade Samples</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/contact">Contact Our Team</Link></Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
