import Link from "next/link";
import { DeleteBlogForm } from "@/components/delete-blog-form";
import { PublishBlogForm } from "@/components/publish-blog-form";
import { formatBlogDate } from "@/lib/blogs";
import type { Blog } from "@/lib/types";

type MyBlogsTableProps = {
  blogs: Blog[];
};

export function MyBlogsTable({ blogs }: MyBlogsTableProps) {
  if (blogs.length === 0) {
    return (
      <div className="empty-state empty-state-large">
        <h3>No blogs yet</h3>
        <p>Your created blogs will appear here after you publish or save a story.</p>
        <Link className="button button-primary" href="/create">
          Create first blog
        </Link>
      </div>
    );
  }

  return (
    <div className="my-blogs-table-wrap">
      <table className="my-blogs-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <strong>{blog.title}</strong>
                <span>{blog.location || "Destination not set"}</span>
              </td>
              <td>
                <span className={`status-pill status-pill-${blog.status || "published"}`}>
                  {blog.status || "published"}
                </span>
              </td>
              <td>{blog.category || "Travel story"}</td>
              <td>{formatBlogDate(blog.updated_at)}</td>
              <td>
                <div className="table-actions">
                  <Link className="button button-secondary table-button" href={`/blogs/${blog.id}`}>
                    View
                  </Link>
                  <Link className="button button-secondary table-button" href={`/blogs/${blog.id}/edit`}>
                    Edit
                  </Link>
                  {blog.status === "draft" ? <PublishBlogForm blogId={blog.id} /> : null}
                  <DeleteBlogForm blogId={blog.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
