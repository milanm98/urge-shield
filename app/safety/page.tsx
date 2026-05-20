import Link from "next/link";

export default function SafetyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/login" className="text-sm font-bold text-teal hover:text-forest">
        Back
      </Link>
      <h1 className="mt-4 text-4xl font-black text-ink">Safety</h1>
      <p className="mt-4 leading-7 text-muted">
        This app is a support toolbox, not a replacement for professional care. If you are in
        immediate danger or may harm yourself or someone else, call your local emergency number now.
      </p>
    </main>
  );
}
