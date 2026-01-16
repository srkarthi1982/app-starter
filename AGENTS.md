⚠️ Mandatory: AI agents must read this file before writing or modifying any code in the app-starter repo.

# AGENTS.md
## App-Starter Repo – Session Notes (Codex)

This file records what was built/changed so far for the app-starter repo. Read first.

---

## 1. Current Architecture (App Starter)

- Astro mini-app starter aligned to Ansiversa standards.
- Auth handled by parent app JWT; middleware enforces auth.
- Shared layouts: `AppShell.astro` and `AppAdminShell.astro`.
- Notification unread count fetched in AppShell via parent API (SSR).
- One global Alpine store per app pattern.
 - Includes Example Items CRUD (user + admin) and a minimal starter landing.

---

## 2. Example Module (Deletable)

Example Items module is used to demonstrate CRUD + admin patterns:

- Module root: `src/modules/example-items/`
- Routes:
  - `/items`
  - `/items/[id]`
  - `/admin/items`

Delete this module and the routes when starting a real app.

---

## 3. DB Tables

Defined in `db/tables.ts`:

- `ExampleItem`

---

## 4. Task Log (Newest first)

- 2026-01-16 App-starter rebuilt from quiz golden base; example CRUD module added; README/AGENTS updated.
- 2026-01-16 AppShell now calls local notification proxy; env docs updated with PARENT_APP_URL and auth secret note.
