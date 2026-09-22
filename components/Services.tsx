import Reveal from "./Reveal";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section className="section bg-ink" aria-labelledby="services-heading">
      <div className="edge mx-auto max-w-edge">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal bare as="h2" id="services-heading" className="t-section text-ivory lg:col-span-6">
            <span className="line-mask">
              <span>What</span>
            </span>
            <span className="line-mask">
              <span style={{ transitionDelay: "110ms" }}>I do</span>
            </span>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={140}>
            <p className="t-lead text-ivory/60">
              Six areas of work. In practice they overlap — the strategy, the content and the
              measurement are the same job.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-ivory/15 lg:mt-20">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 60}
              className="group relative border-b border-ivory/15"
            >
              <div className="relative grid gap-4 py-8 lg:grid-cols-12 lg:items-baseline lg:gap-8 lg:py-10">
                <span className="label text-red lg:col-span-1">{s.index}</span>

                <h3 className="font-display text-[clamp(1.8rem,4.6vw,3.4rem)] uppercase leading-none tracking-tightest text-ivory transition-colors duration-500 ease-editorial group-hover:text-red lg:col-span-4">
                  {s.title}
                </h3>

                <p className="max-w-[34ch] font-sans text-[0.9375rem] leading-relaxed text-ivory/55 lg:col-span-4">
                  {s.line}
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1.5 lg:col-span-3 lg:justify-end">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="font-sans text-[0.75rem] uppercase tracking-wide2 text-ivory/35 transition-colors duration-500 group-hover:text-ivory/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Red rule wipes across the row on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-red transition-transform duration-700 ease-editorial group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
