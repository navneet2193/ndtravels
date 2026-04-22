import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function SiteHeader() {
  const isAdmin = await isAdminAuthenticated();

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
          <Link href="/create">{isAdmin ? "Create Blog" : "Admin Login"}</Link>
        </nav>
      </div>
    </header>
  );
}
