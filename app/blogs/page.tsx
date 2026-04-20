import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { getAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Browse every travel story published on ND Travels."
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <section className="section">
      <div className="container section-heading">
        <div>
          <p className="eyebrow">All Blogs</p>
          <h1>Travel journals, guides, and memorable routes</h1>
        </div>
        <p className="section-copy">
          Browse every post with destination imagery, short previews, and full story pages.
        </p>
      </div>

      <div className="container card-grid">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="empty-state">
            <h3>No blogs found</h3>
            <p>Your Supabase table is connected, but it does not have blog records yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
