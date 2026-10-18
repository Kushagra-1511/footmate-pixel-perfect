import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentClasses, type Product, type Rating, ON_REQUEST } from "@/data/products";
import { useCompare } from "./compare-context";

export function ColourBadge({ product, className }: { product: Product; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]", className)}>
      <span className={cn("h-2.5 w-2.5 rounded-full", accentClasses[product.slug].bg)} aria-hidden />
      {product.colourName}
    </span>
  );
}

function RatingRow({ label, value }: { label: string; value: Rating }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-muted-foreground">{label}</span>
      {value === null ? (
        <span className="text-muted-foreground/70 italic">Rating to be published</span>
      ) : (
        <span className="flex gap-1" aria-label={`${value} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={cn("h-1.5 w-4 rounded-full", i < value ? "bg-[var(--acc,var(--foreground))]" : "bg-border")} />
          ))}
        </span>
      )}
    </div>
  );
}

export function ProductRatings({ product }: { product: Product }) {
  return (
    <div className="space-y-2">
      <RatingRow label="Comfort" value={product.comfortRating} />
      <RatingRow label="Durability" value={product.durabilityRating} />
      <RatingRow label="Bounce" value={product.bounceRating} />
    </div>
  );
}

export function CompareToggle({ product, className }: { product: Product; className?: string }) {
  const { has, toggle } = useCompare();
  const on = has(product.slug);
  return (
    <button
      type="button"
      onClick={() => toggle(product.slug)}
      aria-pressed={on}
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold transition-colors",
        on ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <span className={cn("grid h-5 w-5 place-items-center rounded-full border", on ? "border-foreground bg-foreground text-background" : "border-foreground/30")}>
        {on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
      </span>
      {on ? "Added to compare" : "Add to compare"}
    </button>
  );
}

/** Text colour that reads well on each product's accent field. */
export const onAccent: Record<Product["slug"], string> = {
  spring: "text-charcoal",
  bounce: "text-charcoal",
  pulse: "text-charcoal-foreground",
  bloom: "text-charcoal",
};

/** Layered colour field in product colour — used in place of product photography until official artwork is supplied. */
export function ProductSwatch({ product, className, large = false }: { product: Product; className?: string; large?: boolean }) {
  const a = accentClasses[product.slug];
  return (
    <div className={cn("grain relative overflow-hidden", a.bg, onAccent[product.slug], className)}>
      <img src={product.textureImage} alt="" aria-hidden width={1280} height={1280} loading="lazy" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-30 mix-blend-multiply transition-transform duration-[1.6s] ease-out group-hover:scale-115" />
      {/* Rebound curves */}
      <svg aria-hidden viewBox="0 0 400 500" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-40">
        <path d="M0 380 C 100 300, 300 300, 400 380 L400 500 L0 500Z" fill="currentColor" opacity="0.12" />
        <path d="M0 430 C 120 370, 280 370, 400 430 L400 500 L0 500Z" fill="currentColor" opacity="0.18" />
      </svg>
      <div className="absolute inset-0 z-[2] flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-current opacity-75">FOOTMATE</span>
          <span className="text-xs font-bold tracking-widest opacity-75">{product.densityCategory}</span>
        </div>
        <div>
          <p className={cn("font-extrabold leading-[0.8] tracking-[-0.07em]", large ? "text-[clamp(4.5rem,13vw,11rem)]" : "text-[clamp(3.2rem,6vw,4.6rem)]")}>{product.name}</p>
          <p className="mt-4 flex items-baseline gap-2 text-sm font-semibold opacity-80">
            <span className={cn("font-extrabold tracking-tight", large ? "text-4xl" : "text-2xl")}>{product.thicknessMm}</span>mm · {product.colourName}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article style={{ ["--acc" as string]: product.accentColour }} className="lift-accent group flex h-full flex-col overflow-hidden bg-card">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block" aria-label={`View ${product.name}`}>
        <ProductSwatch product={product} className="aspect-[4/5]" />
      </Link>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-center justify-between">
          <ColourBadge product={product} />
          <span className="text-xs font-semibold text-muted-foreground">{product.thicknessMm} mm</span>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight">{product.name}</h3>
          <p className="mt-1 text-sm font-semibold">{product.thicknessMm} mm · {product.densityCategory} classification</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        </div>
        <ProductRatings product={product} />
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
          <CompareToggle product={product} />
          <Link to="/products/$slug" params={{ slug: product.slug }} className="inline-flex items-center gap-1 text-sm font-semibold">
            View product <span className={cn("grid h-7 w-7 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45", accentClasses[product.slug].bg, onAccent[product.slug])}><ArrowUpRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SpecTable({ product }: { product: Product }) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {product.technicalSpecifications.map((s) => (
        <div key={s.label} className="grid grid-cols-2 gap-4 py-4 text-sm">
          <dt className="text-muted-foreground">{s.label}</dt>
          <dd className={cn("font-semibold", s.value === null && "font-normal italic text-muted-foreground")}>{s.value ?? ON_REQUEST}</dd>
        </div>
      ))}
    </dl>
  );
}
