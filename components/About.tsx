import Image from "next/image";
import Reveal from "./Reveal";
import { about, site } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="section bg-ivory text-ink" aria-labelledby="about-heading">
      <div className="edge mx-auto max-w-edge">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-6">
            <Reveal className="label text-olive">About</Reveal>

            <Reveal bare as="h2" id="about-heading" className="t-display mt-8 text-ink">
              {about.heading.map((word, i) => (
                <span key={word} className="line-mask">
                  <span style={{ transitionDelay: `${i * 120}ms` }}>
                    {word.replace(/\.$/, "")}
                    <span className="text-red">.</span>
                  </span>
                </span>
              ))}
            </Reveal>

            <Reveal className="mt-10" delay={160}>
              <p className="t-lead max-w-[34ch] text-ink/75">{about.lead}</p>
            </Reveal>

            <Reveal className="mt-12" delay={220}>
              <div className="group relative max-w-md overflow-hidden rounded-2xl border border-ink/15 bg-gradient-to-b from-[#eee9df] via-[#e6dfd1] to-[#d8cebe] p-4 sm:p-5 shadow-lg transition-all duration-500 hover:shadow-xl hover:border-ink/25">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-xl bg-gradient-to-tr from-ink/5 to-transparent">
                  <Image
                    src="/sidharth.png"
                    alt="Sidharth Sanal — Digital Marketing & Creative Growth Strategist"
                    fill
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="object-contain object-bottom filter contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#d8cebe]/70 to-transparent" />
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/10 pt-3">
                  <div>
                    <h3 className="font-display text-lg tracking-tightest uppercase text-ink">
                      Sidharth Sanal
                    </h3>
                    <p className="font-sans text-[0.75rem] text-ink/65">
                      Creative Strategist &amp; Digital Growth
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ivory/90 px-3 py-1 font-sans text-[0.625rem] font-medium uppercase tracking-wider text-ink/80 shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="space-y-6 border-t border-ink/20 pt-8">
              {about.paragraphs.map((p, i) => (
                <Reveal key={p} delay={i * 90}>
                  <p className="font-sans text-[1rem] leading-relaxed text-ink/65">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12" delay={220}>
              <span className="label block text-ink/40">Working across</span>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {about.pillars.map((p) => (
                  <li
                    key={p}
                    className="font-display text-[clamp(1.1rem,2.6vw,1.75rem)] uppercase leading-none tracking-tightest text-ink/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12 grid gap-6 border-t border-ink/20 pt-8 sm:grid-cols-2" delay={280}>
              <div>
                <span className="label block text-ink/40">Based in</span>
                <p className="mt-3 font-sans text-[0.9375rem] text-ink/70">{site.location}</p>
              </div>
              <div>
                <span className="label block text-ink/40">Languages</span>
                <p className="mt-3 font-sans text-[0.9375rem] text-ink/70">
                  {site.languages.join(" · ")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
