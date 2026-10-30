export type CalendarScope = "global" | "bennett";

export interface CelestialEvent {
  id: string;
  title: string;
  date: string; // ISO date YYYY-MM-DD
  time?: string;
  scope: CalendarScope; // "global" or "bennett"
  category: "Meteor Shower" | "Eclipse" | "Planetary" | "Campus Stargazing" | "Lecture" | "Equinox/Solstice";
  description: string;
  visibilityOrLocation: string; // e.g. "Bennett Cricket Ground" or "Visible across Northern Hemisphere"
  peakTime?: string;
  optimalEquipment?: string; // e.g. "Naked Eye / Binoculars", "8-inch Dobsonian Telescope"
  highlighted?: boolean;
}

