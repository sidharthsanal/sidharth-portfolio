import Image from "next/image";
import Reveal from "./Reveal";
import {
  additionalCertifications,
  certificationProof,
  certifications,
} from "@/lib/content";

export default function Certifications() {
  return (
    <section id="certifications" className="section bg-ink" aria-labelledby="cert-heading">
      <div className="edge mx-auto max-w-edge">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal bare as="h2" id="cert-heading" className="t-section text-ivory lg:col-span-7">
            <span className="line-mask">
              <span>Certified</span>
            </span>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={140}>
            <p className="t-lead max-w-[40ch] text-ivory/55">
              Five certifications from HubSpot Academy, Google Skillshop and Semrush — listed with
              their credential IDs.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {certifications.map((c, i) => {
            const live = c.url.trim().length > 0;
            return (
              <Reveal
                as="li"
                key={c.name}
                delay={i * 70}
                className="group relative flex flex-col justify-between gap-10 bg-ink p-7 transition-colors duration-500 hover:bg-ink-soft lg:p-9"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="label text-red">{String(i + 1).padStart(2, "0")}</span>
                    <span className="label text-ivory/40">{c.issuer}</span>
                  </div>

                  <h3 className="mt-7 font-display text-[clamp(1.35rem,2.6vw,2rem)] uppercase leading-[0.95] tracking-tightest text-ivory">
                    {c.name}
                  </h3>

                  <dl className="mt-6 space-y-2 font-sans text-[0.8125rem] text-ivory/45">
                    {c.issued ? (
                      <div className="flex gap-2">
                        <dt className="text-ivory/30">Issued</dt>
                        <dd>{c.issued}</dd>
                      </div>
                    ) : null}
                    {c.expires ? (
                      <div className="flex gap-2">
                        <dt className="text-ivory/30">Expires</dt>
                        <dd>{c.expires}</dd>
                      </div>
                    ) : null}
                    {c.credentialId ? (
                      <div className="flex gap-2">
                        <dt className="text-ivory/30">Credential ID</dt>
                        <dd className="break-all text-ivory/60">{c.credentialId}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>

                {live ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Open"
                    className="label inline-flex w-fit items-center gap-2 border border-ivory/25 px-4 py-3 text-ivory transition-colors duration-300 hover:border-red hover:bg-red"
                  >
                    View credential <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="label inline-flex w-fit items-center gap-2 border border-dashed border-ivory/15 px-4 py-3 text-ivory/25">
                    View credential <span aria-hidden="true">↗</span>
                    <span className="sr-only">— credential link not available yet</span>
                  </span>
                )}
              </Reveal>
            );
          })}

          {/* Sixth cell: the CV-only certifications, kept visibly separate. */}
          <Reveal
            as="li"
            delay={certifications.length * 70}
            className="flex flex-col justify-between gap-10 bg-ink p-7 lg:p-9"
          >
            <div>
              <span className="label text-olive-light">Also on CV</span>
              <ul className="mt-7 space-y-3">
                {additionalCertifications.map((name) => (
                  <li
                    key={name}
                    className="flex gap-3 font-sans text-[0.9375rem] leading-snug text-ivory/60"
                  >
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-olive-light" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-sans text-[0.75rem] leading-relaxed text-ivory/30">
              Listed separately because certificate records for these were not among the uploaded
              screenshots.
            </p>
          </Reveal>
        </ul>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <span className="label block text-ivory/40">Verification</span>
            <p className="mt-4 font-sans text-[0.875rem] leading-relaxed text-ivory/50">
              Straight from the LinkedIn licenses &amp; certifications panel. Credential links can be
              added once the issuer URLs are to hand.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
            {certificationProof.map((p, i) => (
              <Reveal key={p.src} delay={i * 90}>
                <figure className="relative aspect-[16/10] border border-ivory/[0.12] bg-ink-soft">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-contain p-3"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
