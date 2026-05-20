import { redirect } from "next/navigation";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ code?: string; next?: string }>;
}) {
  const params = await searchParams;

  if (params.code) {
    const next = params.next ?? "/dashboard";
    redirect(`/auth/callback?code=${params.code}&next=${encodeURIComponent(next)}`);
  }

  redirect("/dashboard");
}
