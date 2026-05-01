export const config = { runtime: 'edge' }

// Google Business Profile posting via service account
// Required env vars:
//   GBP_ACCOUNT_ID   - e.g. accounts/123456789
//   GBP_LOCATION_ID  - e.g. locations/987654321
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_SERVICE_ACCOUNT_KEY  (private key — paste as-is with \n newlines)

const ok  = (data)       => new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
const err = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })

async function getGoogleToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key   = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('Google service account not configured')

  const now   = Math.floor(Date.now() / 1000)
  const claim = {
    iss:   email,
    scope: 'https://www.googleapis.com/auth/business.manage',
    aud:   'https://oauth2.googleapis.com/token',
    iat:   now,
    exp:   now + 3600,
  }

  // Build JWT (RS256) using Web Crypto API (available in edge runtime)
  const header  = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const payload = btoa(JSON.stringify(claim)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const toSign  = `${header}.${payload}`

  // Import the private key
  const pemBody = key.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\s/g, '')
  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0))
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', binaryKey.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  )

  const encoder  = new TextEncoder()
  const sigBuffer = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, encoder.encode(toSign))
  const sig = btoa(String.fromCharCode(...new Uint8Array(sigBuffer))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const jwt = `${toSign}.${sig}`

  // Exchange JWT for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  const tokenData = await tokenRes.json()
  if (!tokenData.access_token) throw new Error(tokenData.error_description || 'Failed to get Google token')
  return tokenData.access_token
}

export default async function handler(req) {
  const accountId  = process.env.GBP_ACCOUNT_ID
  const locationId = process.env.GBP_LOCATION_ID

  if (!accountId || !locationId) return err('GBP not configured — add GBP_ACCOUNT_ID and GBP_LOCATION_ID to Vercel env vars', 503)
  if (req.method !== 'POST') return err('Method not allowed', 405)

  const { content, mediaUrls = [] } = await req.json()
  if (!content) return err('Missing content')

  let token
  try { token = await getGoogleToken() }
  catch (e) { return err(`Google auth failed: ${e.message}`, 503) }

  const post = {
    languageCode: 'en-US',
    summary: content,
    topicType: 'STANDARD',
    callToAction: { actionType: 'BOOK', url: 'https://www.movebetter.co' },
  }

  if (mediaUrls.length > 0) {
    post.media = mediaUrls.slice(0, 1).map((m) => ({
      mediaFormat: m.type?.startsWith('video') ? 'VIDEO' : 'PHOTO',
      sourceUrl: m.url,
    }))
  }

  const url = `https://mybusiness.googleapis.com/v4/${accountId}/${locationId}/localPosts`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  const data = await res.json()
  if (!res.ok) return err(data.error?.message || 'GBP post failed', 502)

  return ok({ success: true, name: data.name })
}
