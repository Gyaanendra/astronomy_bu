"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StippleCanvas } from "@/components/ui/stipple-canvas";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const astralRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Respect prefers-reduced-motion
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      // Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(metaRef.current, {
        autoAlpha: 0,
        y: -15,
        duration: 0.9,
      })
        .from(
          headlineRef.current,
          {
            autoAlpha: 0,
            y: 40,
            duration: 1.1,
          },
          "-=0.5",
        )
        .from(
          astralRef.current,
          {
            autoAlpha: 0,
            scale: 0.92,
            duration: 1.4,
          },
          "-=0.9",
        )
        .from(
          ctaRef.current,
          {
            autoAlpha: 0,
            x: 20,
            duration: 0.8,
          },
          "-=0.8",
        );

      // Scroll-driven subtle zero-G parallax
      if (astralRef.current && containerRef.current) {
        gsap.to(astralRef.current, {
          yPercent: 18,
          scale: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="sanctuary"
      className="relative w-full flex flex-col justify-between border-b border-[rgba(245,239,235,0.08)] bg-[#1D1D1D] overflow-hidden min-h-[calc(100dvh-5rem)] lg:h-[calc(100dvh-5rem)] lg:min-h-[700px] lg:max-h-[1080px] pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12"
    >
      {/* Background Interactive Stipple Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <StippleCanvas density={120} />
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 flex-1 flex flex-col justify-between relative z-10">
        {/* ============================================================== */}
        {/* 1. TOP METADATA ROW (Minimalist Clean Ephemeris)               */}
        {/* ============================================================== */}
        <div
          ref={metaRef}
          className="w-full flex flex-col sm:flex-row items-start justify-between gap-6 font-mono text-[10px] sm:text-[11px] xl:text-xs tracking-[0.18em] uppercase pt-1"
        >
          {/* Upper Left: Tagline & Philosophical Inquiry */}
          <div className="max-w-xl space-y-2.5">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-[13px] tracking-[0.24em] text-[#eae5d9] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eae5d9] animate-pulse" />
              <span>&ldquo;By Starlight, we unfurl the sky&rdquo;</span>
            </div>

            <p className="font-mono text-[10px] sm:text-[11px] xl:text-xs tracking-[0.16em] text-[#a39e93] leading-relaxed max-w-md">
              An inquiry into pattern-making in the sky, and what it means when
              structure breaks or disappears.
            </p>
            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#8a847a]">
              Bennett University Observatory Archive · Station 28.4595° N,
              77.5046° E
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. FLOATING CENTER ARTWORK (Zero-G Weightless Spatial Figure)   */}
        {/* ============================================================== */}
        <div
          ref={astralRef}
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-[42%] sm:-translate-x-[38%] lg:-translate-x-[32%] xl:-translate-x-[28%] top-1/2 -translate-y-[52%] sm:-translate-y-[54%] w-[300px] sm:w-[460px] lg:w-[580px] xl:w-[680px] h-[360px] sm:h-[500px] lg:h-[620px] xl:h-[700px] pointer-events-none select-none z-10"
        >
          {/* Subtle Ambient Radial Halos */}
          <div className="absolute inset-0 bg-radial from-[rgba(245,239,235,0.18)] via-[rgba(245,239,235,0.04)] to-transparent rounded-full blur-3xl transform scale-110 pointer-events-none" />

          {/* Constellation Bokeh Star Points */}
          <div className="absolute -left-10 sm:-left-16 top-1/4 w-2.5 h-2.5 rounded-full bg-[#eae5d9]/60 blur-[1px] animate-pulse" />
          <div className="absolute -left-20 sm:-left-32 top-1/3 w-2 h-2 rounded-full bg-[#eae5d9]/40 blur-[1px] animate-pulse delay-300" />
          <div className="absolute -left-6 sm:-left-12 top-1/2 w-3.5 h-3.5 rounded-full bg-[#eae5d9]/50 blur-[1.5px] animate-pulse delay-700" />
          <div className="absolute left-1/3 -top-6 w-2 h-2 rounded-full bg-[#eae5d9]/50 blur-[1px] animate-pulse delay-500" />
          <div className="absolute -left-12 sm:-left-20 bottom-1/4 w-3 h-3 rounded-full bg-[#eae5d9]/45 blur-[1.5px] animate-pulse delay-1000" />

          {/* Ethereal Astral Entity */}
          <div className="relative w-full h-full animate-float-celestial">
            <Image
              src="/images/assets/astral-entity-nobg.png"
              alt="Celestial Astral Figure Floating in Zero Gravity"
              fill
              priority
              className="object-contain filter drop-shadow-[0_0_45px_rgba(245,239,235,0.32)]"
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 480px, (max-width: 1536px) 620px, 700px"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. BOTTOM DISPLAY ROW: Headline & Action CTA                   */}
        {/* ============================================================== */}
        <div className="relative z-20 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10 pb-2 sm:pb-4">
          {/* Main Headline */}
          <div className="max-w-5xl">
            <h1
              ref={headlineRef}
              className="font-editorial-serif italic text-[clamp(3.4rem,10.8vw,11.4rem)] tracking-tight text-[#f5efeb] leading-[0.84] select-none"
            >
              <span className="block whitespace-nowrap">CONSTELLATIONS</span>
              <span className="block whitespace-nowrap text-[#eae5d9] mt-1 sm:mt-2">
                AND ABSENCE
              </span>
            </h1>
          </div>

          {/* Date & Solid Bone Button */}
          <div
            ref={ctaRef}
            className="flex flex-col items-start lg:items-end gap-3 sm:gap-3.5 font-mono z-30 pb-1 flex-shrink-0"
          >
            <span className="text-xs sm:text-[13px] tracking-[0.22em] text-[#f5efeb] uppercase font-semibold">
              12.06 — 17.08 2026
            </span>
            <Link
              href="/calendar"
              className="px-8 sm:px-11 py-3.5 sm:py-4 bg-[#eae5d9] text-[#1D1D1D] text-xs sm:text-[13px] tracking-archival font-semibold uppercase hover:bg-white transition-all shadow-2xl block text-center border border-transparent hover:border-[#f5efeb]"
            >
              BUY TICKET
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
