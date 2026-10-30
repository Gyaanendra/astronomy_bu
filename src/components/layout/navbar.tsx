"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { getMoonPhase, MoonPhaseInfo } from "@/lib/astronomy";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moon, setMoon] = useState<MoonPhaseInfo | null>(null);

  useEffect(() => {
    setMoon(getMoonPhase(new Date()));
  }, []);

  const navLinks = [
    { label: "OVERVIEW", href: "/" },
    { label: "MEMBERS & HEADS", href: "/team" },
    { label: "EVENTS & TENURE", href: "/events" },
    { label: "COSMIC CALENDAR", href: "/calendar" },
    { label: "ARTICLES & LOGS", href: "/journal" },
  ];

  return (
    <nav className="w-full bg-[#09090b]/95 backdrop-blur-md border-b border-[rgba(245,239,235,0.08)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-7 h-9 flex-shrink-0 group-hover:scale-105 transition-transform">
            <Image
              src="/images/logo.png"
              alt="AstronomyBU Official Logo"
              fill
              className="object-contain brightness-110"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm tracking-archival font-bold text-[#f5efeb] whitespace-nowrap">
                ASTRONOMY<span className="text-[#a39e93]">BU</span>
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-[#635e57] tracking-wider whitespace-nowrap shrink-0">
                [28.46° N]
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#635e57] uppercase">
              Bennett Observatory
            </span>
          </div>
        </Link>

        {/* Desktop Links with generous spacing */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] tracking-archival transition-colors relative py-1.5 ${
                  isActive
                    ? "text-[#f5efeb] font-semibold"
                    : "text-[#a39e93] hover:text-[#f5efeb]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#eae5d9]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Info: Live Moon Phase + External Atlas */}
        <div className="hidden md:flex items-center gap-6">
          {moon && (
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#a39e93]">
              <span className="text-sm leading-none">{moon.icon}</span>
              <span className="tracking-wider uppercase text-[10px] text-[#f5efeb]">
                {moon.name} ({moon.illumination}%)
              </span>
            </div>
          )}

          <a
            href="https://stellarium-web.org/?lat=28.4595&lon=77.5046&projection=stereo&constellations=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[rgba(245,239,235,0.2)] text-[11px] font-mono tracking-archival text-[#f5efeb] hover:bg-[#eae5d9] hover:text-[#09090b] transition-all"
          >
            <span>STELLARIUM ATLAS</span>
            <ArrowUpRight className="w-3 h-3 text-[#a39e93]" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#f5efeb] hover:text-[#eae5d9]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b] border-b border-[rgba(245,239,235,0.12)] px-8 py-6 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-xs tracking-archival py-2 border-b border-[rgba(245,239,235,0.06)] ${
                  isActive ? "text-[#f5efeb] font-bold" : "text-[#a39e93]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {moon && (
            <div className="py-2 text-[11px] font-mono text-[#a39e93] flex items-center gap-2">
              <span>{moon.icon}</span>
              <span>{moon.name} ({moon.illumination}%)</span>
            </div>
          )}
          <a
            href="https://stellarium-web.org/?lat=28.4595&lon=77.5046&projection=stereo&constellations=true"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center py-2.5 px-4 bg-[#eae5d9] text-[#09090b] font-mono text-xs font-semibold uppercase tracking-wider"
          >
            Open Stellarium Atlas [↗]
          </a>
        </div>
      )}
    </nav>
  );
}
