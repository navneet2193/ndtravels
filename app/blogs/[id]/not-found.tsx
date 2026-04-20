import Link from "next/link";

export default function BlogNotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <h1>Story not found</h1>
        <p>The blog you requested does not exist or may have been removed.</p>
        <Link className="button button-primary" href="/blogs">
          Back to blogs
        </Link>
      </div>
    </section>
  );
}
