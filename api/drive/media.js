export const config = { runtime: 'edge' }

// Proxy a Google Drive file through the service account so it can be
// displayed in <img> / <video> tags without requiring user auth.

async function getGoogleToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key   = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('Google service account not configured')

  const now   = Math.floor(Date.now() / 1000)
  const scope = 'https://www.googleapis.com/auth/drive.readonly'
  const claim = { iss: email, scope, aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }

  const header  = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).replace(/[=+/]/g, (c) => ({ '=': '', '+': '-', '/': '_' }[c]))
  const payload = btoa(JSON.stringify(claim)).replace(/[=+/]/g, (c) => ({ '=': '', '+': '-', '/': '_' }[c]))
  const toSign  = `${header}.${payload}`

  const pemBody   = key.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\s/g, '')
  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0))
  const cryptoKey = await crypto.subtle.importKey('pkcs8', binaryKey.buffer, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const sigBuffer = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(toSign))
  const sig = btoa(String.fromCharCode(...new Uint8Array(sigBuffer))).replace(/[=+/]/g, (c) => ({ '=': '', '+': '-', '/': '_' }[c]))
  const jwt = `${toSign}.${sig}`

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  const data = await tokenRes.json()
  if (!data.access_token) throw new Error(data.error_description || 'Token exchange failed')
  return data.access_token
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return new Response('Missing id parameter', { status: 400 })

  let token
  try { token = await getGoogleToken() }
  catch (e) { return new Response(`Auth failed: ${e.message}`, { status: 503 }) }

  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media&supportsAllDrives=true`,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  if (!res.ok) {
    return new Response(`Drive fetch failed: ${res.status}`, { status: res.status })
  }

  const contentType = res.headers.get('Content-Type') || 'application/octet-stream'

  return new Response(res.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
