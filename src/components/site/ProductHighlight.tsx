import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products, accentClasses } from "@/data/products";
import { onAccent, ProductSwatch } from "./product";

export function ProductHighlight() {
  const [index, setIndex] = useState(0);
  const product = products[index];
  if (!product) return null;
  return (
    <section aria-label="Product spotlight" className={cn("overflow-hidden transition-colors duration-700", accentClasses[product.slug].bg, onAccent[product.slug])}>
      <div className="container-site py-14 md:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="nav-caps opacity-80">A closer look · 0{index + 1} / 04</p>
          <div role="tablist" aria-label="Choose a product" className="flex flex-wrap gap-2">
            {products.map((p, i) => <Button key={p.slug} role="tab" aria-selected={index === i} variant="ghost" onClick={() => setIndex(i)} className={cn("border text-current hover:bg-transparent hover:text-current", index === i ? "border-current" : "border-transparent opacity-70")}><span className={cn("h-2 w-2 rounded-full ring-1 ring-current", accentClasses[p.slug].bg)} />{p.name}</Button>)}
          </div>
        </div>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="spotlight-title" aria-live="polite">{product.name}</h2>
            <p className="mt-6 text-xl font-light">{product.thicknessMm} mm · {product.densityCategory} · {product.colourName}</p>
            <p className="mt-8 max-w-md text-base leading-relaxed opacity-80">{product.fullDescription}</p>
            <Link to="/products/$slug" params={{ slug: product.slug }} className="nav-caps group mt-10 inline-flex items-center gap-3 border-b border-current pb-2">Discover {product.name}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <ProductSwatch product={product} large className="aspect-[4/3] lg:col-span-7" />
        </div>
      </div>
    </section>
  );
}
