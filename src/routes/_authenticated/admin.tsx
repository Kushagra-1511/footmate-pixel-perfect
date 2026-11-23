import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, type FormEvent } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { products } from "@/data/products";
import { STATUSES, dailySeries, enquiryStats } from "@/lib/enquiry-stats";

type Row = Database["public"]["Tables"]["enquiries"]["Row"];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Enquiries dashboard | FOOTMATE" },
      { name: "description", content: "Private FOOTMATE dashboard for managing customer enquiries." },
      { property: "og:title", content: "Enquiries dashboard | FOOTMATE" },
      { property: "og:description", content: "Private FOOTMATE dashboard for managing customer enquiries." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const productName = (slug: string) => products.find((p) => p.slug === slug)?.name ?? slug;
const statusLabel = (s: string) => s.replace("_", " ");
const FIELDS: { key: keyof Row; label: string; area?: boolean }[] = [
  { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
  { key: "company", label: "Company" }, { key: "role", label: "Role" }, { key: "state", label: "State" },
  { key: "enquiry_category", label: "Category" }, { key: "business_type", label: "Business type" },
  { key: "delivery_suburb", label: "Suburb" }, { key: "delivery_postcode", label: "Postcode" },
  { key: "estimated_requirement", label: "Estimated requirement" },
  { key: "intended_application", label: "Intended application", area: true },
  { key: "message", label: "Message", area: true }, { key: "admin_notes", label: "Internal notes (private)", area: true },
];

function useIsAdmin() {
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return { admin: false, email: "" };
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle();
      return { admin: !!data, email: u.user.email ?? "" };
    },
  });
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const me = useIsAdmin();

  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (me.isLoading) return <p className="container-site py-24 text-muted-foreground">Loading…</p>;
  if (!me.data?.admin) {
    return (
      <section className="container-site py-24">
        <p className="eyebrow">Restricted</p>
        <h1 className="display-lg mt-4">This account isn't an admin.</h1>
        <p className="mt-4 text-muted-foreground">Signed in as {me.data?.email}. Ask the site owner to grant admin access.</p>
        <button onClick={signOut} className="nav-caps mt-8 h-11 border border-foreground/20 px-6">Sign out</button>
      </section>
    );
  }
  return (<><Toaster /><Dashboard email={me.data.email} onSignOut={signOut} /></>);
}

function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(5000);
      if (error) throw error;
      return data;
    },
  });
  const rows = list.data ?? [];
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [editing, setEditing] = useState<Row | "new" | null>(null);

  const stats = useMemo(() => enquiryStats(rows), [rows]);
  const series = useMemo(() => dailySeries(rows, 30).map((d) => ({ ...d, label: d.date.slice(5) })), [rows]);
  const filtered = rows.filter((r) =>
    (status === "all" || r.status === status) && (type === "all" || r.enquiry_type === type) &&
    (!q || [r.name, r.email, r.company, r.phone, r.message, r.delivery_postcode].some((v) => v?.toLowerCase().includes(q.toLowerCase()))));

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-enquiries"] });
  const setStatusM = useMutation({
    mutationFn: async ({ id, s }: { id: string; s: string }) => { const { error } = await supabase.from("enquiries").update({ status: s }).eq("id", id); if (error) throw error; },
    onSuccess: refresh, onError: () => toast.error("Couldn't update status"),
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("enquiries").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast.success("Enquiry deleted"); refresh(); }, onError: () => toast.error("Couldn't delete"),
  });

  function exportCsv() {
    const cols = ["created_at", "status", "enquiry_type", "name", "email", "phone", "company", "state", "products", "message", "admin_notes"] as const;
    const esc = (v: unknown) => `"${String(Array.isArray(v) ? v.map(productName).join("; ") : v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...filtered.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `footmate-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const kpis = [
    { label: "Total enquiries", value: stats.total },
    { label: "New (unanswered)", value: stats.open },
    { label: "In progress", value: stats.inProgress },
    { label: "Last 30 days", value: stats.last30, note: stats.growth === null ? "No earlier period to compare" : `${stats.growth >= 0 ? "+" : ""}${stats.growth}% vs previous 30 days` },
    { label: "Sample requests", value: stats.samples },
  ];

  return (
    <section className="container-site py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Admin</p><h1 className="display-lg mt-3">Enquiries</h1></div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">{email}<button onClick={onSignOut} className="nav-caps h-10 border border-foreground/20 px-4 text-foreground">Sign out</button></div>
      </div>

      {list.isError && <p className="mt-8 text-destructive">Couldn't load enquiries. Refresh to try again.</p>}

      <div className="mt-10 grid grid-cols-2 gap-px bg-border md:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card p-5">
            <p className="nav-caps text-muted-foreground">{k.label}</p>
            <p className="mt-3 text-3xl font-light">{list.isLoading ? "–" : k.value}</p>
            {k.note && <p className="mt-1 text-xs text-muted-foreground">{k.note}</p>}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="border border-border bg-card p-5 lg:col-span-2">
          <p className="nav-caps text-muted-foreground">Enquiries per day · last 30 days</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={4} /><YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={28} />
                <Tooltip /><Bar dataKey="count" name="Enquiries" fill="var(--color-primary)" /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-6 border border-border bg-card p-5">
          <Breakdown title="By type" data={Object.entries(stats.byType).map(([k, v]) => [k, v])} />
          <Breakdown title="Products of interest" data={Object.entries(stats.byProduct).map(([k, v]) => [productName(k), v])} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, company, postcode…" className="h-10 min-w-0 flex-1 border border-input bg-background px-3 text-sm" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 border border-input bg-background px-2 text-sm" aria-label="Filter by status">
          <option value="all">All statuses</option>{STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 border border-input bg-background px-2 text-sm" aria-label="Filter by type">
          <option value="all">All types</option><option value="contact">Contact</option><option value="trade">Trade</option><option value="sample">Sample</option>
        </select>
        <button onClick={exportCsv} className="nav-caps h-10 border border-foreground/20 px-4">Export CSV</button>
        <button onClick={() => setEditing("new")} className="nav-caps h-10 bg-primary px-4 text-primary-foreground">Add enquiry</button>
      </div>

      <div className="mt-4 overflow-x-auto border border-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-muted/50"><tr>{["Date", "Name", "Contact", "Type", "Products", "Status", ""].map((h) => <th key={h} className="nav-caps px-3 py-3 font-medium text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="whitespace-nowrap px-3 py-3">{new Date(r.created_at).toLocaleDateString("en-AU")}</td>
                <td className="px-3 py-3"><p className="font-medium">{r.name}</p>{r.company && <p className="text-xs text-muted-foreground">{r.company}</p>}</td>
                <td className="px-3 py-3"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a>{r.phone && <p className="text-xs">{r.phone}</p>}</td>
                <td className="px-3 py-3 capitalize">{r.enquiry_type}</td>
                <td className="px-3 py-3">{r.products.map(productName).join(", ") || "—"}</td>
                <td className="px-3 py-3">
                  <select value={r.status} onChange={(e) => setStatusM.mutate({ id: r.id, s: e.target.value })} className="h-8 border border-input bg-background px-1 text-xs capitalize" aria-label={`Status for ${r.name}`}>
                    {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
                  </select>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-right">
                  <button onClick={() => setEditing(r)} className="underline">Open</button>
                  <button onClick={() => { if (confirm(`Delete the enquiry from ${r.name}? This can't be undone.`)) del.mutate(r.id); }} className="ml-3 text-destructive underline">Delete</button>
                </td>
              </tr>
            ))}
            {!list.isLoading && filtered.length === 0 && <tr><td colSpan={7} className="px-3 py-10 text-center text-muted-foreground">No enquiries match.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{filtered.length} of {rows.length} shown</p>

      <EditDialog row={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }} />
    </section>
  );
}

function Breakdown({ title, data }: { title: string; data: [string, number][] }) {
  const max = Math.max(1, ...data.map((d) => d[1]));
  return (
    <div><p className="nav-caps text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-2">{data.map(([k, v]) => (
        <li key={k} className="text-sm"><div className="flex justify-between capitalize"><span>{k}</span><span>{v}</span></div>
          <div className="mt-1 h-1 bg-muted"><div className="h-1 bg-primary" style={{ width: `${(v / max) * 100}%` }} /></div></li>))}
      </ul>
    </div>
  );
}

function EditDialog({ row, onClose, onSaved }: { row: Row | "new" | null; onClose: () => void; onSaved: () => void }) {
  const [saving, setSaving] = useState(false);
  const isNew = row === "new";
  const r = row && row !== "new" ? row : null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    for (const f of FIELDS) { const s = String(fd.get(f.key) ?? "").trim(); v[f.key] = s === "" ? null : s; }
    if (!v["name"] || !v["email"]) { toast.error("Name and email are required"); return; }
    v["email"] = String(v["email"]).toLowerCase();
    v["status"] = String(fd.get("status"));
    v["enquiry_type"] = String(fd.get("enquiry_type"));
    v["products"] = fd.getAll("products").map(String);
    setSaving(true);
    const { error } = isNew
      ? await supabase.from("enquiries").insert(v as Database["public"]["Tables"]["enquiries"]["Insert"])
      : await supabase.from("enquiries").update(v as Database["public"]["Tables"]["enquiries"]["Update"]).eq("id", r!.id);
    setSaving(false);
    if (error) { toast.error("Couldn't save"); return; }
    toast.success(isNew ? "Enquiry added" : "Saved");
    onSaved();
  }

  return (
    <Dialog open={!!row} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-none">
        <DialogHeader><DialogTitle>{isNew ? "Add enquiry" : `Enquiry from ${r?.name}`}</DialogTitle></DialogHeader>
        {r && <p className="text-xs text-muted-foreground">Received {new Date(r.created_at).toLocaleString("en-AU")} · updated {new Date(r.updated_at).toLocaleString("en-AU")}</p>}
        <form key={r?.id ?? "new"} onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">Type<select name="enquiry_type" defaultValue={r?.enquiry_type ?? "contact"} className="mt-1 h-10 w-full border border-input bg-background px-2"><option value="contact">Contact</option><option value="trade">Trade</option><option value="sample">Sample</option></select></label>
          <label className="text-sm">Status<select name="status" defaultValue={r?.status ?? "new"} className="mt-1 h-10 w-full border border-input bg-background px-2 capitalize">{STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}</select></label>
          {FIELDS.map((f) => (
            <label key={f.key} className={`text-sm ${f.area ? "sm:col-span-2" : ""}`}>{f.label}
              {f.area
                ? <textarea name={f.key} defaultValue={(r?.[f.key] as string | null) ?? ""} maxLength={4000} rows={3} className="mt-1 w-full border border-input bg-background p-2" />
                : <input name={f.key} type={f.key === "email" ? "email" : "text"} required={f.key === "name" || f.key === "email"} defaultValue={(r?.[f.key] as string | null) ?? ""} maxLength={255} className="mt-1 h-10 w-full border border-input bg-background px-2" />}
            </label>
          ))}
          <fieldset className="text-sm sm:col-span-2"><legend>Products</legend>
            <div className="mt-2 flex flex-wrap gap-4">{products.map((p) => (
              <label key={p.slug} className="flex items-center gap-2"><input type="checkbox" name="products" value={p.slug} defaultChecked={r?.products.includes(p.slug)} />{p.name}</label>))}</div>
          </fieldset>
          <div className="flex justify-end gap-3 sm:col-span-2">
            <button type="button" onClick={onClose} className="nav-caps h-10 border border-foreground/20 px-4">Cancel</button>
            <button disabled={saving} className="nav-caps h-10 bg-primary px-5 text-primary-foreground disabled:opacity-60">{saving ? "Saving…" : "Save"}</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
