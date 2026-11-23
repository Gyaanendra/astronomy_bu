"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { TeamMember } from "@/types/team.types";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  Compass,
} from "lucide-react";

interface RotaryCarouselProps {
  members: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
  activeMemberId?: string;
  onCenterMember?: (member: TeamMember) => void;
}

export function RotaryCarousel({
  members,
  onSelectMember,
  activeMemberId,
  onCenterMember,
}: RotaryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailures, setImageFailures] = useState<Record<string, boolean>>(
    {},
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  const dragDeltaX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync activeIndex if activeMemberId changes from outside
  useEffect(() => {
    if (activeMemberId && members.length > 0) {
      const idx = members.findIndex((m) => m.id === activeMemberId);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [activeMemberId, members]);

  // Reset active index if member list shrinks
  useEffect(() => {
    if (activeIndex >= members.length && members.length > 0) {
      setActiveIndex(0);
    }
  }, [members.length, activeIndex]);

  const handlePrev = useCallback(() => {
    if (members.length === 0) return;
    setActiveIndex((prev) => {
      const next = (prev - 1 + members.length) % members.length;
      onCenterMember?.(members[next]);
      return next;
    });
  }, [members, onCenterMember]);

  const handleNext = useCallback(() => {
    if (members.length === 0) return;
    setActiveIndex((prev) => {
      const next = (prev + 1) % members.length;
      onCenterMember?.(members[next]);
      return next;
    });
  }, [members, onCenterMember]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch and drag handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragDeltaX.current = clientX - dragStartX.current;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX.current > 45) {
      handlePrev();
    } else if (dragDeltaX.current < -45) {
      handleNext();
    }
    dragDeltaX.current = 0;
  };

  if (!members || members.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-mono text-sm text-[#8a847a]">
          NO CURATORS ENROLLED IN THIS DIVISION.
        </p>
      </div>
    );
  }

  const activeMember = members[activeIndex] || members[0];

  // Offsets to render: -3 to +3
  const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center select-none pt-4 pb-16 overflow-hidden"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top telemetry indicator and quick controls */}
      <div className="w-full flex items-center justify-between px-6 sm:px-12 mb-8 z-30">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c84b31] animate-pulse" />
          <span className="font-mono text-[11px] tracking-archival text-[#a39e93] uppercase">
            ORBIT WHEEL // SELECTION [{String(activeIndex + 1).padStart(2, "0")}{" "}
            / {String(members.length).padStart(2, "0")}]
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[rgba(245,239,235,0.18)] bg-[#18181b]/80 hover:bg-[#eae5d9] hover:text-[#1D1D1D] text-[#f5efeb] flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Previous curator"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[rgba(245,239,235,0.18)] bg-[#18181b]/80 hover:bg-[#eae5d9] hover:text-[#1D1D1D] text-[#f5efeb] flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Next curator"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* The Radial Arc Stage */}
      <div className="relative w-full h-[520px] sm:h-[580px] flex items-center justify-center">
        {visibleOffsets.map((offset) => {
          const itemIndex =
            (activeIndex + offset + members.length) % members.length;
          const member = members[itemIndex];
          if (!member) return null;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          // Radial positioning calculations
          const angleDeg = offset * 15;
          const angleRad = (angleDeg * Math.PI) / 180;
          const translateX = Math.sin(angleRad) * 440;
          const translateY = (1 - Math.cos(angleRad)) * 110 + absOffset * 18;
          const rotateZ = angleDeg;
          const scale = 1 - absOffset * 0.08;
          const zIndex = 40 - absOffset;
          const opacity = absOffset > 2 ? Math.max(0, 1 - absOffset * 0.35) : 1;

          const imageFailed = imageFailures[member.id];
          const initials = member.name
            .replace(/\[.*?\]/g, "")
            .trim()
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={`${member.id}-${offset}`}
              onClick={() => {
                if (isCenter) {
                  onSelectMember(member);
                } else {
                  setActiveIndex(itemIndex);
                  onCenterMember?.(members[itemIndex]);
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition:
                  "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease",
              }}
              className={`absolute top-4 w-[260px] sm:w-[300px] h-[390px] sm:h-[450px] rounded-[30px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-shadow duration-300 group ${
                isCenter
                  ? "border-2 border-[#eae5d9] bg-[#161619] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(234,229,217,0.15)] ring-1 ring-[rgba(245,239,235,0.2)]"
                  : "border border-[rgba(245,239,235,0.14)] bg-[#111113]/90 hover:border-[rgba(245,239,235,0.35)] shadow-xl"
              }`}
            >
              {/* Card Top: Department & Dossier Code */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,239,235,0.08)]">
                <span className="font-mono text-[9px] tracking-widest text-[#a39e93] uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c84b31]" />
                  {member.department}
                </span>

                {member.isHead ? (
                  <span className="bg-[#eae5d9] text-[#1D1D1D] px-2 py-0.5 rounded-full font-mono text-[8px] font-bold tracking-widest uppercase">
                    LEAD
                  </span>
                ) : (
                  <span className="font-mono text-[8px] text-[#8a847a] tracking-wider">
                    #{String(itemIndex + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* Card Portrait Frame */}
              <div className="relative my-3 w-full flex-1 rounded-[22px] overflow-hidden border border-[rgba(245,239,235,0.1)] bg-[#1a1a1e]">
                {!imageFailed && member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    onError={() =>
                      setImageFailures((prev) => ({
                        ...prev,
                        [member.id]: true,
                      }))
                    }
                    className={`object-cover transition-all duration-500 ${
                      isCenter
                        ? "contrast-110 grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105"
                        : "contrast-100 grayscale opacity-80"
                    }`}
                    sizes="(max-width: 768px) 260px, 300px"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1c1c22] to-[#0d0d10] text-center select-none">
                    <div className="w-16 h-16 rounded-full border border-[rgba(245,239,235,0.2)] flex items-center justify-center mb-2 bg-[#25252b]">
                      <span className="font-editorial-serif text-3xl text-[#eae5d9]">
                        {initials}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-[#a39e93] tracking-widest uppercase">
                      BU ASTRONOMICAL CORPS
                    </span>
                  </div>
                )}

                {/* Subtle vignette gradient at bottom of photo */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111113] to-transparent pointer-events-none" />
              </div>

              {/* Card Bottom: Identity & Action */}
              <div className="pt-2 flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-archival text-[#a39e93] uppercase line-clamp-1">
                  {member.role}
                </span>
                <h3 className="font-editorial-serif text-xl sm:text-2xl text-[#f5efeb] leading-tight group-hover:text-[#eae5d9] transition-colors line-clamp-1">
                  {member.name.replace(/\[.*?\]/g, "")}
                </h3>

                {isCenter && (
                  <div className="mt-2.5 pt-2 border-t border-[rgba(245,239,235,0.1)] flex items-center justify-between text-[#eae5d9]">
                    <span className="font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#c84b31]" />
                      INSPECT DOSSIER
                    </span>
                    <span className="font-mono text-[10px] text-[#a39e93]">
                      ↗
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Circular Telemetry Dial & Compass Arc (Ref 1 bottom dial) */}
      <div className="relative mt-2 flex flex-col items-center z-10">
        {/* Active pointer marker */}
        <div className="flex flex-col items-center mb-3">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#c84b31]" />
          <span className="font-mono text-[9px] tracking-widest text-[#c84b31] uppercase mt-1 font-bold">
            CURATOR IN FOCUS
          </span>
        </div>

        {/* Concentric telemetry rings */}
        <div className="relative w-[340px] sm:w-[460px] h-[70px] overflow-hidden flex items-start justify-center">
          {/* Outer dashed arc */}
          <div className="absolute -top-[160px] w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] rounded-full border border-dashed border-[rgba(245,239,235,0.18)] flex items-center justify-center">
            {/* Inner solid arc */}
            <div className="w-[360px] sm:w-[470px] h-[360px] sm:h-[470px] rounded-full border border-[rgba(245,239,235,0.1)] flex items-center justify-center">
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#8a847a] uppercase -translate-y-[150px]">
                ASTRONOMY BU • BENNETT OBSERVATORY • CREW ARCHIVE
              </span>
            </div>
          </div>
        </div>

        {/* Active Member Bio Snippet & Call to Action */}
        <div className="mt-4 flex flex-col items-center text-center max-w-lg px-4">
          {activeMember.quote && (
            <p className="font-mono text-xs text-[#a39e93] italic line-clamp-2 mb-3">
              &ldquo;{activeMember.quote}&rdquo;
            </p>
          )}

          <button
            onClick={() => onSelectMember(activeMember)}
            className="px-6 py-2.5 rounded-full bg-[#eae5d9] hover:bg-[#f5efeb] text-[#1D1D1D] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c84b31]" />
            OPEN PERSONNEL DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
}
