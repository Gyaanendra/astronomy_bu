import { Metadata } from "next";
import { TeamShowcase } from "@/components/features/team/team-showcase";

export const metadata: Metadata = {
  title: "Members & Heads · AstronomyBU Archive",
  description:
    "The executive leadership, department heads, and members of Bennett University Astronomy Club across past and present tenures.",
};

export default function TeamPage() {
  return <TeamShowcase />;
}

