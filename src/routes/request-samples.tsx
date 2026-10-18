import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import carpet from "@/assets/carpet-texture.jpg";
import { Breadcrumbs } from "@/components/site/primitives";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import type { ProductSlug } from "@/data/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/request-samples")({
  validateSearch: z.object({ product: z.enum(["spring", "bounce", "pulse", "bloom"]).optional() }),
  head: () => seo("Request FOOTMATE Samples", "Request samples of FOOTMATE Comfort, Cosy, Plush or Serenity carpet underlay — for homeowners and trade professionals.", "/request-samples"),
  component: SamplesPage,
});

function SamplesPage() {
  const { product } = Route.useSearch();
  return (
    <>
      <Breadcrumbs items={[{ label: "Request Samples" }]} />
      <section className="container-site grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">Request samples</p>
          <h1 className="display-lg mt-6">Feel it before you choose.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Choose one or more FOOTMATE products and tell us where you'd like them sent. Our team will be in touch to confirm the details.</p>
          <img src={carpet} alt="Close-up of soft carpet pile" width={1280} height={1280} loading="lazy" className="mt-10 hidden aspect-square w-full object-cover lg:block" />
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm key={product ?? "none"} mode="sample" defaultProducts={product ? [product as ProductSlug] : []} />
        </div>
      </section>
    </>
  );
}
