import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Send, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  getClinician, getInterview, updateInterviewMessages, saveInterviewOutputs, getApiKey,
} from '@/lib/storage'
import { streamMessage, generateContent } from '@/lib/claude'
import { getInterviewSystemPrompt, getBlogPostSystemPrompt, getSocialMediaSystemPrompt } from '@/lib/prompts'
import { getInitials } from '@/lib/utils'

const COMPLETE_TOKEN = 'INTERVIEW_COMPLETE'

export default function InterviewSession() {
  const { clinicianId, interviewId } = useParams()
  const navigate = useNavigate()

  const [clinician, setClinician] = useState(null)
  const [interview, setInterview] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const c = getClinician(clinicianId)
    const i = getInterview(clinicianId, interviewId)
    if (!c || !i) { navigate('/'); return }
    setClinician(c)
    setInterview(i)
    setMessages(i.messages)
    if (i.messages.some((m) => m.content?.includes(COMPLETE_TOKEN))) {
      setInterviewComplete(true)
    }
  }, [clinicianId, interviewId, navigate])

  // Kick off the first AI message if session is brand new
  useEffect(() => {
    if (!clinician || !interview || hasStarted.current) return
    if (messages.length === 0) {
      hasStarted.current = true
      sendToAI([])
    } else {
      hasStarted.current = true
    }
  }, [clinician, interview])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const sendToAI = useCallback(async (currentMessages) => {
    if (!clinician || !interview) return
    setIsStreaming(true)
    setStreamingText('')
    setError('')

    const systemPrompt = getInterviewSystemPrompt(clinician.name, interview.topic)
    // Claude requires alternating roles; filter to ensure that
    const apiMessages = currentMessages.map((m) => ({ role: m.role, content: m.content }))

    let fullText = ''
    try {
      for await (const chunk of streamMessage(apiMessages, systemPrompt)) {
        fullText += chunk
        setStreamingText(fullText)
      }
    } catch (err) {
      if (err.message === 'NO_API_KEY') {
        setError('No API key set. Click the Settings icon to add your Anthropic API key.')
      } else {
        setError(`Error: ${err.message}`)
      }
      setIsStreaming(false)
      return
    }

    // Detect and strip completion token
    const isComplete = fullText.includes(COMPLETE_TOKEN)
    const cleanText = fullText.replace(COMPLETE_TOKEN, '').trim()

    const aiMessage = { role: 'assistant', content: cleanText }
    const updated = [...currentMessages, aiMessage]
    setMessages(updated)
    updateInterviewMessages(clinicianId, interviewId, updated)
    if (isComplete) setInterviewComplete(true)
    setStreamingText('')
    setIsStreaming(false)
  }, [clinician, interview, clinicianId, interviewId])

  async function handleSend() {
    const text = input.trim()
    if (!text || isStreaming) return
    setInput('')

    const userMessage = { role: 'user', content: text }
    const updated = [...messages, userMessage]
    setMessages(updated)
    updateInterviewMessages(clinicianId, interviewId, updated)
    await sendToAI(updated)
  }

  async function handleGenerateContent() {
    setIsGenerating(true)
    setError('')
    try {
      const blogSystemPrompt = getBlogPostSystemPrompt(clinician.name, interview.topic)
      const apiMessages = messages.map((m) => ({ role: m.role, content: m.content }))
      const blogPost = await generateContent(
        [...apiMessages, { role: 'user', content: 'Please write the blog post now based on our interview.' }],
        blogSystemPrompt
      )

      const socialSystemPrompt = getSocialMediaSystemPrompt(clinician.name, interview.topic)
      const socialPosts = await generateContent(
        [{ role: 'user', content: blogPost }],
        socialSystemPrompt
      )

      // Split instagram and facebook
      const igMatch = socialPosts.match(/INSTAGRAM CAPTION[:\s]*([\s\S]*?)(?=FACEBOOK POST|$)/i)
      const fbMatch = socialPosts.match(/FACEBOOK POST[:\s]*([\s\S]*?)$/i)

      saveInterviewOutputs(clinicianId, interviewId, {
        blogPost,
        instagram: igMatch ? igMatch[1].trim() : socialPosts,
        facebook: fbMatch ? fbMatch[1].trim() : '',
        generatedAt: new Date().toISOString(),
      })

      navigate(`/output/${clinicianId}/${interviewId}`)
    } catch (err) {
      setError(`Failed to generate content: ${err.message}`)
      setIsGenerating(false)
    }
  }

  if (!clinician || !interview) return null

  const displayMessages = messages.filter((m) => !m.content?.includes(COMPLETE_TOKEN))
  const firstNameOnly = clinician.name.split(' ')[0]

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 shrink-0">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/clinician/${clinicianId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {getInitials(clinician.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm leading-none">{clinician.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{interview.topic}</p>
        </div>
        {interviewComplete && (
          <Badge variant="secondary" className="text-xs">Interview Complete</Badge>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-4 pb-4">
          {displayMessages.map((msg, i) => (
            <MessageBubble key={i} message={msg} clinicianName={firstNameOnly} />
          ))}

          {isStreaming && streamingText && (
            <MessageBubble
              message={{ role: 'assistant', content: streamingText }}
              clinicianName={firstNameOnly}
              isStreaming
            />
          )}

          {isStreaming && !streamingText && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Generate content CTA */}
      {interviewComplete && !isGenerating && (
        <div className="py-3 shrink-0">
          <div className="rounded-xl border bg-primary/5 border-primary/20 p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Ready to generate content</p>
              <p className="text-xs text-muted-foreground">We'll create a blog post and social media captions.</p>
            </div>
            <Button onClick={handleGenerateContent} size="sm">
              <Sparkles className="h-4 w-4 mr-1.5" />
              Generate
            </Button>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="py-3 shrink-0">
          <div className="rounded-xl border bg-muted p-4 flex items-center gap-3">
            <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
            <div>
              <p className="text-sm font-medium">Crafting your content…</p>
              <p className="text-xs text-muted-foreground">Writing blog post and social captions. This takes about 30 seconds.</p>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      {!interviewComplete && (
        <div className="flex gap-2 pt-3 shrink-0">
          <Textarea
            ref={textareaRef}
            placeholder="Type your answer…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            rows={2}
            className="resize-none"
            disabled={isStreaming}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className="h-auto self-end mb-0.5"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

function MessageBubble({ message, clinicianName, isStreaming }) {
  const isAI = message.role === 'assistant'
  return (
    <div className={`flex items-start gap-3 ${!isAI ? 'flex-row-reverse' : ''}`}>
      {isAI ? (
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-xs font-bold text-primary-foreground">
          MB
        </div>
      ) : (
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0 text-xs font-medium">
          {clinicianName[0]}
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isAI
            ? 'bg-muted rounded-tl-sm'
            : 'bg-primary text-primary-foreground rounded-tr-sm'
        } ${isStreaming ? 'animate-pulse' : ''}`}
      >
        {message.content}
      </div>
    </div>
  )
}
