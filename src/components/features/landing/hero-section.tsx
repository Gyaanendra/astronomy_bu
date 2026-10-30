import Link from "next/link";
import { StippleCanvas } from "@/components/ui/stipple-canvas";
import { MilkyWayBand } from "@/components/ui/milky-way-band";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100dvh-5rem)] flex flex-col justify-between border-b border-[rgba(245,239,235,0.1)] py-[clamp(2.5rem,5vh,5.5rem)] px-6 sm:px-12 lg:px-16 overflow-hidden bg-[#09090b]">
      {/* Background Interactive Stipple Dust Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <StippleCanvas density={120} />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Top Editorial Metadata Banner with generous spacing */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-[clamp(1.5rem,3vh,3rem)] text-[10px] sm:text-[11px] font-mono tracking-archival text-[#a39e93]/80 border-b border-[rgba(245,239,235,0.08)]">
          <span className="text-left max-w-md uppercase">
            An inquiry into pattern-making in the sky, and what it means when structure breaks
          </span>
          <span className="text-right uppercase">
            Tenure 2025–2026 // Expeditions · Research · Telemetry
          </span>
        </div>

        {/* Grand Editorial Display Title with Proportional Sizing */}
        <div className="my-[clamp(2.5rem,6vh,5rem)] max-w-6xl w-full flex flex-col items-center">
          <h1 className="font-editorial-serif italic text-[clamp(3.2rem,8.2vw,9.2rem)] tracking-tight text-[#f5efeb] leading-[0.92] stipple-glow">
            OBSERVING CULTURE
          </h1>
          <h2 className="font-editorial-serif italic text-[clamp(2.6rem,6.8vw,7.8rem)] tracking-tight text-[#eae5d9] leading-[0.92] mt-1 sm:mt-2">
            IN THE NIGHT SKY
          </h2>

          <p className="mt-8 font-mono text-[11px] sm:text-xs tracking-archival text-[#a39e93] uppercase">
            Bennett University&apos;s Living Archive of Celestial Narratives
          </p>

          {/* Minimalist CTA Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
            <Link
              href="/calendar"
              className="px-7 py-3 bg-[#eae5d9] text-[#09090b] font-mono text-[11px] tracking-archival font-semibold uppercase hover:bg-white transition-colors"
            >
              Cosmic Calendar [05]
            </Link>
            <Link
              href="/events"
              className="px-6 py-3 border border-[rgba(245,239,235,0.2)] text-[#f5efeb] font-mono text-[11px] tracking-archival uppercase hover:border-[#f5efeb] hover:bg-[#18181b] transition-all flex items-center gap-2"
            >
              <span>Tenure Chronicles</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#a39e93]" />
            </Link>
          </div>
        </div>

        {/* Typographic Manifesto Statement with Airy Negative Space */}
        <div className="max-w-4xl text-center px-6 my-[clamp(2rem,4vh,3.5rem)]">
          <p className="font-mono text-xs sm:text-sm tracking-[0.16em] text-[#f5efeb]/80 leading-relaxed uppercase">
            CONSTELLATIONS ARE NOT INHERENT TO THE SKY — THEY ARE CONSTRUCTED,
            DRAWN BETWEEN DISTANT POINTS TO CREATE CONTINUITY WHERE NONE EXISTS. ACROSS
            CULTURES, THESE PATTERNS HAVE SERVED AS TOOLS FOR NAVIGATION, STORYTELLING,
            AND ORIENTATION.
          </p>
        </div>

        {/* Full-Bleed Celestial Milky Way Pointillist Stipple Band (Matching Image 3) */}
        <div className="w-full">
          <MilkyWayBand />
        </div>
      </div>
    </section>
  );
}
