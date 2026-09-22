"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/content";

export default function CaseStudyModal({
  study,
  onClose,
}: {
  study?: CaseStudy;
  onClose: () => void;
}) {
  if (!study) return null;
  return <Panel key={study.id} study={study} onClose={onClose} />;
}

function Panel({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const panel = useRef<HTMLDivElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const lightboxCloseBtn = useRef<HTMLButtonElement | null>(null);
  const [shown, setShown] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; title?: string } | null>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => setShown(true));
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImg) {
          e.stopPropagation();
          setLightboxImg(null);
          return;
        }
        onClose();
        return;
      }

      if (lightboxImg) return;

      // Keep Tab inside the dialog.
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'button:not([tabindex="-1"]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose, lightboxImg]);

  useEffect(() => {
    if (lightboxImg) {
      lightboxCloseBtn.current?.focus();
    }
  }, [lightboxImg]);

  return (
    <div className="fixed inset-0 z-[95]" role="dialog" aria-modal="true" aria-labelledby="cs-title">
      {/* Click-away layer. Hidden from assistive tech — Escape and the real
          Close button cover keyboard and screen-reader users. */}
      <button
        type="button"
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-ink/80 backdrop-blur-sm transition-opacity duration-500 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={-1}
      />

      <div
        ref={panel}
        className={`absolute inset-x-0 bottom-0 top-0 overflow-y-auto border-t border-ivory/15 bg-ink transition-all duration-700 ease-editorial sm:top-[4vh] ${
          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="edge mx-auto max-w-edge py-10 lg:py-16">
          <div className="flex items-start justify-between gap-6 border-b border-ivory/15 pb-6">
            <div>
              <span className="label text-red">{study.category}</span>
              <h2
                id="cs-title"
                className="mt-4 font-display text-[clamp(2rem,6vw,5rem)] uppercase leading-[0.86] tracking-tightest text-ivory"
              >
                {study.title}
              </h2>
            </div>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="label shrink-0 border border-ivory/25 px-4 py-3 text-ivory transition-colors duration-300 hover:border-red hover:bg-red"
            >
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>

          <dl className="grid gap-6 border-b border-ivory/10 py-6 sm:grid-cols-3">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt className="label text-ivory/40">{m.label}</dt>
                <dd className="mt-2 font-sans text-[0.9375rem] leading-snug text-ivory/85">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Featured Showcase Overview Image (HeroTech & other flagship studies) */}
          {study.showcase ? (
            <div className="border-b border-ivory/10 py-10 lg:py-14">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="label text-olive-light">Featured Overview</span>
                  <h3 className="mt-2 font-display text-[clamp(1.4rem,3.2vw,2.4rem)] uppercase tracking-wide2 text-ivory">
                    {study.showcase.heading}
                  </h3>
                </div>
                {study.showcase.subheading ? (
                  <p className="max-w-[46ch] font-sans text-[0.875rem] leading-relaxed text-ivory/60">
                    {study.showcase.subheading}
                  </p>
                ) : null}
              </div>

              <div className="group relative mt-7 overflow-hidden border border-ivory/15 bg-ink-soft sm:mt-9">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxImg({
                      src: study.showcase!.src,
                      alt: study.showcase!.alt,
                      title: study.showcase!.heading,
                    })
                  }
                  aria-label="Open fullscreen showcase view"
                  data-cursor="Enlarge"
                  className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[1.52/1]">
                    <Image
                      src={study.showcase.src}
                      alt={study.showcase.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 92vw"
                      className="object-contain p-2 transition-transform duration-700 ease-editorial group-hover:scale-[1.01] sm:p-4"
                    />
                  </div>

                  {/* Hover Tag Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 border border-ivory/20 bg-ink/90 px-3.5 py-2 backdrop-blur-md transition-all duration-300 group-hover:border-red group-hover:bg-ink sm:bottom-5 sm:right-5">
                    <span className="label text-[0.625rem] text-ivory">Click to enlarge</span>
                    <span aria-hidden="true" className="text-red">↗</span>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          <div className="mt-10 grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <div className="space-y-10 lg:col-span-7">
              {study.sections.map((s, i) => (
                <section key={s.heading}>
                  <h3 className="flex items-baseline gap-3 font-display text-[clamp(1.1rem,2vw,1.6rem)] uppercase tracking-wide2 text-ivory">
                    <span className="font-sans text-[0.625rem] tracking-label text-red">
                      0{i + 1}
                    </span>
                    {s.heading}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 font-sans text-[0.9375rem] leading-relaxed text-ivory/65"
                      >
                        <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-red" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              {study.result ? (
                <div className="border border-ivory/15 p-7">
                  <span className="block font-display text-[clamp(3.4rem,9vw,6rem)] leading-none text-red">
                    {study.result.value}
                  </span>
                  <span className="label mt-3 block text-ivory/55">{study.result.label}</span>
                </div>
              ) : null}

              {study.tools?.length ? (
                <div className="mt-8">
                  <span className="label block text-ivory/40">Tools</span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.tools.map((t) => (
                      <span
                        key={t}
                        className="border border-ivory/[0.12] px-3 py-2 font-sans text-[0.75rem] text-ivory/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {study.note ? (
                <p className="mt-8 border-l border-red pl-4 font-sans text-[0.8125rem] leading-relaxed text-ivory/40">
                  {study.note}
                </p>
              ) : null}
            </aside>
          </div>

          {study.gallery?.length ? (
            <div className="mt-14">
              <span className="label block border-t border-ivory/15 pt-6 text-ivory/40">
                Documentation
              </span>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {study.gallery.map((img) => (
                  <figure
                    key={img.src}
                    onClick={() =>
                      setLightboxImg({
                        src: img.src,
                        alt: img.alt,
                        title: study.title,
                      })
                    }
                    data-cursor="Enlarge"
                    className="group relative aspect-[4/5] cursor-pointer border border-ivory/10 bg-ink-soft transition-colors duration-300 hover:border-red"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 45vw, 22vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Premium Fullscreen Lightbox View */}
      {lightboxImg ? (
        <div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-between bg-ink/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImg.title ?? "Fullscreen image view"}
          onClick={() => setLightboxImg(null)}
        >
          {/* Top Bar */}
          <div
            className="flex w-full max-w-7xl items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="label text-ivory/70">{lightboxImg.title ?? study.title}</span>
            <button
              ref={lightboxCloseBtn}
              type="button"
              onClick={() => setLightboxImg(null)}
              aria-label="Close fullscreen view"
              className="label flex items-center gap-2 border border-ivory/30 bg-ink/80 px-4 py-2.5 text-ivory transition-colors duration-300 hover:border-red hover:bg-red"
            >
              <span>Close</span>
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          {/* Center Showcase Image */}
          <div
            className="relative my-auto flex max-h-[82vh] max-w-full items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-h-[80vh] max-w-[94vw] border border-ivory/15 object-contain shadow-2xl"
            />
          </div>

          {/* Bottom Bar */}
          <div
            className="flex w-full max-w-7xl items-center justify-between gap-4 text-ivory/40"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="max-w-[70%] truncate font-sans text-[0.75rem] text-ivory/50">
              {lightboxImg.alt}
            </span>
            <span className="label shrink-0 text-[0.625rem] text-ivory/40">
              Esc or click outside to close
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
