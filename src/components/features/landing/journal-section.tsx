"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export function JournalSection({
  onOpenExplorer,
}: {
  onOpenExplorer?: (theme: string) => void;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (
        !containerRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      imageRefs.current.forEach((el) => {
        if (!el) return;
        const img = el.querySelector("img");

        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)", y: 40 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12, yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });

      rowRefs.current.forEach((row) => {
        if (!row) return;
        const textElements = row.querySelectorAll(".editorial-swipe-text");
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="editorial-showcase"
      className="relative w-full bg-[#FAF8F5] dark:bg-[#0C0D0E] text-[#141518] dark:text-[#F3F4F6] py-16 sm:py-24 border-y border-neutral-300 dark:border-neutral-800 transition-colors duration-500 font-serif selection:bg-[#FF7700] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-neutral-300 dark:border-neutral-800 text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7700]" />
            <span>CASE DOSSIERS // PROTOTYPE TO PRODUCTION</span>
          </div>
          <span className="hidden sm:inline">
            SMART INDIA HACKATHON RESEARCH JOURNAL
          </span>
        </div>

        {/* Headline */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-bold text-neutral-900 dark:text-white leading-[1.1] font-sans tracking-tight mb-4">
            How Hackathon Solutions <br />
            <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">
              Become Sovereign Systems.
            </span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            A documented archival record of collegiate engineering breakthroughs
            deployed across national space, power grid, and emergency rescue
            infrastructure.
          </p>
        </div>

        {/* 12-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4 border-t border-neutral-300 dark:border-neutral-800">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-16">
            {/* Item 1 */}
            <div
              ref={(el) => {
                rowRefs.current[0] = el;
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-14 border-b border-neutral-200 dark:border-neutral-800"
            >
              <div
                ref={(el) => {
                  imageRefs.current[0] = el;
                }}
                className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 will-change-transform shadow-xs"
              >
                <Image
                  src="/showcase/wind_turbine.jpg"
                  alt="Turbine telemetry over renewable energy site"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-between pr-2">
                <span className="editorial-swipe-text text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 mb-3 block">
                  RENEWABLE GRID • NTPC • SIH1602
                </span>
                <h3 className="editorial-swipe-text text-2xl sm:text-3xl font-serif italic text-neutral-900 dark:text-white leading-snug mb-4 font-normal">
                  Ut labore et quaerat: Real-time turbine vibration FFTs prevent
                  catastrophic grid trips.
                </h3>
                <p className="editorial-swipe-text text-sm font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                  Student finalists engineered an onboard neural telemetry unit
                  that merges blade vibration frequencies with LWIR thermal
                  imaging, delivering sub-100ms trip prevention across 14
                  central grid stations.
                </p>
                <div className="editorial-swipe-text">
                  <button
                    onClick={() => onOpenExplorer?.("Clean & Green Technology")}
                    className="inline-block px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                  >
                    READ MORE →
                  </button>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div
              ref={(el) => {
                rowRefs.current[1] = el;
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-14 border-b border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex flex-col justify-between order-2 md:order-1 pr-2">
                <span className="editorial-swipe-text text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 mb-3 block">
                  SPACE TECHNOLOGY • ISRO • SIH1601
                </span>
                <h3 className="editorial-swipe-text text-2xl sm:text-3xl font-serif italic text-neutral-900 dark:text-white leading-snug mb-4 font-normal">
                  Real Talk: Overcoming 20-minute telemetry lag with onboard
                  lunar FPGA SLAM.
                </h3>
                <p className="editorial-swipe-text text-sm font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                  Rather than waiting on manual Earth mission control commands,
                  the team deployed a radiation-tolerant edge vision pipeline
                  that maps stereo lunar craters autonomously at 3.5x standard
                  speeds.
                </p>
                <div className="editorial-swipe-text">
                  <button
                    onClick={() => onOpenExplorer?.("Space Technology (ISRO)")}
                    className="inline-block px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                  >
                    READ MORE →
                  </button>
                </div>
              </div>
              <div
                ref={(el) => {
                  imageRefs.current[1] = el;
                }}
                className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 will-change-transform shadow-xs order-1 md:order-2"
              >
                <Image
                  src="/showcase/space_rover.jpg"
                  alt="Autonomous lunar exploration rover"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Item 3 */}
            <div
              ref={(el) => {
                rowRefs.current[2] = el;
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-14 border-b border-neutral-200 dark:border-neutral-800"
            >
              <div
                ref={(el) => {
                  imageRefs.current[2] = el;
                }}
                className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 will-change-transform shadow-xs"
              >
                <Image
                  src="/showcase/rescue_drone.jpg"
                  alt="Search and rescue quadcopter over mountain valley"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-between pr-2">
                <span className="editorial-swipe-text text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 mb-3 block">
                  DISASTER RISK • NDMA • SIH1608
                </span>
                <h3 className="editorial-swipe-text text-2xl sm:text-3xl font-serif italic text-neutral-900 dark:text-white leading-snug mb-4 font-normal">
                  Alpine Mesh Relays: Penetrating avalanche blind zones in
                  under 18 minutes.
                </h3>
                <p className="editorial-swipe-text text-sm font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                  When mountain roads sever communication lines, this autonomous
                  swarm of tetherless UAVs deploys ad-hoc Wi-Fi relays and
                  micro-radar life detectors to pinpoint victims during the
                  golden survival window.
                </p>
                <div className="editorial-swipe-text">
                  <button
                    onClick={() => onOpenExplorer?.("Robotics and Drones")}
                    className="inline-block px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                  >
                    READ MORE →
                  </button>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between pt-6 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
              <button
                onClick={() => {
                  const el = document.getElementById("arena");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← THE DUAL ARENA
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("themes");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer"
              >
                EXPLORE ALL 16 ARENAS →
              </button>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l border-neutral-300 dark:border-neutral-800 flex flex-col space-y-12">
            <div>
              <div className="pb-3 mb-6 border-b border-neutral-300 dark:border-neutral-800">
                <h4 className="text-2xl sm:text-3xl font-serif italic font-normal text-neutral-900 dark:text-white">
                  Read our Story
                </h4>
              </div>
              <div className="space-y-4 font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                <p>
                  Smart India Hackathon was conceived not as a collegiate coding
                  contest, but as an open-innovation sovereign mechanism where
                  university labs solve hard public problems.
                </p>
                <p>
                  Across 75 premier nodal centers, teams author operational code
                  directly with directors and scientists from ISRO, DRDO, and
                  central departments—turning raw academic talent into
                  mission-critical infrastructure.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-xs border border-neutral-300/60 dark:border-neutral-700/60">
              <Image
                src="/showcase/space_rover.jpg"
                alt="Engineering prototype in laboratory"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 uppercase tracking-widest text-center">
                CHANDRAYAAN FIELD TELEMETRY BENCHMARK
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-6">
                LINKS &amp; ARCHIVES:
              </span>
              <ul className="space-y-6">
                <li>
                  <a href="#themes" className="flex items-baseline group">
                    <span className="text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 mr-4 group-hover:text-[#FF7700] transition-colors">
                      01
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900 dark:text-white group-hover:text-[#FF7700] transition-colors flex items-center gap-1">
                        <span>MINISTRY PROBLEM STATEMENTS</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[11px] font-sans text-neutral-500 font-normal">
                        Browse all 3,158 live sovereign challenges
                      </span>
                    </div>
                  </a>
                </li>
                <li className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <a href="#journey" className="flex items-baseline group">
                    <span className="text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 mr-4 group-hover:text-[#FF7700] transition-colors">
                      02
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900 dark:text-white group-hover:text-[#FF7700] transition-colors flex items-center gap-1">
                        <span>NATIONAL PROCESS ROADMAP</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[11px] font-sans text-neutral-500 font-normal">
                        6-phase journey from campus to Grand Finale
                      </span>
                    </div>
                  </a>
                </li>
                <li className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <a href="#radar" className="flex items-baseline group">
                    <span className="text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 mr-4 group-hover:text-[#FF7700] transition-colors">
                      03
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900 dark:text-white group-hover:text-[#FF7700] transition-colors flex items-center gap-1">
                        <span>75+ NODAL CENTERS RADAR</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[11px] font-sans text-neutral-500 font-normal">
                        IITs, NITs, and IIITs hosting synchronized cohorts
                      </span>
                    </div>
                  </a>
                </li>
                <li className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <a href="#archive" className="flex items-baseline group">
                    <span className="text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 mr-4 group-hover:text-[#FF7700] transition-colors">
                      04
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-900 dark:text-white group-hover:text-[#FF7700] transition-colors flex items-center gap-1">
                        <span>PAST EDITIONS ARCHIVE (2017-2025)</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[11px] font-sans text-neutral-500 font-normal">
                        150+ funded startups and national IP history
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
