# Sidharth Sanal — Portfolio

Premium editorial portfolio site. Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS.

## Run it

```bash
cd sidharth-sanal-portfolio
npm install
npm run dev
```

Then open http://localhost:3000

Production build:

```bash
npm run build
npm start
```

> Note: `npm install` and `npm run build` could **not** be run in the environment where this
> project was written (the npm registry was blocked there), so the install and compile steps have
> not been executed. Dependencies are pinned, minimal and standard; if anything does trip on first
> build, the error will almost certainly be a missing package rather than the code itself.

## Before you publish — 3 things to fill in

Everything below lives in one file: **`lib/content.ts`**.

**1. Contact details (the only placeholders on the site).**
The uploaded CV carried template contact details (`+91 XXXXXXXXXX`, `yourname@email.com`), so
nothing real could be used. In `contact`, set `display` and `href`:

```ts
email: { label: "Email", display: "you@domain.com", href: "mailto:you@domain.com" },
links: [
  { label: "LinkedIn",  display: "linkedin.com/in/…", href: "https://www.linkedin.com/in/…" },
  { label: "Instagram", display: "@handle",           href: "https://instagram.com/handle" },
  { label: "YouTube",   display: "@channel",          href: "https://youtube.com/@channel" },
]
```

Leave `href` as `""` and the row renders as inactive text with a small "to add" tag — never a
broken or invented link. Once the LinkedIn URL is live, also add it to `sameAs` in the Person
schema in `app/layout.tsx`.

**2. Certification credential URLs.**
The LinkedIn screenshots showed credential **IDs** but no credential **URLs**, so each card's
"View credential ↗" button is deliberately disabled. Paste the real URL into `url` on any entry in
`certifications` and that button activates itself.

**3. Your domain.**
Create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

This drives canonical URLs, Open Graph and the JSON-LD. Without it the site falls back to
`http://localhost:3000`.

## Optional: add a portrait

No photograph of you was supplied, so the hero is built to be complete without one — and no stock
photography was substituted. To add one:

1. Save the image as `public/images/portrait.jpg`
2. Un-comment the `PHOTO SLOT` block near the bottom of `components/Hero.tsx`, or the one in
   `components/About.tsx`

## Content honesty — what was deliberately left out

This site was built to a strict rule: nothing that the CV, the campaign photographs or the
certification screenshots do not support. Specifically:

- **Two uploaded images were excluded** and moved to `assets-not-used/` rather than deleted:
  - `NOT-USED-multi-brand-logo-collage.jpg` — a collage of ~20 corporate logos (IBM, HDFC, LG, HUL
    and others). Publishing it would imply client relationships that nothing in the uploads
    establishes. Reinstate it only if you can state your actual role for those brands.
  - `NOT-USED-store-portrait-unidentified-person.jpg` — a portrait of a person who could not be
    identified from the uploads, so consent and relevance are unknown.
- **The retail work is described by what is visible in frame** (displays, standees, windows,
  merchandising walls) and the brands are framed as *"retail brands whose in-store campaign
  environments appear in this work"* — not as a client list. **Your CV contains no retail role**,
  so no employer, dates or authorship claim is attached to those photographs. If you did hold that
  role, add it to `experience` in `lib/content.ts` and the framing can be strengthened.
- **Only four numbers appear in the metrics band**, all verifiable: 2M+ organic YouTube views (CV),
  5 certifications (screenshots), 4 roles (CV), 3 languages (CV).
- **No results were invented** for the HeroTech or Ants & Elephants case studies — each carries a
  short note saying so, and Ants & Elephants client names are withheld.
- **Three CV-listed certifications** (Google Digital Marketing, HubSpot Content Marketing, Meta
  Social Media Marketing) are shown in a visibly separate "Also on CV" cell, because no certificate
  record for them was among the uploads.
- **Education was omitted** entirely, at your request.

## Structure

```
app/
  layout.tsx        Fonts, SEO + Open Graph metadata, Person JSON-LD, nav/cursor/curtain
  page.tsx          Section order
  globals.css       Design system: type scale, buttons, reveals, reduced-motion overrides
  icon.svg          Favicon
components/         One file per section, plus Reveal / Marquee / Cursor / Curtain primitives
lib/content.ts      ALL copy, work items, case studies, experience, skills, certifications
public/images/      Your campaign photographs, brand marks and certification screenshots
assets-not-used/    The two excluded uploads (outside public/, so they never ship)
```

Section order: Hero → Metrics → Selected Work → Statement → What I Do → About → Skills + Tools →
Experience → Certifications → Contact → Footer.

## Design system

| | |
|---|---|
| Ink | `#0B0B0B` (soft `#141413`, line `#26251F`) |
| Ivory | `#F4F1EA` (soft `#E9E4D8`, line `#D6D0C0`) |
| Red | `#C8271F` — punctuation only: numbers, hovers, rules, labels, CTAs |
| Olive | `#6E6B4A` — secondary labels |
| Display | Anton (condensed editorial) |
| Sans | Inter |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |

Type is fluid via `clamp()` (`.t-mega`, `.t-display`, `.t-section`, `.t-stat`, `.t-lead`, `.label`),
so it scales on mobile instead of being shrunk.

## Motion & accessibility

- All motion is CSS + `IntersectionObserver`. No animation library, no runtime layout thrash.
- `prefers-reduced-motion: reduce` holds every animated element in its final state, including the
  page-load curtain.
- Custom cursor only mounts on fine pointers (desktop) and never for reduced-motion users.
- Case study dialogs: `role="dialog"`, `aria-modal`, Escape to close, Tab focus trap, scroll lock,
  focus returned to the element that opened them.
- Accordions and tabs use real `aria-expanded` / `aria-controls` / `role="tab"` semantics with
  arrow-key navigation.
- Semantic heading order, skip link, visible red focus ring, alt text on every image.

## Deploying

Vercel is the path of least resistance: push the repo, import it, set `NEXT_PUBLIC_SITE_URL`.
`next.config.mjs` sets `images.unoptimized = true`, so the project also exports statically and can
be hosted anywhere (Netlify, Cloudflare Pages, GitHub Pages) without a sharp dependency.
