"use client";

import Image from "next/image";
import Link from "next/link";
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
        {/* Header Row: DOME EXPERIENCE with ← → navigation */}
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
      </div>
    </section>
  );
}
