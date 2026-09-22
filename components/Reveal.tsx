"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: ElementType;
  id?: string;
  /**
   * `bare` skips the fade/translate and only flips the `is-in` flag, which is
   * what masked-line text and image wipes listen for.
   */
  bare?: boolean;
  threshold?: number;
};

/**
 * Scroll-reveal wrapper. Uses IntersectionObserver rather than a scroll
 * listener, reveals once, then disconnects. All of the actual motion lives in
 * globals.css so a single `prefers-reduced-motion` block can disable it.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  id,
  bare = false,
  threshold = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const base = bare ? "" : "reveal";

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={[base, seen ? "is-in" : "", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
