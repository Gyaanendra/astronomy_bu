import Link from "next/link";
import Image from "next/image";
import { CLUB_INFO, BENNETT_COORDINATES } from "@/lib/constants";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#09090b] overflow-hidden border-t border-[rgba(245,239,235,0.12)]">
      {/* Full-Width Panoramic Archival Print (Edge-to-Edge 100vw) */}
      <div className="relative w-full aspect-[1376/768] min-h-[520px] md:min-h-0 overflow-hidden">
        {/* Full-Width Background Photograph with Natural White Borders */}
        <Image
          src="/images/observatory_dome_1793346734894.jpg"
          alt="Bennett Archival Observatory Dome"
          fill
          priority
          className="object-cover md:object-fill object-center filter contrast-115 brightness-95"
          sizes="100vw"
        />

        {/* Dark Atmospheric Scrim - Positioned strictly inside the photograph's natural white borders */}
        <div className="absolute top-[5.1%] bottom-[5.1%] left-[2.5%] right-[2.5%] bg-gradient-to-t from-black/85 via-black/55 to-black/35 pointer-events-none" />

        {/* Foreground Editorial Content - Laid out comfortably inside the photo */}
        <div className="absolute top-[5.1%] bottom-[5.1%] left-[2.5%] right-[2.5%] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between text-[#f5efeb]">
          {/* Main Grid: Identity & Index */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Left Column: Identity & Telemetry */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-8 h-10 flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="AstronomyBU Official Logo"
                    fill
                    className="object-contain brightness-125"
                  />
                </div>
                <span className="font-mono text-base sm:text-lg tracking-archival font-bold text-[#f5efeb] uppercase">
                  ASTRONOMY<span className="text-[#a39e93]">BU</span>
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#f5efeb]/90 max-w-lg leading-relaxed">
                Bennett University&apos;s Premier Astronomy Club. An inquiry into pattern-making across the night sky, celestial telemetry, and communal cosmic exploration.
              </p>

              <div className="pt-2 flex flex-col gap-1 text-[11px] sm:text-xs font-mono tracking-wide text-[#a39e93] uppercase">
                <span>STATION: {BENNETT_COORDINATES.name.toUpperCase()}</span>
                <span>COORDINATES: {CLUB_INFO.coordinatesLabel}</span>
                <span>ELEVATION: {BENNETT_COORDINATES.elevationMeters}M MSL</span>
              </div>
            </div>

            {/* Right Column: Archival Index */}
            <div className="md:col-span-5 flex flex-col gap-3 font-mono">
              <span className="text-[#f5efeb] font-semibold tracking-archival text-xs uppercase block pb-1 border-b border-white/20">
                ARCHIVAL INDEX
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-[13px] text-[#eae5d9]">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 hover:text-white underline decoration-white/40 underline-offset-4 transition-colors"
                  >
                    <span className="text-[#635e57]">•</span>
                    <span>[01] Overview &amp; Manifesto</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 hover:text-white underline decoration-white/40 underline-offset-4 transition-colors"
                  >
                    <span className="text-[#635e57]">•</span>
                    <span>[02] Members &amp; Heads</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 hover:text-white underline decoration-white/40 underline-offset-4 transition-colors"
                  >
                    <span className="text-[#635e57]">•</span>
                    <span>[03] Events &amp; Tenures</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calendar"
                    className="inline-flex items-center gap-2 hover:text-white underline decoration-white/40 underline-offset-4 transition-colors"
                  >
                    <span className="text-[#635e57]">•</span>
                    <span>[04] Cosmic Calendar</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/journal"
                    className="inline-flex items-center gap-2 hover:text-white underline decoration-white/40 underline-offset-4 transition-colors"
                  >
                    <span className="text-[#635e57]">•</span>
                    <span>[05] Articles &amp; Field Notes</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Socials & Timestamp */}
          <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#a39e93]">
            <div className="flex items-center gap-5">
              <span className="text-[#635e57] uppercase text-[11px] tracking-wider">
                CONNECT //
              </span>
              <a
                href={CLUB_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f5efeb] transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href={CLUB_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f5efeb] transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={CLUB_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f5efeb] transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

            <span className="text-[11px] text-[#635e57] tracking-wider uppercase">
              EST. {CLUB_INFO.established} · BENNETT HORIZON
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Footer Line Below Image */}
      <div className="w-full bg-[#09090b] py-5 px-6 sm:px-12 border-t border-[rgba(245,239,235,0.08)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#635e57]">
          <span>© {currentYear} ASTRONOMYBU · BENNETT UNIVERSITY. ALL RIGHTS RESERVED.</span>
          <span className="font-sans italic text-[#a39e93]">
            &ldquo;We are a way for the Cosmos to know itself.&rdquo; — Carl Sagan
          </span>
        </div>
      </div>
    </footer>
  );
}
