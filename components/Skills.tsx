"use client";

import { useRef, useState } from "react";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import { skillGroups, tools } from "@/lib/content";

export default function Skills() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = skillGroups.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="section bg-ink" aria-labelledby="skills-heading">
      <div className="edge mx-auto max-w-edge">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal bare as="h2" id="skills-heading" className="t-section text-ivory lg:col-span-7">
            <span className="line-mask">
              <span>Skills</span>
            </span>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={140}>
            <p className="t-lead max-w-[38ch] text-ivory/55">
              Grouped by what they are actually for, rather than listed as one long wall.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Skill categories"
              onKeyDown={onKeyDown}
              className="scroll-x flex gap-2 overflow-x-auto border-b border-ivory/15 pb-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-t lg:border-ivory/15 lg:pb-0"
            >
              {skillGroups.map((g, i) => {
                const on = active === i;
                return (
                  <button
                    key={g.name}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`skill-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`skill-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    type="button"
                    onClick={() => setActive(i)}
                    className={[
                      "group flex shrink-0 items-baseline gap-3 whitespace-nowrap px-4 py-3 transition-colors duration-300 lg:w-full lg:whitespace-normal lg:border-b lg:border-ivory/15 lg:px-0 lg:py-5",
                      on ? "text-ivory" : "text-ivory/40 hover:text-ivory/75",
                    ].join(" ")}
                  >
                    <span className={`label ${on ? "text-red" : "text-ivory/25"}`}>
                      0{i + 1}
                    </span>
                    <span className="font-display text-[clamp(1.1rem,2.4vw,1.9rem)] uppercase leading-none tracking-tightest">
                      {g.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto hidden text-red transition-opacity duration-300 lg:block ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            {skillGroups.map((g, i) => (
              <div
                key={g.name}
                role="tabpanel"
                id={`skill-panel-${i}`}
                aria-labelledby={`skill-tab-${i}`}
                tabIndex={active === i ? 0 : -1}
                hidden={active !== i}
              >
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {g.skills.map((s, j) => (
                    <li
                      key={s}
                      style={{ transitionDelay: `${j * 45}ms` }}
                      className="reveal is-in flex items-baseline gap-4 border-b border-ivory/10 py-4"
                    >
                      <span className="font-sans text-[0.625rem] tracking-label text-red">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-[1rem] text-ivory/80">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[clamp(4rem,9vw,8rem)] border-y border-ivory/[0.12] py-7">
        <div className="edge mb-5">
          <span className="label text-olive-light">Tools</span>
        </div>
        <Marquee
          items={tools}
          separator={<span className="text-red">·</span>}
          itemClassName="font-display text-[clamp(1.3rem,3.4vw,2.6rem)] uppercase leading-none tracking-tightest text-ivory/45 transition-colors duration-300 hover:text-ivory"
        />
      </div>
    </section>
  );
}
