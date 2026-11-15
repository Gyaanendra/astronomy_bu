import Image from "next/image";
import Link from "next/link";
import { StippleCanvas } from "@/components/ui/stipple-canvas";
import { MilkyWayBand } from "@/components/ui/milky-way-band";

export function HeroSection() {
  return (
    <section
      id="sanctuary"
      className="relative w-full flex flex-col justify-between border-b border-[rgba(245,239,235,0.08)] pt-8 sm:pt-12 pb-12 sm:pb-20 overflow-hidden bg-[#09090b]"
    >
      {/* Background Interactive Stipple Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <StippleCanvas density={120} />
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 flex-1 flex flex-col justify-between relative z-10">
        {/* ============================================================== */}
        {/* 1. TOP METADATA ROW (Pinterest Desktop Reference 2 & 7)        */}
        {/* ============================================================== */}
        <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-6 font-mono text-[10px] sm:text-[11px] xl:text-xs tracking-[0.18em] uppercase pt-2">
          {/* Upper Left: Philosophical Inquiry & Bennett Telemetry */}
          <div className="max-w-md text-[#f5efeb]/85 leading-relaxed space-y-1">
            <p>
              An inquiry into pattern-making in the sky, and what it means when structure breaks or disappears.
            </p>
            <p className="text-[#8a847a] text-[10px]">
              Bennett University Observatory Archive · Station 28.4595° N, 77.5046° E
            </p>
          </div>

          {/* Upper Right: Club Disciplines & Telemetry */}
          <div className="text-left sm:text-right text-[#a39e93] leading-relaxed flex flex-col space-y-0.5">
            <span className="text-[#f5efeb]">SYMBOLS &amp; MEANING</span>
            <span>CONSTELLATIONS</span>
            <span>IN-DEPTH</span>
            <span className="text-[#8a847a]">GREATER NOIDA · 60 MIN</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. MAIN HERO STAGE: Floating Astral Figure + Headline + CTA    */}
        {/* ============================================================== */}
        <div className="relative w-full my-auto py-12 sm:py-20 lg:py-28">
          {/* Floating Luminous Astral Entity (Center-Right in Void) */}
          <div
            aria-hidden="true"
            className="absolute right-[4%] sm:right-[12%] lg:right-[18%] xl:right-[22%] top-1/2 -translate-y-[60%] w-[260px] sm:w-[400px] lg:w-[500px] xl:w-[580px] h-[340px] sm:h-[480px] lg:h-[600px] xl:h-[680px] pointer-events-none select-none z-10 animate-float-celestial"
          >
            <div className="absolute inset-0 bg-radial from-[rgba(245,239,235,0.18)] via-transparent to-transparent rounded-full blur-3xl" />
            <Image
              src="/images/assets/astral-entity-nobg.png"
              alt="Celestial Astral Figure Floating in Zero Gravity"
              fill
              priority
              className="object-contain filter drop-shadow-[0_0_40px_rgba(245,239,235,0.3)]"
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 400px, (max-width: 1536px) 520px, 580px"
            />
          </div>

          {/* Massive Display Headline & Aligned CTA (Pinterest Reference 2 & 7) */}
          <div className="relative z-20 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
            <div className="max-w-5xl">
              <h1 className="font-editorial-serif italic text-[clamp(3.4rem,10.5vw,10.8rem)] tracking-tight text-[#f5efeb] leading-[0.88] select-none">
                <span className="block whitespace-nowrap">CONSTELLATIONS</span>
                <span className="block whitespace-nowrap text-[#eae5d9] mt-2 sm:mt-4">
                  AND ABSENCE
                </span>
              </h1>
            </div>

            {/* Date & Solid Bone Button (Right-aligned next to Headline) */}
            <div className="flex flex-col items-start lg:items-end gap-3.5 font-mono z-30 pb-2">
              <span className="text-xs sm:text-[13px] tracking-[0.2em] text-[#f5efeb] uppercase font-semibold">
                12.06 — 17.08 2026
              </span>
              <Link
                href="/calendar"
                className="px-8 sm:px-11 py-3 sm:py-4 bg-[#eae5d9] text-[#09090b] text-xs tracking-archival font-semibold uppercase hover:bg-white transition-colors shadow-2xl block text-center"
              >
                BUY TICKET
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TRANSITIONAL PHILOSOPHICAL QUOTE & MILKY WAY WAVE           */}
      {/* (Pinterest Desktop Reference 2: Exactly between Hero & Structure) */}
      {/* ============================================================== */}
      <div className="w-full pt-8 sm:pt-16 pb-4 sm:pb-8 relative z-20">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <p className="font-mono text-[11px] sm:text-xs xl:text-[13px] tracking-[0.18em] text-[#eae5d9]/90 uppercase leading-relaxed sm:leading-loose">
            Constellations are not inherent to the sky — they are constructed, drawn between distant points to create continuity where none exists. Across cultures, these patterns have served as tools for navigation, storytelling, and orientation.
          </p>
        </div>

        {/* Full-bleed Stippled Milky Way Galactic Stream Canvas */}
        <MilkyWayBand className="mt-4 sm:mt-6 mb-0" />
      </div>
    </section>
  );
}
