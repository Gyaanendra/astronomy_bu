import { Metadata } from "next";
import { DualHorizonCalendar } from "@/components/features/calendar/dual-horizon-calendar";

export const metadata: Metadata = {
  title: "Cosmic Calendar · AstronomyBU Ephemeris",
  description:
    "Dual-horizon astronomical calendar tracking global celestial events alongside Bennett University campus telescope stargazing sessions.",
};

export default function CalendarPage() {
  return <DualHorizonCalendar />;
}

