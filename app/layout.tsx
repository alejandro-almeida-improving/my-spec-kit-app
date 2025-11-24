import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Netflix-style Movie Catalog",
  description:
    "Dark, Netflix-inspired catalog with hero slides, curated carousels, search, and detail placeholders.",
  openGraph: {
    title: "Netflix-style Movie Catalog",
    description:
      "Explore featured titles, curated carousels, and accessibility-first interactions inspired by a Netflix mockup.",
    url: "https://example.com",
    siteName: "Netflix-style Catalog",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-950 text-zinc-50 antialiased`}
      >
        <div className="min-h-screen bg-linear-to-b from-[#050505] via-[#070707] to-[#050505]">
          {children}
        </div>
      </body>
    </html>
  );
}
