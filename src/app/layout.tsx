import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { Backdrop } from "@/components/layout/backdrop";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/motion/parallax";
import { profile } from "@/data/profile";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Muhammad Kamran — Full Stack Web Developer building modern, scalable web products with Next.js, React, TypeScript, Node.js and Django, plus WordPress, Shopify, WooCommerce and SureCart e-commerce.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Full Stack Web Developer`,
    template: `%s · ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  keywords: [
    "Full Stack Web Developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Node.js",
    "Django",
    "WordPress developer",
    "Shopify developer",
    "WooCommerce",
    "SureCart",
    "E-commerce development",
    "Muhammad Kamran",
    "Pakistan freelance developer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `${profile.name} — Full Stack Web Developer`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full Stack Web Developer`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-fg">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:border focus:border-accent focus:bg-canvas focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-[0.14em] focus:text-accent focus:uppercase"
        >
          Skip to content
        </a>

        <Backdrop />
        <ScrollProgress />
        <SmoothScroll>
          <SiteHeader />
          <main id="content">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
