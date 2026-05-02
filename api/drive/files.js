export const config = { runtime: 'edge' }

// Google Drive Team Drive browser via service account
// Required env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_KEY, GOOGLE_DRIVE_ID

const ok  = (data)       => new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
const err = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })

async function getGoogleToken(scope = 'https://www.googleapis.com/auth/drive.readonly') {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key   = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('Google service account not configured')

  const now   = Math.floor(Date.now() / 1000)
  const claim = { iss: email, scope, aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }

  const header  = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).replace(/[=+/]/g, (c) => ({ '=': '', '+': '-', '/': '_' }[c]))
  const payload = btoa(JSON.stringify(claim)).replace(/[=+/]/g, (c) => ({ '=': '', '+': '-', '/': '_' }[c]))
  const toSign  = `${header}.${payload}`

  const pemBody  = key.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\s/g, '')
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
  const driveId = process.env.GOOGLE_DRIVE_ID
  if (!driveId) return err('Google Drive not configured — add GOOGLE_DRIVE_ID to Vercel env vars', 503)

  const { searchParams } = new URL(req.url)
  const query     = searchParams.get('q') || ''
  const folderId  = searchParams.get('folder') || driveId
  const pageToken = searchParams.get('pageToken') || ''

  let token
  try { token = await getGoogleToken() }
  catch (e) { return err(`Google auth failed: ${e.message}`, 503) }

  // Build query — only images and videos, from Team Drive
  const mimeFilter = "(mimeType contains 'image/' or mimeType contains 'video/')"
  const textFilter = query ? ` and name contains '${query.replace(/'/g, "\\'")}'` : ''
  // Only filter by parent folder when browsing a specific subfolder — not the drive root
  const folderFilter = (folderId && folderId !== driveId) ? ` and '${folderId}' in parents` : ''
  const fullQuery = `${mimeFilter}${textFilter}${folderFilter} and trashed=false`

  const params = new URLSearchParams({
    q: fullQuery,
    fields: 'nextPageToken,files(id,name,mimeType,thumbnailLink,webViewLink,webContentLink,size,createdTime,parents)',
    pageSize: '50',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true',
    driveId,
    corpora: 'drive',
    orderBy: 'createdTime desc',
  })
  if (pageToken) params.set('pageToken', pageToken)

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const e = await res.json()
    return err(`Drive API error: ${e.error?.message || res.status} (driveId: ${driveId}, query: ${fullQuery})`, 502)
  }

  const data = await res.json()

  // Return debug info when no files found so we can diagnose
  if (!data.files?.length) {
    return ok({
      files: [],
      nextPageToken: null,
      debug: { query: fullQuery, driveId, totalFound: 0 },
    })
  }

  return ok({
    files: (data.files || []).map((f) => ({
      id:           f.id,
      name:         f.name,
      mimeType:     f.mimeType,
      type:         f.mimeType.startsWith('video') ? 'video' : 'image',
      thumbnailUrl: f.thumbnailLink || null,
      viewUrl:      f.webViewLink,
      downloadUrl:  `https://drive.google.com/uc?export=download&id=${f.id}`,
      size:         f.size,
      createdAt:    f.createdTime,
    })),
    nextPageToken: data.nextPageToken || null,
  })
}
