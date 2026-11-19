import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  type: string;
  description: string;
  image: string;
  href: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "01",
    date: "22.03 26",
    title: "EVENING OF THE SEVEN SISTERS",
    type: "Meeting",
    description:
      "A gathering exploring the myths of the Pleiades, with discussion, storytelling, and shared telescope observation under the open skies.",
    image: "/cool1.png",
    href: "/events",
  },
  {
    id: "02",
    date: "05.04 26",
    title: "LUNAR WORKSHOP: CYCLES AND SYMBOLISM",
    type: "Workshop",
    description:
      "A small group session focused on lunar phases, CMOS sensor calibration, and cultural meanings paired with sketching and telescope observation.",
    image: "/images/assets/lunar-crater-master.jpg",
    href: "/events",
  },
  {
    id: "03",
    date: "15.04 - 23.05 26",
    title: "OPEN CALL: STAR MAPS REIMAGINED",
    type: "Open call",
    description:
      "Inviting creatives to submit reinterpretations of historic celestial charts, bridging archival astrometry with speculative personal narratives.",
    image: "/images/assets/constellations-chart-master.jpg",
    href: "/events",
  },
  {
    id: "04",
    date: "22.01 26",
    title: "ASTROPHOTOGRAPHY WORKSHOP 4.0",
    type: "Workshop",
    description:
      "Hands-on night-sky shoot at Bennett Cricket Ground led by special guest Virendra Adhikari. Low-light exposure calibration and guided telescope practice.",
    image: "/cool2.png",
    href: "/events",
  },
  {
    id: "05",
    date: "15.01 26",
    title: "COSMOLOGY 101 EPISODE 2",
    type: "Lecture",
    description:
      "Interactive inquiry into space-time geometry, origin theories, and cosmic web structure with faculty astrophysicists in NLH 101.",
    image: "/images/assets/orion-across-cultures.jpg",
    href: "/events",
  },
];

export function JournalSection() {
  return (
    <section
      id="journal"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header Row (Pinterest Reference 5 Bottom-Left) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 sm:pb-12 border-b border-[rgba(245,239,235,0.12)] gap-8">
          <div>
            <h2 className="font-editorial-serif italic text-4xl sm:text-6xl xl:text-7xl text-[#f5efeb] tracking-tight">
              JOURNAL
            </h2>
          </div>

          <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-xl md:text-right uppercase">
            Traces and reflections from AstronomyBU&apos;s gatherings — public meetings, discussions, and collaborations that unfold beneath the night sky.
          </p>
        </div>

        {/* Editorial Rows (Matching Image 5 Bottom-Left) */}
        <div className="divide-y divide-[rgba(245,239,235,0.1)] border-b border-[rgba(245,239,235,0.1)] my-8">
          {JOURNAL_ENTRIES.map((entry) => (
            <Link
              key={entry.id}
              href={entry.href}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-[#111113] px-2 sm:px-6 transition-all duration-300"
            >
              {/* Col 1: Thumbnail Photo (2 Cols) */}
              <div className="md:col-span-2">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 border border-[rgba(245,239,235,0.15)] bg-[#111113] overflow-hidden flex items-center justify-center p-1 shadow-lg">
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      className="object-cover filter contrast-110 brightness-95 group-hover:brightness-110"
                    />
                  </div>
                </div>
              </div>

              {/* Col 2: Date (2 Cols) */}
              <div className="md:col-span-2 font-mono text-xs tracking-archival text-[#8a847a]">
                {entry.date}
              </div>

              {/* Col 3: Title & Category (4 Cols) */}
              <div className="md:col-span-4">
                <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase group-hover:text-[#eae5d9] transition-colors mb-1">
                  {entry.title}
                </h3>
                <span className="font-mono text-[10px] text-[#8a847a] uppercase">
                  {entry.type}
                </span>
              </div>

              {/* Col 4: Description (3 Cols) */}
              <div className="md:col-span-3">
                <p className="font-sans text-xs text-[#a39e93] leading-relaxed line-clamp-3">
                  {entry.description}
                </p>
              </div>

              {/* Col 5: Arrow Link (1 Col) */}
              <div className="md:col-span-1 flex justify-end">
                <span className="font-mono text-sm text-[#8a847a] group-hover:text-[#f5efeb] transition-colors">
                  [ ↗ ]
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
