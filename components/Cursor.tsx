"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only cursor. A small ring that eases toward the pointer and expands
 * over anything marked `data-cursor`. Rendered only for fine pointers and never
 * when the visitor has asked for reduced motion, so it can't become a
 * distraction or a touch-device artefact.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hit = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setActive(Boolean(hit));
      setLabel(hit?.dataset.cursor && hit.dataset.cursor !== "true" ? hit.dataset.cursor : "");
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden mix-blend-difference lg:block"
    >
      <span
        className={[
          "flex items-center justify-center rounded-full border border-ivory transition-all duration-300 ease-editorial",
          active ? "h-20 w-20 bg-ivory/10" : "h-3 w-3 bg-ivory",
        ].join(" ")}
      >
        {label ? (
          <span className="label text-[0.5rem] text-ivory">{label}</span>
        ) : null}
      </span>
    </div>
  );
}
