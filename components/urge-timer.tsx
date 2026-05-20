"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Pause, Play, RotateCcw } from "lucide-react";

const TEN_MINUTES = 10 * 60;

export function UrgeTimer() {
  const [remaining, setRemaining] = useState(TEN_MINUTES);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || remaining <= 0) {
      return;
    }

    const id = window.setInterval(() => {
      setRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning, remaining]);

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  const progress = useMemo(() => ((TEN_MINUTES - remaining) / TEN_MINUTES) * 100, [remaining]);

  return (
    <section className="rounded-lg border border-line bg-paper p-5 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
        Urge timer
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-6xl font-black tabular-nums text-ink sm:text-7xl">
            {minutes}:{seconds}
          </p>
          <p className="mt-2 max-w-lg text-base leading-7 text-muted">
            You do not need to solve your whole life right now. You only need to avoid gambling
            until this timer ends.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsRunning((value) => !value)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-teal px-4 font-bold text-white hover:bg-forest"
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRemaining(TEN_MINUTES);
              setIsRunning(false);
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 font-bold text-forest hover:bg-mist"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-mist" aria-hidden="true">
        <div className="h-full bg-teal transition-all" style={{ width: `${progress}%` }} />
      </div>

      {remaining === 0 ? (
        <div className="mt-4 flex items-start gap-3 rounded-md bg-mist p-3 text-forest">
          <CheckCircle2 size={21} className="mt-0.5 shrink-0 text-teal" />
          <p className="text-sm leading-6">
            You made space between urge and action. Pick one more support step before leaving.
          </p>
        </div>
      ) : null}
    </section>
  );
}
