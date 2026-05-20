import { TrustedContacts } from "@/components/trusted-contacts";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-ink sm:text-5xl">Settings</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Keep only the shortcuts you want. No recovery profile is required.
        </p>
      </div>

      <TrustedContacts />

      <section className="rounded-lg border border-line bg-paper p-5">
        <h2 className="text-xl font-black text-ink">Privacy and data</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          V1 stores contact shortcuts on this device. Supabase tables are ready for account-level
          saved pins, favorites, contacts, urge events, and progress once a project is connected.
        </p>
      </section>
    </div>
  );
}
