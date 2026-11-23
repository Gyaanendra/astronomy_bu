"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { eventsRegistry } from "@/content/events/events-registry";
import { EventItem } from "@/types/event.types";
import {
  Calendar,
  MapPin,
  User,
  X,
  ChevronDown,
  Share2,
  Clock,
  Tag,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProgramItem {
  id: string;
  title: string;
  dateTop?: string;
  dateBottom?: string;
  duration: string;
  intensity: string;
  theme: string;
  tags: string[];
  description?: string;
  image: string;
  span?: string;
}

const NOCTRA_PROGRAMS: ProgramItem[] = [
  {
    id: "newtons-cenotaph",
    title: "NEWTON'S CENOTAPH",
    dateTop: "09.06-23.08",
    dateBottom: "26",
    duration: "50 MIN",
    intensity: "INTRO",
    theme: "ARCHITECTURE",
    tags: ["50 MIN", "INTRO", "SYMBOLS", "ARCHITECTURE"],
    description:
      "Examines Étienne-Louis Boullée's visionary monument to Newton as a speculative space where architecture and astronomy converge.",
    image: "/images/observatory-dome.jpg",
  },
  {
    id: "constellations-and-absence",
    title: "CONSTELLATIONS AND ABSENCE",
    dateTop: "12.07-30.09",
    dateBottom: "26",
    duration: "75 MIN",
    intensity: "IN-DEPTH",
    theme: "CELESTIAL",
    tags: ["75 MIN", "IN-DEPTH", "MYTHOLOGY", "OBSERVATION"],
    description:
      "A deep inquiry into how human minds construct mythological continuity across unconnected stellar coordinate systems in deep cosmic voids.",
    image: "/images/assets/astral-entity-nobg.png",
  },
  {
    id: "distance-between-stars",
    title: "DISTANCE\nBETWEEN STARS",
    duration: "45 MIN",
    intensity: "INTRO",
    theme: "CELESTIAL",
    tags: ["45 MIN", "CELESTIAL", "PARALLAX"],
    description:
      "Measuring cosmic scale through stellar parallax, standard candles, and trigonometric calibration across galactic voids.",
    image: "/images/assets/archive-babylonian-tablet.png",
  },
  {
    id: "orion-across-cultures",
    title: "ORION ACROSS\nCULTURES",
    duration: "55 MIN",
    intensity: "IN-DEPTH",
    theme: "ARCHAEOLOGY",
    tags: ["55 MIN", "ARCHAEOLOGY", "MYTHOS"],
    description:
      "Cross-cultural comparative analysis of how Vedic, Mesopotamian, and Mayan sky-watchers interpreted the winter hunter asterism.",
    image: "/images/assets/structure-eclipse.jpg",
  },
  {
    id: "phases-of-visibility",
    title: "PHASES OF\nVISIBILITY",
    dateTop: "09.06-23.08",
    dateBottom: "26",
    duration: "60 MIN",
    intensity: "IN-DEPTH",
    theme: "CELESTIAL",
    tags: ["60 MIN", "IN-DEPTH", "CELESTIAL", "PHENOMENA"],
    description:
      "An exploration of how cultures interpret spatial relationships in the night sky, turning distance into narrative and meaning.",
    image: "/images/assets/archive-star-cartography.png",
  },
  {
    id: "venus-dual-nature",
    title: "VENUS:\nDUAL NATURE",
    duration: "40 MIN",
    intensity: "INTRO",
    theme: "PLANETARY",
    tags: ["40 MIN", "PLANETARY", "ATMOSPHERES"],
    description:
      "Exploring the Morning Star and Evening Star: runaway greenhouse thermodynamics, supercritical CO2 atmospheres, and ancient Mesoamerican cycles.",
    image: "/images/assets/archive-nebra-sky-disk.png",
  },
];

export function EventsArchive() {
  const [activeTab, setActiveTab] = useState<"PROGRAMS" | "CAMPUS">("PROGRAMS");
  const [selectedDuration, setSelectedDuration] = useState<string>("ALL");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("ALL");
  const [selectedTheme, setSelectedTheme] = useState<string>("ALL");

  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [intensityDropdownOpen, setIntensityDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const [activeProgramModal, setActiveProgramModal] = useState<ProgramItem | null>(null);
  const [activeCampusModal, setActiveCampusModal] = useState<EventItem | null>(null);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside() {
      setDurationDropdownOpen(false);
      setIntensityDropdownOpen(false);
      setThemeDropdownOpen(false);
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter programs
  const filteredPrograms = NOCTRA_PROGRAMS.filter((p) => {
    const dMatch = selectedDuration === "ALL" || p.duration.includes(selectedDuration);
    const iMatch = selectedIntensity === "ALL" || p.intensity === selectedIntensity;
    const tMatch = selectedTheme === "ALL" || p.theme === selectedTheme;
    return dMatch && iMatch && tMatch;
  });

  // Entrance animations on grid
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (
        !gridRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [activeTab, selectedDuration, selectedIntensity, selectedTheme] }
  );

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#161616] text-[#f5efeb] font-sans selection:bg-[#eae5d9] selection:text-[#1D1D1D]"
    >
      {/* Hero Header with Atmospheric Deep-Space Texture */}
      <div className="relative w-full border-b border-[rgba(245,239,235,0.12)] pt-16 sm:pt-24 pb-14 px-6 sm:px-12 lg:px-20 xl:px-24 overflow-hidden">
        {/* Background Atmospheric Space Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <Image
            src="/images/assets/footer-bg.webp"
            alt="Space atmosphere"
            fill
            className="object-cover object-top filter grayscale contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/40 via-[#161616]/75 to-[#161616]" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto">
          {/* Top Title Row: Giant PROGRAMS on left, Blurb on right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-archival text-[#8a847a] uppercase block mb-3">
                ASTRONOMYBU // DOME SESSIONS &amp; TENURE CHRONICLES
              </span>
              <h1 className="font-editorial-serif text-6xl sm:text-8xl lg:text-9xl tracking-tighter text-[#f5efeb] leading-none uppercase select-none">
                PROGRAMS
              </h1>
            </div>

            <p className="font-mono text-xs sm:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-md lg:text-left uppercase">
              A ROTATING SERIES OF DOME SESSIONS EXPLORING THE NIGHT SKY THROUGH
              NARRATIVE, PROJECTION, AND SOUND.
            </p>
          </div>

          {/* Mode Switcher Tabs + Dropdown Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-[rgba(245,239,235,0.12)]">
            {/* Left: Dropdown Filter Buttons */}
            {activeTab === "PROGRAMS" ? (
              <div
                className="flex flex-wrap items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                {/* DURATION DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setDurationDropdownOpen(!durationDropdownOpen);
                      setIntensityDropdownOpen(false);
                      setThemeDropdownOpen(false);
                    }}
                    className="px-4 py-2 border border-[rgba(245,239,235,0.2)] text-[#f5efeb] font-mono text-[11px] tracking-wider uppercase flex items-center gap-2 hover:border-[#f5efeb] transition-colors cursor-pointer"
                  >
                    <span>
                      {selectedDuration === "ALL"
                        ? "DURATION"
                        : `DURATION: ${selectedDuration}`}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#a39e93]" />
                  </button>

                  {durationDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-40 bg-[#1e1e20] border border-[rgba(245,239,235,0.15)] shadow-xl z-30 py-1 font-mono text-[11px]">
                      {["ALL", "40 MIN", "45 MIN", "50 MIN", "55 MIN", "60 MIN", "75 MIN"].map(
                        (d) => (
                          <button
                            key={d}
                            onClick={() => {
                              setSelectedDuration(d);
                              setDurationDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors uppercase ${
                              selectedDuration === d
                                ? "text-[#d4af37] font-bold"
                                : "text-[#a39e93]"
                            }`}
                          >
                            {d === "ALL" ? "ALL DURATIONS" : d}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* INTENSITY DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIntensityDropdownOpen(!intensityDropdownOpen);
                      setDurationDropdownOpen(false);
                      setThemeDropdownOpen(false);
                    }}
                    className="px-4 py-2 border border-[rgba(245,239,235,0.2)] text-[#f5efeb] font-mono text-[11px] tracking-wider uppercase flex items-center gap-2 hover:border-[#f5efeb] transition-colors cursor-pointer"
                  >
                    <span>
                      {selectedIntensity === "ALL"
                        ? "INTENSITY"
                        : `INTENSITY: ${selectedIntensity}`}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#a39e93]" />
                  </button>

                  {intensityDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-36 bg-[#1e1e20] border border-[rgba(245,239,235,0.15)] shadow-xl z-30 py-1 font-mono text-[11px]">
                      {["ALL", "INTRO", "IN-DEPTH"].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => {
                            setSelectedIntensity(lvl);
                            setIntensityDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors uppercase ${
                            selectedIntensity === lvl
                              ? "text-[#d4af37] font-bold"
                              : "text-[#a39e93]"
                          }`}
                        >
                          {lvl === "ALL" ? "ALL LEVELS" : lvl}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* THEME DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setThemeDropdownOpen(!themeDropdownOpen);
                      setDurationDropdownOpen(false);
                      setIntensityDropdownOpen(false);
                    }}
                    className="px-4 py-2 border border-[rgba(245,239,235,0.2)] text-[#f5efeb] font-mono text-[11px] tracking-wider uppercase flex items-center gap-2 hover:border-[#f5efeb] transition-colors cursor-pointer"
                  >
                    <span>
                      {selectedTheme === "ALL"
                        ? "THEME"
                        : `THEME: ${selectedTheme}`}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#a39e93]" />
                  </button>

                  {themeDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-44 bg-[#1e1e20] border border-[rgba(245,239,235,0.15)] shadow-xl z-30 py-1 font-mono text-[11px]">
                      {["ALL", "ARCHITECTURE", "CELESTIAL", "ARCHAEOLOGY", "PLANETARY"].map(
                        (t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setSelectedTheme(t);
                              setThemeDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors uppercase ${
                              selectedTheme === t
                                ? "text-[#d4af37] font-bold"
                                : "text-[#a39e93]"
                            }`}
                          >
                            {t === "ALL" ? "ALL THEMES" : t}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {(selectedDuration !== "ALL" ||
                  selectedIntensity !== "ALL" ||
                  selectedTheme !== "ALL") && (
                  <button
                    onClick={() => {
                      setSelectedDuration("ALL");
                      setSelectedIntensity("ALL");
                      setSelectedTheme("ALL");
                    }}
                    className="font-mono text-[11px] text-[#8a847a] hover:text-[#f5efeb] underline ml-2"
                  >
                    RESET
                  </button>
                )}
              </div>
            ) : (
              <span className="font-mono text-xs text-[#a39e93]">
                BENNETT CAMPUS CHRONICLES (2023 - 2026)
              </span>
            )}

            {/* Right: Switcher between Curated Dome Programs and Campus Tenure Events */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveTab("PROGRAMS")}
                className={`px-3.5 py-1.5 border transition-all cursor-pointer uppercase tracking-wider text-[11px] ${
                  activeTab === "PROGRAMS"
                    ? "bg-[#eae5d9] text-[#1D1D1D] font-bold border-[#eae5d9]"
                    : "border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb]"
                }`}
              >
                CURATED SESSIONS [06]
              </button>
              <button
                onClick={() => setActiveTab("CAMPUS")}
                className={`px-3.5 py-1.5 border transition-all cursor-pointer uppercase tracking-wider text-[11px] ${
                  activeTab === "CAMPUS"
                    ? "bg-[#eae5d9] text-[#1D1D1D] font-bold border-[#eae5d9]"
                    : "border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb]"
                }`}
              >
                CAMPUS TENURES [{eventsRegistry.length}]
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-10">
        {activeTab === "PROGRAMS" ? (
          /* Exact Asymmetric Mosaic Grid matching the uploaded reference image */
          <div ref={gridRef} className="flex flex-col gap-4 sm:gap-6">
            {/* ROW 1: 2-Card Asymmetric Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Card 1: Newton's Cenotaph (7 cols) */}
              <div
                onClick={() => setActiveProgramModal(NOCTRA_PROGRAMS[0])}
                className="lg:col-span-7 relative min-h-[460px] sm:min-h-[560px] bg-[#0f0f11] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer"
              >
                <Image
                  src={NOCTRA_PROGRAMS[0].image}
                  alt={NOCTRA_PROGRAMS[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center grayscale contrast-125 brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

                {/* Top Header info */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between font-mono text-sm sm:text-base tracking-wider text-[#f5efeb]">
                  <div className="leading-tight">
                    <span>{NOCTRA_PROGRAMS[0].dateTop}</span>
                    <span className="block text-[#a39e93] text-xs mt-0.5">
                      {NOCTRA_PROGRAMS[0].dateBottom}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-mono tracking-widest group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    [ ↗ ]
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wider text-[#f5efeb] uppercase mb-3 leading-snug">
                    {NOCTRA_PROGRAMS[0].title}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed max-w-xl mb-4 font-normal">
                    {NOCTRA_PROGRAMS[0].description}
                  </p>
                  <div className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#8a847a] uppercase flex flex-wrap items-center gap-x-4 gap-y-1">
                    {NOCTRA_PROGRAMS[0].tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Constellations and Absence (5 cols, tall) */}
              <div
                onClick={() => setActiveProgramModal(NOCTRA_PROGRAMS[1])}
                className="lg:col-span-5 relative min-h-[460px] sm:min-h-[560px] bg-[#0c0c0e] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer"
              >
                <Image
                  src={NOCTRA_PROGRAMS[1].image}
                  alt={NOCTRA_PROGRAMS[1].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-center scale-95 group-hover:scale-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                {/* Top Header info */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between font-mono text-sm sm:text-base tracking-wider text-[#f5efeb]">
                  <div className="leading-tight">
                    <span>{NOCTRA_PROGRAMS[1].dateTop}</span>
                    <span className="block text-[#a39e93] text-xs mt-0.5">
                      {NOCTRA_PROGRAMS[1].dateBottom}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-mono tracking-widest group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    [ ↗ ]
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-wider text-[#f5efeb] uppercase mb-2 leading-snug">
                    {NOCTRA_PROGRAMS[1].title}
                  </h2>
                  <p className="font-sans text-xs text-[#a39e93] leading-relaxed mb-3 line-clamp-2">
                    {NOCTRA_PROGRAMS[1].description}
                  </p>
                  <div className="font-mono text-[10px] tracking-wider text-[#8a847a] uppercase flex flex-wrap items-center gap-x-3 gap-y-1">
                    {NOCTRA_PROGRAMS[1].tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: 4-Column Mosaic Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 3: Distance Between Stars */}
              <div
                onClick={() => setActiveProgramModal(NOCTRA_PROGRAMS[2])}
                className="relative aspect-[3/4] bg-[#111113] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer flex flex-col justify-between p-6"
              >
                <Image
                  src={NOCTRA_PROGRAMS[2].image}
                  alt="Distance Between Stars"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

                <div className="relative z-10 flex justify-end">
                  <span className="text-xl font-mono text-[#f5efeb] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    [ ↗ ]
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-mono text-lg sm:text-xl font-semibold tracking-wider text-[#f5efeb] uppercase whitespace-pre-line leading-tight mb-2">
                    {NOCTRA_PROGRAMS[2].title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-wider text-[#8a847a] uppercase flex items-center gap-2">
                    <span>{NOCTRA_PROGRAMS[2].duration}</span>
                    <span>·</span>
                    <span>{NOCTRA_PROGRAMS[2].theme}</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Orion Across Cultures */}
              <div
                onClick={() => setActiveProgramModal(NOCTRA_PROGRAMS[3])}
                className="relative aspect-[3/4] bg-[#111113] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer flex flex-col justify-between p-6"
              >
                <Image
                  src={NOCTRA_PROGRAMS[3].image}
                  alt="Orion Across Cultures"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

                <div className="relative z-10 flex justify-end">
                  <span className="text-xl font-mono text-[#f5efeb] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    [ ↗ ]
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-mono text-lg sm:text-xl font-semibold tracking-wider text-[#f5efeb] uppercase whitespace-pre-line leading-tight mb-2">
                    {NOCTRA_PROGRAMS[3].title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-wider text-[#8a847a] uppercase flex items-center gap-2">
                    <span>{NOCTRA_PROGRAMS[3].duration}</span>
                    <span>·</span>
                    <span>{NOCTRA_PROGRAMS[3].theme}</span>
                  </div>
                </div>
              </div>

              {/* Card 5: Phases of Visibility (Full info overlay) */}
              <div
                onClick={() => setActiveProgramModal(NOCTRA_PROGRAMS[4])}
                className="relative aspect-[3/4] bg-[#111113] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer flex flex-col justify-between p-6"
              >
                <Image
                  src={NOCTRA_PROGRAMS[4].image}
                  alt="Phases of Visibility"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/50" />

                <div className="relative z-10 flex items-start justify-between font-mono text-xs text-[#f5efeb]">
                  <div className="leading-tight">
                    <span>{NOCTRA_PROGRAMS[4].dateTop}</span>
                    <span className="block text-[#a39e93] text-[10px]">
                      {NOCTRA_PROGRAMS[4].dateBottom}
                    </span>
                  </div>
                  <span className="text-xl font-mono text-[#f5efeb] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    [ ↗ ]
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-mono text-base sm:text-lg font-semibold tracking-wider text-[#f5efeb] uppercase whitespace-pre-line leading-snug mb-2">
                    {NOCTRA_PROGRAMS[4].title}
                  </h3>
                  <p className="font-sans text-[11px] text-[#a39e93] leading-relaxed mb-3 line-clamp-3">
                    {NOCTRA_PROGRAMS[4].description}
                  </p>
                  <div className="font-mono text-[9px] tracking-wider text-[#8a847a] uppercase flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    {NOCTRA_PROGRAMS[4].tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 6: Venus: Dual Nature */}
              <div
                onClick={() => setActiveProgramModal(NOCTRA_PROGRAMS[5])}
                className="relative aspect-[3/4] bg-[#111113] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer flex flex-col justify-between p-6"
              >
                <Image
                  src={NOCTRA_PROGRAMS[5].image}
                  alt="Venus: Dual Nature"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

                <div className="relative z-10 flex justify-end">
                  <span className="text-xl font-mono text-[#f5efeb] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    [ ↗ ]
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-mono text-lg sm:text-xl font-semibold tracking-wider text-[#f5efeb] uppercase whitespace-pre-line leading-tight mb-2">
                    {NOCTRA_PROGRAMS[5].title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-wider text-[#8a847a] uppercase flex items-center gap-2">
                    <span>{NOCTRA_PROGRAMS[5].duration}</span>
                    <span>·</span>
                    <span>{NOCTRA_PROGRAMS[5].theme}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Campus Tenures and Historical Chronicles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsRegistry.map((event) => (
              <div
                key={event.id}
                onClick={() => setActiveCampusModal(event)}
                className="relative aspect-[4/3] bg-[#111113] border border-[rgba(245,239,235,0.1)] overflow-hidden group cursor-pointer p-6 flex flex-col justify-between"
              >
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-[#18181b]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/40" />

                <div className="relative z-10 flex items-start justify-between font-mono text-xs text-[#f5efeb]">
                  <span className="bg-[#eae5d9] text-[#1D1D1D] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                    {event.category}
                  </span>
                  <span className="text-xl group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    [ ↗ ]
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="font-mono text-[10px] text-[#d4af37] tracking-widest uppercase block mb-1">
                    TENURE {event.tenure} • {event.date}
                  </span>
                  <h3 className="font-editorial-serif italic text-xl sm:text-2xl text-[#f5efeb] leading-snug group-hover:text-white transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-sans text-xs text-[#a39e93] line-clamp-2 mt-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Program Dossier Modal */}
      {activeProgramModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProgramModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#171719] text-[#f5efeb] border border-[rgba(245,239,235,0.2)] rounded-[24px] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProgramModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Close session"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="font-mono text-[10px] tracking-widest text-[#a39e93] uppercase">
                CURATED DOME SESSION // {activeProgramModal.theme}
              </span>
            </div>

            <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-wider text-[#f5efeb] uppercase mb-4 leading-snug">
              {activeProgramModal.title.replace("\n", " ")}
            </h2>

            <div className="flex flex-wrap items-center gap-3 py-3 border-y border-[rgba(245,239,235,0.12)] font-mono text-xs text-[#a39e93] mb-6">
              {activeProgramModal.dateTop && (
                <span className="text-[#f5efeb]">
                  WINDOW: {activeProgramModal.dateTop} / {activeProgramModal.dateBottom}
                </span>
              )}
              <span>·</span>
              <span className="text-[#eae5d9]">DURATION: {activeProgramModal.duration}</span>
              <span>·</span>
              <span>LEVEL: {activeProgramModal.intensity}</span>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-[16px] overflow-hidden my-4 border border-[rgba(245,239,235,0.1)] bg-[#111113]">
              <Image
                src={activeProgramModal.image}
                alt={activeProgramModal.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>

            <p className="font-sans text-sm sm:text-base text-[#eae5d9]/90 leading-relaxed my-6">
              {activeProgramModal.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[rgba(245,239,235,0.1)]">
              {activeProgramModal.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#111113] border border-[rgba(245,239,235,0.1)] font-mono text-[10px] uppercase text-[#a39e93]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8a847a]">
                ASTRONOMYBU CELESTIAL SANCTUARY
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(245,239,235,0.2)] text-[#eae5d9] font-mono text-xs hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Link Copied!" : "Share Session"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campus Event Modal */}
      {activeCampusModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveCampusModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#171719] text-[#f5efeb] border border-[rgba(245,239,235,0.2)] rounded-[24px] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCampusModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Close event"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#eae5d9] text-[#1D1D1D] px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
                {activeCampusModal.category}
              </span>
              <span className="font-mono text-[10px] text-[#8a847a] tracking-widest">
                TENURE {activeCampusModal.tenure}
              </span>
            </div>

            <h2 className="font-editorial-serif italic text-3xl sm:text-4xl text-[#f5efeb] my-3 leading-snug">
              {activeCampusModal.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 p-4 rounded-xl bg-[#111113] border border-[rgba(245,239,235,0.1)] font-mono text-xs text-[#a39e93]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#eae5d9]" />
                <span>{activeCampusModal.date} {activeCampusModal.time && `(${activeCampusModal.time})`}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#eae5d9]" />
                <span>{activeCampusModal.location}</span>
              </div>
              {activeCampusModal.guest && (
                <div className="flex items-center gap-2 sm:col-span-2 text-[#d4af37]">
                  <User className="w-4 h-4" />
                  <span>KEYNOTE: {activeCampusModal.guest}</span>
                </div>
              )}
            </div>

            {activeCampusModal.image && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden my-4 border border-[rgba(245,239,235,0.1)] bg-[#111113]">
                <Image
                  src={activeCampusModal.image}
                  alt={activeCampusModal.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            )}

            <p className="font-sans text-sm sm:text-base text-[#eae5d9]/90 leading-relaxed my-4">
              {activeCampusModal.description}
            </p>

            <div className="mt-8 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8a847a]">
                BENNETT CAMPUS ARCHIVE
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(245,239,235,0.2)] text-[#eae5d9] font-mono text-xs hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Link Copied!" : "Share Event"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
