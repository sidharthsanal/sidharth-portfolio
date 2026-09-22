"use client";

import { useEffect, useState } from "react";

/**
 * Page-load curtain. Unmounts itself on a timer rather than relying purely on a
 * CSS animation, so a visitor with reduced-motion enabled never gets stranded
 * behind a panel that never animated away.
 */
export default function Curtain() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setGone(true), calm ? 0 : 1700);
    return () => window.clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex animate-curtain items-end bg-ink edge pb-[8vh] motion-reduce:hidden"
    >
      <div className="w-full">
        <span className="block h-px w-full bg-ivory/20" />
        <div className="mt-5 flex items-baseline justify-between">
          <span className="font-display text-[clamp(2rem,7vw,5rem)] uppercase leading-none tracking-tightest text-ivory">
            Sidharth Sanal
          </span>
          <span className="label hidden text-olive-light sm:block">
            Digital Marketing <span className="text-red">×</span> Creative Strategy{" "}
            <span className="text-red">×</span> AI
          </span>
        </div>
      </div>
    </div>
  );
}
