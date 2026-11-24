"use client";

import gsap from "gsap";
import { Eye, ShieldCheck, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/icons";
import { allTenures } from "@/content/team";
import type { Department, TeamMember } from "@/types/team.types";
import { ChernobylDossierModal } from "./chernobyl-dossier-modal";
import { RotaryCarousel } from "./rotary-carousel";

export function TeamShowcase() {
  const [selectedTenureYear, setSelectedTenureYear] =
    useState<string>("2025-2026");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [selectedDossierMember, setSelectedDossierMember] =
    useState<TeamMember | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Retrieve current tenure object
  const currentTenureData = useMemo(() => {
    return (
      allTenures.find((t) => t.tenureYear === selectedTenureYear) ||
      allTenures[0]
    );
  }, [selectedTenureYear]);

  // All distinct departments available across the entire club
  const allDepartmentNames: Department[] = [
    "Leadership",
    "Tech & Research",
    "Web & Development",
    "Content",
    "Management",
    "PR & Outreach",
    "Multimedia",
    "Finance",
  ];

  // List of departments that exist in the currently selected tenure
  const existingDeptNamesInTenure = useMemo(() => {
    return currentTenureData.departments.map((d) => d.name);
  }, [currentTenureData]);

  // When switching tenures, if selectedDept is not present in that tenure, safely reset to ALL
  useEffect(() => {
    if (
      selectedDept !== "ALL" &&
      !existingDeptNamesInTenure.includes(selectedDept as Department)
    ) {
      setSelectedDept("ALL");
    }
  }, [existingDeptNamesInTenure, selectedDept]);

  // Departments filtered for display
  const filteredDepartments = useMemo(() => {
    if (selectedDept === "ALL") {
      return currentTenureData.departments;
    }
    return currentTenureData.departments.filter((d) => d.name === selectedDept);
  }, [currentTenureData, selectedDept]);

  // Flat list of visible members in the current filter
  const visibleMembers = useMemo(() => {
    return filteredDepartments.flatMap((d) => d.members);
  }, [filteredDepartments]);

  // Total members count in current tenure
  const totalTenureMembers = useMemo(() => {
    return currentTenureData.departments.reduce(
      (acc, d) => acc + d.members.length,
      0,
    );
  }, [currentTenureData]);

  // Fast GSAP stagger animation on filter change
  // biome-ignore lint/correctness/useExhaustiveDependencies: animation triggers on filter changes
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".member-card-compact");
      if (cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            stagger: 0.02,
            ease: "power2.out",
          },
        );
      }
    }
  }, [selectedTenureYear, selectedDept]);

  return (
    <div className="w-full py-8 sm:py-12 px-4 sm:px-8 lg:px-12 bg-[#1D1D1D] text-[#f5efeb]">
      <div className="w-full max-w-[1700px] mx-auto">
        {/* ========================================================================= */}
        {/* CLEAN, UNCLUTTERED TOP HEADER */}
        {/* ========================================================================= */}
        <header className="pb-5 border-b border-[rgba(245,239,235,0.1)]">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8a847a] mb-1">
                Astronomy BU / Crew Archive
              </p>
              <h1 className="font-editorial-serif italic text-4xl sm:text-6xl text-[#f5efeb] leading-tight">
                Members &amp; Heads
              </h1>
            </div>

            {/* Compact Telemetry Counters */}
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#a39e93]">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(245,239,235,0.12)] bg-[#17171a]">
                <Users className="w-3.5 h-3.5 text-[#c84b31]" />
                <strong className="text-[#f5efeb]">{totalTenureMembers}</strong>{" "}
                Curators
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(245,239,235,0.12)] bg-[#17171a]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#eae5d9]" />
                <strong className="text-[#f5efeb]">
                  {currentTenureData.departments.length}
                </strong>{" "}
                Divisions
              </span>
            </div>
          </div>

          {/* Unified Controls: Tenure Buttons & Division Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(245,239,235,0.06)]">
            {/* Tenure Switcher */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#8a847a] mr-1 uppercase">
                TENURE:
              </span>
              {allTenures.map((t) => (
                <button
                  key={t.tenureYear}
                  type="button"
                  onClick={() => setSelectedTenureYear(t.tenureYear)}
                  className={`px-3.5 py-1 rounded-full font-mono text-[10px] sm:text-[11px] tracking-wider uppercase transition-colors cursor-pointer ${
                    selectedTenureYear === t.tenureYear
                      ? "bg-[#eae5d9] text-[#1D1D1D] font-bold shadow-sm"
                      : "border border-[rgba(245,239,235,0.14)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[rgba(245,239,235,0.3)] bg-[#17171a]"
                  }`}
                >
                  {t.tenureYear}
                </button>
              ))}
            </div>

            {/* Division Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] text-[#8a847a] mr-1 uppercase">
                DIVISION:
              </span>
              <button
                type="button"
                onClick={() => setSelectedDept("ALL")}
                className={`px-2.5 py-1 rounded-full font-mono text-[9px] uppercase transition-colors cursor-pointer ${
                  selectedDept === "ALL"
                    ? "border border-[#f5efeb] text-[#f5efeb] bg-[#222225] font-bold"
                    : "text-[#8a847a] hover:text-[#a39e93] border border-transparent"
                }`}
              >
                ALL ({totalTenureMembers})
              </button>
              {allDepartmentNames.map((dept) => {
                const deptInTenure = currentTenureData.departments.find(
                  (d) => d.name === dept,
                );
                const count = deptInTenure ? deptInTenure.members.length : 0;
                const isAvailable = count > 0;

                if (!isAvailable && selectedTenureYear !== "2025-2026") {
                  return null;
                }

                return (
                  <button
                    key={dept}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-2.5 py-1 rounded-full font-mono text-[9px] uppercase transition-colors cursor-pointer ${
                      selectedDept === dept
                        ? "border border-[#f5efeb] text-[#f5efeb] bg-[#222225] font-bold"
                        : isAvailable
                          ? "text-[#8a847a] hover:text-[#a39e93] border border-transparent"
                          : "text-[#55504a] border border-transparent cursor-not-allowed opacity-35"
                    }`}
                  >
                    {dept}
                    {isAvailable && (
                      <span className="opacity-60 ml-1">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* MAIN HERO FOCUS: The Rotary Carousel (Cards Moving In A Circle) */}
        {/* ========================================================================= */}
        <section className="mt-6 mb-16" aria-label="Orbital rotary carousel">
          <RotaryCarousel
            members={visibleMembers}
            onSelectMember={(member) => setSelectedDossierMember(member)}
          />
        </section>

        {/* ========================================================================= */}
        {/* COMPACT DIRECTORY GRID: Sleeker, smaller card footprint */}
        {/* ========================================================================= */}
        <section
          ref={gridRef}
          className="mt-12 pt-10 border-t border-[rgba(245,239,235,0.12)] flex flex-col gap-14"
          aria-label="Department directory grid"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(245,239,235,0.08)]">
            <div>
              <p className="font-mono text-[9px] tracking-archival text-[#8a847a] uppercase">
                Archival Catalog {"//"} Full Roster
              </p>
              <h2 className="font-editorial-serif italic text-3xl sm:text-4xl text-[#f5efeb]">
                Divisions &amp; Officers
              </h2>
            </div>
            <p className="font-mono text-[9px] text-[#8a847a] uppercase">
              Click any card to inspect dossier
            </p>
          </div>

          {filteredDepartments.map((dept) => (
            <div
              key={dept.name}
              className="flex flex-col gap-5"
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "320px",
              }}
            >
              {/* Department Subheader */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2.5 border-b border-[rgba(245,239,235,0.08)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c84b31]" />
                  <h3 className="font-editorial-serif italic text-2xl sm:text-3xl text-[#f5efeb]">
                    {dept.name}
                  </h3>
                </div>
                <p className="font-mono text-[10px] text-[#a39e93]">
                  {dept.description}
                </p>
              </div>

              {/* Smaller, High-Density Compact Grid (4 to 5 columns on desktop) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
                {dept.members.map((member) => (
                  <CompactMemberCard
                    key={member.id}
                    member={member}
                    onInspect={() => setSelectedDossierMember(member)}
                  />
                ))}
              </div>
            </div>
          ))}

          {filteredDepartments.length === 0 && (
            <div className="py-16 text-center border border-[rgba(245,239,235,0.1)] rounded-[20px] bg-[#141416]">
              <p className="font-mono text-xs text-[#8a847a]">
                NO CURATORS FOUND FOR THIS DIVISION IN THE {selectedTenureYear}{" "}
                ARCHIVE.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* ========================================================================= */}
      {/* EXPANDED CHERNOBYL DOSSIER MODAL WITH FULL-VISIBILITY BACKGROUND */}
      {/* ========================================================================= */}
      {selectedDossierMember && (
        <ChernobylDossierModal
          member={selectedDossierMember}
          allMembers={visibleMembers}
          onSelectMember={(m) => setSelectedDossierMember(m)}
          onClose={() => setSelectedDossierMember(null)}
        />
      )}
    </div>
  );
}

// Compact MemberCard: Smaller, elegant, and refined
function CompactMemberCard({
  member,
  onInspect,
}: {
  member: TeamMember;
  onInspect?: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = member.name
    .replace(/\[.*?\]/g, "")
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="member-card-compact relative rounded-[18px] border border-[rgba(245,239,235,0.1)] bg-[#131316] p-3 sm:p-3.5 flex flex-col justify-between hover:border-[rgba(245,239,235,0.3)] transition-all duration-200 group hover:-translate-y-0.5 shadow-md">
      {/* Invisible button spanning the entire card for keyboard and mouse access to the dossier */}
      <button
        type="button"
        onClick={onInspect}
        className="absolute inset-0 z-0 w-full h-full rounded-[18px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#eae5d9]/40"
        aria-label={`Inspect dossier for ${member.name.replace(/\[.*?\]/g, "")}`}
      />

      <div className="relative z-1 pointer-events-none flex flex-col justify-between h-full">
        <div>
          {/* Compact Photo Frame */}
          <div className="relative aspect-[4/5] w-full mb-3 rounded-[14px] border border-[rgba(245,239,235,0.08)] bg-[#18181d] overflow-hidden">
            {!imageFailed && member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                onError={() => setImageFailed(true)}
                className="object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                quality={70}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#18181e] to-[#0f0f12] text-center select-none">
                <span className="font-editorial-serif text-3xl text-[#eae5d9]/60">
                  {initials}
                </span>
              </div>
            )}

            {member.isHead && (
              <div className="absolute top-2 left-2 bg-[#eae5d9] text-[#1D1D1D] px-2 py-0.5 rounded-full font-mono text-[7px] font-bold tracking-widest uppercase shadow-sm">
                LEAD
              </div>
            )}
          </div>

          {/* Role & Name */}
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[8px] tracking-widest text-[#a39e93] uppercase truncate">
              {member.role}
            </span>
            <h4 className="font-editorial-serif text-lg text-[#f5efeb] leading-snug group-hover:text-[#eae5d9] transition-colors truncate">
              {member.name.replace(/\[.*?\]/g, "")}
            </h4>
          </div>

          {/* Compact Quote */}
          {member.quote && (
            <p className="mt-2 font-mono text-[10px] text-[#8a847a] italic line-clamp-1 border-l border-[rgba(245,239,235,0.15)] pl-1.5">
              &ldquo;{member.quote}&rdquo;
            </p>
          )}
        </div>

        {/* Footer with Mini Social Links */}
        <div className="mt-3 pt-2 border-t border-[rgba(245,239,235,0.06)] flex items-center justify-between text-[#8a847a]">
          <span className="font-mono text-[8px] tracking-wider uppercase flex items-center gap-1 group-hover:text-[#eae5d9]">
            <Eye className="w-2.5 h-2.5 text-[#c84b31]" />
            DOSSIER
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {member.socials.instagram && (
              <a
                href={
                  member.socials.instagram.startsWith("http")
                    ? member.socials.instagram
                    : `https://instagram.com/${member.socials.instagram.replace("@", "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a847a] hover:text-[#f5efeb] p-0.5 transition-colors"
                aria-label={`${member.name} Instagram`}
              >
                <InstagramIcon className="w-3 h-3" />
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
                className="text-[#8a847a] hover:text-[#f5efeb] p-0.5 transition-colors"
                aria-label={`${member.name} LinkedIn`}
              >
                <LinkedinIcon className="w-3 h-3" />
              </a>
            )}
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a847a] hover:text-[#f5efeb] p-0.5 transition-colors"
                aria-label={`${member.name} GitHub`}
              >
                <GithubIcon className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
