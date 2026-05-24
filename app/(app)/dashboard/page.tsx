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
import Link from "next/link";
import { ActionTile } from "@/components/action-tile";
import { dailyQuote, resources, urgentActions } from "@/content/resources";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const [{ data: pinnedRows }, { data: contacts }] = user
    ? await Promise.all([
        supabase.from("pinned_resources").select("resource_id").eq("user_id", user.id),
        supabase
          .from("trusted_contacts")
          .select("id,name,phone,email")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true })
          .limit(3)
      ])
    : [{ data: [] }, { data: [] }];
  const pinnedIds = new Set((pinnedRows ?? []).map((row) => row.resource_id));
  const pinnedResources = resources.filter((resource) => pinnedIds.has(resource.id)).slice(0, 4);

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
            &ldquo;{dailyQuote.text}&rdquo;
          </blockquote>
          <p className="mt-3 text-sm font-semibold text-muted">{dailyQuote.author}</p>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-paper p-5">
          <h2 className="text-xl font-black text-ink">Pinned helpers</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Your saved resources appear here for faster access during an urge.
          </p>
          <div className="mt-4 grid gap-3">
            {pinnedResources.length === 0 ? (
              <Link
                href="/resources"
                className="rounded-md border border-dashed border-line bg-white p-4 text-sm font-semibold text-forest hover:bg-mist"
              >
                Pin useful videos, blocking tools, meetings, or reminders.
              </Link>
            ) : (
              pinnedResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.href}
                  target={resource.href.startsWith("http") ? "_blank" : undefined}
                  rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-md border border-line bg-white p-3 text-sm font-semibold text-forest hover:border-teal hover:bg-mist"
                >
                  {resource.title}
                  <span className="mt-1 block text-sm font-normal leading-5 text-muted">
                    {resource.description}
                  </span>
                </a>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-paper p-5">
          <h2 className="text-xl font-black text-ink">Trusted people</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Keep support contacts close without filling out a profile.
          </p>
          <div className="mt-4 grid gap-3">
            {(contacts ?? []).length === 0 ? (
              <Link
                href="/settings#contacts"
                className="rounded-md border border-dashed border-line bg-white p-4 text-sm font-semibold text-forest hover:bg-mist"
              >
                Add a person you can call or text.
              </Link>
            ) : (
              (contacts ?? []).map((contact) => (
                <div
                  key={contact.id}
                  className="flex flex-col gap-3 rounded-md border border-line bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-black text-ink">{contact.name}</p>
                    <p className="text-sm text-muted">{contact.phone || contact.email || "No detail"}</p>
                  </div>
                  <div className="flex gap-2">
                    {contact.phone ? (
                      <a
                        href={`tel:${contact.phone}`}
                        className="inline-flex min-h-10 items-center justify-center rounded-md border border-line px-3 text-sm font-bold text-forest hover:bg-mist"
                      >
                        Call
                      </a>
                    ) : null}
                    {contact.phone ? (
                      <a
                        href={`sms:${contact.phone}?&body=I%20am%20having%20a%20gambling%20urge.%20Can%20you%20talk%20with%20me%20for%2010%20minutes%3F`}
                        className="inline-flex min-h-10 items-center justify-center rounded-md border border-line px-3 text-sm font-bold text-forest hover:bg-mist"
                      >
                        Text
                      </a>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
