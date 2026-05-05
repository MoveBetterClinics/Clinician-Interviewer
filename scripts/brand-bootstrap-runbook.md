# Brand Bootstrap Runbook

Living checklist for standing up a new NarrateRx brand deployment. This file
is the source data for `scripts/bootstrap-brand.js` (queued — see
`memory/project_brand_bootstrap_automation.md`). As each step is executed for
a real brand standup, capture the exact commands, dashboard paths, and gotchas
here so the script can later automate the parts that are automatable and
prompt cleanly for the parts that are not.

> **First test subject:** equine (Move Better Equine, May 2026). This file
> is being filled in *as* equine is being stood up. Steps marked _confirmed_
> have actually been run; everything else is from prior memory of how people
> and animals were set up — verify before trusting.

---

## Conventions

Each step is tagged:

- **[AUTO]** — script can do this end-to-end (no human in the loop).
- **[CLI]** — script can drive this with the user logged into a CLI.
- **[MANUAL]** — third-party dashboard step a human has to click through.
- **[VERIFY]** — read-only check the script can perform to confirm state.

Variables to substitute throughout: `<brand>` (e.g. `equine`), `<BRAND>`
(e.g. `EQUINE`), `<BrandName>` (e.g. `Move Better Equine`),
`<brand-domain>` (e.g. `movebetterequine.com`).

---

## 0. Prerequisites

Confirm before starting:

- [ ] Brand entry exists in [src/lib/brand.js](../src/lib/brand.js) under `BRANDS`
- [ ] Brand overlay directory `brands/<brand>/` exists with at minimum:
  - `CLAUDE.md`
  - `interviewContext.js` (can be a stub, but exports `formatPNWContextForPrompt`)
  - `topicSuggestions.js` (can re-export another brand's list initially)
  - `toneModifiers.js`
- [ ] Domain `<brand-domain>` is registered and DNS is controllable

> **[VERIFY]** the script can grep `src/lib/brand.js` for the brand id and
> `ls brands/<brand>/` to confirm overlay shape before doing anything else.

---

## 1. Supabase project

Each brand gets its own Supabase project — never share databases across
brands. (Architectural rule: see `memory/feedback_brand_context_per_branch.md`.)

### 1a. Create project — **[MANUAL]**

1. Go to https://supabase.com/dashboard → **New project**
2. Name: `narraterx-<brand>` (e.g. `narraterx-equine`)
3. Region: pick closest to the brand's audience (West US for PNW brands)
4. Save the database password somewhere durable — it is not recoverable

**Captured for equine:** _TBD_

### 1b. Apply migrations — **[CLI]**

The `supabase/` dir contains numbered migrations. Apply all of them in order:

```
supabase/000_initial_schema.sql
supabase/001_content_items.sql
supabase/002_add_tone_to_interviews.sql
supabase/003_add_target_locations.sql
supabase/004_add_voice_mode_to_interviews.sql
```

Easiest path: paste each into the Supabase SQL editor (Database → SQL editor →
New query → run). Faster path if `supabase` CLI is installed:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

> **Script note:** `supabase db push` requires the linked project ref and
> the database password. Bootstrap script should prompt for both, then call
> push, then `psql` to verify the expected tables exist.

### 1c. Capture API credentials — **[MANUAL]**

In Supabase dashboard → **Settings → API**:

- Copy the **Project URL** → will be set as `SUPABASE_URL`
- Copy the **secret API key** (`sb_secret_*` format on new projects, or
  `service_role` JWT on legacy projects) → will be set as `SUPABASE_SERVICE_KEY`

> **Why secret/service-role and not publishable/anon:** the API routes in
> `api/` run server-side on Vercel and need RLS-bypassing access. Browser
> code never reads Supabase directly — it goes through `/api/*` routes.
>
> **New `sb_secret_*` keys work fine** with our codebase because the API
> handlers hit PostgREST directly via `fetch` with `apikey:` and
> `Authorization: Bearer` headers (see [api/db/interviews.js](../api/db/interviews.js)).
> PostgREST accepts both the legacy JWT and new key formats. Equine
> (May 2026) used the new format — first brand to do so.

**Captured for equine (May 2026):** new-format key (`sb_secret_…EjzUd`)
worked end-to-end; HTTP 200 + `[]` on the smoke-test query.

---

## 2. Clerk auth app

Each brand also gets its own Clerk app, even when two brands share a Workspace
auth domain (animals shares `movebetter.co` with people but has its own Clerk
app for separate user lists / sessions).

### 2a. Create application — **[MANUAL]**

1. Go to https://dashboard.clerk.com → **Create application**
2. Name: `NarrateRx <BrandName>` (e.g. `NarrateRx Move Better Equine`)
3. Sign-in methods: enable Google as the primary. The brand's
   `authDomain` in `src/lib/brand.js` controls which domain restrictions to
   set in Clerk's "Restrict sign-up" feature once the brand is live.

### 2b. Capture publishable key — **[MANUAL]**

In Clerk dashboard → **API Keys**:

- Copy the **Publishable key** (starts with `pk_live_` for production) → set
  as `VITE_CLERK_PUBLISHABLE_KEY` on Vercel.

> Note: `CLERK_SECRET_KEY` is **not** referenced by the codebase as of the
> May 2026 audit. If a future feature adds a Clerk server SDK call, this
> step needs updating.

**Captured for equine:** _TBD_

---

## 3. Vercel project

### 3a. Create project — **[CLI]** (preferred) or **[MANUAL]**

CLI path (requires `npx vercel login` first):

```bash
npx vercel link --yes --project narraterx-<brand> --scope movebetter
```

If the project does not yet exist, create it via the dashboard:

1. https://vercel.com/movebetter → **Add new… → Project**
2. Import the `MoveBetterClinics/NarrateRx` repo
3. Project name: `narraterx-<brand>` (e.g. `narraterx-equine`)
4. Framework preset: Vite (auto-detected)
5. Root directory: `./` (default)
6. **Production branch: `main`** (single-trunk model — see
   `memory/project_multibrand_cascade.md`)
7. Click **Deploy** (it will fail due to missing env vars — that's expected)

**Captured for equine:** _TBD_

### 3b. Set env vars — **[CLI]**

Required for a minimum-viable deploy (no social, no GBP, no Drive):

| Var | Scope | Value |
|---|---|---|
| `VITE_BRAND` | All | `<brand>` |
| `BRAND` | All | `<brand>` |
| `BRAND_URL` | All | `https://<brand-domain>/` |
| `VITE_CLERK_PUBLISHABLE_KEY` | All | from §2b |
| `SUPABASE_URL` | All | from §1c |
| `SUPABASE_SERVICE_KEY` | All | from §1c |
| `ANTHROPIC_API_KEY` | All | shared org key |
| `CRON_SECRET` | All | `openssl rand -hex 32` |

CLI form:

```bash
npx vercel env add VITE_BRAND production
# (paste value when prompted; repeat for preview, development if desired)
```

> **Script note:** `vercel env add` reads from stdin only (no `--value`
> flag). Bootstrap script should pipe values in or use the Vercel REST API
> via `Authorization: Bearer $VERCEL_TOKEN` for non-interactive setup.

Optional / deferrable env vars (skip on first deploy, add later as features
come online):

| Var | When needed |
|---|---|
| `BUFFER_ACCESS_TOKEN` | Buffer social publishing |
| `FACEBOOK_PAGE_ID`, `FACEBOOK_PAGE_TOKEN` | Facebook direct publishing |
| `GBP_ACCOUNT_ID`, `GBP_LOCATION_IDS`, `GBP_LOCATION_NAMES` | Google Business Profile queue |
| `GOOGLE_DRIVE_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_KEY` | Drive integration |
| `NARRATERX_PUBLISH_SECRET`, `WEBSITE_PUBLISH_URL` | Direct website publishing — Astro mode (animals: `https://www.movebetteranimal.co/api/publish`) |
| `WORDPRESS_USER`, `WORDPRESS_APP_PASSWORD`, `WEBSITE_PUBLISH_URL` | Direct website publishing — WordPress mode (equine: `https://movebetterequine.com/wp-json/wp/v2/posts`). User generates the App Password from `WP Admin → Users → Application Passwords` |

### 3c. Trigger first deploy — **[CLI]**

```bash
npx vercel --prod
```

Or push any commit to `main` and let the Git integration deploy. First
deploy may take 2–3 minutes.

**Captured for equine:** _TBD_

### 3d. Smoke-test — **[VERIFY]**

```bash
curl -sI https://narraterx-<brand>.vercel.app | head -3
curl -s https://narraterx-<brand>.vercel.app/api/cron/publish-due \
  -H "Authorization: Bearer $CRON_SECRET" | head -5
```

Expected: 200 from the root, 200/empty-array from the cron endpoint, sign-in
redirect when visiting in a browser.

---

## 4. Domain wiring — **SKIP**

**Established rule (May 2026, confirmed across all three brands):** NarrateRx
admin tools do NOT get custom domains. They live on the `*.vercel.app`
auto-domain — that's the standard for this product, not a workaround.

| Brand | Admin URL |
|---|---|
| people | `clinician-interviewer.vercel.app` |
| animals | `narraterx-animals.vercel.app` |
| equine | `narraterx-equine.vercel.app` |

The brand's own `<brand-domain>` is the **public marketing site**, hosted
separately (e.g. WordPress on Bluehost). Pointing any record at the
admin tool would risk clobbering the marketing site or breaking email.
**No subdomain either** — admins find the tool via bookmark / docs, not
DNS.

The bootstrap script should not prompt for a custom domain. If a future
brand explicitly needs one, treat it as an exception and revisit this
section.

> Lesson from equine (May 2026): the agent initially proposed adding the
> apex + www to Vercel, did so, then caught that `movebetterequine.com`
> was a live WordPress marketing site at Bluehost with active MX records.
> Rolled back both domain additions cleanly via `vercel domains rm` —
> nothing actually broke because no DNS records had been changed yet.
> Gate this whole section behind an explicit user opt-in.

---

## 5. Optional integrations

Defer until Whitney / the brand owner is ready to use the feature.

### 5a. Buffer / Facebook social publishing
- Requires Buffer and Facebook Page tokens. See
  `memory/project_engagement_api_access.md` for the access matrix and
  current approval status.

### 5b. Google Business Profile
- Already-running per-brand checklist documented in
  `memory/project_gbp_queue_rollout.md`. Requires `CRON_SECRET` (set in §3b)
  and the GBP env vars from §3b's deferred list.

### 5c. Google Drive (image library, asset sync)
- Service account lives under MB Admin Account (see
  `memory/reference_google_cloud_account.md`). Add the service account
  email to the brand's Drive folder, then set the three `GOOGLE_*` env vars.

### 5d. TrustDrivenCare email template
- Author the brand variant of the master template in TDC, export HTML,
  replace `src/email-template.html` is the people pattern but currently the
  template is shared. Per-brand template selection would be a code change.

### 5e. Website publish integration
- Only applicable when the receiving website is ready. Set
  `capabilities.websitePublish: true` in `src/lib/brand.js`, then add the
  appropriate env-var set on the brand's Vercel project depending on the site's
  platform:
  - **Astro on Vercel + GitHub** (animals reference — see
    `memory/project_website_publish_animals.md`): `NARRATERX_PUBLISH_SECRET` +
    `WEBSITE_PUBLISH_URL` (the receiving site's `/api/publish` webhook).
  - **WordPress** (equine reference, May 2026): `WORDPRESS_USER` +
    `WORDPRESS_APP_PASSWORD` + `WEBSITE_PUBLISH_URL` pointed at
    `<host>/wp-json/wp/v2/posts`. The App Password is generated from
    `WP Admin → Users → (your user) → Application Passwords → New Application
    Password` and pasted into the Vercel dashboard (sensitive — do not paste in
    chat or commit). The serverless function auto-detects WP mode by the
    presence of `WORDPRESS_USER` + `WORDPRESS_APP_PASSWORD`.

---

## 6. Final verification — **[VERIFY]**

- [ ] Sign-in flow works end-to-end with a test Google account
- [ ] Dashboard loads with empty state (no clinicians yet)
- [ ] New Interview → topic chips show **brand-appropriate** suggestions
      (the equine deployment must NOT show "trail running injuries" — if it
      does, `@brand-overlay/topicSuggestions` resolution is broken)
- [ ] Create one interview, complete it, generate a blog post end-to-end
- [ ] PostPreview renders without console errors

---

## Captured equine values (May 2026 standup)

```
PRODUCTION_URL          = https://narraterx-equine.vercel.app (alias)
                          https://narraterx-equine-4vozyaf6h-movebetter.vercel.app (deploy id)
VERCEL_PROJECT_ID       = movebetter/narraterx-equine
SUPABASE_PROJECT_REF    = poczwupqfmvyzphvifwn
SUPABASE_KEY_FORMAT     = sb_secret_* (new format, suffix EjzUd)
CLERK_KEY_TIER          = pk_test_* (test mode — flip to pk_live_* before going live)
CRON_SECRET             = generated locally (suffix c1ef)
DOMAIN_STATUS           = not-started (movebetterequine.com still needs §4)
```

---

## Lessons from the equine standup (May 2026)

Captured during the first run-through of this runbook. Feed these into
`scripts/bootstrap-brand.js` when distilling.

### What worked
- **Vercel CLI auth-once-then-driven-by-script** was the right call. After a
  one-time `npx vercel login` from the user's own terminal, every subsequent
  step (`vercel link`, `vercel env add`, `vercel --prod`) ran cleanly from
  inside the agent shell against the user's account.
- **Direct REST probe to Supabase** (`curl /rest/v1/clinicians?limit=1`) was
  the fastest way to confirm both that migrations applied AND that the
  service key worked AND that RLS was being bypassed correctly — three
  checks in one HTTP round-trip. Bake this verifier into the script.
- **Inlining migration SQL into chat** so the user could paste each one into
  the Supabase SQL editor was faster than installing the Supabase CLI.
  All 5 migrations (~115 lines total) ran green on first paste. Worth
  keeping the SQL-editor flow in the script as a fallback even after we add
  CLI-based migration apply.

### Gotchas to handle in the script

1. **CLI loop drops the `preview` scope silently.** Running
   `vercel env add VAR <env>` in a `for env in production preview development`
   loop reliably set Production + Development but skipped Preview every time.
   Output was indistinguishable from success (`vercel env pull` hint
   appeared as the last line). The script should set each scope as a
   separate explicit call and verify with `vercel env ls` after each one,
   not trust loop exit codes.

2. **Supabase rolled out new key format** (`sb_publishable_*` /
   `sb_secret_*`) — projects created May 2026+ default to the new tab.
   The legacy `service_role` JWT is still available under "Legacy anon,
   service_role API keys" but is no longer the default UI. Our PostgREST
   pattern works with both, so prefer the new format for new brands but
   tolerate either in the script.

3. **Clerk app creation has no public API.** Application creation is
   dashboard-only — every brand needs a manual stop in the Clerk
   dashboard. The script can prompt-and-pause here cleanly.

4. **Test-mode Clerk keys (`pk_test_*`) flag in agent harnesses.** When
   the script writes a `pk_test_*` key into a Production scope env var,
   sandboxed agents may flag it as a security concern. The script should
   detect the prefix and either (a) explicitly confirm with the user, or
   (b) only set test keys in Preview/Development by default and prompt
   for a `pk_live_*` for Production. Equine accepted the test key with
   explicit user opt-in for the first deploy.

5. **`ANTHROPIC_API_KEY` write was sandbox-flagged** even though the
   user had explicitly pasted it. Live API keys for paid services can
   trip auto-mode protections. The script should either pre-warn the
   user that this step requires a confirmation prompt, or fall back to
   "user pastes into Vercel dashboard manually" without retrying.

6. **Supabase GitHub + Vercel integrations don't fit our shape** —
   skipped both for equine (May 2026). GitHub integration expects
   `supabase/migrations/<timestamp>_name.sql` layout (we use flat
   `supabase/000_*.sql`); Vercel integration uses Next.js env naming
   (`NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_ANON_KEY`) where we use
   `SUPABASE_URL` / `SUPABASE_SERVICE_KEY`. If we ever migrate to the
   canonical Supabase layout, GitHub integration becomes worth revisiting.
   The script should default to disabling both and explain why.

### Time taken (equine, May 2026)

About 90 minutes wall-clock from "let's wire up Vercel" to "deploy live and
smoke-tested." Dominant costs were:
- Waiting on user to create Supabase + Clerk projects (~25 min)
- Waiting on user to paste 5 migrations one-by-one (~10 min)
- Sandbox flag detours (~5 min)
- Actual env-var + deploy mechanics (~15 min)
- Research / verification / runbook capture (~35 min)

Realistic target for the scripted version: **20–25 min** per brand, of which
~15 min is unavoidable user time in the Supabase + Clerk dashboards.

---

## Distillation checklist (after equine ships)

When the equine standup is verified working, before closing this session:

- [x] Note any step that took longer than its time estimate (60 min total target)
- [x] Note any step that surprised you (a click was missing, a flag was off, etc.)
- [x] Note which **[MANUAL]** steps could be **[CLI]** with a Vercel/Supabase API call
- [ ] Open follow-up to convert this file into `scripts/bootstrap-brand.js`,
      with prompts for the **[MANUAL]** steps and direct API calls for the rest
