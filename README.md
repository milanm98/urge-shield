# Steady Path

A free, no-form web support toolbox for people trying to avoid gambling relapse.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth/Postgres
- Vercel-ready deployment

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add Supabase values.

3. Run the app:

   ```bash
   npm run dev
   ```

4. In Supabase, add these auth redirect URLs:

   - `http://localhost:3000/auth/callback`
   - `https://your-domain.vercel.app/auth/callback`

5. Run `supabase/schema.sql` in the Supabase SQL editor to create the v1 tables and RLS policies.

## Routes

- `/login`: Google and email magic-link access.
- `/dashboard`: main recovery toolbox.
- `/urge`: immediate urge timer and grounding flow.
- `/resources`: curated support library.
- `/slipped`: no-shame relapse damage control.
- `/settings`: optional trusted contacts and privacy information.
