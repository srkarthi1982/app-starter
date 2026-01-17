# Ansiversa App Starter

This repo is the official starter template for Ansiversa mini-apps. It contains the standard
middleware auth guard, shared AppShell/AppAdminShell layouts, unread notifications badge wiring,
and a small Example Items module that demonstrates end-to-end CRUD.

## Freeze status

Starter Freeze Jan-17-2026 (locked baseline).

## Quick start

1) Install dependencies

```
npm ci
```

2) Configure env vars (see `src/env.d.ts` for the full list)

- `ANSIVERSA_AUTH_SECRET`
- `ANSIVERSA_SESSION_SECRET`
- `ANSIVERSA_COOKIE_DOMAIN`
- `PUBLIC_ROOT_APP_URL` (optional)
- `PARENT_APP_URL` (optional)

Note: `ANSIVERSA_AUTH_SECRET` is reserved for future auth workflows (not used in this starter yet).

3) Run the app

```
npm run dev
```

## Local dev without parent app

If you do not have the parent app session cookie, you can enable a DEV-only auth bypass
to inject a dummy session during local development:

```
DEV_BYPASS_AUTH=true npm run dev
```

Optional overrides (defaults shown):

```
DEV_BYPASS_USER_ID=dev-user
DEV_BYPASS_EMAIL=dev@local
DEV_BYPASS_ROLE_ID=1
```

⚠️ This bypass only works in local development (import.meta.env.DEV) and is ignored in
production builds.

## Commands

- `npm run dev`
- `npm run dev:remote`
- `npm run typecheck` (Astro check)
- `npm run build`
- `npm run build:remote`
- `npm run db:push:local`

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
