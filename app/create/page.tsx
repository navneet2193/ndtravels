import type { Metadata } from "next";
import { CreateBlogForm } from "@/components/create-blog-form";

export const metadata: Metadata = {
  title: "Create Blog",
  description: "Publish a new travel blog post to Supabase from the ND Travels dashboard."
};

export default function CreateBlogPage() {
  return (
    <section className="section">
      <div className="container create-grid">
        <div>
          <p className="eyebrow">Create Blog</p>
          <h1>Publish your next travel story</h1>
          <p className="section-copy">
            Fill in your blog details, media links, SEO text, and travel metadata to match your
            Supabase `blogs` table.
          </p>
        </div>

        <CreateBlogForm />
      </div>
    </section>
  );
}
