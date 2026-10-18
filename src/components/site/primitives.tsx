import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-visible={visible} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="display-lg text-foreground">{title}</h2>
      {intro && <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 hidden h-[28rem] w-[28rem] md:block">
        <span className="float-soft absolute right-24 top-24 h-40 w-40 rounded-full bg-spring/80" />
        <span className="float-soft absolute right-56 top-52 h-24 w-24 rounded-full bg-bounce [animation-delay:-2s]" />
        <span className="float-soft absolute right-16 top-72 h-32 w-32 rounded-full bg-pulse/90 [animation-delay:-4s]" />
        <span className="float-soft absolute right-64 top-16 h-16 w-16 rounded-full bg-bloom [animation-delay:-1s]" />
      </div>
      <div className="container-site relative pb-16 pt-14 md:pb-28 md:pt-24">
        <p className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-10 bg-foreground/40" />{eyebrow}</p>
        <h1 className="display-xl max-w-5xl text-foreground md:pr-72 md:[font-size:clamp(3rem,7.5vw,7.5rem)]">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-site pt-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-foreground">Home</Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" aria-hidden />
            {it.to ? (
              <Link to={it.to} className="hover:text-foreground">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-foreground">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Gentle scroll parallax. Disabled for reduced-motion users. */
export function Parallax({ children, speed = 0.12, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className={cn("will-change-transform", className)}>{children}</div>;
}

export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden", className)} aria-hidden>
      <div className="marquee">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
