"use client";

import { useEffect, useState } from "react";
import { getMoonPhase, getLocalSiderealTime, MoonPhaseInfo } from "@/lib/astronomy";
import { BENNETT_COORDINATES } from "@/lib/constants";

export function StatusTicker() {
  const [moon, setMoon] = useState<MoonPhaseInfo | null>(null);
  const [siderealTime, setSiderealTime] = useState<string>("");
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setMoon(getMoonPhase(now));
      setSiderealTime(getLocalSiderealTime(now, BENNETT_COORDINATES.longitude));
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#050507] border-b border-[rgba(245,239,235,0.08)] py-1.5 px-4 sm:px-8 text-[11px] font-mono tracking-wide-mono text-[#a39e93] overflow-x-auto whitespace-nowrap">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#f5efeb] font-semibold">OBSERVATORY HORIZON</span>
          </div>
          <span className="text-[#635e57]">/</span>
          <span>{BENNETT_COORDINATES.name.toUpperCase()}</span>
          <span className="text-[#635e57]">/</span>
          <span className="text-[#e8dfc8]">28.4595° N, 77.5046° E</span>
          <span className="hidden md:inline text-[#635e57]">/</span>
          <span className="hidden md:inline text-[#a39e93]">BORTLE 6.5</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{moon ? moon.icon : "🌑"}</span>
            <span className="text-[#f5efeb]">{moon ? `${moon.name.toUpperCase()} (${moon.illumination}%)` : "LUNAR SYNC..."}</span>
          </div>
          <span className="text-[#635e57]">/</span>
          <span className="text-[#a39e93]">{localTime || "--:--:-- IST"}</span>
          <span className="hidden sm:inline text-[#635e57]">/</span>
          <span className="hidden sm:inline text-[#e8dfc8]">{siderealTime || "--:--:-- LST"}</span>
        </div>
      </div>
    </div>
  );
}

