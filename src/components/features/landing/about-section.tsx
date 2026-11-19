import Image from "next/image";

interface StatItem {
  value: string;
  label: string;
  detail: string;
}

const STATS: StatItem[] = [
  {
    value: "1,200+",
    label: "Active Members & Alumni",
    detail: "Across engineering, research, and science batches",
  },
  {
    value: "50+",
    label: "Observational Expeditions",
    detail: "Bennett Cricket Ground and Himalayan dark-sky reserves",
  },
  {
    value: "8-INCH",
    label: "Dobsonian Optical Rigs",
    detail: "Motorized tracking mounts & CMOS planetary sensors",
  },
  {
    value: "6",
    label: "Specialized Divisions",
    detail: "Astrophotography, Tech, PR, Research, Web, Content",
  },
];

const AFFILIATIONS = [
  "BENNETT UNIVERSITY",
  "TIMES OF INDIA GROUP",
  "IUCAA SKY NETWORK",
  "ISRO SPACE TUTOR",
  "DELHI-NCR ASTRO AMATEURS",
  "CELESTIAL CARTOGRAPHY LAB",
];

interface MethodologyStep {
  step: string;
  title: string;
  description: string;
}

const METHODOLOGY: MethodologyStep[] = [
  {
    step: "01",
    title: "Field Telemetry & Apparatus Calibration",
    description:
      "Deploying 8-inch Dobsonian optical rigs and calibrating equatorial mounts for deep-sky planetary, lunar terminator, and solar observation.",
  },
  {
    step: "02",
    title: "Sensor Astrophotography & Exposure Stacking",
    description:
      "Capturing deep-space nebulae and star clusters through low-light CMOS sensor calibration, long-exposure tracking, and dark-frame subtraction.",
  },
  {
    step: "03",
    title: "Astrophysics Research & Colloquia",
    description:
      "Hosting technical inquiry, celestial mechanics modeling, and guest keynote lectures led by astrophysicists and visiting scholars.",
  },
  {
    step: "04",
    title: "Archival Cartography & Pattern Analysis",
    description:
      "Investigating historic celestial charts, Babylonian star catalogues, and how diverse civilizations impose structure upon distance.",
  },
  {
    step: "05",
    title: "Public Expeditions & Dark-Sky Tours",
    description:
      "Conducting campus-wide celestial observations at Bennett Cricket Ground and guided expeditions to high-altitude Himalayan dark-sky sanctuaries.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#1D1D1D] text-[#f5efeb] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-24"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* ============================================================== */}
        {/* 1. ABOUT US HEADER & STATS (Reference Top Section)              */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <span className="font-mono text-xs tracking-archival text-[#8a847a] uppercase mb-4 block">
              EST. BENNETT UNIVERSITY // OBSERVATORY COLLECTIVE
            </span>

            <h2 className="font-editorial-serif italic text-5xl sm:text-7xl xl:text-8xl text-[#f5efeb] tracking-tight leading-[0.95] mb-6">
              ABOUT US
            </h2>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed max-w-xl">
              <p>
                AstronomyBU is Bennett University&apos;s official astronomical society and space observation collective. Operating under the School of Computer Science & Engineering, we unite passionate skygazers, astrophotographers, and researchers to explore deep space.
              </p>
              <p>
                Under the advisory of Faculty Advisor Shardul Dhekane [𝙎𝙋𝙄𝙍𝙄𝙏] and executive leads Kaavya Kumar Yadav & Abhimanyu Narang, our telemetry expeditions explore celestial mechanics from campus telescopes to remote Himalayan dark-sky sanctuaries.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Impact Metrics in 2x2 Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 border-t border-[rgba(245,239,235,0.12)] pt-8 lg:border-t-0 lg:pt-0">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-editorial-serif italic text-5xl sm:text-6xl xl:text-7xl text-[#eae5d9] leading-none mb-2">
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs text-[#f5efeb] uppercase tracking-wider font-semibold mb-1">
                    {stat.label}
                  </span>
                  <span className="font-sans text-[11px] text-[#8a847a] leading-relaxed">
                    {stat.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. INSTITUTIONAL LOGO & AFFILIATION STRIP (Reference Logo Bar)  */}
        {/* ============================================================== */}
        <div className="border-t border-b border-[rgba(245,239,235,0.12)] py-8 my-16 sm:my-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center text-center">
            {AFFILIATIONS.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center gap-2 text-[#8a847a] hover:text-[#f5efeb] transition-colors"
              >
                <span className="text-[10px] text-[#eae5d9]">✦</span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. HOW WE WORK / METHODOLOGY (Reference Bottom Section)         */}
        {/* ============================================================== */}
        <div className="pt-4">
          <div className="mb-12 sm:mb-16">
            <h3 className="font-editorial-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#f5efeb] tracking-tight mb-3">
              HOW WE OPERATE
            </h3>
            <p className="font-mono text-xs xl:text-[13px] tracking-wide text-[#a39e93] leading-relaxed max-w-xl">
              We structure our engagement with the night sky across five distinct observational phases.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
            {/* Left Column: Portrait Eclipse Photograph with Floating Circular Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[3/4.2] bg-[#111113] overflow-hidden shadow-2xl">
                <Image
                  src="/images/assets/structure-eclipse.jpg"
                  alt="Total solar eclipse coronal halo over volumetric cloudscape"
                  fill
                  priority
                  className="object-cover filter contrast-110 brightness-95"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              {/* Floating Circular Badge (Matching Russian circular badge in reference) */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#eae5d9] text-[#1D1D1D] p-3 flex flex-col items-center justify-center text-center font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-tight shadow-2xl absolute -top-4 -right-4 sm:-top-5 sm:-right-5 rotate-6 pointer-events-none">
                <span>BENNETT</span>
                <span>OBSERVATORY</span>
                <span className="text-[8px] text-[#52525b] mt-0.5">TELEMETRY</span>
              </div>
            </div>

            {/* Right Column: 5 Process Rows with Badges */}
            <div className="lg:col-span-7 divide-y divide-[rgba(245,239,235,0.1)] border-b border-[rgba(245,239,235,0.1)]">
              {METHODOLOGY.map((step) => (
                <div
                  key={step.step}
                  className="py-5 sm:py-6 flex items-start gap-5 sm:gap-6 group hover:bg-[rgba(255,255,255,0.02)] transition-colors px-2 sm:px-4"
                >
                  {/* Circular Step Badge */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[rgba(245,239,235,0.25)] bg-[#111113] flex-shrink-0 flex items-center justify-center font-mono text-xs sm:text-sm text-[#eae5d9] font-semibold group-hover:border-[#eae5d9] transition-colors">
                    {step.step}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h4 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#f5efeb] uppercase mb-1.5 group-hover:text-[#eae5d9] transition-colors">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-[#a39e93] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
