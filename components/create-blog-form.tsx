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
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://images.unsplash.com/..."
          required
        />
        <p className="helper-text">Store the image URL in Supabase with the rest of the blog data.</p>
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
