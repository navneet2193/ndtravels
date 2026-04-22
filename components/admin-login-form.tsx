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
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAdminAction, initialState);

  return (
    <div className="form-card auth-card">
      <div className="auth-card-intro">
        <p className="eyebrow">Welcome Back</p>
        <h2>Sign in to continue</h2>
        <p className="helper-text">Enter your account details to access the publishing area.</p>
      </div>

      <form className="form-grid" action={formAction}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="name@example.com" required />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        {state.error ? <p className="helper-text helper-text-error">{state.error}</p> : null}
        <SubmitButton />
      </form>
    </div>
  );
}
