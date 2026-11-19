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
      className="relative w-full min-h-[950px] lg:min-h-[1100px] flex flex-col justify-between bg-[#09090b] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] pt-20 sm:pt-28 pb-10 overflow-hidden"
    >
      {/* ============================================================== */}
      {/* BACKGROUND IMAGE: Behance Astronaut Lunar Stipple Illustration */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-[#09090b]/60 to-transparent" />
        
        {/* Subtle radial shading for high contrast legibility */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#09090b]/20 to-[#09090b]/80" />
      </div>

      {/* ============================================================== */}
      {/* FOREGROUND CONTENT LAYER (Positioned directly over the art)    */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 flex-1 flex flex-col justify-between">
        
        {/* ------------------------------------------------------------ */}
        {/* 1. NEWSLETTER SUBSCRIPTION & DISPATCHES ROW                  */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 pb-16 sm:pb-20 border-b border-[rgba(245,239,235,0.15)]">
          
          {/* Left Column: Scope & Dispatches Explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-[10px] sm:text-xs tracking-archival text-[#d4af37] block mb-3 uppercase">
                Celestial Dispatches // Bennett University
              </span>
              <h2 className="font-editorial-serif italic text-4xl sm:text-6xl xl:text-7xl text-[#f5efeb] tracking-tight mb-6">
                SUBSCRIBE TO NEWSLETTER
              </h2>

              <p className="font-mono text-xs sm:text-[13px] text-[#eae5d9]/90 leading-relaxed mb-6 uppercase">
                Occasional updates from AstronomyBU — announcements, reflections, and selected materials that extend beyond the space.
              </p>

              <div className="font-mono text-xs text-[#a39e93] leading-relaxed space-y-2 uppercase">
                <span className="text-[#f5efeb] block mb-2 font-semibold">Includes:</span>
                <p>• upcoming experiences and seasonal programs</p>
                <p>• selected entries from the Archive</p>
                <p>• early access to Journal releases</p>
                <p>• open calls and participation invitations</p>
                <p>• visual materials and editorial notes</p>
                <p>• occasional audio or written reflections</p>
              </div>
            </div>

            <div className="pt-4 font-mono text-[11px] text-[#8a847a] uppercase">
              Station 28.4595° N, 77.5046° E · Elevation 208m MSL · Greater Noida
            </div>
          </div>

          {/* Right Column: Warm Bone Editorial Input Card (Pinterest Spec) */}
          <div className="lg:col-span-7 flex justify-end">
            <div className="w-full max-w-2xl bg-[#eae5d9] text-[#09090b] p-8 sm:p-12 lg:p-14 shadow-2xl backdrop-blur-sm border border-[#eae5d9]">
              {sent ? (
                <div className="py-16 text-center font-mono text-xs uppercase tracking-archival text-[#09090b]">
                  <p className="font-bold text-base mb-2">Frequency Calibrated</p>
                  <p className="text-[#3f3f46]">
                    You will receive astronomical dispatches, telescope schedules, and observation alerts.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {/* Field 1: Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#52525b]">
                      How should we call you?
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full bg-transparent border-b border-[#09090b]/30 pb-2.5 text-base sm:text-lg font-editorial-serif text-[#09090b] placeholder-[#71717a] focus:outline-none focus:border-[#09090b] transition-colors"
                    />
                  </div>

                  {/* Field 2: Email */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#52525b]">
                      How can we contact you?
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your e-mail"
                      required
                      className="w-full bg-transparent border-b border-[#09090b]/30 pb-2.5 text-base sm:text-lg font-editorial-serif text-[#09090b] placeholder-[#71717a] focus:outline-none focus:border-[#09090b] transition-colors"
                    />
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-center gap-3.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="w-4 h-4 accent-[#09090b]"
                    />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase text-[#52525b] tracking-wide">
                      I have read and agree to Privacy Policy and Terms of Service
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#09090b] text-[#eae5d9] font-mono text-xs tracking-archival font-semibold uppercase hover:bg-black transition-colors"
                  >
                    SEND
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 2. DIRECT SITE NAVIGATION / INDEX STRIP                     */}
        {/* ------------------------------------------------------------ */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(245,239,235,0.12)]">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#a39e93] uppercase">
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

          <div className="font-mono text-[11px] tracking-widest text-[#8a847a] uppercase">
            BORTLE CLASS 6 · TELESCOPE DEPLOYMENT READY
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 3. METADATA & TELEMETRY ROW                                  */}
        {/* ------------------------------------------------------------ */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs text-[#8a847a] tracking-wider uppercase border-b border-[rgba(245,239,235,0.12)]">
          <div>
            <span className="text-[#635e57] block mb-1">INQUIRIES //</span>
            <a href="mailto:astronomy@bennett.edu.in" className="text-[#f5efeb] hover:underline">
              astronomy@bennett.edu.in
            </a>
          </div>

          <div>
            <span className="text-[#635e57] block mb-1">TELEMETRY LINE //</span>
            <span className="text-[#f5efeb]">+91 (0120) 719-0101</span>
          </div>

          <div>
            <span className="text-[#635e57] block mb-1">STATION LOCATION //</span>
            <span className="text-[#f5efeb]">Bennett University, Greater Noida, 201310</span>
          </div>

          <div>
            <span className="text-[#635e57] block mb-1">OBSERVATION WINDOW //</span>
            <span className="text-[#f5efeb]">Weekdays 18:00 - 23:00 // Nights 21:00 - 03:00</span>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 4. COLOSSAL WORDMARK: ASTRONOMYBU (Over the Lunar Horizon)   */}
        {/* ------------------------------------------------------------ */}
        <div className="w-full pt-8 sm:pt-14 pb-4 overflow-hidden select-none">
          <div className="w-full text-center">
            <span className="w-full font-editorial-serif italic tracking-tighter text-[clamp(4.2rem,16.5vw,18.5rem)] text-[#eae5d9]/95 leading-[0.8] block drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              ASTRONOMYBU
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 5. SUB-FOOTER: COPYRIGHT & SOCIALS                           */}
        {/* ------------------------------------------------------------ */}
        <div className="pt-6 border-t border-[rgba(245,239,235,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8a847a]">
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
