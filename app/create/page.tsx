import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";
import { CreateBlogForm } from "@/components/create-blog-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAdminAction } from "./actions";

export const metadata: Metadata = {
  title: "Create Blog",
  description: "Publish a new travel blog post to Supabase from the ND Travels dashboard."
};

export default async function CreateBlogPage() {
  const isAdmin = await isAdminAuthenticated();

  return (
    <section className="section">
      <div className="container create-grid">
        <div>
          <p className="eyebrow">{isAdmin ? "Create Blog" : "Admin Access"}</p>
          <h1>{isAdmin ? "Publish your next travel story" : "Admin sign-in required"}</h1>
          <p className="section-copy">
            {isAdmin
              ? "Fill in your blog details, media links, SEO text, and travel metadata to match your Supabase blogs table."
              : "This page is restricted. Sign in with your Supabase account. Only users whose profile role is admin can create or publish blog posts."}
          </p>
          {isAdmin ? (
            <form action={logoutAdminAction}>
              <button className="button button-secondary" type="submit">
                Sign out
              </button>
            </form>
          ) : null}
        </div>

        {isAdmin ? <CreateBlogForm /> : <AdminLoginForm />}
      </div>
    </section>
  );
}
