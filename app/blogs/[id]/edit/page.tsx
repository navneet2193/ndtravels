import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { UpdateBlogForm } from "@/components/update-blog-form";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import { getBlogById, getBlogByIdForAuthor } from "@/lib/blogs";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: EditBlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  return {
    title: blog ? `Edit ${blog.title}` : "Edit blog"
  };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const admin = await getAuthenticatedAdmin();

  if (!admin?.id) {
    redirect("/create");
  }

  const blog = await getBlogByIdForAuthor(id, admin.id);

  if (!blog) {
    notFound();
  }

  return (
    <section className="section create-section">
      <div className="container create-shell">
        <div className="create-page-header">
          <div>
            <p className="eyebrow">Edit Story</p>
            <h1>Update your travel story</h1>
            <p className="section-copy">
              Make changes to the post you created, then save it back to the archive.
            </p>
          </div>
          <Link className="button button-secondary" href={`/blogs/${blog.id}`}>
            Back to story
          </Link>
        </div>

        <div className="create-form-shell">
          <UpdateBlogForm blog={blog} />
        </div>
      </div>
    </section>
  );
}
