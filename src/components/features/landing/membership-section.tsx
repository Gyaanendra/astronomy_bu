"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type PlanKey = "FIELD" | "CIRCLE" | "ORBIT";

interface PlanDetails {
  name: string;
  badge: string;
  price: string;
  description: string;
  access: { label: string; included: boolean }[];
  engagement: { label: string; included: boolean }[];
}

const PLANS: Record<PlanKey, PlanDetails> = {
  FIELD: {
    name: "FIELD PLAN",
    badge: "STUDENT GENERAL TIER",
    price: "₹0 / BU UNDERGRADUATE",
    description:
      "A quiet point of entry into AstronomyBU — structured, minimal, and consistent. Designed for occasional return and slow familiarity with the night sky and campus telescopes.",
    access: [
      { label: "Entry and attendance", included: true },
      { label: "Entry to programs (per month)", included: true },
      { label: "Open observation nights", included: true },
      { label: "Priority booking", included: false },
      { label: "Small group sessions", included: false },
      { label: "Seasonal gatherings", included: true },
    ],
    engagement: [
      { label: "Content and participation", included: true },
      { label: "Archive selections (monthly)", included: true },
      { label: "Early journal access", included: false },
      { label: "Behind-the-scenes previews", included: false },
      { label: "Open calls & collaborations", included: true },
      { label: "Guest access (monthly)", included: false },
    ],
  },
  CIRCLE: {
    name: "CIRCLE PLAN",
    badge: "WORKING COMMITTEE",
    price: "TENURE FELLOWSHIP",
    description:
      "For student researchers and creative leads across our 6 departments: Tech & Research, Astrophotography, Content, Management, PR & Outreach, and Web Development.",
    access: [
      { label: "Entry and attendance", included: true },
      { label: "Entry to programs (per month)", included: true },
      { label: "Open observation nights", included: true },
      { label: "Priority booking", included: true },
      { label: "Small group sessions", included: true },
      { label: "Seasonal gatherings", included: true },
    ],
    engagement: [
      { label: "Content and participation", included: true },
      { label: "Archive selections (monthly)", included: true },
      { label: "Early journal access", included: true },
      { label: "Behind-the-scenes previews", included: true },
      { label: "Open calls & collaborations", included: true },
      { label: "Guest access (monthly)", included: true },
    ],
  },
  ORBIT: {
    name: "ORBIT PLAN",
    badge: "EXECUTIVE COUNCIL",
    price: "COUNCIL APPOINTMENT",
    description:
      "Core governance led by Advisor Shardul Dhekane [𝙎𝙋𝙄𝙍𝙄𝙏], Secretary Kaavya Kumar Yadav, and Joint Secretary Abhimanyu Narang, directing telemetry and institutional collaborations.",
    access: [
      { label: "Entry and attendance", included: true },
      { label: "Entry to programs (per month)", included: true },
      { label: "Open observation nights", included: true },
      { label: "Priority booking", included: true },
      { label: "Small group sessions", included: true },
      { label: "Seasonal gatherings", included: true },
    ],
    engagement: [
      { label: "Content and participation", included: true },
      { label: "Archive selections (monthly)", included: true },
      { label: "Early journal access", included: true },
      { label: "Behind-the-scenes previews", included: true },
      { label: "Open calls & collaborations", included: true },
      { label: "Guest access (monthly)", included: true },
    ],
  },
};

export function MembershipSection() {
  const [activePlan, setActivePlan] = useState<PlanKey>("FIELD");
  const plan = PLANS[activePlan];

  return (
    <section
      id="membership"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] border-t border-[rgba(245,239,235,0.12)] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Top Header Row (Pinterest Reference 5 Top-Left) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 sm:pb-12 border-b border-[rgba(245,239,235,0.12)] gap-8">
          <div>
            <h2 className="font-editorial-serif italic text-4xl sm:text-6xl xl:text-7xl text-[#f5efeb] tracking-tight">
              MEMBERSHIP
            </h2>
          </div>

          <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-xl md:text-right uppercase">
            Ongoing access to AstronomyBU&apos;s experiences, spaces, and seasonal programs without individual booking. It is structured as a gradual deepening of proximity — from occasional presence to active participation.
          </p>
        </div>

        {/* Plan Selector Tabs */}
        <div className="flex items-center gap-2 pt-10 pb-6">
          {(["FIELD", "CIRCLE", "ORBIT"] as PlanKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActivePlan(key)}
              className={`px-6 sm:px-8 py-2 font-mono text-xs tracking-archival uppercase transition-colors ${
                activePlan === key
                  ? "bg-[#eae5d9] text-[#1D1D1D] font-semibold"
                  : "bg-transparent text-[#a39e93] border border-[rgba(245,239,235,0.2)] hover:border-[#f5efeb] hover:text-[#f5efeb]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Main Matrix Box: Split Left Bone Card & Right Checklist Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[rgba(245,239,235,0.15)] bg-[#1D1D1D]">
          
          {/* Left Bone Card (4 Columns) */}
          <div className="lg:col-span-4 bg-[#eae5d9] text-[#1D1D1D] p-8 sm:p-12 flex flex-col justify-between min-h-[460px]">
            <div>
              <span className="font-mono text-[10px] tracking-archival text-[#52525b] uppercase block mb-3 font-semibold">
                {plan.badge}
              </span>
              <h3 className="font-editorial-serif italic text-4xl sm:text-5xl text-[#1D1D1D] tracking-tight mb-6">
                {plan.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#27272a] leading-relaxed">
                {plan.description}
              </p>
            </div>

            <div className="pt-8">
              <div className="w-full py-4 bg-[#1D1D1D] text-[#eae5d9] font-mono text-xs tracking-archival font-semibold uppercase text-center">
                [{plan.price}]
              </div>
            </div>
          </div>

          {/* Right Matrix: ACCESS (4 Cols) & ENGAGEMENT (4 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[rgba(245,239,235,0.12)] p-8 sm:p-12">
            
            {/* Column 1: ACCESS */}
            <div className="md:pr-8 pb-8 md:pb-0">
              <h4 className="font-mono text-xs tracking-archival text-[#f5efeb] uppercase pb-6 mb-6 border-b border-[rgba(245,239,235,0.12)] font-semibold">
                ACCESS
              </h4>

              <div className="space-y-4 font-mono text-xs text-[#a39e93]">
                {plan.access.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-[rgba(245,239,235,0.06)]"
                  >
                    <span className="text-[#eae5d9]">{item.label}</span>
                    <div
                      className={`w-4 h-4 border flex items-center justify-center ${
                        item.included
                          ? "border-[#f5efeb] bg-[#f5efeb] text-[#1D1D1D]"
                          : "border-[rgba(245,239,235,0.2)] bg-transparent text-transparent"
                      }`}
                    >
                      {item.included && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: ENGAGEMENT */}
            <div className="md:pl-8 pt-8 md:pt-0">
              <h4 className="font-mono text-xs tracking-archival text-[#f5efeb] uppercase pb-6 mb-6 border-b border-[rgba(245,239,235,0.12)] font-semibold">
                ENGAGEMENT
              </h4>

              <div className="space-y-4 font-mono text-xs text-[#a39e93]">
                {plan.engagement.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-[rgba(245,239,235,0.06)]"
                  >
                    <span className="text-[#eae5d9]">{item.label}</span>
                    <div
                      className={`w-4 h-4 border flex items-center justify-center ${
                        item.included
                          ? "border-[#f5efeb] bg-[#f5efeb] text-[#1D1D1D]"
                          : "border-[rgba(245,239,235,0.2)] bg-transparent text-transparent"
                      }`}
                    >
                      {item.included && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
