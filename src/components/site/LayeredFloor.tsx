import carpet from "@/assets/carpet-texture.jpg";
import foam from "@/assets/foam-texture.jpg";
import { cn } from "@/lib/utils";

/** Editorial cross-section: carpet → FOOTMATE underlay → subfloor. */
export function LayeredFloor({ accentClass = "bg-pulse", className }: { accentClass?: string; className?: string }) {
  const layers = [
    { label: "Carpet surface", note: "What you see and feel" },
    { label: "FOOTMATE underlay", note: "Cushioning, support, comfort" },
    { label: "Subfloor", note: "Timber or concrete base" },
  ];
  return (
    <div className={cn("relative", className)}>
      <div className="relative mx-auto aspect-square max-w-lg overflow-hidden [perspective:1400px]">
        <div className="absolute inset-0 [transform:rotateX(55deg)_rotateZ(-38deg)] [transform-style:preserve-3d]">
          <div className="absolute inset-[18%] translate-y-[22%] bg-stone shadow-lift" />
          <div className={cn("absolute inset-[18%] translate-y-[2%] overflow-hidden shadow-lift", accentClass)}>
            <img src={foam} alt="" aria-hidden className="h-full w-full object-cover opacity-40 mix-blend-multiply" />
          </div>
          <div className="absolute inset-[18%] -translate-y-[22%] overflow-hidden shadow-lift">
            <img src={carpet} alt="" aria-hidden className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
      <ol className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-5">
        {layers.map((l, i) => (
          <li key={l.label}>
            <span className="text-xs font-semibold text-muted-foreground">0{i + 1}</span>
            <p className="mt-1 text-sm font-bold">{l.label}</p>
            <p className="text-xs text-muted-foreground">{l.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
