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

There are two sibling projects — Move Better People (human) and Move Better Equine — which share this codebase but deploy separately. Do not mix brand-specific content, credentials, or data between projects.

## Key Conditions & Language
Common conditions: intervertebral disc disease (IVDD), hip dysplasia, post-surgical recovery, mobility decline in senior pets, gait abnormalities, neck and back pain, limping without orthopedic cause.
Audience tone: warm, accessible, pet-owner-friendly. Education-forward without clinical jargon.

## GitHub
Always use the GitHub CLI (`gh`) for all GitHub interactions. This worktree is on the `animals` branch.
Shared remote: https://github.com/MoveBetterClinics/Move-Better-People

To pull core improvements from main into this branch:
```bash
git fetch origin && git merge origin/main
```

## Email Template
Same TrustDrivenCare template as Move Better People — see the main branch CLAUDE.md for merge tag details.
