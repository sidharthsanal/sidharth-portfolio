"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

const SECTION_IDS = nav.map((n) => n.href.replace("#", ""));

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the middle of the viewport.
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock the page behind the mobile menu and allow Escape to close it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Widening past the lg breakpoint hides the panel and its close button, so
    // close it there too rather than leaving the page scroll-locked.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  // Drive the entrance animation: wait one frame after the panel becomes
  // visible before flipping the item classes, so CSS transitions actually play.
  useEffect(() => {
    if (!open) {
      setMenuShown(false);
      return;
    }
    const raf = requestAnimationFrame(() => setMenuShown(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[80] transition-all duration-500 ease-editorial",
        scrolled || open
          ? "border-b border-ivory/10 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="edge flex h-[4.75rem] items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex items-baseline gap-2.5 font-display text-xl uppercase leading-none tracking-wide2 text-ivory"
          onClick={() => setOpen(false)}
        >
          <span className="text-red">SS</span>
          <span className="hidden text-ivory/70 transition-colors duration-300 group-hover:text-ivory sm:inline">
            Sidharth Sanal
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "label link-underline transition-colors duration-300",
                  isActive ? "text-red" : "text-ivory/65 hover:text-ivory",
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
          <a href="#contact" className="btn btn-red">
            <span>Let&rsquo;s talk</span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
        >
          <span
            className={[
              "block h-px w-7 bg-ivory transition-transform duration-500 ease-editorial",
              open ? "translate-y-[4px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-px w-7 bg-ivory transition-transform duration-500 ease-editorial",
              open ? "-translate-y-[4px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="edge h-[calc(100dvh-4.75rem)] overflow-y-auto bg-ink pb-16 pt-8 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${120 + i * 60}ms` }}
              className={[
                "border-b border-ivory/10 py-5 font-display text-[2.4rem] uppercase leading-none tracking-tightest text-ivory transition-all duration-500 ease-editorial",
                menuShown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              ].join(" ")}
            >
              <span className="mr-4 align-super font-sans text-[0.625rem] tracking-label text-red">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="btn btn-red mt-10 w-full justify-between"
        >
          <span>Let&rsquo;s talk</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
