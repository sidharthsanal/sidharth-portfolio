"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import CaseStudyModal from "./CaseStudyModal";
import { caseStudies } from "@/lib/content";

export default function FeaturedWork() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroStudy = caseStudies["hero-protocol"];

  return (
    <section
      id="featured-work"
      className="relative border-t border-ivory/10 bg-ink pb-20 pt-12 lg:pb-32 lg:pt-16"
      aria-labelledby="featured-work-title"
    >
      <div className="edge mx-auto max-w-edge">
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-ivory/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal className="flex items-center gap-3">
              <span className="label text-red">Featured Project</span>
              <span className="label text-ivory/30">·</span>
              <span className="label text-ivory/50">Latest Work</span>
            </Reveal>

            <Reveal
              bare
              as="h2"
              id="featured-work-title"
              className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4.8rem)] uppercase leading-[0.88] tracking-tightest text-ivory"
            >
              <span className="line-mask">
                <span>Hero Protocol</span>
              </span>
              <span className="line-mask">
                <span style={{ transitionDelay: "120ms" }} className="text-red">
                  Digital Branding
                </span>
              </span>
            </Reveal>
          </div>

          <Reveal delay={140} className="max-w-[42ch]">
            <p className="font-sans text-[0.9375rem] leading-relaxed text-ivory/65">
              Complete digital marketing, social media branding strategy, and campaign execution for
              HeroTech&apos;s AI-powered ecosystem.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="border border-ivory/15 bg-ink-soft px-3 py-1 font-sans text-[0.6875rem] uppercase tracking-wide2 text-ivory/70">
                Social Media Strategy
              </span>
              <span className="border border-ivory/15 bg-ink-soft px-3 py-1 font-sans text-[0.6875rem] uppercase tracking-wide2 text-ivory/70">
                SEO &amp; Content
              </span>
              <span className="border border-ivory/15 bg-ink-soft px-3 py-1 font-sans text-[0.6875rem] uppercase tracking-wide2 text-ivory/70">
                AI Workflows
              </span>
            </div>
          </Reveal>
        </div>

        {/* Featured Showcase Image Frame */}
        <Reveal delay={180} className="mt-10 lg:mt-14">
          <div
            onClick={() => setModalOpen(true)}
            data-cursor="Explore"
            className="group relative cursor-pointer overflow-hidden border border-ivory/20 bg-ink-soft transition-all duration-500 hover:border-red/80 focus-within:ring-2 focus-within:ring-red"
          >
            {/* Header pill bar inside showcase frame */}
            <div className="flex items-center justify-between border-b border-ivory/10 bg-ink/70 px-4 py-3 backdrop-blur-md sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red animate-pulse" />
                <span className="label text-[0.625rem] text-ivory/70 sm:text-[0.6875rem]">
                  HeroTech Showcase · Visual Overview
                </span>
              </div>
              <span className="label text-[0.625rem] text-ivory/40 sm:text-[0.6875rem]">
                Click to open case study ↗
              </span>
            </div>

            {/* Showcase Image */}
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[1.9/1]">
              <Image
                src="/images/work-herotech-showcase.jpg"
                alt="HeroTech Hero Protocol digital marketing and social media portfolio showcase"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 94vw, 1400px"
                className="object-contain p-2 transition-transform duration-700 ease-editorial group-hover:scale-[1.015] sm:p-4 lg:p-6"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Bottom Interactive Trigger Banner */}
            <div className="flex items-center justify-between border-t border-ivory/10 bg-ink/80 px-5 py-4 backdrop-blur-md sm:px-8">
              <div>
                <span className="label text-olive-light">Case Study</span>
                <p className="mt-1 font-display text-[clamp(1.1rem,2.2vw,1.6rem)] uppercase tracking-tightest text-ivory group-hover:text-red transition-colors duration-300">
                  From Strategy to Execution — Brand &amp; Digital Growth
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className="btn btn-red shrink-0"
                aria-label="Open Hero Protocol Case Study"
              >
                <span>Read case study</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Case Study Modal */}
      {modalOpen ? (
        <CaseStudyModal study={heroStudy} onClose={() => setModalOpen(false)} />
      ) : null}
    </section>
  );
}
