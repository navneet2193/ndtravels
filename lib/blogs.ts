import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Blog } from "@/lib/types";

function fallbackExcerpt(content: string) {
  return content.replace(/\s+/g, " ").trim().slice(0, 160);
}

function normalizeBlog(blog: Partial<Blog> & { id: string }): Blog {
  return {
    id: blog.id,
    title: blog.title || "Untitled journey",
    content: blog.content || "",
    image_url: blog.image_url || "",
    excerpt: blog.excerpt || fallbackExcerpt(blog.content || ""),
    created_at: blog.created_at || new Date().toISOString()
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
    .select("id, title, excerpt, content, image_url, created_at")
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
    .select("id, title, excerpt, content, image_url, created_at")
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
    .select("id, title, excerpt, content, image_url, created_at")
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
