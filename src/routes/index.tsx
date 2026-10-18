import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Layers, Thermometer, Volume2, Store, Truck, Hammer, Ruler } from "lucide-react";
import hero from "@/assets/hero-interior.jpg";
import foam from "@/assets/foam-texture.jpg";
import carpet from "@/assets/carpet-texture.jpg";
import { Button } from "@/components/ui/button";
import { Marquee, Parallax, Reveal, SectionHeading } from "@/components/site/primitives";
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
      {/* Hero — campaign composition */}
      <section className="relative isolate overflow-hidden bg-charcoal text-charcoal-foreground">
        <Parallax speed={-0.15} className="absolute inset-0 -z-10">
          <img src={hero} alt="Sunlit living room with soft neutral carpet" width={1920} height={1152} fetchPriority="high" className="h-[115%] w-full object-cover opacity-55" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        <div className="container-site flex min-h-[calc(100svh-4rem)] flex-col justify-between pb-10 pt-10 md:pt-14">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-charcoal-foreground/80 rise">FOOTMATE by Sarva Australia</p>
            <div className="hidden gap-1.5 md:flex rise [animation-delay:300ms]">
              {products.map((p) => <span key={p.slug} className={`h-3 w-3 rounded-full bg-${p.accentToken}`} />)}
            </div>
          </div>
          <div className="mt-16">
            <h1 className="display-mega">
              <span className="rise block">Luxury</span>
              <span className="rise block [animation-delay:120ms]">
                from the <span className="text-outline">first</span>
              </span>
              <span className="rise block [animation-delay:240ms]">
                step<span className="text-bloom">.</span>
              </span>
            </h1>
            <div className="mt-10 grid gap-8 border-t border-charcoal-foreground/20 pt-8 md:grid-cols-12 rise [animation-delay:450ms]">
              <p className="max-w-lg text-lg leading-relaxed text-charcoal-foreground/80 md:col-span-6">
                Discover FOOTMATE recycled polyurethane foam underlay—designed to bring comfort, support and lasting performance beneath your carpet.
              </p>
              <div className="flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end">
                <Button asChild size="lg" variant="light"><Link to="/products">Explore the Range</Link></Button>
                <Button asChild size="lg" variant="lightOutline"><Link to="/request-samples">Request Samples</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product marquee */}
      <section aria-label="The FOOTMATE range" className="border-y border-border bg-background py-6">
        <Marquee>
          {products.map((p) => (
            <span key={p.slug} className="flex items-center gap-8 pr-8 text-6xl font-extrabold tracking-[-0.06em] md:text-8xl">
              {p.name}
              <span className={`h-6 w-6 rounded-full md:h-9 md:w-9 bg-${p.accentToken}`} />
              <span className="text-outline text-foreground/70">{p.thicknessMm}mm {p.densityCategory}</span>
              <span className="h-px w-16 bg-border" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* Range — staggered editorial grid */}
      <section className="container-site py-24 md:py-36">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-5">The range — four ways to walk</p>
            <h2 className="display-lg md:[font-size:clamp(3rem,6vw,6rem)] md:leading-[0.92]">Find your perfect <span className="italic font-light">FOOTMATE.</span></h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-lg leading-relaxed text-muted-foreground">Four distinct underlay options, thoughtfully developed for different flooring priorities.</p>
            <Button asChild variant="link" className="mt-3 px-0"><Link to="/products/compare">Compare all four <ArrowRight /></Link></Button>
          </div>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className={i % 2 === 1 ? "xl:translate-y-16" : ""}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Advantages — dark tactile band */}
      <section className="grain bg-charcoal text-charcoal-foreground">
        <div className="container-site relative z-[2] grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-charcoal-foreground/60">The FOOTMATE advantage</p>
            <h2 className="display-lg mt-5">Felt in every room. <span className="text-charcoal-foreground/40">Noticed with every step.</span></h2>
            <Parallax speed={0.08} className="mt-12 hidden lg:block">
              <img src={foam} alt="Macro view of rebonded polyurethane foam" loading="lazy" width={1280} height={1280} className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            </Parallax>
          </div>
          <ol className="lg:col-span-7">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <li className="group grid grid-cols-[auto_1fr] items-start gap-6 border-t border-charcoal-foreground/15 py-8 md:gap-10 md:py-10">
                  <span className="text-5xl font-extrabold tracking-tighter text-charcoal-foreground/25 transition-colors duration-500 group-hover:text-bounce md:text-7xl">0{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-4">
                      <a.icon className="h-6 w-6 text-charcoal-foreground/70" strokeWidth={1.4} aria-hidden />
                      <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">{a.title}</h3>
                    </div>
                    <p className="mt-3 max-w-md leading-relaxed text-charcoal-foreground/65">{a.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Beneath — layered composition */}
      <section className="relative overflow-hidden">
        <div className="container-site grid items-center gap-16 py-24 md:py-36 lg:grid-cols-2">
          <Reveal className="relative">
            <Parallax speed={0.06}><LayeredFloor /></Parallax>
            <img src={carpet} alt="" aria-hidden loading="lazy" className="absolute -bottom-10 -right-6 hidden h-44 w-44 rounded-full object-cover shadow-lift ring-8 ring-background md:block" />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">What lies beneath matters</p>
            <h2 className="display-lg mt-5">The quality of your floor begins <span className="text-spring">beneath</span> the carpet.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Underlay is the quiet layer that shapes how a carpet feels and performs. It cushions every step, supports the carpet above it and contributes to a calmer, more comfortable room.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {["Cushioning underfoot", "Supporting carpet performance", "Reducing impact noise", "Helping with thermal comfort", "Supporting a maintained carpet appearance"].map((t, i) => (
                <li key={t} className="group flex items-center gap-5 py-4 text-sm font-semibold transition-[padding] duration-500 hover:pl-3">
                  <span className="text-xs text-muted-foreground group-hover:text-foreground">0{i + 1}</span>{t}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-10"><Link to="/why-underlay">Discover Why Underlay Matters</Link></Button>
          </Reveal>
        </div>
      </section>

      <ProductHighlight />

      {/* Recycled — full-bleed texture */}
      <section className="relative isolate overflow-hidden">
        <Parallax speed={-0.1} className="absolute inset-0 -z-10">
          <img src={foam} alt="Close-up of rebonded polyurethane foam" width={1280} height={1280} loading="lazy" className="h-[120%] w-full object-cover" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/10" />
        <div className="container-site py-24 md:py-40">
          <div className="max-w-xl">
            <p className="eyebrow">Recycled. Remade. Refined.</p>
            <h2 className="display-lg mt-5 md:[font-size:clamp(3rem,5.5vw,5.5rem)] md:leading-[0.95]">Giving polyurethane foam another purpose.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              FOOTMATE is made by recovering polyurethane foam, processing it into fine pieces and rebonding it into a resilient new sheet — turning material that has already been made into a useful layer beneath your floor.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-10"><Link to="/sustainability">Explore Our Approach</Link></Button>
          </div>
          <ol className="mt-16 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {["Recovered foam", "Processing", "Rebonded underlay", "Comfortable floors"].map((s, i) => (
              <Reveal key={s} delay={i * 90}>
                <li className="rounded-2xl bg-card/90 p-5 shadow-soft backdrop-blur">
                  <span className={`block h-2 w-8 rounded-full bg-${products[i]!.accentToken}`} />
                  <span className="mt-4 block text-xs font-semibold text-muted-foreground">Step 0{i + 1}</span>
                  <p className="mt-1 font-extrabold">{s}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Trade */}
      <section className="bg-secondary">
        <div className="container-site py-24 md:py-32">
          <SectionHeading eyebrow="For professionals" title="Built for the flooring trade." intro="A clearly differentiated range, backed by an emphasis on product information, quality and trade support." />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trade.map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div style={{ ["--acc" as string]: products[i]!.accentColour }} className="lift-accent group h-full rounded-2xl bg-card p-8">
                  <span className={`grid h-12 w-12 place-items-center rounded-full bg-${products[i]!.accentToken}/20 transition-colors duration-500 group-hover:bg-${products[i]!.accentToken}`}>
                    <t.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="mt-8 text-xl font-extrabold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </div>
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
