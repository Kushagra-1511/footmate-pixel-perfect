import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import comfortStory from "@/assets/footmate-comfort-story.png.asset.json";
import cosyStory from "@/assets/footmate-cosy-story.png.asset.json";
import plushStory from "@/assets/footmate-plush-story.png.asset.json";
import serenityStory from "@/assets/footmate-serenity-story.png.asset.json";
import { Reveal } from "@/components/site/primitives";
import { getProduct, type ProductSlug } from "@/data/products";

/**
 * Illustrative concept copy — NOT verified customer feedback.
 * Replace `quote` with approved testimonials when supplied. No names, ratings or locations.
 */
const stories: { slug: ProductSlug; space: string; image: string; quote: string }[] = [
  { slug: "spring", space: "Penthouse Living Room", image: comfortStory.url, quote: "We spent so much time choosing the perfect carpet, but what went underneath mattered just as much. FOOTMATE Comfort was part of making our living room feel thoughtfully finished, right down to the floor." },
  { slug: "bounce", space: "Coastal Bedroom", image: cosyStory.url, quote: "Our bedroom was designed to feel warm, relaxed and inviting. Choosing FOOTMATE Cosy beneath the carpet felt like a natural part of creating that atmosphere." },
  { slug: "pulse", space: "Luxury Boutique Hotel", image: plushStory.url, quote: "In hospitality, it's the details guests don't always see that complete a space. We wanted every material choice to feel considered, and FOOTMATE Plush was part of that approach." },
  { slug: "bloom", space: "Private Library", image: serenityStory.url, quote: "We wanted a quiet retreat where every detail felt intentional. Even the materials hidden beneath the carpet were carefully considered, which is why we chose FOOTMATE Serenity." },
];

export function SpacesWeLove() {
  return (
    <section aria-labelledby="spaces-title" className="py-24 md:py-36">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Illustrative Customer Stories</p>
          <h2 id="spaces-title" className="statement-title mt-6">THE SPACES WE LOVE.</h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Concept stories imagining FOOTMATE in four considered interiors. Quotations are illustrative only and are not verified customer reviews.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 space-y-24 md:mt-28 md:space-y-36">
        {stories.map((s, i) => {
          const p = getProduct(s.slug);
          if (!p) return null;
          const flip = i % 2 === 1;
          return (
            <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
              <Reveal className={`lg:col-span-8 ${flip ? "lg:order-2" : ""}`}>
                <div className="zoom-tile overflow-hidden bg-secondary">
                  <img src={s.image} alt={`${s.space} with carpet rolled back over FOOTMATE ${p.name} underlay`} loading="lazy" width={1672} height={941} className="block h-auto w-full" />
                </div>
              </Reveal>
              <Reveal delay={120} className={`container-site lg:col-span-4 lg:px-14 ${flip ? "lg:order-1" : ""}`}>
                <div className="border-l-2 pl-6" style={{ borderColor: p.accentColour }}>
                  <p className="nav-caps text-muted-foreground">0{i + 1} — {s.space}</p>
                  <p className="nav-caps mt-2" style={{ color: p.accentColour }}>{p.name} · {p.grade} · {p.thickness}</p>
                </div>
                <span aria-hidden className="mt-8 block text-7xl font-extralight leading-none" style={{ color: p.accentColour }}>“</span>
                <blockquote className="-mt-4 text-xl font-light leading-snug md:text-2xl">{s.quote}</blockquote>
                <p className="mt-6 text-xs text-muted-foreground">Illustrative concept copy</p>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="nav-caps group mt-8 inline-flex items-center gap-3 border-b border-foreground/30 pb-1.5 hover:border-foreground">
                  Discover {p.name}<ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
