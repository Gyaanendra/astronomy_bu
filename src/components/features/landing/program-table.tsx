import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { eventsRegistry } from "@/content/events/events-registry";

export function ProgramTable() {
  const featuredPrograms = eventsRegistry.slice(0, 5);

  return (
    <section className="w-full border-b border-[rgba(245,239,235,0.12)] bg-[#09090b] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[rgba(245,239,235,0.15)]">
          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#a39e93] block mb-2">
              CURATED OBSERVATIONAL EXPEDITIONS
            </span>
            <h2 className="font-editorial-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#f5efeb]">
              Programs &amp; Expeditions
            </h2>
          </div>
          <p className="font-mono text-xs tracking-wide text-[#a39e93] max-w-sm sm:text-right">
            Sessions exploring orbital mechanics, low-light astrophotography, and deep space inquiry.
          </p>
        </div>

        {/* Tabular Rows */}
        <div className="divide-y divide-[rgba(245,239,235,0.1)] border-b border-[rgba(245,239,235,0.1)]">
          {featuredPrograms.map((event, index) => (
            <div
              key={event.id}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-[#111113] px-2 sm:px-4 transition-all duration-300"
            >
              {/* Col 1: Meta Tag */}
              <div className="md:col-span-2 flex flex-col font-mono text-[11px] text-[#a39e93]">
                <span className="text-[#635e57]">[{String(index + 1).padStart(2, "0")}]</span>
                <span className="uppercase text-[#eae5d9] font-medium mt-1">
                  {event.category}
                </span>
                <span className="text-[#635e57] text-[10px] mt-0.5">{event.date}</span>
              </div>

              {/* Col 2: Title & Arrow */}
              <div className="md:col-span-4">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 group-hover:text-[#eae5d9] transition-colors"
                >
                  <h3 className="font-mono text-sm sm:text-base font-semibold tracking-wider text-[#f5efeb] uppercase">
                    {event.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#635e57] group-hover:text-[#eae5d9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                {event.guest && (
                  <p className="font-mono text-[11px] text-[#d4af37] mt-1">
                    Guest Keynote: {event.guest}
                  </p>
                )}
              </div>

              {/* Col 3: Description */}
              <div className="md:col-span-4">
                <p className="font-sans text-xs text-[#a39e93] leading-relaxed line-clamp-2">
                  {event.description}
                </p>
              </div>

              {/* Col 4: Thumbnail Preview */}
              <div className="md:col-span-2 flex justify-start md:justify-end">
                <div className="relative w-24 h-16 sm:w-28 sm:h-18 border border-[rgba(245,239,235,0.15)] overflow-hidden bg-[#18181b]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-block px-8 py-3.5 bg-[#eae5d9] text-[#09090b] font-mono text-xs tracking-archival font-semibold uppercase hover:bg-white transition-colors"
          >
            All Programs &amp; Full Archive [↗]
          </Link>
        </div>
      </div>
    </section>
  );
}

