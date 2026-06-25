import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/clinic";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Physiotherapy in West Vancouver | Azalea Physiotherapy",
    template: "%s | Azalea Physiotherapy",
  },
  description:
    "No-referral physiotherapy in West Vancouver across two clinics. Direct billing to ICBC, WorkSafeBC and extended health, with appointments usually the same week.",
  metadataBase: new URL("https://azaleaphysio.com"),
  alternates: {
    canonical: "/",
    languages: { "en-CA": "/", fa: "/fa", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://azaleaphysio.com",
    siteName: "Azalea Physiotherapy",
    title: "Physiotherapy in West Vancouver | Azalea Physiotherapy",
    description:
      "No-referral physiotherapy in West Vancouver. Direct billing to ICBC, WorkSafeBC and extended health. Usually seen the same week.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://azaleaphysio.com",
  name: "Azalea Physiotherapy",
  url: "https://azaleaphysio.com",
  email: "info@azaleaphysio.com",
  foundingDate: "2011",
  priceRange: "$$",
  paymentAccepted: "ICBC, WorkSafeBC, extended health insurance, debit, credit",
  areaServed: ["West Vancouver", "North Vancouver", "North Shore"],
  availableLanguage: ["English", "Persian"],
  // aggregateRating intentionally omitted until first-party reviews render on
  // the page (Google structured-data policy; YMYL risk). See schema.ts.
  medicalSpecialty: [
    "Physiotherapy",
    "Sports Medicine",
    "Acupuncture",
    "Occupational Therapy",
    "Chiropractic",
    "Osteopathy",
    "Kinesiology",
  ],
  location: [
    {
      "@type": "MedicalClinic",
      name: "Azalea Physiotherapy, 16th Street",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 207, 585 16th Street",
        addressLocality: "West Vancouver",
        addressRegion: "BC",
        postalCode: "V7V 3R8",
        addressCountry: "CA",
      },
      telephone: "+16042813345",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "15:00",
        },
      ],
    },
    {
      "@type": "MedicalClinic",
      name: "Azalea Physiotherapy, Ocean Walk",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1884 Marine Drive",
        addressLocality: "West Vancouver",
        addressRegion: "BC",
        postalCode: "V7V 1J6",
        addressCountry: "CA",
      },
      telephone: "+16042813122",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "15:00",
        },
      ],
    },
  ],
  sameAs: [
    "https://www.facebook.com/AzaleaPhysio/",
    "https://www.instagram.com/azaleaphysiowestvancouver/",
    "https://twitter.com/azaleaphysio",
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: SITE.booking,
      inLanguage: "en-CA",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Physiotherapy appointment" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* dir="ltr" set explicitly — site is RTL-ready via CSS logical properties for future /fa route */
    <html lang="en" dir="ltr" className={`${spectral.variable} h-full antialiased`}>
      <head>
        {/* Preconnect to Fontshare so the Satoshi CSS import (not available via
            next/font) resolves with one fewer round trip. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        {/* Mark JS as active before first paint so scroll-reveal only hides
            content when it can actually animate it back in (no FOUC, no blank
            sections for crawlers / no-JS). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:inset-inline-start-4 focus:top-4 focus:z-[200] focus:bg-dark focus:text-dark-text focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
