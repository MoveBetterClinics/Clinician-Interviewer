/**
 * Topic-suggestion index. Selects the active brand's topic bank and
 * exposes the same public API the rest of the app already uses.
 *
 * Per-brand banks live in src/lib/topicBanks/<brandId>.js and export
 * TOPIC_SUGGESTIONS. Add a sibling entry here when a new brand
 * deployment is added.
 */

import { brand } from './brand'
import { TOPIC_SUGGESTIONS as HUMAN_TOPICS } from './topicBanks/human'
import { TOPIC_SUGGESTIONS as EQUINE_TOPICS } from './topicBanks/equine'

const BANKS = {
  human: HUMAN_TOPICS,
  equine: EQUINE_TOPICS,
}

export const TOPIC_SUGGESTIONS = BANKS[brand.id] || HUMAN_TOPICS

/**
 * Returns suggestions sorted by coverage gap:
 * uncovered high-priority topics first, then underrepresented ones.
 * existingTopics: array of topic strings from actual interviews in Supabase.
 */
export function getSuggestedTopics(existingTopics = []) {
  const normalized = existingTopics.map((t) => t.toLowerCase())

  function coverageCount(suggestion) {
    return normalized.filter((t) =>
      suggestion.keywords.some((k) => t.includes(k.toLowerCase()))
    ).length
  }

  const priorityRank = { high: 3, medium: 2, low: 1 }

  return TOPIC_SUGGESTIONS.map((s) => ({
    ...s,
    interviewCount: coverageCount(s),
  })).sort((a, b) => {
    // Uncovered beats covered
    if (a.interviewCount === 0 && b.interviewCount > 0) return -1
    if (a.interviewCount > 0 && b.interviewCount === 0) return 1
    // Among same coverage status, higher priority first
    const pd = priorityRank[b.priority] - priorityRank[a.priority]
    if (pd !== 0) return pd
    // Fewest interviews first (needs more content)
    return a.interviewCount - b.interviewCount
  })
}
