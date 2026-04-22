import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";
import { CreateBlogForm } from "@/components/create-blog-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAdminAction } from "./actions";

export const metadata: Metadata = {
  title: "Write",
  description: "Write and publish a new travel story on ND Travels."
};

export default async function CreateBlogPage() {
  const isAdmin = await isAdminAuthenticated();

  return (
    <section className="section create-section">
      <div className="container create-shell">
        <div className="create-page-header">
          <div>
            <p className="eyebrow">{isAdmin ? "Write" : "Sign In"}</p>
            <h1>{isAdmin ? "Create a new travel story" : "Sign in to continue"}</h1>
            <p className="section-copy">
              {isAdmin
                ? "Write, organize, and publish a polished blog post with destination details, media links, and search-ready copy."
                : "Sign in to continue to the publishing area."}
            </p>
          </div>
        </div>

        <div className="create-form-shell">{isAdmin ? <CreateBlogForm /> : <AdminLoginForm />}</div>
      </div>
    </section>
  );
}
