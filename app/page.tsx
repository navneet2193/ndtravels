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
  const heroBlog = featuredBlogs[0];

  return (
    <>
      <section className="hero hero-home">
        <div className="container hero-grid hero-grid-home">
          <div className="hero-copy-shell">
            <p className="eyebrow">Independent Travel Journal</p>
            <h1>Stories, routes, and destination notes designed like a magazine.</h1>
            <p className="hero-copy">
              ND Travels curates immersive place writing with practical detail, strong imagery,
              and editorial rhythm so every trip idea feels tangible before departure.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/blogs">
                Browse stories
              </Link>
              <Link className="button button-secondary" href="/create">
                Open dashboard
              </Link>
            </div>

            <div className="hero-metrics">
              <div className="metric-card">
                <span>Format</span>
                <strong>Story-first travel publishing</strong>
              </div>
              <div className="metric-card">
                <span>Focus</span>
                <strong>Destinations, itineraries, local texture</strong>
              </div>
              <div className="metric-card">
                <span>Experience</span>
                <strong>Elegant on desktop and mobile</strong>
              </div>
            </div>
          </div>

          <div className="hero-feature-panel">
            <div className="hero-feature-frame">
              <p className="eyebrow">Editor&apos;s Window</p>
              <h2>{heroBlog?.title || "Build a destination story worth lingering on."}</h2>
              <p>
                {heroBlog?.description ||
                  "Use the home page to set the tone, invite discovery, and spotlight the strongest journey in your collection."}
              </p>
              <div className="hero-feature-pills">
                <span>{heroBlog?.location || "Coastal routes"}</span>
                <span>{heroBlog?.category || "Travel essays"}</span>
                <span>{featuredBlogs.length} recent stories</span>
              </div>
              <Link className="text-link" href={heroBlog ? `/blogs/${heroBlog.id}` : "/blogs"}>
                {heroBlog ? "Read highlighted story" : "See all stories"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container editorial-strip">
          <div>
            <p className="eyebrow">Why It Works</p>
            <h2>Clean editorial structure meets practical travel detail.</h2>
          </div>
          <div className="editorial-strip-grid">
            <article className="editorial-note">
              <strong>Visual hierarchy</strong>
              <p>Hero storytelling, refined cards, and spacious article pages keep the reading flow calm.</p>
            </article>
            <article className="editorial-note">
              <strong>Structured metadata</strong>
              <p>Locations, categories, tags, and dates give every blog a stronger sense of place.</p>
            </article>
            <article className="editorial-note">
              <strong>Admin-led publishing</strong>
              <p>The write flow is locked behind Supabase auth so only approved editors can publish.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Featured Stories</p>
            <h2>Fresh routes, detailed moments, and destination atmosphere</h2>
          </div>
          <Link className="text-link" href="/blogs">
            Explore the archive
          </Link>
        </div>

        <div className="container card-grid">
          {featuredBlogs.length > 0 ? (
            featuredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} priority />)
          ) : (
            <div className="empty-state">
              <h3>No featured stories yet</h3>
              <p>Publish your first blog from the dashboard to populate this editorial front page.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
