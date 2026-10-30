"use client";

import { useState } from "react";
import Image from "next/image";
import { allTenures } from "@/content/team";
import { Department, TeamMember } from "@/types/team.types";
import { ExternalLink, Sparkles } from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/icons";

export function TeamShowcase() {
  const [selectedTenureYear, setSelectedTenureYear] = useState<string>("2025-2026");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");

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

  return (
    <div className="w-full py-16 px-4 sm:px-8 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <span className="font-mono text-[10px] tracking-archival text-[#a39e93] block mb-2">
            CATEGORY // 02 · ROSTER OF CURATORS &amp; EXPLORERS
          </span>
          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl text-[#f5efeb]">
            Members &amp; Heads
          </h1>
          <p className="mt-4 font-sans text-sm text-[#a39e93] max-w-2xl leading-relaxed">
            The curators, engineers, observers, and communicators steering Bennett University&apos;s celestial voyages across tenures.
          </p>

          {/* Tenure Switcher & Department Filter Controls */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            {/* Tenure Selectors */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#635e57] mr-2">TENURE:</span>
              {allTenures.map((t) => (
                <button
                  key={t.tenureYear}
                  onClick={() => setSelectedTenureYear(t.tenureYear)}
                  className={`px-3 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-all ${
                    selectedTenureYear === t.tenureYear
                      ? "bg-[#eae5d9] text-[#09090b] font-semibold"
                      : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb]"
                  }`}
                >
                  {t.tenureLabel}
                </button>
              ))}
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[11px] text-[#635e57] mr-2">DIVISION:</span>
              <button
                onClick={() => setSelectedDept("ALL")}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-all ${
                  selectedDept === "ALL"
                    ? "border border-[#f5efeb] text-[#f5efeb] bg-[#18181b]"
                    : "text-[#635e57] hover:text-[#a39e93]"
                }`}
              >
                ALL
              </button>
              {departmentList.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-all ${
                    selectedDept === dept
                      ? "border border-[#f5efeb] text-[#f5efeb] bg-[#18181b]"
                      : "text-[#635e57] hover:text-[#a39e93]"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Department Sections */}
        <div className="mt-16 flex flex-col gap-20">
          {filteredDepartments.map((dept) => (
            <div key={dept.name} className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[rgba(245,239,235,0.1)]">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
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
  return (
    <div className="border border-[rgba(245,239,235,0.12)] bg-[#111113] p-6 flex flex-col justify-between hover:border-[rgba(245,239,235,0.3)] transition-all group">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[4/5] w-full mb-6 border border-[rgba(245,239,235,0.1)] bg-[#09090b] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover grayscale contrast-115 group-hover:contrast-100 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {member.isHead && (
            <div className="absolute top-3 left-3 bg-[#eae5d9] text-[#09090b] px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
              LEAD / HEAD
            </div>
          )}
          <div className="absolute bottom-2 right-2 font-mono text-[8px] text-[#f5efeb]/40 tracking-wider">
            DOSSIER REF // {member.id.toUpperCase().slice(0, 8)}
          </div>
        </div>

        {/* Name and Role */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-archival text-[#d4af37] uppercase">
            {member.role}
          </span>
          <h3 className="font-editorial-serif text-2xl text-[#f5efeb] tracking-wide group-hover:text-[#eae5d9] transition-colors">
            {member.name}
          </h3>
        </div>

        {/* Quote */}
        {member.quote && (
          <p className="mt-4 font-mono text-xs text-[#a39e93] italic leading-relaxed border-l border-[rgba(245,239,235,0.15)] pl-3">
            &ldquo;{member.quote}&rdquo;
          </p>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-8 pt-4 border-t border-[rgba(245,239,235,0.08)] flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-widest text-[#635e57]">
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
              className="text-[#635e57] hover:text-[#f5efeb] transition-colors"
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
              className="text-[#635e57] hover:text-[#f5efeb] transition-colors"
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
              className="text-[#635e57] hover:text-[#f5efeb] transition-colors"
              aria-label={`${member.name} GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {member.socials.other && (
            <a
              href={member.socials.other}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#635e57] hover:text-[#f5efeb] transition-colors"
              aria-label={`${member.name} Portfolio`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
