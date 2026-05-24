"use client";

import { useMemo, useState, useTransition } from "react";
import { Mail, Phone, Plus, Trash2 } from "lucide-react";
import { addTrustedContact, deleteTrustedContact } from "@/app/actions";

type Contact = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
};

export function TrustedContacts({ contacts }: { contacts: Contact[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const sosBody = useMemo(
    () =>
      encodeURIComponent(
        "I am having a gambling urge. Can you talk with me for 10 minutes?"
      ),
    []
  );

  function addContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setMessage(null);

    startTransition(async () => {
      const result = await addTrustedContact(formData);
      setMessage(result.message);

      if (result.ok) {
        setName("");
        setPhone("");
        setEmail("");
        setIsAdding(false);
      }
    });
  }

  function removeContact(contactId: string) {
    setMessage(null);
    startTransition(async () => {
      const result = await deleteTrustedContact(contactId);
      setMessage(result.message);
    });
  }

  return (
    <section id="contacts" className="rounded-lg border border-line bg-paper p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-ink">Trusted contacts</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Optional, private shortcuts for the people who help you pause.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding((value) => !value)}
          className="inline-flex min-h-10 items-center gap-2 rounded-md bg-teal px-3 text-sm font-bold text-white hover:bg-forest"
        >
          <Plus size={18} aria-hidden="true" />
          Add
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={addContact} className="mt-5 grid gap-3 rounded-md bg-mist p-4 sm:grid-cols-3">
          <input
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            className="min-h-11 rounded-md border border-line bg-white px-3"
          />
          <input
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone"
            className="min-h-11 rounded-md border border-line bg-white px-3"
          />
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="min-h-11 rounded-md border border-line bg-white px-3"
          />
          <button
            type="submit"
            disabled={isPending}
            className="min-h-11 rounded-md bg-forest px-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-3"
          >
            {isPending ? "Saving..." : "Save contact"}
          </button>
        </form>
      ) : null}

      {message ? (
        <p className="mt-4 rounded-md bg-mist px-3 py-2 text-sm leading-6 text-forest" aria-live="polite">
          {message}
        </p>
      ) : null}

      <div className="mt-5 grid gap-3">
        {contacts.length === 0 ? (
          <p className="rounded-md bg-mist p-4 text-sm leading-6 text-muted">
            No contacts yet. You can still use the generic SOS text from the dashboard.
          </p>
        ) : (
          contacts.map((contact) => (
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-forest hover:bg-mist"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone size={18} />
                  </a>
                ) : null}
                {contact.phone ? (
                  <a
                    href={`sms:${contact.phone}?&body=${sosBody}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-forest hover:bg-mist"
                    aria-label={`Text ${contact.name}`}
                  >
                    <Mail size={18} />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => removeContact(contact.id)}
                  disabled={isPending}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-clay hover:bg-clay/10 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label={`Remove ${contact.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
