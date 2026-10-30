import { Metadata } from "next";
import { EventsArchive } from "@/components/features/events/events-archive";

export const metadata: Metadata = {
  title: "Past Events & This Tenure · AstronomyBU Archive",
  description:
    "Chronological archive of Bennett University Astronomy Club events, astrophotography workshops, guest keynote lectures, and observation expeditions.",
};

export default function EventsPage() {
  return <EventsArchive />;
}

