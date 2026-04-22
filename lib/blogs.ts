import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Blog } from "@/lib/types";

type BlogRow = {
  id: string;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  content?: string | null;
  location?: string | null;
  date?: string | null;
  category?: string | null;
  tags?: string[] | null;
  seo_description?: string | null;
  featured_image?: string | null;
  images?: string[] | null;
  videos?: string[] | null;
  likes?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
};

function buildPreviewText(blog: BlogRow) {
  return (
    blog.description ||
    blog.seo_description ||
    blog.content ||
    ""
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

function normalizeBlog(blog: BlogRow): Blog {
  return {
    id: blog.id,
    slug: blog.slug || "",
    title: blog.title || "Untitled journey",
    description: blog.description || "",
    excerpt: buildPreviewText(blog),
    content: blog.content || "",
    location: blog.location || "",
    date: blog.date || "",
    category: blog.category || "",
    tags: blog.tags || [],
    seo_description: blog.seo_description || "",
    image_url: blog.featured_image || "",
    images: blog.images || [],
    videos: blog.videos || [],
    likes: blog.likes || 0,
    created_at: blog.created_at || new Date().toISOString(),
    updated_at: blog.updated_at || blog.created_at || new Date().toISOString()
  };
}

export const getAllBlogs = cache(async (): Promise<Blog[]> => {
  let supabase;

  try {
    supabase = createSupabaseServerClient();
  } catch (error) {
    console.error("Supabase configuration error:", error);
    return [];
  }

  const { data, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, description, content, location, date, category, tags, seo_description, featured_image, images, videos, likes, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load blogs:", error.message);
    return [];
  }

  return (data || []).map((blog) => normalizeBlog(blog));
});

export const getFeaturedBlogs = cache(async (limit = 3): Promise<Blog[]> => {
  let supabase;

  try {
    supabase = createSupabaseServerClient();
  } catch (error) {
    console.error("Supabase configuration error:", error);
    return [];
  }

  const { data, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, description, content, location, date, category, tags, seo_description, featured_image, images, videos, likes, created_at, updated_at"
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to load featured blogs:", error.message);
    return [];
  }

  return (data || []).map((blog) => normalizeBlog(blog));
});

export const getBlogById = cache(async (id: string): Promise<Blog | null> => {
  let supabase;

  try {
    supabase = createSupabaseServerClient();
  } catch (error) {
    console.error("Supabase configuration error:", error);
    return null;
  }

  const { data, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, description, content, location, date, category, tags, seo_description, featured_image, images, videos, likes, created_at, updated_at"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Failed to load blog ${id}:`, error.message);
    return null;
  }

  return normalizeBlog(data);
});

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}
