"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface JournalEntry {
  dateTop: string;
  dateBottom: string;
  title: string;
  type: string;
  description: string;
  image: string;
  href: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    dateTop: "22.03",
    dateBottom: "26",
    title: "EVENING OF THE\nSEVEN SISTERS",
    type: "Meeting",
    description:
      "A gathering exploring the myths of the Pleiades, with discussion, storytelling, and shared observation under the dome.",
    image: "/images/assets/journal-gathering.jpg",
    href: "/events",
  },
  {
    dateTop: "05.04",
    dateBottom: "26",
    title: "LUNAR WORKSHOP: CYCLES\nAND SYMBOLISM",
    type: "Workshop",
    description:
      "A small group session focused on lunar phases, symbolism, and cultural meanings, paired with sketching and discussion.",
    image: "/images/assets/journal-workshop.jpg",
    href: "/events",
  },
  {
    dateTop: "15.04-23.05",
    dateBottom: "26",
    title: "OPEN CALL: STAR MAPS\nREIMAGINED",
    type: "Open call",
    description:
      "Inviting creatives to submit reinterpretations of historic star maps, bridging archival imagery with personal narrative.",
    image: "/images/assets/journal-open-call.jpg",
    href: "/events",
  },
];

export function JournalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (
        !containerRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const validRows = rowsRef.current.filter(Boolean);
      if (validRows.length > 0) {
        gsap.fromTo(
          validRows,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="journal"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-20 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-24 border-t border-[rgba(245,239,235,0.12)] selection:bg-[#eae5d9] selection:text-[#1D1D1D]"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header Row: JOURNAL on left, subtitle on right */}
        <div className="flex flex-col md:flex-row md:items-start justify-between pb-8 sm:pb-12 gap-6">
          <h2 className="font-editorial-serif italic text-5xl sm:text-6xl lg:text-7xl text-[#f5efeb] tracking-tight leading-none">
            JOURNAL
          </h2>

          <p className="font-mono text-xs sm:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-sm md:text-right">
            Traces and reflections from Noctra&apos;s gatherings — public
            meetings, discussions, and collaborations that unfold beneath the
            night sky.
          </p>
        </div>

        {/* Minimalist Editorial Rows with hairline top & bottom borders */}
        <div className="border-t border-b border-[rgba(245,239,235,0.14)] divide-y divide-[rgba(245,239,235,0.14)]">
          {JOURNAL_ENTRIES.map((entry, idx) => (
            <Link
              key={entry.title}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              href={entry.href}
              className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch group hover:bg-[rgba(245,239,235,0.02)] transition-colors duration-300"
            >
              {/* Col 1: Thumbnail Photo (md:col-span-2) */}
              <div className="md:col-span-2 flex items-center">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-[#141416] overflow-hidden border border-[rgba(245,239,235,0.08)]">
                  <Image
                    src={entry.image}
                    alt={entry.title.replace("\n", " ")}
                    fill
                    sizes="(max-width: 768px) 112px, 144px"
                    className="object-cover grayscale contrast-115 brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Col 2: Date (md:col-span-2) */}
              <div className="md:col-span-2 flex flex-col justify-start md:items-end pr-0 md:pr-8 font-mono text-sm sm:text-base tracking-wider text-[#f5efeb] leading-tight">
                <span>{entry.dateTop}</span>
                <span className="text-[#a39e93] mt-0.5">{entry.dateBottom}</span>
              </div>

              {/* Col 3: Title & Category (md:col-span-4) with Left Vertical Border Line */}
              <div className="md:col-span-4 flex flex-col justify-between pl-0 md:pl-8 md:border-l border-[rgba(245,239,235,0.14)]">
                <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase whitespace-pre-line leading-relaxed group-hover:text-white transition-colors">
                  {entry.title}
                </h3>
                <span className="font-mono text-[11px] text-[#8a847a] mt-6 sm:mt-10 block">
                  {entry.type}
                </span>
              </div>

              {/* Col 4: Description & Minimalist [ ↗ ] Arrow (md:col-span-4) */}
              <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end text-left md:text-left">
                <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed max-w-sm">
                  {entry.description}
                </p>

                <div className="mt-8 sm:mt-12 flex justify-start md:justify-end w-full">
                  <span className="font-mono text-2xl sm:text-3xl text-[#f5efeb] tracking-widest group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 select-none">
                    [ ↗ ]
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
