import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ActionTileProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone?: "teal" | "clay" | "saffron" | "forest";
};

const toneClasses = {
  teal: "border-teal/20 bg-teal/10 text-teal",
  clay: "border-clay/20 bg-clay/10 text-clay",
  saffron: "border-saffron/20 bg-saffron/10 text-saffron",
  forest: "border-forest/20 bg-forest/10 text-forest"
};

export function ActionTile({
  title,
  description,
  href,
  icon: Icon,
  tone = "teal"
}: ActionTileProps) {
  return (
    <Link
      href={href}
      className="group grid min-h-36 rounded-lg border border-line bg-paper p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-teal hover:shadow-soft"
    >
      <span
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md border ${toneClasses[tone]}`}
      >
        <Icon size={22} aria-hidden="true" />
      </span>
      <span className="text-lg font-bold text-ink">{title}</span>
      <span className="mt-2 text-sm leading-6 text-muted">{description}</span>
    </Link>
  );
}
