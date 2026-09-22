import { contact, nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const liveLinks = contact.links.filter((l) => l.href.trim().length > 0);

  return (
    <footer className="border-t border-ivory/[0.12] bg-ink py-10">
      <div className="edge mx-auto flex max-w-edge flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <a
            href="#top"
            className="font-display text-[clamp(1.6rem,4vw,2.4rem)] uppercase leading-none tracking-tightest text-ivory transition-colors duration-500 hover:text-red"
          >
            Sidharth Sanal<span className="text-red">.</span>
          </a>
          <p className="mt-3 font-sans text-[0.8125rem] text-ivory/35">{site.role}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label text-ivory/40 transition-colors duration-300 hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 lg:items-end">
          {liveLinks.length ? (
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {liveLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-ivory/40 transition-colors duration-300 hover:text-red"
                >
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          ) : null}
          <p className="font-sans text-[0.75rem] text-ivory/25">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
