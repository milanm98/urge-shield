"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function cleanOptional(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : null;
}

export async function addTrustedContact(formData: FormData) {
  const name = cleanOptional(formData.get("name"));
  const phone = cleanOptional(formData.get("phone"));
  const email = cleanOptional(formData.get("email"));

  if (!name) {
    return { ok: false, message: "Name is required." };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Please sign in again." };
  }

  const { error } = await supabase.from("trusted_contacts").insert({
    user_id: user.id,
    name,
    phone,
    email,
    preferred_contact_method: phone ? "sms" : email ? "email" : null
  });

  if (error) {
    return { ok: false, message: "Could not save contact." };
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  return { ok: true, message: "Contact saved." };
}

export async function deleteTrustedContact(contactId: string) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Please sign in again." };
  }

  const { error } = await supabase
    .from("trusted_contacts")
    .delete()
    .eq("id", contactId)
    .eq("user_id", user.id);

  if (error) {
    return { ok: false, message: "Could not remove contact." };
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  return { ok: true, message: "Contact removed." };
}

export async function togglePinnedResource(resourceId: string, isPinned: boolean) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Please sign in again." };
  }

  const { error } = isPinned
    ? await supabase
        .from("pinned_resources")
        .delete()
        .eq("user_id", user.id)
        .eq("resource_id", resourceId)
    : await supabase.from("pinned_resources").insert({
        user_id: user.id,
        resource_id: resourceId
      });

  if (error) {
    return { ok: false, message: "Could not update pin." };
  }

  revalidatePath("/resources");
  revalidatePath("/dashboard");
  return { ok: true, message: isPinned ? "Resource unpinned." : "Resource pinned." };
}
