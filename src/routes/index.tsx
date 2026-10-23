import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Feather, Layers, Thermometer, Volume2, Store, Truck, Hammer, Ruler } from "lucide-react";
import hero from "@/assets/hero-family.png.asset.json";
import footmateLogo from "@/assets/footmate-logo.png";
import skyline from "@/assets/footmate-skyline-campaign.png.asset.json";
import { Button } from "@/components/ui/button";
import { Motto, Parallax, Reveal } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/product";
import { ColourRibbon } from "@/components/site/ColourRibbon";
import { ProductHighlight } from "@/components/site/ProductHighlight";
import { SpacesWeLove } from "@/components/site/SpacesWeLove";
import { CTASection } from "@/components/site/CTASection";
import { products } from "@/data/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "FOOTMATE — The comfort beneath",
      "FOOTMATE recycled polyurethane foam carpet underlay. Four distinct products — Comfort, Cosy, Plush and Serenity — for comfort and lasting performance beneath Australian floors.",
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
  { icon: Hammer, title: "Installers", text: "Practical 9 mm and 11 mm profiles, including two staircase-suited options." },
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
      {/* Masthead rule */}
      <div className="border-b border-border/70 bg-background">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-2.5">
          <p className="nav-caps rise text-foreground">FOOTMATE by Sarva Australia</p>
          <p className="nav-caps"><Motto /></p>
        </div>
      </div>

      {/* Hero — the family photo, with the headline placed where it stays legible */}
      <section className="relative isolate overflow-hidden bg-charcoal text-charcoal-foreground">
        {/* Phone: the whole family in a photo band, headline on the charcoal below */}
        <div className="md:hidden">
          <div className="h-[62vw] max-h-[280px] overflow-hidden">
            <img src={hero.url} alt="A young family playing together on soft cream carpet in a sunlit living room" width={1672} height={941} fetchPriority="high" className="h-full w-full object-cover object-[100%_center]" />
          </div>
          <div className="container-site pt-8 pb-10">
            <h1 className="display-mega rise">Luxury from the first step.</h1>
            <div className="rise mt-8 flex flex-col items-start gap-5 [animation-delay:300ms]">
              <TextLink to="/products" light>Explore the range</TextLink>
              <TextLink to="/request-samples" light>Request samples</TextLink>
            </div>
          </div>
        </div>

        {/* Tablet and up: full-bleed photo with the headline over the open carpet */}
        <div className="relative hidden h-[min(calc(100svh-9.6rem),77vw)] min-h-[420px] md:block">
          <Parallax speed={-0.12} className="absolute -inset-y-10 inset-x-0 -z-10">
            <img src={hero.url} alt="" width={1672} height={941} fetchPriority="high" className="h-[112%] w-full object-cover object-[100%_center]" />
          </Parallax>
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-transparent" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/50 via-charcoal/10 to-transparent" />
          <div className="container-site flex h-full flex-col justify-end pb-16">
            <h1 className="display-mega rise mt-6 max-w-3xl [animation-delay:120ms]">Luxury from the first step.</h1>
            <div className="rise mt-10 flex flex-wrap items-center gap-8 [animation-delay:300ms]">
              <TextLink to="/products" light>Explore the range</TextLink>
              <TextLink to="/request-samples" light>Request samples</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Brand marquee — slow, quiet motion */}
      <div aria-hidden className="overflow-hidden border-b border-border/60 py-4">
        <div className="marquee gap-12">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 items-center gap-12">
              {["FOOTMATE", "The Comfort Beneath", "Recycled. Repurposed. Redefined.", "Comfort", "Cosy", "Plush", "Serenity"].map((t, i) => (
                <span key={t} className="flex items-center gap-12">
                  <span className="nav-caps whitespace-nowrap text-muted-foreground">{t === "Recycled. Repurposed. Redefined." ? <Motto /> : t}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${["bg-spring", "bg-bounce", "bg-pulse", "bg-bloom"][i % 4]}`} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="container-site py-24 md:py-32">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow"><Motto /></p>
          <h2 className="statement-title mt-8">EXCEPTIONAL FLOORS START<br className="hidden md:block" /> BELOW THE SURFACE.</h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground">A considered foundation for the spaces you call home. Four distinct underlays, bringing comfort and support to every step.</p>
          <div className="mt-10"><TextLink to="/why-underlay">Why underlay matters</TextLink></div>
        </Reveal>
      </section>

      {/* Collection */}
      <section className="container-site pb-28 md:pb-40">
        <div className="flex flex-col justify-between gap-6 border-t border-foreground/80 pt-6 md:flex-row md:items-baseline">
          <h2 className="text-2xl font-light md:text-3xl">EXPLORE THE FOOTMATE COLLECTION</h2>
          <div className="flex gap-8">
            <TextLink to="/products">View all</TextLink>
            <TextLink to="/products/compare">Compare</TextLink>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-muted-foreground">Four distinct underlays. One commitment to comfort.</p>
        <div className="mt-14 grid gap-x-6 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* Interactive colour spectrum — pure product colour, no photography */}
      <ColourRibbon />

      {/* Brand moment — oversized identity, warm ivory, generous negative space */}
      <section aria-label="FOOTMATE brand statement" className="border-y border-border/60 bg-background">
        <Reveal className="container-site flex flex-col items-center py-28 text-center md:py-44">
          <img src={footmateLogo} alt="FOOTMATE underlay" width={757} height={239} loading="lazy" className="h-14 w-auto md:h-20" />
          <h2 className="statement-title mt-14 max-w-4xl">THE FOUNDATION OF <span className="text-spectrum">BETTER FLOORS.</span></h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">One name beneath every step — a considered foundation for the spaces you call home.</p>
        </Reveal>
      </section>

      {/* Full-width campaign feature — supplied artwork, shown uncropped */}
      <section aria-label="The comfort beneath" className="relative bg-charcoal">
        <img src={skyline.url} alt="The comfort beneath — a penthouse living room above a city skyline, carpet rolled back to reveal FOOTMATE Comfort underlay" loading="lazy" width={1672} height={941} className="block h-auto w-full" />
        <Link to="/products" aria-label="Explore our range" className="absolute left-[3%] top-[77.5%] h-[6.5%] w-[12%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-charcoal-foreground" />
        <Link to="/why-underlay" aria-label="Discover FOOTMATE" className="absolute left-[16.5%] top-[77.5%] h-[6.5%] w-[12.5%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-charcoal-foreground" />
      </section>

      {/* Editorial split — material */}
      <section className="grid lg:grid-cols-12">
        <div className="zoom-tile relative aspect-[4/3] bg-secondary lg:col-span-7 lg:aspect-auto">
          <img src={products[2]?.productImage} alt="FOOTMATE Plush panel with branded laminate and visible rebonded foam edge" loading="lazy" width={1280} height={1280} className="absolute inset-0 h-full w-full object-contain" />
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

      <section className="container-site py-24 md:py-32">
        <div className="grid items-end gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">An unseen difference</p>
            <h2 className="display-lg mt-6">DESIGNED TO BE FELT.<br />ENGINEERED TO BE UNSEEN.</h2>
            <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">The finish you see. The foundation you feel. FOOTMATE sits quietly beneath your carpet, bringing comfort into everyday life.</p>
            <div className="mt-9"><TextLink to="/products">Find your foundation</TextLink></div>
          </Reveal>
          <Reveal className="md:col-span-7">
            <img src={products[3]?.interiorImage} alt="Serenity underlay revealed beneath bedroom carpet" loading="lazy" className="aspect-[1024/572] w-full object-contain" />
            <p className="nav-caps mt-4 text-muted-foreground">Serenity · 9 mm · UHD</p>
          </Reveal>
        </div>
      </section>

      <ProductHighlight />

      <SpacesWeLove />

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
            <p className="nav-caps"><Motto tone="dark" /></p>
            <h2 className="display-lg mt-6">Giving end-of-life Polyurethane foam another purpose.</h2>
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
        <div className="zoom-tile relative aspect-[4/3] bg-secondary lg:order-2 lg:col-span-7 lg:aspect-auto">
          <img src={products[0]?.productImage} alt="Comfort panel showing rebonded foam construction" loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
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
