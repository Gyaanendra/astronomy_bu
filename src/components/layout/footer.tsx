"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CLUB_INFO } from "@/lib/constants";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/icons";

export function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
    }
  };

  return (
    <footer
      id="newsletter"
      className="relative w-full min-h-[755px] lg:h-[755px] lg:max-h-[755px] flex flex-col justify-between bg-[#09090b] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] overflow-hidden"
    >
      {/* ============================================================== */}
      {/* 1. BACKGROUND ARTWORK: Behance Lunar Illustration (1920x755)   */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/assets/footer-bg.webp"
          alt="Stippled extraterrestrial lunar exploration landscape with lone astronaut"
          fill
          priority
          className="object-cover object-bottom filter contrast-110 brightness-95"
          sizes="100vw"
        />
        
        {/* Top Fade Gradient: Smooth blend from page void into deep sky */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />
        
        {/* Bottom Contrast Scrim: Ensures the colossal wordmark and copyright pop with 100% contrast */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#09090b] via-[#09090b]/75 to-transparent pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND CONTENT: Minimalist, Spatial & High Contrast    */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 h-full flex flex-col justify-between pt-8 sm:pt-10 pb-5 sm:pb-6">
        
        {/* ------------------------------------------------------------ */}
        {/* TOP LAYER (In Pure Black Void): Telemetry & Quick Index     */}
        {/* ------------------------------------------------------------ */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(245,239,235,0.1)] font-mono text-[11px] tracking-[0.2em] uppercase">
            {/* Left: Station Coordinates */}
            <div className="text-[#a39e93] flex items-center gap-3">
              <span className="text-[#f5efeb] font-semibold">✱ ASTRONOMYBU</span>
              <span className="text-[#635e57]">/</span>
              <span>28.4595° N, 77.5046° E</span>
              <span className="hidden sm:inline text-[#635e57]">/</span>
              <span className="hidden sm:inline">BENNETT OBSERVATORY</span>
            </div>

            {/* Right: Quiet Nav Links (Above the Astronaut in Sky) */}
            <nav className="flex flex-wrap items-center gap-5 sm:gap-8 text-[#a39e93]">
              <Link href="#sanctuary" className="hover:text-[#f5efeb] transition-colors">
                ABOUT
              </Link>
              <Link href="#structure" className="hover:text-[#f5efeb] transition-colors">
                STRUCTURE
              </Link>
              <Link href="#dome" className="hover:text-[#f5efeb] transition-colors">
                DOME
              </Link>
              <Link href="#programs" className="hover:text-[#f5efeb] transition-colors">
                PROGRAMS
              </Link>
              <Link href="#membership" className="hover:text-[#f5efeb] transition-colors">
                MEMBERSHIP
              </Link>
              <Link href="#archive" className="hover:text-[#f5efeb] transition-colors">
                ARCHIVE
              </Link>
              <Link href="#journal" className="hover:text-[#f5efeb] transition-colors">
                JOURNAL
              </Link>
              <Link href="/calendar" className="hover:text-[#f5efeb] transition-colors">
                CALENDAR
              </Link>
            </nav>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* NEWSLETTER ROW (Sleek, Minimalist, Pure Void Background)   */}
          {/* ---------------------------------------------------------- */}
          <div className="pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-6 space-y-2">
              <span className="font-mono text-[10px] tracking-archival text-[#d4af37] uppercase block">
                Celestial Dispatches &amp; Ephemeris
              </span>
              <h2 className="font-editorial-serif italic text-3xl sm:text-5xl text-[#f5efeb] tracking-tight leading-tight">
                SUBSCRIBE TO NEWSLETTER
              </h2>
              <p className="font-mono text-xs text-[#a39e93] leading-relaxed max-w-lg uppercase">
                Occasional updates from AstronomyBU — telescope observation alerts, astrophotography techniques, and research archives.
              </p>
            </div>

            {/* Right Column: Sleek, Minimalist Dark Glass Form */}
            <div className="lg:col-span-6 flex justify-end">
              <div className="w-full max-w-md bg-[#09090b]/85 border border-[rgba(245,239,235,0.2)] backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {sent ? (
                  <div className="py-4 text-center font-mono text-xs uppercase tracking-archival text-[#eae5d9]">
                    <p className="font-bold text-sm mb-1 text-[#f5efeb]">Frequency Calibrated</p>
                    <p className="text-[#a39e93]">
                      You will receive telescope schedules and observation alerts.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="w-full bg-[#111113] border border-[rgba(245,239,235,0.15)] px-3.5 py-2.5 text-xs font-mono text-[#f5efeb] placeholder-[#71717a] focus:outline-none focus:border-[#eae5d9] transition-colors"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        className="w-full bg-[#111113] border border-[rgba(245,239,235,0.15)] px-3.5 py-2.5 text-xs font-mono text-[#f5efeb] placeholder-[#71717a] focus:outline-none focus:border-[#eae5d9] transition-colors"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="font-mono text-[10px] text-[#8a847a] uppercase tracking-wide">
                        No spam. Only celestial events.
                      </span>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#eae5d9] text-[#09090b] font-mono text-xs tracking-archival font-semibold uppercase hover:bg-white transition-colors shrink-0"
                      >
                        JOIN [↗]
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* MIDDLE STAGE: 100% UNOBSTRUCTED ARTWORK                      */}
        {/* (The astronaut and mountain breathe with zero text over them) */}
        {/* ------------------------------------------------------------ */}
        <div className="flex-1 min-h-[140px] pointer-events-none" />

        {/* ------------------------------------------------------------ */}
        {/* BOTTOM STAGE: High-Contrast Wordmark & Sub-Footer            */}
        {/* (Protected by the dark scrim gradient for 100% visibility)    */}
        {/* ------------------------------------------------------------ */}
        <div className="w-full z-20 space-y-3">
          {/* Colossal Brand Wordmark */}
          <div className="w-full overflow-hidden select-none">
            <span className="font-editorial-serif italic tracking-tighter text-[clamp(3.2rem,9.5vw,7.8rem)] text-[#f5efeb] leading-[0.85] block drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              ASTRONOMYBU
            </span>
          </div>

          {/* Sub-Footer: Telemetry, Copyright & Socials */}
          <div className="pt-3 border-t border-[rgba(245,239,235,0.15)] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#a39e93]">
            {/* Copyright & Inquiries */}
            <div className="flex items-center gap-3">
              <span>© {new Date().getFullYear()} ASTRONOMYBU · BENNETT OBSERVATORY</span>
              <span className="hidden md:inline text-[#635e57]">/</span>
              <a href="mailto:astronomy@bennett.edu.in" className="hidden md:inline text-[#f5efeb] hover:underline">
                astronomy@bennett.edu.in
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 text-[#f5efeb]">
              <a
                href={CLUB_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href={CLUB_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={CLUB_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
