import { TenureRecord } from "@/types/team.types";

export const legacyTenure: TenureRecord = {
  tenureYear: "2024-2025",
  tenureLabel: "Tenure 2024–2025 (Archive)",
  isCurrent: false,
  departments: [
    {
      name: "Leadership",
      description: "Pioneering the initial telescope observation sessions and campus club establishment.",
      members: [
        {
          id: "shardul-dhekane-24",
          name: "Shardul Dhekane [𝙎𝙋𝙄𝙍𝙄𝙏]",
          role: "President / Founding Lead",
          department: "Leadership",
          image: "/team/shardul_dhekane.webp",
          quote: "Establishing Bennett's first astronomical community under the northern skies.",
          socials: {
            instagram: "https://instagram.com/probably_its_spirit",
            github: "https://github.com/probablyitsspirit",
          },
          isHead: true,
        },
      ],
    },
    {
      name: "Tech & Research",
      description: "Initial telescope setup, star mapping runs, and workshop curricula.",
      members: [
        {
          id: "vivan-joshi-24",
          name: "Vivan Joshi",
          role: "Technical Lead",
          department: "Tech & Research",
          image: "/team/vivan_joshi.webp",
          quote: "Constructing observational pipelines and telescope alignment drills.",
          socials: {},
          isHead: true,
        },
      ],
    },
  ],
};

