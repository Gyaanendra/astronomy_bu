"use client";

import { useState, useEffect } from "react";
import { globalCelestialEvents } from "@/content/calendar/global-events";
import { bennettCampusEvents } from "@/content/calendar/bennett-events";
import { CalendarScope, CelestialEvent } from "@/types/calendar.types";
import { getMoonPhase, MoonPhaseInfo } from "@/lib/astronomy";
import { BENNETT_COORDINATES } from "@/lib/constants";
import { Calendar, MapPin, Eye, Compass, ArrowUpRight, Sparkles, AlertCircle } from "lucide-react";

export function DualHorizonCalendar() {
  const [activeScope, setActiveScope] = useState<"all" | CalendarScope>("all");
  const [moon, setMoon] = useState<MoonPhaseInfo | null>(null);

  useEffect(() => {
    setMoon(getMoonPhase(new Date()));
  }, []);

  const displayedEvents: CelestialEvent[] = [
    ...(activeScope === "all" || activeScope === "global" ? globalCelestialEvents : []),
    ...(activeScope === "all" || activeScope === "bennett" ? bennettCampusEvents : []),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="w-full py-16 px-4 sm:px-8 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <span className="font-mono text-[10px] tracking-archival text-[#a39e93] block mb-2">
            CATEGORY // 05 · DUAL-HORIZON EPHEMERIS &amp; LOCAL OBSERVATORY
          </span>
          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl text-[#f5efeb]">
            Cosmic Calendar
          </h1>
          <p className="mt-4 font-sans text-sm text-[#a39e93] max-w-2xl leading-relaxed">
            A split observation engine tracking universal celestial phenomena alongside scheduled ground telescope sessions at Bennett University.
          </p>

          {/* Scope Switcher: All vs Global vs Bennett */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#635e57] mr-2">HORIZON VIEW:</span>
              <button
                onClick={() => setActiveScope("all")}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase transition-all ${
                  activeScope === "all"
                    ? "bg-[#eae5d9] text-[#09090b] font-semibold"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb]"
                }`}
              >
                Dual Unified Horizon
              </button>
              <button
                onClick={() => setActiveScope("global")}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase transition-all ${
                  activeScope === "global"
                    ? "bg-[#eae5d9] text-[#09090b] font-semibold"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb]"
                }`}
              >
                Global Cosmos Only
              </button>
              <button
                onClick={() => setActiveScope("bennett")}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase transition-all ${
                  activeScope === "bennett"
                    ? "bg-[#eae5d9] text-[#09090b] font-semibold"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb]"
                }`}
              >
                Bennett Campus Stargazing Only
              </button>
            </div>

            {/* Direct Stellarium Launcher */}
            <a
              href={`https://stellarium-web.org/?lat=${BENNETT_COORDINATES.latitude}&lon=${BENNETT_COORDINATES.longitude}&projection=stereo&constellations=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] font-mono text-xs uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#09090b] transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Launch Stellarium Web [28.45° N]</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Local Horizon Observatory Conditions Card */}
        <div className="mt-12 p-8 border border-[rgba(245,239,235,0.15)] bg-[#111113] grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#635e57] block mb-1">
              OBSERVATION STATION
            </span>
            <p className="font-mono text-sm text-[#f5efeb] font-semibold">
              {BENNETT_COORDINATES.name}
            </p>
            <p className="font-mono text-xs text-[#a39e93] mt-0.5">
              28.4595° N, 77.5046° E · 200m MSL
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#635e57] block mb-1">
              SKY QUALITY &amp; BORTLE
            </span>
            <p className="font-mono text-sm text-[#f5efeb] font-semibold">
              Class 6.5 (Suburban Skyglow)
            </p>
            <p className="font-sans text-xs text-[#a39e93] mt-0.5">
              Dual-narrowband Ha/OIII filters recommended for deep space.
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#635e57] block mb-1">
              LUNAR EPHEMERIS
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl">{moon ? moon.icon : "🌑"}</span>
              <div>
                <p className="font-mono text-xs text-[#f5efeb] font-semibold">
                  {moon ? moon.name : "Syncing..."}
                </p>
                <p className="font-mono text-[11px] text-[#d4af37]">
                  {moon ? `${moon.illumination}% Illumination` : ""}
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#635e57] block mb-1">
              CAMPUS TELESCOPE DEPLOYMENT
            </span>
            <p className="font-mono text-xs text-[#eae5d9] font-medium">
              Cricket Pavilion &amp; Block A Terrace
            </p>
            <p className="font-sans text-xs text-[#a39e93] mt-0.5">
              8-inch Dobsonians available on scheduled club nights.
            </p>
          </div>
        </div>

        {/* Calendar Events List */}
        <div className="mt-16 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,239,235,0.08)]">
            <span className="font-mono text-xs tracking-archival text-[#a39e93]">
              UPCOMING CELESTIAL TRANSITS ({displayedEvents.length} EVENTS LOADED)
            </span>
            <span className="font-mono text-[11px] text-[#635e57]">
              SORTED BY PROXIMITY
            </span>
          </div>

          <div className="divide-y divide-[rgba(245,239,235,0.1)] border-b border-[rgba(245,239,235,0.1)]">
            {displayedEvents.map((item) => (
              <div
                key={item.id}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-[#111113] px-2 sm:px-4 transition-colors group"
              >
                {/* Date & Scope */}
                <div className="md:col-span-3 flex flex-col font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#eae5d9]" />
                    <span className="text-sm font-semibold text-[#f5efeb]">
                      {item.date}
                    </span>
                  </div>
                  {item.time && (
                    <span className="text-[#a39e93] text-[11px] mt-1">{item.time}</span>
                  )}
                  <div className="mt-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase ${
                        item.scope === "bennett"
                          ? "bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]"
                          : "bg-[#eae5d9] text-[#09090b]"
                      }`}
                    >
                      {item.scope === "bennett" ? "CAMPUS OBSERVATION" : "GLOBAL CELESTIAL"}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="md:col-span-6 flex flex-col gap-2">
                  <h3 className="font-editorial-serif text-3xl text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#a39e93]">
                    <MapPin className="w-3.5 h-3.5 text-[#eae5d9]" />
                    <span>{item.visibilityOrLocation}</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Equipment & Peak Time */}
                <div className="md:col-span-3 flex flex-col justify-between h-full font-mono text-[11px] text-[#635e57] pt-1">
                  {item.peakTime && (
                    <div className="mb-2">
                      <span className="text-[#a39e93] block">PEAK VISIBILITY:</span>
                      <span className="text-[#f5efeb]">{item.peakTime}</span>
                    </div>
                  )}
                  {item.optimalEquipment && (
                    <div>
                      <span className="text-[#a39e93] block">RECOMMENDED GEAR:</span>
                      <span className="text-[#d4af37]">{item.optimalEquipment}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

