export type EnquiryLite = { created_at: string; enquiry_type: string; status: string; products: string[]; sample_requested: boolean };

export const STATUSES = ["new", "in_progress", "closed", "spam"] as const;

/** Headline numbers for the enquiry dashboard. `now` is injectable for tests. */
export function enquiryStats(rows: EnquiryLite[], now = Date.now()) {
  const day = 86_400_000;
  const last30 = rows.filter((r) => now - Date.parse(r.created_at) <= 30 * day).length;
  const prev30 = rows.filter((r) => { const a = now - Date.parse(r.created_at); return a > 30 * day && a <= 60 * day; }).length;
  const count = (f: (r: EnquiryLite) => boolean) => rows.filter(f).length;
  const tally = (keys: string[]) => Object.fromEntries(keys.map((k) => [k, 0])) as Record<string, number>;
  const byType = tally(["contact", "trade", "sample"]);
  const byProduct = tally(["spring", "bounce", "pulse", "bloom"]);
  for (const r of rows) {
    byType[r.enquiry_type] = (byType[r.enquiry_type] ?? 0) + 1;
    for (const p of r.products) byProduct[p] = (byProduct[p] ?? 0) + 1;
  }
  return {
    total: rows.length,
    open: count((r) => r.status === "new"),
    inProgress: count((r) => r.status === "in_progress"),
    samples: count((r) => r.sample_requested || r.enquiry_type === "sample"),
    last30,
    growth: prev30 === 0 ? null : Math.round(((last30 - prev30) / prev30) * 100),
    byType,
    byProduct,
  };
}

/** Enquiries per day for the last `days` days, oldest first. */
export function dailySeries(rows: EnquiryLite[], days: number, now = Date.now()) {
  const out: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * 86_400_000).toISOString().slice(0, 10);
    out.push({ date: d, count: 0 });
  }
  const idx = new Map(out.map((o, i) => [o.date, i]));
  for (const r of rows) { const i = idx.get(r.created_at.slice(0, 10)); if (i !== undefined) out[i]!.count++; }
  return out;
}
