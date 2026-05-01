import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  ArrowLeft, Send, CalendarDays, CheckCircle2, Loader2, Copy, Check,
  AlertCircle, Image, Trash2, ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { fetchContentItem, updateContentItem, publishAndTrack, fetchGBPLocations } from '@/lib/publish'
import { PLATFORM_META, STATUS_META } from './ContentHub'
import MediaPicker from '@/components/MediaPicker'
import { formatDate } from '@/lib/utils'

const DIRECT_PLATFORMS  = ['facebook', 'gbp']
const BUFFER_PLATFORMS  = ['instagram', 'linkedin', 'pinterest']
const NEEDS_MEDIA       = ['instagram', 'facebook', 'gbp']

export default function ReviewPost() {
  const { itemId }   = useParams()
  const navigate     = useNavigate()
  const { user }     = useUser()

  const [item, setItem]               = useState(null)
  const [content, setContent]         = useState('')
  const [loading, setLoading]         = useState(true)
  const [saving, setSaving]           = useState(false)
  const [publishing, setPublishing]   = useState(false)
  const [copied, setCopied]           = useState(false)
  const [error, setError]             = useState('')
  const [success, setSuccess]         = useState('')
  const [showPicker, setShowPicker]       = useState(false)
  const [scheduledAt, setScheduledAt]     = useState('')
  const [gbpLocations, setGbpLocations]   = useState([])
  const [selectedLocs, setSelectedLocs]   = useState([])

  useEffect(() => {
    fetchContentItem(itemId)
      .then((i) => {
        setItem(i)
        setContent(i?.content || '')
        setScheduledAt(i?.scheduled_at ? i.scheduled_at.slice(0, 16) : '')
        // Fetch GBP locations if this is a GBP post
        if (i?.platform === 'gbp') {
          fetchGBPLocations()
            .then(({ locations }) => {
              setGbpLocations(locations)
              setSelectedLocs(locations.map((l) => l.id)) // default: all selected
            })
            .catch(() => {})
        }
      })
      .catch(() => navigate('/hub'))
      .finally(() => setLoading(false))
  }, [itemId])

  async function save(patch = {}) {
    setSaving(true)
    setError('')
    try {
      const updated = await updateContentItem(itemId, { content, ...patch })
      setItem(updated)
      return updated
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function approve() {
    const updated = await save({ status: 'approved', reviewedBy: user?.primaryEmailAddress?.emailAddress })
    if (updated) setSuccess('Approved! Ready to schedule or publish.')
  }

  async function handlePublish() {
    if (!item) return
    setPublishing(true)
    setError('')
    setSuccess('')
    try {
      // Save latest content first
      await save({ status: 'approved' })
      const latest = { ...item, content, scheduledAt: scheduledAt || null, mediaUrls: item.media_urls || [], locationIds: item.platform === 'gbp' ? selectedLocs : undefined }
      await publishAndTrack(latest, user?.primaryEmailAddress?.emailAddress)
      setSuccess(scheduledAt ? 'Scheduled successfully!' : 'Published successfully!')
      setTimeout(() => navigate('/hub'), 1500)
    } catch (e) {
      setError(`Publish failed: ${e.message}`)
    } finally {
      setPublishing(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function removeMedia(index) {
    const urls = [...(item.media_urls || [])]
    urls.splice(index, 1)
    const updated = await updateContentItem(itemId, { mediaUrls: urls })
    setItem(updated)
  }

  async function addMedia(file) {
    const urls = [...(item.media_urls || []), file]
    const updated = await updateContentItem(itemId, { mediaUrls: urls })
    setItem(updated)
    setShowPicker(false)
  }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
  if (!item)   return null

  const pm = PLATFORM_META[item.platform] || PLATFORM_META.blog
  const sm = STATUS_META[item.status]     || STATUS_META.draft
  const Icon = pm.icon
  const needsMedia      = NEEDS_MEDIA.includes(item.platform)
  const hasMedia        = (item.media_urls || []).length > 0
  const canPublishDirect = DIRECT_PLATFORMS.includes(item.platform)
  const usesBuffer      = BUFFER_PLATFORMS.includes(item.platform)
  const isPublished     = item.status === 'published'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/hub"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className={`h-9 w-9 rounded-lg ${pm.bg} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${pm.color}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{item.topic}</h1>
            <Badge className={`text-xs ${sm.color} border-0`}>{sm.label}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{pm.label} · {item.clinician_name} · {formatDate(item.created_at)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: editor */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Content</label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <><Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />Copied</> : <><Copy className="h-3.5 w-3.5 mr-1.5" />Copy</>}
              </Button>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              className="font-mono text-sm resize-none"
              disabled={isPublished}
            />
            <p className="text-xs text-muted-foreground mt-1.5">{content.length} characters · {content.split(/\s+/).filter(Boolean).length} words</p>
          </div>

          {/* Media */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Media</label>
                {needsMedia && !hasMedia && (
                  <Badge className="text-xs bg-amber-100 text-amber-700 border-0">Required for {pm.label}</Badge>
                )}
              </div>
              {!isPublished && (
                <Button variant="outline" size="sm" onClick={() => setShowPicker(true)}>
                  <Image className="h-3.5 w-3.5 mr-1.5" />Add Media
                </Button>
              )}
            </div>

            {(item.media_urls || []).length === 0 ? (
              <div
                onClick={() => !isPublished && setShowPicker(true)}
                className={`border-2 border-dashed rounded-lg p-8 text-center ${!isPublished ? 'cursor-pointer hover:border-primary/50 hover:bg-accent/30' : ''} transition-colors`}
              >
                <Image className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {isPublished ? 'No media attached' : 'Click to add photos or videos from Google Drive or upload your own'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {item.media_urls.map((m, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border bg-muted aspect-square">
                    {m.type === 'video' ? (
                      <div className="h-full flex items-center justify-center bg-slate-100">
                        <span className="text-xs text-muted-foreground text-center px-2">{m.name}</span>
                      </div>
                    ) : (
                      <img src={m.thumbnailUrl || m.url} alt={m.name} className="w-full h-full object-cover" />
                    )}
                    {!isPublished && (
                      <button
                        onClick={() => removeMedia(i)}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                    <a href={m.viewUrl} target="_blank" rel="noopener noreferrer"
                       className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: actions */}
        <div className="space-y-4">
          {/* Status actions */}
          {!isPublished && (
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-sm font-medium">Publish this post</p>

              {/* Schedule picker */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Schedule for (optional)</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full text-xs border rounded-md px-2.5 py-2 bg-background"
                />
              </div>

              <Separator />

              {/* Save */}
              <Button variant="outline" size="sm" className="w-full" onClick={() => save()} disabled={saving}>
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
                Save Changes
              </Button>

              {/* Approve */}
              {item.status === 'draft' || item.status === 'in_review' ? (
                <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50" onClick={approve} disabled={saving}>
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />Approve
                </Button>
              ) : null}

              {/* GBP location picker */}
              {item.platform === 'gbp' && gbpLocations.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Post to locations</label>
                  <div className="space-y-1">
                    {gbpLocations.map((loc) => (
                      <label key={loc.id} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLocs.includes(loc.id)}
                          onChange={(e) => setSelectedLocs((prev) =>
                            e.target.checked ? [...prev, loc.id] : prev.filter((id) => id !== loc.id)
                          )}
                          className="rounded"
                        />
                        {loc.name}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Publish */}
              <Button
                size="sm"
                className="w-full"
                onClick={handlePublish}
                disabled={publishing || (needsMedia && !hasMedia) || (item.platform === 'gbp' && selectedLocs.length === 0)}
              >
                {publishing
                  ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  : scheduledAt
                    ? <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                    : <Send className="h-3.5 w-3.5 mr-1.5" />
                }
                {publishing ? 'Publishing…' : scheduledAt ? 'Schedule Post' : 'Publish Now'}
              </Button>

              {needsMedia && !hasMedia && (
                <p className="text-xs text-amber-600 text-center">Add a photo or video to publish to {pm.label}</p>
              )}

              {/* Platform note */}
              <p className="text-xs text-muted-foreground text-center">
                {canPublishDirect
                  ? `Posts directly to your ${pm.label} page`
                  : usesBuffer
                    ? `Published via Buffer → ${pm.label}`
                    : 'Copy and paste into your CMS'}
              </p>
            </div>
          )}

          {isPublished && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto" />
              <p className="text-sm font-medium text-green-800">Published</p>
              {item.published_at && <p className="text-xs text-green-700">{formatDate(item.published_at)}</p>}
              {item.platform_post_id && <p className="text-xs text-muted-foreground font-mono">{item.platform_post_id}</p>}
            </div>
          )}

          {/* Feedback */}
          {error && (
            <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />{error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 rounded-lg p-3">
              <CheckCircle2 className="h-4 w-4 shrink-0" />{success}
            </div>
          )}

          {/* Interview link */}
          <div className="rounded-lg bg-muted p-3 space-y-1">
            <p className="text-xs font-medium">Source interview</p>
            <Link
              to={`/output/${item.clinician_id}/${item.interview_id}`}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all outputs <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Media picker modal */}
      {showPicker && (
        <MediaPicker
          onSelect={addMedia}
          onClose={() => setShowPicker(false)}
          topic={item.topic}
        />
      )}
    </div>
  )
}
