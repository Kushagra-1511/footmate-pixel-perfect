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
            <span key={i} className={cn("h-1.5 w-4 rounded-full", i < value ? "bg-foreground" : "bg-border")} />
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

/** Abstract layered swatch in product colour — used in place of product photography until official artwork is supplied. */
export function ProductSwatch({ product, className, large = false }: { product: Product; className?: string; large?: boolean }) {
  const a = accentClasses[product.slug];
  return (
    <div className={cn("relative overflow-hidden", a.bg, className)}>
      <img src={product.textureImage} alt="" aria-hidden width={1280} height={1280} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply" />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <span className="eyebrow text-foreground/70">FOOTMATE</span>
        <div>
          <p className={cn("font-bold leading-none tracking-tighter text-foreground/90", large ? "text-7xl md:text-8xl" : "text-5xl")}>{product.name}</p>
          <p className="mt-3 text-sm font-semibold text-foreground/75">
            {product.thicknessMm} mm · {product.densityCategory}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="lift group flex flex-col bg-card shadow-soft">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block" aria-label={`View ${product.name}`}>
        <ProductSwatch product={product} className="aspect-[4/5]" />
      </Link>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-center justify-between">
          <ColourBadge product={product} />
          <span className="text-xs font-semibold text-muted-foreground">{product.densityCategory}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="mt-1 text-sm font-semibold">{product.thicknessMm} mm · {product.densityCategory} classification</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        </div>
        <ProductRatings product={product} />
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
          <CompareToggle product={product} />
          <Link to="/products/$slug" params={{ slug: product.slug }} className="inline-flex items-center gap-1 text-sm font-semibold">
            View product <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
