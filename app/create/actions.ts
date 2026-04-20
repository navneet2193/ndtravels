"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";

export type CreateBlogState = {
  error: string;
};

function buildExcerpt(content: string) {
  return content.replace(/\s+/g, " ").trim().slice(0, 160);
}

export async function createBlogAction(
  _prevState: CreateBlogState,
  formData: FormData
): Promise<CreateBlogState> {
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  if (!title || !content || !imageUrl) {
    return {
      error: "Title, content, and image URL are required."
    };
  }

  let supabase;

  try {
    supabase = createSupabaseServerClient();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Supabase is not configured."
    };
  }

  const { error } = await supabase.from("blogs").insert({
    title,
    content,
    image_url: imageUrl,
    excerpt: buildExcerpt(content)
  });

  if (error) {
    return {
      error: error.message
    };
  }

  revalidatePath("/");
  revalidatePath("/blogs");
  redirect("/blogs");
}
