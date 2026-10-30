import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StatusTicker } from "@/components/layout/status-ticker";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstronomyBU · Bennett University Observatory Archive",
  description:
    "Official portal of Bennett University's Premier Astronomy Club. Stargazing expeditions, cosmology inquiries, astrophotography archives, and campus observations.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png" },
    ],
  },
  keywords: [
    "AstronomyBU",
    "Bennett University",
    "Astronomy Club",
    "Greater Noida Stargazing",
    "Cosmology",
    "Astrophotography",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#f5efeb] selection:bg-[#eae5d9] selection:text-[#09090b]">
        {/* Unified Archival Header with built-in ephemeris telemetry */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full relative">{children}</main>

        {/* Archival Editorial Footer */}
        <Footer />
      </body>
    </html>
  );
}
