"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { TeamMember } from "@/types/team.types";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  MoveHorizontal,
} from "lucide-react";
import gsap from "gsap";

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
  const [imageFailures, setImageFailures] = useState<Record<string, boolean>>({});
  const [containerWidth, setContainerWidth] = useState(1200);

  // References for direct GPU transform manipulation (0 React overhead during animation)
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<{ current: number }>({ current: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const pointerStartX = useRef<number>(0);
  const pointerStartProgress = useRef<number>(0);
  const lastPointerX = useRef<number>(0);
  const lastPointerTime = useRef<number>(0);
  const pointerVelocity = useRef<number>(0);

  const count = members.length;

  // Responsive dimensions & spacing
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1050;
  const spacing = isMobile ? 180 : isTablet ? 250 : 310;
  const angleMultiplier = isMobile ? 8.2 : isTablet ? 9.5 : 10.8;

  // Resize listener
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

  // Update card 3D transforms mathematically without triggering React re-renders
  const updateCards = useCallback(
    (p: number) => {
      if (count === 0) return;

      for (let i = 0; i < count; i++) {
        const el = cardElementsRef.current[i];
        if (!el) continue;

        // Circular wrapped distance
        let diff = (i - p) % count;
        if (diff > count / 2) diff -= count;
        if (diff < -count / 2) diff += count;

        const absDiff = Math.abs(diff);

        // Outside the visible orbital arc: completely hide to save GPU resources
        if (absDiff > 3.4) {
          el.style.visibility = "hidden";
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          continue;
        }

        el.style.visibility = "visible";
        el.style.pointerEvents = "auto";

        const isCenter = absDiff < 0.45;

        // Continuous trigonometry coordinates
        const translateX = diff * spacing;
        const translateY = isCenter
          ? -10 * (1 - absDiff / 0.45)
          : Math.pow(absDiff, 1.45) * 19 - 8;
        const translateZ = isCenter
          ? 38 * (1 - absDiff / 0.45)
          : -absDiff * 38;
        const rotateZ = diff * angleMultiplier;
        const rotateY = -diff * 6.2;
        const scale = isCenter
          ? 1.05 - absDiff * 0.05
          : Math.max(0.72, 1 - absDiff * 0.075);
        const zIndex = Math.round(50 - absDiff * 8);

        // Opacity falls smoothly to 0 at the orbital horizon (ZERO edge-popping!)
        const opacity =
          absDiff <= 2.2
            ? 1
            : Math.max(0, 1 - Math.pow((absDiff - 2.2) / 1.2, 1.4));

        el.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = String(opacity);

        // Center card visual styling toggle
        if (isCenter) {
          el.classList.add("carousel-card-center");
        } else {
          el.classList.remove("carousel-card-center");
        }
      }
    },
    [count, spacing, angleMultiplier],
  );

  // Sync active index & center callback
  const syncActiveState = useCallback(
    (targetP: number) => {
      if (count === 0) return;
      const normalized = ((Math.round(targetP) % count) + count) % count;
      setActiveIndex(normalized);
      if (members[normalized]) {
        onCenterMember?.(members[normalized]);
      }
    },
    [count, members, onCenterMember],
  );

  // Initial and reactive card placement
  useEffect(() => {
    updateCards(progressRef.current.current);
  }, [updateCards, containerWidth]);

  // Sync when activeMemberId changes externally
  useEffect(() => {
    if (activeMemberId && count > 0) {
      const idx = members.findIndex((m) => m.id === activeMemberId);
      if (idx !== -1) {
        let diff = (idx - progressRef.current.current) % count;
        if (diff > count / 2) diff -= count;
        if (diff < -count / 2) diff += count;

        gsap.killTweensOf(progressRef.current);
        const target = progressRef.current.current + diff;
        gsap.to(progressRef.current, {
          current: target,
          duration: 0.48,
          ease: "power3.out",
          onUpdate: () => updateCards(progressRef.current.current),
          onComplete: () => syncActiveState(target),
        });
      }
    }
  }, [activeMemberId, count, members, updateCards, syncActiveState]);

  // Navigate to next or previous card with silky GSAP momentum
  const navigateBy = useCallback(
    (direction: -1 | 1) => {
      if (count === 0) return;
      gsap.killTweensOf(progressRef.current);
      const target = Math.round(progressRef.current.current) + direction;

      gsap.to(progressRef.current, {
        current: target,
        duration: 0.46,
        ease: "power3.out",
        onUpdate: () => updateCards(progressRef.current.current),
        onComplete: () => syncActiveState(target),
      });
    },
    [count, updateCards, syncActiveState],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigateBy(-1);
      if (e.key === "ArrowRight") navigateBy(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateBy]);

  // Frictionless pointer drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only primary mouse button
    isDraggingRef.current = true;
    pointerStartX.current = e.clientX;
    pointerStartProgress.current = progressRef.current.current;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    pointerVelocity.current = 0;

    gsap.killTweensOf(progressRef.current);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = now - lastPointerTime.current;
    const deltaX = e.clientX - pointerStartX.current;

    if (dt > 8) {
      pointerVelocity.current = (e.clientX - lastPointerX.current) / dt;
      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;
    }

    // Direct 1-to-1 tracking
    progressRef.current.current = pointerStartProgress.current - deltaX / spacing;
    updateCards(progressRef.current.current);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    // Calculate natural momentum based on release velocity
    const velocity = pointerVelocity.current; // px per ms
    const flingMomentum = -velocity * 120 / spacing;
    const clampedFling = Math.max(-1.5, Math.min(1.5, flingMomentum));
    const target = Math.round(progressRef.current.current + clampedFling);

    gsap.to(progressRef.current, {
      current: target,
      duration: Math.min(0.65, Math.max(0.35, 0.42 + Math.abs(velocity) * 0.1)),
      ease: "power3.out",
      onUpdate: () => updateCards(progressRef.current.current),
      onComplete: () => syncActiveState(target),
    });
  };

  // Horizontal wheel / trackpad gestures
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelDebounce: NodeJS.Timeout | null = null;
    let accumulated = 0;

    const onWheel = (e: WheelEvent) => {
      const isHorizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2;
      const isShift = e.shiftKey && Math.abs(e.deltaY) > 2;

      if (isHorizontal || isShift) {
        e.preventDefault();
        const delta = isHorizontal ? e.deltaX : e.deltaY;
        accumulated += delta;

        if (Math.abs(accumulated) >= 28) {
          const step = accumulated > 0 ? 1 : -1;
          accumulated = 0;
          navigateBy(step);

          if (wheelDebounce) clearTimeout(wheelDebounce);
          wheelDebounce = setTimeout(() => {
            accumulated = 0;
          }, 180);
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      if (wheelDebounce) clearTimeout(wheelDebounce);
    };
  }, [navigateBy]);

  // Click card handler: if center -> open dossier; if off-center -> glide to center
  const handleCardClick = (index: number, member: TeamMember) => {
    let diff = (index - progressRef.current.current) % count;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    if (Math.abs(diff) < 0.35) {
      onSelectMember(member);
    } else {
      gsap.killTweensOf(progressRef.current);
      const target = Math.round(progressRef.current.current + diff);
      gsap.to(progressRef.current, {
        current: target,
        duration: 0.48,
        ease: "power3.out",
        onUpdate: () => updateCards(progressRef.current.current),
        onComplete: () => syncActiveState(target),
      });
    }
  };

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

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1700px] mx-auto flex flex-col items-center select-none pt-2 pb-6 overflow-hidden cursor-grab touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Sleek top telemetry row */}
      <div className="w-full flex items-center justify-between px-4 sm:px-8 mb-4 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c84b31] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#a39e93] uppercase font-bold">
            ORBIT DOSSIER [{String(activeIndex + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}]
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
              onClick={() => navigateBy(-1)}
              className="w-9 h-9 rounded-full border border-[rgba(245,239,235,0.18)] bg-[#19191c] hover:bg-[#eae5d9] hover:text-[#1D1D1D] text-[#f5efeb] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous profile"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateBy(1)}
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

        {/* All member cards rendered once with permanent DOM stability */}
        {members.map((member, index) => {
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
              ref={(el) => {
                cardElementsRef.current[index] = el;
              }}
              onClick={() => handleCardClick(index, member)}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
              }}
              className="carousel-card absolute w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] h-[390px] sm:h-[460px] md:h-[520px] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer group select-none border border-[rgba(245,239,235,0.12)] bg-[#121215] hover:border-[rgba(245,239,235,0.3)] shadow-lg"
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
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* Card Portrait Frame */}
              <div className="relative my-2.5 w-full flex-1 rounded-[18px] overflow-hidden border border-[rgba(245,239,235,0.1)] bg-[#18181d]">
                {!imageFailed && member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    onError={() =>
                      setImageFailures((prev) => ({ ...prev, [member.id]: true }))
                    }
                    className="carousel-card-img object-cover transition-all duration-300 contrast-105 grayscale-[15%] group-hover:grayscale-0 group-hover:contrast-115"
                    sizes="(max-width: 768px) 260px, 380px"
                    loading="lazy"
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

                {/* Inspect Pill only visible when centered */}
                <div className="carousel-card-center-indicator mt-2 pt-1.5 border-t border-[rgba(245,239,235,0.1)] flex items-center justify-between text-[#eae5d9]">
                  <span className="font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-[#c84b31]" />
                    INSPECT DOSSIER
                  </span>
                  <span className="font-mono text-xs text-[#a39e93]">↗</span>
                </div>
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
