"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  getAuthenticatedAdmin,
  isAdminAuthenticated,
  verifyAdminCredentials
} from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

export type CreateBlogState = {
  error: string;
};

export type AdminLoginState = {
  error: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseListField(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function loginAdminAction(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  try {
    if (!email || !password) {
      return {
        error: "Email and password are required."
      };
    }

    const admin = await verifyAdminCredentials(email, password);

    if (!admin?.id || !admin.email) {
      return {
        error: "Invalid admin credentials."
      };
    }

    await createAdminSession(admin.id, admin.email);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Admin sign-in is not configured."
    };
  }

  redirect("/create");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/");
}

export async function createBlogAction(
  _prevState: CreateBlogState,
  formData: FormData
): Promise<CreateBlogState> {
  if (!(await isAdminAuthenticated())) {
    return {
      error: "Admin login required before publishing."
    };
  }

  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const travelDate = String(formData.get("date") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const tagsInput = String(formData.get("tags") || "").trim();
  const seoDescription = String(formData.get("seoDescription") || "").trim();
  const featuredImage = String(formData.get("featuredImage") || "").trim();
  const imagesInput = String(formData.get("images") || "").trim();
  const videosInput = String(formData.get("videos") || "").trim();

  const slug = slugInput || slugify(title);
  const tags = parseListField(tagsInput);
  const images = parseListField(imagesInput);
  const videos = parseListField(videosInput);

  if (!title || !slug || !description || !content || !location || !travelDate || !category) {
    return {
      error: "Title, slug, description, content, location, travel date, and category are required."
    };
  }

  const admin = await getAuthenticatedAdmin();

  if (!admin?.id) {
    return {
      error: "Admin login required before publishing."
    };
  }

  let supabase;

  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Supabase is not configured."
    };
  }

  const { error } = await supabase.from("blogs").insert({
    author_id: admin.id,
    title,
    slug,
    description,
    content,
    location,
    date: travelDate,
    category,
    tags,
    seo_description: seoDescription,
    featured_image: featuredImage,
    images,
    videos
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
