import Image from "next/image";
import Link from "next/link";

interface Artifact {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ARTIFACTS: Artifact[] = [
  {
    id: "01",
    title: "EGYPTIAN SUNDIALS",
    description:
      "Early Egyptian timekeeping devices that used the movement of shadows to structure daily life and ritual.",
    image: "/images/assets/dome-experience-vortex-nobg.png",
  },
  {
    id: "02",
    title: "NEBRA SKY DISK ARTIFACT",
    description:
      "A Bronze Age artifact depicting one of the earliest known visual representations of the night sky and celestial alignment.",
    image: "/images/assets/celestial-mandala-bone-nobg.png",
  },
  {
    id: "03",
    title: "METEORITES IN HISTORY",
    description:
      "Accounts of meteorite falls across cultures, often interpreted as omens, divine messages, or disruptions of the natural order.",
    image: "/images/assets/cosmic-vortex-nobg.png",
  },
  {
    id: "04",
    title: "AZTEC SUN STONE DISK",
    description:
      "A monumental carved disk representing cyclical time, cosmology, and the movement of the sun.",
    image: "/images/assets/newtons-cenotaph-nobg.png",
  },
  {
    id: "05",
    title: "EARLY STAR CARTOGRAPHY",
    description:
      "The development of star maps as tools for navigation, storytelling, and structuring the visible sky.",
    image: "/images/assets/constellations-chart-bone-nobg.png",
  },
  {
    id: "06",
    title: "BABYLONIAN STAR CATALOGUE",
    description:
      "Ancient records that mapped stars and constellations, forming one of the foundations of astronomical observation.",
    image: "/images/assets/celestial-mechanics-nobg.png",
  },
];

export function ArchiveSection() {
  return (
    <section
      id="archive"
      className="w-full bg-[#09090b] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header Row (Pinterest Reference 5 Top-Right) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 sm:pb-12 border-b border-[rgba(245,239,235,0.12)] gap-8">
          <div>
            <h2 className="font-editorial-serif italic text-4xl sm:text-6xl xl:text-7xl text-[#f5efeb] tracking-tight">
              ARCHIVE
            </h2>
          </div>

          <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-xl md:text-right uppercase">
            A curated collection of celestial references — myths, symbols, and visual fragments that trace how the night sky has been interpreted across cultures.
          </p>
        </div>

        {/* 6-Artifact Horizontal Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[rgba(245,239,235,0.12)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(245,239,235,0.12)] bg-[#09090b] my-10">
          {ARTIFACTS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[380px]"
            >
              <div>
                {/* Floating Artifact Specimen */}
                <div className="relative w-full aspect-square my-4 flex items-center justify-center">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain filter contrast-115 brightness-95"
                      sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                    />
                  </div>
                </div>

                <h3 className="font-mono text-xs font-semibold tracking-wider text-[#f5efeb] uppercase mb-3">
                  {item.title}
                </h3>

                <p className="font-sans text-[11px] text-[#a39e93] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Artifacts Button */}
        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-block px-8 sm:px-12 py-3.5 sm:py-4 border border-[rgba(245,239,235,0.25)] text-[#f5efeb] font-mono text-xs tracking-archival font-semibold uppercase hover:bg-[#f5efeb] hover:text-[#09090b] transition-colors"
          >
            ALL ARCHIVE POSTS
          </Link>
        </div>
      </div>
    </section>
  );
}
