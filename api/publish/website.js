export const config = { runtime: 'edge' }

// Publishes a generated blog post to the brand's marketing site via the site's
// POST /api/publish webhook. Currently wired for the ANIMALS brand →
// movebetteranimal.co. Contract: docs/api-publish-contract.md in the
// movebetteranimal repo.
//
// Required env vars:
//   NARRATERX_PUBLISH_SECRET  - shared bearer secret (matches the value set on
//                               the receiving site's Vercel project)
//   WEBSITE_PUBLISH_URL       - optional override; defaults to the animals site

const DEFAULT_PUBLISH_URL = 'https://www.movebetteranimal.co/api/publish'

const ok  = (data)              => new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
const err = (body, status = 400) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export default async function handler(req) {
  const secret = process.env.NARRATERX_PUBLISH_SECRET
  if (!secret) {
    return err({ error: 'not_configured', message: 'NARRATERX_PUBLISH_SECRET is not set on this NarrateRx deployment. Add it in Vercel env vars.' }, 503)
  }
  if (req.method !== 'POST') return err({ error: 'method_not_allowed', message: 'POST only' }, 405)

  let payload
  try {
    payload = await req.json()
  } catch {
    return err({ error: 'invalid_json', message: 'Request body is not valid JSON.' }, 400)
  }

  const required = ['slug', 'title', 'description', 'pubDate', 'markdown']
  const missing = required.filter((k) => !payload[k] || (typeof payload[k] === 'string' && !payload[k].trim()))
  if (missing.length) {
    return err({ error: 'invalid_payload', message: `Missing required field(s): ${missing.join(', ')}` }, 400)
  }

  const url = process.env.WEBSITE_PUBLISH_URL || DEFAULT_PUBLISH_URL

  const body = {
    slug:        payload.slug,
    title:       payload.title,
    description: payload.description,
    pubDate:     payload.pubDate,
    markdown:    payload.markdown,
  }
  if (payload.updatedDate)  body.updatedDate  = payload.updatedDate
  if (payload.author)       body.author       = payload.author
  if (payload.heroImage)    body.heroImage    = payload.heroImage
  if (payload.heroImageAlt) body.heroImageAlt = payload.heroImageAlt
  if (Array.isArray(payload.tags) && payload.tags.length) body.tags = payload.tags
  if (typeof payload.draft === 'boolean') body.draft = payload.draft

  let upstream
  try {
    upstream = await fetch(url, {
      method:  'POST',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
  } catch (e) {
    return err({ error: 'network_error', message: `Could not reach the website: ${e.message}` }, 502)
  }

  let data = {}
  try { data = await upstream.json() } catch {}

  // 200 — published
  if (upstream.status === 200 && data.success) {
    return ok({
      success:   true,
      slug:      data.slug,
      commitUrl: data.commitUrl,
      postUrl:   data.postUrl,
    })
  }

  // 409 — slug collision (the case the user explicitly wants surfaced clearly)
  if (upstream.status === 409) {
    return err({
      error:     'slug_taken',
      slug:      payload.slug,
      message:   data.message || `The slug "${payload.slug}" is already published. Rename and try again — the website never overwrites.`,
    }, 409)
  }

  // 400 — invalid payload (relay zod issues if present)
  if (upstream.status === 400) {
    return err({
      error:   'invalid_payload',
      message: data.message || 'The website rejected the payload as invalid.',
      issues:  data.issues,
    }, 400)
  }

  // 401 — bad bearer token (NarrateRx env var doesn't match what the site has)
  if (upstream.status === 401) {
    return err({
      error:   'auth_failed',
      message: 'The website rejected the bearer token. Check that NARRATERX_PUBLISH_SECRET on this deployment matches the secret set on the website.',
    }, 502)
  }

  // 500 — site is misconfigured (their env vars missing)
  if (upstream.status === 500) {
    return err({
      error:   'website_misconfigured',
      message: data.message || 'The website is misconfigured (missing GitHub token or env vars). Not retriable from here.',
    }, 502)
  }

  // 502 — GitHub error on the site's side; safe to retry
  if (upstream.status === 502) {
    return err({
      error:     'github_error',
      message:   data.message || 'The website could not commit to GitHub. Safe to retry shortly.',
      retriable: true,
    }, 502)
  }

  // Anything else
  return err({
    error:   'upstream_error',
    message: data.message || `Website returned ${upstream.status}.`,
    status:  upstream.status,
  }, 502)
}
