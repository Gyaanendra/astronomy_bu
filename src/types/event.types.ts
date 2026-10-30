export type EventCategory = "Workshop" | "Exhibition" | "Competition" | "Lecture" | "Observation";

export interface EventItem {
  id: string | number;
  slug: string;
  title: string;
  date: string; // ISO date YYYY-MM-DD
  time?: string;
  location: string;
  category: EventCategory;
  tenure: string; // e.g. "2025-2026", "2024-2025"
  description: string;
  guest?: string;
  image: string;
  photos?: string[];
  videoUrl?: string;
  registerLink?: string;
  registerLinkPending?: boolean;
  highlighted?: boolean;
  upcoming?: boolean;
}

