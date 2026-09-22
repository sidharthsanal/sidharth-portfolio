"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/content";

/**
 * Hero. Type carries the whole screen — no photograph was supplied in the
 * source material, so the composition is built to be complete without one.
 * To add one later, drop the file in /public/images and un-comment the
 * PHOTO SLOT block near the bottom of this file.
 */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const stage = useRef<HTMLDivElement | null>(null);
  const drift = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  // Very small pointer parallax — 10px at the extremes, desktop only.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = stage.current;
    if (!fine || calm || !el) return;

    const onMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      if (drift.current) {
        drift.current.style.transform = `translate3d(${nx * -10}px, ${ny * -6}px, 0)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const on = mounted ? "is-in" : "";

  return (
    <section
      id="top"
      ref={stage}
      className="noise relative min-h-[100svh] overflow-hidden bg-ink pt-[4.75rem]"
    >
      {/* BACKGROUND ELEMENTS ON THE RIGHT (Glow + 01 outline) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="edge mx-auto grid h-full max-w-edge grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="border-l border-ivory/[0.06]" />
          ))}
        </div>

        {/* Giant Outlined 01 in Background */}
        <div
          className="absolute right-[2vw] lg:right-[5vw] top-[14vh] select-none font-display text-[clamp(14rem,28vw,32rem)] leading-none text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(200, 39, 31, 0.28)" }}
        >
          01
        </div>

        {/* Crimson Red Halo Glow behind Sidharth's head */}
        <div
          className="absolute right-[14vw] md:right-[20vw] lg:right-[22vw] top-[20vh] h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] lg:h-[480px] lg:w-[480px] rounded-full blur-[70px] lg:blur-[95px]"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 39, 31, 0.7) 0%, rgba(200, 39, 31, 0.28) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* SIDHARTH'S CUTOUT PORTRAIT (Rising from bottom, facing left) */}
      <div
        className="pointer-events-none absolute bottom-0 right-[2vw] sm:right-[6vw] md:right-[12vw] lg:right-[16vw] xl:right-[18vw] z-[4] w-[80vw] max-w-[360px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px]"
        aria-hidden="true"
      >
        <div className="relative aspect-[1337/1176] w-full">
          <Image
            src="/sidharth.png"
            alt="Sidharth Sanal"
            fill
            priority
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 640px"
            className="object-contain object-bottom filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
          />
          {/* Subtle bottom fade so cutout gently integrates into the floor */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink to-transparent" />
        </div>
      </div>

      <div className="edge relative z-10 mx-auto flex min-h-[calc(100svh-4.75rem)] max-w-edge flex-col justify-between gap-14 py-9 lg:py-12">
        <div className={`flex items-start justify-between gap-8 ${on}`}>
          <div className="line-mask">
            <span className="label block text-olive-light" style={{ transitionDelay: "150ms" }}>
              Digital Marketing &amp; Creative Growth
            </span>
          </div>
          <div className="hidden text-right lg:block">
            <span className="label block text-ivory/40">{site.location}</span>
            <span className="label mt-2 block text-ivory/40">
              {site.languages.join(" · ")}
            </span>
          </div>
        </div>

        <div ref={drift} className="will-change-transform max-w-3xl">
          <h1 className={`t-mega text-ivory ${on}`}>
            <span className="line-mask">
              <span style={{ transitionDelay: "220ms" }}>Sidharth</span>
            </span>
            <span className="line-mask">
              <span style={{ transitionDelay: "330ms" }} className="flex items-baseline">
                Sanal
                <span className="ml-[0.12em] inline-block h-[0.13em] w-[0.13em] shrink-0 rounded-full bg-red" />
              </span>
            </span>
          </h1>

          <div
            className={`reveal mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mt-9 ${on}`}
            style={{ transitionDelay: "560ms" }}
          >
            <span className="h-px w-8 bg-red" />
            <p className="font-display text-[clamp(0.85rem,2vw,1.45rem)] uppercase tracking-wide2 text-ivory">
              {site.triad.map((word, i) => (
                <span key={word}>
                  {i > 0 ? <span className="mx-2 text-red lg:mx-3">×</span> : null}
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div
          className={`reveal grid items-end gap-10 lg:grid-cols-12 ${on}`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="lg:col-span-5">
            <p className="t-lead max-w-[34ch] text-ivory/70">
              I build digital brands, create campaigns, grow audiences, and turn ideas into
              measurable digital experiences.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-4 text-ivory transition-colors hover:text-red"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 transition-all duration-300 group-hover:border-red group-hover:bg-red/10 group-hover:scale-105">
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
                <span className="label text-[0.7rem] tracking-widest">EXPLORE MY WORK</span>
              </a>
              <a href="#contact" className="btn btn-red">
                <span>Let&rsquo;s connect</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex items-end justify-between gap-6">
            <div className="hidden lg:flex flex-col items-center gap-2 text-right">
              <span className="label text-[0.625rem] tracking-widest text-ivory/45">IDEAS</span>
              <span className="h-3 w-px bg-red/60" />
              <span className="label text-[0.625rem] tracking-widest text-ivory/45">STRATEGY</span>
              <span className="h-3 w-px bg-red/60" />
              <span className="label text-[0.625rem] tracking-widest text-ivory/45">CREATIVE</span>
              <span className="h-3 w-px bg-red/60" />
              <span className="label text-[0.625rem] tracking-widest text-ivory/45">IMPACT</span>
            </div>

            <div className="border-t border-ivory/15 pt-5 text-right">
              <span className="block font-display text-[clamp(2.6rem,5.5vw,4.2rem)] leading-none text-red">
                2M+
              </span>
              <span className="label mt-2 block text-ivory/50">Organic YouTube views</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
