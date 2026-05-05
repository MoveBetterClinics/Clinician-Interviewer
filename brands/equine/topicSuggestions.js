/**
 * Move Better Equine topic-suggestion overlay.
 *
 * Placeholder — re-exports the people overlay until equine-specific topic
 * chips (sport-horse vs. trail / pleasure / dressage discipline angles,
 * subtle-signs vocabulary, owner-vs-trainer search terms, etc.) are
 * authored. The equine deployment is currently inactive (retained for
 * future activation), so serving the people list keeps the New Interview
 * screen functional without leaking horse-specific assumptions into
 * unauthored content.
 *
 * Mirrors the export shape so `@brand-overlay/topicSuggestions` consumers
 * stay brand-agnostic.
 */

export { TOPIC_SUGGESTIONS, getSuggestedTopics } from '../people/topicSuggestions.js'
