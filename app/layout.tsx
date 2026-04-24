import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/next";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "ND Travels | Stories From Every Journey",
    template: "%s | ND Travels"
  },
  description:
    "A travel journal for discovering stories, guides, and memorable escapes.",
  keywords: ["travel blog", "travel stories", "adventure journal", "destination guides"],
  openGraph: {
    title: "ND Travels",
    description: "Travel stories, destination guides, and visual inspiration for your next trip.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ND Travels",
    description: "Travel stories, destination guides, and visual inspiration for your next trip."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
