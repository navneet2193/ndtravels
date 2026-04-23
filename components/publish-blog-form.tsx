"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { publishBlogAction, type PublishBlogState } from "@/app/create/actions";

const initialState: PublishBlogState = {
  error: ""
};

function PublishButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button-primary table-button" type="submit" disabled={pending}>
      {pending ? "Publishing..." : "Publish"}
    </button>
  );
}

type PublishBlogFormProps = {
  blogId: string;
};

export function PublishBlogForm({ blogId }: PublishBlogFormProps) {
  const [state, formAction] = useActionState(publishBlogAction, initialState);

  return (
    <form className="owner-publish-form" action={formAction}>
      <input type="hidden" name="blogId" value={blogId} />
      {state.error ? <p className="helper-text helper-text-error">{state.error}</p> : null}
      <PublishButton />
    </form>
  );
}
