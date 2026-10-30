import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "outline" | "solid" | "bracket" | "accent";
  className?: string;
}

export function Badge({ children, variant = "bracket", className = "" }: BadgeProps) {
  if (variant === "bracket") {
    return (
      <span className={`font-mono text-[11px] tracking-wider text-[#a39e93] ${className}`}>
        [{children}]
      </span>
    );
  }

  if (variant === "solid") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 font-mono text-[10px] tracking-wider bg-[#eae5d9] text-[#09090b] font-semibold uppercase ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === "accent") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 font-mono text-[10px] tracking-wider border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] font-medium uppercase ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-[10px] tracking-wider border border-[rgba(245,239,235,0.18)] text-[#f5efeb] uppercase ${className}`}
    >
      {children}
    </span>
  );
}

