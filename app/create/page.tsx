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
    <section className="section create-section">
      <div className="container create-grid create-layout">
        <div className="create-intro-card">
          <p className="eyebrow">{isAdmin ? "Editorial Studio" : "Protected Access"}</p>
          <h1>{isAdmin ? "Design and publish your next travel feature." : "Sign in before entering the publishing studio."}</h1>
          <p className="section-copy">
            {isAdmin
              ? "This dashboard is built for structured publishing, with fields for story identity, destination metadata, media, and SEO."
              : "This page is reserved for authenticated editors. Sign in with Supabase Auth and make sure your profile role is set to admin."}
          </p>

          <div className="create-highlights">
            <div className="highlight-card">
              <strong>Structured publishing</strong>
              <p>Titles, slugs, categories, travel dates, and media are all captured in one flow.</p>
            </div>
            <div className="highlight-card">
              <strong>Editorial consistency</strong>
              <p>Descriptions and SEO fields help keep cards, detail pages, and search previews aligned.</p>
            </div>
            <div className="highlight-card">
              <strong>Access control</strong>
              <p>Only users with `profiles.role = 'admin'` can publish content from this space.</p>
            </div>
          </div>

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
