async function apiFetch(path, init = {}) {
  const res = await fetch(path, init)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || `Request failed: ${res.status}`)
  return json
}

// ── Content items ────────────────────────────────────────────────────────────

export function fetchContentItems(filters = {}) {
  const params = new URLSearchParams()
  if (filters.status)   params.set('status', filters.status)
  if (filters.platform) params.set('platform', filters.platform)
  if (filters.from)     params.set('from', filters.from)
  if (filters.to)       params.set('to', filters.to)
  if (filters.limit)    params.set('limit', String(filters.limit))
  const qs = params.toString()
  return apiFetch(`/api/db/content${qs ? `?${qs}` : ''}`)
}

export function fetchContentItem(id) {
  return apiFetch(`/api/db/content?id=${encodeURIComponent(id)}`)
}

export function fetchContentItemsByInterview(interviewId) {
  return apiFetch(`/api/db/content?interviewId=${encodeURIComponent(interviewId)}`)
}

export function updateContentItem(id, patch) {
  return apiFetch(`/api/db/content?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
}

export function deleteContentItem(id) {
  return apiFetch(`/api/db/content?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export function createContentItems(items) {
  return apiFetch('/api/db/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Array.isArray(items) ? items : [items]),
  })
}

// ── Publishing ────────────────────────────────────────────────────────────────

const BUFFER_PLATFORMS = ['instagram', 'linkedin', 'pinterest']
const DIRECT_PLATFORMS = { facebook: '/api/publish/facebook', gbp: '/api/publish/gbp' }

export async function publishItem(item, { scheduledAt } = {}) {
  const { platform, content, mediaUrls = [], locationIds } = item
  const results = {}

  if (BUFFER_PLATFORMS.includes(platform)) {
    results.buffer = await apiFetch('/api/publish/buffer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, content, mediaUrls, scheduledAt }),
    })
  } else if (DIRECT_PLATFORMS[platform]) {
    const body = { content, mediaUrls, scheduledAt }
    if (platform === 'gbp' && locationIds?.length) body.locationIds = locationIds
    results.direct = await apiFetch(DIRECT_PLATFORMS[platform], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  return results
}

export function fetchGBPLocations() {
  return apiFetch('/api/gbp/locations')
}

// Publish one item to all relevant platforms at once
export async function publishAndTrack(item, userId) {
  const result = await publishItem(item)
  const postId = result.direct?.postId || result.buffer?.bufferId

  await updateContentItem(item.id, {
    status: item.scheduledAt ? 'scheduled' : 'published',
    publishedAt: item.scheduledAt ? null : new Date().toISOString(),
    platformPostId: postId,
    bufferUpdateId: result.buffer?.bufferId,
    approvedBy: userId,
  })

  return result
}

// ── Google Drive ──────────────────────────────────────────────────────────────

export function fetchDriveFiles({ query = '', folderId = '', pageToken = '' } = {}) {
  const params = new URLSearchParams()
  if (query)     params.set('q', query)
  if (folderId)  params.set('folder', folderId)
  if (pageToken) params.set('pageToken', pageToken)
  return apiFetch(`/api/drive/files?${params}`)
  // Returns { items: [...{ id, name, kind:'folder'|'image'|'video', thumbnailUrl?, ... }], nextPageToken }
}
