import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHero } from "@/components/site/primitives";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { company, contactCategories } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Sarva Australia", "Get in touch with the FOOTMATE team at Sarva Australia — general, trade, samples, technical and specification enquiries.", "/contact"),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHero eyebrow="Contact" title="Talk to our team." intro="Send us a message and we'll respond by email." />
      <section className="container-site grid gap-12 py-20 lg:grid-cols-12">
        <aside className="space-y-8 lg:col-span-4">
          <div>
            <p className="eyebrow mb-4">We can help with</p>
            <ul className="space-y-2 text-sm font-semibold">{contactCategories.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          {(company.email || company.phone) && (
            <div className="space-y-1 text-sm">
              {company.email && <p><a className="underline" href={`mailto:${company.email}`}>{company.email}</a></p>}
              {company.phone && <p>{company.phone}</p>}
            </div>
          )}
        </aside>
        <div className="lg:col-span-8"><EnquiryForm mode="contact" /></div>
      </section>
    </>
  );
}
