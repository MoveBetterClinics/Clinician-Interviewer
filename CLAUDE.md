# Move Better Equine — Project Notes

## Session Focus
At the start of EVERY new conversation, before doing anything else, ask:
"What are we working on today?" then confirm it fits one of these session types:

- **Planning / Architecture** — decisions, structure, roadmap
- **Feature: [name]** — building one specific feature end to end
- **Prompts** — writing or tuning AI prompts
- **Debug: [issue]** — one specific problem

If the work drifts into a second unrelated area mid-session, name it and suggest: "That's a good next session — want to note it and come back to it?"

## Brand
This is the **equine chiropractic** brand (Move Better Equine). Separate business entity from Move Better People.
- Clinician: Dr. Whitney Phillips
- Service area: Southwest Washington and Greater Portland, Oregon
- Service model: Mobile on-site at farms and barns (~30 min per horse); haul-in to Ridgefield, WA
- Tagline: "Restoring Movement, Balance, and Comfort for Horses"
- Audience: Horse owners (recreational to high-performance), trainers, equestrian professionals
- Core message: Movement as a system — joint function, posture, gait — not isolated symptoms
- Always positioned as complementary to veterinary care, never a replacement

There are two sibling projects — Move Better People (human) and Move Better Animal Chiropractic — which share this codebase but deploy separately. Do not mix brand-specific content, credentials, or data between projects.

## Key Conditions & Language
Horse hotspots: poll/neck, shoulders/withers, thoracic back, lumbar/loin, hips/pelvis.
Behavioral indicators: lead refusal, tail swishing, bit grinding, reluctance to move forward, bucking.
Tone: evidence-informed, systems-based, education-forward. "Subtle signs" not crisis language.

## GitHub
Always use the GitHub CLI (`gh`) for all GitHub interactions. This worktree is on the `equine` branch.
Shared remote: https://github.com/MoveBetterClinics/Move-Better-People

To pull core improvements from main into this branch:
```bash
git fetch origin && git merge origin/main
```

## Email Template
Same TrustDrivenCare template as Move Better People — see the main branch CLAUDE.md for merge tag details.
