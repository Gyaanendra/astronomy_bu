"use client";

import { useState, useEffect, useRef } from "react";
import { globalCelestialEvents } from "@/content/calendar/global-events";
import { bennettCampusEvents } from "@/content/calendar/bennett-events";
import { CalendarScope, CelestialEvent } from "@/types/calendar.types";
import { getMoonPhase, MoonPhaseInfo } from "@/lib/astronomy";
import { BENNETT_COORDINATES } from "@/lib/constants";
import {
  Calendar,
  MapPin,
  Eye,
  Compass,
  ArrowUpRight,
  Sparkles,
  Ticket,
  Clock,
  X,
  CheckCircle,
  Share2,
} from "lucide-react";
import gsap from "gsap";

export function DualHorizonCalendar() {
  const [activeScope, setActiveScope] = useState<"all" | CalendarScope>("all");
  const [moon, setMoon] = useState<MoonPhaseInfo | null>(null);
  const [activePassEvent, setActivePassEvent] = useState<CelestialEvent | null>(null);
  const [attendeeName, setAttendeeName] = useState("");
  const [passGenerated, setPassGenerated] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMoon(getMoonPhase(new Date()));
  }, []);

  const displayedEvents: CelestialEvent[] = [
    ...(activeScope === "all" || activeScope === "global" ? globalCelestialEvents : []),
    ...(activeScope === "all" || activeScope === "bennett" ? bennettCampusEvents : []),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // GSAP animation when scope changes
  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.querySelectorAll(".calendar-event-row"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }
  }, [activeScope]);

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (attendeeName.trim()) {
      setPassGenerated(true);
    }
  };

  return (
    <div className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 xl:px-24 bg-[#1D1D1D]">
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="font-mono text-[10px] tracking-archival text-[#a39e93] uppercase">
              CATEGORY // 05 · DUAL-HORIZON EPHEMERIS &amp; LOCAL OBSERVATORY
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8a847a]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>LIVE EPHEMERIS SYNCHRONIZED</span>
            </div>
          </div>

          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl lg:text-8xl text-[#f5efeb]">
            Cosmic Calendar
          </h1>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#a39e93] max-w-3xl leading-relaxed">
            A split observation engine tracking universal celestial phenomena alongside scheduled ground telescope observation sessions at Bennett University.
          </p>

          {/* Scope Switcher: All vs Global vs Bennett */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-[#8a847a] mr-2">HORIZON VIEW:</span>
              <button
                onClick={() => setActiveScope("all")}
                className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase transition-all ${
                  activeScope === "all"
                    ? "bg-[#eae5d9] text-[#1D1D1D] font-bold shadow-sm"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[rgba(245,239,235,0.3)]"
                }`}
              >
                Dual Unified Horizon
              </button>
              <button
                onClick={() => setActiveScope("global")}
                className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase transition-all ${
                  activeScope === "global"
                    ? "bg-[#eae5d9] text-[#1D1D1D] font-bold shadow-sm"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[rgba(245,239,235,0.3)]"
                }`}
              >
                Global Cosmos Only
              </button>
              <button
                onClick={() => setActiveScope("bennett")}
                className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase transition-all ${
                  activeScope === "bennett"
                    ? "bg-[#eae5d9] text-[#1D1D1D] font-bold shadow-sm"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[rgba(245,239,235,0.3)]"
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] font-mono text-xs uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#1D1D1D] transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Launch Stellarium Web [28.45° N]</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Local Horizon Observatory Conditions Card */}
        <div className="mt-12 p-8 rounded-[28px] border border-[rgba(245,239,235,0.15)] bg-[#111113] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#8a847a] block mb-1">
              OBSERVATION STATION
            </span>
            <p className="font-mono text-sm text-[#f5efeb] font-semibold">
              {BENNETT_COORDINATES.name}
            </p>
            <p className="font-mono text-xs text-[#a39e93] mt-0.5">
              28.4595° N, 77.5046° E · 208m MSL
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#8a847a] block mb-1">
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
            <span className="font-mono text-[10px] tracking-archival text-[#8a847a] block mb-1">
              LUNAR EPHEMERIS
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{moon ? moon.icon : "🌑"}</span>
              <div>
                <p className="font-mono text-xs text-[#f5efeb] font-semibold">
                  {moon ? moon.name : "Syncing..."}
                </p>
                <p className="font-mono text-[11px] text-[#eae5d9]">
                  {moon ? `${moon.illumination}% Illumination` : ""}
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-archival text-[#8a847a] block mb-1">
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
            <span className="font-mono text-[11px] text-[#8a847a]">
              CHRONOLOGICAL DUAL EPHEMERIS
            </span>
          </div>

          <div ref={listRef} className="flex flex-col gap-4">
            {displayedEvents.map((item) => (
              <div
                key={item.id}
                className="calendar-event-row p-6 sm:p-8 rounded-[24px] border border-[rgba(245,239,235,0.1)] bg-[#111113] hover:border-[rgba(245,239,235,0.25)] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
              >
                {/* Date & Scope */}
                <div className="md:col-span-3 flex flex-col font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#eae5d9]" />
                    <span className="text-base font-semibold text-[#f5efeb]">
                      {item.date}
                    </span>
                  </div>
                  {item.time && (
                    <span className="text-[#a39e93] text-xs mt-1">{item.time}</span>
                  )}
                  <div className="mt-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase ${
                        item.scope === "bennett"
                          ? "bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]"
                          : "bg-[#eae5d9] text-[#1D1D1D]"
                      }`}
                    >
                      {item.scope === "bennett" ? "CAMPUS OBSERVATION" : "GLOBAL CELESTIAL"}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="md:col-span-6 flex flex-col gap-2">
                  <h3 className="font-editorial-serif italic text-2xl sm:text-3xl text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors">
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

                {/* Equipment & Peak Time & Action */}
                <div className="md:col-span-3 flex flex-col justify-between h-full font-mono text-[11px] text-[#8a847a]">
                  <div className="flex flex-col gap-2">
                    {item.peakTime && (
                      <div>
                        <span className="text-[#a39e93] block text-[10px]">PEAK VISIBILITY:</span>
                        <span className="text-[#f5efeb] font-semibold">{item.peakTime}</span>
                      </div>
                    )}
                    {item.optimalEquipment && (
                      <div>
                        <span className="text-[#a39e93] block text-[10px]">RECOMMENDED GEAR:</span>
                        <span className="text-[#eae5d9]">{item.optimalEquipment}</span>
                      </div>
                    )}
                  </div>

                  {item.scope === "bennett" && (
                    <button
                      onClick={() => {
                        setActivePassEvent(item);
                        setPassGenerated(false);
                        setAttendeeName("");
                      }}
                      className="mt-4 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs font-semibold uppercase hover:bg-white transition-all shadow-sm w-fit"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>RSVP PASS</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RSVP Pass Modal for Bennett Events */}
      {activePassEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePassEvent(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#171719] border border-[rgba(245,239,235,0.2)] rounded-[32px] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePassEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-full border border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb] hover:bg-white/5 transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!passGenerated ? (
              <form onSubmit={handleGeneratePass} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#eae5d9] text-[#1D1D1D] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase">
                    CAMPUS STARRY NIGHT PASS
                  </span>
                </div>
                <h3 className="font-editorial-serif italic text-2xl sm:text-3xl text-[#f5efeb]">
                  {activePassEvent.title}
                </h3>
                <div className="p-4 rounded-[16px] bg-[#111113] border border-[rgba(245,239,235,0.08)] font-mono text-xs text-[#a39e93] flex flex-col gap-1.5">
                  <p>DATE: {activePassEvent.date} {activePassEvent.time && `· ${activePassEvent.time}`}</p>
                  <p>VENUE: {activePassEvent.visibilityOrLocation}</p>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="student-name" className="font-mono text-xs text-[#eae5d9]">
                    STUDENT / ATTENDEE FULL NAME:
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    placeholder="e.g. Aryan Singh"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="px-4 py-3 rounded-[14px] bg-[#111113] border border-[rgba(245,239,235,0.15)] text-[#f5efeb] font-mono text-sm focus:outline-none focus:border-[#eae5d9]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 px-6 py-3 rounded-full bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md"
                >
                  GENERATE OBSERVATORY PASS
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center p-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
                <span className="font-mono text-[10px] tracking-widest text-[#8a847a] uppercase">
                  CONFIRMED ADMISSION // STARGATE 28.45° N
                </span>
                <h3 className="font-editorial-serif italic text-3xl text-[#f5efeb] mt-1 mb-4">
                  {attendeeName}
                </h3>

                <div className="w-full p-5 rounded-[20px] bg-[#111113] border border-dashed border-[rgba(245,239,235,0.2)] font-mono text-xs text-[#eae5d9] flex flex-col gap-2 my-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-[#8a847a]">EVENT:</span>
                    <span className="text-right font-medium">{activePassEvent.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a847a]">SCHEDULE:</span>
                    <span>{activePassEvent.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a847a]">ENTRY CODE:</span>
                    <span className="text-[#d4af37] font-bold">BU-ASTRO-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-[#8a847a] mt-3">
                  Please carry your Bennett ID card and arrive with a red flashlight to preserve night vision.
                </p>

                <button
                  onClick={() => setActivePassEvent(null)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs font-semibold uppercase hover:bg-white transition-all"
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
