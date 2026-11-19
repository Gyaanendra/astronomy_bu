import Image from "next/image";
import Link from "next/link";

interface JournalEntry {
  date: string;
  title: string;
  type: string;
  description: string;
  image: string;
  href: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    date: "22.03\n26",
    title: "EVENING OF THE\nSEVEN SISTERS",
    type: "Meeting",
    description:
      "A gathering exploring the myths of the Pleiades, with discussion, storytelling, and shared observation under the dome.",
    image: "/images/assets/journal-gathering.jpg",
    href: "/events",
  },
  {
    date: "05.04\n26",
    title: "LUNAR WORKSHOP: CYCLES\nAND SYMBOLISM",
    type: "Workshop",
    description:
      "A small group session focused on lunar phases, symbolism, and cultural meanings, paired with sketching and discussion.",
    image: "/images/assets/journal-workshop.jpg",
    href: "/events",
  },
  {
    date: "15.04-23.05\n26",
    title: "OPEN CALL: STAR MAPS\nREIMAGINED",
    type: "Open call",
    description:
      "Inviting creatives to submit reinterpretations of historic star maps, bridging archival imagery with personal narrative.",
    image: "/images/assets/journal-open-call.jpg",
    href: "/events",
  },
];

export function JournalSection() {
  return (
    <section
      id="journal"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 sm:mb-14 gap-8">
          <div>
            <h2 className="font-editorial-serif italic text-4xl sm:text-6xl xl:text-7xl text-[#f5efeb] tracking-tight">
              JOURNAL
            </h2>
          </div>

          <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-md md:text-right">
            Traces and reflections from Noctra&apos;s gatherings — public meetings, discussions, and collaborations that unfold beneath the night sky.
          </p>
        </div>

        {/* Editorial Rows with top and bottom borders */}
        <div className="border-t border-b border-[rgba(245,239,235,0.12)] divide-y divide-[rgba(245,239,235,0.12)]">
          {JOURNAL_ENTRIES.map((entry) => (
            <Link
              key={entry.title}
              href={entry.href}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center group hover:bg-[rgba(255,255,255,0.02)] px-2 sm:px-4 transition-all duration-300"
            >
              {/* Col 1: Thumbnail Photo (2 cols) */}
              <div className="md:col-span-2">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#111113] overflow-hidden">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    className="object-cover filter contrast-110 brightness-90 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                    sizes="112px"
                  />
                </div>
              </div>

              {/* Col 2: Date (1 col) */}
              <div className="md:col-span-1 font-mono text-sm tracking-wide text-[#f5efeb] whitespace-pre-line leading-tight">
                {entry.date}
              </div>

              {/* Col 3: Title & Category (4 cols) */}
              <div className="md:col-span-4">
                <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase group-hover:text-[#eae5d9] transition-colors whitespace-pre-line leading-relaxed">
                  {entry.title}
                </h3>
                <span className="font-mono text-[11px] text-[#8a847a] mt-3 block">
                  {entry.type}
                </span>
              </div>

              {/* Col 4: Description (4 cols) */}
              <div className="md:col-span-4">
                <p className="font-sans text-xs text-[#a39e93] leading-relaxed max-w-md">
                  {entry.description}
                </p>
              </div>

              {/* Col 5: Arrow Link (1 col) */}
              <div className="md:col-span-1 flex justify-end">
                <span className="w-12 h-12 sm:w-14 sm:h-14 border border-[rgba(245,239,235,0.2)] flex items-center justify-center font-mono text-sm sm:text-base text-[#f5efeb] group-hover:border-[#f5efeb] group-hover:text-white transition-colors">
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
