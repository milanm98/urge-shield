import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/login" className="text-sm font-bold text-teal hover:text-forest">
        Back
      </Link>
      <h1 className="mt-4 text-4xl font-black text-ink">Privacy</h1>
      <p className="mt-4 leading-7 text-muted">
        Steady Path is designed to collect as little as possible. Account login is used to protect
        app access. Recovery resources are static. Optional contact shortcuts should only include
        people you trust.
      </p>
    </main>
  );
}
