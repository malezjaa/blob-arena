import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Blob Arena",
    template: "%s | Blob Arena",
  },
  description: "Type two names. Watch two ridiculous blobs settle it.",
  openGraph: {
    title: "Blob Arena",
    description: "Two names enter. One blob leaves.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
