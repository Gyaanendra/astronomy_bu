"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { TeamMember } from "@/types/team.types";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  MoveHorizontal,
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
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const dragStartX = useRef<number>(0);
  const currentDragDelta = useRef<number>(0);
  const rafId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isWheelingRef = useRef<boolean>(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Resize listener for responsive spacing
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
    if (activeMemberId && members.length > 0) {
      const idx = members.findIndex((m) => m.id === activeMemberId);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [activeMemberId, members]);

  // Keep index within bounds
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

  // High performance, silky smooth horizontal trackpad/wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;

    const onWheel = (e: WheelEvent) => {
      const isHorizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2;
      const isShift = e.shiftKey && Math.abs(e.deltaY) > 2;

      if (isHorizontal || isShift) {
        e.preventDefault();
        const delta = isHorizontal ? e.deltaX : e.deltaY;
        accumulatedDelta += delta;

        if (!isWheelingRef.current && Math.abs(accumulatedDelta) >= 32) {
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
          }, 200);
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [handleNext, handlePrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // RAF-throttled drag tracking: 120fps smooth without saturating React renders
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    currentDragDelta.current = 0;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    currentDragDelta.current = clientX - dragStartX.current;

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        setDragOffset(currentDragDelta.current);
        rafId.current = null;
      });
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setIsDragging(false);
    const delta = currentDragDelta.current;
    if (delta > 42) {
      handlePrev();
    } else if (delta < -42) {
      handleNext();
    }
    setDragOffset(0);
    currentDragDelta.current = 0;
  };

  // Safe non-overlapping offset range according to member count (prevents duplicate React keys)
  const visibleOffsets = useMemo(() => {
    const count = members.length;
    if (count <= 1) return [0];
    if (count === 2) return [0, 1];
    if (count <= 4) return [-1, 0, 1];
    if (count <= 6) return [-2, -1, 0, 1, 2];
    return [-3, -2, -1, 0, 1, 2, 3];
  }, [members.length]);

  if (!members || members.length === 0) {
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
  const angleMultiplier = isMobile ? 8.5 : isTablet ? 9.8 : 11;

  // Normalized drag fraction between -0.75 and 0.75
  const dragFraction = Math.max(-0.75, Math.min(0.75, dragOffset / spacing));

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1700px] mx-auto flex flex-col items-center select-none pt-2 pb-6 overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sleek top telemetry row */}
      <div className="w-full flex items-center justify-between px-4 sm:px-8 mb-4 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c84b31] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#a39e93] uppercase font-bold">
            ORBIT DOSSIER [{String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(members.length).padStart(2, "0")}]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(245,239,235,0.12)] bg-[#17171a] text-[#8a847a] font-mono text-[9px] tracking-wider uppercase">
            <MoveHorizontal className="w-3 h-3 text-[#c84b31]" />
            <span>Scroll Sideways ↔ or Drag</span>
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

      {/* 3D Perspective Hero Arc Stage */}
      <div
        className="relative w-full h-[500px] sm:h-[580px] md:h-[640px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* Subtle background radar circles */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-20">
          <div className="w-[600px] sm:w-[900px] lg:w-[1200px] h-[600px] sm:h-[900px] lg:h-[1200px] rounded-full border border-dashed border-[rgba(245,239,235,0.14)] translate-y-[120px]" />
        </div>

        {/* Rotary Card Fan with STABLE KEYS and True GPU Interpolation */}
        {visibleOffsets.map((offset) => {
          const itemIndex =
            (activeIndex + offset + members.length) % members.length;
          const member = members[itemIndex];
          if (!member) return null;

          // Effective offset with drag fraction
          const effOffset = offset + dragFraction;
          const absEffOffset = Math.abs(effOffset);
          const isCenter = Math.abs(effOffset) < 0.45;

          // True 3D turntable coordinates
          const translateX = effOffset * spacing;
          const translateY = isCenter ? -10 : Math.pow(absEffOffset, 1.45) * 19;
          const translateZ = isCenter ? 35 : -absEffOffset * 38;
          const rotateZ = effOffset * angleMultiplier;
          const rotateY = -effOffset * 6.0;
          const scale = isCenter
            ? 1.05
            : Math.max(0.78, 1 - absEffOffset * 0.072);
          const zIndex = Math.round(50 - absEffOffset * 5);
          const opacity =
            absEffOffset > 2.5
              ? Math.max(0, 1 - (absEffOffset - 2.5) * 1.5)
              : 1;

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
              key={member.id}
              onClick={() => {
                if (Math.abs(effOffset) < 0.35) {
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
                willChange: isDragging ? "transform" : "auto",
                transition: isDragging
                  ? "none"
                  : "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
              }}
              className={`absolute w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] h-[390px] sm:h-[460px] md:h-[520px] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer group select-none ${
                isCenter
                  ? "border-2 border-[#eae5d9] bg-[#161619] shadow-[0_18px_45px_rgba(0,0,0,0.85)] ring-1 ring-[rgba(245,239,235,0.2)]"
                  : "border border-[rgba(245,239,235,0.12)] bg-[#111114]/90 hover:border-[rgba(245,239,235,0.3)] shadow-lg"
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

              {/* Card Portrait Frame with Optimized Image Loading */}
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
                        ? "contrast-110 grayscale-[10%] group-hover:grayscale-0"
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
            </div>
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
