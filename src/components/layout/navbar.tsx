"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "OVERVIEW", href: "/" },
    { label: "MEMBERS & HEADS", href: "/team" },
    { label: "EVENTS & TENURES", href: "/events" },
    { label: "JOURNAL", href: "/journal" },
    { label: "COSMIC CALENDAR", href: "/calendar" },
  ];

  return (
    <>
      <header className="w-full bg-[#1D1D1D] border-b border-[rgba(245,239,235,0.08)] relative z-40">
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 h-20 sm:h-24 flex items-center justify-between">
          {/* Left: Star Glyph + Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-editorial-serif text-2xl sm:text-3xl text-[#f5efeb] select-none leading-none">
              ✱
            </span>
            <div className="flex flex-col">
              <span className="font-editorial-serif italic text-2xl sm:text-3xl tracking-tight text-[#f5efeb] group-hover:text-white transition-colors leading-none">
                Astronomy<span className="font-sans font-normal text-xs tracking-[0.25em] text-[#a39e93] uppercase ml-1.5 align-middle">BU</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#8a847a] uppercase mt-0.5">
                Bennett University Observatory
              </span>
            </div>
          </Link>

          {/* Center: Quiet, Spaced Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-9">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-mono text-[11px] xl:text-xs tracking-[0.2em] uppercase py-1.5 relative transition-all duration-200 ${
                    isActive
                      ? "text-[#f5efeb] font-semibold"
                      : "text-[#a39e93] hover:text-[#f5efeb]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#eae5d9] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Station Telemetry & Contacts Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden xl:inline font-mono text-[10px] tracking-widest text-[#8a847a]">
              28.45° N · 77.50° E
            </span>

            <a
              href="#newsletter"
              className="px-5 sm:px-6 py-2.5 bg-[#eae5d9] text-[#1D1D1D] font-mono text-xs tracking-archival font-semibold uppercase hover:bg-white transition-colors"
            >
              CONTACTS
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation drawer"
              className="lg:hidden p-2 text-[#f5efeb] hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Archival Navigation Drawer for Mobile & Tablet */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#1D1D1D]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-14 lg:p-20 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[rgba(245,239,235,0.12)] pb-6">
            <div className="flex items-center gap-3">
              <span className="font-editorial-serif text-2xl text-[#f5efeb]">✱</span>
              <span className="font-editorial-serif italic text-2xl text-[#f5efeb]">AstronomyBU</span>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close drawer"
              className="p-2 border border-[rgba(245,239,235,0.2)] text-[#f5efeb] hover:bg-[#18181b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-auto py-8 flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-archival text-[#8a847a] uppercase">
              5 Major Observatory Categories
            </span>
            <ul className="flex flex-col gap-5">
              {navLinks.map((link, idx) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-4 text-2xl sm:text-4xl font-editorial-serif italic transition-colors ${
                        isActive
                          ? "text-[#f5efeb] font-semibold"
                          : "text-[#a39e93] hover:text-[#f5efeb]"
                      }`}
                    >
                      <span className="font-mono text-xs text-[#635e57]">[0{idx + 1}]</span>
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-60" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-[rgba(245,239,235,0.1)] pt-6 flex flex-col sm:flex-row justify-between gap-4 font-mono text-[11px] text-[#8a847a]">
            <span>STATION: 28.4595° N, 77.5046° E · BENNETT UNIVERSITY</span>
            <span>GREATER NOIDA · ELEVATION 208M MSL</span>
          </div>
        </div>
      )}
    </>
  );
}
