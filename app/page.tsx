import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore featured travel journals and destination highlights from ND Travels."
};

const destinationShowcase = [
  {
    title: "Coastal escapes",
    description: "Salt-air mornings, slow harbors, and dramatic blue horizons for reflective travel days.",
    image: "/home-images/coast-aerial.jpg",
    alt: "Real coastal travel photograph with cliffs, sea, and shoreline"
  },
  {
    title: "Mountain routes",
    description: "Layered ridgelines, alpine light, and winding roads that reward every early start.",
    image: "/home-images/mountain-road.jpg",
    alt: "Real mountain road photograph with dramatic peaks and clouds"
  },
  {
    title: "City wandering",
    description: "Laneways, landmarks, and evening glow for travelers who like culture with momentum.",
    image: "/home-images/city-skyline.jpg",
    alt: "Real city skyline photograph with waterfront and tall buildings"
  }
];

const journeyFrames = [
  {
    title: "Harbor arrivals",
    image: "/home-images/harbor-city.jpg",
    alt: "Harbor city skyline at dusk",
    note: "Best for reflective city entries and twilight arrival stories."
  },
  {
    title: "Open-road climbs",
    image: "/home-images/mountain-aerial-road.jpg",
    alt: "Aerial view of a winding mountain road",
    note: "Works well for route breakdowns, driving guides, and high-altitude escapes."
  },
  {
    title: "Wide coastlines",
    image: "/home-images/coast-hero.jpg",
    alt: "Wide coastal landscape with cliffs and water",
    note: "Ideal when the story is about atmosphere, calm, and dramatic edges."
  }
];

const motionRailImages = [
  {
    src: "/home-images/coast-hero.jpg",
    alt: "Coastal cliffs and ocean waves"
  },
  {
    src: "/home-images/mountain-road.jpg",
    alt: "Road through dramatic mountain landscape"
  },
  {
    src: "/home-images/city-skyline.jpg",
    alt: "City skyline by the water"
  },
  {
    src: "/home-images/harbor-city.jpg",
    alt: "Harbor city view during golden hour"
  },
  {
    src: "/home-images/mountain-aerial-road.jpg",
    alt: "Aerial mountain road travel photograph"
  },
  {
    src: "/home-images/coast-aerial.jpg",
    alt: "Aerial coastline travel photograph"
  }
];

export default async function HomePage() {
  const featuredBlogs = await getFeaturedBlogs(3);
  const heroBlog = featuredBlogs[0];

  return (
    <>
      <section className="hero hero-home">
        <div className="container hero-grid hero-grid-home">
          <div className="hero-copy-shell">
            <p className="eyebrow">Independent Travel Journal</p>
            <h1>Travel stories that feel cinematic before the trip even begins.</h1>
            <p className="hero-copy">
              ND Travels brings together destination atmosphere, practical route ideas, and
              editorial storytelling in one warm, modern reading experience.
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

          <div className="hero-visual-shell">
            <div className="hero-image-stage">
              <div className="hero-image-card hero-image-card-primary">
                <Image
                  src="/home-images/coast-hero.jpg"
                  alt="Real travel photograph showing a coastline with cliffs and waves"
                  fill
                  priority
                  className="hero-stage-image"
                  sizes="(max-width: 960px) 100vw, 40vw"
                />
              </div>
              <div className="hero-image-card hero-image-card-secondary">
                <Image
                  src="/home-images/mountain-road.jpg"
                  alt="Real travel photograph showing a winding road through the mountains"
                  fill
                  className="hero-stage-image"
                  sizes="(max-width: 960px) 50vw, 20vw"
                />
              </div>
              <div className="hero-badge hero-badge-top">
                <span>New routes weekly</span>
                <strong>{featuredBlogs.length || 3} curated story picks</strong>
              </div>
              <div className="hero-badge hero-badge-bottom">
                <span>Travel mood</span>
                <strong>Warm, immersive, destination-first</strong>
              </div>
            </div>

            <div className="hero-feature-frame hero-feature-card">
              <p className="eyebrow">Featured Now</p>
              <h2>{heroBlog?.title || "Build a destination story worth lingering on."}</h2>
              <p>
                {heroBlog?.description ||
                  "Spotlight journeys with strong atmosphere, practical notes, and a point of view that keeps readers exploring."}
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
        <div className="container discovery-band">
          {destinationShowcase.map((item) => (
            <article key={item.title} className="discovery-card">
              <div className="discovery-card-image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="discovery-image"
                  sizes="(max-width: 960px) 100vw, 33vw"
                />
              </div>
              <div className="discovery-card-copy">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tight motion-gallery-section">
        <div className="motion-gallery-heading">
          <p className="eyebrow">Moving Postcards</p>
          <h2>Coasts, cities, and mountain roads in motion.</h2>
        </div>
        <div className="motion-rail motion-rail-left" aria-hidden="true">
          <div className="motion-rail-track">
            {[...motionRailImages, ...motionRailImages].map((image, index) => (
              <div className="motion-rail-card" key={`left-${image.src}-${index}`}>
                <Image src={image.src} alt={image.alt} fill className="motion-rail-image" />
              </div>
            ))}
          </div>
        </div>
        <div className="motion-rail motion-rail-right" aria-hidden="true">
          <div className="motion-rail-track">
            {[...motionRailImages].reverse().concat([...motionRailImages].reverse()).map((image, index) => (
              <div className="motion-rail-card motion-rail-card-small" key={`right-${image.src}-${index}`}>
                <Image src={image.src} alt={image.alt} fill className="motion-rail-image" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container editorial-strip">
          <div>
            <p className="eyebrow">Why It Works</p>
            <h2>Polished travel storytelling with motion, mood, and clear navigation.</h2>
          </div>
          <div className="editorial-strip-grid">
            <article className="editorial-note">
              <strong>Editorial rhythm</strong>
              <p>Bold hero framing, layered imagery, and breathing room make the page feel deliberate.</p>
            </article>
            <article className="editorial-note">
              <strong>Destination mood</strong>
              <p>Travel-focused visuals help the archive feel inspiring before readers even open a story.</p>
            </article>
            <article className="editorial-note">
              <strong>Calm movement</strong>
              <p>Subtle reveal and floating animations add energy without making the page feel busy.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container photo-essay">
          <div className="essay-layout">
            <article className="essay-main">
              <div className="essay-image-wrap essay-image-wrap-large">
                <Image
                  src="/home-images/mountain-aerial-road.jpg"
                  alt="Aerial travel photograph of a winding mountain road"
                  fill
                  className="essay-image"
                  sizes="(max-width: 1100px) 100vw, 48vw"
                />
              </div>
              <div className="essay-caption">
                <p className="eyebrow">On The Move</p>
                <h2>Pair destination mood with route context, not just a pretty cover image.</h2>
                <p className="section-copy">
                  Great travel pages feel grounded when the photography shows how the journey
                  unfolds: the road in, the coastline on arrival, and the city lights that close the day.
                </p>
              </div>
            </article>

            <div className="essay-side">
              <article className="essay-side-card photo-note-card">
                <strong>Professional motion</strong>
                <p>
                  The floating hero cards suggest movement between destinations, while staggered
                  reveals guide the eye down the page.
                </p>
              </article>
              <article className="essay-side-card photo-note-card">
                <strong>Visual context</strong>
                <p>
                  Each image block now supports a travel idea: coast, road, skyline, and arrival.
                </p>
              </article>
              <div className="essay-image-wrap essay-image-wrap-small">
                <Image
                  src="/home-images/harbor-city.jpg"
                  alt="Travel photograph of a harbor city skyline during golden hour"
                  fill
                  className="essay-image"
                  sizes="(max-width: 1100px) 100vw, 24vw"
                />
              </div>
            </div>
          </div>

          <div className="journey-grid">
            {journeyFrames.map((frame) => (
              <article key={frame.title} className="journey-frame">
                <div className="journey-frame-image">
                  <Image
                    src={frame.image}
                    alt={frame.alt}
                    fill
                    className="journey-image"
                    sizes="(max-width: 960px) 100vw, 33vw"
                  />
                </div>
                <div className="journey-frame-copy">
                  <strong>{frame.title}</strong>
                  <p>{frame.note}</p>
                </div>
              </article>
            ))}
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
