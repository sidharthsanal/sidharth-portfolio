"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import CaseStudyModal from "./CaseStudyModal";
import { caseStudies, retailDocumentation, work, workCategories, type WorkItem } from "@/lib/content";

export default function Work() {
  const [filter, setFilter] = useState<(typeof workCategories)[number]>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);

  const shown = filter === "ALL" ? work : work.filter((w) => w.category === filter);

  return (
    <section id="work" className="section bg-ink" aria-labelledby="work-heading">
      <div className="edge mx-auto max-w-edge">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal bare as="h2" id="work-heading" className="t-section text-ivory lg:col-span-7">
            <span className="line-mask">
              <span>Selected</span>
            </span>
            <span className="line-mask">
              <span style={{ transitionDelay: "110ms" }} className="text-red">
                Work
              </span>
            </span>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={160}>
            <p className="t-lead max-w-[38ch] text-ivory/60">
              A selection of marketing, branding, creative and growth work.
            </p>
          </Reveal>
        </div>

        <Reveal
          className="scroll-x mt-12 flex gap-2 overflow-x-auto pb-1 lg:mt-16"
          delay={80}
        >
          {workCategories.map((c) => {
            const on = filter === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={on}
                className={[
                  "label shrink-0 border px-4 py-2.5 transition-colors duration-300",
                  on
                    ? "border-red bg-red text-ivory"
                    : "border-ivory/15 text-ivory/50 hover:border-ivory/40 hover:text-ivory",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-y-24">
          {shown.map((item, i) => (
            <Tile
              key={item.id}
              item={item}
              delay={(i % 3) * 90}
              onOpen={item.caseStudy ? () => setOpenId(item.caseStudy!) : undefined}
            />
          ))}
        </div>

        <RetailStrip onOpen={() => setOpenId("retail")} />
      </div>

      <CaseStudyModal
        study={openId ? caseStudies[openId] : undefined}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}

function Tile({
  item,
  delay,
  onOpen,
}: {
  item: WorkItem;
  delay: number;
  onOpen?: () => void;
}) {
  return (
    <article className={`group relative ${item.col} ${item.drift ?? ""}`}>
      <Reveal
        bare
        delay={delay}
        className={`img-reveal relative w-full overflow-hidden border border-ivory/10 bg-ink-soft ${item.aspect}`}
      >
        {item.kind === "image" && item.src ? (
          item.fit === "cover" ? (
            <Image
              src={item.src}
              alt={item.alt ?? item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="img-zoom object-cover transition-opacity duration-700 group-hover:opacity-90"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center p-[7%]">
              <Image
                src={item.src}
                alt={item.alt ?? item.title}
                width={item.natural ?? 400}
                height={Math.round((item.natural ?? 400) * 0.6)}
                sizes="(max-width: 768px) 90vw, 45vw"
                style={{ maxWidth: `${Math.round((item.natural ?? 400) * 1.45)}px` }}
                className="img-zoom h-auto max-h-full w-auto object-contain"
              />
            </span>
          )
        ) : (
          <TypePanel item={item} />
        )}

        {onOpen ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/85 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-100 group-focus-within:opacity-100">
            <span className="label text-ivory">View project</span>
            <span aria-hidden="true" className="font-display text-2xl leading-none text-red">
              ↗
            </span>
          </span>
        ) : null}
      </Reveal>

      <Reveal delay={delay + 80} className="mt-5">
        <div className="flex items-baseline gap-3 border-t border-ivory/15 pt-4">
          <span className="label shrink-0 text-red">{item.index}</span>
          <span className="label text-ivory/45">{item.category}</span>
        </div>
        <h3 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,2.1rem)] uppercase leading-none tracking-tightest text-ivory transition-colors duration-300 group-hover:text-red">
          {item.title}
        </h3>
        <p className="mt-3 max-w-[46ch] font-sans text-[0.875rem] leading-relaxed text-ivory/50">
          {item.blurb}
        </p>
      </Reveal>

      {/* Card-wide hit area. Keeps the markup valid (no headings inside a button)
          while making the entire tile clickable and keyboard-focusable. */}
      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          data-cursor="Open"
          aria-label={`Open case study: ${item.title}`}
          className="absolute inset-0 z-10"
        />
      ) : null}
    </article>
  );
}

/** Typographic panel for the work that has no photograph attached to it. */
function TypePanel({ item }: { item: WorkItem }) {
  return (
    <span className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
      <span className="label text-olive-light">{item.category}</span>
      {item.stat ? (
        <span className="block">
          <span className="block font-display text-[clamp(3rem,7vw,5.5rem)] leading-none text-red">
            {item.stat}
          </span>
          <span className="label mt-2 block text-ivory/50">{item.statLabel}</span>
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="block font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.85] tracking-tightest text-ivory/15"
        >
          {item.title}
        </span>
      )}
      <span className="label flex items-center gap-2 text-ivory/40">
        Case study <span aria-hidden="true">→</span>
      </span>
    </span>
  );
}

/**
 * Horizontal contact sheet of the retail set. Images are contained rather than
 * cropped — several are small banner captures and cropping them would destroy
 * the composition they were photographed for.
 */
function RetailStrip({ onOpen }: { onOpen: () => void }) {
  const gallery = caseStudies.retail.gallery ?? [];

  return (
    <div className="mt-24 lg:mt-36">
      <Reveal className="flex flex-wrap items-end justify-between gap-6 border-t border-ivory/15 pt-6">
        <div>
          <span className="label text-red">Contact sheet</span>
          <h3 className="mt-3 font-display text-[clamp(1.5rem,3.2vw,2.6rem)] uppercase leading-none tracking-tightest text-ivory">
            In-store documentation
          </h3>
        </div>
        <button type="button" onClick={onOpen} className="btn btn-onInk" data-cursor="Open">
          <span>View full set</span>
          <span aria-hidden="true">↗</span>
        </button>
      </Reveal>

      <Reveal
        delay={120}
        className="scroll-x mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
      >
        {gallery.map((img) => (
          <figure
            key={img.src}
            className="relative h-[52vw] max-h-[22rem] min-h-[13rem] w-[74vw] shrink-0 snap-start border border-ivory/10 bg-ink-soft sm:w-[38vw] lg:w-[23vw]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 74vw, 30vw"
              className="object-contain p-5"
            />
          </figure>
        ))}
      </Reveal>

      <Reveal delay={160} className="mt-10 max-w-[70ch] border-l border-red pl-5">
        <p className="font-sans text-[0.8125rem] leading-relaxed text-ivory/45">
          {retailDocumentation.note}
        </p>
      </Reveal>
    </div>
  );
}

