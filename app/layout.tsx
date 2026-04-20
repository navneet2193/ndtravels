import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "ND Travels | Stories From Every Journey",
    template: "%s | ND Travels"
  },
  description:
    "A modern travel blog built with Next.js and Supabase for discovering stories, guides, and memorable escapes.",
  keywords: ["travel blog", "Next.js", "Supabase", "travel stories", "adventure journal"],
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
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
