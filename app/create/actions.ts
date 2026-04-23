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

export type UpdateBlogState = {
  error: string;
};

export type DeleteBlogState = {
  error: string;
};

export type UpdateBlogStatusState = {
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
    videos,
    status: "published"
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

export async function updateBlogAction(
  _prevState: UpdateBlogState,
  formData: FormData
): Promise<UpdateBlogState> {
  const admin = await getAuthenticatedAdmin();

  if (!admin?.id) {
    return {
      error: "Admin login required before updating this blog."
    };
  }

  const blogId = String(formData.get("blogId") || "").trim();
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

  if (!blogId) {
    return {
      error: "Missing blog id."
    };
  }

  if (!title || !slug || !description || !content || !location || !travelDate || !category) {
    return {
      error: "Title, slug, description, content, location, travel date, and category are required."
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

  const { data: existingBlog, error: lookupError } = await supabase
    .from("blogs")
    .select("id")
    .eq("id", blogId)
    .eq("author_id", admin.id)
    .maybeSingle();

  if (lookupError) {
    return {
      error: lookupError.message
    };
  }

  if (!existingBlog) {
    return {
      error: "You can only update blogs you created."
    };
  }

  const { error } = await supabase
    .from("blogs")
    .update({
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
      videos,
      updated_at: new Date().toISOString()
    })
    .eq("id", blogId)
    .eq("author_id", admin.id);

  if (error) {
    return {
      error: error.message
    };
  }

  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/my-blogs");
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath(`/blogs/${blogId}/edit`);
  redirect(`/blogs/${blogId}`);
}

export async function updateBlogStatusAction(
  _prevState: UpdateBlogStatusState,
  formData: FormData
): Promise<UpdateBlogStatusState> {
  const admin = await getAuthenticatedAdmin();

  if (!admin?.id) {
    return {
      error: "Admin login required before changing this blog status."
    };
  }

  const blogId = String(formData.get("blogId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!blogId) {
    return {
      error: "Missing blog id."
    };
  }

  if (status !== "draft" && status !== "published") {
    return {
      error: "Invalid blog status."
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

  const { data, error } = await supabase
    .from("blogs")
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", blogId)
    .eq("author_id", admin.id)
    .select("id");

  if (error) {
    return {
      error: error.message
    };
  }

  if (!data?.length) {
    return {
      error: "You can only change blogs you created."
    };
  }

  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/my-blogs");
  revalidatePath(`/blogs/${blogId}`);
  redirect("/my-blogs");
}

export async function deleteBlogAction(
  _prevState: DeleteBlogState,
  formData: FormData
): Promise<DeleteBlogState> {
  const admin = await getAuthenticatedAdmin();

  if (!admin?.id) {
    return {
      error: "Admin login required before deleting this blog."
    };
  }

  const blogId = String(formData.get("blogId") || "").trim();

  if (!blogId) {
    return {
      error: "Missing blog id."
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

  const { error, count } = await supabase
    .from("blogs")
    .delete({ count: "exact" })
    .eq("id", blogId)
    .eq("author_id", admin.id);

  if (error) {
    return {
      error: error.message
    };
  }

  if (!count) {
    return {
      error: "You can only delete blogs you created."
    };
  }

  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${blogId}`);
  redirect("/blogs");
}
