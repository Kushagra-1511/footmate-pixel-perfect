import { Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { recommend, type FinderAnswers } from "@/lib/recommend";
import { ProductSwatch } from "./product";
import { useCompare } from "./compare-context";

type Q = { key: keyof FinderAnswers; title: string; options: { value: string; label: string }[] };

const questions: Q[] = [
  { key: "room", title: "Which room is being carpeted?", options: [
    { value: "bedroom", label: "Bedroom" }, { value: "living", label: "Living or lounge" }, { value: "hallway", label: "Hallway" }, { value: "stairs", label: "Stairs" }, { value: "other", label: "Somewhere else" } ] },
  { key: "priority", title: "Is comfort or durability more important?", options: [
    { value: "comfort", label: "Comfort" }, { value: "durability", label: "Durability" }, { value: "balanced", label: "An even balance" } ] },
  { key: "stairs", title: "Are stairs involved?", options: [
    { value: "yes", label: "Yes" }, { value: "no", label: "No" }, { value: "unsure", label: "Not sure" } ] },
  { key: "sound", title: "Is sound reduction important?", options: [
    { value: "yes", label: "Yes" }, { value: "no", label: "No" }, { value: "unsure", label: "Not sure" } ] },
  { key: "thickness", title: "Do you prefer 9 mm or 11 mm underlay?", options: [
    { value: "9", label: "9 mm" }, { value: "11", label: "11 mm" }, { value: "none", label: "No preference" } ] },
];

export function FootmateFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({});
  const { setAll } = useCompare();
  const done = step >= questions.length;
  const result = done ? recommend(answers as FinderAnswers) : null;

  return (
    <div className="border border-border bg-card p-6 md:p-12">
      <div className="mb-10 flex items-center justify-between gap-4">
        <p className="eyebrow">Find your FOOTMATE</p>
        <div className="flex gap-1.5" aria-label={`Step ${Math.min(step + 1, 5)} of 5`}>
          {questions.map((_, i) => (
            <span key={i} className={cn("h-1 w-8 rounded-full transition-colors", i < step || done ? "bg-foreground" : i === step ? "bg-foreground/40" : "bg-border")} />
          ))}
        </div>
      </div>

      {!done && (
        <div key={step} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-sm text-muted-foreground">Question {step + 1} of {questions.length}</p>
          <h3 className="mt-2 text-3xl font-bold md:text-4xl">{questions[step].title}</h3>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {questions[step].options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, [questions[step].key]: o.value });
                  setStep(step + 1);
                }}
                className={cn("h-16 border border-border px-5 text-left font-semibold transition-all hover:border-foreground hover:bg-background", answers[questions[step].key] === o.value && "border-foreground")}
              >
                {o.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="animate-in fade-in duration-500">
          <h3 className="text-3xl font-bold md:text-4xl">
            {result.confident ? `We'd suggest FOOTMATE ${result.primary!.name}.` : "Here's your shortlist."}
          </h3>
          <ul className="mt-4 max-w-2xl space-y-1 text-sm text-muted-foreground">
            {result.reasons.map((r) => <li key={r}>— {r}</li>)}
          </ul>
          {!result.confident && (
            <p className="mt-4 max-w-2xl text-sm">
              Your answers don't point to one product with confidence. We recommend confirming your selection with a flooring professional or our team.
            </p>
          )}
          <div className={cn("mt-8 grid gap-4", result.shortlist.length > 1 && "sm:grid-cols-2 lg:grid-cols-4")}>
            {result.shortlist.map((p) => (
              <div key={p.slug} className={cn("flex flex-col border border-border bg-background", result.confident && "md:flex-row")}>
                <ProductSwatch product={p} className={cn("aspect-[4/3]", result.confident && "md:aspect-auto md:w-1/2")} large={result.confident} />
                <div className="flex flex-col gap-3 p-6">
                  <p className="font-semibold">{p.shortDescription}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <Button asChild size="sm"><Link to="/products/$slug" params={{ slug: p.slug }}>View {p.name}</Link></Button>
                    <Button asChild size="sm" variant="outline"><Link to="/request-samples" search={{ product: p.slug }}>Request sample</Link></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline" onClick={() => setAll(result.shortlist.length > 1 ? result.shortlist.map((p) => p.slug) : ["spring", "bounce", "pulse", "bloom"])}>
              <Link to="/products/compare">Compare alternatives</Link>
            </Button>
            <Button variant="ghost" onClick={() => { setStep(0); setAnswers({}); }}>
              <RotateCcw /> Start again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
