import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/types";
import { formatBlogDate } from "@/lib/blogs";

type BlogCardProps = {
  blog: Blog;
  priority?: boolean;
};

export function BlogCard({ blog, priority = false }: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card-image-wrap">
        <Image
          src={blog.image_url || "/placeholder.svg"}
          alt={blog.title}
          fill
          priority={priority}
          className="blog-card-image"
          sizes="(max-width: 960px) 100vw, 33vw"
        />
      </div>
      <div className="blog-card-content">
        <p className="eyebrow">{formatBlogDate(blog.created_at)}</p>
        <h3>{blog.title}</h3>
        <p>{blog.excerpt}</p>
        <Link className="card-link" href={`/blogs/${blog.id}`}>
          Read full story
        </Link>
      </div>
    </article>
  );
}
