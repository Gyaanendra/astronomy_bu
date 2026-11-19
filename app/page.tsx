import { HeroSection } from "@/components/features/landing/hero-section";
import { AboutSection } from "@/components/features/landing/about-section";
import { MembershipSection } from "@/components/features/landing/membership-section";
import { ArchiveSection } from "@/components/features/landing/archive-section";
import { JournalSection } from "@/components/features/landing/journal-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#1D1D1D]">
      {/* 01: Hero & Celestial Sanctuary */}
      <HeroSection />

      {/* 02: About Us — Narrative, Telemetry Stats, Affiliations & How We Operate */}
      <AboutSection />

      {/* 03: Membership Tiers & Entitlements Matrix */}
      <MembershipSection />

      {/* 04: Archival Relics & Celestial Plates */}
      <ArchiveSection />

      {/* 05: Observation Journal & Field Gatherings */}
      <JournalSection />
    </div>
  );
}
