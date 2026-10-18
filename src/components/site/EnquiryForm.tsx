import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { products, accentClasses, type ProductSlug } from "@/data/products";
import { australianStates, businessTypes, contactCategories, tradeCategories } from "@/data/site";
import { enquirySchema, submitEnquiry } from "@/lib/enquiries.functions";

type Mode = "trade" | "contact" | "sample";

const selectCls =
  "flex h-11 w-full rounded-sm border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const inputCls = "h-11 rounded-sm bg-card";

function Field({ id, label, error, children, required }: { id: string; label: string; error?: string | undefined; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label} {required && <span aria-hidden>*</span>}
      </Label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function ProductPicker({ value, onChange }: { value: ProductSlug[]; onChange: (v: ProductSlug[]) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4" role="group" aria-label="Products">
      {products.map((p) => {
        const on = value.includes(p.slug);
        return (
          <button
            type="button"
            key={p.slug}
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== p.slug) : [...value, p.slug])}
            className={cn(
              "relative flex flex-col items-start gap-6 border p-4 text-left transition-all",
              on ? "border-foreground bg-card shadow-soft" : "border-border bg-card/50 hover:border-foreground/40",
            )}
          >
            <span className={cn("h-8 w-8 rounded-full", accentClasses[p.slug].bg)} aria-hidden />
            <span>
              <span className="block text-lg font-bold">{p.name}</span>
              <span className="text-xs text-muted-foreground">{p.thicknessMm} mm · {p.densityCategory}</span>
            </span>
            {on && <CheckCircle2 className="absolute right-3 top-3 h-5 w-5" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}

export function EnquiryForm({ mode, defaultCategory, defaultProducts = [] }: { mode: Mode; defaultCategory?: string; defaultProducts?: ProductSlug[] }) {
  const submit = useServerFn(submitEnquiry);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<ProductSlug[]>(defaultProducts);
  const [customerType, setCustomerType] = useState<"homeowner" | "trade">("homeowner");
  const [consent, setConsent] = useState(false);
  const [sample, setSample] = useState(mode === "sample");

  const showTrade = mode === "trade" || (mode === "sample" && customerType === "trade");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    const payload = {
      enquiry_type: mode,
      enquiry_category: get("enquiry_category"),
      name: get("name"),
      company: get("company"),
      role: get("role"),
      email: get("email"),
      phone: get("phone"),
      state: get("state"),
      business_type: get("business_type"),
      customer_type: mode === "sample" ? customerType : "",
      products: selected,
      estimated_requirement: get("estimated_requirement"),
      sample_requested: sample,
      delivery_suburb: get("delivery_suburb"),
      delivery_postcode: get("delivery_postcode"),
      intended_application: get("intended_application"),
      message: get("message"),
      consent,
      website: get("website"),
    };
    const parsed = enquirySchema.safeParse(payload);
    const errs: Record<string, string> = {};
    if (!parsed.success) for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
    if (mode === "sample" && selected.length === 0) errs['products'] = "Please choose at least one product";
    if (mode === "sample" && !get("delivery_postcode")) errs['delivery_postcode'] = "Please enter a postcode";
    if (mode !== "contact" && !get("state")) errs['state'] = "Please select a state or territory";
    if (mode === "trade" && !get("company")) errs['company'] = "Please enter your company";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState("sending");
    setServerError(null);
    try {
      const res = await submit({ data: payload });
      if (res.ok) setState("done");
      else {
        setServerError(res.error);
        setState("idle");
      }
    } catch {
      setServerError("Something went wrong and your enquiry was not sent. Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-border bg-card p-8 md:p-12" role="status">
        <CheckCircle2 className="h-10 w-10" aria-hidden />
        <h3 className="mt-6 text-3xl font-bold">Thank you — we've received your {mode === "sample" ? "sample request" : "enquiry"}.</h3>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Your details have been recorded. A member of the Sarva Australia team will review it and get back to you by email.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><Link to="/products">Continue browsing</Link></Button>
          <Button asChild variant="outline"><Link to="/resources">View resources</Link></Button>
        </div>
      </div>
    );
  }

  const err = (k: string) => errors[k];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {mode === "sample" && (
        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">I am a…</legend>
          <div className="grid grid-cols-2 gap-3">
            {(["homeowner", "trade"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={customerType === t}
                onClick={() => setCustomerType(t)}
                className={cn("h-12 border text-sm font-semibold", customerType === t ? "border-foreground bg-foreground text-background" : "border-border bg-card")}
              >
                {t === "homeowner" ? "Homeowner" : "Trade professional"}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {(mode === "sample" || mode === "trade") && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {mode === "sample" ? "Choose your samples *" : "Products of interest"}
          </p>
          <ProductPicker value={selected} onChange={setSelected} />
          {err("products") && <p role="alert" className="text-xs font-medium text-destructive">{err("products")}</p>}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="name" label="Full name" required error={err("name")}>
          <Input id="name" name="name" autoComplete="name" className={inputCls} aria-invalid={!!err("name")} />
        </Field>
        <Field id="email" label="Email" required error={err("email")}>
          <Input id="email" name="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!err("email")} />
        </Field>
        <Field id="phone" label="Phone" error={err("phone")}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
        <Field id="state" label="State or territory" required={mode !== "contact"} error={err("state")}>
          <select id="state" name="state" className={selectCls} defaultValue="">
            <option value="">Select…</option>
            {australianStates.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>

        {showTrade && (
          <>
            <Field id="company" label="Company name" required={mode === "trade"} error={err("company")}>
              <Input id="company" name="company" autoComplete="organization" className={inputCls} />
            </Field>
            <Field id="role" label="Position or role">
              <Input id="role" name="role" autoComplete="organization-title" className={inputCls} />
            </Field>
            <Field id="business_type" label="Business type">
              <select id="business_type" name="business_type" className={selectCls} defaultValue="">
                <option value="">Select…</option>
                {businessTypes.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </>
        )}

        {mode === "trade" && (
          <>
            <Field id="estimated_requirement" label="Estimated monthly requirement">
              <Input id="estimated_requirement" name="estimated_requirement" placeholder="e.g. 20 rolls" className={inputCls} />
            </Field>
            <Field id="enquiry_category" label="Enquiry category">
              <select id="enquiry_category" name="enquiry_category" className={selectCls} defaultValue={defaultCategory ?? ""}>
                <option value="">Select…</option>
                {tradeCategories.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </>
        )}

        {mode === "contact" && (
          <Field id="enquiry_category" label="Enquiry type">
            <select id="enquiry_category" name="enquiry_category" className={selectCls} defaultValue={defaultCategory ?? contactCategories[0]}>
              {contactCategories.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
        )}

        {mode === "sample" && (
          <>
            <Field id="delivery_suburb" label="Delivery suburb">
              <Input id="delivery_suburb" name="delivery_suburb" autoComplete="address-level2" className={inputCls} />
            </Field>
            <Field id="delivery_postcode" label="Postcode" required error={err("delivery_postcode")}>
              <Input id="delivery_postcode" name="delivery_postcode" inputMode="numeric" autoComplete="postal-code" className={inputCls} />
            </Field>
          </>
        )}
      </div>

      {mode === "sample" ? (
        <Field id="intended_application" label="Intended application">
          <Textarea id="intended_application" name="intended_application" rows={4} placeholder="Tell us about the rooms, carpet type or project." className="rounded-sm bg-card" />
        </Field>
      ) : (
        <Field id="message" label="Message">
          <Textarea id="message" name="message" rows={5} className="rounded-sm bg-card" />
        </Field>
      )}

      <div className="space-y-4">
        {mode === "trade" && (
          <label className="flex items-start gap-3 text-sm">
            <Checkbox checked={sample} onCheckedChange={(v) => setSample(v === true)} className="mt-0.5" />
            I'd also like to request trade samples.
          </label>
        )}
        <label className="flex items-start gap-3 text-sm">
          <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" aria-invalid={!!err("consent")} />
          <span>
            I agree to Sarva Australia storing these details to respond to my enquiry, as described in the{" "}
            <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>. *
          </span>
        </label>
        {err("consent") && <p role="alert" className="text-xs font-medium text-destructive">{err("consent")}</p>}
      </div>

      {serverError && <p role="alert" className="border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">{serverError}</p>}

      <Button type="submit" size="lg" disabled={state === "sending"}>
        {state === "sending" && <Loader2 className="animate-spin" />}
        {mode === "sample" ? "Submit sample request" : mode === "trade" ? "Send trade enquiry" : "Send enquiry"}
      </Button>
    </form>
  );
}
