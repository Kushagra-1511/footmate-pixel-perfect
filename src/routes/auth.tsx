import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Team sign in | FOOTMATE" },
      { name: "description", content: "Sign in to the FOOTMATE enquiries dashboard." },
      { property: "og:title", content: "Team sign in | FOOTMATE" },
      { property: "og:description", content: "Sign in to the FOOTMATE enquiries dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    setBusy(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg(error.message);
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
      setBusy(false);
      setMsg(error ? error.message : "Check your email to confirm your account, then sign in.");
    }
  }

  return (
    <section className="container-site flex min-h-[70vh] items-center py-20">
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-sm space-y-5">
        <p className="eyebrow">FOOTMATE team</p>
        <h1 className="display-lg">{mode === "in" ? "Sign in" : "Create account"}</h1>
        <label className="block text-sm">Email
          <input name="email" type="email" required maxLength={255} autoComplete="email" className="mt-2 h-11 w-full border border-input bg-background px-3" />
        </label>
        <label className="block text-sm">Password
          <input name="password" type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} className="mt-2 h-11 w-full border border-input bg-background px-3" />
        </label>
        {msg && <p role="status" className="text-sm text-muted-foreground">{msg}</p>}
        <button disabled={busy} className="nav-caps h-11 w-full bg-primary text-primary-foreground disabled:opacity-60">{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}</button>
        <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }} className="w-full text-sm underline">
          {mode === "in" ? "No account yet? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
    </section>
  );
}
