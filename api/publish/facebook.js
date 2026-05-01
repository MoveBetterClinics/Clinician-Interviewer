export const config = { runtime: 'edge' }

const PAGE_ID    = process.env.FACEBOOK_PAGE_ID
const PAGE_TOKEN = process.env.FACEBOOK_PAGE_TOKEN
const GRAPH      = 'https://graph.facebook.com/v19.0'

const ok  = (data)       => new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
const err = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })

export default async function handler(req) {
  if (!PAGE_ID || !PAGE_TOKEN) return err('Facebook not configured — add FACEBOOK_PAGE_ID and FACEBOOK_PAGE_TOKEN to Vercel env vars', 503)
  if (req.method !== 'POST') return err('Method not allowed', 405)

  const { content, mediaUrls = [], scheduledAt } = await req.json()
  if (!content) return err('Missing content')

  const body = { message: content, access_token: PAGE_TOKEN }

  // Scheduled posts require published=false + scheduled_publish_time (Unix timestamp)
  if (scheduledAt) {
    body.published = false
    body.scheduled_publish_time = Math.floor(new Date(scheduledAt).getTime() / 1000)
  }

  let endpoint = `${GRAPH}/${PAGE_ID}/feed`
  let postRes

  if (mediaUrls.length > 0) {
    const first = mediaUrls[0]
    if (first.type?.startsWith('video')) {
      // Video post
      endpoint = `${GRAPH}/${PAGE_ID}/videos`
      body.file_url = first.url
      body.description = content
      delete body.message
    } else {
      // Photo post
      endpoint = `${GRAPH}/${PAGE_ID}/photos`
      body.url = first.url
      body.caption = content
      delete body.message
    }
  }

  postRes = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await postRes.json()
  if (!postRes.ok || data.error) {
    return err(data.error?.message || 'Facebook post failed', 502)
  }

  return ok({ success: true, postId: data.id || data.post_id })
}
