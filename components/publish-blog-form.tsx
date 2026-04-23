"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateBlogStatusAction, type UpdateBlogStatusState } from "@/app/create/actions";

const initialState: UpdateBlogStatusState = {
  error: ""
};

function StatusButton({ targetStatus }: { targetStatus: string }) {
  const { pending } = useFormStatus();
  const isPublishing = targetStatus === "published";

  return (
    <button
      className={`button ${isPublishing ? "button-primary" : "button-secondary"} table-button`}
      type="submit"
      disabled={pending}
    >
      {pending ? "Saving..." : isPublishing ? "Publish" : "Move to draft"}
    </button>
  );
}

type PublishBlogFormProps = {
  blogId: string;
  currentStatus: string;
};

export function PublishBlogForm({ blogId, currentStatus }: PublishBlogFormProps) {
  const [state, formAction] = useActionState(updateBlogStatusAction, initialState);
  const targetStatus = currentStatus === "draft" ? "published" : "draft";

  return (
    <form className="owner-publish-form" action={formAction}>
      <input type="hidden" name="blogId" value={blogId} />
      <input type="hidden" name="status" value={targetStatus} />
      {state.error ? <p className="helper-text helper-text-error">{state.error}</p> : null}
      <StatusButton targetStatus={targetStatus} />
    </form>
  );
}
