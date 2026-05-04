# Move Better Animal Chiropractic — Project Notes

## Session Focus
At the start of EVERY new conversation, before doing anything else, ask:
"What are we working on today?" then confirm it fits one of these session types:

- **Planning / Architecture** — decisions, structure, roadmap
- **Feature: [name]** — building one specific feature end to end
- **Prompts** — writing or tuning AI prompts
- **Debug: [issue]** — one specific problem

If the work drifts into a second unrelated area mid-session, name it and suggest: "That's a good next session — want to note it and come back to it?"

## Brand
This is the **small animal chiropractic** brand (Move Better Animal Chiropractic).
- Species: Dogs, cats, and most small pets
- Audience: Pet owners
- Brand is new — website, social accounts, and visual identity are being built alongside this deployment
- Positioned as complementary to veterinary care, never a replacement

The underlying app is called **NarrateRx** — a multi-brand SaaS product. Move Better Animal Chiropractic, Move Better People, and Move Better Equine are all separate deployments of NarrateRx with their own brand configs, databases, and API keys. Do not mix brand-specific content, credentials, or data between deployments.

### Brand config
Brand-specific values (name, domain, location, social handles, prompt context, internal-link library, signature system, etc.) live in [src/lib/brand.js](src/lib/brand.js). The `ANIMALS` entry has not been authored yet (Phase 3 work — currently a placeholder comment in `BRANDS`). Once added, this deployment will select it via env vars on Vercel:

- `VITE_BRAND=animals` — read by browser code (Vite replaces at build time).
- `BRAND=animals` — read by Vercel serverless functions in `api/`. Must match `VITE_BRAND`.
- `BRAND_URL` — used by `api/publish/gbp.js` for the GBP "Book" call-to-action URL.

When adding a feature, never hardcode "Move Better," `movebetter.co`, "Portland," "patients/clinicians," or human/equine-specific assumptions in `src/`. Read those values from `brand` instead.

## Key Conditions & Language
Common conditions: intervertebral disc disease (IVDD), hip dysplasia, post-surgical recovery, mobility decline in senior pets, gait abnormalities, neck and back pain, limping without orthopedic cause.
Audience tone: warm, accessible, pet-owner-friendly. Education-forward without clinical jargon.

## GitHub
Always use the GitHub CLI (`gh`) for all GitHub interactions. This worktree is on the `animals` branch.
Shared remote: https://github.com/MoveBetterClinics/NarrateRx

To pull core improvements from main into this branch:
```bash
git fetch origin && git merge origin/people
```

## Email Template
Same TrustDrivenCare template as Move Better People — see the main branch CLAUDE.md for merge tag details.
