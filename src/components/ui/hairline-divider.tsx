interface HairlineDividerProps {
  className?: string;
  withCrosshair?: boolean;
  label?: string;
}

export function HairlineDivider({ className = "", withCrosshair = false, label }: HairlineDividerProps) {
  return (
    <div className={`relative w-full flex items-center ${className}`}>
      <div className="flex-1 border-t border-[rgba(245,239,235,0.12)]" />
      {withCrosshair && (
        <span className="px-2 font-mono text-[10px] text-[#635e57] select-none">
          +
        </span>
      )}
      {label && (
        <span className="px-3 font-mono text-[10px] tracking-archival text-[#a39e93] uppercase">
          {label}
        </span>
      )}
      {(withCrosshair || label) && (
        <div className="flex-1 border-t border-[rgba(245,239,235,0.12)]" />
      )}
    </div>
  );
}

