import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Layers, Thermometer, Volume2, Store, Truck, Hammer, Ruler } from "lucide-react";
import hero from "@/assets/hero-interior.jpg";
import foam from "@/assets/foam-texture.jpg";
import carpet from "@/assets/carpet-texture.jpg";
import stairs from "@/assets/stairs.jpg";
import { Button } from "@/components/ui/button";
import { Parallax, Reveal } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/product";
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

function TextLink({ to, children, light = false }: { to: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link to={to} className={`nav-caps group inline-flex items-center gap-3 border-b pb-1.5 transition-colors ${light ? "border-charcoal-foreground/50 hover:border-charcoal-foreground" : "border-foreground/30 hover:border-foreground"}`}>
      {children}<ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}

function Home() {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative isolate h-[calc(100svh-4.5rem)] min-h-[560px] overflow-hidden bg-charcoal text-charcoal-foreground">
        <Parallax speed={-0.12} className="absolute inset-0 -z-10">
          <img src={hero} alt="Sunlit living room with soft neutral carpet" width={1920} height={1152} fetchPriority="high" className="h-[112%] w-full object-cover" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
        <div className="container-site flex h-full flex-col justify-end pb-12 md:pb-16">
          <p className="nav-caps rise inline-flex w-fit bg-charcoal-foreground/90 px-4 py-2 text-charcoal">FOOTMATE by Sarva Australia</p>
          <h1 className="display-mega rise mt-6 max-w-5xl [animation-delay:120ms]">Luxury from the first step.</h1>
          <div className="rise mt-10 flex flex-wrap items-center gap-8 [animation-delay:300ms]">
            <TextLink to="/products" light>Explore the range</TextLink>
            <TextLink to="/request-samples" light>Request samples</TextLink>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="container-site py-28 md:py-44">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">Recycled. Remade. Refined.</p>
          <p className="mt-10 text-3xl font-extralight leading-[1.2] tracking-tight md:text-5xl">
            Discover FOOTMATE recycled polyurethane foam underlay—designed to bring comfort, support and lasting performance beneath your carpet.
          </p>
          <div className="mt-12"><TextLink to="/why-underlay">Why underlay matters</TextLink></div>
        </Reveal>
      </section>

      {/* Collection */}
      <section className="container-site pb-28 md:pb-40">
        <div className="flex flex-col justify-between gap-6 border-t border-foreground/80 pt-6 md:flex-row md:items-baseline">
          <h2 className="text-3xl font-light tracking-tight md:text-4xl">The collection</h2>
          <div className="flex gap-8">
            <TextLink to="/products">View all</TextLink>
            <TextLink to="/products/compare">Compare</TextLink>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-muted-foreground">Four distinct underlay options, thoughtfully developed for different flooring priorities.</p>
        <div className="mt-14 grid gap-x-6 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Editorial split — material */}
      <section className="grid lg:grid-cols-12">
        <div className="zoom-tile relative min-h-[420px] lg:col-span-7 lg:min-h-[760px]">
          <img src={foam} alt="Macro view of rebonded polyurethane foam" loading="lazy" width={1280} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center bg-secondary px-6 py-20 md:px-16 lg:col-span-5">
          <Reveal>
            <p className="eyebrow">What lies beneath matters</p>
            <h2 className="display-lg mt-6">The quality of your floor begins beneath the carpet.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Underlay is the quiet layer that shapes how a carpet feels and performs. It cushions every step, supports the carpet above it and contributes to a calmer, more comfortable room.
            </p>
            <ul className="mt-10 border-t border-border">
              {["Cushioning underfoot", "Supporting carpet performance", "Reducing impact noise", "Helping with thermal comfort", "Supporting a maintained carpet appearance"].map((t, i) => (
                <li key={t} className="flex items-baseline gap-6 border-b border-border py-4 text-sm">
                  <span className="nav-caps text-muted-foreground">0{i + 1}</span>{t}
                </li>
              ))}
            </ul>
            <div className="mt-10"><TextLink to="/why-underlay">Discover why underlay matters</TextLink></div>
          </Reveal>
        </div>
      </section>

      {/* Mosaic — spaces */}
      <section className="container-site py-28 md:py-40">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:pt-32">
            <div className="zoom-tile"><img src={stairs} alt="Carpeted staircase" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>
            <p className="nav-caps mt-4 text-muted-foreground">Stairs — consider Bounce</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-7">
            <div className="zoom-tile"><img src={hero} alt="Living room with soft carpet" loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
            <p className="nav-caps mt-4 text-muted-foreground">Living spaces</p>
            <div className="mt-16 grid grid-cols-2 gap-6">
              <div>
                <div className="zoom-tile"><img src={carpet} alt="Close-up of carpet fibres" loading="lazy" className="aspect-square w-full object-cover" /></div>
                <p className="nav-caps mt-4 text-muted-foreground">Above — carpet</p>
              </div>
              <div className="flex flex-col justify-end">
                <h2 className="text-3xl font-extralight leading-tight tracking-tight md:text-4xl">Felt in every room. Noticed with every step.</h2>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ProductHighlight />

      {/* Advantages */}
      <section className="container-site py-28 md:py-40">
        <p className="eyebrow">The FOOTMATE advantage</p>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 80} className="bg-background p-8 lg:pl-0 lg:pr-10">
              <a.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.2} aria-hidden />
              <h3 className="mt-10 text-2xl font-light tracking-tight">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recycled — split reversed */}
      <section className="grid bg-charcoal text-charcoal-foreground lg:grid-cols-12">
        <div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:order-1 lg:col-span-5">
          <Reveal>
            <p className="nav-caps text-charcoal-foreground/60">Recycled. Remade. Refined.</p>
            <h2 className="display-lg mt-6">Giving polyurethane foam another purpose.</h2>
            <p className="mt-6 leading-relaxed text-charcoal-foreground/70">
              FOOTMATE is made by recovering polyurethane foam, processing it into fine pieces and rebonding it into a resilient new sheet — turning material that has already been made into a useful layer beneath your floor.
            </p>
            <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-charcoal-foreground/15 pt-8">
              {["Recovered foam", "Processing", "Rebonded underlay", "Comfortable floors"].map((s, i) => (
                <li key={s}><span className="nav-caps text-charcoal-foreground/50">Step 0{i + 1}</span><p className="mt-1 font-light">{s}</p></li>
              ))}
            </ol>
            <div className="mt-12"><TextLink to="/sustainability" light>Explore our approach</TextLink></div>
          </Reveal>
        </div>
        <div className="zoom-tile relative min-h-[420px] lg:order-2 lg:col-span-7 lg:min-h-[720px]">
          <img src={carpet} alt="Soft woven carpet texture" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* Trade */}
      <section className="container-site py-28 md:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">For professionals</p>
            <h2 className="display-lg mt-6">Built for the flooring trade.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">A clearly differentiated range, backed by an emphasis on product information, quality and trade support.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/trade">Become a Stockist</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/request-samples">Request Trade Samples</Link></Button>
            </div>
            <div className="mt-8"><TextLink to="/contact">Contact our team</TextLink></div>
          </div>
          <ul className="border-t border-foreground/80 lg:col-span-7">
            {trade.map((t) => (
              <li key={t.title} className="group grid gap-2 border-b border-border py-8 transition-[padding] duration-500 hover:pl-4 md:grid-cols-[14rem_1fr] md:gap-8">
                <h3 className="flex items-center gap-3 text-xl font-light"><t.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.3} aria-hidden />{t.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
