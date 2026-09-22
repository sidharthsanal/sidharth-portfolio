"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { experience } from "@/lib/content";

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="section bg-ivory text-ink" aria-labelledby="exp-heading">
      <div className="edge mx-auto max-w-edge">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal bare as="h2" id="exp-heading" className="t-section text-ink lg:col-span-7">
            <span className="line-mask">
              <span>Experience</span>
            </span>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={140}>
            <p className="t-lead max-w-[40ch] text-ink/55">
              In-house marketing, agency project management, events and a self-managed channel.
              Select a role to open it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-ink/20 lg:mt-20">
          {experience.map((role, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={role.company} delay={i * 70} className="border-b border-ink/20">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`role-${i}`}
                    className="group flex w-full items-start gap-5 py-7 text-left lg:items-baseline lg:gap-8 lg:py-9"
                  >
                    <span className="label mt-1.5 text-red lg:mt-0 lg:w-40 lg:shrink-0">
                      {role.period}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[clamp(1.6rem,4vw,3rem)] uppercase leading-none tracking-tightest text-ink transition-colors duration-500 group-hover:text-red">
                        {role.company}
                      </span>
                      <span className="mt-2 block font-sans text-[0.875rem] text-ink/55">
                        {role.title}
                        {role.mode ? (
                          <span className="text-ink/35"> · {role.mode}</span>
                        ) : null}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="relative mt-2 block h-4 w-4 shrink-0 lg:mt-0"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink transition-colors duration-300 group-hover:bg-red" />
                      <span
                        className={[
                          "absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink transition-all duration-500 ease-editorial group-hover:bg-red",
                          isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100",
                        ].join(" ")}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={`role-${i}`}
                  hidden={!isOpen}
                  className="grid gap-8 pb-10 lg:grid-cols-12 lg:gap-12"
                >
                  <ul className="space-y-3 lg:col-span-7 lg:col-start-3">
                    {role.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 font-sans text-[0.9375rem] leading-relaxed text-ink/70"
                      >
                        <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-red" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="lg:col-span-3">
                    <span className="label block text-ink/40">Tools</span>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.tools.map((t) => (
                        <span
                          key={t}
                          className="border border-ink/15 px-3 py-1.5 font-sans text-[0.75rem] text-ink/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
