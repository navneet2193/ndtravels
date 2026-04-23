"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteBlogAction, type DeleteBlogState } from "@/app/create/actions";

const initialState: DeleteBlogState = {
  error: ""
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button-danger" type="submit" disabled={pending}>
      {pending ? "Deleting..." : "Delete story"}
    </button>
  );
}

type DeleteBlogFormProps = {
  blogId: string;
};

export function DeleteBlogForm({ blogId }: DeleteBlogFormProps) {
  const [state, formAction] = useActionState(deleteBlogAction, initialState);

  return (
    <form
      className="owner-delete-form"
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this blog permanently?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="blogId" value={blogId} />
      {state.error ? <p className="helper-text helper-text-error">{state.error}</p> : null}
      <DeleteButton />
    </form>
  );
}
