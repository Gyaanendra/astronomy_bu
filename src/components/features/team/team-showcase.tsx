"use client";

import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Compass,
  Users,
  Eye,
  Disc3,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/icons";
import { allTenures } from "@/content/team";
import type { Department, TeamMember } from "@/types/team.types";
import { RotaryCarousel } from "./rotary-carousel";
import { ChernobylDossierModal } from "./chernobyl-dossier-modal";

const departmentList: Department[] = [
  "Leadership",
  "Tech & Research",
  "Web & Development",
  "Content",
  "Management",
  "PR & Outreach",
  "Multimedia",
  "Finance",
];

export function TeamShowcase() {
  const [selectedTenureYear, setSelectedTenureYear] = useState("2025-2026");
  const [selectedDept, setSelectedDept] = useState<Department | "ALL">("ALL");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [dossierModalMember, setDossierModalMember] =
    useState<TeamMember | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const currentTenure =
    allTenures.find((tenure) => tenure.tenureYear === selectedTenureYear) ??
    allTenures[0];

  const visibleDepartments =
    selectedDept === "ALL"
      ? currentTenure.departments
      : currentTenure.departments.filter(
          (department) => department.name === selectedDept,
        );

  const visibleMembers = useMemo(
    () => visibleDepartments.flatMap((department) => department.members),
    [visibleDepartments],
  );

  useEffect(() => {
    if (
      visibleMembers.length &&
      !visibleMembers.some((member) => member.id === selectedMemberId)
    ) {
      setSelectedMemberId(visibleMembers[0].id);
    }
  }, [selectedMemberId, visibleMembers]);

  const selectedMember =
    visibleMembers.find((member) => member.id === selectedMemberId) ??
    visibleMembers[0];

  useEffect(() => {
    if (!heroRef.current || !selectedMember) return;
    heroRef.current.dataset.memberId = selectedMember.id;
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
    );
  }, [selectedMember]);

  const moveSelection = (direction: -1 | 1) => {
    if (!visibleMembers.length) return;
    const currentIndex = selectedMember
      ? visibleMembers.findIndex((member) => member.id === selectedMember.id)
      : 0;
    const nextIndex =
      (currentIndex + direction + visibleMembers.length) %
      visibleMembers.length;
    setSelectedMemberId(visibleMembers[nextIndex].id);
  };

  const totalMembers = currentTenure.departments.reduce(
    (total, department) => total + department.members.length,
    0,
  );

  return (
    <main className="w-full min-h-screen overflow-hidden bg-[#1D1D1D] text-[#f5efeb]">
      <section className="relative mx-auto max-w-[1800px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* Top Header Section */}
        <header className="mb-7 flex flex-col gap-5 border-b border-[rgba(245,239,235,0.12)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-[#8a847a]">
              Astronomy BU / Crew Archive
            </p>
            <h1 className="font-editorial-serif text-5xl leading-none italic sm:text-6xl lg:text-7xl">
              The People
            </h1>
          </div>

          <div className="flex items-center gap-6 pb-1">
            <div>
              <p className="font-editorial-serif text-2xl">{totalMembers}</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#8a847a]">
                Crew members
              </p>
            </div>
            <div className="h-9 w-px bg-[rgba(245,239,235,0.12)]" />
            <div>
              <p className="font-editorial-serif text-2xl">
                {currentTenure.departments.length}
              </p>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#8a847a]">
                Divisions
              </p>
            </div>
          </div>
        </header>

        {/* Navigation & Filters Bar */}
        <nav className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {allTenures.map((tenure) => (
              <button
                key={tenure.tenureYear}
                type="button"
                onClick={() => {
                  setSelectedTenureYear(tenure.tenureYear);
                  setSelectedMemberId(null);
                }}
                className={`shrink-0 rounded-full px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                  selectedTenureYear === tenure.tenureYear
                    ? "bg-[#f5efeb] text-[#1D1D1D] font-bold shadow-sm"
                    : "border border-[rgba(245,239,235,0.14)] text-[#a39e93] hover:border-[rgba(245,239,235,0.35)] hover:text-[#f5efeb]"
                }`}
              >
                {tenure.tenureYear}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-[210px]">
            <select
              value={selectedDept}
              onChange={(event) => {
                setSelectedDept(event.target.value as Department | "ALL");
                setSelectedMemberId(null);
              }}
              className="h-10 w-full appearance-none border border-[rgba(245,239,235,0.14)] bg-[#191919] px-4 pr-10 font-mono text-[9px] uppercase tracking-[0.14em] text-[#f5efeb] outline-none cursor-pointer"
              aria-label="Filter by division"
            >
              <option value="ALL">All divisions</option>
              {departmentList.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a847a]" />
          </div>
        </nav>

        {selectedMember ? (
          <>
            {/* Featured Hero Showcase Stage */}
            <div
              ref={heroRef}
              className="relative grid min-h-[620px] overflow-hidden border border-[rgba(245,239,235,0.12)] bg-[#151515] lg:grid-cols-[44%_56%]"
            >
              <ProfilePortrait
                key={selectedMember.id}
                member={selectedMember}
                onOpenDossier={() => setDossierModalMember(selectedMember)}
              />

              <article className="relative flex min-h-[520px] flex-col justify-between p-7 sm:p-10 lg:min-h-[620px] lg:p-12 xl:p-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(245,239,235,0.055),transparent_34%)] pointer-events-none" />

                <div className="relative flex items-start justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8a847a]">
                    {String(
                      visibleMembers.findIndex(
                        (member) => member.id === selectedMember.id,
                      ) + 1,
                    ).padStart(2, "0")}
                    {" / "}
                    {String(visibleMembers.length).padStart(2, "0")}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveSelection(-1)}
                      className="flex h-10 w-10 items-center justify-center border border-[rgba(245,239,235,0.14)] transition-colors hover:border-[#f5efeb] cursor-pointer"
                      aria-label="Previous profile"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSelection(1)}
                      className="flex h-10 w-10 items-center justify-center border border-[rgba(245,239,235,0.14)] transition-colors hover:border-[#f5efeb] cursor-pointer"
                      aria-label="Next profile"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative my-auto py-12 lg:py-8">
                  <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.28em] text-[#b9b1a4]">
                    {selectedMember.department}
                  </p>
                  <h2 className="max-w-[760px] font-editorial-serif text-5xl leading-[0.92] sm:text-7xl xl:text-[92px]">
                    {cleanName(selectedMember.name)}
                  </h2>
                  <div className="mt-7 flex items-center gap-3">
                    <span className="h-px w-12 bg-[#a39e93]" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d2ccbe]">
                      {selectedMember.role}
                    </p>
                  </div>
                  {selectedMember.quote && (
                    <blockquote className="mt-8 max-w-xl border-l border-[rgba(245,239,235,0.24)] pl-5 font-editorial-serif text-xl leading-relaxed text-[#b9b1a4] italic sm:text-2xl">
                      &ldquo;{selectedMember.quote}&rdquo;
                    </blockquote>
                  )}

                  {/* Quick button to open full Chernobyl dossier view */}
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => setDossierModalMember(selectedMember)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(245,239,235,0.2)] bg-[#1c1c22] hover:bg-[#eae5d9] hover:text-[#1D1D1D] font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer group"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#c84b31] group-hover:text-[#1D1D1D] transition-colors" />
                      Inspect Full Dossier
                      <span className="opacity-60">↗</span>
                    </button>
                  </div>
                </div>

                <div className="relative flex flex-wrap items-end justify-between gap-6 border-t border-[rgba(245,239,235,0.12)] pt-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[#777266]">
                        Tenure
                      </p>
                      <p className="font-mono text-[10px] text-[#c9c2b5]">
                        {selectedTenureYear}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[#777266]">
                        Status
                      </p>
                      <p className="flex items-center gap-2 font-mono text-[10px] text-[#c9c2b5]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                      </p>
                    </div>
                  </div>
                  <SocialLinks member={selectedMember} />
                </div>
              </article>
            </div>

            {/* ========================================================================= */}
            {/* ROTARY CAROUSEL: Cards moving in a circle as requested by the user */}
            {/* ========================================================================= */}
            <section
              className="mt-14 pt-10 border-t border-[rgba(245,239,235,0.1)]"
              aria-label="Team orbital rotary carousel"
            >
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Disc3
                      className="w-4 h-4 text-[#c84b31] animate-spin"
                      style={{ animationDuration: "12s" }}
                    />
                    <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#8a847a]">
                      Across the roster / Rotary Orbit Wheel
                    </p>
                  </div>
                  <h3 className="font-editorial-serif italic text-3xl sm:text-4xl text-[#f5efeb]">
                    Orbital Cards Dial
                  </h3>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#8a847a]">
                  Click or drag cards in a circle · Tap active card to inspect
                  dossier
                </p>
              </div>

              {/* Rotary Wheel Carousel */}
              <RotaryCarousel
                members={visibleMembers}
                activeMemberId={selectedMember.id}
                onCenterMember={(member) => setSelectedMemberId(member.id)}
                onSelectMember={(member) => {
                  setSelectedMemberId(member.id);
                  setDossierModalMember(member);
                }}
              />
            </section>
          </>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center border border-[rgba(245,239,235,0.12)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a847a]">
              No profiles in this division
            </p>
          </div>
        )}
      </section>

      {/* Chernobyl-Style Full Profile Dossier Modal (opens when inspecting a profile) */}
      {dossierModalMember && (
        <ChernobylDossierModal
          member={dossierModalMember}
          allMembers={visibleMembers}
          onSelectMember={(m) => {
            setSelectedMemberId(m.id);
            setDossierModalMember(m);
          }}
          onClose={() => setDossierModalMember(null)}
        />
      )}
    </main>
  );
}

function cleanName(name: string) {
  return name.replace(/\[.*?\]/g, "").trim();
}

function ProfilePortrait({
  member,
  onOpenDossier,
}: {
  member: TeamMember;
  onOpenDossier?: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      onClick={onOpenDossier}
      className="group relative min-h-[470px] overflow-hidden bg-[#111113] lg:min-h-[620px] cursor-pointer"
      title="Click to inspect full dossier"
    >
      {!imageFailed && member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          priority
          onError={() => setImageFailed(true)}
          className="object-cover grayscale-[15%] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 44vw"
        />
      ) : (
        <PortraitFallback member={member} />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(16,16,16,0.78)_100%),linear-gradient(90deg,rgba(29,29,29,0.12),transparent_40%)]" />
      <div className="absolute left-5 top-5 border border-[rgba(245,239,235,0.25)] bg-[rgba(29,29,29,0.45)] px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#f5efeb]/80">
          {member.isHead ? "Division lead" : "Crew member"}
        </p>
      </div>
      <div className="absolute bottom-5 left-5 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-[#f5efeb]/55">
        <Compass className="h-3 w-3" />
        Bennett Observatory
      </div>
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2.5 py-1 rounded-full border border-[rgba(245,239,235,0.2)] font-mono text-[8px] tracking-widest text-[#f5efeb] uppercase flex items-center gap-1">
        <Eye className="w-3 h-3 text-[#c84b31]" />
        Inspect Dossier
      </div>
    </div>
  );
}

function PortraitFallback({ member }: { member: TeamMember }) {
  const initials = cleanName(member.name)
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#282828_0%,#151515_72%)]">
      <span className="font-editorial-serif text-8xl text-[#d7d0c3]/60">
        {initials}
      </span>
      <span className="mt-4 font-mono text-[8px] uppercase tracking-[0.24em] text-[#777266]">
        Image unavailable
      </span>
    </div>
  );
}

function SocialLinks({ member }: { member: TeamMember }) {
  const links = [
    {
      key: "instagram",
      href: member.socials.instagram
        ? member.socials.instagram.startsWith("http")
          ? member.socials.instagram
          : `https://instagram.com/${member.socials.instagram.replace("@", "")}`
        : null,
      label: "Instagram",
      icon: <InstagramIcon className="h-4 w-4" />,
    },
    {
      key: "linkedin",
      href: member.socials.linkedin
        ? member.socials.linkedin.startsWith("http")
          ? member.socials.linkedin
          : `https://linkedin.com/in/${member.socials.linkedin}`
        : null,
      label: "LinkedIn",
      icon: <LinkedinIcon className="h-4 w-4" />,
    },
    {
      key: "github",
      href: member.socials.github ?? null,
      label: "GitHub",
      icon: <GithubIcon className="h-4 w-4" />,
    },
  ].filter((link) => link.href);

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center border border-[rgba(245,239,235,0.14)] text-[#a39e93] transition-colors hover:border-[#f5efeb] hover:text-[#f5efeb]"
          aria-label={`${member.name} ${link.label}`}
        >
          {link.icon}
        </a>
      ))}
      {links.length === 0 && (
        <span className="flex h-9 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#777266]">
          <Users className="h-3 w-3" />
          No public links
        </span>
      )}
    </div>
  );
}
