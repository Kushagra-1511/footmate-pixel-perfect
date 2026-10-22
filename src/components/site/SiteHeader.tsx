import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import footmateLogo from "@/assets/footmate-logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ className = "h-8" }: { className?: string }) {
  return <img src={footmateLogo} alt="FOOTMATE underlay" width={757} height={239} className={`${className} w-auto`} />;
}

const leftNav = mainNav.filter((i) => ["/products", "/why-underlay", "/sustainability"].includes(i.to));
const rightNav = mainNav
  .filter((i) => ["/trade", "/resources", "/about"].includes(i.to))
  .map((i) => (i.to === "/trade" ? { ...i, label: "Trade" } : i));

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="nav-caps whitespace-nowrap text-muted-foreground transition-colors duration-300 hover:text-foreground"
      activeProps={{ className: "text-foreground" }}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      {/* Three-column grid keeps the logo at the exact viewport centre. */}
      <div
        className={cn(
          "container-site grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 transition-all duration-500",
          scrolled ? "h-14" : "h-20",
        )}
      >
        {/* Left — menu on mobile, primary links on desktop */}
        <div className="flex items-center justify-start gap-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="2xl:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm bg-background p-0">
              <SheetHeader className="border-b border-border p-6">
                <SheetTitle className="text-left">
                  <Logo className="h-7" />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="p-6">
                <ul className="space-y-1">
                  {mainNav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block py-3 text-3xl font-light tracking-tight text-muted-foreground hover:text-foreground"
                        activeProps={{ className: "text-foreground" }}
                        activeOptions={{ exact: item.to === "/" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-3">
                  <Button asChild size="lg" onClick={() => setOpen(false)}>
                    <Link to="/request-samples">Request Samples</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" onClick={() => setOpen(false)}>
                    <Link to="/trade">Trade Enquiry</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <nav aria-label="Primary" className="hidden 2xl:block">
            <ul className="flex items-center gap-7">
              {leftNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Centre — official FOOTMATE wordmark, the header focal point */}
        <Link to="/" aria-label="FOOTMATE home" className="justify-self-center">
          <Logo className={cn("transition-all duration-500", scrolled ? "h-8" : "h-10 md:h-12")} />
        </Link>

        {/* Right — secondary links and enquiry action */}
        <div className="flex items-center justify-end gap-7">
          <nav aria-label="Secondary" className="hidden 2xl:block">
            <ul className="flex items-center gap-7">
              {rightNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/request-samples">Request Samples</Link>
          </Button>
          <Link to="/request-samples" className="nav-caps text-foreground sm:hidden">
            Samples
          </Link>
        </div>
      </div>
    </header>
  );
}
