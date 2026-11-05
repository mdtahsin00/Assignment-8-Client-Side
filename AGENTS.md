# StudioSpace client

Next.js 15 (App Router) frontend for a studio-rental marketplace. Not a monorepo: the Express + MongoDB API is a **separate project at `../studiospace-server`** (own `package.json`, own `.env`). Start it first — this client only proxies to it.

## Commands

- `npm run dev` — Next dev on http://localhost:3000.
- `npx tsc --noEmit` — the only verification step. There is no lint, test, or typecheck script, and no ESLint installed. `strict: true`.
- `npm run build` — passes with or without `.env.local` (auth is created lazily, so the build needs no secrets); missing env fails at request time with a clear error instead.
- `npm run seed` does not exist here despite the README implying it — seeding is `npm run seed` inside `../studiospace-server`.

## Setup gotcha

`.env.local` is gitignored and absent on a fresh clone: copy `.env.example` → `.env.local` first. It is not needed for `npm run build` — `src/lib/auth.ts` exports `getAuth()`, which builds the Better Auth + Mongo client on first request, so builds never require runtime secrets. Every auth/API request does need the env, and `getAuth()` throws a message naming the missing variable. Never re-introduce module-level `new MongoClient(process.env.MONGODB_URI as string)` or `export const auth = betterAuth(...)`: that is what used to crash Vercel builds when its env was unset.

- `JWT_SECRET` must be byte-identical to the server's, or every API call returns 401.
- `DB_NAME=StudioSpace` — case-sensitive and **must match the existing DB on the Atlas cluster**. The lowercase value in older configs (`studiospace`) is rejected with Mongo error 13297 (`db already exists with different case`), which surfaces only at first signup as Better Auth `FAILED_TO_CREATE_USER` (HTTP 422) — pages load fine, so it's easy to misdiagnose as a form bug.
- `API_URL` (default `http://localhost:5000`) is read by `next.config.ts` at startup — restart the dev server after changing it. Env files are only read at server start, so any `.env.local` change needs a restart.

## How requests actually flow

- The browser never calls Express directly: `src/lib/api.ts` fetches `/server-api/...`, and `next.config.ts` rewrites that to `${API_URL}/api/...`. This keeps the HTTPOnly `ss_token` cookie same-origin. **All new API calls must go through `api()` / `useApi()` — never a hardcoded `http://localhost:5000`.**
- Two auth layers: a Better Auth session inside Next (`src/lib/auth.ts` + catch-all `src/app/api/auth/[...all]/route.ts`), and a 7-day JWT minted by `POST /api/token` into the `ss_token` cookie for Express. `src/app/providers.tsx` re-mints it on every session load and only then sets `ready`; `PrivateRoute` gates on that flag so private pages don't 401 or bounce to `/login` on reload. Preserve that ordering when touching auth.
- Post-login redirects use the `?next=` query param (login page, `PrivateRoute`, and Google `callbackURL`).

## Conventions

- Path alias `@/*` → `src/*`. npm only (`package-lock.json`).
- Pages are client components that fetch via `useApi<T>(path)` (`src/lib/use-api.ts`). No server-side data fetching, codegen, or migrations.
- Tailwind **v4 via PostCSS** — no `tailwind.config`. Theme tokens and shared classes (`.wrap`, `.btn`, `.input`, `.card`, `.badge`) live in `src/app/globals.css` (`@theme inline`, `@layer components`); reuse them instead of re-rolling utilities. Dark mode: `next-themes` `class` strategy + `@custom-variant dark`.
- Images use plain `<img>` (remote imgbb/Mongo URLs; `next/image` remote patterns are not configured) — match that.
- Domain constants (categories, amenities, booking-status badge styles) are in `src/lib/constants.ts`; API response types in `src/lib/types.ts`.
- `NEXT_PUBLIC_IMGBB_KEY` is optional; without it `StudioForm` tells users to paste an image URL instead of uploading.

## Repo quirk

Git's toplevel is `C:\Users\TAHSIN` (home directory, zero commits), not this folder — `git status`/`git diff` from here dump the entire home directory. Don't rely on git output to scope changes; verify by file path.
