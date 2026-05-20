import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { LoginPanel } from "@/components/login-panel";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <BrandMark />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
              Steady Path
            </p>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-ink">
            Help in reach when a gambling urge hits.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            Sign in, then go straight to a no-form recovery toolbox. No setup wizard.
          </p>
        </div>

        <LoginPanel />

        <p className="mt-6 text-sm leading-6 text-muted">
          This app offers practical support and resource links. It is not emergency medical care.
          If you may hurt yourself or someone else, call your local emergency number now.
        </p>
        <div className="mt-5 flex gap-4 text-sm font-medium text-forest">
          <Link href="/privacy">Privacy</Link>
          <Link href="/safety">Safety</Link>
        </div>
      </section>
    </main>
  );
}
