/**
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ------------------------------------------------------------------
 * Everything on this site traces back to one of two places:
 *   1. Sidharth Sanal's CV (experience, skills, tools, summary, 2M+ views)
 *   2. The uploaded campaign photographs and LinkedIn certification screenshots
 *
 * Nothing here is invented. No client names, budgets, conversion rates,
 * follower counts, awards or years-of-experience claims have been added.
 * Where a fact was not available it is left blank rather than filled in.
 *
 * The only items that REQUIRE your input are in `contact` below.
 */

/* ------------------------------------------------------------------ */
/* SITE META                                                           */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Sidharth Sanal",
  role: "Digital Marketing & Creative Growth Strategist",
  triad: ["DIGITAL MARKETING", "CREATIVE STRATEGY", "AI"] as const,
  title: "Sidharth Sanal | Digital Marketing & Creative Growth Strategist",
  description:
    "Sidharth Sanal is a digital marketing and creative growth professional specializing in SEO, social media, branding, content strategy, AI marketing and audience growth.",
  // Set NEXT_PUBLIC_SITE_URL in .env.local once you know your domain.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://sidharthsanal.vercel.app"),
  location: "Dubai",
  languages: ["English", "Hindi"],
};

/* ------------------------------------------------------------------ */
/* CONTACT — ⚠️ THE ONLY PLACEHOLDERS ON THE SITE                      */
/* ------------------------------------------------------------------ */
/**
 * The uploaded CV carried template contact details
 * ("+91 XXXXXXXXXX / yourname@email.com"), so no real values could be used.
 *
 * Fill in `href` to make a link live. Leave `href` as an empty string and the
 * site renders it as inactive text instead of a broken link — nothing fake ships.
 */
export type ContactLink = {
  label: string;
  display: string;
  href: string;
};

export const contact: {
  email: ContactLink;
  links: ContactLink[];
} = {
  email: {
    label: "Email",
    display: "[ADD YOUR EMAIL]",
    href: "", // e.g. "mailto:sidharth@example.com"
  },
  links: [
    {
      label: "LinkedIn",
      // From the CV. Confirm it is correct, then add the href to activate it.
      display: "linkedin.com/in/sidharthsanal",
      href: "", // e.g. "https://www.linkedin.com/in/sidharthsanal"
    },
    {
      label: "Instagram",
      display: "[ADD YOUR HANDLE]",
      href: "",
    },
    {
      label: "YouTube",
      display: "[ADD YOUR CHANNEL]",
      href: "",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* METRICS — only counts that are verifiable from the uploads          */
/* ------------------------------------------------------------------ */

export type Metric = {
  value: number;
  suffix: string;
  pad?: boolean;
  label: string;
  note: string;
};

export const metrics: Metric[] = [
  {
    value: 2,
    suffix: "M+",
    label: "Organic YouTube views",
    note: "Cumulative, built through YouTube SEO and content strategy",
  },
  {
    value: 5,
    suffix: "",
    pad: true,
    label: "Certifications",
    note: "HubSpot Academy · Semrush · Google Skillshop",
  },
  {
    value: 4,
    suffix: "",
    pad: true,
    label: "Roles held",
    note: "In-house marketing · agency · events · creator",
  },
  {
    value: 2,
    suffix: "",
    pad: true,
    label: "Languages",
    note: "English · Hindi",
  },
];

/* ------------------------------------------------------------------ */
/* SELECTED WORK                                                       */
/* ------------------------------------------------------------------ */
/**
 * Image items are the uploaded campaign photographs. They are described by what
 * is visibly in the frame — no client relationships, results or authorship
 * claims beyond that. `fit: "contain"` is used for the small banner crops so
 * they stay sharp instead of being upscaled into mush.
 */

export type WorkCategory =
  | "RETAIL CAMPAIGNS"
  | "BRAND & VISUAL"
  | "DIGITAL GROWTH"
  | "BRAND STRATEGY";

export type WorkItem = {
  id: string;
  index: string;
  title: string;
  category: WorkCategory;
  blurb: string;
  /** "type" tiles carry no photograph — they are typographic panels. */
  kind: "image" | "type";
  src?: string;
  alt?: string;
  fit?: "cover" | "contain";
  /** Native pixel width, used to cap upscaling on contained images. */
  natural?: number;
  col: string;
  aspect: string;
  drift?: string;
  caseStudy?: string;
  stat?: string;
  statLabel?: string;
};

export const work: WorkItem[] = [
  {
    id: "ramadan",
    index: "01",
    title: "Ramadan Mubarak",
    category: "BRAND & VISUAL",
    blurb:
      "Festive in-store environment: an illuminated arch, a patterned backdrop, brass lanterns and one styled mannequin.",
    kind: "image",
    src: "/images/work-ramadan-tall.jpg",
    alt: "Ramadan Mubarak in-store campaign display: an illuminated arch with a patterned backdrop, a styled mannequin and brass lanterns.",
    fit: "cover",
    natural: 532,
    col: "lg:col-span-5",
    aspect: "aspect-[4/5]",
    caseStudy: "retail",
  },
  {
    id: "rb-lulu",
    index: "02",
    title: "Seasonal Fashion Standees",
    category: "RETAIL CAMPAIGNS",
    blurb:
      "Seasonal standees across women's, men's and boys' fashion, each pairing a styled look with an entry price. This is the upload captioned “Works @ R&B · Lulu Mall Kochi”.",
    kind: "image",
    src: "/images/work-rb-lulu-collage.jpg",
    alt: "A set of seasonal fashion campaign standees photographed in-store at R&B, Lulu Mall Kochi, each showing a styled look with a starting price.",
    fit: "cover",
    natural: 480,
    col: "lg:col-span-4",
    aspect: "aspect-[4/5]",
    drift: "lg:translate-y-14",
    caseStudy: "retail",
  },
  {
    id: "youtube",
    index: "03",
    title: "AI YouTube Growth",
    category: "DIGITAL GROWTH",
    blurb:
      "A self-managed AI-powered channel built from concept to audience, grown organically through YouTube SEO and analytics.",
    kind: "type",
    col: "lg:col-span-3",
    aspect: "aspect-[4/5]",
    caseStudy: "youtube",
    stat: "2M+",
    statLabel: "Organic views",
  },
  {
    id: "fashion-polo",
    index: "04",
    title: "Fashion Polo",
    category: "RETAIL CAMPAIGNS",
    blurb:
      "Retail banner: one hero garment, a fabric claim and an oversized price.",
    kind: "image",
    src: "/images/work-fashion-polo.jpg",
    alt: "Fashion Polo retail campaign banner showing a model in a black polo shirt beside a large 499 rupee price.",
    fit: "contain",
    natural: 356,
    col: "lg:col-span-7",
    aspect: "aspect-[16/7]",
    caseStudy: "retail",
  },
  {
    id: "graphic-tees",
    index: "05",
    title: "Graphic Tees",
    category: "RETAIL CAMPAIGNS",
    blurb:
      "Retail banner carrying a single-unit price alongside a three-for offer.",
    kind: "image",
    src: "/images/work-graphic-tees.jpg",
    alt: "Graphic Tees retail campaign banner showing a child model, a 249 rupee price and a three-for-599 multi-buy offer.",
    fit: "contain",
    natural: 267,
    col: "lg:col-span-5",
    aspect: "aspect-[16/7]",
    drift: "lg:translate-y-10",
    caseStudy: "retail",
  },
  {
    id: "mickey",
    index: "06",
    title: "Mickey & Friends Display",
    category: "BRAND & VISUAL",
    blurb:
      "A licensed Disney character display on the kidswear floor — three primary-colour panels. The artwork is Disney's.",
    kind: "image",
    src: "/images/work-mickey-friends.jpg",
    alt: "Disney Mickey and Friends in-store display: a tall three-panel board showing Mickey, Donald and Goofy on yellow, red and blue backgrounds.",
    fit: "contain",
    natural: 192,
    col: "lg:col-span-3",
    aspect: "aspect-[3/4]",
    caseStudy: "retail",
  },
  {
    id: "new-trends",
    index: "07",
    title: "New Trends Start Here",
    category: "BRAND & VISUAL",
    blurb:
      "An illuminated feature wall reading “New Trends Start Here”, used as in-store wayfinding.",
    kind: "image",
    src: "/images/work-new-trends.jpg",
    alt: "An illuminated in-store feature wall reading New Trends Start Here in blue neon-style lettering, framed by a triangular light panel and shelved plants.",
    fit: "cover",
    natural: 352,
    col: "lg:col-span-5",
    aspect: "aspect-[3/4]",
    caseStudy: "retail",
  },
  {
    id: "warm-tones",
    index: "08",
    title: "Warm Tones",
    category: "BRAND & VISUAL",
    blurb:
      "Seasonal styling panel: a desert-toned backdrop behind one styled outfit and accessory.",
    kind: "image",
    src: "/images/work-warm-tones.jpg",
    alt: "In-store campaign panel reading Warm Tones For The Perfect Vaccay Mode, with a styled mannequin against a desert-toned arch backdrop.",
    fit: "cover",
    natural: 242,
    col: "lg:col-span-4",
    aspect: "aspect-[2/3]",
    drift: "lg:translate-y-16",
    caseStudy: "retail",
  },
  {
    id: "hero-protocol",
    index: "09",
    title: "Hero Protocol Digital Branding",
    category: "BRAND STRATEGY",
    blurb:
      "Complete social media branding strategy, content calendar and digital campaigns for HeroTech's AI-powered platform.",
    kind: "image",
    src: "/images/work-herotech-showcase.jpg",
    alt: "HeroTech Hero Protocol digital marketing and social media portfolio showcase",
    fit: "cover",
    col: "lg:col-span-5",
    aspect: "aspect-[16/10]",
    caseStudy: "hero-protocol",
  },
  {
    id: "onam",
    index: "10",
    title: "Onam Window",
    category: "BRAND & VISUAL",
    blurb:
      "Regional festive window: three mannequins colour-blocked in magenta, rust and green against a printed pennant.",
    kind: "image",
    src: "/images/work-onam-display.jpg",
    alt: "Onam festive shop window display with three mannequins in magenta, rust and green shirts in front of a colourful printed pennant.",
    fit: "cover",
    natural: 340,
    col: "lg:col-span-4",
    aspect: "aspect-[4/3]",
    caseStudy: "retail",
  },
  {
    id: "vanheusen",
    index: "11",
    title: "Van Heusen Store Detail",
    category: "BRAND & VISUAL",
    blurb:
      "The brand's own sculpted emblem above its wordmark, photographed in store. The mark belongs to Van Heusen.",
    kind: "image",
    src: "/images/work-vanheusen-unicorn.jpg",
    alt: "A gold sculpted unicorn emblem mounted on a pale wall above the Van Heusen wordmark.",
    fit: "contain",
    natural: 251,
    col: "lg:col-span-3",
    aspect: "aspect-[1/1]",
    caseStudy: "retail",
  },
  {
    id: "instore-visuals",
    index: "12",
    title: "Merchandising Wall",
    category: "RETAIL CAMPAIGNS",
    blurb:
      "Framed lifestyle imagery mounted directly above folded stock on the shop floor.",
    kind: "image",
    src: "/images/work-instore-visuals.jpg",
    alt: "Two framed lifestyle campaign photographs mounted on a dark wall above folded shirts in a retail store.",
    fit: "cover",
    natural: 415,
    col: "lg:col-span-5",
    aspect: "aspect-[4/3]",
    caseStudy: "retail",
  },
  {
    id: "brand-strategy",
    index: "13",
    title: "Brand Strategy Projects",
    category: "BRAND STRATEGY",
    blurb:
      "Branding, strategy and creative execution managed for startups, SMEs and enterprise clients at Ants & Elephants.",
    kind: "type",
    col: "lg:col-span-7",
    aspect: "aspect-[16/10]",
    caseStudy: "ants",
  },
];

export const workCategories: ("ALL" | WorkCategory)[] = [
  "ALL",
  "RETAIL CAMPAIGNS",
  "BRAND & VISUAL",
  "DIGITAL GROWTH",
  "BRAND STRATEGY",
];

/**
 * Retail documentation set — attribution rules.
 *
 * Only ONE upload carries an authorship caption: the standee collage, captioned
 * "Works @ R&B · 📍Lulu Mall Kochi". The CV records no retail role, so nothing
 * beyond that caption is claimed for the rest of the photographs, and brand
 * marks visible in frame (Van Heusen, Disney's Mickey & Friends) are identified
 * as belonging to those brands.
 *
 * The two standalone brand logo files that were uploaded (easybuy, BASICS) are
 * NOT shown anywhere: neither brand's environment appears in any photograph, so
 * a logo row would read as a client list. They now sit in /assets-not-used.
 */
export const retailDocumentation = {
  note: "Documentation photographs from retail floors. One of these uploads is captioned “Works @ R&B · Lulu Mall Kochi”; the rest carry no caption, so no employer, dates or authorship are claimed for them here. Brand marks visible in frame belong to those brands.",
};

/* ------------------------------------------------------------------ */
/* CASE STUDIES — every line traceable to a CV bullet or a photograph  */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  meta: { label: string; value: string }[];
  showcase?: {
    heading: string;
    subheading?: string;
    src: string;
    alt: string;
  };
  sections: { heading: string; points: string[] }[];
  result?: { value: string; label: string };
  tools?: string[];
  gallery?: { src: string; alt: string }[];
  note?: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  youtube: {
    id: "youtube",
    title: "AI YouTube Growth",
    category: "DIGITAL GROWTH",
    meta: [
      { label: "Role", value: "Content Creator & YouTube Growth Strategist" },
      { label: "Property", value: "AI YouTube Channel (self-managed)" },
      { label: "Timeline", value: "2026 – Present" },
    ],
    sections: [
      {
        heading: "The challenge",
        points: [
          "Build an AI-powered YouTube channel from concept through to a real audience.",
          "Make discovery happen organically, without leaning on paid promotion.",
        ],
      },
      {
        heading: "The strategy",
        points: [
          "Content strategies built specifically around organic reach and subscriber growth.",
          "Keyword research to find demand before producing against it.",
          "Trend research and competitor analysis to time and position each release.",
        ],
      },
      {
        heading: "The execution",
        points: [
          "YouTube SEO across titles, descriptions, tags and metadata.",
          "Thumbnail design and channel branding treated as part of the ranking system, not decoration.",
          "AI tools used for scripting, content planning and workflow automation.",
          "CTR, watch time, impressions, audience retention and subscriber growth tracked and fed back into the next cycle.",
        ],
      },
      {
        heading: "The result",
        points: [
          "2M+ cumulative views, grown organically.",
          "A repeatable AI-powered content production workflow.",
          "Improved discoverability through YouTube SEO.",
          "Multiple AI-generated pieces that broke out beyond the base audience.",
        ],
      },
    ],
    result: { value: "2M+", label: "Cumulative organic views" },
    tools: [
      "YouTube Studio",
      "Google Trends",
      "Google Analytics",
      "Canva",
      "CapCut",
      "Adobe Photoshop",
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
    ],
  },

  "hero-protocol": {
    id: "hero-protocol",
    title: "Hero Protocol Digital Branding",
    category: "BRAND STRATEGY",
    meta: [
      { label: "Role", value: "Digital Marketing & Social Media Executive" },
      { label: "Company", value: "HeroTech (Hero Protocol)" },
      { label: "Timeline", value: "2026 – Present · Remote" },
    ],
    showcase: {
      heading: "FROM STRATEGY TO EXECUTION",
      subheading:
        "A visual overview of my digital marketing, content and campaign work for Hero Protocol.",
      src: "/images/work-herotech-showcase.jpg",
      alt: "HeroTech Hero Protocol digital marketing and social media portfolio showcase",
    },
    sections: [
      {
        heading: "The challenge",
        points: [
          "Establish the digital presence of an AI-powered platform from the ground up.",
          "Hold one consistent brand identity across every channel while shipping at pace.",
        ],
      },
      {
        heading: "The strategy",
        points: [
          "End-to-end digital marketing strategy aimed at brand awareness and customer engagement.",
          "SEO-driven content marketing as the primary visibility engine.",
          "Keyword research, competitor analysis and trend analysis feeding the content calendar.",
        ],
      },
      {
        heading: "The execution",
        points: [
          "Instagram, LinkedIn, Facebook and X managed as one system.",
          "Campaigns, reels, stories, carousels and promotional content planned and published.",
          "SEO-optimized blogs, captions and website copy written in-house.",
          "Website branding, landing page optimization and on-page SEO.",
          "AI-assisted marketing workflows introduced to raise production throughput.",
          "Worked alongside product, design and development teams.",
        ],
      },
      {
        heading: "The outcome",
        points: [
          "Improved online visibility through SEO-driven content marketing.",
          "Product launches supported with strategic campaigns.",
          "Performance monitored in Google Analytics and Google Search Console.",
        ],
      },
    ],
    tools: [
      "Google Analytics",
      "Google Search Console",
      "Meta Business Suite",
      "Canva",
      "Adobe Photoshop",
      "WordPress",
      "Shopify",
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
    ],
    note: "No performance figures are published for this engagement.",
  },

  ants: {
    id: "ants",
    title: "Brand Strategy Projects",
    category: "BRAND STRATEGY",
    meta: [
      { label: "Role", value: "Project Manager" },
      { label: "Company", value: "Ants & Elephants — Creative Branding & Strategy Agency" },
      { label: "Timeline", value: "December 2025 – May 2026" },
    ],
    sections: [
      {
        heading: "The challenge",
        points: [
          "Run branding and creative projects for startups, SMEs and enterprise clients in parallel.",
          "Keep every one of them on time, in scope and inside budget.",
        ],
      },
      {
        heading: "The approach",
        points: [
          "Structured planning as the default, so delivery did not depend on heroics.",
          "Process optimization to remove the repeated friction between disciplines.",
          "Direct, frequent stakeholder communication rather than status theatre.",
        ],
      },
      {
        heading: "The execution",
        points: [
          "Coordinated designers, strategists, developers, copywriters and stakeholders.",
          "Managed timelines, resources, deliverables and execution end to end.",
          "Supported brand strategy, positioning, messaging and identity development.",
          "Delivered presentations, reports and client communications.",
        ],
      },
      {
        heading: "The outcome",
        points: [
          "Multiple branding projects delivered.",
          "Improved workflow efficiency and team collaboration.",
          "Stronger delivery performance through structured planning.",
        ],
      },
    ],
    tools: ["ClickUp", "Notion", "Figma", "Miro", "Google Workspace", "Microsoft Office", "Canva"],
    note: "Client names are withheld — public attribution has not been established for this work.",
  },

  retail: {
    id: "retail",
    title: "Retail Campaign & In-Store Documentation",
    category: "RETAIL CAMPAIGNS",
    meta: [
      { label: "Captioned upload", value: "“Works @ R&B · Lulu Mall Kochi” (the standee set)" },
      { label: "Rest of the set", value: "Uncaptioned — no employer or authorship claimed" },
      { label: "Formats", value: "Campaign displays · standees · windows · merchandising walls" },
    ],
    sections: [
      {
        heading: "What this is",
        points: [
          "A documentation set photographed on retail floors: festive environments, seasonal standees, price-led banners, licensed character displays and merchandising walls.",
          "It is included because it shows the kind of retail campaign environment worked in — not as a portfolio of authored design pieces.",
        ],
      },
      {
        heading: "Attribution",
        points: [
          "One upload carries the caption “Works @ R&B · Lulu Mall Kochi”. That is the only authorship marker in the set.",
          "The CV records no retail role, so no employer, dates, brief or result is attached to the remaining photographs.",
          "Brand marks visible in frame — Van Heusen, Disney's Mickey & Friends — belong to those brands.",
        ],
      },
    ],
    note: "Deliberately unembellished: no brief, budget, timeline or performance figure is claimed for this set, because none was supplied.",
    gallery: [
      {
        src: "/images/work-ramadan-wide.jpg",
        alt: "Wider view of the Ramadan Mubarak in-store campaign display showing the illuminated arch in its retail setting.",
      },
      {
        src: "/images/work-ramadan-tall.jpg",
        alt: "Ramadan Mubarak display photographed straight on, showing the arch, patterned backdrop and styled mannequin.",
      },
      {
        src: "/images/work-rb-lulu-collage.jpg",
        alt: "Seasonal fashion campaign standees across women's, men's and boys' categories at R&B, Lulu Mall Kochi.",
      },
      {
        src: "/images/work-onam-display.jpg",
        alt: "Onam festive window display with three colour-blocked mannequins.",
      },
      {
        src: "/images/work-new-trends.jpg",
        alt: "Illuminated New Trends Start Here feature wall used as in-store wayfinding.",
      },
      {
        src: "/images/work-warm-tones.jpg",
        alt: "Warm Tones seasonal styling panel with a desert-toned backdrop.",
      },
      {
        src: "/images/work-mickey-friends.jpg",
        alt: "Disney Mickey and Friends three-panel character display.",
      },
      {
        src: "/images/work-instore-visuals.jpg",
        alt: "Framed lifestyle campaign photographs mounted above folded stock.",
      },
      {
        src: "/images/work-fashion-polo.jpg",
        alt: "Fashion Polo campaign banner with a large price anchor.",
      },
      {
        src: "/images/work-graphic-tees.jpg",
        alt: "Graphic Tees campaign banner with a multi-buy offer.",
      },
      {
        src: "/images/work-vanheusen-unicorn.jpg",
        alt: "Gold unicorn emblem above the Van Heusen wordmark.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* WHAT I DO                                                           */
/* ------------------------------------------------------------------ */

export const services = [
  {
    index: "01",
    title: "Digital Marketing",
    line: "Strategy that starts with demand, not with a channel.",
    items: ["SEO", "Social Media", "Performance Marketing", "Content Marketing"],
  },
  {
    index: "02",
    title: "Growth",
    line: "Finding the audience that already exists, then earning it.",
    items: ["YouTube SEO", "Analytics", "Keyword Research", "Audience Growth"],
  },
  {
    index: "03",
    title: "Branding",
    line: "One identity, held consistently across every surface.",
    items: ["Digital Branding", "Brand Strategy", "Campaign Management"],
  },
  {
    index: "04",
    title: "AI Marketing",
    line: "AI used where it compounds output, not where it flattens the voice.",
    items: ["AI-assisted content", "Marketing workflows", "Automation"],
  },
  {
    index: "05",
    title: "Content",
    line: "Built for the platform it lives on, not adapted to it afterwards.",
    items: ["Content Strategy", "Copywriting", "Video Marketing", "Reels Strategy"],
  },
  {
    index: "06",
    title: "Project Management",
    line: "Structured delivery so creative work actually ships.",
    items: ["Project Management", "Stakeholder Management", "Team Coordination"],
  },
];

/* ------------------------------------------------------------------ */
/* EXPERIENCE — verbatim from the CV, condensed but not rewritten      */
/* ------------------------------------------------------------------ */

export type Role = {
  company: string;
  title: string;
  period: string;
  mode?: string;
  points: string[];
  tools: string[];
};

export const experience: Role[] = [
  {
    company: "HeroTech (Hero Protocol)",
    title: "Digital Marketing & Social Media Executive",
    period: "2026 – Present",
    mode: "Remote",
    points: [
      "Developed and executed end-to-end digital marketing strategies to enhance brand awareness and customer engagement.",
      "Led HeroTech's complete digital branding and social media strategy across Instagram, LinkedIn, Facebook and X.",
      "Planned and published campaigns, reels, stories, carousels and promotional content.",
      "Created SEO-optimized content, blogs, captions and website copy.",
      "Conducted keyword research, competitor analysis and trend analysis.",
      "Assisted with website branding, landing page optimization and on-page SEO.",
      "Implemented AI-assisted marketing workflows to improve productivity.",
      "Monitored campaign performance using Google Analytics and Google Search Console.",
    ],
    tools: [
      "Google Analytics",
      "Google Search Console",
      "Meta Business Suite",
      "Canva",
      "Adobe Photoshop",
      "WordPress",
      "Shopify",
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
    ],
  },
  {
    company: "Piccolo Weddings",
    title: "Marketing Head & Event Coordinator",
    period: "2025 – 2026",
    points: [
      "Led digital marketing initiatives across multiple platforms.",
      "Planned and executed social media campaigns and branding strategies.",
      "Coordinated end-to-end wedding projects and vendor management.",
      "Managed client consultations, budgets and project timelines.",
      "Developed marketing materials, promotional videos and social media creatives.",
      "Managed content calendars and campaign planning.",
      "Generated leads through digital marketing and customer engagement.",
      "Analyzed campaign performance and optimized future campaigns.",
    ],
    tools: [
      "Canva",
      "Adobe Photoshop",
      "Meta Business Suite",
      "Google Analytics",
      "Google Workspace",
      "Microsoft Office",
      "ChatGPT",
      "Claude AI",
    ],
  },
  {
    company: "Ants & Elephants",
    title: "Project Manager",
    period: "December 2025 – May 2026",
    mode: "Creative Branding & Strategy Agency",
    points: [
      "Managed branding and creative projects for startups, SMEs and enterprise clients.",
      "Coordinated designers, strategists, developers, copywriters and stakeholders.",
      "Managed timelines, resources, deliverables and project execution.",
      "Supported brand strategy, positioning, messaging and identity development.",
      "Delivered presentations, reports and client communications.",
      "Improved workflow efficiency through process optimization.",
      "Ensured projects were delivered on time, within scope and within budget.",
    ],
    tools: [
      "ClickUp",
      "Notion",
      "Figma",
      "Miro",
      "Google Workspace",
      "Microsoft Office",
      "Canva",
      "ChatGPT",
    ],
  },
  {
    company: "AI YouTube Channel",
    title: "Content Creator & YouTube Growth Strategist",
    period: "2026 – Present",
    mode: "Self-managed",
    points: [
      "Built and managed an AI-powered YouTube channel from concept to audience growth.",
      "Developed content strategies focused on organic reach and subscriber growth.",
      "Implemented YouTube SEO using keyword research, metadata optimization, titles, descriptions and tags.",
      "Designed high-performing thumbnails and channel branding.",
      "Used AI tools for scripting, content planning and workflow automation.",
      "Tracked CTR, watch time, impressions, audience retention and subscriber growth.",
      "Achieved 2M+ cumulative YouTube views through organic growth.",
    ],
    tools: [
      "YouTube Studio",
      "Google Trends",
      "Google Analytics",
      "Canva",
      "CapCut",
      "Adobe Photoshop",
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* SKILLS — grouped, from the CV's technical skills list               */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    name: "Marketing",
    skills: [
      "Digital Marketing Strategy",
      "Social Media Marketing",
      "Search Engine Optimization",
      "Performance Marketing",
      "Content Marketing",
      "Campaign Management",
      "Email Marketing",
      "Lead Generation",
    ],
  },
  {
    name: "Growth",
    skills: [
      "YouTube SEO",
      "Keyword Research",
      "Competitor Analysis",
      "Audience Growth",
      "Marketing Analytics",
      "Website SEO Audits",
      "Landing Page Optimization",
      "Reels Strategy",
    ],
  },
  {
    name: "Branding",
    skills: [
      "Brand Management",
      "Digital Branding",
      "Creative Strategy",
      "Campaign Strategy",
      "Content Strategy",
      "Copywriting",
      "Community Management",
    ],
  },
  {
    name: "AI",
    skills: [
      "AI Marketing",
      "Marketing Automation",
      "AI-assisted content production",
      "AI content workflows",
    ],
  },
  {
    name: "Project Management",
    skills: [
      "Project Management",
      "Team Leadership",
      "Stakeholder Management",
      "Cross-functional Collaboration",
      "Client Relationship Management",
      "Event Coordination",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* TOOLS                                                               */
/* ------------------------------------------------------------------ */

export const tools = [
  "Google Analytics",
  "Google Search Console",
  "Meta Business Suite",
  "YouTube Studio",
  "Google Trends",
  "Canva",
  "Adobe Photoshop",
  "CapCut",
  "Figma",
  "Miro",
  "WordPress",
  "Shopify",
  "ChatGPT",
  "Claude AI",
  "Google Gemini",
  "Notion",
  "ClickUp",
  "Google Workspace",
  "Microsoft Office",
];

/* ------------------------------------------------------------------ */
/* CERTIFICATIONS                                                      */
/* ------------------------------------------------------------------ */
/**
 * The five below are transcribed from the LinkedIn "Licenses & certifications"
 * screenshots, including credential IDs. No credential URLs were visible in
 * those screenshots, so `url` is intentionally empty and the button renders
 * disabled rather than pointing somewhere invented.
 */

export type Certification = {
  name: string;
  issuer: string;
  issued?: string;
  expires?: string;
  credentialId?: string;
  url: string;
};

export const certifications: Certification[] = [
  {
    name: "Digital Marketing Certified",
    issuer: "HubSpot Academy",
    credentialId: "9z9k935m",
    url: "",
  },
  {
    name: "Inbound Marketing Certified",
    issuer: "HubSpot Academy",
    credentialId: "q3dn6q7g",
    url: "",
  },
  {
    name: "Google Analytics Certification (2026)",
    issuer: "Skillshop",
    issued: "Aug 2026",
    expires: "Aug 2027",
    credentialId: "190565847",
    url: "",
  },
  {
    name: "Google Ads Search Professional Certification (2026)",
    issuer: "Skillshop",
    issued: "Aug 2026",
    expires: "Aug 2027",
    credentialId: "190482004",
    url: "",
  },
  {
    name: "SEO Toolkit Crash Course",
    issuer: "Semrush",
    issued: "Aug 2026",
    expires: "Aug 2027",
    url: "",
  },
];

/** Listed on the CV but not corroborated by the uploaded screenshots. */
export const additionalCertifications = [
  "Google Digital Marketing Certification",
  "HubSpot Content Marketing",
  "Meta Social Media Marketing",
];

export const certificationProof = [
  {
    src: "/images/cert-linkedin-01.jpg",
    alt: "LinkedIn licenses and certifications panel listing HubSpot Digital Marketing Certified, Semrush SEO Toolkit Crash Course and Google Analytics Certification 2026.",
  },
  {
    src: "/images/cert-linkedin-02.jpg",
    alt: "LinkedIn licenses and certifications panel listing Google Analytics Certification 2026, HubSpot Inbound Marketing Certified and Google Ads Search Professional Certification 2026.",
  },
];

/* ------------------------------------------------------------------ */
/* ABOUT / STATEMENT / NAV                                             */
/* ------------------------------------------------------------------ */

export const about = {
  heading: ["Marketer.", "Creator.", "Strategist."],
  lead: "I build digital brands, create campaigns, grow audiences, and turn ideas into measurable digital experiences.",
  paragraphs: [
    "I work across digital marketing strategy, social media, SEO, branding, content marketing and project management — and I use AI as part of the production system rather than as a novelty.",
    "That has meant leading the complete digital branding and social media strategy for an AI-powered platform, coordinating branding projects for startups, SMEs and enterprise clients inside a creative agency, running marketing and coordination for an events business, and growing a self-managed AI YouTube channel to 2M+ organic views.",
    "The through-line is the same in all four: creative thinking, decisions made against analytics, and execution that actually ships.",
  ],
  pillars: ["Marketing", "Creative Strategy", "Content", "Analytics", "AI"],
};

export const statement = ["Creative thinking.", "Data-driven marketing.", "AI-powered execution."];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];




