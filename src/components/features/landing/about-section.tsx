"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageSquare,
  Search,
  SlidersHorizontal,
  FileText,
  Handshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    value: "10+",
    label: "Years in observational astronomy",
  },
  {
    value: "1000+",
    label: "Successful night sky sessions",
  },
  {
    value: "4000+",
    label: "Raw celestial exposures captured",
  },
  {
    value: "95%",
    label: "Active member satisfaction",
  },
];

const LOGOS = [
  "✦ BENNETT UNIVERSITY",
  "✦ TIMES OF INDIA GROUP",
  "✦ IUCAA SKY NETWORK",
  "✦ ISRO SPACE TUTOR",
  "✦ DELHI-NCR ASTRO AMATEURS",
  "✦ CELESTIAL TELEMETRY LAB",
];

interface CatalogCard {
  title: string;
  count: string;
  image: string;
}

const CATALOG: CatalogCard[] = [
  {
    title: "Dobsonian Optical Rigs",
    count: "4000+ properties / observation nights",
    image: "/images/assets/catalog-telescopes.jpg",
  },
  {
    title: "Sensor Astrophotography",
    count: "1000+ deep-sky sensor stacks",
    image: "/images/assets/journal-workshop.jpg",
  },
  {
    title: "Himalayan Dark-Sky Reserves",
    count: "2000+ expedition plots & sites",
    image: "/images/assets/journal-gathering.jpg",
  },
];

interface WorkStep {
  icon: typeof MessageSquare;
  title: string;
  description: string;
}

const WORK_STEPS: WorkStep[] = [
  {
    icon: MessageSquare,
    title: "Free consultation",
    description:
      "Consultation and needs analysis. At this stage, we determine telescope apertures, observation targets, and equipment requirements.",
  },
  {
    icon: Search,
    title: "Search and selection of celestial coordinates",
    description:
      "We map confirmed sky coordinates, planetary conjunctions, and deep-space Messier objects matching your observational goals.",
  },
  {
    icon: SlidersHorizontal,
    title: "Telescope viewing and optical assessment",
    description:
      "We arrange Dobsonian setup, equatorial alignment, and provide a complete live observation overview under the open sky.",
  },
  {
    icon: FileText,
    title: "Sensor verification and image preparation",
    description:
      "We conduct a comprehensive review of all raw astrophotography sensor captures, calibration dark frames, and stacking logs.",
  },
  {
    icon: Handshake,
    title: "Expedition and collaboration support",
    description:
      "We provide ongoing support in concluding the project, publishing journal papers, and joining seasonal mountain expeditions.",
  },
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Stats Entrance Stagger
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          autoAlpha: 0,
          y: 35,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // 2. Catalog Cards Stagger
      if (catalogRef.current) {
        gsap.from(catalogRef.current.children, {
          autoAlpha: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: catalogRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // 3. Workflow Steps Stagger
      if (workflowRef.current) {
        gsap.from(workflowRef.current.children, {
          autoAlpha: 0,
          x: 25,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: workflowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto space-y-24 sm:space-y-32">
        {/* ============================================================== */}
        {/* 1. ABOUT US (Exact Layout matching reference top)              */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Title + Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h2 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-[#f5efeb] tracking-tight mb-6">
              About Us
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed max-w-lg">
              AstronomyBU is Bennett University&apos;s premier astronomical society and space research collective. Operating since 2021 under the School of Computer Science &amp; Engineering, we help students and enthusiasts—from first-year undergraduates to senior researchers—explore, image, and understand deep space. Our team takes care of telescope tracking, sensor calibration, dark-sky expeditions, and observational telemetry until the research is complete.
            </p>
          </div>

          {/* Right Column: 4 Stats in 2x2 Grid */}
          <div className="lg:col-span-6">
            <div ref={statsRef} className="grid grid-cols-2 gap-8 sm:gap-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#f5efeb] leading-none mb-2">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-[#a39e93] leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. LOGO BAR (Exact matching reference logo strip)              */}
        {/* ============================================================== */}
        <div className="border-t border-b border-[rgba(245,239,235,0.1)] py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center text-center">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                className="font-sans font-semibold text-xs sm:text-sm text-[#8a847a] hover:text-[#f5efeb] transition-colors tracking-wide uppercase"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. CATALOG (3 Cards with Rounded Corners)                      */}
        {/* ============================================================== */}
        <div>
          <div className="mb-8 sm:mb-10">
            <h3 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#f5efeb] tracking-tight mb-2">
              Catalog
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#a39e93]">
              A wide selection of optical telemetry and observation rigs for your research
            </p>
          </div>

          {/* 3 Cards Grid with Rounded Corners */}
          <div
            ref={catalogRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {CATALOG.map((item) => (
              <div key={item.title} className="group cursor-pointer flex flex-col">
                {/* Rounded Image Container */}
                <div className="relative w-full aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#111113] shadow-2xl mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Title & Property Count below */}
                <h4 className="font-sans font-bold text-base sm:text-lg text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-[#8a847a] mt-0.5">
                  {item.count}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. HOW WE WORK (Exact layout matching reference bottom)        */}
        {/* ============================================================== */}
        <div>
          {/* Header Row: Title & Arrow Buttons */}
          <div className="flex items-start justify-between mb-8 sm:mb-12">
            <div>
              <h3 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#f5efeb] tracking-tight mb-2">
                How we work
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#a39e93]">
                We have made the process of working with us as simple and transparent as possible
              </p>
            </div>

            {/* Circular Arrow Navigation Buttons */}
            <div className="flex items-center gap-3 select-none">
              <button
                type="button"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(245,239,235,0.2)] flex items-center justify-center text-[#a39e93] hover:text-[#f5efeb] hover:border-[#f5efeb] transition-colors"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f5efeb] text-[#1D1D1D] flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2-Column Main Stage: Rounded Tall Photo Left + 5 Steps Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
            {/* Left Column: Tall Photo with Rounded Corners & Overlapping Circular Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[3/4.4] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl bg-[#111113]">
                <Image
                  src="/images/assets/structure-eclipse.jpg"
                  alt="Total solar eclipse over cloudscape"
                  fill
                  priority
                  className="object-cover filter contrast-110 brightness-95"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              {/* Overlapping Circular Badge (Exact Russian badge position) */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#52525b] text-[#f5efeb] shadow-2xl flex flex-col items-center justify-center text-center p-3 absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-10 pointer-events-none select-none">
                <span className="font-sans font-semibold text-xs sm:text-[13px] leading-tight">
                  Free night
                </span>
                <span className="font-sans font-semibold text-xs sm:text-[13px] leading-tight">
                  sky session
                </span>
              </div>
            </div>

            {/* Right Column: 5 Step Rows with Circular Badges */}
            <div
              ref={workflowRef}
              className="lg:col-span-7 divide-y divide-[rgba(245,239,235,0.1)] border-b border-[rgba(245,239,235,0.1)]"
            >
              {WORK_STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.title}
                    className="py-5 sm:py-6 flex items-start gap-5 sm:gap-6 group hover:bg-[rgba(255,255,255,0.02)] transition-colors px-2"
                  >
                    {/* Circular Icon Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#111113] border border-[rgba(245,239,235,0.25)] flex-shrink-0 flex items-center justify-center text-[#f5efeb] group-hover:border-[#f5efeb] transition-colors">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-sans font-bold text-sm sm:text-base text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors mb-1">
                        {step.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
