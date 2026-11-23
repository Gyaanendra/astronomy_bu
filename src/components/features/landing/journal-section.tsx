"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

interface CaseDossier {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  ctaText: string;
  href: string;
}

const CASE_DOSSIERS: CaseDossier[] = [
  {
    id: "narrowband-astrophotography",
    category: "ASTROPHOTOGRAPHY • GREATER NOIDA • ORION CAMPAIGN",
    title: "The Anatomy of a Deep-Sky Exposure: Narrowband Ha/OIII Isolation Under Bortle 6.5 Skies.",
    excerpt:
      "Student astronomers deployed dual-band 656.3nm Hydrogen-Alpha and 500.7nm Oxygen-III filters to suppress suburban LED glare by over 92%, unlocking sub-arcsecond nebulosity stacks from campus ground.",
    image: "/cool2.png",
    alt: "Deep sky astrophotography exposure",
    ctaText: "READ DISPATCH →",
    href: "/journal",
  },
  {
    id: "space-telemetry-cosmonauts",
    category: "SPACE DIPLOMACY • RUSSIAN HOUSE • ORBITAL RECON",
    title: "Real Talk: 180 Days in Low-Earth Orbit and Psychological Regimes.",
    excerpt:
      "A delegation of Bennett engineers met veteran cosmonauts at the Russian House to deconstruct EVA extravehicular suits, 16 daily orbital sunsets, and fault-tolerant space telemetry.",
    image: "/events/russian-cosmonauts-delhi-2025/photo1.jpeg",
    alt: "Astronomy BU delegation with cosmonauts",
    ctaText: "READ DISPATCH →",
    href: "/journal",
  },
  {
    id: "topological-cosmology",
    category: "COSMOLOGY • THEORETICAL PHYSICS • DR. PRANAV",
    title: "Topological Data Analysis: Detecting Primordial Filament Geometry in SDSS Surveys.",
    excerpt:
      "Dr. Pratyush Pranav guided club researchers through Betti numbers and persistent homology, decoding cosmic microwave background acoustic oscillations from the universe's first 380,000 years.",
    image: "/cool1.png",
    alt: "Cosmological simulation of cosmic filaments",
    ctaText: "READ DISPATCH →",
    href: "/journal",
  },
];

const ARCHIVE_LINKS = [
  {
    num: "01",
    title: "EXPEDITION ARCHIVE & PLATES",
    desc: "Browse historic astrophotography & artifacts",
    href: "#archive",
  },
  {
    num: "02",
    title: "DUAL HORIZON CALENDAR",
    desc: "Upcoming observation nights & lunar phases",
    href: "/calendar",
  },
  {
    num: "03",
    title: "RESEARCH ARTICLES & DISPATCHES",
    desc: "Field notes, optics guides & cosmic inquiries",
    href: "/journal",
  },
  {
    num: "04",
    title: "COUNCIL & OBSERVER ROSTER",
    desc: "Student leadership, advisors & core fellows",
    href: "/team",
  },
];

export function JournalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (
        !containerRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // 1. Reveal mask wipe-in + parallax image scrub
      imageRefs.current.forEach((el) => {
        if (!el) return;
        const img = el.querySelector("img");

        // Bottom-up clip-path wipe entrance
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

        // Subtle vertical parallax on scrub
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

  return (
    <section
      ref={containerRef}
      id="journal"
      className="relative w-full bg-[#1D1D1D] text-[#f5efeb] py-16 sm:py-24 border-y border-[rgba(245,239,235,0.12)] transition-colors duration-500 font-serif selection:bg-[#d4af37] selection:text-black"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Header Tagline Bar */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-[rgba(245,239,235,0.12)] text-xs font-mono tracking-[0.22em] text-[#a39e93] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>CASE DOSSIERS // PROTOTYPE TO OBSERVATION</span>
          </div>
          <span className="hidden sm:inline">
            ASTRONOMYBU RESEARCH JOURNAL
          </span>
        </div>

        {/* Section Headline */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-bold text-[#f5efeb] leading-[1.1] font-sans tracking-tight mb-4">
            How Celestial Curiosities <br />
            <span className="font-editorial-serif italic font-normal text-[#eae5d9]/85">
              Become Archival Science.
            </span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#a39e93] leading-relaxed max-w-xl">
            A documented archival record of collegiate engineering breakthroughs,
            deep-sky astrophotography, and cosmological inquiries deployed across
            Bennett University&apos;s observational infrastructure.
          </p>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4 border-t border-[rgba(245,239,235,0.12)]">
          {/* Left Column (8 cols): Alternating Articles */}
          <div className="lg:col-span-8 flex flex-col space-y-16">
            {CASE_DOSSIERS.map((item, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-14 border-b border-[rgba(245,239,235,0.1)]"
                >
                  {/* Image Block */}
                  <div
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className={`relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-[#111113] will-change-transform shadow-xs border border-[rgba(245,239,235,0.1)] ${
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

                  {/* Text Block */}
                  <div
                    className={`flex flex-col justify-between pr-2 ${
                      isEven ? "order-2 md:order-1" : ""
                    }`}
                  >
                    <span className="editorial-swipe-text text-[10px] font-mono tracking-[0.2em] uppercase text-[#d4af37] mb-3 block">
                      {item.category}
                    </span>
                    <h3 className="editorial-swipe-text text-2xl sm:text-3xl font-editorial-serif italic text-[#f5efeb] leading-snug mb-4 font-normal">
                      {item.title}
                    </h3>
                    <p className="editorial-swipe-text text-sm font-sans text-[#a39e93] leading-relaxed mb-6 font-normal">
                      {item.excerpt}
                    </p>
                    <div className="editorial-swipe-text">
                      <Link
                        href={item.href}
                        className="inline-block px-6 py-2.5 bg-[#eae5d9] text-[#1D1D1D] text-[10px] font-mono uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-colors"
                      >
                        {item.ctaText}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom Row Navigation Links */}
            <div className="flex items-center justify-between pt-6 text-xs font-mono uppercase tracking-[0.2em] text-[#a39e93]">
              <Link
                href="/calendar"
                className="hover:text-[#f5efeb] transition-colors"
              >
                ← OBSERVATION CALENDAR
              </Link>
              <Link
                href="/journal"
                className="hover:text-[#f5efeb] transition-colors font-bold text-[#eae5d9]"
              >
                EXPLORE ALL DISPATCHES →
              </Link>
            </div>
          </div>

          {/* Right Column (4 cols): Editorial Sidebar with Border Separation */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-[rgba(245,239,235,0.12)] flex flex-col space-y-12">
            {/* Story Block */}
            <div>
              <div className="pb-3 mb-6 border-b border-[rgba(245,239,235,0.12)]">
                <h4 className="text-2xl sm:text-3xl font-editorial-serif italic font-normal text-[#f5efeb]">
                  Read our Story
                </h4>
              </div>
              <div className="space-y-4 font-sans text-sm text-[#a39e93] leading-relaxed font-normal">
                <p>
                  AstronomyBU was conceived not merely as a recreational
                  stargazing club, but as an open-inquiry collegiate observatory
                  where undergraduate researchers unlock real celestial mechanics,
                  optics calibration, and cosmological datasets.
                </p>
                <p>
                  Under clear nocturnal skies, student teams align motorized
                  Dobsonians, engineer custom narrowband filter trains, and author
                  technical dispatches bridging theoretical astrophysics with
                  direct observation.
                </p>
              </div>
            </div>

            {/* Featured Archival Vertical Frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111113] shadow-xs border border-[rgba(245,239,235,0.15)] group">
              <Image
                src="/images/observatory-dome.jpg"
                alt="Observatory dome under night sky"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/75 backdrop-blur-xs text-[10px] font-mono text-[#f5efeb] uppercase tracking-widest text-center border border-white/10">
                BENNETT OBSERVATORY DOME BENCHMARK
              </div>
            </div>

            {/* Links & Archives List */}
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#a39e93] uppercase block mb-6">
                LINKS &amp; ARCHIVES:
              </span>
              <ul className="space-y-6">
                {ARCHIVE_LINKS.map((link, idx) => (
                  <li
                    key={link.num}
                    className={
                      idx > 0
                        ? "pt-4 border-t border-[rgba(245,239,235,0.1)]"
                        : ""
                    }
                  >
                    <Link
                      href={link.href}
                      className="flex items-baseline group"
                    >
                      <span className="text-2xl font-editorial-serif italic text-[#8a847a] mr-4 group-hover:text-[#d4af37] transition-colors">
                        {link.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#f5efeb] group-hover:text-[#d4af37] transition-colors flex items-center gap-1">
                          <span>{link.title}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-[11px] font-sans text-[#a39e93] font-normal mt-0.5">
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
    </section>
  );
}
