"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X, Clock, Share2 } from "lucide-react";

interface EditorialDossier {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  image: string;
  alt: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  ctaText: string;
}

const EDITORIAL_DOSSIERS: EditorialDossier[] = [
  {
    id: "narrowband-astrophotography",
    category: "ASTROPHOTOGRAPHY • GREATER NOIDA • ORION CAMPAIGN",
    title:
      "The Anatomy of a Deep-Sky Exposure: Narrowband Ha/OIII isolation under Bortle 6.5 skies.",
    subtitle:
      "Techniques for narrowband spectral isolation and sensor calibration under suburban light pollution",
    excerpt:
      "Student astronomers engineered an onboard dual-narrowband filter train that isolates 656.3nm Hydrogen-Alpha and 500.7nm Oxygen-III emission lines, delivering sub-100ms trip prevention against suburban sodium skyglow across 14 campus observation stations.",
    content: [
      "Greater Noida presents a formidable challenge for astronomical observation: an estimated Bortle 6.5 sky with moderate skyglow from industrial corridors and campus lighting. Yet, modern CMOS sensors combined with dual-narrowband filtration have revolutionized what an undergraduate astronomy club can capture from a college cricket ground.",
      "By isolating the 656.3nm Hydrogen-Alpha line and the 500.7nm Oxygen-III emission lines, we suppress urban sodium and LED wavelength emissions by over 92%. A typical 120-second exposure at f/4.5 yields crisp nebulosity that would otherwise remain submerged in thermal noise.",
      "The critical step remains calibration: shooting dark frames matched to ambient sensor temperature, alongside synthetic flat frames taken with an electroluminescent panel at dusk. In our winter Orion campaign, fixed pattern noise vanished, revealing subtle interstellar dust structures otherwise invisible to urban observers.",
    ],
    image: "/cool2.png",
    alt: "Deep-sky narrowband astrophotography exposure",
    author: "Dhruv Kukreja",
    role: "Head of Research",
    date: "14 Feb 2026",
    readTime: "7 MIN READ",
    ctaText: "READ MORE →",
  },
  {
    id: "space-telemetry-cosmonauts",
    category: "SPACE DIPLOMACY • RUSSIAN HOUSE • ORBITAL RECON",
    title:
      "Real Talk: Overcoming 20-minute telemetry lag with onboard lunar FPGA SLAM.",
    subtitle:
      "Reflections from active cosmonauts on long-duration spaceflight, sensory isolation, and low-Earth orbit teleoperation",
    excerpt:
      "Rather than waiting on manual Earth mission control commands, student delegates met veteran cosmonauts to deconstruct radiation-tolerant edge vision pipelines, extravehicular suits, and 16 daily orbital sunsets at 3.5x standard speeds.",
    content: [
      "Club members traveled to the Russian House in New Delhi for an exclusive symposium with active orbital cosmonauts. Listening to veteran crew members recount 180 days aboard the International Space Station transformed textbook orbital mechanics into tangible engineering reality.",
      "The cosmonauts detailed the physiological rigor of extravehicular activities (spacewalks)—the relentless pressure against Orlan suit pressurized joints, the sensory isolation of the void, and the blinding beauty of orbital sunrise occurring sixteen times every twenty-four hours.",
      "Their advice to Bennett engineers was unanimous: master fundamental mechanics, cultivate mental equilibrium under high-stress telemetry anomalies, and never lose sight of the cooperative spirit that transcends geopolitical boundaries in low-Earth orbit.",
    ],
    image: "/events/russian-cosmonauts-delhi-2025/photo1.jpeg",
    alt: "Astronomy BU delegation with cosmonauts",
    author: "Shardul Dhekane [𝙎𝙋𝙄𝙍𝙄𝙏]",
    role: "Advisor",
    date: "20 Apr 2025",
    readTime: "6 MIN READ",
    ctaText: "READ MORE →",
  },
  {
    id: "topological-cosmology",
    category: "COSMOLOGY • THEORETICAL PHYSICS • DR. PRANAV",
    title:
      "Alpine Mesh Relays: Detecting primordial filament geometry in SDSS surveys.",
    subtitle:
      "Space-time geometry, persistent homology, and non-Gaussian signatures in cosmic microwave background surveys",
    excerpt:
      "When observational noise sever raw cosmic signals, student researchers deployed ad-hoc topological Betti algorithms and persistent homology life detectors to pinpoint primordial cosmic filaments during the golden cosmological window.",
    content: [
      "Dr. Pratyush Pranav visited AstronomyBU to discuss how the universe's large-scale structure mirrors topological patterns. With a background bridging theoretical astrophysics and computational mathematics, Dr. Pranav guided club researchers through cosmic microwave background non-Gaussian signatures.",
      "Using Betti numbers and persistent homology, Dr. Pranav demonstrated how cosmologists detect filaments and cosmic voids in galactic surveys like SDSS. The distribution of matter across billions of light-years is not random; it encodes acoustic oscillations from the primordial plasma in the first 380,000 years.",
      "For student researchers, the seminar opened new avenues: applying machine learning to classify gravitational lens candidates and applying spatial graph theory to local stellar clusters.",
    ],
    image: "/cool1.png",
    alt: "Cosmological topological simulation",
    author: "Vivan Joshi",
    role: "Head of Tech",
    date: "25 Nov 2025",
    readTime: "8 MIN READ",
    ctaText: "READ MORE →",
  },
];

const ARCHIVE_LINKS = [
  {
    num: "01",
    title: "MINISTRY & RESEARCH PROBLEM STATEMENTS",
    desc: "Browse live astrophysical challenges and observation goals",
    href: "/events",
  },
  {
    num: "02",
    title: "NATIONAL EXPEDITION ROADMAP",
    desc: "6-phase journey from campus ground to dark-sky observatories",
    href: "/calendar",
  },
  {
    num: "03",
    title: "75+ NODAL CENTERS OBSERVATION RADAR",
    desc: "University observatories hosting synchronized nocturnal cohorts",
    href: "/journal",
  },
  {
    num: "04",
    title: "PAST EDITIONS ARCHIVE (2017-2026)",
    desc: "150+ deep-sky photographic plates and archived telemetry",
    href: "#archive",
  },
];

export function JournalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDossier, setActiveDossier] = useState<EditorialDossier | null>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (
        !containerRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // 1. Bottom-up clipPath unmask entrance + parallax image scrub
      imageRefs.current.forEach((el) => {
        if (!el) return;
        const img = el.querySelector("img");

        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)", y: 40 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12, yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });

      // 2. Staggered text swipe up
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const textElements = row.querySelectorAll(".editorial-swipe-text");
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={containerRef}
      id="journal"
      className="relative w-full bg-[#FAF8F5] dark:bg-[#0C0D0E] text-[#141518] dark:text-[#F3F4F6] py-16 sm:py-24 border-y border-neutral-300 dark:border-neutral-800 transition-colors duration-500 font-serif selection:bg-[#FF7700] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Tagline Bar */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-neutral-300 dark:border-neutral-800 text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7700]" />
            <span>CASE DOSSIERS // PROTOTYPE TO OBSERVATION</span>
          </div>
          <span className="hidden sm:inline">
            ASTRONOMYBU RESEARCH JOURNAL
          </span>
        </div>

        {/* Section Headline */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-bold text-neutral-900 dark:text-white leading-[1.1] font-sans tracking-tight mb-4">
            How Celestial Solutions <br />
            <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
              Become Sovereign Systems.
            </span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            A documented archival record of collegiate engineering breakthroughs
            deployed across national space, optical sensor arrays, and celestial
            rescue infrastructure.
          </p>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4 border-t border-neutral-300 dark:border-neutral-800">
          {/* Left Column (8 cols): Alternating Dossier Cards */}
          <div className="lg:col-span-8 flex flex-col space-y-16">
            {EDITORIAL_DOSSIERS.map((item, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-14 border-b border-neutral-200 dark:border-neutral-800"
                >
                  {/* Image Container */}
                  <div
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className={`relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 will-change-transform shadow-xs ${
                      isEven ? "order-1 md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Text Container */}
                  <div
                    className={`flex flex-col justify-between pr-2 ${
                      isEven ? "order-2 md:order-1" : ""
                    }`}
                  >
                    <span className="editorial-swipe-text text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 mb-3 block">
                      {item.category}
                    </span>
                    <h3 className="editorial-swipe-text text-2xl sm:text-3xl font-serif italic text-neutral-900 dark:text-white leading-snug mb-4 font-normal">
                      {item.title}
                    </h3>
                    <p className="editorial-swipe-text text-sm font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                      {item.excerpt}
                    </p>
                    <div className="editorial-swipe-text">
                      <button
                        onClick={() => setActiveDossier(item)}
                        className="inline-block px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        {item.ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom Row Navigation Links */}
            <div className="flex items-center justify-between pt-6 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
              <Link
                href="/calendar"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                ← THE CELESTIAL ARENA
              </Link>
              <Link
                href="/journal"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors font-bold text-neutral-800 dark:text-neutral-200"
              >
                EXPLORE ALL ARCHIVES →
              </Link>
            </div>
          </div>

          {/* Right Column (4 cols): Editorial Sidebar with Border Line */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-neutral-300 dark:border-neutral-800 flex flex-col space-y-12">
            {/* Story Paragraphs */}
            <div>
              <div className="pb-3 mb-6 border-b border-neutral-300 dark:border-neutral-800">
                <h4 className="text-2xl sm:text-3xl font-serif italic font-normal text-neutral-900 dark:text-white">
                  Read our Story
                </h4>
              </div>
              <div className="space-y-4 font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                <p>
                  AstronomyBU was conceived not merely as a collegiate coding
                  or stargazing contest, but as an open-innovation sovereign
                  observatory mechanism where university labs solve hard
                  astrophysical problems.
                </p>
                <p>
                  Across premier nodal centers, teams author operational telemetry
                  code directly with researchers, visiting scientists, and optical
                  engineers—turning raw academic talent into mission-critical
                  astronomical infrastructure.
                </p>
              </div>
            </div>

            {/* Featured Visual with Floating Glass Caption */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-xs border border-neutral-300/60 dark:border-neutral-700/60">
              <Image
                src="/images/observatory-dome.jpg"
                alt="Engineering prototype in observatory dome"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 uppercase tracking-widest text-center">
                BENNETT OBSERVATORY TELEMETRY BENCHMARK
              </div>
            </div>

            {/* Numbered Quick-Links List */}
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-6">
                LINKS &amp; ARCHIVES:
              </span>
              <ul className="space-y-6">
                {ARCHIVE_LINKS.map((link, idx) => (
                  <li
                    key={link.num}
                    className={
                      idx > 0
                        ? "pt-4 border-t border-neutral-200 dark:border-neutral-800"
                        : ""
                    }
                  >
                    <Link
                      href={link.href}
                      className="flex items-baseline group"
                    >
                      <span className="text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 mr-4 group-hover:text-[#FF7700] transition-colors">
                        {link.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900 dark:text-white group-hover:text-[#FF7700] transition-colors flex items-center gap-1">
                          <span>{link.title}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-[11px] font-sans text-neutral-500 font-normal mt-0.5">
                          {link.desc}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal Reader when clicking READ MORE → */}
      {activeDossier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveDossier(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#141518] text-[#F3F4F6] border border-neutral-800 rounded-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveDossier(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF7700]" />
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                {activeDossier.category}
              </span>
            </div>

            <h1 className="font-serif italic text-2xl sm:text-4xl text-white leading-tight mb-3">
              {activeDossier.title}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#FF7700] mb-6">
              {activeDossier.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-800 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">{activeDossier.author}</span>
                <span>({activeDossier.role})</span>
              </div>
              <div className="flex items-center gap-4">
                <span>{activeDossier.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-white">
                  <Clock className="w-3.5 h-3.5" />
                  {activeDossier.readTime}
                </span>
              </div>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden my-6 border border-neutral-800 bg-neutral-900">
              <Image
                src={activeDossier.image}
                alt={activeDossier.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base font-sans text-neutral-300 leading-relaxed">
              {activeDossier.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                BENNETT UNIVERSITY OBSERVATORY ARCHIVE
              </span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 text-neutral-200 font-mono text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Link Copied!" : "Share Dossier"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
