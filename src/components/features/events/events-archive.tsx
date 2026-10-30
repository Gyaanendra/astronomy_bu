"use client";

import { useState } from "react";
import Image from "next/image";
import { eventsRegistry } from "@/content/events/events-registry";
import { EventCategory, EventItem } from "@/types/event.types";
import { Calendar, MapPin, User, ExternalLink, X, ChevronRight } from "lucide-react";

export function EventsArchive() {
  const [selectedTenure, setSelectedTenure] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

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

  return (
    <div className="w-full py-16 px-4 sm:px-8 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <span className="font-mono text-[10px] tracking-archival text-[#a39e93] block mb-2">
            CATEGORY // 03 · CHRONICLES &amp; TENURE LOGS
          </span>
          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl text-[#f5efeb]">
            Past Events &amp; This Tenure
          </h1>
          <p className="mt-4 font-sans text-sm text-[#a39e93] max-w-2xl leading-relaxed">
            A chronological timeline of observation nights, theoretical cosmology lectures, guest masterclasses, and inter-university competitions.
          </p>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            {/* Tenure Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-[#635e57] mr-2">TENURE:</span>
              {tenures.map((tenure) => (
                <button
                  key={tenure}
                  onClick={() => setSelectedTenure(tenure)}
                  className={`px-3 py-1 font-mono text-[11px] uppercase transition-all ${
                    selectedTenure === tenure
                      ? "bg-[#eae5d9] text-[#09090b] font-semibold"
                      : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb]"
                  }`}
                >
                  {tenure === "ALL" ? "ALL TENURES" : tenure}
                </button>
              ))}
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[11px] text-[#635e57] mr-2">DISCIPLINE:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-all ${
                    selectedCategory === cat
                      ? "border border-[#f5efeb] text-[#f5efeb] bg-[#18181b]"
                      : "text-[#635e57] hover:text-[#a39e93]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline / Events Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="border border-[rgba(245,239,235,0.12)] bg-[#111113] overflow-hidden flex flex-col justify-between hover:border-[rgba(245,239,235,0.3)] transition-all group"
            >
              <div>
                {/* Event Image */}
                <div className="relative aspect-[16/9] w-full border-b border-[rgba(245,239,235,0.1)] bg-[#09090b] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover grayscale contrast-115 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#eae5d9] text-[#09090b] px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
                    {event.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#09090b]/80 backdrop-blur-md px-2.5 py-0.5 font-mono text-[9px] text-[#f5efeb] border border-[rgba(245,239,235,0.2)]">
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

                  <h3 className="font-editorial-serif text-3xl text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors mt-1">
                    {event.title}
                  </h3>

                  {event.guest && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[11px] font-mono w-fit">
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
              <div className="px-6 sm:px-8 pb-6 pt-2 flex items-center justify-between border-t border-[rgba(245,239,235,0.06)]">
                <button
                  onClick={() => setActiveModalEvent(event)}
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
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eae5d9] text-[#09090b] font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <span>PORTAL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox for Event Dossier */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#111113] border border-[rgba(245,239,235,0.2)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 text-[#a39e93] hover:text-[#f5efeb] p-1"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="font-mono text-[10px] tracking-archival text-[#d4af37] block mb-2">
              EXPEDITION DOSSIER // {activeModalEvent.category.toUpperCase()}
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#f5efeb] mb-4">
              {activeModalEvent.title}
            </h2>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#a39e93] pb-6 border-b border-[rgba(245,239,235,0.1)]">
              <span>DATE: {activeModalEvent.date}</span>
              <span>LOCATION: {activeModalEvent.location}</span>
              <span>TENURE: {activeModalEvent.tenure}</span>
            </div>

            <div className="my-6 relative aspect-[16/9] w-full border border-[rgba(245,239,235,0.15)] bg-black">
              <Image
                src={activeModalEvent.image}
                alt={activeModalEvent.title}
                fill
                className="object-contain"
              />
            </div>

            <p className="font-sans text-sm text-[#f5efeb] leading-relaxed whitespace-pre-line mb-6">
              {activeModalEvent.description}
            </p>

            {activeModalEvent.photos && activeModalEvent.photos.length > 1 && (
              <div className="mt-6 pt-6 border-t border-[rgba(245,239,235,0.1)]">
                <span className="font-mono text-[11px] text-[#a39e93] block mb-3">
                  ADDITIONAL PHOTOGRAPHIC ARCHIVES
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {activeModalEvent.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      className="relative aspect-video border border-[rgba(245,239,235,0.15)] overflow-hidden"
                    >
                      <Image
                        src={photo}
                        alt="Archive photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModalEvent.registerLink && (
              <div className="mt-8 pt-4 border-t border-[rgba(245,239,235,0.1)] flex justify-end">
                <a
                  href={activeModalEvent.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#eae5d9] text-[#09090b] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-colors"
                >
                  Open External Registration / Portal [↗]
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

