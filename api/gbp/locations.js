export const config = { runtime: 'edge' }

// Returns the list of configured GBP locations from env vars.
// Required env vars:
//   GBP_LOCATION_IDS   - comma-separated, e.g. "locations/111,locations/222"
//   GBP_LOCATION_NAMES - comma-separated friendly names, e.g. "Seattle,Bellevue"

const ok  = (data)       => new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
const err = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })

export default function handler(req) {
  if (req.method !== 'GET') return err('Method not allowed', 405)

  const ids   = (process.env.GBP_LOCATION_IDS   || '').split(',').map((s) => s.trim()).filter(Boolean)
  const names = (process.env.GBP_LOCATION_NAMES  || '').split(',').map((s) => s.trim()).filter(Boolean)

  if (!ids.length) return err('GBP not configured — add GBP_LOCATION_IDS to Vercel env vars', 503)

  const locations = ids.map((id, i) => ({
    id,
    name: names[i] || id, // fall back to raw ID if no friendly name provided
  }))

  return ok({ locations, accountId: process.env.GBP_ACCOUNT_ID || '' })
}
