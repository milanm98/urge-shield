import Link from "next/link";
import { Ban, HeartHandshake, Phone, ShieldAlert } from "lucide-react";

const recoverySteps = [
  {
    icon: Ban,
    title: "Stop the session now",
    text: "Close the site or app. Do not chase the loss. The goal is to stop more damage."
  },
  {
    icon: ShieldAlert,
    title: "Protect money access",
    text: "Move away from cards, banking apps, betting accounts, and alcohol or other triggers."
  },
  {
    icon: Phone,
    title: "Tell one person",
    text: "Send a simple message: I gambled and I need help stopping for today."
  },
  {
    icon: HeartHandshake,
    title: "Restart the next hour",
    text: "A slip is not permission to keep going. Choose one clean hour."
  }
];

export default function SlippedPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-line bg-paper p-5 shadow-soft sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
          No shame. Damage control first.
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-ink sm:text-5xl">
          If you gambled, stop the spiral here.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          You are not starting from zero. The next useful move is to prevent more gambling today.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="sms:?&body=I%20gambled%20and%20I%20need%20help%20stopping%20for%20today.%20Can%20you%20stay%20with%20me%20for%2010%20minutes%3F"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-teal px-4 font-black text-white hover:bg-forest"
          >
            Send SOS message
          </a>
          <Link
            href="/resources?filter=blocking"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-white px-4 font-black text-forest hover:bg-mist"
          >
            Block gambling access
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {recoverySteps.map((step) => (
          <article key={step.title} className="rounded-lg border border-line bg-paper p-5">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-clay/10 text-clay">
              <step.icon size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl font-black text-ink">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
