export const config = { runtime: 'edge' }

const BUFFER_TOKEN = process.env.BUFFER_ACCESS_TOKEN
const BUFFER_API   = 'https://api.bufferapp.com/1'

const ok  = (data)       => new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
const err = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })

// Map our platform names → Buffer service names
// LinkedIn and Pinterest are disabled until those channels are activated
const PLATFORM_TO_SERVICE = {
  instagram: 'instagram',
}

export default async function handler(req) {
  if (!BUFFER_TOKEN) return err('Buffer not configured — add BUFFER_ACCESS_TOKEN to Vercel env vars', 503)
  if (req.method !== 'POST') return err('Method not allowed', 405)

  const { platform, content, mediaUrls = [], scheduledAt } = await req.json()
  if (!platform || !content) return err('Missing platform or content')

  const service = PLATFORM_TO_SERVICE[platform]
  if (!service) return err(`Unsupported Buffer platform: ${platform}`)

  // 1. Get profiles to find the right profile ID
  const profilesRes = await fetch(`${BUFFER_API}/profiles.json?access_token=${BUFFER_TOKEN}`)
  if (!profilesRes.ok) return err('Failed to fetch Buffer profiles', 502)
  const profiles = await profilesRes.json()

  const profile = profiles.find((p) => p.service === service)
  if (!profile) return err(`No Buffer profile found for ${platform}. Connect it at buffer.com.`, 404)

  // 2. Build the update payload
  const params = new URLSearchParams()
  params.append('access_token', BUFFER_TOKEN)
  params.append('profile_ids[]', profile.id)
  params.append('text', content)

  if (scheduledAt) {
    params.append('scheduled_at', new Date(scheduledAt).toISOString())
  } else {
    params.append('now', 'true')
  }

  // Attach first media item (Buffer supports one primary media per post)
  if (mediaUrls.length > 0) {
    const first = mediaUrls[0]
    if (first.type?.startsWith('video')) {
      params.append('media[video]', first.url)
    } else {
      params.append('media[photo]', first.url)
      params.append('media[link]',  first.url)
    }
  }

  // 3. Create the update
  const updateRes = await fetch(`${BUFFER_API}/updates/create.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  const update = await updateRes.json()

  if (!updateRes.ok || update.error) {
    return err(update.error || 'Buffer post failed', 502)
  }

  return ok({
    success: true,
    bufferId: update.updates?.[0]?.id,
    scheduledAt: update.updates?.[0]?.scheduled_at,
    status: update.updates?.[0]?.status,
  })
}
