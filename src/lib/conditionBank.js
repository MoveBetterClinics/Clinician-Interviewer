/**
 * Condition-bank index. Selects the active brand's bank and exposes
 * brand-neutral lookup + prompt-formatting helpers.
 *
 * Each per-brand bank lives in src/lib/conditionBanks/<brandId>.js and
 * exports CONDITION_BANK, KEYWORD_MAP, and FALLBACK. Add a sibling entry
 * here when a new brand deployment is added.
 */

import { brand } from './brand'
import * as humanBank from './conditionBanks/human'
import * as equineBank from './conditionBanks/equine'

const BANKS = {
  human: humanBank,
  equine: equineBank,
}

const active = BANKS[brand.id] || humanBank

/**
 * Returns the most relevant context block for a given condition string.
 * Does an exact match against the bank, then falls back to a fuzzy
 * keyword search, then to the brand's generic FALLBACK.
 */
export function getConditionContext(condition) {
  const lower = String(condition || '').toLowerCase()

  if (active.CONDITION_BANK[lower]) return active.CONDITION_BANK[lower]

  for (const [keyword, key] of Object.entries(active.KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      const entry = active.CONDITION_BANK[key]
      if (entry) return entry
    }
  }

  return active.FALLBACK
}

/**
 * Formats the active brand's condition context into a string block ready
 * to inject into a system prompt. Headers and labels are brand-neutral so
 * the same formatter works for human, equine, and future brands.
 *
 * Includes a chronic-vs-acute angle only for entries flagged
 * chronicRelevant: true.
 */
export function formatConditionContextForPrompt(condition) {
  const ctx = getConditionContext(condition)

  return `
AUDIENCE CONTEXT FOR THIS CONDITION — use this to shape your questions:
- Who's affected: ${ctx.subjectProfile}
- What's at stake for them: ${ctx.stakes}
- Regional angles that resonate locally:
${ctx.regionalAngles.map((a) => `  • ${a}`).join('\n')}
- Key interview areas specific to this condition and audience:
${ctx.interviewTopics.map((q) => `  • ${q}`).join('\n')}
${ctx.chronicRelevant ? `
CHRONIC VS. ACUTE ANGLE — explore this when it fits naturally:
${condition} often presents as a long-standing issue rather than a fresh injury or acute event. Where relevant, draw out:
  • How does treating chronic ${condition} differ from a fresh case?
  • Why do those affected often exhaust other options before finding lasting relief?
  • What does the ${brand.name} approach offer in chronic cases that other care has missed?
  • What does recovery realistically look like over time — and how do you set expectations?
` : ''}`
}
