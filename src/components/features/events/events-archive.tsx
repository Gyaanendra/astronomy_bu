"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { eventsRegistry } from "@/content/events/events-registry";
import { EventCategory, EventItem } from "@/types/event.types";
import {
  Calendar,
  MapPin,
  User,
  X,
  ChevronDown,
  Share2,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EventsArchive() {
  const [selectedTenure, setSelectedTenure] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const tenures = ["ALL", "2025-2026", "2024-2025", "2023-2024"];
  const categories: ("ALL" | EventCategory)[] = [
    "ALL",
    "Workshop",
    "Lecture",
    "Exhibition",
    "Competition",
  ];

  // Filter actual events
  const filteredEvents = eventsRegistry.filter((event) => {
    const tenureMatch = selectedTenure === "ALL" || event.tenure === selectedTenure;
    const catMatch = selectedCategory === "ALL" || event.category === selectedCategory;
    return tenureMatch && catMatch;
  });

  // Entrance animations on grid change
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (
        !gridRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.fromTo(
        gridRef.current.querySelectorAll(".mosaic-card"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [selectedTenure, selectedCategory] }
  );

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Split event date (e.g. "2026-01-22" -> { top: "22.01", bottom: "26" })
  const formatEventDate = (dateStr: string) => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0].slice(-2);
      const month = parts[1];
      const day = parts[2];
      return { top: `${day}.${month}`, bottom: year };
    }
    return { top: dateStr, bottom: "" };
  };

  // Group events into mosaic patterns: 2 hero cards, then 4 cards, etc.
  const heroLeftEvent = filteredEvents[0];
  const heroRightEvent = filteredEvents[1];
  const rowTwoEvents = filteredEvents.slice(2, 6);
  const remainingEvents = filteredEvents.slice(6);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#1D1D1D] text-[#f5efeb] font-sans selection:bg-[#eae5d9] selection:text-[#1D1D1D]"
    >
      {/* Header matching exact original design */}
      <div className="w-full pt-16 sm:pt-24 pb-12 px-6 sm:px-12 lg:px-20 xl:px-24 border-b border-[rgba(245,239,235,0.12)]">
        <div className="w-full max-w-[1800px] mx-auto">
          {/* Top metadata line */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="font-mono text-[10px] tracking-archival text-[#a39e93] uppercase">
              CATEGORY // 03 · CHRONICLES &amp; TENURE LOGS
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8a847a]">
              <span className="w-2 h-2 rounded-full bg-[#eae5d9] animate-ping" />
              <span>{filteredEvents.length} ARCHIVAL LOGS CATALOGED</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl lg:text-8xl text-[#f5efeb]">
            Past Events &amp; This Tenure
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="mt-4 font-sans text-sm sm:text-base text-[#a39e93] max-w-3xl leading-relaxed">
            A chronological timeline of observation nights, theoretical cosmology lectures, guest masterclasses, and inter-university competitions spanning 2023 to 2026.
          </p>

          {/* Filters Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            {/* Tenure Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-[#8a847a] mr-2">TENURE:</span>
              {tenures.map((tenure) => (
                <button
                  key={tenure}
                  onClick={() => setSelectedTenure(tenure)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase transition-all cursor-pointer ${
                    selectedTenure === tenure
                      ? "bg-[#eae5d9] text-[#1D1D1D] font-bold shadow-sm"
                      : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[rgba(245,239,235,0.3)]"
                  }`}
                >
                  {tenure === "ALL" ? "ALL TENURES" : tenure}
                </button>
              ))}
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[11px] text-[#8a847a] mr-2">DISCIPLINE:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "border border-[#f5efeb] text-[#f5efeb] bg-[#222225]"
                      : "text-[#8a847a] hover:text-[#a39e93] border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Events Mosaic Grid */}
      <div className="w-full max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-10">
        {filteredEvents.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-sm text-[#8a847a] uppercase tracking-wider">
              No matching archival records found for the selected filters.
            </p>
          </div>
        ) : (
          <div ref={gridRef} className="flex flex-col gap-4 sm:gap-6">
            {/* ROW 1: 2-Card Asymmetric Hero Split (7 cols vs 5 cols) */}
            {(heroLeftEvent || heroRightEvent) && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Hero Left Card (7 cols) */}
                {heroLeftEvent && (
                  <div
                    onClick={() => setActiveModalEvent(heroLeftEvent)}
                    className="mosaic-card lg:col-span-7 relative min-h-[460px] sm:min-h-[560px] bg-[#0f0f11] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer"
                  >
                    {heroLeftEvent.image ? (
                      <Image
                        src={heroLeftEvent.image}
                        alt={heroLeftEvent.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center grayscale contrast-125 brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111113]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />

                    {/* Top Header: Date left, [ ↗ ] right */}
                    <div className="absolute top-6 left-6 right-6 flex items-start justify-between font-mono text-sm sm:text-base tracking-wider text-[#f5efeb]">
                      <div className="leading-tight">
                        <span>{formatEventDate(heroLeftEvent.date).top}</span>
                        <span className="block text-[#a39e93] text-xs mt-0.5">
                          {formatEventDate(heroLeftEvent.date).bottom}
                        </span>
                      </div>
                      <span className="text-xl sm:text-2xl font-mono tracking-widest group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        [ ↗ ]
                      </span>
                    </div>

                    {/* Bottom Overlay Info */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wider text-[#f5efeb] uppercase mb-3 leading-snug">
                        {heroLeftEvent.title}
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed max-w-xl mb-4 font-normal line-clamp-2 sm:line-clamp-3">
                        {heroLeftEvent.description}
                      </p>
                      <div className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#8a847a] uppercase flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="text-[#d4af37]">{heroLeftEvent.category}</span>
                        <span>TENURE {heroLeftEvent.tenure}</span>
                        <span>{heroLeftEvent.location.split(",")[0]}</span>
                        {heroLeftEvent.guest && <span>KEYNOTE: {heroLeftEvent.guest}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hero Right Card (5 cols, tall format) */}
                {heroRightEvent && (
                  <div
                    onClick={() => setActiveModalEvent(heroRightEvent)}
                    className="mosaic-card lg:col-span-5 relative min-h-[460px] sm:min-h-[560px] bg-[#0c0c0e] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer"
                  >
                    {heroRightEvent.image ? (
                      <Image
                        src={heroRightEvent.image}
                        alt={heroRightEvent.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center grayscale contrast-125 brightness-80 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111113]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/35" />

                    {/* Top Header: Date left, [ ↗ ] right */}
                    <div className="absolute top-6 left-6 right-6 flex items-start justify-between font-mono text-sm sm:text-base tracking-wider text-[#f5efeb]">
                      <div className="leading-tight">
                        <span>{formatEventDate(heroRightEvent.date).top}</span>
                        <span className="block text-[#a39e93] text-xs mt-0.5">
                          {formatEventDate(heroRightEvent.date).bottom}
                        </span>
                      </div>
                      <span className="text-xl sm:text-2xl font-mono tracking-widest group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        [ ↗ ]
                      </span>
                    </div>

                    {/* Bottom Overlay Info */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-wider text-[#f5efeb] uppercase mb-2 leading-snug">
                        {heroRightEvent.title}
                      </h2>
                      <p className="font-sans text-xs text-[#a39e93] leading-relaxed mb-3 line-clamp-2">
                        {heroRightEvent.description}
                      </p>
                      <div className="font-mono text-[10px] tracking-wider text-[#8a847a] uppercase flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[#d4af37]">{heroRightEvent.category}</span>
                        <span>TENURE {heroRightEvent.tenure}</span>
                        <span>{heroRightEvent.location.split(",")[0]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ROW 2: 4-Column Mosaic Row */}
            {rowTwoEvents.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {rowTwoEvents.map((event, idx) => {
                  const dateInfo = formatEventDate(event.date);
                  // Give card 3 (index 2 in row two) extra detailed overlay matching the reference
                  const isDetailed = idx === 2;

                  return (
                    <div
                      key={event.id}
                      onClick={() => setActiveModalEvent(event)}
                      className="mosaic-card relative aspect-[3/4] bg-[#111113] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer flex flex-col justify-between p-6"
                    >
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#18181b]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/45" />

                      {/* Top Header */}
                      <div className="relative z-10 flex items-start justify-between font-mono text-xs text-[#f5efeb]">
                        {isDetailed ? (
                          <div className="leading-tight">
                            <span>{dateInfo.top}</span>
                            <span className="block text-[#a39e93] text-[10px]">
                              {dateInfo.bottom}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#a39e93] uppercase tracking-wider">
                            {event.category}
                          </span>
                        )}
                        <span className="text-xl font-mono text-[#f5efeb] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                          [ ↗ ]
                        </span>
                      </div>

                      {/* Bottom Info */}
                      <div className="relative z-10">
                        <h3 className="font-mono text-base sm:text-lg font-semibold tracking-wider text-[#f5efeb] uppercase whitespace-pre-line leading-snug mb-2">
                          {event.title}
                        </h3>
                        {isDetailed && (
                          <p className="font-sans text-[11px] text-[#a39e93] leading-relaxed mb-3 line-clamp-2 font-normal">
                            {event.description}
                          </p>
                        )}
                        <div className="font-mono text-[10px] tracking-wider text-[#8a847a] uppercase flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span>{event.category}</span>
                          <span>·</span>
                          <span>{event.tenure}</span>
                          {event.guest && (
                            <>
                              <span>·</span>
                              <span className="text-[#d4af37]">{event.guest}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ROW 3 & ONWARDS: Remaining Events */}
            {remainingEvents.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-2">
                {remainingEvents.map((event) => {
                  const dateInfo = formatEventDate(event.date);

                  return (
                    <div
                      key={event.id}
                      onClick={() => setActiveModalEvent(event)}
                      className="mosaic-card relative aspect-[4/3] bg-[#111113] overflow-hidden border border-[rgba(245,239,235,0.1)] group cursor-pointer flex flex-col justify-between p-6"
                    >
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#18181b]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/40" />

                      <div className="relative z-10 flex items-start justify-between font-mono text-xs text-[#f5efeb]">
                        <div className="leading-tight">
                          <span>{dateInfo.top}</span>
                          <span className="block text-[#a39e93] text-[10px]">
                            {dateInfo.bottom}
                          </span>
                        </div>
                        <span className="text-xl font-mono text-[#f5efeb] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                          [ ↗ ]
                        </span>
                      </div>

                      <div className="relative z-10">
                        <span className="font-mono text-[10px] text-[#d4af37] tracking-widest uppercase block mb-1">
                          {event.category} • {event.tenure}
                        </span>
                        <h3 className="font-editorial-serif italic text-xl sm:text-2xl text-[#f5efeb] leading-snug mb-2 group-hover:text-white transition-colors">
                          {event.title}
                        </h3>
                        <p className="font-sans text-xs text-[#a39e93] line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real Event Dossier Modal Inspector */}
      {activeModalEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#171719] text-[#f5efeb] border border-[rgba(245,239,235,0.2)] rounded-[24px] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Close event"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#eae5d9] text-[#1D1D1D] px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
                {activeModalEvent.category}
              </span>
              <span className="font-mono text-[10px] text-[#8a847a] tracking-widest">
                TENURE {activeModalEvent.tenure} // REF #{String(activeModalEvent.id).toUpperCase()}
              </span>
            </div>

            <h2 className="font-editorial-serif italic text-3xl sm:text-4xl text-[#f5efeb] my-3 leading-snug">
              {activeModalEvent.title}
            </h2>

            {/* Event Key Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 p-4 rounded-xl bg-[#111113] border border-[rgba(245,239,235,0.1)] font-mono text-xs text-[#a39e93]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#eae5d9]" />
                <span>
                  DATE: {activeModalEvent.date}{" "}
                  {activeModalEvent.time && `(${activeModalEvent.time})`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#eae5d9]" />
                <span>LOCATION: {activeModalEvent.location}</span>
              </div>
              {activeModalEvent.guest && (
                <div className="flex items-center gap-2 sm:col-span-2 text-[#d4af37]">
                  <User className="w-4 h-4" />
                  <span>KEYNOTE / GUEST: {activeModalEvent.guest}</span>
                </div>
              )}
            </div>

            {/* Event Photo */}
            {activeModalEvent.image && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden my-4 border border-[rgba(245,239,235,0.1)] bg-[#111113]">
                <Image
                  src={activeModalEvent.image}
                  alt={activeModalEvent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            )}

            {/* Event Description */}
            <p className="font-sans text-sm sm:text-base text-[#eae5d9]/90 leading-relaxed my-4">
              {activeModalEvent.description}
            </p>

            {/* Additional Photos Gallery if available */}
            {activeModalEvent.photos && activeModalEvent.photos.length > 1 && (
              <div className="my-6">
                <span className="font-mono text-[10px] text-[#8a847a] uppercase tracking-widest block mb-2">
                  ARCHIVAL FIELD PHOTOGRAPHY
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {activeModalEvent.photos.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[rgba(245,239,235,0.1)] bg-[#111113]"
                    >
                      <Image
                        src={img}
                        alt={`Photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-8 pt-6 border-t border-[rgba(245,239,235,0.1)] flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-[#8a847a]">
                BENNETT UNIVERSITY OBSERVATORY CHRONICLES
              </span>

              <div className="flex items-center gap-3">
                {activeModalEvent.registerLink && (
                  <a
                    href={activeModalEvent.registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs font-bold uppercase hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>Register Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(245,239,235,0.2)] text-[#eae5d9] font-mono text-xs hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Link Copied!" : "Share Dossier"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
