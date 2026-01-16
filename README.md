# Ansiversa App Starter

This repo is the official starter template for Ansiversa mini-apps. It contains the standard
middleware auth guard, shared AppShell/AppAdminShell layouts, unread notifications badge wiring,
and a small Example Items module that demonstrates end-to-end CRUD.

## Quick start

1) Install dependencies

```
npm ci
```

2) Configure env vars (see `src/env.d.ts` for the full list)

- `ANSIVERSA_AUTH_SECRET`
- `ANSIVERSA_SESSION_SECRET`
- `ANSIVERSA_COOKIE_DOMAIN`
- `ASTRO_DB_REMOTE_URL`
- `ASTRO_DB_APP_TOKEN`
- `PUBLIC_ROOT_APP_URL` (optional)
- `PARENT_APP_URL` (optional)

Note: `ANSIVERSA_AUTH_SECRET` is reserved for future auth workflows (not used in this starter yet).

3) Run the app

```
npm run dev
```

## Commands

- `npm run dev`
- `npm run typecheck` (Astro check)
- `npm run build --remote`

## Example module

Example Items live under `src/modules/example-items/` with routes at:

- `/items`
- `/items/[id]`
- `/admin/items`

Delete `src/modules/example-items/` and these routes when starting a real app.

## Starting a new mini-app

1) Clone this repo.
2) Remove the Example Items module and routes.
3) Add your domain tables/actions/pages.
4) Keep shared shells + middleware patterns unchanged.

### Must keep (standards)

- `src/layouts/AppShell.astro` and `src/layouts/AppAdminShell.astro`
- `src/middleware.ts` auth guard + admin role gate
- AppShell unread notifications fetch (`/api/notifications/unread-count`)
- One global Alpine store pattern (`src/alpine.ts`)

---

Ansiversa motto: Make it simple — but not simpler.
