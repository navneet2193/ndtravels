import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatBlogDate, getBlogById } from "@/lib/blogs";

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
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <article className="section">
      <div className="container article-shell">
        <div className="article-header">
          <p className="eyebrow">Travel Story</p>
          <h1>{blog.title}</h1>
          <p className="article-meta">Published {formatBlogDate(blog.created_at)}</p>
          <p className="article-excerpt">{blog.excerpt}</p>
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
    </article>
  );
}
