import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-interior.jpg";

export function CTASection({
  title = "Better performance begins beneath the surface.",
  intro,
  primary = { to: "/products", label: "Explore FOOTMATE" },
  secondary = { to: "/contact", label: "Get in Touch" },
}: {
  title?: ReactNode;
  intro?: ReactNode;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img src={hero} alt="" aria-hidden loading="lazy" width={1920} height={1152} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
      <div className="container-site py-24 md:py-36">
        <h2 className="display-xl max-w-4xl">{title}</h2>
        {intro && <p className="mt-6 max-w-xl text-lg text-ink-foreground/75">{intro}</p>}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="light" size="lg">
            <Link to={primary.to}>{primary.label}</Link>
          </Button>
          <Button asChild variant="lightOutline" size="lg">
            <Link to={secondary.to}>{secondary.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
