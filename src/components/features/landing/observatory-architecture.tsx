"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const DOME_SLIDES = [
  {
    tag: "CURATORIAL SEQUENCE // 01",
    headline:
      "INSIDE THE DOME, PROJECTED CONSTELLATIONS GRADUALLY FORM AND DISSOLVE, SHIFTING BETWEEN CLARITY AND FRAGMENTATION.",
    body: "Visual sequences move from structured star maps to dispersed fields, accompanied by minimal narration and sound. The experience unfolds slowly, allowing visitors to observe the moment where pattern emerges—and where it disappears.",
    image: "/images/assets/dome-vortex.jpg",
    alt: "A lone stargazer silhouette standing before a colossal swirling cosmic maelstrom",
    session: "BENNETT OBSERVATORY DOME // SESSION 08",
  },
  {
    tag: "CURATORIAL SEQUENCE // 02",
    headline:
      "NIGHT-SKY SENSOR CAPTURES UNVEIL THE INVISIBLE: DEEP EMISSION NEBULAE, STELLAR LIGHT CURVES, AND THE MOON'S SHIFTING TERMINATOR.",
    body: "Led by astrophysics keynote speaker Dr. Pratyush Pranav and guest artist Virendra Adhikari, our optical programs combine 8-inch Dobsonian telemetry with deep space sensor calibration at Bennett University.",
    image: "/images/assets/dome-vortex.jpg",
    alt: "Deep cosmic vortex void projection",
    session: "ASTROPHOTOGRAPHY & COSMOLOGY // GREATER NOIDA",
  },
];

const OTHER_PROGRAMS = [
  {
    id: "01",
    title: "DISTANCE BETWEEN STARS",
    description:
      "An exploration of how cultures interpret spatial relationships in the night sky, turning distance into narrative and meaning.",
    image: "/images/assets/lunar-crater-master.jpg",
    href: "/events",
  },
  {
    id: "02",
    title: "ORION ACROSS CULTURES",
    description:
      "A comparative reading of Orion, tracing how one constellation becomes multiple figures across myth traditions.",
    image: "/images/assets/orion-across-cultures.jpg",
    href: "/events",
  },
  {
    id: "03",
    title: "NEWTON'S CENOTAPH",
    description:
      "Examines Étienne-Louis Boullée's visionary monument to Newton as a speculative space where architecture and astronomy converge.",
    image: "/images/assets/newtons-cenotaph-master.jpg",
    href: "/events",
  },
  {
    id: "04",
    title: "BEFORE THE STAR MAPS",
    description:
      "An examination of early celestial mapping, where imagination shaped the structure of the sky.",
    image: "/images/assets/constellations-chart-master.jpg",
    href: "/events",
  },
];

export function ObservatoryArchitecture() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = DOME_SLIDES[slideIndex];

  return (
    <section
      id="programs"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24 overflow-hidden"
    >
      <div id="dome" className="sr-only" />
      <div className="w-full max-w-[1800px] mx-auto">
        {/* ============================================================== */}
        {/* PART 1: DOME EXPERIENCE (Matching Reference Exactly)           */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <div>
            <h2 className="font-editorial-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#f5efeb] tracking-tight">
              DOME EXPERIENCE
            </h2>
          </div>

          <div className="flex items-center gap-6 font-mono text-xl sm:text-2xl text-[#f5efeb] select-none">
            <button
              type="button"
              onClick={() =>
                setSlideIndex((prev) => (prev === 0 ? DOME_SLIDES.length - 1 : prev - 1))
              }
              className="text-[#a39e93] hover:text-[#f5efeb] transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() =>
                setSlideIndex((prev) => (prev === DOME_SLIDES.length - 1 ? 0 : prev + 1))
              }
              className="text-[#a39e93] hover:text-[#f5efeb] transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>

        {/* 2-Column Dome Experience Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 py-12 sm:py-16 items-start lg:items-center">
          {/* Left Column: Narrative Headline + Body + Ticket Button */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-mono text-xs sm:text-sm xl:text-[15px] tracking-[0.14em] text-[#f5efeb] uppercase leading-relaxed font-semibold">
                {slide.headline}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed">
                {slide.body}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/calendar"
                className="inline-block px-8 sm:px-10 py-3.5 bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs tracking-archival font-semibold uppercase hover:bg-white transition-colors shadow-2xl"
              >
                BUY TICKET
              </Link>
            </div>
          </div>

          {/* Right Column: Monumental Swirling Galaxy Vortex Artwork */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#111113] overflow-hidden group shadow-2xl">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority
                className="object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PART 2: OTHER PROGRAMS (Matching Pinterest Reference 2 Bottom) */}
        {/* ============================================================== */}
        <div className="pt-16 sm:pt-24">
          <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-[rgba(245,239,235,0.12)]">
            <h2 className="font-editorial-serif italic text-3xl sm:text-5xl text-[#f5efeb] tracking-tight">
              OTHER PROGRAMS
            </h2>

            <Link
              href="/events"
              className="p-2 sm:p-2.5 border border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[#f5efeb] transition-colors"
              aria-label="View all other programs"
            >
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          {/* 4-Card Horizontal Program Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[rgba(245,239,235,0.12)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(245,239,235,0.12)] bg-[#1D1D1D] my-8">
            {OTHER_PROGRAMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-3 group-hover:text-[#eae5d9] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-[#a39e93] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
