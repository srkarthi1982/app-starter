# AppStarter Integration Checklist (Ansiversa Standard)

This is the frozen ecosystem checklist for every new mini-app built from AppStarter.

Use this as the default verification list before launch. Keep it concise, consistent, and enforceable.

---

## A) Core integrations — Must-have (V1)

These **must** ship with AppStarter so every mini-app is platform-ready.

### 1) Auth + Session (Domain JWT)
- [ ] JWT cookie decode + verify
- [ ] `locals.user` normalized shape (no `undefined` fields)
- [ ] Safe `returnTo` redirect guard
- [ ] Signout clears cookies properly

### 2) Billing / Entitlements (Payments)
- [ ] `locals.user.isPaid`, `plan`, `planStatus`, `renewalAt`, `stripeCustomerId`
- [ ] `requirePro()` server guard → throws `PAYMENT_REQUIRED`
- [ ] Standard UI paywall pattern
  - [ ] Pro badge
  - [ ] Disabled state
  - [ ] Paywall panel + `/pricing` CTA

### 3) Dashboard Integration (Parent)
- [ ] Webhook helper to push activity + summary JSON
- [ ] Summary JSON versioning + sample schema
- [ ] “Push on key events” pattern

### 4) Notifications Integration (Parent-owned)
- [ ] Helper to emit notification events to parent
- [ ] Payload contract + example
- [ ] Parent owns UI rendering

### 5) Admin Guard (Role-based)
- [ ] `/admin` route guard using `roleId`
- [ ] Standard redirect for non-admin users

### 6) Shared Layout + UI Rules
- [ ] Enforced AppShell/Av layout usage
- [ ] `global.css` pattern for Tailwind compilation
- [ ] Av components + tokens only

### 7) Webhook hygiene (dashboard/notifications calls)
- [ ] Short timeout enforced
- [ ] Best-effort (non-blocking)
- [ ] Retry guidance (2–3 max with backoff)
- [ ] Log failures with `appId`

### 8) Versioning policy (minimum)
- [ ] Summary JSON versioned
- [ ] Schema change rule: bump version + maintain backward-compatible rendering in parent

---

## B) Platform hygiene — Optional (V2+)

These are recommended **drop-in modules** or guidance. Do not wire by default in V1.

### 9) Rate limiting / abuse protection
- [ ] Guidance for heavy endpoints (AI, search, exports)
- [ ] Basic throttling pattern (per user / per minute)

### 10) Error monitoring / centralized logging
- [ ] Optional Sentry (or internal) hook
- [ ] Consistent tags: `{ appId, userId?, action }`

### 11) Analytics / telemetry
- [ ] Event hook pattern: screen view + primary actions
- [ ] Privacy-first defaults

### 12) Privacy & compliance notes
- [ ] PII redaction rules for logs/webhooks
- [ ] No secrets in payloads

### 13) CORS / API access rules
- [ ] Default deny
- [ ] Allow only `ansiversa.com` / `*.ansiversa.com` if needed

### 14) Feature flags / rollout controls
- [ ] Enable/disable features by app or role
- [ ] Beta rollout guidance

### 15) File/asset storage integration
- [ ] Standard storage approach + URL policy
- [ ] Optional upload helper

### 16) Email / export integrations
- [ ] Standard export job or email hook
- [ ] Payload shape guidelines

---

## AGENTS.md Verification Template (copy/paste)

Use this block in every mini-app repo after you finish a task.

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
