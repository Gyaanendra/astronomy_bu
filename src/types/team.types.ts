export type Department =
  | "Leadership"
  | "Tech & Research"
  | "Content"
  | "Management"
  | "PR & Outreach"
  | "Multimedia"
  | "Finance"
  | "Web & Development";

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  other?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: Department;
  image: string;
  quote?: string;
  socials: SocialLinks;
  isHead?: boolean;
}

export interface TenureRecord {
  tenureYear: string;
  tenureLabel: string;
  isCurrent: boolean;
  departments: {
    name: Department;
    description: string;
    members: TeamMember[];
  }[];
}

