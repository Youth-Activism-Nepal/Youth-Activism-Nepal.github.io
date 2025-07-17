export interface ITeam {
  image?: string; // primary image
  images?: string[]; // additional images for carousel
  badge?: string;
  name: string;
  role?: string;
  id: string;
  heading?: string;
  subheading?: string;
  content?: string;
  hashtags?: string;
}