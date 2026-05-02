export const config = { maxDuration: 60 }

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  let messages, systemPrompt
  try {
    // req.body is auto-parsed by Vercel when Content-Type is application/json
    ;({ messages, systemPrompt } = req.body || {})
  } catch {
    res.status(400).json({ error: 'Invalid request body' })
    return
  }

  if (!messages || !systemPrompt) {
    res.status(400).json({ error: 'Missing messages or systemPrompt' })
    return
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2024-02-29',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
        messages,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      res.status(response.status).json({ error: err.error?.message || `API error ${response.status}` })
      return
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ error: e.message || 'Internal server error' })
  }
}
