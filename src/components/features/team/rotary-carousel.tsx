"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoveHorizontal,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TeamMember } from "@/types/team.types";

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
  const [containerWidth, setContainerWidth] = useState(1200);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number>(0);
  const isPointerDown = useRef<boolean>(false);
  const isWheelingRef = useRef<boolean>(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const count = members.length;

  // Responsive dimensions
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Sync activeIndex if activeMemberId changes from outside
  useEffect(() => {
    if (activeMemberId && count > 0) {
      const idx = members.findIndex((m) => m.id === activeMemberId);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [activeMemberId, count, members]);

  // Keep index within bounds
  useEffect(() => {
    if (activeIndex >= count && count > 0) {
      setActiveIndex(0);
    }
  }, [count, activeIndex]);

  const handlePrev = useCallback(() => {
    if (count === 0) return;
    setActiveIndex((prev) => {
      const next = (prev - 1 + count) % count;
      onCenterMember?.(members[next]);
      return next;
    });
  }, [count, members, onCenterMember]);

  const handleNext = useCallback(() => {
    if (count === 0) return;
    setActiveIndex((prev) => {
      const next = (prev + 1) % count;
      onCenterMember?.(members[next]);
      return next;
    });
  }, [count, members, onCenterMember]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Lightweight, zero-latency swipe detection (NO per-pixel React re-rendering)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isPointerDown.current = true;
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    const deltaX = e.clientX - pointerStartX.current;

    if (deltaX > 38) {
      handlePrev();
    } else if (deltaX < -38) {
      handleNext();
    }
  };

  // Debounced horizontal wheel / trackpad gestures
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;

    const onWheel = (e: WheelEvent) => {
      const isHorizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 3;
      const isShift = e.shiftKey && Math.abs(e.deltaY) > 3;

      if (isHorizontal || isShift) {
        e.preventDefault();
        const delta = isHorizontal ? e.deltaX : e.deltaY;
        accumulatedDelta += delta;

        if (!isWheelingRef.current && Math.abs(accumulatedDelta) >= 25) {
          isWheelingRef.current = true;
          if (accumulatedDelta > 0) {
            handleNext();
          } else {
            handlePrev();
          }
          accumulatedDelta = 0;

          if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
          wheelTimeoutRef.current = setTimeout(() => {
            isWheelingRef.current = false;
          }, 180);
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [handleNext, handlePrev]);

  // Exactly 5 slots: [-2, -1, 0, 1, 2] matching the user's reference image
  const visibleOffsets = useMemo(() => {
    if (count <= 1) return [0];
    if (count === 2) return [0, 1];
    if (count <= 4) return [-1, 0, 1];
    return [-2, -1, 0, 1, 2];
  }, [count]);

  if (!members || count === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-mono text-xs text-[#8a847a]">
          NO CURATORS ENROLLED IN THIS DIVISION FOR THIS TENURE.
        </p>
      </div>
    );
  }

  const activeMember = members[activeIndex] || members[0];

  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1050;
  const spacing = isMobile ? 180 : isTablet ? 250 : 310;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1700px] mx-auto flex flex-col items-center select-none pt-2 pb-6 overflow-hidden cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Sleek top telemetry row */}
      <div className="w-full flex items-center justify-between px-4 sm:px-8 mb-4 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c84b31] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#a39e93] uppercase font-bold">
            ORBIT DOSSIER [{String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(245,239,235,0.12)] bg-[#17171a] text-[#8a847a] font-mono text-[9px] tracking-wider uppercase">
            <MoveHorizontal className="w-3 h-3 text-[#c84b31]" />
            <span>Swipe ↔ or Trackpad</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-[rgba(245,239,235,0.18)] bg-[#19191c] hover:bg-[#eae5d9] hover:text-[#1D1D1D] text-[#f5efeb] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous profile"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-[rgba(245,239,235,0.18)] bg-[#19191c] hover:bg-[#eae5d9] hover:text-[#1D1D1D] text-[#f5efeb] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next profile"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Perspective Hero Arc Stage (5 Cards Maximum) */}
      <div
        className="relative w-full h-[500px] sm:h-[580px] md:h-[640px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* Subtle background radar circles */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-20">
          <div className="w-[600px] sm:w-[900px] lg:w-[1200px] h-[600px] sm:h-[900px] lg:h-[1200px] rounded-full border border-dashed border-[rgba(245,239,235,0.14)] translate-y-[120px]" />
        </div>

        {/* 5 Orbital Arc Cards */}
        {visibleOffsets.map((offset) => {
          const itemIndex = (activeIndex + offset + count) % count;
          const member = members[itemIndex];
          if (!member) return null;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          // Dedicated 3D coordinates for each of the 5 positions
          let translateX = 0;
          let translateY = 0;
          let translateZ = 0;
          let rotateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let zIndex = 30;
          let opacity = 1;

          if (isCenter) {
            translateX = 0;
            translateY = -12;
            translateZ = 40;
            rotateZ = 0;
            rotateY = 0;
            scale = 1.06;
            zIndex = 30;
            opacity = 1;
          } else if (absOffset === 1) {
            translateX = offset * spacing;
            translateY = 16;
            translateZ = -15;
            rotateZ = offset * 8;
            rotateY = -offset * 6.5;
            scale = 0.92;
            zIndex = 20;
            opacity = 0.88;
          } else if (absOffset === 2) {
            translateX = offset * (spacing * 1.85);
            translateY = 60;
            translateZ = -55;
            rotateZ = offset * 16;
            rotateY = -offset * 12;
            scale = 0.8;
            zIndex = 10;
            opacity = 0.55;
          }

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
            <button
              type="button"
              key={member.id}
              onClick={() => {
                if (isCenter) {
                  onSelectMember(member);
                } else {
                  setActiveIndex(itemIndex);
                  onCenterMember?.(members[itemIndex]);
                }
              }}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                zIndex,
                opacity,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
                transition:
                  "transform 0.38s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.28s ease",
              }}
              aria-label={
                isCenter
                  ? `Inspect dossier for ${member.name.replace(/\[.*?\]/g, "")}`
                  : `Rotate to ${member.name.replace(/\[.*?\]/g, "")}`
              }
              className={`text-left absolute w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] h-[390px] sm:h-[460px] md:h-[520px] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer group select-none focus:outline-none focus:ring-2 focus:ring-[#eae5d9]/50 ${
                isCenter
                  ? "border-2 border-[#eae5d9] bg-[#161619] shadow-[0_18px_45px_rgba(0,0,0,0.85)] ring-1 ring-[rgba(245,239,235,0.2)]"
                  : "border border-[rgba(245,239,235,0.12)] bg-[#121215] hover:border-[rgba(245,239,235,0.3)] shadow-lg"
              }`}
            >
              {/* Card Header: Division & Lead status */}
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(245,239,235,0.08)]">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#a39e93] uppercase flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c84b31]" />
                  {member.department}
                </span>

                {member.isHead ? (
                  <span className="bg-[#eae5d9] text-[#1D1D1D] px-2 py-0.5 rounded-full font-mono text-[8px] font-bold tracking-widest uppercase">
                    LEAD
                  </span>
                ) : (
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#8a847a] tracking-wider">
                    #{String(itemIndex + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* Card Portrait Frame with Optimized Next.js Image */}
              <div className="relative my-2.5 w-full flex-1 rounded-[18px] overflow-hidden border border-[rgba(245,239,235,0.1)] bg-[#18181d]">
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
                    className={`object-cover transition-all duration-300 ${
                      isCenter
                        ? "contrast-115 grayscale-[10%] group-hover:grayscale-0"
                        : "contrast-100 grayscale opacity-80"
                    }`}
                    sizes="(max-width: 768px) 260px, 380px"
                    priority={isCenter}
                    loading={isCenter ? "eager" : "lazy"}
                    quality={75}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1a20] to-[#0f0f12] text-center select-none">
                    <div className="w-16 h-16 rounded-full border border-[rgba(245,239,235,0.2)] flex items-center justify-center mb-2 bg-[#222228]">
                      <span className="font-editorial-serif text-3xl text-[#eae5d9]">
                        {initials}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-[#a39e93] tracking-widest uppercase">
                      BU ASTRONOMICAL CORPS
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111114] via-[#111114]/30 to-transparent pointer-events-none" />
              </div>

              {/* Card Footer: Role & Name */}
              <div className="pt-1 flex flex-col gap-0.5">
                <span className="font-mono text-[8px] sm:text-[9px] tracking-archival text-[#a39e93] uppercase line-clamp-1">
                  {member.role}
                </span>
                <h3 className="font-editorial-serif text-xl sm:text-2xl text-[#f5efeb] leading-tight group-hover:text-[#eae5d9] transition-colors line-clamp-1">
                  {member.name.replace(/\[.*?\]/g, "")}
                </h3>

                {isCenter && (
                  <div className="mt-2 pt-1.5 border-t border-[rgba(245,239,235,0.1)] flex items-center justify-between text-[#eae5d9]">
                    <span className="font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-[#c84b31]" />
                      INSPECT DOSSIER
                    </span>
                    <span className="font-mono text-xs text-[#a39e93]">↗</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Member Focus Bar */}
      <div className="relative mt-1 flex flex-col items-center z-10 w-full">
        {activeMember.quote && (
          <p className="font-editorial-serif italic text-base sm:text-lg text-[#f5efeb]/85 line-clamp-1 mb-2.5 text-center max-w-lg px-4">
            &ldquo;{activeMember.quote}&rdquo;
          </p>
        )}

        <button
          type="button"
          onClick={() => onSelectMember(activeMember)}
          className="px-6 py-2.5 rounded-full bg-[#eae5d9] hover:bg-[#f5efeb] text-[#1D1D1D] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c84b31]" />
          OPEN PERSONNEL DOSSIER
        </button>
      </div>
    </div>
  );
}
