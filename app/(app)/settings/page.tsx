import { TrustedContacts } from "@/components/trusted-contacts";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: contacts } = user
    ? await supabase
        .from("trusted_contacts")
        .select("id,name,phone,email")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
    : { data: [] };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-ink sm:text-5xl">Settings</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Keep only the shortcuts you want. No recovery profile is required.
        </p>
      </div>

      <TrustedContacts contacts={contacts ?? []} />

      <section className="rounded-lg border border-line bg-paper p-5">
        <h2 className="text-xl font-black text-ink">Privacy and data</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Trusted contacts and pinned resources are saved to your account so they can follow you
          across devices. Keep only shortcuts that feel useful.
        </p>
      </section>
    </div>
  );
}
