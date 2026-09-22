import Reveal from "./Reveal";
import { contact, site } from "@/lib/content";

/**
 * Any contact entry whose `href` is empty renders as inactive text with a small
 * "to add" tag — never as a broken or invented link.
 */
function ContactRow({ label, display, href }: { label: string; display: string; href: string }) {
  const live = href.trim().length > 0;
  const isMail = href.startsWith("mailto:");

  const body = (
    <>
      <span className="label w-24 shrink-0 pt-1 text-ivory/35 sm:w-32">{label}</span>
      <span className="min-w-0 break-all font-display text-[clamp(1.25rem,3.4vw,2.4rem)] uppercase leading-none tracking-tightest">
        {display}
      </span>
    </>
  );

  return (
    <li className="border-b border-ivory/[0.12]">
      {live ? (
        <a
          href={href}
          target={isMail ? undefined : "_blank"}
          rel={isMail ? undefined : "noopener noreferrer"}
          data-cursor="Open"
          className="group flex items-baseline gap-5 py-6 text-ivory transition-colors duration-500 hover:text-red"
        >
          {body}
          <span
            aria-hidden="true"
            className="ml-auto shrink-0 font-display text-xl leading-none text-red transition-transform duration-500 ease-editorial group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      ) : (
        <span className="flex items-baseline gap-5 py-6 text-ivory/45">
          {body}
          <span className="label ml-auto shrink-0 border border-dashed border-ivory/20 px-2 py-1 text-[0.5625rem] text-ivory/30">
            To add
          </span>
        </span>
      )}
    </li>
  );
}

export default function Contact() {
  const lines = ["Let's build", "something", "that gets noticed."];

  return (
    <section
      id="contact"
      className="section noise relative overflow-hidden bg-ink"
      aria-labelledby="contact-heading"
    >
      <div className="edge relative mx-auto max-w-edge">
        <Reveal className="label text-red">Contact</Reveal>

        <Reveal bare as="h2" id="contact-heading" className="t-display mt-8 text-ivory">
          {lines.map((line, i) => (
            <span key={line} className="line-mask">
              <span style={{ transitionDelay: `${i * 120}ms` }}>
                {line.replace(/\.$/, "")}
                {i === lines.length - 1 ? <span className="text-red">.</span> : null}
              </span>
            </span>
          ))}
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-14">
          <Reveal className="lg:col-span-4" delay={140}>
            <p className="t-lead max-w-[28ch] text-ivory/60">
              Have a project, brand or growth challenge in mind? Let&apos;s talk.
            </p>
            <p className="mt-8 font-sans text-[0.875rem] leading-relaxed text-ivory/35">
              {site.location} · Open to remote work with teams anywhere.
            </p>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-ivory/[0.12]">
              <ContactRow
                label={contact.email.label}
                display={contact.email.display}
                href={contact.email.href}
              />
              {contact.links.map((l) => (
                <ContactRow key={l.label} label={l.label} display={l.display} href={l.href} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
