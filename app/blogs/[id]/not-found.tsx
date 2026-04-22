import Link from "next/link";

export default function BlogNotFound() {
  return (
    <section className="section">
      <div className="container empty-state empty-state-large">
        <h1>Story not found</h1>
        <p>The route you requested is unavailable, unpublished, or may have moved elsewhere in the archive.</p>
        <Link className="button button-primary" href="/blogs">
          Return to archive
        </Link>
      </div>
    </section>
  );
}
