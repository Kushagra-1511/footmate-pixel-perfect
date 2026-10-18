import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const productEnum = z.enum(["spring", "bounce", "pulse", "bloom"]);

export const enquirySchema = z.object({
  enquiry_type: z.enum(["trade", "contact", "sample"]),
  enquiry_category: z.string().trim().max(120).optional().or(z.literal("")),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  state: z.string().trim().max(10).optional().or(z.literal("")),
  business_type: z.string().trim().max(120).optional().or(z.literal("")),
  customer_type: z.string().trim().max(40).optional().or(z.literal("")),
  products: z.array(productEnum).max(4).default([]),
  estimated_requirement: z.string().trim().max(200).optional().or(z.literal("")),
  sample_requested: z.boolean().default(false),
  delivery_suburb: z.string().trim().max(120).optional().or(z.literal("")),
  delivery_postcode: z.string().trim().max(10).optional().or(z.literal("")),
  intended_application: z.string().trim().max(1000).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) }),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.input<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // silently drop bots
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Basic anti-spam: max 3 submissions per email per 10 minutes.
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("email", data.email.toLowerCase())
      .gte("created_at", since);
    if ((count ?? 0) >= 3) {
      return { ok: false as const, error: "We've received several requests from this email recently. Please try again shortly." };
    }

    const { website: _w, ...row } = data;
    const clean = Object.fromEntries(
      Object.entries(row).map(([k, v]) => [k, v === "" ? null : v]),
    ) as typeof row;
    const { error } = await supabaseAdmin.from("enquiries").insert({
      ...clean,
      email: data.email.toLowerCase(),
      products: data.products,
      consent: true,
    });
    if (error) {
      console.error("enquiry insert failed", error);
      return { ok: false as const, error: "We couldn't save your enquiry. Please try again." };
    }
    return { ok: true as const };
  });
