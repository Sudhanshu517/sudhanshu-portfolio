import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Providers } from "@/components/layout/Providers"
import { Footer } from "@/components/layout/Footer"
import { SITE_URL, profile } from "@/data/profile"
import "./globals.css"

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

const description =
  "Sudhanshu is a Computer Science undergraduate at MSIT building full-stack, real-time and AI-enabled products with React, Next.js, Node.js, Socket.IO and MongoDB."

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sudhanshu — Full-Stack Developer",
    template: "%s · Sudhanshu",
  },
  description,
  keywords: [
    "Sudhanshu",
    "Full-Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Socket.IO",
    "MongoDB",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sudhanshu — Full-Stack Developer",
    description,
    url: SITE_URL,
    siteName: "Sudhanshu",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudhanshu — Full-Stack Developer",
    description,
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ece8de" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0b" },
  ],
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  jobTitle: profile.title,
  description,
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.dsa],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
