import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const siteName = "Blob Arena";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blob-arena.malezjaa.tech";
const homeTitle = "Blob Arena: Where Ridiculous Blobs Settle the Score";
const homeDescription =
  "Enter two names and watch playful blobs battle it out in a fast, funny, shareable fight with a unique replay every time.";
const homeImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Two glossy blob fighters face off in the Blob Arena",
};
const darkHomeImage = {
  url: "/og-image-dark.png",
  width: 1200,
  height: 630,
  alt: "Blob Arena in dark mode with a who would win headline",
};

const display = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: homeTitle,
    template: "%s | Blob Arena",
  },
  description: homeDescription,
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
    images: [homeImage, darkHomeImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [homeImage.url, darkHomeImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
