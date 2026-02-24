import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { siteConfig } from "@/lib/content";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Turnkey CNC Automation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "CNC automation",
    "FANUC robot",
    "FANUC CRX",
    "FANUC Authorized System Integrator",
    "collaborative robot",
    "machine tending",
    "turnkey automation",
    "lights-out manufacturing",
    "ROI automation",
    "Texas manufacturing",
    "Arlington TX automation",
    "industrial robot",
  ],
  authors: [{ name: "Eagle Automation" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-md focus:bg-eagle-orange focus:text-dark-950 focus:text-sm focus:font-semibold focus:outline-none"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <Analytics />
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
