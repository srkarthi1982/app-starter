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

---

Ansiversa motto: Make it simple — but not simpler.
