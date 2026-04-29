import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import StickyCallButton from "@/components/StickyCallButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://automotor.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AutoMotor.AI — The fastest way to find a used engine",
    template: "%s · AutoMotor.AI",
  },
  description:
    "Describe what you need. Our AI calls 15 junkyards in parallel and returns comparable quotes in under 90 seconds. Used engines, transmissions, marine, and commercial parts.",
  keywords: [
    "used engines",
    "used transmissions",
    "junkyards",
    "auto parts",
    "marine engines",
    "diesel engines",
    "AI mechanic",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AutoMotor.AI",
    title: "AutoMotor.AI — The fastest way to find a used engine",
    description:
      "Our AI calls 15 junkyards in parallel and returns comparable quotes in under 90 seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoMotor.AI",
    description:
      "Our AI calls 15 junkyards in parallel and returns comparable quotes in under 90 seconds.",
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
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-3 focus:py-2 focus:rounded-lg focus:bg-orange-DEFAULT focus:text-white focus:text-sm focus:font-medium focus:outline-none"
        >
          Skip to content
        </a>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main id="main-content" className="flex-1 overflow-y-auto relative">
            {children}
          </main>
        </div>
        <StickyCallButton />
      </body>
    </html>
  );
}
