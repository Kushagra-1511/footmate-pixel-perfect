import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Layers, Recycle, Volume2, Store, Truck, Hammer, Ruler } from "lucide-react";
import hero from "@/assets/hero-family.png.asset.json";
import skyline from "@/assets/footmate-skyline-campaign.png.asset.json";
import { Button } from "@/components/ui/button";
import { Motto, Reveal } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/product";
import { CTASection } from "@/components/site/CTASection";
import { products } from "@/data/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "FOOTMATE — Premium Carpet Underlay | Luxury from the first step",
      "FOOTMATE recycled polyurethane foam carpet underlay. Four distinct products — Comfort, Cosy, Plush and Serenity — for comfort and lasting performance beneath Australian floors.",
      "/",
    ),
  component: Home,
});

const advantages = [
  { icon: Feather, title: "Everyday Comfort", text: "A softer, more welcoming feel with every step across the room." },
  { icon: Layers, title: "Lasting Support", text: "A resilient layer that helps your carpet keep its shape and feel." },
  { icon: Recycle, title: "Recycled Foam", text: "Made from rebonded post-consumer polyurethane foam — material given another purpose." },
  { icon: Volume2, title: "Sound Absorption", text: "Helps soften footfall and impact noise through the home." },
];

const trade = [
  { icon: Store, title: "Flooring retailers", text: "A clearly differentiated four-product range that's easy to explain at the counter." },
  { icon: Truck, title: "Distributors", text: "Discuss supply and regional distribution opportunities with our team." },
  { icon: Hammer, title: "Installers", text: "Practical 9 mm and 11 mm profiles, including two staircase-suited options." },
  { icon: Ruler, title: "Architects & specifiers", text: "Clear product classifications and documentation as it is published." },
];

function TextLink({ to, children, light = false }: { to: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link to={to} className={`nav-caps group inline-flex items-center gap-3 border-b py-2.5 transition-colors ${light ? "border-charcoal-foreground/50 hover:border-charcoal-foreground" : "border-foreground/30 hover:border-foreground"}`}>
      {children}<ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}

function HeroCtas() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button asChild size="lg" variant="light"><Link to="/products">Explore Our Underlay</Link></Button>
      <Button asChild size="lg" variant="lightOutline"><Link to="/why-underlay">Why FOOTMATE?</Link></Button>
    </div>
  );
}

function Home() {
  return (
    <>
      <div className="border-b border-border/70 bg-background">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-2.5">
          <p className="nav-caps rise text-foreground">FOOTMATE by Sarva Australia</p>
          <p className="nav-caps"><Motto /></p>
        </div>
      </div>

      {/* 1 — Hero */}
      <section className="relative isolate overflow-hidden bg-charcoal text-charcoal-foreground">
        <div className="md:hidden">
          <div className="h-[62vw] max-h-[280px] overflow-hidden">
            <img src={hero.url} alt="A young family playing together on soft cream carpet in a sunlit living room" width={1672} height={941} fetchPriority="high" className="h-full w-full object-cover object-[100%_center]" />
          </div>
          <div className="container-site pt-7 pb-9">
            <p className="nav-caps text-charcoal-foreground/80">Premium carpet underlay</p>
            <h1 className="display-mega rise mt-3">Luxury from the first step.</h1>
            <p className="mt-4 max-w-md leading-relaxed text-charcoal-foreground/80">Four recycled polyurethane foam underlays, in 9 mm and 11 mm, designed to enhance the comfort, support and feel of your carpet.</p>
            <HeroCtas />
          </div>
        </div>
        <div className="relative hidden h-[min(calc(100svh-9.6rem),56vw)] min-h-[420px] max-h-[720px] md:block">
          <img src={hero.url} alt="" width={1672} height={941} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover object-[100%_center]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-transparent" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/60 via-charcoal/10 to-transparent" />
          <div className="container-site flex h-full flex-col justify-end pb-12">
            <p className="nav-caps rise text-charcoal-foreground/85">Premium carpet underlay</p>
            <h1 className="display-mega rise mt-4 max-w-3xl [animation-delay:120ms]">Luxury from the first step.</h1>
            <p className="rise mt-5 max-w-lg leading-relaxed text-charcoal-foreground/85 [animation-delay:200ms]">Four recycled polyurethane foam underlays, in 9 mm and 11 mm, designed to enhance the comfort, support and feel of your carpet.</p>
            <div className="rise [animation-delay:300ms]"><HeroCtas /></div>
          </div>
        </div>
      </section>

      {/* 2 — Range */}
      <section className="container-site py-16 md:py-24">
        <div className="flex flex-col justify-between gap-4 border-t border-foreground/80 pt-6 md:flex-row md:items-baseline">
          <div>
            <p className="eyebrow">The FOOTMATE range</p>
            <h2 className="mt-3 text-2xl font-light md:text-3xl">Four carpet underlays. One commitment to comfort.</h2>
          </div>
          <div className="flex gap-8">
            <TextLink to="/products">View Product Range</TextLink>
            <TextLink to="/products/compare">Compare</TextLink>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">Comfort and Plush at 11 mm; Cosy and Serenity at 9 mm, both suited to staircases. Choose HD+ or UHD density for the feel you want.</p>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* 3 — Why FOOTMATE */}
      <section className="bg-secondary">
        <div className="container-site py-16 md:py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Why FOOTMATE?</p>
              <h2 className="display-lg mt-4 max-w-2xl">The quality of your floor begins beneath the carpet.</h2>
            </div>
            <TextLink to="/carpet-underlay">Carpet underlay guide</TextLink>
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="bg-secondary p-7">
                <a.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.2} aria-hidden />
                <h3 className="mt-6 text-xl font-light tracking-tight">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Comfort meets design */}
      <section className="grid lg:grid-cols-12">
        <div className="relative aspect-[16/9] bg-charcoal lg:col-span-7 lg:aspect-auto">
          <img src={skyline.url} alt="A penthouse living room with carpet rolled back to reveal FOOTMATE Comfort underlay" loading="lazy" width={1672} height={941} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:px-14 lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Comfort meets design</p>
            <h2 className="display-lg mt-4">The finish you see. The foundation you feel.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">Underlay is the quiet layer that shapes how a carpet feels and performs — cushioning every step, supporting the carpet above and softening footfall through the home.</p>
            <ul className="mt-8 border-t border-border">
              {["Recovered polyurethane foam", "Processed into fine pieces", "Rebonded into a resilient sheet", "Laid beneath your carpet"].map((t, i) => (
                <li key={t} className="flex items-baseline gap-6 border-b border-border py-3 text-sm"><span className="nav-caps text-muted-foreground">0{i + 1}</span>{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-8"><TextLink to="/why-underlay">Discover FOOTMATE</TextLink><TextLink to="/sustainability">Our recycled approach</TextLink></div>
          </Reveal>
        </div>
      </section>

      {/* Trade */}
      <section className="container-site py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">For professionals</p>
            <h2 className="display-lg mt-4">Built for the flooring trade.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">A clearly differentiated range, backed by product information and trade support.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/trade">Become a Stockist</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/request-samples">Request Trade Samples</Link></Button>
            </div>
          </div>
          <ul className="border-t border-foreground/80 lg:col-span-7">
            {trade.map((t) => (
              <li key={t.title} className="grid gap-2 border-b border-border py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <h3 className="flex items-center gap-3 text-lg font-light"><t.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.3} aria-hidden />{t.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Final conversion */}
      <CTASection title="Find the right underlay for your floor." intro="Explore the range, request samples or talk to our team about your project." primary={{ to: "/products", label: "Explore Products" }} secondary={{ to: "/contact", label: "Contact Us" }} />
    </>
  );
}
