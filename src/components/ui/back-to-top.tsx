"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[rgba(245,239,235,0.18)] bg-[#141417]/90 text-[#f5efeb] backdrop-blur-md shadow-2xl transition-all duration-300 group cursor-pointer hover:border-[#c84b31] hover:bg-[#1a1a20] hover:scale-105 active:scale-95 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="w-2 h-2 rounded-full bg-[#c84b31] animate-pulse" />
      <ArrowUp className="w-3.5 h-3.5 text-[#c84b31] group-hover:-translate-y-0.5 transition-transform" />
      <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-[#a39e93] group-hover:text-[#f5efeb] transition-colors">
        TOP
      </span>
    </button>
  );
}

