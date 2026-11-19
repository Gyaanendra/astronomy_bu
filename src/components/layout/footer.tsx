"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CLUB_INFO } from "@/lib/constants";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/icons";

export function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && agreed) {
      setSent(true);
    }
  };

  return (
    <footer
      id="newsletter"
      className="relative w-full min-h-[755px] lg:h-[755px] lg:max-h-[755px] flex flex-col justify-between bg-[#09090b] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] pt-10 sm:pt-12 pb-5 sm:pb-6 overflow-hidden"
    >
      {/* ============================================================== */}
      {/* BACKGROUND IMAGE: Behance Astronaut Illustration (1920x755)     */}
      {/* Set to exact 755px height matching the original artwork max-height*/}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/assets/footer-bg.webp"
          alt="Stippled extraterrestrial lunar exploration landscape with lone astronaut"
          fill
          priority
          className="object-cover object-bottom filter contrast-115 brightness-90 sm:brightness-95"
          sizes="100vw"
        />
        
        {/* Top Fade Gradient: Seamless blend into void #09090b from page above */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-[#09090b]/40 to-transparent" />
        
        {/* Subtle radial shading for high contrast text readability */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#09090b]/15 to-[#09090b]/70" />
      </div>

      {/* ============================================================== */}
      {/* FOREGROUND CONTENT LAYER (Proportionally fit within 755px)    */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 h-full flex flex-col justify-between">
        
        {/* ------------------------------------------------------------ */}
        {/* 1. NEWSLETTER & DISPATCHES ROW (Top Section)                 */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-6 sm:pb-8 border-b border-[rgba(245,239,235,0.12)] items-start">
          
          {/* Left Column: Scope & Dispatches Explanation */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-archival text-[#d4af37] block mb-2 uppercase">
                Celestial Dispatches // Bennett University Observatory
              </span>
              <h2 className="font-editorial-serif italic text-3xl sm:text-5xl text-[#f5efeb] tracking-tight mb-3">
                SUBSCRIBE TO NEWSLETTER
              </h2>

              <p className="font-mono text-xs text-[#eae5d9]/90 leading-relaxed max-w-xl uppercase mb-3">
                Occasional updates from AstronomyBU — telescope observation alerts, astrophotography techniques, and research archives.
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[#a39e93] uppercase">
                <span>• Observation Nights</span>
                <span>• Historical Archive</span>
                <span>• Lecture Notes</span>
                <span>• Sensor Presets</span>
              </div>
            </div>

            <div className="pt-2 font-mono text-[10px] sm:text-[11px] text-[#8a847a] uppercase">
              Station 28.4595° N, 77.5046° E · Elevation 208m MSL · Greater Noida
            </div>
          </div>

          {/* Right Column: Warm Bone Editorial Input Card (Pinterest Spec) */}
          <div className="lg:col-span-6 flex justify-end">
            <div className="w-full max-w-xl bg-[#eae5d9] text-[#09090b] p-6 sm:p-7 shadow-2xl backdrop-blur-sm border border-[#eae5d9]">
              {sent ? (
                <div className="py-8 text-center font-mono text-xs uppercase tracking-archival text-[#09090b]">
                  <p className="font-bold text-sm mb-1.5">Frequency Calibrated</p>
                  <p className="text-[#3f3f46]">
                    You will receive astronomical dispatches, telescope schedules, and observation alerts.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name and Email side by side on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#52525b]">
                        Your name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Observer"
                        required
                        className="w-full bg-transparent border-b border-[#09090b]/30 pb-1.5 text-sm sm:text-base font-editorial-serif text-[#09090b] placeholder-[#71717a] focus:outline-none focus:border-[#09090b] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#52525b]">
                        Your e-mail
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="observer@domain.com"
                        required
                        className="w-full bg-transparent border-b border-[#09090b]/30 pb-1.5 text-sm sm:text-base font-editorial-serif text-[#09090b] placeholder-[#71717a] focus:outline-none focus:border-[#09090b] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Agreement & Submit button row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        required
                        className="w-3.5 h-3.5 accent-[#09090b]"
                      />
                      <span className="font-mono text-[10px] uppercase text-[#52525b] tracking-wide">
                        I agree to Terms &amp; Privacy Policy
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-[#09090b] text-[#eae5d9] font-mono text-[11px] tracking-archival font-semibold uppercase hover:bg-black transition-colors"
                    >
                      SEND [↗]
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 2. DIRECT SITE NAVIGATION & TELEMETRY STRIP                  */}
        {/* ------------------------------------------------------------ */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(245,239,235,0.1)]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-7 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] text-[#a39e93] uppercase">
            <Link href="#sanctuary" className="hover:text-[#f5efeb] transition-colors">
              [ 01 // ABOUT ]
            </Link>
            <Link href="#structure" className="hover:text-[#f5efeb] transition-colors">
              [ 02 // STRUCTURE ]
            </Link>
            <Link href="#dome" className="hover:text-[#f5efeb] transition-colors">
              [ 03 // DOME ]
            </Link>
            <Link href="#programs" className="hover:text-[#f5efeb] transition-colors">
              [ 04 // PROGRAMS ]
            </Link>
            <Link href="#membership" className="hover:text-[#f5efeb] transition-colors">
              [ 05 // MEMBERSHIP ]
            </Link>
            <Link href="#archive" className="hover:text-[#f5efeb] transition-colors">
              [ 06 // ARCHIVE ]
            </Link>
            <Link href="#journal" className="hover:text-[#f5efeb] transition-colors">
              [ 07 // JOURNAL ]
            </Link>
            <Link href="/calendar" className="hover:text-[#f5efeb] transition-colors">
              [ 08 // CALENDAR ]
            </Link>
          </div>

          <div className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#8a847a] uppercase flex items-center gap-4">
            <a href="mailto:astronomy@bennett.edu.in" className="hover:text-[#f5efeb] transition-colors">
              astronomy@bennett.edu.in
            </a>
            <span>/</span>
            <span>+91 (0120) 719-0101</span>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 3. COLOSSAL WORDMARK: ASTRONOMYBU (Over the Lunar Horizon)   */}
        {/* ------------------------------------------------------------ */}
        <div className="w-full py-2 overflow-hidden select-none">
          <div className="w-full text-center">
            <span className="w-full font-editorial-serif italic tracking-tighter text-[clamp(3.8rem,13vw,10.5rem)] text-[#eae5d9]/95 leading-[0.8] block drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
              ASTRONOMYBU
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 4. SUB-FOOTER: COPYRIGHT & SOCIALS                           */}
        {/* ------------------------------------------------------------ */}
        <div className="pt-3 border-t border-[rgba(245,239,235,0.1)] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#8a847a]">
          <span>© {new Date().getFullYear()} ASTRONOMYBU · BENNETT OBSERVATORY ARCHIVE. ALL RIGHTS RESERVED.</span>
          
          <div className="flex items-center gap-6 text-[#eae5d9]">
            <a href={CLUB_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a href={CLUB_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a href={CLUB_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
