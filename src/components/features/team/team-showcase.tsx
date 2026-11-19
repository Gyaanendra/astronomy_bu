"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { allTenures } from "@/content/team";
import { Department, TeamMember } from "@/types/team.types";
import { Sparkles, Users, Award, Calendar, Compass, ShieldCheck } from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/icons";
import gsap from "gsap";

export function TeamShowcase() {
  const [selectedTenureYear, setSelectedTenureYear] = useState<string>("2025-2026");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const gridRef = useRef<HTMLDivElement>(null);

  const currentTenureData =
    allTenures.find((t) => t.tenureYear === selectedTenureYear) || allTenures[0];

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

  const filteredDepartments =
    selectedDept === "ALL"
      ? currentTenureData.departments
      : currentTenureData.departments.filter((d) => d.name === selectedDept);

  // Total members count in current tenure
  const totalTenureMembers = currentTenureData.departments.reduce(
    (acc, d) => acc + d.members.length,
    0
  );

  // GSAP animation on tenure / division change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".member-card"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }
  }, [selectedTenureYear, selectedDept]);

  return (
    <div className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 xl:px-24 bg-[#1D1D1D]">
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Page Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="font-mono text-[10px] tracking-archival text-[#a39e93] uppercase">
              CATEGORY // 02 · ROSTER OF CURATORS &amp; EXPLORERS
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8a847a]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATION: 28.4595° N · BENNETT OBSERVATORY</span>
            </div>
          </div>

          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl lg:text-8xl text-[#f5efeb]">
            Members &amp; Heads
          </h1>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#a39e93] max-w-3xl leading-relaxed">
            The curators, optical engineers, researchers, and communicators steering Bennett University&apos;s celestial voyages across tenures.
          </p>

          {/* Telemetry Stats Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[24px] bg-[#111113] border border-[rgba(245,239,235,0.08)]">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#eae5d9]/60" />
              <div>
                <p className="font-editorial-serif text-2xl text-[#f5efeb]">
                  {totalTenureMembers} Active
                </p>
                <p className="font-mono text-[10px] text-[#8a847a] uppercase">Current Roster</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#eae5d9]/60" />
              <div>
                <p className="font-editorial-serif text-2xl text-[#f5efeb]">8 Divisions</p>
                <p className="font-mono text-[10px] text-[#8a847a] uppercase">Operational Units</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#eae5d9]/60" />
              <div>
                <p className="font-editorial-serif text-2xl text-[#f5efeb]">3 Tenures</p>
                <p className="font-mono text-[10px] text-[#8a847a] uppercase">2023 — Present</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-[#eae5d9]/60" />
              <div>
                <p className="font-editorial-serif text-2xl text-[#f5efeb]">100+ Nights</p>
                <p className="font-mono text-[10px] text-[#8a847a] uppercase">Telescope Hours</p>
              </div>
            </div>
          </div>

          {/* Tenure Switcher & Department Filter Controls */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            {/* Tenure Selectors */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#8a847a] mr-2">TENURE:</span>
              {allTenures.map((t) => (
                <button
                  key={t.tenureYear}
                  onClick={() => setSelectedTenureYear(t.tenureYear)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase transition-all ${
                    selectedTenureYear === t.tenureYear
                      ? "bg-[#eae5d9] text-[#1D1D1D] font-bold shadow-sm"
                      : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[rgba(245,239,235,0.3)]"
                  }`}
                >
                  {t.tenureLabel}
                </button>
              ))}
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[11px] text-[#8a847a] mr-2">DIVISION:</span>
              <button
                onClick={() => setSelectedDept("ALL")}
                className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase transition-all ${
                  selectedDept === "ALL"
                    ? "border border-[#f5efeb] text-[#f5efeb] bg-[#222225]"
                    : "text-[#8a847a] hover:text-[#a39e93] border border-transparent"
                }`}
              >
                ALL
              </button>
              {departmentList.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase transition-all ${
                    selectedDept === dept
                      ? "border border-[#f5efeb] text-[#f5efeb] bg-[#222225]"
                      : "text-[#8a847a] hover:text-[#a39e93] border border-transparent"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Department Sections */}
        <div ref={gridRef} className="mt-16 flex flex-col gap-20">
          {filteredDepartments.map((dept) => (
            <div key={dept.name} className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[rgba(245,239,235,0.1)]">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#eae5d9]" />
                  <h2 className="font-editorial-serif italic text-3xl sm:text-4xl text-[#f5efeb]">
                    {dept.name}
                  </h2>
                </div>
                <p className="font-mono text-[11px] text-[#a39e93]">
                  {dept.description}
                </p>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dept.members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const [imageFailed, setImageFailed] = useState(false);

  // Extract initials for fallback avatar
  const initials = member.name
    .replace(/\[.*?\]/g, "")
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="member-card rounded-[28px] border border-[rgba(245,239,235,0.12)] bg-[#111113] p-6 flex flex-col justify-between hover:border-[rgba(245,239,235,0.3)] transition-all duration-300 group hover:-translate-y-1">
      <div>
        {/* Photo Container with Archival Fallback */}
        <div className="relative aspect-[4/5] w-full mb-6 rounded-[20px] border border-[rgba(245,239,235,0.1)] bg-[#18181b] overflow-hidden">
          {!imageFailed && member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              onError={() => setImageFailed(true)}
              className="object-cover grayscale contrast-115 group-hover:contrast-100 group-hover:scale-105 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1a1e] to-[#0f0f11] text-center select-none">
              <span className="font-editorial-serif text-5xl sm:text-6xl text-[#eae5d9]/60 mb-2">
                {initials}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#8a847a] uppercase">
                {member.department}
              </span>
              <span className="font-mono text-[8px] text-[#635e57] mt-3">
                BU ASTRONOMICAL CORPS
              </span>
            </div>
          )}

          {member.isHead && (
            <div className="absolute top-3 left-3 bg-[#eae5d9] text-[#1D1D1D] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase shadow-sm">
              LEAD / HEAD
            </div>
          )}

          <div className="absolute bottom-2 right-2 font-mono text-[8px] text-[#f5efeb]/40 tracking-wider">
            DOSSIER REF // {member.id.toUpperCase().slice(0, 8)}
          </div>
        </div>

        {/* Name and Role */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-archival text-[#eae5d9]/80 uppercase">
            {member.role}
          </span>
          <h3 className="font-editorial-serif text-2xl text-[#f5efeb] tracking-wide group-hover:text-[#eae5d9] transition-colors">
            {member.name}
          </h3>
        </div>

        {/* Quote */}
        {member.quote && (
          <p className="mt-4 font-mono text-xs text-[#a39e93] italic leading-relaxed border-l-2 border-[rgba(245,239,235,0.15)] pl-3">
            &ldquo;{member.quote}&rdquo;
          </p>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-8 pt-4 border-t border-[rgba(245,239,235,0.08)] flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-widest text-[#8a847a]">
          VERIFIED CURATOR
        </span>
        <div className="flex items-center gap-3">
          {member.socials.instagram && (
            <a
              href={
                member.socials.instagram.startsWith("http")
                  ? member.socials.instagram
                  : `https://instagram.com/${member.socials.instagram.replace("@", "")}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a847a] hover:text-[#f5efeb] transition-colors p-1"
              aria-label={`${member.name} Instagram`}
            >
              <InstagramIcon className="w-3.5 h-3.5" />
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
              className="text-[#8a847a] hover:text-[#f5efeb] transition-colors p-1"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a847a] hover:text-[#f5efeb] transition-colors p-1"
              aria-label={`${member.name} GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
