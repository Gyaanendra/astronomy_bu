export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  category: "Astrophotography" | "Cosmology" | "Field Notes" | "Research";
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

