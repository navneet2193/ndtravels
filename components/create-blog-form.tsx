"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createBlogAction, type CreateBlogState } from "@/app/create/actions";

const initialState: CreateBlogState = {
  error: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button-primary" type="submit" disabled={pending}>
      {pending ? "Publishing..." : "Publish blog"}
    </button>
  );
}

export function CreateBlogForm() {
  const [state, formAction] = useActionState(createBlogAction, initialState);

  return (
    <form className="form-card form-grid" action={formAction}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" placeholder="Sunrise over the Amalfi Coast" required />
      </div>

      <div className="field">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          placeholder="sunrise-over-the-amalfi-coast"
          required
        />
        <p className="helper-text">Use lowercase words separated by hyphens.</p>
      </div>

      <div className="field">
        <label htmlFor="description">Short Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="A short preview for cards, listings, and quick summaries."
          required
        />
      </div>

      <div className="field">
        <label htmlFor="location">Location</label>
        <input id="location" name="location" placeholder="Amalfi Coast, Italy" required />
      </div>

      <div className="field">
        <label htmlFor="date">Travel Date</label>
        <input id="date" name="date" type="date" required />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <input id="category" name="category" placeholder="Beach Escape" required />
      </div>

      <div className="field">
        <label htmlFor="tags">Tags</label>
        <input id="tags" name="tags" placeholder="italy, coast, summer, itinerary" />
        <p className="helper-text">Separate multiple tags with commas.</p>
      </div>

      <div className="field">
        <label htmlFor="seoDescription">SEO Description</label>
        <textarea
          id="seoDescription"
          name="seoDescription"
          placeholder="Search-friendly description for this blog post."
        />
      </div>

      <div className="field">
        <label htmlFor="featuredImage">Featured Image URL</label>
        <input
          id="featuredImage"
          name="featuredImage"
          type="url"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="field">
        <label htmlFor="images">Gallery Image URLs</label>
        <textarea
          id="images"
          name="images"
          placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
        />
        <p className="helper-text">Separate multiple image URLs with commas.</p>
      </div>

      <div className="field">
        <label htmlFor="videos">Video URLs</label>
        <textarea
          id="videos"
          name="videos"
          placeholder="https://youtube.com/..., https://vimeo.com/..."
        />
        <p className="helper-text">Separate multiple video URLs with commas.</p>
      </div>

      <div className="field">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Write your full travel story, itinerary, tips, and memorable moments..."
          required
        />
      </div>

      {state.error ? <p className="helper-text">{state.error}</p> : null}
      <SubmitButton />
    </form>
  );
}
