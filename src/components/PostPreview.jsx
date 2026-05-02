import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Heart, MessageCircle, Send, Bookmark, ThumbsUp, Repeat2, Globe, MapPin, Video, ChevronLeft, ChevronRight, Play } from 'lucide-react'

// Move Better brand colors / identity used in mock cards
const MB_HANDLE   = 'movebetterclinic'
const MB_NAME     = 'Move Better'
const MB_LOCATION = 'Portland, OR'

// Highlight hashtags and @mentions in social copy
function SocialText({ text }) {
  if (!text) return null
  const parts = text.split(/(\s+)/)
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('#') || part.startsWith('@')) {
          return <span key={i} className="text-blue-500">{part}</span>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

// Resolve the best displayable URL for a media item
function mediaSrc(m) {
  if (!m) return null
  return m.proxyUrl || (m.id ? `/api/drive/media?id=${m.id}` : m.thumbnailUrl || m.url || null)
}

// ── Carousel — shared by Instagram and Facebook ───────────────────────────────
function MediaCarousel({ mediaUrls, aspectClass = 'aspect-square' }) {
  const [idx, setIdx] = React.useState(0)
  const total = mediaUrls.length

  if (total === 0) {
    return (
      <div className={`bg-gradient-to-br from-orange-100 to-orange-50 ${aspectClass} flex flex-col items-center justify-center gap-2`}>
        <img src="/logo.svg" alt="Move Better" className="h-16 w-auto opacity-30" />
        <p className="text-xs text-muted-foreground">Add media in the editor</p>
      </div>
    )
  }

  const m   = mediaUrls[idx]
  const src = mediaSrc(m)

  return (
    <div className={`relative ${aspectClass} overflow-hidden bg-black select-none`}>
      {/* Slide */}
      {m.type === 'video' ? (
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center gap-2">
          {src ? (
            <img src={src} alt={m.name} className="w-full h-full object-cover opacity-70" onError={(e) => { e.target.style.display = 'none' }} />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="h-6 w-6 text-white ml-1" />
            </div>
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/60 px-4 line-clamp-1">{m.name}</p>
        </div>
      ) : src ? (
        <img src={src} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <p className="text-xs text-muted-foreground">{m.name}</p>
        </div>
      )}

      {/* Prev / Next arrows */}
      {total > 1 && (
        <>
          {idx > 0 && (
            <button
              onClick={() => setIdx(idx - 1)}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {idx < total - 1 && (
            <button
              onClick={() => setIdx(idx + 1)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Slide counter */}
          <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
            {idx + 1} / {total}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {mediaUrls.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all ${i === idx ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Instagram ────────────────────────────────────────────────────────────────
function InstagramPreview({ content, mediaUrls = [] }) {
  const [showFull, setShowFull] = React.useState(false)
  const lines = (content || '').split('\n')
  const preview = lines.slice(0, 4).join('\n')
  const hasMore = lines.length > 4

  return (
    <div className="max-w-sm mx-auto border rounded-xl overflow-hidden bg-white shadow-sm font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
          MB
        </div>
        <div>
          <p className="text-xs font-semibold">{MB_HANDLE}</p>
          <p className="text-[10px] text-muted-foreground">{MB_LOCATION}</p>
        </div>
        <button className="ml-auto text-xs font-semibold text-blue-500">Follow</button>
      </div>

      {/* Carousel */}
      <MediaCarousel mediaUrls={mediaUrls} aspectClass="aspect-square" />

      {/* Actions */}
      <div className="px-4 pt-3 pb-1 flex items-center gap-4">
        <Heart className="h-6 w-6" />
        <MessageCircle className="h-6 w-6" />
        <Send className="h-6 w-6" />
        <Bookmark className="h-6 w-6 ml-auto" />
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-xs font-semibold mb-1">{MB_HANDLE}</p>
        <p className="text-xs leading-relaxed whitespace-pre-wrap">
          <SocialText text={showFull ? content : preview} />
          {!showFull && hasMore && (
            <button onClick={() => setShowFull(true)} className="text-muted-foreground ml-1">more</button>
          )}
        </p>
      </div>
    </div>
  )
}

// ── Facebook ─────────────────────────────────────────────────────────────────
function FacebookPreview({ content, mediaUrls = [] }) {
  const [showFull, setShowFull] = React.useState(false)
  const lines = (content || '').split('\n')
  const preview = lines.slice(0, 5).join('\n')
  const hasMore = lines.length > 5

  return (
    <div className="max-w-sm mx-auto border rounded-xl overflow-hidden bg-white shadow-sm font-sans">
      <div className="px-4 pt-4 pb-3">
        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
            MB
          </div>
          <div>
            <p className="text-sm font-semibold">{MB_NAME}</p>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Globe className="h-3 w-3" /> Public · Just now
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          <SocialText text={showFull ? content : preview} />
          {!showFull && hasMore && (
            <button onClick={() => setShowFull(true)} className="text-blue-500 ml-1 text-sm">See more</button>
          )}
        </p>
      </div>

      {/* Media carousel */}
      {mediaUrls.length > 0 && (
        <MediaCarousel mediaUrls={mediaUrls} aspectClass="aspect-video" />
      )}

      {/* Link preview */}
      <div className="border-t bg-slate-50 px-4 py-3">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">movebetter.co</p>
        <p className="text-xs font-semibold mt-0.5">Move Better · Portland, OR</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Movement-first care for lasting pain relief.</p>
      </div>

      {/* Reactions bar */}
      <div className="px-4 py-2 border-t flex items-center gap-4 text-xs text-muted-foreground">
        <button className="flex items-center gap-1.5 hover:text-blue-500"><ThumbsUp className="h-4 w-4" /> Like</button>
        <button className="flex items-center gap-1.5 hover:text-blue-500"><MessageCircle className="h-4 w-4" /> Comment</button>
        <button className="flex items-center gap-1.5 hover:text-blue-500"><Repeat2 className="h-4 w-4" /> Share</button>
      </div>
    </div>
  )
}

// ── LinkedIn ─────────────────────────────────────────────────────────────────
function LinkedInPreview({ content }) {
  const [showFull, setShowFull] = React.useState(false)
  const lines = (content || '').split('\n')
  const preview = lines.slice(0, 5).join('\n')
  const hasMore = lines.length > 5

  return (
    <div className="max-w-sm mx-auto border rounded-xl overflow-hidden bg-white shadow-sm font-sans">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start gap-3 mb-3">
          <div className="h-12 w-12 rounded-sm bg-gradient-to-br from-orange-400 to-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
            MB
          </div>
          <div>
            <p className="text-sm font-semibold">{MB_NAME}</p>
            <p className="text-[11px] text-muted-foreground">Chiropractic · Portland, OR</p>
            <p className="text-[10px] text-muted-foreground">Just now · 🌐</p>
          </div>
          <button className="ml-auto text-xs font-semibold text-blue-600 border border-blue-600 rounded-full px-3 py-1">+ Follow</button>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          <SocialText text={showFull ? content : preview} />
          {!showFull && hasMore && (
            <button onClick={() => setShowFull(true)} className="text-muted-foreground ml-1">…more</button>
          )}
        </p>
      </div>

      <div className="px-4 py-2 border-t flex items-center gap-4 text-xs text-muted-foreground">
        <button className="flex items-center gap-1.5 hover:text-blue-500"><ThumbsUp className="h-4 w-4" /> Like</button>
        <button className="flex items-center gap-1.5 hover:text-blue-500"><MessageCircle className="h-4 w-4" /> Comment</button>
        <button className="flex items-center gap-1.5 hover:text-blue-500"><Repeat2 className="h-4 w-4" /> Repost</button>
        <button className="flex items-center gap-1.5 hover:text-blue-500"><Send className="h-4 w-4" /> Send</button>
      </div>
    </div>
  )
}

// ── Google Business Profile ───────────────────────────────────────────────────
function GBPPreview({ content }) {
  return (
    <div className="max-w-sm mx-auto border rounded-xl overflow-hidden bg-white shadow-sm font-sans">
      <div className="bg-slate-50 px-4 py-3 border-b flex items-center gap-2">
        <MapPin className="h-4 w-4 text-red-500 shrink-0" />
        <p className="text-xs font-semibold">{MB_NAME} · Google Business Profile</p>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
            MB
          </div>
          <div>
            <p className="text-sm font-semibold">{MB_NAME}</p>
            <p className="text-[10px] text-muted-foreground">{MB_LOCATION}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-800">{content}</p>
      </div>
      <div className="px-4 py-3 border-t bg-slate-50">
        <button className="text-xs text-blue-600 font-medium">Book appointment →</button>
      </div>
    </div>
  )
}

// ── Blog (rendered Markdown) ──────────────────────────────────────────────────
function BlogPreview({ content }) {
  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="px-8 py-8 prose prose-sm max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-2xl prose-h1:mb-4
        prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
        prose-p:leading-relaxed prose-p:text-slate-700
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-900
        prose-li:text-slate-700">
        <ReactMarkdown>{content || ''}</ReactMarkdown>
      </div>
    </div>
  )
}

// ── Plain formatted (email, ads, landing page, video scripts) ────────────────
function PlainPreview({ content }) {
  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-6">
        <pre className="text-sm leading-relaxed font-sans whitespace-pre-wrap text-slate-800">{content}</pre>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function PostPreview({ platform, content, mediaUrls = [] }) {
  if (!content?.trim()) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        No content to preview yet.
      </div>
    )
  }

  switch (platform) {
    case 'instagram':   return <InstagramPreview content={content} mediaUrls={mediaUrls} />
    case 'facebook':    return <FacebookPreview  content={content} mediaUrls={mediaUrls} />
    case 'linkedin':    return <LinkedInPreview  content={content} />
    case 'gbp':         return <GBPPreview       content={content} />
    case 'blog':        return <BlogPreview      content={content} />
    default:            return <PlainPreview     content={content} />
  }
}
