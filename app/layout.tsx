import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "../components/analytics";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { siteUrl } from "../data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Garber Lab",
    locale: "en_US",
    images: [{ url: "/assets/hero-tissue.webp", alt: "Garber Lab" }],
  },
  title: {
    default: "Garber Lab | Computational Genomics and Skin Immunobiology",
    template: "%s | Garber Lab",
  },
  description:
    "The Garber Lab studies how regulatory programs, immune cell states, and tissue context shape inflammatory skin disease.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
        <script
          defer
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "45a53422791f40fc8f0c772b17458475"}'
        />
      </body>
    </html>
  );
}
