"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { eventsRegistry } from "@/content/events/events-registry";
import { EventCategory, EventItem } from "@/types/event.types";
import {
  Calendar,
  MapPin,
  User,
  ChevronRight,
  X,
  Compass,
  Sparkles,
  Camera,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";

export function EventsArchive() {
  const [selectedTenure, setSelectedTenure] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const tenures = ["ALL", "2025-2026", "2024-2025", "2023-2024"];
  const categories: ("ALL" | EventCategory)[] = [
    "ALL",
    "Workshop",
    "Lecture",
    "Exhibition",
    "Competition",
  ];

  const filteredEvents = eventsRegistry.filter((event) => {
    const tenureMatch = selectedTenure === "ALL" || event.tenure === selectedTenure;
    const catMatch = selectedCategory === "ALL" || event.category === selectedCategory;
    return tenureMatch && catMatch;
  });

  // GSAP animation on filter change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".event-card"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [selectedTenure, selectedCategory]);

  return (
    <div className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 xl:px-24 bg-[#1D1D1D]">
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="font-mono text-[10px] tracking-archival text-[#a39e93] uppercase">
              CATEGORY // 03 · CHRONICLES &amp; TENURE LOGS
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8a847a]">
              <span className="w-2 h-2 rounded-full bg-[#eae5d9] animate-ping" />
              <span>{filteredEvents.length} ARCHIVAL LOGS CATALOGED</span>
            </div>
          </div>

          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl lg:text-8xl text-[#f5efeb]">
            Past Events &amp; This Tenure
          </h1>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#a39e93] max-w-3xl leading-relaxed">
            A chronological timeline of observation nights, theoretical cosmology lectures, guest masterclasses, and inter-university competitions spanning 2023 to 2026.
          </p>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            {/* Tenure Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-[#8a847a] mr-2">TENURE:</span>
              {tenures.map((tenure) => (
                <button
                  key={tenure}
                  onClick={() => setSelectedTenure(tenure)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase transition-all ${
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
                  className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase transition-all ${
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

        {/* Timeline / Events Grid */}
        <div ref={gridRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onInspect={() => setActiveModalEvent(event)}
            />
          ))}
        </div>
      </div>

      {/* Full Dossier Inspector Modal */}
      {activeModalEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#171719] border border-[rgba(245,239,235,0.2)] rounded-[32px] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb] hover:bg-white/5 transition-all"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#eae5d9] text-[#1D1D1D] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase">
                {activeModalEvent.category}
              </span>
              <span className="font-mono text-[10px] text-[#8a847a] tracking-widest">
                TENURE {activeModalEvent.tenure} // DOSSIER REF #{String(activeModalEvent.id).toUpperCase()}
              </span>
            </div>

            <h2 className="font-editorial-serif italic text-3xl sm:text-5xl text-[#f5efeb] mt-3">
              {activeModalEvent.title}
            </h2>

            {/* Event Key Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 p-5 rounded-[20px] bg-[#111113] border border-[rgba(245,239,235,0.1)] font-mono text-xs text-[#a39e93]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#eae5d9]" />
                <span>DATE: {activeModalEvent.date} {activeModalEvent.time && `(${activeModalEvent.time})`}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#eae5d9]" />
                <span>LOCATION: {activeModalEvent.location}</span>
              </div>
              {activeModalEvent.guest && (
                <div className="flex items-center gap-2 sm:col-span-2 text-[#d4af37]">
                  <User className="w-4 h-4" />
                  <span>SPECIAL GUEST / KEYNOTE: {activeModalEvent.guest}</span>
                </div>
              )}
            </div>

            {/* Image Gallery */}
            {activeModalEvent.photos && activeModalEvent.photos.length > 0 && (
              <div className="my-6">
                <div className="relative aspect-[16/9] w-full rounded-[20px] overflow-hidden border border-[rgba(245,239,235,0.1)] mb-3 bg-[#111113]">
                  <Image
                    src={activeModalEvent.photos[0]}
                    alt={activeModalEvent.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                {activeModalEvent.photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {activeModalEvent.photos.slice(1, 4).map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[16/9] rounded-[12px] overflow-hidden border border-[rgba(245,239,235,0.1)] bg-[#111113]"
                      >
                        <Image
                          src={img}
                          alt={`${activeModalEvent.title} photo ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="250px"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Description Narrative */}
            <div className="mt-6">
              <span className="font-mono text-[10px] tracking-widest text-[#8a847a] uppercase block mb-2">
                MISSION BRIEFING &amp; FIELD DEBRIEF
              </span>
              <p className="font-sans text-sm sm:text-base text-[#eae5d9]/90 leading-relaxed">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-[rgba(245,239,235,0.1)] flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-[#8a847a]">
                BENNETT UNIVERSITY ASTRONOMICAL ARCHIVE
              </span>
              {activeModalEvent.registerLink && (
                <a
                  href={activeModalEvent.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs font-semibold uppercase hover:bg-white transition-all shadow-md"
                >
                  <span>PORTAL REGISTRATION / RECAP</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EventCard({
  event,
  onInspect,
}: {
  event: EventItem;
  onInspect: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="event-card rounded-[28px] border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden flex flex-col justify-between hover:border-[rgba(245,239,235,0.3)] transition-all duration-300 group hover:-translate-y-1">
      <div>
        {/* Event Image */}
        <div className="relative aspect-[16/9] w-full border-b border-[rgba(245,239,235,0.1)] bg-[#18181b] overflow-hidden">
          {!imgError && event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              onError={() => setImgError(true)}
              className="object-cover grayscale contrast-115 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1a1e] to-[#0f0f11] text-center select-none">
              <Camera className="w-8 h-8 text-[#eae5d9]/40 mb-2" />
              <span className="font-mono text-[10px] text-[#8a847a] uppercase tracking-widest">
                ARCHIVAL TELEMETRY LOG
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 bg-[#eae5d9] text-[#1D1D1D] px-3 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase shadow-sm">
            {event.category}
          </div>
          <div className="absolute top-3 right-3 bg-[#1D1D1D]/80 backdrop-blur-md px-3 py-0.5 rounded-full font-mono text-[9px] text-[#f5efeb] border border-[rgba(245,239,235,0.2)]">
            TENURE {event.tenure}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#a39e93]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#eae5d9]" />
              {event.date} {event.time && `· ${event.time}`}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#eae5d9]" />
              {event.location}
            </span>
          </div>

          <h3 className="font-editorial-serif italic text-2xl sm:text-3xl text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors mt-1">
            {event.title}
          </h3>

          {event.guest && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[11px] font-mono w-fit">
              <User className="w-3 h-3" />
              <span>Guest Speaker: {event.guest}</span>
            </div>
          )}

          <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed mt-2 line-clamp-3">
            {event.description}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 sm:px-8 pb-6 pt-3 flex items-center justify-between border-t border-[rgba(245,239,235,0.06)]">
        <button
          onClick={onInspect}
          className="font-mono text-[11px] tracking-wide text-[#f5efeb] hover:text-[#eae5d9] flex items-center gap-1 transition-colors"
        >
          <span>INSPECT DOSSIER</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {event.registerLink && (
          <a
            href={event.registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-[#eae5d9] tracking-widest uppercase hover:underline flex items-center gap-1"
          >
            <span>REGISTRATION</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
