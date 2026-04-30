import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, Sparkles, AlertCircle, Mic, MicOff, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  getClinician, getInterview, updateInterviewMessages, saveInterviewOutputs,
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
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  const bottomRef = useRef(null)
  const hasStarted = useRef(false)
  const recognitionRef = useRef(null)
  const messagesRef = useRef([])
  const transcriptRef = useRef('')
  const autoListenRef = useRef(false)

  // Keep messagesRef in sync
  useEffect(() => { messagesRef.current = messages }, [messages])
  useEffect(() => { transcriptRef.current = transcript }, [transcript])

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
      recognitionRef.current?.abort()
    }
  }, [])

  function getBestVoice() {
    const voices = window.speechSynthesis.getVoices()
    // Prefer Google's neural voices (Chrome), then Apple enhanced, then any English
    const priority = [
      v => v.name === 'Google US English',
      v => v.name.startsWith('Google') && v.lang.startsWith('en'),
      v => v.name.includes('Samantha') && v.localService,
      v => v.name.includes('Enhanced') && v.lang.startsWith('en'),
      v => v.lang === 'en-US' && v.localService,
      v => v.lang.startsWith('en'),
    ]
    for (const test of priority) {
      const match = voices.find(test)
      if (match) return match
    }
    return null
  }

  function speak(text) {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = getBestVoice()
    utterance.rate = 1.1
    utterance.pitch = 1.0
    setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      autoListenRef.current = true
    }
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  // Auto-start listening after Claude finishes speaking
  useEffect(() => {
    if (!isSpeaking && autoListenRef.current && !isStreaming && !interviewComplete) {
      autoListenRef.current = false
      const timer = setTimeout(() => startListening(), 400)
      return () => clearTimeout(timer)
    }
  }, [isSpeaking, isStreaming, interviewComplete])

  const sendToAI = useCallback(async (currentMessages) => {
    if (!clinician || !interview) return
    setIsStreaming(true)
    setStreamingText('')
    setError('')

    const systemPrompt = getInterviewSystemPrompt(clinician.name, interview.topic)
    const apiMessages = currentMessages.map((m) => ({ role: m.role, content: m.content }))

    let fullText = ''
    try {
      for await (const chunk of streamMessage(apiMessages, systemPrompt)) {
        fullText += chunk
        setStreamingText(fullText)
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
      setIsStreaming(false)
      return
    }

    const isComplete = fullText.includes(COMPLETE_TOKEN)
    const cleanText = fullText.replace(COMPLETE_TOKEN, '').trim()

    const aiMessage = { role: 'assistant', content: cleanText }
    const updated = [...currentMessages, aiMessage]
    setMessages(updated)
    updateInterviewMessages(clinicianId, interviewId, updated)
    if (isComplete) setInterviewComplete(true)
    setStreamingText('')
    setIsStreaming(false)

    // Speak the response
    if (!isComplete) speak(cleanText)
  }, [clinician, interview, clinicianId, interviewId])

  // Kick off first AI message
  useEffect(() => {
    if (!clinician || !interview || hasStarted.current) return
    hasStarted.current = true
    if (messages.length === 0) {
      sendToAI([])
    } else {
      // Resuming — speak the last assistant message
      const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant')
      if (lastAssistant && !interviewComplete) speak(lastAssistant.content)
    }
  }, [clinician, interview])

  function startListening() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setError('Speech recognition is not supported. Please use Chrome.')
      return
    }
    if (isListening) return

    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
    setTranscript('')
    transcriptRef.current = ''

    const recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      let text = ''
      for (const result of event.results) {
        text += result[0].transcript
      }
      setTranscript(text)
      transcriptRef.current = text
    }

    recognition.onend = () => setIsListening(false)

    recognition.onerror = (e) => {
      setIsListening(false)
      if (e.error !== 'no-speech') setError(`Microphone error: ${e.error}`)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  function stopListening() {
    recognitionRef.current?.stop()
  }

  // Auto-submit when listening stops and we have a transcript
  useEffect(() => {
    if (isListening) return
    const text = transcriptRef.current.trim()
    if (!text) return

    setTranscript('')
    transcriptRef.current = ''

    const userMessage = { role: 'user', content: text }
    const updated = [...messagesRef.current, userMessage]
    setMessages(updated)
    updateInterviewMessages(clinicianId, interviewId, updated)
    sendToAI(updated)
  }, [isListening, clinicianId, interviewId, sendToAI])

  async function handleGenerateContent() {
    setIsGenerating(true)
    setError('')
    window.speechSynthesis?.cancel()
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

      {/* Voice input */}
      {!interviewComplete && (
        <div className="pt-4 pb-1 shrink-0 flex flex-col items-center gap-3">
          {/* Live transcript */}
          {transcript && (
            <div className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground/80 italic min-h-[44px]">
              "{transcript}"
            </div>
          )}

          {/* Status label */}
          <p className="text-xs text-muted-foreground h-4">
            {isStreaming ? '' : isSpeaking ? (
              <span className="flex items-center gap-1.5">
                <Volume2 className="h-3 w-3 animate-pulse" /> Speaking…
              </span>
            ) : isListening ? (
              <span className="flex items-center gap-1.5 text-red-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> Listening — tap to stop
              </span>
            ) : 'Tap to speak'}
          </p>

          {/* Mic button */}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isStreaming || isGenerating || isSpeaking}
            className={`h-16 w-16 rounded-full flex items-center justify-center transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
              ${isListening
                ? 'bg-red-500 text-white scale-110'
                : 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
              } disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100`}
          >
            {isListening
              ? <MicOff className="h-6 w-6" />
              : <Mic className="h-6 w-6" />
            }
          </button>
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
