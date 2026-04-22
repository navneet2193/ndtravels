"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdminAction, type AdminLoginState } from "@/app/create/actions";

const initialState: AdminLoginState = {
  error: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button-primary" type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Admin sign in"}
    </button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAdminAction, initialState);

  return (
    <form className="form-card form-grid" action={formAction}>
      <div className="field">
        <label htmlFor="email">Admin Email</label>
        <input id="email" name="email" type="email" placeholder="admin@example.com" required />
      </div>

      <div className="field">
        <label htmlFor="password">Admin Password</label>
        <input id="password" name="password" type="password" required />
        <p className="helper-text">Sign in with Supabase Auth. Access is granted only if your profile role is admin.</p>
      </div>

      {state.error ? <p className="helper-text">{state.error}</p> : null}
      <SubmitButton />
    </form>
  );
}
