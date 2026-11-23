import Link from "next/link";
import Image from "next/image";
import { CLUB_INFO } from "@/lib/constants";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full min-h-[755px] lg:h-[755px] lg:max-h-[755px] flex flex-col justify-end bg-[#1D1D1D] text-[#f5efeb] overflow-hidden"
    >
      <div id="newsletter" className="absolute top-0 pointer-events-none" />
      {/* ============================================================== */}
      {/* 1. BACKGROUND ARTWORK: Behance Lunar Illustration (1920x755)   */}
      {/* Pure, 100% unobstructed view of the astronaut & celestial peaks*/}
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
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#1D1D1D] via-[#1D1D1D]/80 to-transparent pointer-events-none" />

        {/* Bottom Contrast Scrim: Ensures the colossal wordmark and copyright pop with 100% contrast */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1D1D1D] via-[#1D1D1D]/75 to-transparent pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND: Clean Wordmark & Essential Sub-Footer           */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 pb-6 sm:pb-8 flex flex-col justify-end">
        {/* Category Jump Navigation */}
        <nav className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] tracking-archival uppercase text-[#eae5d9]/80">
          <Link href="/" className="hover:text-white transition-colors">
            [01] Overview
          </Link>
          <Link href="/team" className="hover:text-white transition-colors">
            [02] Members & Heads
          </Link>
          <Link href="/events" className="hover:text-white transition-colors">
            [03] Events & Tenures
          </Link>
          <Link href="/journal" className="hover:text-white transition-colors">
            [04] Blogs & Articles
          </Link>
          <Link href="/calendar" className="hover:text-white transition-colors">
            [05] Cosmic Calendar
          </Link>
        </nav>

        {/* Colossal Brand Wordmark */}
        <div className="w-full overflow-hidden select-none mb-3">
          <span className="w-full font-editorial-serif italic tracking-tighter text-[clamp(4rem,14vw,11rem)] text-[#f5efeb] leading-[0.85] block drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            ASTRONOMYBU
          </span>
        </div>

        {/* Sub-Footer: Telemetry, Copyright & Socials */}
        <div className="pt-3 border-t border-[rgba(245,239,235,0.15)] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#a39e93]">
          {/* Copyright & Inquiries */}
          <div className="flex items-center gap-3">
            <span>
              © {new Date().getFullYear()} ASTRONOMYBU · BENNETT OBSERVATORY
            </span>
            <span className="hidden md:inline text-[#635e57]">/</span>
            <a
              href="mailto:astronomy@bennett.edu.in"
              className="hidden md:inline text-[#f5efeb] hover:underline"
            >
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
    </footer>
  );
}
