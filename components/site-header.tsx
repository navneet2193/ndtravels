import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAdminAction } from "@/app/create/actions";

export async function SiteHeader() {
  const isAdmin = await isAdminAuthenticated();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">N</span>
          <span className="brand-label">
            <span className="brand-title">ND Travels</span>
            <span className="brand-subtitle">Editorial travel stories with modern routes</span>
          </span>
        </Link>

        <div className="nav-actions">
          <nav className="nav" aria-label="Primary">
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/create">{isAdmin ? "Write" : "Sign in"}</Link>
          </nav>
          {isAdmin ? (
            <form action={logoutAdminAction}>
              <button className="button button-secondary nav-signout" type="submit">
                Sign out
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
