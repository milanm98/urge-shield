import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PinResourceButton } from "@/components/pin-resource-button";
import { filters, resources, type ResourceFilter } from "@/content/resources";
import { createClient } from "@/lib/supabase/server";

function isFilter(value: string | null): value is ResourceFilter {
  return filters.some((filter) => filter.id === value);
}

export default async function ResourcesPage({
  searchParams
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const activeFilter = isFilter(params.filter ?? null) ? params.filter : "urgent";
  const visibleResources = resources.filter((resource) => resource.filter === activeFilter);
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: pinnedRows } = user
    ? await supabase.from("pinned_resources").select("resource_id").eq("user_id", user.id)
    : { data: [] };
  const pinnedResourceIds = new Set((pinnedRows ?? []).map((row) => row.resource_id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-ink sm:text-5xl">Recovery resources</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Choose by what you need right now. Resources open directly, without intake screens.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Link
            key={filter.id}
            href={`/resources?filter=${filter.id}`}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-bold ${
              activeFilter === filter.id
                ? "border-teal bg-teal text-white"
                : "border-line bg-white text-forest hover:bg-mist"
            }`}
          >
            <filter.icon size={17} aria-hidden="true" />
            {filter.label}
          </Link>
        ))}
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {visibleResources.map((resource) => (
          <article key={resource.id} className="rounded-lg border border-line bg-paper p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">
                  {resource.type}
                </p>
                <h2 className="mt-2 text-xl font-black text-ink">{resource.title}</h2>
              </div>
              <PinResourceButton
                resourceId={resource.id}
                resourceTitle={resource.title}
                initialPinned={pinnedResourceIds.has(resource.id)}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{resource.description}</p>
            <a
              href={resource.href}
              target={resource.href.startsWith("http") ? "_blank" : undefined}
              rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-forest px-4 text-sm font-bold text-white hover:bg-teal"
            >
              Open
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </section>
    </div>
  );
}
