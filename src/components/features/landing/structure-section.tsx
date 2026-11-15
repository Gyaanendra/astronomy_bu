import Image from "next/image";

export function StructureSection() {
  return (
    <section
      id="structure"
      className="w-full bg-[#09090b] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Top Header Row (Pinterest Reference 2 & 7) */}
        <div className="pb-12 sm:pb-16 max-w-xl">
          <h2 className="font-editorial-serif italic text-4xl sm:text-6xl text-[#f5efeb] tracking-tight mb-4">
            STRUCTURE
          </h2>
          <p className="font-sans text-xs sm:text-[13px] text-[#a39e93] leading-relaxed">
            This program considers what happens when the structures dissolve: when stars dim, when patterns are forgotten, or when the act of connecting them is interrupted.
          </p>
        </div>

        {/* 3-Column Fluid Layout: Column 01, Center Eclipse Cloudscape, Column 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start pt-6">
          
          {/* Column 01: Pattern and Imposition (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-6 border-t border-[rgba(245,239,235,0.18)]">
            <span className="font-mono text-xs sm:text-[13px] text-[#8a847a] block mb-4">
              01
            </span>
            
            <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-5">
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

          {/* Center Column: Portrait Solar Eclipse in Storm Clouds (4 Cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[3/4] border border-[rgba(245,239,235,0.15)] bg-[#111113] overflow-hidden group shadow-2xl">
              <Image
                src="/images/assets/eclipse-cloudscape.jpg"
                alt="Solar eclipse crescent through dark stormy clouds"
                fill
                className="object-cover filter contrast-115 brightness-95 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>

          {/* Column 02: Absence and Disruption (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-6 border-t border-[rgba(245,239,235,0.18)]">
            <span className="font-mono text-xs sm:text-[13px] text-[#8a847a] block mb-4">
              02
            </span>

            <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-5">
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
    </section>
  );
}
