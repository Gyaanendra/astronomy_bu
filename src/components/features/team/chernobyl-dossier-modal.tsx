"use client";

import { ChevronLeft, ChevronRight, Radio, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/icons";
import type { Department, TeamMember } from "@/types/team.types";

interface ChernobylDossierModalProps {
  member: TeamMember;
  allMembers: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
  onClose: () => void;
}

export function ChernobylDossierModal({
  member,
  allMembers,
  onSelectMember,
  onClose,
}: ChernobylDossierModalProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [thumbnailFailures, setThumbnailFailures] = useState<
    Record<string, boolean>
  >({});
  const sideRailRef = useRef<HTMLDivElement>(null);

  const currentIndex = allMembers.findIndex((m) => m.id === member.id);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const handlePrev = useCallback(() => {
    const prevIdx = (safeIndex - 1 + allMembers.length) % allMembers.length;
    onSelectMember(allMembers[prevIdx]);
    setImageFailed(false);
  }, [allMembers, safeIndex, onSelectMember]);

  const handleNext = useCallback(() => {
    const nextIdx = (safeIndex + 1) % allMembers.length;
    onSelectMember(allMembers[nextIdx]);
    setImageFailed(false);
  }, [allMembers, safeIndex, onSelectMember]);

  // Close on ESC, Navigate with Left/Right Arrow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  // Lock background scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Auto-scroll side rail to keep active member visible
  useEffect(() => {
    if (sideRailRef.current) {
      const activeEl = sideRailRef.current.querySelector(
        `[data-member-id="${member.id}"]`,
      );
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [member.id]);

  // Initials for avatar fallback
  const initials = member.name
    .replace(/\[.*?\]/g, "")
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Telemetry attributes generator
  const getDepartmentTelemetry = (dept: Department) => {
    switch (dept) {
      case "Leadership":
        return {
          instrument: "Celestron NexStar 8SE Computerized Schmidt-Cassegrain",
          specialty:
            "Expedition Direction, Planetary Imaging & Public Cosmos Stewardship",
          callsign: "COMMAND // APEX-01",
        };
      case "Tech & Research":
        return {
          instrument:
            "Sky-Watcher 200P Dobsonian & Compact UV-Vis Spectrometer",
          specialty:
            "Celestial Telemetry, Spectroscopy & Deep-Sky Astrophysical Modeling",
          callsign: "RESEARCH // FLUX-02",
        };
      case "Web & Development":
        return {
          instrument: "High-Bandwidth Ephemeris Engine & Orbital Compute Stack",
          specialty:
            "Interactive Digital Observatories & Real-Time Celestial Calculations",
          callsign: "SYSTEMS // NEXUS-03",
        };
      case "Content":
        return {
          instrument:
            "Archival Field Compendium & Stargazing Educational Catalog",
          specialty: "Cosmological Lore, Astronomical Treatises & Sky Maps",
          callsign: "ARCHIVE // CHRONO-04",
        };
      case "Management":
        return {
          instrument: "Sky-Quality Meter (SQM-L) & Low-Light Camp Station Rig",
          specialty:
            "Observatory Logistics, Field Expedition Safety & Dark-Sky Siting",
          callsign: "LOGISTICS // HORIZON-05",
        };
      case "PR & Outreach":
        return {
          instrument: "Coronado SolarMax III Hydrogen-Alpha Solar Telescope",
          specialty:
            "Campus Solar Observations & Public Astronomical Community Engagements",
          callsign: "OUTREACH // AURORA-06",
        };
      case "Multimedia":
        return {
          instrument:
            "Canon EOS Astro-Modded DSLR + Sky-Watcher Star Adventurer",
          specialty:
            "Deep-Sky Nebula Astrophotography, Planetary Stacking & Video Logs",
          callsign: "OPTICS // PHOTON-07",
        };
      case "Finance":
        return {
          instrument:
            "Precision Optical Logistics Reserve & Procurement Ledger",
          specialty:
            "Telescope Instrumentation Allocation & Expedition Grant Management",
          callsign: "TREASURY // STELLAR-08",
        };
      default:
        return {
          instrument: "Multi-Aperture Observation Array",
          specialty: "General Celestial Exploration & Campus Stargazing",
          callsign: "CADET // ASTRA-09",
        };
    }
  };

  const telemetry = getDepartmentTelemetry(member.department);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 lg:p-7 bg-black/92 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Outer Click Boundary */}
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
        onClick={onClose}
        tabIndex={-1}
      />

      {/* Main Expansive Chernobyl Stage Container */}
      <div
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="relative w-[96vw] max-w-[1780px] h-[92vh] sm:h-[90vh] rounded-[32px] overflow-hidden border border-[rgba(245,239,235,0.18)] bg-[#111114] shadow-[0_30px_90px_rgba(0,0,0,0.98)] flex flex-col lg:flex-row z-10 overscroll-contain"
      >
        {/* Floating Left Circular Navigation Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-[rgba(245,239,235,0.22)] bg-[#18181c]/90 text-[#f5efeb] hover:bg-[#eae5d9] hover:text-[#1D1D1D] items-center justify-center transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous Profile"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Right Circular Navigation Button */}
        <button
          type="button"
          onClick={handleNext}
          className="hidden sm:flex absolute right-4 lg:right-[430px] xl:right-[470px] top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-[rgba(245,239,235,0.22)] bg-[#18181c]/90 text-[#f5efeb] hover:bg-[#eae5d9] hover:text-[#1D1D1D] items-center justify-center transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next Profile"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* LEFT / HERO SECTION: The Chernobyl Persona Stage */}
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="relative flex-1 min-h-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between overflow-y-auto overflow-x-hidden overscroll-contain"
        >
          {/* Full Vivid Character Portrait: Perfectly Visible Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {!imageFailed && member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                onError={() => setImageFailed(true)}
                className="object-cover object-center sm:object-[center_20%] contrast-110 grayscale-[15%]"
                sizes="(max-width: 1024px) 100vw, 75vw"
                priority
                quality={80}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1c1c22] to-[#0c0c0e]">
                <span className="font-editorial-serif text-[180px] text-[#eae5d9]/20">
                  {initials}
                </span>
              </div>
            )}

            {/* Directional Vignette: Keeps Text 100% Readable without obscuring the person */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111114]/95 via-[#111114]/65 sm:via-[#111114]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111114]/90 via-transparent to-[#111114]/40" />
          </div>

          {/* Top Bar inside Left Canvas */}
          <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
            {/* Minimalist logo header */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl sm:text-2xl font-black tracking-tighter text-[#f5efeb]">
                ASTRONOMY<span className="text-[#c84b31]">BU</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c84b31]" />
              <span className="font-mono text-[10px] tracking-widest text-[#eae5d9]/80 uppercase">
                PERSONNEL DOSSIER
              </span>
            </div>

            {/* Badges & Close Button */}
            <div className="flex items-center gap-2">
              {member.isHead && (
                <span className="px-3 py-1 rounded-full bg-[#c84b31] text-white font-mono text-[9px] font-bold tracking-widest uppercase shadow-sm">
                  LEAD / HEAD
                </span>
              )}
              <span className="px-3 py-1 rounded-full border border-[rgba(245,239,235,0.2)] bg-[#18181c]/80 backdrop-blur-sm font-mono text-[9px] text-[#f5efeb] uppercase">
                {member.department}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-[rgba(245,239,235,0.2)] bg-[#18181c]/80 text-[#f5efeb] hover:bg-[#eae5d9] hover:text-[#1D1D1D] flex items-center justify-center transition-colors cursor-pointer ml-1"
                aria-label="Close dossier"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Stage: Monumental Title & Archival Transcript (Like CHERNOBYL) */}
          <div className="relative z-10 max-w-2xl my-auto py-6">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#c84b31] uppercase mb-2 font-bold drop-shadow-sm">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{telemetry.callsign} · STATION 28.4595° N</span>
            </div>

            {/* Giant monumental Name typography */}
            <h1 className="font-sans font-black tracking-tight text-5xl sm:text-7xl lg:text-8xl text-[#f5efeb] uppercase leading-[0.92] drop-shadow-lg">
              {member.name.replace(/\[.*?\]/g, "")}
            </h1>

            {/* Role & Division */}
            <p className="mt-4 font-mono text-xs sm:text-sm tracking-archival text-[#eae5d9] uppercase font-bold drop-shadow-sm">
              {member.role} — {member.department} DIVISION
            </p>

            {/* Member Quote / Observatory Log */}
            {member.quote && (
              <div className="mt-6 p-4 rounded-[18px] bg-[#141418]/85 border border-[rgba(245,239,235,0.14)] backdrop-blur-md max-w-xl">
                <p className="font-editorial-serif italic text-lg sm:text-xl text-[#f5efeb] leading-relaxed">
                  &ldquo;{member.quote}&rdquo;
                </p>
                <p className="font-mono text-[9px] text-[#a39e93] tracking-widest mt-2 uppercase">
                  — LOGGED TRANSCRIPT {"//"} BU ARCHIVES
                </p>
              </div>
            )}

            {/* Specialized Telemetry Attributes */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[rgba(245,239,235,0.12)] max-w-xl">
              <div>
                <span className="font-mono text-[9px] text-[#a39e93] uppercase tracking-wider block">
                  PRIMARY INSTRUMENT
                </span>
                <span className="font-mono text-[11px] text-[#f5efeb] font-medium leading-snug">
                  {telemetry.instrument}
                </span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#a39e93] uppercase tracking-wider block">
                  SPECIALTY / FOCUS
                </span>
                <span className="font-mono text-[11px] text-[#f5efeb] font-medium leading-snug">
                  {telemetry.specialty}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Chernobyl Index Number & Socials */}
          <div className="relative z-10 pt-6 border-t border-[rgba(245,239,235,0.12)] flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-sans font-black text-5xl sm:text-6xl text-[#f5efeb] drop-shadow-md">
                {String(safeIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-[#a39e93] uppercase tracking-wider font-semibold">
                  TENURE ARCHIVE
                </span>
                <span className="font-mono text-[10px] text-[#8a847a] uppercase flex items-center gap-1">
                  BENNETT EXPEDITION CORPS{" "}
                  <ChevronRight className="w-3 h-3 text-[#c84b31]" />
                </span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2">
              {member.socials.instagram && (
                <a
                  href={
                    member.socials.instagram.startsWith("http")
                      ? member.socials.instagram
                      : `https://instagram.com/${member.socials.instagram.replace("@", "")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[rgba(245,239,235,0.2)] bg-[#18181c]/90 text-[#a39e93] hover:text-[#f5efeb] hover:border-[#eae5d9] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={`${member.name} Instagram`}
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={
                    member.socials.linkedin.startsWith("http")
                      ? member.socials.linkedin
                      : `https://linkedin.com/in/${member.socials.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[rgba(245,239,235,0.2)] bg-[#18181c]/90 text-[#a39e93] hover:text-[#f5efeb] hover:border-[#eae5d9] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[rgba(245,239,235,0.2)] bg-[#18181c]/90 text-[#a39e93] hover:text-[#f5efeb] hover:border-[#eae5d9] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={`${member.name} GitHub`}
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE RAIL: The Chernobyl Episode List */}
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="w-full lg:w-[400px] xl:w-[440px] bg-[#0c0c0f]/95 border-t lg:border-t-0 lg:border-l border-[rgba(245,239,235,0.12)] p-5 sm:p-6 flex flex-col justify-between shrink-0 min-h-0 h-full overscroll-contain"
        >
          {/* Header for Side Rail */}
          <div className="pb-4 border-b border-[rgba(245,239,235,0.1)] flex items-center justify-between shrink-0">
            <div>
              <h2 className="font-sans font-bold text-sm sm:text-base text-[#f5efeb] tracking-wide uppercase">
                EXPEDITION ROSTER
              </h2>
              <p className="font-mono text-[10px] text-[#8a847a] tracking-widest uppercase mt-0.5">
                SELECT PROFILE ({allMembers.length} ACTIVE)
              </p>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-[#c84b31]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Scrollable list of profiles matching the Chernobyl episode thumbnail list */}
          <div
            ref={sideRailRef}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 min-h-0 my-3 overflow-y-auto overscroll-contain flex flex-col gap-2 pr-1.5"
          >
            {allMembers.map((other, idx) => {
              const isActive = other.id === member.id;
              const hasFailed = thumbnailFailures[other.id];

              const otherInitials = other.name
                .replace(/\[.*?\]/g, "")
                .trim()
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <button
                  type="button"
                  key={other.id}
                  data-member-id={other.id}
                  onClick={() => {
                    onSelectMember(other);
                    setImageFailed(false);
                  }}
                  className={`w-full text-left group flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-[16px] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#1d1d23] border border-[#c84b31] shadow-md"
                      : "bg-[#131317]/80 hover:bg-[#1a1a20] border border-[rgba(245,239,235,0.06)] hover:border-[rgba(245,239,235,0.2)]"
                  }`}
                >
                  {/* Left: Index & Name */}
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className={`font-mono text-sm font-bold pt-0.5 ${
                        isActive
                          ? "text-[#c84b31]"
                          : "text-[#8a847a] group-hover:text-[#eae5d9]"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex flex-col">
                      <span
                        className={`font-sans text-xs sm:text-sm font-medium leading-tight truncate ${
                          isActive
                            ? "text-[#f5efeb] font-bold"
                            : "text-[#a39e93] group-hover:text-[#f5efeb]"
                        }`}
                      >
                        {other.name.replace(/\[.*?\]/g, "")}
                      </span>
                      <span className="font-mono text-[10px] text-[#8a847a] truncate mt-0.5">
                        {other.role}
                      </span>
                    </div>
                  </div>

                  {/* Right: Rounded Thumbnail Photo */}
                  <div className="relative w-16 h-12 rounded-[10px] overflow-hidden border border-[rgba(245,239,235,0.12)] bg-[#1e1e24] shrink-0 group-hover:border-[rgba(245,239,235,0.3)] transition-colors">
                    {!hasFailed && other.image ? (
                      <Image
                        src={other.image}
                        alt={other.name}
                        fill
                        onError={() =>
                          setThumbnailFailures((prev) => ({
                            ...prev,
                            [other.id]: true,
                          }))
                        }
                        className={`object-cover ${
                          isActive
                            ? "contrast-115 grayscale-0"
                            : "grayscale opacity-80 group-hover:opacity-100"
                        }`}
                        sizes="64px"
                        loading="lazy"
                        quality={60}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-editorial-serif text-sm text-[#a39e93]">
                        {otherInitials}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Side Rail Footer */}
          <div className="pt-3 border-t border-[rgba(245,239,235,0.1)] flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#8a847a] tracking-widest uppercase">
              ESC OR CLICK OUTSIDE TO RETURN
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full bg-[#eae5d9] hover:bg-[#f5efeb] text-[#1D1D1D] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
