import { HeroSection } from "@/components/features/landing/hero-section";
import { PillarsGrid } from "@/components/features/landing/pillars-grid";
import { ProgramTable } from "@/components/features/landing/program-table";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Category 1: Hero & Celestial Sanctuary */}
      <HeroSection />

      {/* 4 Pillars: Stories, Immersive Viewing, Seasonal Rhythm, Archival Research */}
      <PillarsGrid />

      {/* Programs Tabular Showcase */}
      <ProgramTable />
    </div>
  );
}
