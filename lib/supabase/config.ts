const fallbackUrl = "https://placeholder.supabase.co";
const fallbackAnonKey =
  "placeholder-anon-key-for-builds-replace-with-real-next-public-supabase-anon-key";

export function getSupabaseConfig() {
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackAnonKey,
    isConfigured,
    allowLocalPreview: !isConfigured && process.env.NODE_ENV === "development"
  };
}
