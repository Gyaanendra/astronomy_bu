import { JournalArticle } from "@/types/journal.types";

export const journalArticles: JournalArticle[] = [
  {
    id: "bortle-astrophotography-greater-noida",
    slug: "battling-bortle-6-astrophotography",
    title: "The Anatomy of a Deep-Sky Exposure",
    subtitle: "Techniques for narrowband isolation and star calibration under suburban light pollution",
    date: "2026-02-14",
    author: {
      name: "Dhruv Kukreja",
      role: "Head of Research",
    },
    category: "Astrophotography",
    readTime: "7 min read",
    coverImage: "/cool2.png",
    excerpt:
      "Capturing nebulosity from Bennett University requires counter-intuitive exposure strategies. In this field note, we break down dual-band Ha/OIII filter curves, sub-exposure length calculations, and background extraction workflows.",
    tags: ["Astrophotography", "Optics", "Field Notes", "Bennett Skies"],
    content: [
      "Greater Noida presents a formidable challenge for astronomical observation: an estimated Bortle 6.5 sky with moderate skyglow from industrial corridors and campus lighting. Yet, modern CMOS sensors combined with dual-narrowband filtration have revolutionized what an undergraduate astronomy club can capture from a college cricket ground.",
      "By isolating the 656.3nm Hydrogen-Alpha line and the 500.7nm Oxygen-III emission lines, we suppress urban sodium and LED wavelength emissions by over 92%. A typical 120-second exposure at f/4.5 yields crisp nebulosity that would otherwise remain submerged in thermal noise.",
      "The critical step remains calibration: shooting dark frames matched to ambient sensor temperature, alongside synthetic flat frames taken with an electroluminescent panel at dusk. In our upcoming workshop, every attendee will process a raw FITS stack collected during our winter Orion campaign.",
    ],
  },
  {
    id: "living-cosmic-archive",
    slug: "living-cosmic-archive-constellations",
    title: "Constellations as Cultural Architecture",
    subtitle: "Why human civilizations project narratives onto unlinked coordinate matrices",
    date: "2026-01-28",
    author: {
      name: "Kanak Rana",
      role: "Head of Content",
    },
    category: "Cosmology",
    readTime: "5 min read",
    coverImage: "/cool1.png",
    excerpt:
      "Constellations are not inherent to the sky — they are constructed, drawn between distant points to create continuity where none exists. Across cultures, these patterns have served as tools for navigation, storytelling, and existential orientation.",
    tags: ["Philosophy", "Constellations", "Archeoastronomy", "Culture"],
    content: [
      "When we look up at the constellation Orion from the Bennett courtyard, we perceive a unified hunter frozen in celestial stride. In reality, the stars comprising this figure share virtually no physical intimacy. Betelgeuse burns at approximately 640 light-years from Earth, while Rigel blazes over 860 light-years away in a distinct stellar nursery.",
      "The constellation is an optical coincidence — a two-dimensional projection of a three-dimensional stellar ocean. Yet for thousands of years, civilizations across Mesopotamia, Vedic India, and the indigenous Americas connected these arbitrary sparks to encode seasonal calendars, navigational highways, and moral mythologies.",
      "At AstronomyBU, we view astronomical observation not merely as an extraction of spectral data, but as a continuation of this ancient dialogue. When a student first aligns a telescope with the Pleiades, they step into a living archive shared by every ancestor who ever wondered what lies beyond the dark.",
    ],
  },
  {
    id: "cosmology-dr-pranav-debrief",
    slug: "cosmology-dr-pratyush-pranav-inquiry",
    title: "Cosmological Inquiries with Dr. Pratyush Pranav",
    subtitle: "Reflections from Episode 1: Space-time geometry, topological data analysis, and the early cosmos",
    date: "2025-11-25",
    author: {
      name: "Vivan Joshi",
      role: "Head of Tech",
    },
    category: "Research",
    readTime: "8 min read",
    coverImage: "https://i.ibb.co/4RM5fywM/Cosmology-Lecture2-Page-1.png",
    excerpt:
      "Dr. Pratyush Pranav visited AstronomyBU to discuss how the universe's large-scale structure mirrors topological patterns. We synthesize key mathematical takeaways from his seminar.",
    tags: ["Cosmology", "Theoretical Physics", "Topology", "Dr. Pranav"],
    content: [
      "In November 2025, our club packed NLH 101 for a special address by Dr. Pratyush Pranav, Assistant Dean at the School of AI. With a background bridging theoretical astrophysics and computational mathematics, Dr. Pranav guided us through the cosmic microwave background's non-Gaussian signatures.",
      "Using Betti numbers and persistent homology, Dr. Pranav demonstrated how cosmologists detect filaments and cosmic voids in galactic surveys like SDSS. The distribution of matter across billions of light-years is not random; it encodes the acoustic oscillations of the primordial plasma in the first 380,000 years after the Big Bang.",
      "For student researchers, the seminar opened new avenues: using machine learning to classify gravitational lens candidates and applying spatial graph theory to stellar clusters.",
    ],
  },
  {
    id: "russian-cosmonauts-reflections",
    slug: "russian-cosmonauts-diplomatic-mission",
    title: "Dispatches from the Russian House: Meeting Orbital Cosmonauts",
    subtitle: "First-hand debriefs on long-duration spaceflight, isolation psychological regimes, and EVA operations",
    date: "2025-04-20",
    author: {
      name: "Shardul Dhekane [𝙎𝙋𝙄𝙍𝙄𝙏]",
      role: "Advisor",
    },
    category: "Field Notes",
    readTime: "6 min read",
    coverImage: "/events/russian-cosmonauts-delhi-2025/photo1.jpeg",
    excerpt:
      "A select delegation of AstronomyBU students traveled to the Russian House in New Delhi to engage in a closed-door symposium with active cosmonauts. Here are their mission insights.",
    tags: ["Space Exploration", "Cosmonauts", "Diplomacy", "Human Spaceflight"],
    content: [
      "On April 11, 2025, club members had the privilege of attending an exclusive space exploration conference at the Russian House in New Delhi. Listening to veteran cosmonauts recount 180 days aboard the International Space Station transformed our textbook knowledge into tangible reality.",
      "The cosmonauts detailed the physiological rigor of extravehicular activities (spacewalks) — the relentless pressure against the Orlan suit joints, the sensory isolation of the void, and the blinding beauty of orbital sunrise occurring sixteen times every twenty-four hours.",
      "Their advice to Bennett engineers was unanimous: master fundamentals, cultivate mental equilibrium under high-stress anomalies, and never lose sight of the cooperative spirit that transcends geopolitical boundaries in low Earth orbit.",
    ],
  },
];

