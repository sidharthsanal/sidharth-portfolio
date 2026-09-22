import Marquee from "./Marquee";
import Reveal from "./Reveal";
import { statement } from "@/lib/content";

export default function Statement() {
  return (
    <section className="relative overflow-hidden bg-ivory py-[clamp(5rem,12vw,11rem)] text-ink">
      <div className="edge mx-auto max-w-edge">
        <Reveal className="label text-olive">Approach</Reveal>

        {/* `is-in` must land on the same element that holds the .line-mask children. */}
        <Reveal bare as="h2" className="t-display mt-8 text-ink lg:mt-12">
          {statement.map((line, i) => (
            <span key={line} className="line-mask">
              <span style={{ transitionDelay: `${i * 130}ms` }}>
                {line.replace(/\.$/, "")}
                <span className="text-red">.</span>
              </span>
            </span>
          ))}
        </Reveal>
      </div>

      <div className="mt-[clamp(3rem,7vw,6rem)] border-y border-ink/[0.12] py-6">
        <Marquee
          items={statement.map((s) => s.replace(/\.$/, "").toUpperCase())}
          reverse
          separator={<span className="text-red">/</span>}
          itemClassName="font-display text-[clamp(2rem,6vw,4.5rem)] uppercase leading-none tracking-tightest"
        />
      </div>
    </section>
  );
}
