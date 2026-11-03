<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands (run from this directory)

- `npm run dev` — dev server at http://localhost:3000 (`next dev`)
- `npm run build` — production build; also runs the TypeScript check
- `npm run start` — production server; requires `npm run build` first
- `npm run lint` — ESLint flat config (`eslint-config-next`: core-web-vitals + TS). Currently passes with warnings (unused vars, `<img>`), 0 errors
- `npx tsc --noEmit` — standalone typecheck (no npm script for it)

No test runner or `npm test` is configured — do not add test commands without first verifying available tooling. There is no formatter, no CI, and no pre-commit hooks; `lint` + `tsc` + `build` is the whole verification loop.

## Architecture

- Single Next.js 16 App Router app. All data flows through Next.js API routes + direct reads of MongoDB (`frontend-user-data`) — the repo does **not** call any external service.
- Routes (`src/app/`): `/` (hero + about section), `signIn`, `signUp`, `exploreStudios`, `add-studio`, `my-listings`, `my-bookings`, `studios/[id]`; API: `/api/auth/[...all]` (better-auth), `/api/studios` (CRUD for listings), `/api/bookings` (create/list bookings).
- Shared components live in `src/app/component/` — singular **"component"**, not `components/` (navbar, footer, hero, aboutUs, Userinfo, StudioCard, StudioDetails).
- `src/app/lib/`: `auth.ts` (better-auth server + Mongo adapter), `auth-client.ts` (better-auth/react), `mongodb.ts` (db `frontend-user-data`, exports `studiosCollection` + `bookingsCollection`), `studio.ts` (validation + category/amenity constants), `booking.ts` (booking types + validation).
- Server components (`exploreStudios`, `studios/[id]`) query `studiosCollection` directly — no HTTP hop. Client components go through `/api/*` route handlers. Both paths hit the same DB.
- Path alias `@/*` → `./src/*`. `src/` is `.ts`/`.tsx` only.
- Styling: Tailwind CSS v4 + daisyUI; entry is `src/app/globals.css` (`@import "tailwindcss"`, `@plugin "daisyui"`). `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `reactCompiler`, wires `@tailwindcss/turbopack` for `*.css`, and allows remote images only from `images.unsplash.com` and `i.pinimg.com`.

## Legacy Express server (unused)

- `../../Server/index.js` (port 5000, db `StudioSpace`) was the original backend. The app no longer calls it — do not add `localhost:5000` fetches back. It can be shut down; its data was migrated into `frontend-user-data.studios` (12 docs, owned by the single seeded user).

## Auth

- better-auth (email+password, MongoDB adapter). Server: `auth.api.getSession({ headers: await headers() })`; client: `authClient` from `src/app/lib/auth-client.ts` (`useSession()`, `signIn.email`, `signUp.email`, `signOut`).
- No middleware — private pages (`add-studio`, `my-listings`, `my-bookings`) guard client-side with `useEffect` + `router.replace("/signIn")`; API routes check the session themselves and return 401.
- Booking ownership/pricing is decided server-side: `/api/bookings` takes `userId`/`userName`/price from the session + DB, never from the client payload.
- Route `params`/`searchParams` are Promises: `await params` (see `studios/[id]/page.tsx`).

## Environment

- `.env` (gitignored) must provide `MONGODB_URI`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET` — read by `src/app/lib/mongodb.ts`, `auth-client.ts`, and better-auth itself. A fresh clone without these fails at runtime.

## Conventions / gotchas

- React Compiler is on (`reactCompiler: true`): components are auto-memoized — do not add `React.memo`/`useMemo`/`useCallback` purely for performance.
- TypeScript is strict (`strict: true`, `isolatedModules: true`).
- `src/app/types/studio.ts` declares `IStudio` twice; TS interface merging makes it compile, so both blocks' fields exist. Edit both or consolidate deliberately.
- Generated files — never edit: `next-env.d.ts`, `tsconfig.tsbuildinfo`, `.next/` (plus `out/`, `build/`); all gitignored.
- Keep the `nextjs-agent-rules` block at the top intact: `next dev` regenerates it, so deleting it only produces an uncommitted diff.
