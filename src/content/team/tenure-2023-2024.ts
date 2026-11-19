import { TenureRecord } from "@/types/team.types";

export const foundingTenure: TenureRecord = {
  tenureYear: "2023-2024",
  tenureLabel: "Tenure 2023–2024 (Inaugural)",
  isCurrent: false,
  departments: [
    {
      name: "Leadership",
      description: "Founding council that established the Bennett University Observatory and constitution.",
      members: [
        {
          id: "shardul-dhekane-23",
          name: "Shardul Dhekane [𝙎𝙋𝙄𝙍𝙄𝙏]",
          role: "Founding Convener",
          department: "Leadership",
          image: "/team/shardul_dhekane.webp",
          quote: "Constructing an altar for stargazers where once there was only silent sky.",
          socials: {
            instagram: "https://instagram.com/probably_its_spirit",
            github: "https://github.com/probablyitsspirit",
          },
          isHead: true,
        },
        {
          id: "samar-verma-23",
          name: "Samar Verma",
          role: "Co-Convener",
          department: "Leadership",
          image: "/team/IMG_8751_anonymous.webp",
          quote: "To observe the heavens is to humble oneself before the infinite.",
          socials: {
            linkedin: "https://linkedin.com",
          },
          isHead: true,
        },
      ],
    },
    {
      name: "Tech & Research",
      description: "Commissioning first 8-inch Dobsonian telescopes and establishing nocturnal observing logs.",
      members: [
        {
          id: "aarav-sharma-23",
          name: "Aarav Sharma",
          role: "Lead Optical Engineer",
          department: "Tech & Research",
          image: "/team/IMG-20251102-WA0005_anonymous.webp",
          quote: "Aligning parabolic mirrors by starlight at 3 AM.",
          socials: {
            github: "https://github.com",
          },
          isHead: true,
        },
        {
          id: "aditi-sen-23",
          name: "Aditi Sen",
          role: "Research Secretary",
          department: "Tech & Research",
          image: "/team/IMG_0309_anonymous.webp",
          quote: "Every photon striking our sensor began its voyage before civilization awoke.",
          socials: {
            linkedin: "https://linkedin.com",
          },
        },
      ],
    },
    {
      name: "Multimedia",
      description: "First astrophotography test frames of lunar craters, Orion nebula, and Saturn's rings.",
      members: [
        {
          id: "rohan-mehta-23",
          name: "Rohan Mehta",
          role: "Founding Astrophotographer",
          department: "Multimedia",
          image: "/team/IMG_20251012_232107_anonymous.webp",
          quote: "Turning the cricket pitch into a deep-space imaging station.",
          socials: {
            instagram: "https://instagram.com",
          },
          isHead: true,
        },
      ],
    },
  ],
};
