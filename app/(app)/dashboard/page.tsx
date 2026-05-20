import {
  BookOpen,
  HeartHandshake,
  LifeBuoy,
  MessageCircle,
  Phone,
  Shield,
  TimerReset,
  Video
} from "lucide-react";
import { ActionTile } from "@/components/action-tile";
import { dailyQuote, urgentActions } from "@/content/resources";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-line bg-paper p-5 shadow-soft sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
          No forms. Just the next right action.
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-ink sm:text-5xl">
          Get through the urge before it gets loud.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Open the tool you need right now. You can save contacts and favorites later, but nothing
          blocks you from getting help.
        </p>
        <a
          href="/urge"
          className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md bg-teal px-5 text-lg font-black text-white transition hover:bg-forest sm:w-auto"
        >
          <TimerReset size={22} aria-hidden="true" />
          I have an urge
        </a>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ActionTile
          href="/urge?mode=calm"
          icon={LifeBuoy}
          title="Calm Down"
          description="Use a timed grounding step and let the peak pass."
        />
        <ActionTile
          href="/settings#contacts"
          icon={Phone}
          title="Call Someone"
          description="Keep trusted people one tap away."
          tone="forest"
        />
        <ActionTile
          href="/resources?filter=urgent"
          icon={Video}
          title="Watch Something"
          description="Short recovery videos and practical urge support."
          tone="clay"
        />
        <ActionTile
          href="/resources?filter=motivation"
          icon={BookOpen}
          title="Read Motivation"
          description="Quotes, books, and recovery reminders."
          tone="saffron"
        />
        <ActionTile
          href="/resources?filter=blocking"
          icon={Shield}
          title="Block Gambling"
          description="Self-exclusion, blocking software, and bank controls."
          tone="forest"
        />
        <ActionTile
          href="/slipped"
          icon={HeartHandshake}
          title="I Slipped"
          description="Stop the spiral without shame and protect the rest of today."
          tone="clay"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-line bg-paper p-5">
          <div className="mb-4 flex items-center gap-2">
            <MessageCircle size={20} className="text-teal" aria-hidden="true" />
            <h2 className="text-xl font-black text-ink">Fast actions</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {urgentActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="min-h-16 rounded-md border border-line bg-white p-3 text-sm font-semibold text-forest hover:border-teal hover:bg-mist"
              >
                {action.label}
                <span className="mt-1 block text-sm font-normal leading-5 text-muted">
                  {action.description}
                </span>
              </a>
            ))}
          </div>
        </div>
        <aside className="rounded-lg border border-line bg-mist p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
            Today&apos;s reminder
          </p>
          <blockquote className="mt-4 text-2xl font-black leading-snug text-ink">
            “{dailyQuote.text}”
          </blockquote>
          <p className="mt-3 text-sm font-semibold text-muted">{dailyQuote.author}</p>
        </aside>
      </section>
    </div>
  );
}
