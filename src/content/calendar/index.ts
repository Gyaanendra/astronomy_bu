import { globalCelestialEvents } from "./global-events";
import { bennettCampusEvents } from "./bennett-events";
import { CelestialEvent } from "@/types/calendar.types";

export const allCalendarEvents: CelestialEvent[] = [
  ...globalCelestialEvents,
  ...bennettCampusEvents,
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export { globalCelestialEvents, bennettCampusEvents };

