# StudioSpace (client)

**Live site:** https://your-studiospace.vercel.app  (replace after deploying)
**API server repo:** see the separate `studiospace-server` project

A peer-to-peer marketplace where creators rent photo studios, sound stages, podcast lounges, music suites and art workshops by the hour.

## Features
- Home with a 3-slide Swiper hero, featured studios (`.limit(6)` from MongoDB), category browsing and how-it-works sections
- Explore page with search, category filter and sorting, plus skeleton loaders and empty states
- Studio details with gallery carousel, amenities, reviews, host info and a booking modal
- Full CRUD for listings (add, update, delete with confirmation modal) and a My Bookings page with status badges and cancel
- Host dashboard to confirm, decline or complete incoming booking requests
- Better Auth email/password and Google login, with password rules (uppercase, lowercase, 6+ chars)
- JWT in an HTTPOnly cookie guards every server mutation (401 when missing)
- Double-booking prevention against Confirmed bookings (409 with a clear message)
- Light/dark theme toggle, toast notifications (Sonner), custom 404 page, responsive layout

## Tech stack
Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Better Auth + MongoDB adapter, Sonner, Swiper, Lucide, Express + MongoDB (server).

## Local setup
1. Start the server first (see the server README), then in this folder run `npm install`.
2. Copy `.env.example` to `.env.local` and fill it in. `JWT_SECRET` must equal the server's.
3. `npm run dev`, then open http://localhost:3000.
4. Seed demo studios from the server with `npm run seed`.

## Deploying to Vercel

The build itself needs no secrets (Better Auth/Mongo are created on first request), so a failing deploy is almost always **missing environment variables**. In Vercel → Project → Settings → Environment Variables, add for **Production and Preview**:

| Variable | Value |
|---|---|
| `MONGODB_URI` | Atlas connection string (`mongodb://...` or `mongodb+srv://...`) |
| `DB_NAME` | `StudioSpace` (case-sensitive — `studiospace` fails with Mongo error 13297) |
| `BETTER_AUTH_SECRET` | random 32+ char string; rotating it logs everyone out |
| `BETTER_AUTH_URL` | `https://<your-app>.vercel.app` (your production domain) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | from Google Cloud Console → Credentials |
| `JWT_SECRET` | **exactly the same value** as the Express server's `JWT_SECRET` |
| `API_URL` | public URL of the deployed `studiospace-server`, no trailing slash |
| `NEXT_PUBLIC_IMGBB_KEY` | optional, only for in-form image uploads |

Then redeploy (env changes only apply to new deployments).

- `API_URL` is read by `next.config.ts` at **build** time (the `/server-api` rewrite is baked in), so after changing it you must redeploy, not just restart.
- Add `https://<your-app>.vercel.app/api/auth/callback/google` to Google Cloud Console → Credentials → **Authorized redirect URIs**, otherwise Google login fails with `redirect_uri_mismatch`.
- In MongoDB Atlas → Network Access, allow `0.0.0.0/0` — Vercel functions use dynamic IPs.
- The Express API must be deployed and publicly reachable before the frontend can do anything beyond rendering; set the same `JWT_SECRET` and `DB_NAME=StudioSpace` on that host.

## Examiner test credentials
Register a new account on `/register`, or use the account you create for review:
- Email: `examiner@studiospace.dev`
- Password: `Studio123` (create it once on the Register page)
