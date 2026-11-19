import Image from "next/image";

export function StructureSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-16 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* 4-Column Asymmetric Fluid Grid Matching Reference Screenshot Exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-start">
          
          {/* Column 01: STRUCTURE Title & Subtitle (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <h2 className="font-editorial-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#f5efeb] tracking-tight mb-4 sm:mb-6">
              STRUCTURE
            </h2>
            <p className="font-sans text-xs sm:text-[13px] text-[#a39e93] leading-relaxed max-w-xs">
              This program considers what happens when the structures dissolve: when stars dim, when patterns are forgotten, or when the act of connecting them is interrupted.
            </p>
          </div>

          {/* Column 02: 01 PATTERN AND IMPOSITION (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start lg:pt-20 xl:pt-24">
            <div className="border-t border-[rgba(245,239,235,0.18)] pt-6 sm:pt-7">
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
                  Different traditions map different skies, yet all rely on the same impulse: to reduce vastness into something readable.
                </p>
              </div>
            </div>
          </div>

          {/* Column 03: Portrait Eclipse Artwork (3 cols) */}
          <div className="lg:col-span-3 flex justify-center py-4 lg:py-0">
            <div className="relative w-full max-w-[340px] lg:max-w-none aspect-[3/4.4] bg-[#111113] overflow-hidden shadow-2xl">
              <Image
                src="/images/assets/structure-eclipse.jpg"
                alt="Total solar eclipse coronal halo over volumetric cloudscape"
                fill
                priority
                className="object-cover filter contrast-110 brightness-95"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </div>

          {/* Column 04: 02 ABSENCE AND DISRUPTION (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start lg:pt-20 xl:pt-24">
            <div className="border-t border-[rgba(245,239,235,0.18)] pt-6 sm:pt-7">
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
                  In this state, the sky returns to fragments—points without connection, presence without narrative.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
