"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export function ObservatoryArchitecture() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      col1Title: "[01]",
      col1Text:
        "AstronomyBU unfolds through a series of restrained observation terraces leading into the main celestial dome. The architecture remains minimal and austere, allowing light, shadow, and optical telemetry to define the space.",
      col2Title: "[02]",
      col2Text:
        "Inside the dome, celestial spectra and archival visuals are cast across curved surfaces, surrounding observers in slow narrative sequences. Each session uses optical tracking and stillness to transform the cosmos into a living sky—both observed and imagined.",
    },
    {
      col1Title: "[03]",
      col1Text:
        "Our telemetry array integrates high-magnification Dobsonian reflectors with narrowband CMOS sensors, permitting deep-sky captures of emission nebulae even through suburban light distribution.",
      col2Title: "[04]",
      col2Text:
        "Students participate in synchronized Messier catalog marathons, tracking planetary conjunctions and measuring variable star light curves during late autumn and winter observation windows.",
    },
  ];

  const currentSlide = slides[slideIndex];

  return (
    <section className="relative w-full bg-[#09090b] pt-16 pb-0 overflow-hidden border-t border-[rgba(245,239,235,0.1)]">
      {/* Centered Top Action Button */}
      <div className="flex justify-center mb-12">
        <Link
          href="/events"
          className="px-6 py-2.5 bg-[#eae5d9] text-[#09090b] font-mono text-[11px] font-semibold tracking-archival uppercase hover:bg-white transition-colors"
        >
          All Programs [03]
        </Link>
      </div>

      {/* Main Archival Stage with Floating Dark Box & Monumental Dome Backdrop */}
      <div className="relative w-full">
        {/* Central Floating Dark Editorial Container */}
        <div className="relative z-20 max-w-4xl mx-auto bg-[#09090b] border border-[rgba(245,239,235,0.12)] p-8 sm:p-12 shadow-2xl">
          {/* Main Statement */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.14em] text-[#f5efeb] leading-relaxed uppercase text-center mb-10">
            SET WITHIN A QUIET, IMMERSIVE SPACE, ASTRONOMYBU INVITES STUDENTS AND RESEARCHERS TO
            SLOW DOWN AND ENGAGE WITH THE NIGHT AS A SHARED ARCHIVE — ONE THAT CONTINUES TO SHIFT
            WITH TIME, PERSPECTIVE, AND INTERPRETATION.
          </p>

          {/* Sub-columns & Directional Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-[rgba(245,239,235,0.08)]">
            {/* Arrows */}
            <div className="md:col-span-2 flex items-center gap-3">
              <button
                onClick={() => setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                className="p-1.5 border border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[#f5efeb] transition-colors"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                className="p-1.5 border border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[#f5efeb] transition-colors"
                aria-label="Next slide"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Column 1 */}
            <div className="md:col-span-5 font-mono text-[11px] text-[#a39e93] leading-relaxed">
              <span className="text-[#f5efeb] font-semibold block mb-1">
                {currentSlide.col1Title}
              </span>
              <p>{currentSlide.col1Text}</p>
            </div>

            {/* Column 2 */}
            <div className="md:col-span-5 font-mono text-[11px] text-[#a39e93] leading-relaxed">
              <span className="text-[#f5efeb] font-semibold block mb-1">
                {currentSlide.col2Title}
              </span>
              <p>{currentSlide.col2Text}</p>
            </div>
          </div>
        </div>

        {/* Monumental Brutalist Concrete Observatory Dome (Matching Image 1) */}
        <div className="relative w-full -mt-24 sm:-mt-32 pt-28 sm:pt-36 pb-0 overflow-hidden">
          <div className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] filter contrast-125 brightness-95">
            <Image
              src="/images/observatory-dome.jpg"
              alt="Monumental Concrete Observatory Dome"
              fill
              priority
              className="object-cover object-bottom"
              sizes="100vw"
            />
            {/* Top gradient blend into the dark container */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-transparent opacity-95" />
            {/* Bottom edge vignette */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#09090b] to-transparent opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
}
