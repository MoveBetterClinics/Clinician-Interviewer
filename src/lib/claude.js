import { getApiKey } from './storage'

const API_URL = 'https://api.anthropic.com/v1/messages'

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': getApiKey(),
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-allow-browser': 'true',
  }
}

export async function* streamMessage(messages, systemPrompt) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('NO_API_KEY')

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
      stream: true,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (data === '[DONE]') return
      try {
        const parsed = JSON.parse(data)
        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
          yield parsed.delta.text
        }
      } catch {
        // skip malformed chunks
      }
    }
  }
}

export async function generateContent(messages, systemPrompt) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('NO_API_KEY')

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}
