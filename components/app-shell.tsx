import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const { isConfigured, allowLocalPreview } = getSupabaseConfig();
  const user = isConfigured
    ? (await (await createClient()).auth.getUser()).data.user
    : null;

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-lg font-black text-ink">
            Steady Path
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/settings"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-line bg-white px-3 text-sm font-semibold text-forest hover:bg-mist"
              aria-label="Settings"
            >
              <Settings size={18} aria-hidden="true" />
            </Link>
            <SignOutButton>
              <LogOut size={18} aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </SignOutButton>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-sm text-muted">
        <p>
          {allowLocalPreview
            ? "Local preview mode: add Supabase env vars to require real sign-in."
            : `Signed in as ${user?.email ?? "a private account"}.`}{" "}
          Support tool, not emergency care.
        </p>
      </footer>
    </div>
  );
}
