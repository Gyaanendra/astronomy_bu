"use client";

import { useState, useRef } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PlanKey = "FIELD" | "CIRCLE" | "ORBIT";

interface PlanItem {
  label: string;
  value: "check" | "dash" | string;
}

interface PlanDetails {
  name: string;
  price: string;
  description: string;
  access: PlanItem[];
  engagement: PlanItem[];
}

const PLANS: Record<PlanKey, PlanDetails> = {
  FIELD: {
    name: "FIELD\nPLAN",
    price: "₹2,900 / MONTH",
    description:
      "A quiet point of entry into Noctra—structured, minimal, and consistent. Designed for occasional return and slow familiarity with the space.",
    access: [
      { label: "Entry to programs (per month)", value: "1" },
      { label: "Open observation nights", value: "check" },
      { label: "Priority booking", value: "dash" },
      { label: "Small group sessions", value: "dash" },
      { label: "Seasonal gatherings", value: "check" },
    ],
    engagement: [
      { label: "Archive selections (monthly)", value: "check" },
      { label: "Early journal access", value: "dash" },
      { label: "Behind-the-scenes previews", value: "dash" },
      { label: "Open calls & collaborations", value: "check" },
      { label: "Guest access (monthly)", value: "1" },
    ],
  },
  CIRCLE: {
    name: "CIRCLE\nPLAN",
    price: "₹5,500 / MONTH",
    description:
      "For regular presence and focused participation. Deeper engagement across programs, discussions, and member-only observations.",
    access: [
      { label: "Entry to programs (per month)", value: "2" },
      { label: "Open observation nights", value: "check" },
      { label: "Priority booking", value: "check" },
      { label: "Small group sessions", value: "check" },
      { label: "Seasonal gatherings", value: "check" },
    ],
    engagement: [
      { label: "Archive selections (monthly)", value: "check" },
      { label: "Early journal access", value: "check" },
      { label: "Behind-the-scenes previews", value: "check" },
      { label: "Open calls & collaborations", value: "check" },
      { label: "Guest access (monthly)", value: "2" },
    ],
  },
  ORBIT: {
    name: "ORBIT\nPLAN",
    price: "₹9,500 / MONTH",
    description:
      "Full proximity to Noctra. Unrestricted attendance, private telescope access, archive contributions, and curatorial previews.",
    access: [
      { label: "Entry to programs (per month)", value: "All" },
      { label: "Open observation nights", value: "check" },
      { label: "Priority booking", value: "check" },
      { label: "Small group sessions", value: "check" },
      { label: "Seasonal gatherings", value: "check" },
    ],
    engagement: [
      { label: "Archive selections (monthly)", value: "check" },
      { label: "Early journal access", value: "check" },
      { label: "Behind-the-scenes previews", value: "check" },
      { label: "Open calls & collaborations", value: "check" },
      { label: "Guest access (monthly)", value: "4" },
    ],
  },
};

export function MembershipSection() {
  const [activePlan, setActivePlan] = useState<PlanKey>("FIELD");
  const plan = PLANS[activePlan];
  const containerRef = useRef<HTMLElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      if (matrixRef.current) {
        gsap.from(matrixRef.current, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: matrixRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="membership"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 sm:mb-14 gap-8">
          <div>
            <h2 className="font-editorial-serif italic text-4xl sm:text-6xl xl:text-7xl text-[#f5efeb] tracking-tight">
              MEMBERSHIP
            </h2>
          </div>

          <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-md md:text-right">
            Ongoing access to Noctra&apos;s experiences, spaces, and seasonal
            programs without individual booking. It is structured as a gradual
            deepening of proximity — from occasional presence to active
            participation.
          </p>
        </div>

        {/* Plan Selector Tabs */}
        <div className="flex items-center gap-2 mb-6">
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

        {/* Main Matrix Box */}
        <div
          ref={matrixRef}
          className="grid grid-cols-1 lg:grid-cols-12 border border-[rgba(245,239,235,0.15)] bg-[#1D1D1D]"
        >
          {/* Left Bone Card (4 Columns) */}
          <div className="lg:col-span-4 bg-[#eae5d9] text-[#1D1D1D] p-8 sm:p-12 flex flex-col justify-between min-h-[460px]">
            <div>
              <h3 className="font-sans font-bold text-3xl sm:text-4xl text-[#1D1D1D] tracking-tight mb-6 whitespace-pre-line leading-[0.95] uppercase">
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

          {/* Right Matrix: ACCESS & ENGAGEMENT */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[rgba(245,239,235,0.12)] p-8 sm:p-12">
            {/* Column 1: ACCESS */}
            <div className="md:pr-8 pb-8 md:pb-0">
              <h4 className="font-mono text-xs sm:text-sm tracking-wider text-[#f5efeb] uppercase font-semibold">
                ACCESS
              </h4>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#a39e93] mt-2 mb-6 pb-6 border-b border-[rgba(245,239,235,0.12)]">
                Entry and attendance
              </p>

              <div className="space-y-0 font-mono text-xs text-[#a39e93]">
                {plan.access.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-[rgba(245,239,235,0.06)]"
                  >
                    <span className="text-[#eae5d9]">{item.label}</span>
                    <div className="w-5 h-5 border border-[rgba(245,239,235,0.25)] flex items-center justify-center font-mono text-[10px] text-[#f5efeb]">
                      {item.value === "check" ? (
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      ) : item.value === "dash" ? (
                        <span className="text-[#635e57]">-</span>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: ENGAGEMENT */}
            <div className="md:pl-8 pt-8 md:pt-0">
              <h4 className="font-mono text-xs sm:text-sm tracking-wider text-[#f5efeb] uppercase font-semibold">
                ENGAGEMENT
              </h4>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#a39e93] mt-2 mb-6 pb-6 border-b border-[rgba(245,239,235,0.12)]">
                Content and participation
              </p>

              <div className="space-y-0 font-mono text-xs text-[#a39e93]">
                {plan.engagement.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-[rgba(245,239,235,0.06)]"
                  >
                    <span className="text-[#eae5d9]">{item.label}</span>
                    <div className="w-5 h-5 border border-[rgba(245,239,235,0.25)] flex items-center justify-center font-mono text-[10px] text-[#f5efeb]">
                      {item.value === "check" ? (
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      ) : item.value === "dash" ? (
                        <span className="text-[#635e57]">-</span>
                      ) : (
                        <span>{item.value}</span>
                      )}
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
