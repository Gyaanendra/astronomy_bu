import Image from "next/image";
import Link from "next/link";

interface Artifact {
  title: string;
  description: string;
  image: string;
}

const ARTIFACTS: Artifact[] = [
  {
    title: "EGYPTIAN SUNDIALS",
    description:
      "Early Egyptian timekeeping devices that used the movement of shadows to structure daily life and ritual.",
    image: "/images/assets/archive-egyptian-sundial.jpg",
  },
  {
    title: "NEBRA SKY DISK ARTIFACT",
    description:
      "A Bronze Age artifact depicting one of the earliest known visual representations of the night sky and celestial alignment.",
    image: "/images/assets/archive-nebra-sky-disk.jpg",
  },
  {
    title: "METEORITES IN HISTORY",
    description:
      "Accounts of meteorite falls across cultures, often interpreted as omens, divine messages, or disruptions of the natural order.",
    image: "/images/assets/archive-meteorite.jpg",
  },
  {
    title: "AZTEC SUN STONE DISK",
    description:
      "A monumental carved disk representing cyclical time, cosmology, and the movement of the sun.",
    image: "/images/assets/archive-aztec-sun-stone.jpg",
  },
  {
    title: "EARLY STAR CARTOGRAPHY",
    description:
      "The development of star maps as tools for navigation, storytelling, and structuring the visible sky.",
    image: "/images/assets/archive-star-cartography.jpg",
  },
  {
    title: "BABYLONIAN STAR CATALOGUE",
    description:
      "Ancient records that mapped stars and constellations, forming one of the foundations of astronomical observation.",
    image: "/images/assets/archive-babylonian-tablet.jpg",
  },
];

export function ArchiveSection() {
  return (
    <section
      id="archive"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 sm:mb-16 gap-8">
          <div>
            <h2 className="font-editorial-serif italic text-4xl sm:text-6xl xl:text-7xl text-[#f5efeb] tracking-tight">
              ARCHIVE
            </h2>
          </div>

          <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-md md:text-right">
            A curated collection of celestial references—myths, symbols, and visual fragments that trace how the night sky has been interpreted across cultures.
          </p>
        </div>

        {/* 6-Artifact Horizontal Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 mb-14">
          {ARTIFACTS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col group"
            >
              {/* Square artifact photo */}
              <div className="relative w-full aspect-square bg-[#111113] overflow-hidden mb-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>

              {/* Thin divider line between photo and text */}
              <div className="border-t border-[rgba(245,239,235,0.18)] pt-4 mb-2">
                <h3 className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-[#f5efeb] uppercase mb-2 leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="font-sans text-[11px] text-[#a39e93] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link
            href="/events"
            className="inline-block px-10 sm:px-14 py-3.5 bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs tracking-archival font-semibold uppercase hover:bg-white transition-colors shadow-lg"
          >
            ALL ARCHIVE POSTS
          </Link>
        </div>
      </div>
    </section>
  );
}
