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
    <>
      <section className="hero hero-listing">
        <div className="container listing-hero">
          <div>
            <p className="eyebrow">Journal Archive</p>
            <h1>Travel features, guides, and beautifully paced field notes.</h1>
          </div>
          <p className="section-copy">
            Browse the full collection by destination, category, and publication date, all in one
            clean archive view.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container archive-toolbar">
          <div className="archive-stat">
            <span>Total stories</span>
            <strong>{blogs.length}</strong>
          </div>
          <div className="archive-stat">
            <span>Categories</span>
            <strong>{new Set(blogs.map((blog) => blog.category).filter(Boolean)).size || 0}</strong>
          </div>
          <div className="archive-stat">
            <span>Locations</span>
            <strong>{new Set(blogs.map((blog) => blog.location).filter(Boolean)).size || 0}</strong>
          </div>
        </div>

        <div className="container card-grid">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <div className="empty-state">
              <h3>No blogs found</h3>
              <p>There are no published stories yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
