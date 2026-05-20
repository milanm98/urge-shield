import Link from "next/link";
import { BookOpen, DoorOpen, Phone, Shield, Video } from "lucide-react";
import { UrgeTimer } from "@/components/urge-timer";

const steps = [
  "Put both feet on the floor.",
  "Relax your jaw and shoulders.",
  "Name five things you can see.",
  "Breathe in for four, out for six.",
  "Move your money or device away from you."
];

const actions = [
  {
    href: "/settings#contacts",
    icon: Phone,
    label: "Contact a trusted person",
    text: "Use a call or SOS text before the urge talks you into privacy."
  },
  {
    href: "/resources?filter=urgent",
    icon: Video,
    label: "Watch a short support video",
    text: "Let someone else’s recovery voice interrupt the loop."
  },
  {
    href: "/resources?filter=blocking",
    icon: Shield,
    label: "Block access",
    text: "Open blocking tools, self-exclusion, or bank controls."
  },
  {
    href: "/resources?filter=motivation",
    icon: BookOpen,
    label: "Read a recovery reminder",
    text: "Reconnect with the reason you are protecting today."
  },
  {
    href: "/dashboard",
    icon: DoorOpen,
    label: "Leave this situation",
    text: "Stand up, change rooms, step outside, or go where gambling is harder."
  }
];

export default function UrgePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard" className="text-sm font-bold text-teal hover:text-forest">
          Back to dashboard
        </Link>
        <h1 className="mt-3 text-3xl font-black text-ink sm:text-5xl">Pause the urge.</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          No typing required. Start the timer, ground your body, then choose one action.
        </p>
      </div>

      <UrgeTimer />

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-line bg-mist p-5">
          <h2 className="text-xl font-black text-ink">60-second grounding</h2>
          <ol className="mt-4 space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-base leading-6 text-forest">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-black text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-3">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex min-h-20 gap-4 rounded-lg border border-line bg-paper p-4 hover:border-teal hover:bg-white"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
                <action.icon size={22} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-base font-black text-ink">{action.label}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{action.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
