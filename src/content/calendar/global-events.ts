import { CelestialEvent } from "@/types/calendar.types";

export const globalCelestialEvents: CelestialEvent[] = [
  {
    id: "perseids-2026",
    title: "Perseids Meteor Shower Peak",
    date: "2026-08-12",
    time: "23:00 - 04:30 UTC",
    scope: "global",
    category: "Meteor Shower",
    description:
      "One of the brightest and most dependable meteor showers of the year, produced by Comet Swift-Tuttle. Expect up to 100 fast, luminous meteors per hour with persistent ionization trails under moon-free dark skies.",
    visibilityOrLocation: "Global Northern Hemisphere",
    peakTime: "02:00 - 04:00 Local Time",
    optimalEquipment: "Naked Eye / Reclining Chair / Dark Sky Horizon",
    highlighted: true,
  },
  {
    id: "saturn-opposition-2026",
    title: "Saturn at Opposition & Ring Edge-On Aspect",
    date: "2026-09-21",
    time: "All Night",
    scope: "global",
    category: "Planetary",
    description:
      "The ringed planet reaches its closest approach to Earth, with its face fully illuminated by the Sun. Uniquely in 2025–2026, Saturn's majestic rings appear nearly edge-on from Earth's line of sight, creating a rare razor-thin spectacle.",
    visibilityOrLocation: "Visible globally all night in Aquarius constellation",
    peakTime: "Midnight culmination",
    optimalEquipment: "4-inch or larger telescope (100x+ magnification)",
    highlighted: true,
  },
  {
    id: "geminids-2026",
    title: "Geminids Meteor Shower Peak",
    date: "2026-12-14",
    time: "21:00 - 05:00 UTC",
    scope: "global",
    category: "Meteor Shower",
    description:
      "The undisputed king of the meteor showers, originating from asteroid 3200 Phaethon. Capable of producing up to 120 multicolored, slow-moving fireballs per hour through clear winter atmosphere.",
    visibilityOrLocation: "Both Hemispheres (Best in Northern skies)",
    peakTime: "01:00 - 03:30 Local Time",
    optimalEquipment: "Naked eye with warm observation layers",
    highlighted: true,
  },
  {
    id: "vernal-equinox-2026",
    title: "Vernal (Spring) Equinox",
    date: "2026-03-20",
    time: "14:16 UTC",
    scope: "global",
    category: "Equinox/Solstice",
    description:
      "The Sun crosses the celestial equator northward. Day and night are of virtually equal duration across the globe, marking the official beginning of astronomical spring in the Northern Hemisphere.",
    visibilityOrLocation: "Global",
    optimalEquipment: "Sun dial / Meridian transit measurement",
  },
  {
    id: "total-lunar-eclipse-2026",
    title: "Blood Moon: Total Lunar Eclipse",
    date: "2026-03-03",
    time: "11:34 UTC",
    scope: "global",
    category: "Eclipse",
    description:
      "The Moon passes entirely through Earth's umbral shadow, illuminating the lunar surface with refractive deep copper-red sunlight scattered through Earth's atmosphere.",
    visibilityOrLocation: "Asia, Australia, Pacific, Western Americas",
    peakTime: "Greatest Eclipse: 11:33 UTC",
    optimalEquipment: "Binoculars / Telescopes / Telephoto lens",
    highlighted: true,
  },
  {
    id: "jupiter-opposition-2026",
    title: "Jupiter at Opposition",
    date: "2026-01-10",
    time: "Sunset to Sunrise",
    scope: "global",
    category: "Planetary",
    description:
      "Jupiter shines at its maximum apparent diameter and brightness (-2.7 mag). The Great Red Spot and the dance of the four Galilean moons (Io, Europa, Ganymede, Callisto) are easily resolved.",
    visibilityOrLocation: "Visible all night globally in Gemini constellation",
    optimalEquipment: "Any small telescope or 10x50 binoculars",
  },
];

