"use client";

import { useEffect, useRef, useState } from "react";
import { metrics } from "@/lib/content";

function useCountUp(target: number, run: boolean, duration = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast out of the gate, settles precisely on the number.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  return value;
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRun(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section bg-ivory text-ink" aria-labelledby="proof-heading">
      <div ref={ref} className="edge mx-auto max-w-edge">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-5">
          <h2 id="proof-heading" className="label !tracking-label text-olive">
            By the numbers
          </h2>
          <p className="label text-ink/40">Sourced from CV &amp; verified certifications</p>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Stat key={m.label} metric={m} run={run} index={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function Stat({
  metric,
  run,
  index,
}: {
  metric: (typeof metrics)[number];
  run: boolean;
  index: number;
}) {
  const v = useCountUp(metric.value, run, 1200 + index * 160);
  const shown = metric.pad
    ? String(Math.round(v)).padStart(2, "0")
    : String(Math.round(v));

  return (
    <div className="group relative flex flex-col border-b border-ink/10 py-9 pr-5 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:pr-8">
      {/* DOM order keeps <dt> before its <dd>s; `order-*` puts the number on top. */}
      <dt className="order-2 mt-4 font-display text-[clamp(0.95rem,1.6vw,1.35rem)] uppercase leading-tight tracking-wide2 text-ink">
        {metric.label}
      </dt>
      <dd className="order-1">
        <span className="t-stat block font-display text-ink transition-colors duration-500 group-hover:text-red">
          {shown}
          <span className="text-red">{metric.suffix}</span>
        </span>
      </dd>
      <dd className="order-3 mt-2 max-w-[26ch] font-sans text-[0.8125rem] leading-relaxed text-ink/50">
        {metric.note}
      </dd>
    </div>
  );
}
