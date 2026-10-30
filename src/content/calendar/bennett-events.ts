import { CelestialEvent } from "@/types/calendar.types";

export const bennettCampusEvents: CelestialEvent[] = [
  {
    id: "bu-deep-sky-night",
    title: "Orion Nebula & Pleiades Deep-Sky Stargazing",
    date: "2026-11-12",
    time: "20:30 - 23:30 IST",
    scope: "bennett",
    category: "Campus Stargazing",
    description:
      "Public telescope observation night at the Bennett cricket pavilion. We deploy club 8-inch Dobsonians to resolve the Trapezium cluster within M42 Orion Nebula, the ghostly reflection nebulosity of M45, and the craters along the lunar terminator.",
    visibilityOrLocation: "Bennett University Cricket Pavilion (South-West corner)",
    peakTime: "21:30 IST",
    optimalEquipment: "Club Dobsonians provided / Bring red flashlight only",
    highlighted: true,
  },
  {
    id: "bu-cosmology-ep3",
    title: "Cosmology 101: Episode 3 — Primordial Gravitational Waves",
    date: "2026-11-20",
    time: "18:00 - 19:30 IST",
    scope: "bennett",
    category: "Lecture",
    description:
      "Interactive physics session in NLH 101 dissecting the cosmic microwave background (CMB) polarization, B-mode signatures, and the physics of early cosmic inflation with guest faculty.",
    visibilityOrLocation: "NLH 101 (New Lecture Hall), Bennett Campus",
    optimalEquipment: "Notepad & Scientific Curiosity",
    highlighted: true,
  },
  {
    id: "bu-lunar-transit",
    title: "Lunar Terminator High-Magnification Mapping",
    date: "2026-10-18",
    time: "19:00 - 21:30 IST",
    scope: "bennett",
    category: "Campus Stargazing",
    description:
      "High-power lunar observation focusing on the shadow gradients across Tycho, Copernicus, and Montes Apenninus during First Quarter illumination phase.",
    visibilityOrLocation: "Academic Block A Terrace",
    optimalEquipment: "High-magnification lunar filters & Barlow lenses provided",
  },
  {
    id: "bu-astrophotography-bootcamp",
    title: "Field Astrophotography Bootcamp 5.0",
    date: "2026-12-05",
    time: "21:00 - 01:00 IST",
    scope: "bennett",
    category: "Campus Stargazing",
    description:
      "Overnight deep-sky tracking and tracking mount calibration drill. Learn polar alignment in Bortle 6.5 Greater Noida skies and automated intervalometer shooting routines.",
    visibilityOrLocation: "011 NCA Ground & Open Field",
    optimalEquipment: "DSLR / Mirrorless Camera, Tripod, Fast Lens (f/2.8 or lower)",
    highlighted: true,
  },
];

