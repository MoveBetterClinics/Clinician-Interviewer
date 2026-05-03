// Few-shot exemplars for engagement-driven content adaptation.
//
// Approach: instead of encoding "what works" into discrete axes and learning
// weights (the rejected treatment-bandit design), we just show the LLM
// examples of past posts that performed well and let it pattern-match.
// LLMs are exceptionally good at imitation from examples; this scales with
// far less data than a multi-axis bandit and discovers patterns we wouldn't
// have thought to encode.
//
// The fetch implementation queries content_items joined to engagement_snapshots,
// computes engagement_rate per post relative to that platform's median, and
// returns the top N. Cross-platform fallback: if the requested platform has
// no qualifying posts, return top performers from any platform on the same
// topic — that's how non-API platforms (linkedin / gbp / email) automatically
// inherit from API-tracked platforms (facebook / instagram / blog via GA4)
// once ingest crons start populating snapshots.
//
// Cold start: no engagement data yet → returns []. The exemplars block in
// prompts.js renders empty and the prompt behaves identically to the
// pre-feedback-loop baseline.

async function apiFetch(path, init = {}) {
  const res = await fetch(path, init)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || `Request failed: ${res.status}`)
  return json
}

// Fetch the top-performing past posts to use as exemplars when generating new
// content. Returns [] when no engagement data is available — caller should
// pass the empty array straight through to the prompt builder.
//
// Server endpoint: api/db/exemplars.js (not yet implemented — gated on
// engagement ingest, which is gated on Meta App Review / GA4 service account
// work; see project_engagement_api_access.md). Until that endpoint exists
// this function returns [] without making a network call.
export async function fetchTopExemplars({ platform, topic, limit = 3 } = {}) {
  // TODO: when engagement ingest is wired, replace with:
  //   const params = new URLSearchParams({ platform, topic, limit: String(limit) })
  //   return apiFetch(`/api/db/exemplars?${params}`)
  void platform; void topic; void limit
  return []
}
