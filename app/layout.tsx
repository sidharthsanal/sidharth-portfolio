import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import Curtain from "@/components/Curtain";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import { about, certifications, site } from "@/lib/content";
import "./globals.css";

/* Condensed editorial display face + clean premium sans. */
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  keywords: [
    "Digital Marketing",
    "Creative Strategy",
    "SEO",
    "Social Media Marketing",
    "Content Marketing",
    "Brand Strategy",
    "AI Marketing",
    "YouTube Growth",
    "Sidharth Sanal",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_AE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Person schema — every field below is drawn from the CV or the certification
 * screenshots. No social profiles are listed because no verified URLs exist yet;
 * add them to `sameAs` once the links in lib/content.ts are filled in.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  knowsLanguage: site.languages,
  knowsAbout: about.pillars,
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    credentialCategory: "certificate",
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:border focus:border-red focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>

        <Curtain />
        <Nav />
        <Cursor />
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
