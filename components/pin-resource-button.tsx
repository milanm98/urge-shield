"use client";

import { useState, useTransition } from "react";
import { Pin, PinOff } from "lucide-react";
import { togglePinnedResource } from "@/app/actions";

type PinResourceButtonProps = {
  resourceId: string;
  initialPinned: boolean;
  resourceTitle: string;
};

export function PinResourceButton({
  resourceId,
  initialPinned,
  resourceTitle
}: PinResourceButtonProps) {
  const [isPinned, setIsPinned] = useState(initialPinned);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onToggle() {
    const previousPinned = isPinned;
    setIsPinned(!previousPinned);
    setMessage(null);

    startTransition(async () => {
      const result = await togglePinnedResource(resourceId, previousPinned);

      if (!result.ok) {
        setIsPinned(previousPinned);
      }

      setMessage(result.message);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={onToggle}
        disabled={isPending}
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${
          isPinned
            ? "border-teal bg-teal text-white"
            : "border-line bg-white text-muted hover:border-teal hover:text-teal"
        } disabled:cursor-not-allowed disabled:opacity-60`}
        aria-label={`${isPinned ? "Unpin" : "Pin"} ${resourceTitle}`}
        title={isPinned ? "Unpin resource" : "Pin resource"}
      >
        {isPinned ? <PinOff size={18} aria-hidden="true" /> : <Pin size={18} aria-hidden="true" />}
      </button>
      {message ? (
        <span className="sr-only" aria-live="polite">
          {message}
        </span>
      ) : null}
    </div>
  );
}
