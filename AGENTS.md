⚠️ Mandatory: AI agents must read this file before writing or modifying any code.

MANDATORY: After completing each task, update this repo’s AGENTS.md Task Log (newest-first) before marking the task done.
This file complements the workspace-level Ansiversa-workspace/AGENTS.md (source of truth). Read workspace first.

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

- 2026-02-02 Corrected notifications payload contract and tightened billing/webhook/unread-count rules in APPSTARTER-INTEGRATIONS.md.
- 2026-02-02 Updated APPSTARTER-INTEGRATIONS.md with bootstrap rules, contracts, cleanup, and checklist clarifications.
- 2026-02-01 Added `/help` page and wired Help link into the mini-app menu.
- 2026-02-01 Implemented AppStarter core integrations (requirePro, paywall pattern, dashboard + notification webhooks, safe auth redirects, summary schema).
- 2026-02-01 Added APPSTARTER-INTEGRATIONS.md checklist in repo root.
- 2026-01-31 Normalized payment fields in `Astro.locals.user` to avoid undefined values (stripeCustomerId/plan/planStatus/isPaid/renewalAt).
- 2026-01-31 Added locals.session payment flags in middleware/types and a temporary `/admin/session` debug page for Phase 2 verification.
- 2026-01-29 Added parent notification helper and demo item-created notification in example flow.

- 2026-01-28 Added app-starter mini-app links (Home, Items) and bumped @ansiversa/components to ^0.0.119.
- 2026-01-28 Added local/remote dev+build scripts for dual DB mode support.
- 2026-01-25 Updated README to match standardized file-based remote DB workflow and db:push command.
- 2026-01-25 Added missing .env for local dev defaults (auth secrets + dev bypass values).
- 2026-01-25 Standardized Astro DB scripts: we intentionally run file-based remote mode locally; use `npm run db:push` for schema push.
- 2026-01-17 Expanded README with mental model, first-run checklist, and standards framing.
- 2026-01-17 Added DEV_BYPASS_AUTH env defaults to enable local dummy session.
- 2026-01-17 Expanded public routes/static allowlist and simplified admin role check in middleware.
- 2026-01-17 Added DEV_BYPASS_AUTH dummy session injection for community development.
- 2026-01-17 Added freeze note to README and AGENTS (Starter Freeze Jan-17-2026).
- 2026-01-17 Fixed typecheck errors by tightening auth guard typing and SSR items typing.
- 2026-01-17 Updated admin items description and README command list for current scripts.
- 2026-01-17 Removed unused user sort branches and required cookie domain in prod.
- 2026-01-17 Aligned env typing and admin items copy with standards; enforced prod session secret check.
- 2026-01-17 Rebuilt admin landing to match web layout with a single Items card.
- 2026-01-17 Switched dev/build to persistent local DB using file-based remote mode; added db push script.
- 2026-01-17 Set admin items pagination to 10 per page.
- 2026-01-17 Tightened /items breadcrumb spacing using existing crumb styles.
- 2026-01-17 Added breadcrumb to /items SSR page.
- 2026-01-17 Made /items page read-only SSR list (removed create/update/delete UI).
- 2026-01-17 Exported adminCreateItem action to fix admin item creation.
- 2026-01-17 Added admin items create/edit drawer, user-name display, and per-user filtering to mirror roles page behavior.
- 2026-01-17 Added sorting and toolbar actions on admin items to match roles page.
- 2026-01-17 Aligned admin items page layout with web roles pattern (toolbar, empty state, pager, confirm dialog).
- 2026-01-17 Switched local dev/build scripts to non-remote Astro DB; added remote scripts.
- 2026-01-17 Verified local Astro DB via shell; created ExampleItem table and inserted a test row.
- 2026-01-17 Removed remote Astro DB credentials to use local DB defaults.
- 2026-01-16 App-starter rebuilt from quiz golden base; example CRUD module added; README/AGENTS updated.
- 2026-01-16 AppShell now calls local notification proxy; env docs updated with PARENT_APP_URL and auth secret note.
- 2026-01-26 Fixed Astro DB scripts overriding remote envs by removing hardcoded ASTRO_DB_REMOTE_URL; added .env.example guidance and ignored .env.local/.env.*.local so Vercel uses env vars.
- 2026-01-26 Bumped @ansiversa/components to ^0.0.117 to align with latest resume schema (declaration field).
- 2026-01-26 Added APP_KEY config and wired miniAppKey into AppShell to show AvMiniAppBar; bumped @ansiversa/components to ^0.0.118.
- 2026-01-26 Added local ASTRO_DB_REMOTE_URL (file:.astro/content.db) in .env to fix ActionsCantBeLoaded for local dev; no repo config changes.

## Verification Log

- 2026-02-01 `npm run typecheck` (pass; 6 hints in redirect pages/baseRepository).
- 2026-02-01 `npm run build` (pass).
- 2026-01-31 Pending manual check: paid user sees non-null fields; free user sees null/false in `Astro.locals.user`.
- 2026-01-31 Pending manual check: `/admin/session` shows isPaid true for paid user and false for free user.
- 2026-01-29 `npm run typecheck` (pass; 1 hint in baseRepository).
- 2026-01-29 `npm run build` (pass).
- 2026-01-29 Smoke test: not run (manual create item).

---

## Verification Checklist (Template)

- [ ] Auth locals normalized
- [ ] Billing flags present
- [ ] `requirePro` guard works
- [ ] Paywall UI pattern present
- [ ] Dashboard webhook push works
- [ ] Notifications helper wired
- [ ] Admin guard works
- [ ] Layout + `global.css` correct
- [ ] Webhook timeouts + retries documented
- [ ] Build/typecheck green

## Task Log (Recent)
- 2026-03-01 Live-app shared UI sync: upgraded `@ansiversa/components` to `^0.0.163` (or confirmed already aligned in `web`) and refreshed install state for this repo. Verification: `npm run build` ✅.
- Keep newest first; include date and short summary.
- 2026-02-27 Middleware Standard V1 seed rollout: standardized middleware to config-driven template using `src/lib/middlewareConfig.ts` + shared `src/middleware.ts` (static asset bypass invariants, production `ANSIVERSA_COOKIE_DOMAIN` enforcement, normalized auth flow order, safe numeric admin-role gate, DEV-only bypass semantics). App-starter now serves as canonical seed with behavior preserved (`protectMost`, current public auth routes, `/api/faqs.json` bypass). Updated `.env.example` with required routing vars and standardized `DEV_BYPASS_*` contract. Verification: `npm run typecheck` ✅, `npm run build` ✅.
- 2026-02-27 Footer parent-origin rollout: bumped `@ansiversa/components` to `0.0.149` (lockfile refreshed) to consume shared footer absolute-parent links for Terms/Privacy/FAQ/Contact (`https://ansiversa.com/...` in prod, configurable locally via `PUBLIC_ANSIVERSA_PARENT_ORIGIN`). Verification: `npm run build` ✅.
- 2026-02-22 FAQ content refresh (production): replaced placeholder/demo FAQ entries with real App Starter user FAQs (5) via `db/seed-faq-content.ts` using audience=`user`, published entries, and stable sort order; aligned content with current App Starter V1 behavior and ecosystem FAQ contract.
- 2026-02-22 Mini-app navbar home-link rollout: upgraded `@ansiversa/components` to `0.0.145` so `AvMiniAppBar` app title/icon area is clickable and navigates to mini-app home (`links[0].href`, fallback `/`) with accessible aria-label + focus-visible state; verified no behavior changes to 3-dot menu. Verification: `npm run build` ✅.
- 2026-02-22 FAQ shared rollout: upgraded `@ansiversa/components` to `0.0.144` (shared `FaqManager` now includes debounced search + icon actions + no numeric order UI + no sort-order input), and updated `src/pages/api/admin/faqs.json.ts` GET to support `q` filtering across question/category/audience while preserving audience filter and existing CRUD/reorder behavior. Verification: `npm run build` ✅.
- 2026-02-22 Fix: admin item delete confirmation now renders selected title reliably by setting `AvConfirmDialog` title text at click-time before `AvDialog.open(...)`, resolving static `headline` prop limitation for dynamic Alpine bindings.
- 2026-02-22 UX polish: admin items delete confirmation dialog now includes the selected item title using `AvConfirmDialog` dynamic headline with fallback `Delete this item?`; delete behavior unchanged.
- 2026-02-22 Bookmarks V1 hardening: added `scripts/apply-bookmark-triggers.ts` using `@libsql/client` (`TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN`) and wired `db:triggers` + `postdb:push`; applied trigger `bookmark_cleanup_example_item_delete` (`ExampleItem` -> `Bookmark` cleanup for `entityType='item'`). Verification (using Vercel production env pulled to `.env.vercel.production`): `npm run db:push` ✅, `npm run db:triggers` ✅, trigger query (`sqlite_master`) ✅, `npm run typecheck` ✅, `npm run build` ✅. Production checklist: pending manual smoke (delete bookmarked item -> bookmark row auto-removed -> `/bookmarks` no orphan card).
- 2026-02-21 App Starter Bookmarks V1 shipped (item): added DB `Bookmark` table + indexes/unique and wired DB config; added bookmark actions (`listItemBookmarks`/`toggleBookmark`) and exposed in `exampleItems` actions namespace; added example-items store bookmark Set with `initBookmarks`, `isBookmarked`, and optimistic `toggleBookmarkItem`; added `AvBookmarkButton` on `/items` cards; added protected `/bookmarks` page using `AvBookmarksEmpty`/`AvBookmarksList`; enabled gated mini-app menu link via `bookmarksHref=\"/bookmarks\"`; bumped `@ansiversa/components` to exact `0.0.142`. Verification: `npm run typecheck` ✅ (existing 6 hints), `npm run build` ✅, `npm run db:push` ❌ (`Cannot convert undefined or null to object` from drizzle `libsql/session.js` in current local `ASTRO_DB_REMOTE_URL=file:.astro/content.db` setup). Caveat: authenticated production smoke test not executed from CLI-only session.
- 2026-02-19 Bumped `@ansiversa/components` to `0.0.139` (AvMiniAppBar AppLogo support) and verified with `npm run build` (pass).
- 2026-02-19 Seeded FAQ V1 into app-starter by default: added `Faq` table to Astro DB schema/config, added public `GET /api/faqs.json` (published-only), added protected admin FAQ CRUD routes (`/api/admin/faqs.json`, `/api/admin/faqs/[id].json`) using `requireAdminApiAccess` (`SESSION_COOKIE_NAME` + optional bearer token + `verifySessionToken` + `roleId === 1`), added `/admin/faq` page using shared `<FaqManager />`, added FAQ card on `/admin`, allowed public `/api/faqs.json` in middleware, and pinned `@ansiversa/components` to `0.0.138`.
- 2026-02-14 Added canonical AI standard doc `docs/AI-INTEGRATION-STANDARD.md` for community developers (parent-gateway-only architecture, featureKey allowlist policy, AvAiAssist UI standard, mini-app proxy + canonical `https://www.ansiversa.com` production rule, V1 freeze scope, verification checklist), and added developer-facing discovery links on landing (`src/pages/index.astro`) plus docs routes (`src/pages/docs/index.astro`, `src/pages/docs/ai-integration.astro`) without changing mini-app user nav menus. Verification: `npm run typecheck` (pass; 0 errors, existing 6 hints), `npm run build` (pass). Manual check target: landing “Developer Docs” links open `/docs` and `/docs/ai-integration`.
- 2026-02-14 Upgraded `@ansiversa/components` to `^0.0.128` (lockfile resolved to `0.0.128`) and verified with `npm run typecheck` (pass; 0 errors, existing 6 hints).
- 2026-02-09 Enforced repo-level AGENTS mandatory task-log update rule for Codex/AI execution.
- 2026-02-09 Verified repo AGENTS contract linkage to workspace source-of-truth.
