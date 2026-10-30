import { Eye, Sparkles, Orbit, BookMarked } from "lucide-react";

export function PillarsGrid() {
  const pillars = [
    {
      id: "01",
      title: "STORIES IN THE SKY",
      icon: Sparkles,
      description:
        "Constellations, folklore, and celestial narratives presented across cross-cultural history alongside rigorous theoretical physics.",
    },
    {
      id: "02",
      title: "IMMERSIVE VIEWING",
      icon: Eye,
      description:
        "Undergraduate observers gather at the Bennett cricket pavilion and rooftops under guided optical telemetry with 8-inch Dobsonians.",
    },
    {
      id: "03",
      title: "SEASONAL RHYTHM",
      icon: Orbit,
      description:
        "Tracking astronomical cycles — meteor shower peaks, equinox alignments, planetary oppositions, and lunar terminator illumination.",
    },
    {
      id: "04",
      title: "ARCHIVAL RESEARCH",
      icon: BookMarked,
      description:
        "Lectures on cosmology, dark matter topology with Dr. Pratyush Pranav, astrophotography calibrations, and student publications.",
    },
  ];

  return (
    <section className="w-full border-b border-[rgba(245,239,235,0.12)] bg-[#09090b] py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(245,239,235,0.12)] border border-[rgba(245,239,235,0.12)]">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="p-8 sm:p-10 flex flex-col justify-between hover:bg-[#111113] transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <Icon className="w-5 h-5 text-[#eae5d9] group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[10px] tracking-archival text-[#635e57]">
                      [{pillar.id}]
                    </span>
                  </div>
                  <h3 className="font-mono text-xs tracking-archival font-semibold text-[#f5efeb] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-[#a39e93] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[rgba(245,239,235,0.06)] font-mono text-[9px] tracking-widest text-[#635e57]">
                  DISCIPLINE // 0{pillar.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

