export const config = { runtime: 'edge' }

// Scheduled-post dispatcher for platforms without native scheduling (today: GBP).
// Vercel cron hits this on a schedule (see vercel.json). It atomically claims
// due rows with status='scheduled' → 'publishing' (a filtered PostgREST PATCH
// is the lock — two concurrent invocations can't double-claim), dispatches via
// the GBP helpers, then transitions to 'published' or 'failed'.
//
// Required env: SUPABASE_URL, SUPABASE_SERVICE_KEY, GBP_ACCOUNT_ID,
// GBP_LOCATION_IDS, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_KEY.
// Optional: CRON_SECRET (when set, request must carry Authorization: Bearer <secret>).

import { getGoogleToken, postToLocation, buildPost } from '../publish/gbp.js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY

function sb(path, init = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...init.headers,
    },
  })
}

const ok  = (data, status = 200)  => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
const err = (msg,  status = 400) => new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })

async function markRow(id, patch) {
  return sb(`content_items?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  })
}

export default async function handler(req) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${cronSecret}`) return err('Unauthorized', 401)
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) return err('Supabase not configured', 503)

  const accountId      = process.env.GBP_ACCOUNT_ID
  const allLocationIds = (process.env.GBP_LOCATION_IDS || '').split(',').map((s) => s.trim()).filter(Boolean)
  if (!accountId || !allLocationIds.length) return err('GBP not configured', 503)

  const nowIso = new Date().toISOString()

  // Atomic claim: scheduled → publishing for all due GBP rows in one PATCH.
  // PostgREST returns the rows that actually transitioned, so concurrent
  // invocations can't double-claim — only one PATCH wins each row.
  const claimRes = await sb(
    `content_items?platform=eq.gbp&status=eq.scheduled&scheduled_at=lte.${encodeURIComponent(nowIso)}`,
    { method: 'PATCH', body: JSON.stringify({ status: 'publishing' }) }
  )
  if (!claimRes.ok) return err(`Claim failed: ${claimRes.status}`, 500)
  const claimed = await claimRes.json()
  if (!claimed.length) return ok({ claimed: 0, dispatched: [] })

  let token
  try {
    token = await getGoogleToken()
  } catch (e) {
    // Couldn't auth at all — release every claim back to scheduled so the next
    // tick retries (vs leaving them stuck in 'publishing').
    await Promise.all(claimed.map((row) =>
      markRow(row.id, { status: 'scheduled', notes: `Cron auth failed: ${e.message}` })
    ))
    return err(`Google auth failed: ${e.message}`, 503)
  }

  const dispatched = []
  for (const row of claimed) {
    const requested = Array.isArray(row.target_locations) && row.target_locations.length
      ? row.target_locations
      : allLocationIds
    const targets = requested.filter((id) => allLocationIds.includes(id))

    if (!targets.length) {
      await markRow(row.id, { status: 'failed', notes: 'No valid configured locations for this row' })
      dispatched.push({ id: row.id, ok: false, error: 'no_valid_locations' })
      continue
    }

    const post = buildPost(row.content, row.media_urls)
    const results = await Promise.allSettled(
      targets.map((loc) => postToLocation(token, accountId, loc, post))
    )
    const succeeded = results.filter((r) => r.status === 'fulfilled').map((r) => r.value)
    const failed    = results
      .map((r, i) => ({ r, locationId: targets[i] }))
      .filter(({ r }) => r.status === 'rejected')
      .map(({ r, locationId }) => ({ locationId, error: r.reason?.message || 'unknown' }))

    if (succeeded.length) {
      await markRow(row.id, {
        status: 'published',
        published_at: new Date().toISOString(),
        platform_post_id: succeeded.map((s) => s.name).join(','),
        ...(failed.length ? { notes: `Partial: ${failed.map((f) => `${f.locationId}: ${f.error}`).join('; ')}` } : {}),
      })
      dispatched.push({ id: row.id, ok: true, posted: succeeded.length, failed: failed.length })
    } else {
      await markRow(row.id, {
        status: 'failed',
        notes: failed.map((f) => `${f.locationId}: ${f.error}`).join('; '),
      })
      dispatched.push({ id: row.id, ok: false, error: 'all_locations_failed' })
    }
  }

  return ok({ claimed: claimed.length, dispatched })
}
