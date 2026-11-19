import { HeroSection } from "@/components/features/landing/hero-section";
import { StructureSection } from "@/components/features/landing/structure-section";
import { ObservatoryArchitecture } from "@/components/features/landing/observatory-architecture";
import { MembershipSection } from "@/components/features/landing/membership-section";
import { ArchiveSection } from "@/components/features/landing/archive-section";
import { JournalSection } from "@/components/features/landing/journal-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#1D1D1D]">
      {/* 01: Hero & Celestial Sanctuary */}
      <HeroSection />

      {/* 02: Structure — Pattern and Imposition / Absence and Disruption (About Us) */}
      <StructureSection />

      {/* 03: Dome Experience Narrative & Other Programs Gallery */}
      <ObservatoryArchitecture />

      {/* 04: Membership Tiers & Entitlements Matrix */}
      <MembershipSection />

      {/* 05: Archival Relics & Celestial Plates */}
      <ArchiveSection />

      {/* 06: Observation Journal & Field Gatherings */}
      <JournalSection />
    </div>
  );
}
