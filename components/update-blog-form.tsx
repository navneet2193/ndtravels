"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateBlogAction, type UpdateBlogState } from "@/app/create/actions";
import type { Blog } from "@/lib/types";

const initialState: UpdateBlogState = {
  error: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button-primary" type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}

type UpdateBlogFormProps = {
  blog: Blog;
};

export function UpdateBlogForm({ blog }: UpdateBlogFormProps) {
  const [state, formAction] = useActionState(updateBlogAction, initialState);

  return (
    <form className="form-card form-grid editor-card" action={formAction}>
      <input type="hidden" name="blogId" value={blog.id} />

      <div className="editor-section">
        <div className="editor-heading">
          <p className="eyebrow">Story Identity</p>
          <h2>Update the narrative</h2>
        </div>
        <div className="form-two-column">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" defaultValue={blog.title} required />
          </div>

          <div className="field">
            <label htmlFor="slug">Slug</label>
            <input id="slug" name="slug" defaultValue={blog.slug} required />
            <p className="helper-text">Use lowercase words separated by hyphens.</p>
          </div>
        </div>

        <div className="field">
          <label htmlFor="description">Short Description</label>
          <textarea id="description" name="description" defaultValue={blog.description} required />
        </div>
      </div>

      <div className="editor-section">
        <div className="editor-heading">
          <p className="eyebrow">Travel Details</p>
          <h2>Organize the post</h2>
        </div>
        <div className="form-three-column">
          <div className="field">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" defaultValue={blog.location} required />
          </div>

          <div className="field">
            <label htmlFor="date">Travel Date</label>
            <input id="date" name="date" type="date" defaultValue={blog.date} required />
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <input id="category" name="category" defaultValue={blog.category} required />
          </div>
        </div>

        <div className="field">
          <label htmlFor="tags">Tags</label>
          <input id="tags" name="tags" defaultValue={blog.tags.join(", ")} />
          <p className="helper-text">Separate multiple tags with commas.</p>
        </div>
      </div>

      <div className="editor-section">
        <div className="editor-heading">
          <p className="eyebrow">Media And SEO</p>
          <h2>Prepare the presentation</h2>
        </div>
        <div className="field">
          <label htmlFor="seoDescription">SEO Description</label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            defaultValue={blog.seo_description}
          />
        </div>

        <div className="field">
          <label htmlFor="featuredImage">Featured Image URL</label>
          <input id="featuredImage" name="featuredImage" type="url" defaultValue={blog.image_url} />
        </div>

        <div className="form-two-column">
          <div className="field">
            <label htmlFor="images">Gallery Image URLs</label>
            <textarea id="images" name="images" defaultValue={blog.images.join(", ")} />
            <p className="helper-text">Separate multiple image URLs with commas.</p>
          </div>

          <div className="field">
            <label htmlFor="videos">Video URLs</label>
            <textarea id="videos" name="videos" defaultValue={blog.videos.join(", ")} />
            <p className="helper-text">Separate multiple video URLs with commas.</p>
          </div>
        </div>
      </div>

      <div className="editor-section">
        <div className="editor-heading">
          <p className="eyebrow">Main Story</p>
          <h2>Edit the full article</h2>
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" defaultValue={blog.content} required />
        </div>
      </div>

      <div className="editor-actions">
        {state.error ? <p className="helper-text helper-text-error">{state.error}</p> : null}
        <SubmitButton />
      </div>
    </form>
  );
}
