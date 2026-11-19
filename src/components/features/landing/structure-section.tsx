import Image from "next/image";

export function StructureSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] py-16 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Top Header Row (Matching Reference) */}
        <div className="pb-10 sm:pb-14 max-w-xl">
          <h2 className="font-editorial-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#f5efeb] tracking-tight mb-4">
            STRUCTURE
          </h2>
          <p className="font-sans text-xs sm:text-[13px] text-[#a39e93] leading-relaxed">
            This program considers what happens when the structures dissolve: when stars dim, when patterns are forgotten, or when the act of connecting them is interrupted. AstronomyBU is Bennett University&apos;s premier celestial collective, exploring the boundary between ancient constellations and modern astrophysics.
          </p>
        </div>

        {/* 3-Column Fluid Layout: Column 01, Center Eclipse Cloudscape, Column 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start pt-4 sm:pt-6">
          {/* Column 01: Pattern and Imposition (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-6 border-t border-[rgba(245,239,235,0.18)]">
            <span className="font-mono text-xs sm:text-[13px] text-[#8a847a] block mb-4">
              01
            </span>

            <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-4 sm:mb-5">
              PATTERN AND IMPOSITION
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-[13px] text-[#a39e93] leading-relaxed">
              <p>
                To form a constellation is to impose order onto distance. Lines are imagined, not seen—linking points into figures that feel stable, but remain entirely constructed.
              </p>
              <p>
                Founded at Bennett University (Station 28.4595° N, 77.5046° E), AstronomyBU unites students across engineering, computing, and physical sciences. Through 8-inch Dobsonian optical telemetry, nocturnal observation camps, and astrophotography sensor arrays, we explore how human traditions map the sky to reduce vastness into readable wonder.
              </p>
            </div>
          </div>

          {/* Center Column: Portrait Solar Eclipse in Storm Clouds (4 Cols) */}
          <div className="lg:col-span-4 flex justify-center py-4 lg:py-0">
            <div className="relative w-full max-w-[380px] aspect-[3/4] border border-[rgba(245,239,235,0.15)] bg-[#111113] overflow-hidden shadow-2xl group">
              <Image
                src="/images/assets/eclipse-cloudscape.jpg"
                alt="Solar eclipse crescent shining through dark stormy cloudscapes"
                fill
                priority
                className="object-cover filter contrast-115 brightness-95 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D]/70 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Column 02: Absence and Disruption (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-6 border-t border-[rgba(245,239,235,0.18)]">
            <span className="font-mono text-xs sm:text-[13px] text-[#8a847a] block mb-4">
              02
            </span>

            <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-4 sm:mb-5">
              ABSENCE AND DISRUPTION
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-[13px] text-[#a39e93] leading-relaxed">
              <p>
                Absence enters when these systems fail—when visibility changes, when knowledge is lost, or when the sky no longer aligns with inherited meaning. What was once structured becomes uncertain, and orientation gives way to ambiguity.
              </p>
              <p>
                In this state, the sky returns to fragments—points without connection, presence without narrative. Through high-resolution planetary imaging, lunar topography workshops, and dark-sky field gatherings beyond Greater Noida, AstronomyBU ventures into the quiet cosmic voids where genuine discovery begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
