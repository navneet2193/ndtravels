import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore featured travel journals and destination highlights from ND Travels."
};

export default async function HomePage() {
  const featuredBlogs = await getFeaturedBlogs(3);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Travel Blog</p>
            <h1>Stories that make your next destination feel close enough to touch.</h1>
            <p className="hero-copy">
              ND Travels brings together personal travel stories, local tips, and vivid visuals
              so readers can plan better adventures and relive unforgettable moments.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/blogs">
                Explore blogs
              </Link>
              <Link className="button button-secondary" href="/create">
                Share a journey
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-stat">
              <span>Destinations</span>
              <strong>Curated worldwide</strong>
            </div>
            <div className="hero-stat">
              <span>Stories</span>
              <strong>Fresh from Supabase</strong>
            </div>
            <div className="hero-stat">
              <span>Experience</span>
              <strong>Responsive and SEO-ready</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Recent travel highlights</h2>
          </div>
          <Link className="text-link" href="/blogs">
            View all blogs
          </Link>
        </div>

        <div className="container card-grid">
          {featuredBlogs.length > 0 ? (
            featuredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} priority />)
          ) : (
            <div className="empty-state">
              <h3>No featured stories yet</h3>
              <p>Add your first blog post from the create page to populate the homepage.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
