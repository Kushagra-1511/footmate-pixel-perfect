import { Link } from "@tanstack/react-router";
import footmateLogo from "@/assets/footmate-logo.png";
import sarvaLogo from "@/assets/sarva-logo.png";
import { company, mainNav } from "@/data/site";
import { products } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div aria-hidden className="spectrum-rule" />
      {/* Brand sign-off — official wordmark on a light panel so the navy artwork stays true */}
      <div className="container-site flex flex-col items-center border-b border-ink-foreground/10 py-16 text-center md:py-24">
        <div className="rounded-sm bg-ink-foreground px-10 py-7 md:px-14 md:py-9">
          <img src={footmateLogo} alt="FOOTMATE underlay" width={757} height={239} loading="lazy" className="h-12 w-auto md:h-16" />
        </div>
        <p className="mt-10 text-2xl font-light tracking-tight md:text-3xl">{company.tagline}</p>
        <p className="nav-caps mt-4 text-ink-foreground/50">Recycled. Remade. Refined.</p>
      </div>
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="text-2xl font-light tracking-tight md:text-3xl">The comfort beneath.</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/65">
            FOOTMATE recycled polyurethane foam carpet underlay, brought to Australia by {company.legalName}.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-sm bg-ink-foreground px-3 py-2">
            <img src={sarvaLogo} alt="Sarva Foam — Commitment through quality" width={800} height={690} loading="lazy" className="h-10 w-auto" />
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-ink-foreground/50">Range</p>
          <ul className="space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="text-ink-foreground/80 hover:text-ink-foreground">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products/compare" className="text-ink-foreground/80 hover:text-ink-foreground">Compare</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-ink-foreground/50">Explore</p>
          <ul className="space-y-2 text-sm">
            {mainNav.slice(2).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-ink-foreground/80 hover:text-ink-foreground">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-ink-foreground/50">Get started</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/request-samples" className="text-ink-foreground/80 hover:text-ink-foreground">Request samples</Link></li>
            <li><Link to="/trade" className="text-ink-foreground/80 hover:text-ink-foreground">Trade enquiry</Link></li>
            <li><Link to="/contact" className="text-ink-foreground/80 hover:text-ink-foreground">Contact our team</Link></li>
          </ul>
          <address className="mt-6 space-y-2 text-sm not-italic text-ink-foreground/80">
            {company.phone && <p><a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-ink-foreground">{company.phone}</a></p>}
            {company.email && <p><a href={`mailto:${company.email}`} className="break-all hover:text-ink-foreground">{company.email}</a></p>}
            {company.address && <p className="leading-relaxed">{company.address}</p>}
          </address>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-ink-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}. FOOTMATE is a brand of Sarva.</p>
          <ul className="flex flex-wrap gap-5">
            <li><Link to="/privacy" className="hover:text-ink-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-ink-foreground">Terms of Use</Link></li>
            <li><Link to="/consumer-law" className="hover:text-ink-foreground">Australian Consumer Law</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
