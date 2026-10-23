import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import footmateLogo from "@/assets/footmate-logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/data/site";

export function Logo({ className = "h-8" }: { className?: string }) {
  return <img src={footmateLogo} alt="FOOTMATE underlay" width={757} height={239} className={`${className} w-auto`} />;
}

const barNav = mainNav.filter((i) => i.to !== "/");

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
      {/* One row: logo left, pages centre, Request Samples right. */}
      <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 md:py-5 2xl:h-28 2xl:flex-nowrap 2xl:py-0">
        <Link to="/" aria-label="FOOTMATE home" className="shrink-0">
          <Logo className="h-12 md:h-16 xl:h-20" />
        </Link>

        <nav aria-label="Primary" className="order-3 hidden w-full min-w-0 md:block 2xl:order-none 2xl:w-auto">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-5">
            {barNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-sweep whitespace-nowrap pb-1 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-foreground md:text-[0.75rem]"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/request-samples">Request Samples</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-background p-0">
              <SheetHeader className="border-b border-border p-6">
                <SheetTitle className="text-left">
                  <Logo className="h-16" />
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
      </div>
    </header>
  );
}
