"use client";

import { useState } from "react";
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
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />
        
        {/* Bottom Contrast Scrim: Ensures the colossal wordmark and copyright pop with 100% contrast */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#09090b] via-[#09090b]/75 to-transparent pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND: Ultra-Minimalist Layout                          */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 h-full flex flex-col justify-between pt-8 sm:pt-12 pb-5 sm:pb-6">
        
        {/* ------------------------------------------------------------ */}
        {/* TOP SKY: Sleek Subscription Box in the upper right void      */}
        {/* ------------------------------------------------------------ */}
        <div className="w-full flex justify-end">
          <div className="w-full max-w-lg bg-[#09090b]/85 border border-[rgba(245,239,235,0.2)] backdrop-blur-md p-6 sm:p-7 shadow-2xl">
            {sent ? (
              <div className="py-6 text-center font-mono text-xs uppercase tracking-archival text-[#eae5d9]">
                <p className="font-bold text-sm mb-1 text-[#f5efeb]">Frequency Calibrated</p>
                <p className="text-[#a39e93]">
                  You will receive telescope schedules and observation alerts.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-[#8a847a]">
                      Your name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full bg-[#111113] border border-[rgba(245,239,235,0.15)] px-3.5 py-2.5 text-xs font-mono text-[#f5efeb] placeholder-[#71717a] focus:outline-none focus:border-[#eae5d9] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-[#8a847a]">
                      Your email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full bg-[#111113] border border-[rgba(245,239,235,0.15)] px-3.5 py-2.5 text-xs font-mono text-[#f5efeb] placeholder-[#71717a] focus:outline-none focus:border-[#eae5d9] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <span className="font-mono text-[10px] text-[#8a847a] uppercase tracking-wide">
                    NO SPAM. ONLY CELESTIAL EVENTS.
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

        {/* ------------------------------------------------------------ */}
        {/* MIDDLE: 100% CLEAN ARTWORK (Astronaut & Mountain Spire)      */}
        {/* ------------------------------------------------------------ */}
        <div className="flex-1 pointer-events-none" />

        {/* ------------------------------------------------------------ */}
        {/* BOTTOM: High-Contrast Wordmark & Sub-Footer                  */}
        {/* ------------------------------------------------------------ */}
        <div className="w-full z-20 space-y-3">
          {/* Colossal Brand Wordmark */}
          <div className="w-full overflow-hidden select-none">
            <span className="w-full font-editorial-serif italic tracking-tighter text-[clamp(3.8rem,13vw,10rem)] text-[#f5efeb] leading-[0.85] block drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
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
