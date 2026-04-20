import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">N</span>
          <span className="brand-label">
            <span className="brand-title">ND Travels</span>
            <span className="brand-subtitle">Next.js travel journal</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/create">Create Blog</Link>
        </nav>
      </div>
    </header>
  );
}
