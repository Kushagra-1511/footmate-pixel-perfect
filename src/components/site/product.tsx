import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { accentClasses, type Product, type Rating, ON_REQUEST, RATING_MAX } from "@/data/products";
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
        <span className="flex shrink-0 gap-1" aria-label={`${value} out of ${RATING_MAX}`}>
          {Array.from({ length: RATING_MAX }).map((_, i) => (
            <span key={i} className={cn("h-1.5 w-3 rounded-full", i < value ? "bg-foreground" : "bg-border")} />
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
    <Button
      variant="ghost"
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
    </Button>
  );
}

/** Text colour that reads well on each product's accent field. */
export const onAccent: Record<Product["slug"], string> = {
  spring: "text-charcoal",
  bounce: "text-charcoal",
  pulse: "text-charcoal-foreground",
  bloom: "text-charcoal",
};

/** Supplied photography is never tinted, overprinted or cropped. */
export function ProductSwatch({ product, className, large = false }: { product: Product; className?: string; large?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      <img src={product.productImage} alt={`FOOTMATE ${product.name} ${product.thicknessMm} mm ${product.densityCategory} ${product.studioImage ? "studio panel" : "beneath carpet"}`} loading={large ? "eager" : "lazy"} className="h-full w-full object-contain" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="zoom-tile block" aria-label={`View ${product.name}`}>
        <ProductSwatch product={product} className="aspect-[4/3]" />
      </Link>
      <div className="flex flex-1 flex-col gap-4 pt-5">
        <p className="nav-caps" style={{ color: product.accentColour }}>FOOTMATE</p>
        <div className="-mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-2xl font-light tracking-tight md:text-3xl">{product.name}</h3>
          <span className="nav-caps text-muted-foreground">{product.densityCategory} · {product.thicknessMm} mm</span>
        </div>
        <ColourBadge product={product} className="text-muted-foreground" />
        <p className="text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        <ProductRatings product={product} />
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <CompareToggle product={product} />
          <Link to="/products/$slug" params={{ slug: product.slug }} className="nav-caps inline-flex items-center gap-2 underline-offset-4 group-hover:underline">
            View <ArrowUpRight className="h-3.5 w-3.5" />
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
