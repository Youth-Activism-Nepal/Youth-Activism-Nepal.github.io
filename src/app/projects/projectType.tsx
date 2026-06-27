export interface ITeam {
  _id?: string;
  image?: string; // primary image
  images?: string[]; // additional images for carousel
  youtubeLink?: string;
  googleFormUrl?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  phase?: "upcoming" | "active" | "past";
  badge?: string;
  name?: string;
  role?: string;
  id?: string;
  heading?: string;
  subheading?: string;
  content?: string;
  hashtags?: string;
}
