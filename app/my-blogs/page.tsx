import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MyBlogsTable } from "@/components/my-blogs-table";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import { getBlogsByAuthorId } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "My Blogs",
  description: "Manage your created travel stories on ND Travels."
};

export default async function MyBlogsPage() {
  const admin = await getAuthenticatedAdmin();

  if (!admin?.id) {
    redirect("/create");
  }

  const blogs = await getBlogsByAuthorId(admin.id);
  const draftCount = blogs.filter((blog) => blog.status === "draft").length;
  const publishedCount = blogs.filter((blog) => blog.status === "published").length;

  return (
    <section className="section dashboard-page-section">
      <div className="container dashboard-shell">
        <div className="dashboard-hero">
          <div>
            <p className="eyebrow">My Blogs</p>
            <h1>Manage your travel stories</h1>
            <p className="section-copy">
              Review every story you created, continue drafts, update published posts, or remove
              older entries.
            </p>
          </div>

          <Link className="button button-primary" href="/create">
            Create new blog
          </Link>
        </div>

        <div className="dashboard-stats-grid">
          <div className="archive-stat dashboard-stat-card">
            <span>Total stories</span>
            <strong>{blogs.length}</strong>
          </div>
          <div className="archive-stat dashboard-stat-card">
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
          <div className="archive-stat dashboard-stat-card">
            <span>Drafts</span>
            <strong>{draftCount}</strong>
          </div>
        </div>

        <MyBlogsTable blogs={blogs} />
      </div>
    </section>
  );
}
