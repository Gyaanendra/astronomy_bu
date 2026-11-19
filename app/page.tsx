import { HeroSection } from "@/components/features/landing/hero-section";
import { HeroTransition } from "@/components/features/landing/hero-transition";
import { StructureSection } from "@/components/features/landing/structure-section";
import { ObservatoryArchitecture } from "@/components/features/landing/observatory-architecture";
import { ProgramsBento } from "@/components/features/landing/programs-bento";
import { MembershipSection } from "@/components/features/landing/membership-section";
import { ArchiveSection } from "@/components/features/landing/archive-section";
import { JournalSection } from "@/components/features/landing/journal-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#1D1D1D]">
      {/* 01: Hero & Celestial Sanctuary (Pinterest Image 2) */}
      <HeroSection />

      {/* Transitional Ephemeris Quote & Milky Way Galactic Stream */}
      <HeroTransition />

      {/* 02: Structure — Pattern and Imposition / Absence and Disruption (Pinterest Image 1 Top) */}
      <StructureSection />

      {/* 03: Dome Experience Narrative & Other Programs Gallery (Pinterest Image 1 Middle & Bottom) */}
      <ObservatoryArchitecture />

      {/* 04: Curated Programs 4-Tier Asymmetric Bento Catalog */}
      <ProgramsBento />

      {/* 05: Membership Tiers & Entitlements Matrix */}
      <MembershipSection />

      {/* 06: Archival Relics & Celestial Plates */}
      <ArchiveSection />

      {/* 07: Observation Journal & Field Gatherings */}
      <JournalSection />
    </div>
  );
}
