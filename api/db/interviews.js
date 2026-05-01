export const config = { runtime: 'edge' }

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

const ok = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
const err = (msg, status = 400) =>
  new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })

export default async function handler(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const userId = req.headers.get('x-user-id')

  if (req.method === 'GET') {
    if (id) {
      const res = await sb(
        `interviews?id=eq.${id}&select=id,clinician_id,topic,status,messages,outputs,owner_id,owner_email,created_at,updated_at`
      )
      if (!res.ok) return err('Database error', 500)
      const data = await res.json()
      return ok(data[0] ?? null)
    }

    // Search past completed interviews by topic (for cross-interview context)
    const topic = searchParams.get('topic')
    const excludeId = searchParams.get('excludeId')
    if (!topic) return err('Missing id or topic')

    let qs = `interviews?topic=ilike.${encodeURIComponent(topic)}&status=eq.completed`
    qs += `&select=id,topic,messages,created_at,clinicians(name)`
    if (excludeId) qs += `&id=neq.${excludeId}`
    qs += `&order=created_at.desc&limit=3`

    const res = await sb(qs)
    if (!res.ok) return err('Database error', 500)
    return ok(await res.json())
  }

  if (req.method === 'POST') {
    const { clinicianId, topic, ownerId, ownerEmail } = await req.json()
    if (!clinicianId) return err('Missing clinicianId')
    if (!topic?.trim()) return err('Topic required')
    if (!ownerId) return err('Unauthorized', 401)

    const res = await sb('interviews', {
      method: 'POST',
      body: JSON.stringify({
        clinician_id: clinicianId,
        topic: topic.trim(),
        owner_id: ownerId,
        owner_email: ownerEmail,
        status: 'in_progress',
        messages: [],
      }),
    })
    if (!res.ok) return err('Create failed', 500)
    const data = await res.json()
    return ok(data[0], 201)
  }

  if (req.method === 'PATCH') {
    if (!id) return err('Missing id')
    if (!userId) return err('Unauthorized', 401)

    const chk = await sb(`interviews?id=eq.${id}&select=owner_id`)
    if (!chk.ok) return err('Database error', 500)
    const rows = await chk.json()
    if (!rows.length) return err('Not found', 404)
    if (rows[0].owner_id !== userId) return err('Forbidden', 403)

    const body = await req.json()
    const patch = { updated_at: new Date().toISOString() }
    if (body.messages !== undefined) patch.messages = body.messages
    if (body.outputs !== undefined) patch.outputs = body.outputs
    if (body.status !== undefined) patch.status = body.status

    const res = await sb(`interviews?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    })
    if (!res.ok) return err('Update failed', 500)
    const data = await res.json()
    return ok(data[0])
  }

  if (req.method === 'DELETE') {
    if (!id) return err('Missing id')
    if (!userId) return err('Unauthorized', 401)

    const chk = await sb(`interviews?id=eq.${id}&select=owner_id`)
    if (!chk.ok) return err('Database error', 500)
    const rows = await chk.json()
    if (!rows.length) return err('Not found', 404)
    if (rows[0].owner_id !== userId) return err('Forbidden', 403)

    const res = await sb(`interviews?id=eq.${id}`, { method: 'DELETE' })
    if (!res.ok) return err('Delete failed', 500)
    return ok({ ok: true })
  }

  return new Response('Method not allowed', { status: 405 })
}
