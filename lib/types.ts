export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  content: string;
  location: string;
  date: string;
  category: string;
  tags: string[];
  seo_description: string;
  image_url: string;
  images: string[];
  videos: string[];
  likes: number;
  created_at: string;
  updated_at: string;
};
