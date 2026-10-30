import { Metadata } from "next";
import { JournalShowcase } from "@/components/features/journal/journal-showcase";

export const metadata: Metadata = {
  title: "Blogs & Articles · AstronomyBU Journal",
  description:
    "Editorial research essays, astrophotography guides, cosmology lecture summaries, and sky observation notes from Bennett University Astronomy Club.",
};

export default function JournalPage() {
  return <JournalShowcase />;
}

