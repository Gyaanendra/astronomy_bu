"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function ProgramsBento() {
  const [filter, setFilter] = useState<string>("ALL");

  return (
    <section
      id="programs"
      className="w-full bg-[#09090b] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Section Header (Pinterest Reference 1) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(245,239,235,0.12)] gap-8">
          <div>
            <h2 className="font-editorial-serif italic text-6xl sm:text-8xl xl:text-9xl tracking-tight text-[#f5efeb] leading-none">
              PROGRAMS
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-5 max-w-lg">
            <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed md:text-right uppercase">
              A rotating series of dome sessions exploring the night sky through narrative, projection, and optical telescope telemetry.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2.5 text-[10px] sm:text-[11px] font-mono tracking-archival text-[#a39e93]">
              <button
                type="button"
                onClick={() => setFilter(filter === "DURATION" ? "ALL" : "DURATION")}
                className={`px-4 py-1.5 border transition-colors ${
                  filter === "DURATION"
                    ? "border-[#f5efeb] bg-[#f5efeb] text-[#09090b] font-semibold"
                    : "border-[rgba(245,239,235,0.2)] hover:border-[#f5efeb] hover:text-[#f5efeb]"
                }`}
              >
                DURATION ▾
              </button>
              <button
                type="button"
                onClick={() => setFilter(filter === "INTENSITY" ? "ALL" : "INTENSITY")}
                className={`px-4 py-1.5 border transition-colors ${
                  filter === "INTENSITY"
                    ? "border-[#f5efeb] bg-[#f5efeb] text-[#09090b] font-semibold"
                    : "border-[rgba(245,239,235,0.2)] hover:border-[#f5efeb] hover:text-[#f5efeb]"
                }`}
              >
                INTENSITY ▾
              </button>
              <button
                type="button"
                onClick={() => setFilter(filter === "TOPIC" ? "ALL" : "TOPIC")}
                className={`px-4 py-1.5 border transition-colors ${
                  filter === "TOPIC"
                    ? "border-[#f5efeb] bg-[#f5efeb] text-[#09090b] font-semibold"
                    : "border-[rgba(245,239,235,0.2)] hover:border-[#f5efeb] hover:text-[#f5efeb]"
                }`}
              >
                TOPIC ▾
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ROW 1: Featured 7/5 Split (Pinterest Reference 1)              */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-b border-[rgba(245,239,235,0.12)] divide-y md:divide-y-0 md:divide-x divide-[rgba(245,239,235,0.12)] bg-[#09090b]">
          
          {/* Card 1 (7 Columns): Newton's Cenotaph */}
          <Link
            href="/events"
            className="md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between group hover:bg-[#111113] transition-colors relative overflow-hidden min-h-[500px] lg:min-h-[580px]"
          >
            <div className="flex justify-end items-start z-10">
              <span className="font-mono text-xs sm:text-sm text-[#a39e93] group-hover:text-[#f5efeb] transition-colors">
                [ ↗ ]
              </span>
            </div>

            {/* Cenotaph Monumental Sphere */}
            <div className="relative w-full h-72 sm:h-96 my-4 flex items-center justify-center">
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                <Image
                  src="/images/assets/newtons-cenotaph-nobg.png"
                  alt="Newton's Cenotaph Armillary Sphere"
                  fill
                  className="object-contain filter brightness-95 contrast-110"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
            </div>

            <div className="z-10 pt-6 border-t border-[rgba(245,239,235,0.08)]">
              <h3 className="font-editorial-serif italic text-3xl sm:text-5xl text-[#f5efeb] tracking-tight">
                NEWTON&apos;S CENOTAPH
              </h3>
              <p className="font-mono text-xs sm:text-[13px] text-[#a39e93] leading-relaxed mt-2.5 max-w-xl">
                Examines Étienne-Louis Boullée&apos;s visionary monument to Newton as a speculative space where architecture and astronomy converge.
              </p>
              <div className="flex flex-wrap gap-5 mt-5 text-[10px] sm:text-[11px] font-mono tracking-archival text-[#8a847a]">
                <span>08.10 - 28.10</span>
                <span>CONSTELLATIONS</span>
                <span>PLANETS &amp; VOIDS</span>
              </div>
            </div>
          </Link>

          {/* Card 2 (5 Columns): Constellations and Absence */}
          <Link
            href="/events"
            className="md:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between group hover:bg-[#111113] transition-colors relative overflow-hidden min-h-[500px] lg:min-h-[580px]"
          >
            <div className="flex justify-end items-start z-10">
              <span className="font-mono text-xs sm:text-sm text-[#a39e93] group-hover:text-[#f5efeb] transition-colors">
                [ ↗ ]
              </span>
            </div>

            {/* Luminous Floating Astral Figure */}
            <div className="relative w-full h-72 sm:h-96 my-4 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 transform group-hover:scale-105 transition-transform duration-700 animate-float-celestial">
                <Image
                  src="/images/assets/astral-entity-nobg.png"
                  alt="Floating luminous astral figure"
                  fill
                  className="object-contain filter drop-shadow-[0_0_30px_rgba(245,239,235,0.25)]"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </div>

            <div className="z-10 pt-6 border-t border-[rgba(245,239,235,0.08)]">
              <h3 className="font-editorial-serif italic text-3xl sm:text-5xl text-[#f5efeb] tracking-tight">
                CONSTELLATIONS AND ABSENCE
              </h3>
              <p className="font-mono text-xs sm:text-[13px] text-[#a39e93] leading-relaxed mt-2.5 max-w-lg">
                Tracing the dissolution of constructed sky patterns when light pollution disrupts the connection to deep space.
              </p>
              <div className="flex flex-wrap gap-5 mt-5 text-[10px] sm:text-[11px] font-mono tracking-archival text-[#8a847a]">
                <span>12.06 - 17.08 2026</span>
                <span>60 MIN</span>
              </div>
            </div>
          </Link>
        </div>

        {/* ============================================================== */}
        {/* ROW 2: 4 Equal Columns (Pinterest Reference 1)                 */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x border-b border-[rgba(245,239,235,0.12)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(245,239,235,0.12)] bg-[#09090b]">
          
          {/* Card 3: Distance Between Stars */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[440px]"
          >
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6">
              <Image
                src="/images/assets/lunar-crater-master.jpg"
                alt="Lunar Crater relief"
                fill
                className="object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-2 group-hover:text-[#eae5d9] transition-colors">
                DISTANCE BETWEEN STARS
              </h3>
              <p className="font-sans text-xs text-[#a39e93] leading-relaxed">
                An exploration of how cultures interpret spatial relationships in the night sky, turning distance into narrative and meaning.
              </p>
            </div>
          </Link>

          {/* Card 4: Orion Across Cultures */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[440px]"
          >
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6">
              <Image
                src="/images/assets/orion-across-cultures.jpg"
                alt="Eclipse over mountain peaks"
                fill
                className="object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-2 group-hover:text-[#eae5d9] transition-colors">
                ORION ACROSS CULTURES
              </h3>
              <p className="font-sans text-xs text-[#a39e93] leading-relaxed">
                A comparative reading of Orion, tracing how one constellation becomes multiple figures across myth traditions.
              </p>
            </div>
          </Link>

          {/* Card 5: Cosmos and Mysticism (Technical Blueprint) */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[440px] relative"
          >
            <div className="flex justify-between items-start font-mono text-[10px] text-[#8a847a] mb-2">
              <span>09.06 - 23.08 26</span>
              <span className="text-[#a39e93] group-hover:text-[#f5efeb] transition-colors">[ ↗ ]</span>
            </div>
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6 flex items-center justify-center p-4">
              <Image
                src="/images/assets/celestial-mechanics-nobg.png"
                alt="Cosmos technical wireframe"
                fill
                className="object-contain filter contrast-115 opacity-85 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-2 group-hover:text-[#eae5d9] transition-colors">
                COSMOS AND MYSTICISM
              </h3>
              <p className="font-sans text-xs text-[#a39e93] leading-relaxed">
                An exploration of how cultures interpreted spatial relationships in the night sky, turning distance into narrative and meaning.
              </p>
            </div>
          </Link>

          {/* Card 6: Venus: Dual Nature */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[440px]"
          >
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6 flex items-center justify-center">
              <Image
                src="/images/assets/planetary-sphere-master.jpg"
                alt="Venus shaded sphere"
                fill
                className="object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-2 group-hover:text-[#eae5d9] transition-colors">
                VENUS: DUAL NATURE
              </h3>
              <p className="font-sans text-xs text-[#a39e93] leading-relaxed">
                Examining the twin morning and evening star apparitions of Venus across Mesopotamian and Mayan observational astronomy.
              </p>
            </div>
          </Link>
        </div>

        {/* ============================================================== */}
        {/* ROW 3: 5/7 Asymmetric Split (Pinterest Reference 1)            */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-b border-[rgba(245,239,235,0.12)] divide-y md:divide-y-0 md:divide-x divide-[rgba(245,239,235,0.12)] bg-[#09090b]">
          
          {/* Card 7 (5 Columns): Cosmos and Mysticism (Plate XXV Mandala) */}
          <Link
            href="/events"
            className="md:col-span-5 p-8 sm:p-12 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[460px]"
          >
            <span className="font-mono text-[10px] text-[#8a847a] uppercase mb-2">
              PLATE XXV // ARCHIVE
            </span>
            <div className="relative w-full aspect-square max-w-[340px] mx-auto my-4 flex items-center justify-center">
              <Image
                src="/images/assets/celestial-mandala-bone-nobg.png"
                alt="Concentric circular cosmic mandala"
                fill
                className="object-contain filter brightness-95 contrast-110 group-hover:rotate-12 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <div className="pt-4 border-t border-[rgba(245,239,235,0.08)]">
              <h3 className="font-editorial-serif italic text-2xl sm:text-4xl text-[#f5efeb] tracking-tight">
                COSMOS AND MYSTICISM
              </h3>
              <p className="font-sans text-xs text-[#a39e93] leading-relaxed mt-2">
                Concentric geometric representations of the Ptolemaic spheres and celestial armatures.
              </p>
            </div>
          </Link>

          {/* Card 8 (7 Columns): Before the Star Maps */}
          <Link
            href="/events"
            className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[460px]"
          >
            <span className="font-mono text-[10px] text-[#8a847a] uppercase mb-2">
              CARTOGRAPHY // ATLAS
            </span>
            <div className="relative w-full aspect-[16/10] my-4 border border-[rgba(245,239,235,0.12)] overflow-hidden">
              <Image
                src="/images/assets/constellations-chart-master.jpg"
                alt="Vintage antique celestial star chart"
                fill
                className="object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            <div className="pt-4 border-t border-[rgba(245,239,235,0.08)]">
              <h3 className="font-editorial-serif italic text-2xl sm:text-4xl text-[#f5efeb] tracking-tight">
                BEFORE THE STAR MAPS
              </h3>
              <p className="font-sans text-xs text-[#a39e93] leading-relaxed mt-2">
                An examination of early celestial mapping, where imagination shaped the structure of the sky.
              </p>
            </div>
          </Link>
        </div>

        {/* ============================================================== */}
        {/* ROW 4: 4 Equal Columns Bottom Row (Pinterest Reference 1)      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x border-b border-[rgba(245,239,235,0.12)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(245,239,235,0.12)] bg-[#09090b]">
          
          {/* Card 9: Russian Cosmism */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[380px]"
          >
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6 flex items-center justify-center p-3">
              <Image
                src="/images/assets/celestial-mechanics-nobg.png"
                alt="Orbital mechanics diagram"
                fill
                className="object-contain filter contrast-115 opacity-85 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase group-hover:text-[#eae5d9] transition-colors">
                RUSSIAN COSMISM
              </h3>
            </div>
          </Link>

          {/* Card 10: Phases of the Moon */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[380px]"
          >
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6 flex items-center justify-center p-3">
              <Image
                src="/images/assets/janus-moon-deity-nobg.png"
                alt="Dual faced moon deity"
                fill
                className="object-contain filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase group-hover:text-[#eae5d9] transition-colors">
                PHASES OF THE MOON
              </h3>
            </div>
          </Link>

          {/* Card 11: Comets and Portents */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[380px]"
          >
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6 flex items-center justify-center p-3">
              <Image
                src="/images/assets/cosmic-vortex-nobg.png"
                alt="Spiral galaxy vortex"
                fill
                className="object-contain filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase group-hover:text-[#eae5d9] transition-colors">
                COMETS AND PORTENTS
              </h3>
            </div>
          </Link>

          {/* Card 12: Russian Cosmism 2 */}
          <Link
            href="/events"
            className="p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#111113] transition-colors min-h-[380px]"
          >
            <div className="relative w-full aspect-square border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden mb-6 flex items-center justify-center p-3">
              <Image
                src="/images/assets/dome-experience-vortex-nobg.png"
                alt="Eclipse over figure on ground"
                fill
                className="object-contain filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase group-hover:text-[#eae5d9] transition-colors">
                RUSSIAN COSMISM
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
