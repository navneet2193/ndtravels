import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteBlogForm } from "@/components/delete-blog-form";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import { formatBlogDate, getBlogById, getBlogByIdForAuthor } from "@/lib/blogs";

type BlogDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params
}: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: "Blog not found"
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.image_url ? [blog.image_url] : []
    }
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const admin = await getAuthenticatedAdmin();
  const blog = (await getBlogById(id)) || (admin?.id ? await getBlogByIdForAuthor(id, admin.id) : null);

  if (!blog) {
    notFound();
  }

  const isOwner = Boolean(admin?.id && blog.author_id === admin.id);

  return (
    <article className="section article-section">
      <div className="container article-layout">
        <div className="article-shell">
          <div className="article-header">
            <p className="eyebrow">{blog.category || "Travel Story"}</p>
            <h1>{blog.title}</h1>
            <p className="article-excerpt">{blog.description || blog.excerpt}</p>

            {isOwner ? (
              <div className="owner-actions">
                <Link className="button button-secondary" href={`/blogs/${blog.id}/edit`}>
                  Edit story
                </Link>
                <DeleteBlogForm blogId={blog.id} />
              </div>
            ) : null}

            <div className="article-meta-row">
              <span>Published {formatBlogDate(blog.created_at)}</span>
              <span>{blog.location || "Destination note"}</span>
              <span>{blog.date ? formatBlogDate(blog.date) : "Flexible schedule"}</span>
            </div>

            {blog.tags.length > 0 ? (
              <div className="article-tags">
                {blog.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="article-image-wrap">
            <Image
              src={blog.image_url || "/placeholder.svg"}
              alt={blog.title}
              fill
              priority
              className="article-image"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="article-content">
            {blog.content.split("\n").map((paragraph, index) =>
              paragraph.trim() ? <p key={`${blog.id}-${index}`}>{paragraph}</p> : null
            )}
          </div>
        </div>

        <aside className="article-aside">
          <div className="article-side-card">
            <p className="eyebrow">Story Snapshot</p>
            <ul className="article-facts">
              <li>
                <strong>Location</strong>
                <span>{blog.location || "Not specified"}</span>
              </li>
              <li>
                <strong>Category</strong>
                <span>{blog.category || "Travel feature"}</span>
              </li>
              <li>
                <strong>Published</strong>
                <span>{formatBlogDate(blog.created_at)}</span>
              </li>
            </ul>
          </div>

          <div className="article-side-card article-side-card-accent">
            <p className="eyebrow">Editorial Note</p>
            <p>
              {blog.seo_description ||
                "This story blends location texture, memorable moments, and practical cues to help readers imagine the trip clearly."}
            </p>
          </div>
        </aside>
      </div>
      {blog.images.length > 0 ? (
        <div className="container gallery-strip">
          {blog.images.slice(0, 3).map((image, index) => (
            <div className="gallery-item" key={`${blog.id}-gallery-${index}`}>
              <Image
                src={image}
                alt={`${blog.title} gallery image ${index + 1}`}
                fill
                className="article-image"
                sizes="(max-width: 960px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
