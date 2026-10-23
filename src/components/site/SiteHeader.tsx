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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
      {/* Logo left, every primary page across the remaining width. */}
      <div
        className={cn(
          "container-site flex items-center justify-between gap-8 transition-all duration-500",
          scrolled ? "h-20 lg:h-24" : "h-24 lg:h-[116px]",
        )}
      >
        <Link to="/" aria-label="FOOTMATE home" className="shrink-0">
          <Logo className={cn("transition-all duration-500", scrolled ? "h-14 lg:h-16" : "h-16 sm:h-[72px] lg:h-[88px]")} />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-5 2xl:gap-8">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="nav-caps link-sweep whitespace-nowrap pb-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-background p-0">
            <SheetHeader className="border-b border-border p-6">
              <SheetTitle className="text-left">
                <Logo className="h-12" />
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
      </div>

      {/* Smaller screens: every page stays visible on the navbar in a second row. */}
      <nav aria-label="Pages" className="border-t border-border/60 xl:hidden">
        <ul className="container-site flex items-center gap-6 overflow-x-auto py-3 [scrollbar-width:none]">
          {mainNav.map((item) => (
            <li key={item.to} className="shrink-0">
              <Link
                to={item.to}
                className="nav-caps link-sweep whitespace-nowrap pb-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="shrink-0">
            <Link to="/request-samples" className="nav-caps whitespace-nowrap bg-primary px-3 py-2 text-primary-foreground">
              Request Samples
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
