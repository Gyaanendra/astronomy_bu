"use client";

import { MilkyWayBand } from "@/components/ui/milky-way-band";

export function HeroTransition() {
  return (
    <section className="w-full bg-[#1D1D1D] pt-12 sm:pt-20 pb-8 sm:pb-12 border-b border-[rgba(245,239,235,0.08)] relative z-20 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono text-[11px] sm:text-xs xl:text-[13px] tracking-[0.18em] text-[#eae5d9]/90 uppercase leading-relaxed sm:leading-loose">
          Constellations are not inherent to the sky — they are constructed, drawn between distant points to create continuity where none exists. Across cultures, these patterns have served as tools for navigation, storytelling, and orientation.
        </p>
      </div>

      {/* Full-bleed Stippled Milky Way Galactic Stream Canvas */}
      <MilkyWayBand className="mt-6 sm:mt-8 mb-0" />
    </section>
  );
}
