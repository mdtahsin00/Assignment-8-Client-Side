<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands (run from this directory)

- `npm run dev` — dev server at http://localhost:3000 (`next dev`)
- `npm run build` — production build (output to `.next/`, gitignored)
- `npm run start` — production server; requires `npm run build` first
- `npm run lint` — ESLint with `eslint-config-next` (Next.js + TypeScript + Core Web Vitals)

No test script or test runner is configured. Do not add `npm test` or test commands without first verifying available tooling.

## Project structure

- Next.js 16 App Router under `src/app/`
  - `src/app/layout.tsx` — root layout; imports `src/app/globals.css` and `Navbar`
  - `src/app/page.tsx` — homepage (`/`)
  - `src/app/<route>/page.tsx` — route pages (`signIn`, `signUP`, `aboutUs`, `exploreStudios`, `HowItWorks`)
  - `src/app/component/` — shared components (`navbar.tsx`, `hero.tsx`)
- Path alias `@/*` → `./src/*` (import Navbar as `@/app/component/navbar`)
- Styling: Tailwind CSS v4 + daisyui; entry CSS is `src/app/globals.css`
- `next.config.ts`: `cacheComponents`, `partialPrefetching`, and `reactCompiler` enabled; `*.css` uses the `@tailwindcss/turbopack` loader

## Conventions / gotchas

- React Compiler is on (`reactCompiler: true`, `babel-plugin-react-compiler`): components are auto-memoized. Do not add `React.memo`/`useMemo`/`useCallback` purely for performance — let the compiler handle it.
- TypeScript is strict (`strict: true`, `isolatedModules: true`). `src/` is `.ts`/`.tsx` only.
- `next-env.d.ts` is generated and gitignored — do not edit it.
- `.next/`, `out/`, `build/` are build artifacts; all gitignored.
- No CI workflows, no pre-commit hooks, no formatter configured. `npm run lint` is the only verification step.
- `.env*` is gitignored; the app currently needs no environment variables.
