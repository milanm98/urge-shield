"use client";

import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export function LoginPanel() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback?next=/dashboard`
      : undefined;

  async function signInWithGoogle() {
    setIsLoading(true);
    setStatus(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });
    if (error) {
      setStatus(error.message);
      setIsLoading(false);
    }
  }

  async function sendMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo
      }
    });

    setIsLoading(false);
    setStatus(error ? error.message : "Check your email for the sign-in link.");
  }

  return (
    <div className="rounded-lg border border-line bg-paper p-5 shadow-soft">
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={isLoading}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-line bg-white px-4 text-base font-semibold text-ink transition hover:border-teal hover:bg-mist disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ShieldCheck size={20} aria-hidden="true" />
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={sendMagicLink} className="space-y-3">
        <label htmlFor="email" className="text-sm font-semibold text-ink">
          Email magic link
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="min-h-12 w-full rounded-md border border-line bg-white px-10 text-base text-ink"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="min-h-12 rounded-md bg-teal px-4 text-sm font-bold text-white transition hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </form>

      {status ? (
        <p className="mt-4 rounded-md bg-mist px-3 py-2 text-sm leading-6 text-forest">{status}</p>
      ) : null}
    </div>
  );
}
