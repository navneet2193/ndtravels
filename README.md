# ND Travels

A travel blog website built with Next.js App Router and Supabase.

## Project structure

```text
ndtravels/
|-- app/
|   |-- blogs/
|   |   |-- [id]/
|   |   |   |-- not-found.tsx
|   |   |   `-- page.tsx
|   |   `-- page.tsx
|   |-- create/
|   |   |-- actions.ts
|   |   `-- page.tsx
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   |-- blog-card.tsx
|   |-- create-blog-form.tsx
|   |-- site-footer.tsx
|   `-- site-header.tsx
|-- lib/
|   |-- blogs.ts
|   |-- supabase.ts
|   `-- types.ts
|-- public/
|   `-- placeholder.svg
|-- .env.example
|-- .gitignore
|-- eslint.config.mjs
|-- next.config.ts
|-- next-env.d.ts
|-- package.json
|-- tsconfig.json
`-- README.md
```

## Supabase setup

1. Create a Supabase project.
2. Add a `blogs` table with this SQL:

```sql
create extension if not exists "pgcrypto";

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);
```

3. Copy `.env.example` to `.env.local`.
4. Add your Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Pages included

- `/` Home page with intro and featured blogs
- `/blogs` Blog list page
- `/blogs/[id]` Blog detail page
- `/create` Create blog page with a publish form

## SEO and performance

- Route metadata is defined with Next.js `Metadata`
- Blog detail pages generate their own SEO metadata
- Server-side Supabase fetching keeps the initial page fast
- Responsive layout and optimized `next/image` usage support mobile and desktop

## Run the project

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- API keys are not hardcoded; they are loaded from `.env.local`.
- The create form stores an image URL with each blog record.
- If you want actual image uploads later, this project can be extended with Supabase Storage.
