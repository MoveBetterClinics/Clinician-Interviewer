import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Instagram, Facebook, Linkedin, Pin, Globe, FileText, Video, Mail,
  MapPin, Search, ChevronRight, Clock, CheckCircle2, Send, CalendarDays,
  AlertCircle, Loader2, RefreshCw, Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { fetchContentItems } from '@/lib/publish'
import { formatRelativeDate } from '@/lib/utils'

const PLATFORM_META = {
  blog:         { label: 'Blog',       icon: FileText,   color: 'text-slate-600',  bg: 'bg-slate-100' },
  instagram:    { label: 'Instagram',  icon: Instagram,  color: 'text-pink-600',   bg: 'bg-pink-50' },
  facebook:     { label: 'Facebook',   icon: Facebook,   color: 'text-blue-600',   bg: 'bg-blue-50' },
  linkedin:     { label: 'LinkedIn',   icon: Linkedin,   color: 'text-sky-700',    bg: 'bg-sky-50' },
  pinterest:    { label: 'Pinterest',  icon: Pin,        color: 'text-red-600',    bg: 'bg-red-50' },
  gbp:          { label: 'Google Biz', icon: MapPin,     color: 'text-green-700',  bg: 'bg-green-50' },
  google_ads:   { label: 'Google Ads', icon: Search,     color: 'text-yellow-700', bg: 'bg-yellow-50' },
  landing_page: { label: 'Landing Pg', icon: Globe,      color: 'text-purple-600', bg: 'bg-purple-50' },
  video_script: { label: 'Video',      icon: Video,      color: 'text-orange-600', bg: 'bg-orange-50' },
  email:        { label: 'Email',      icon: Mail,       color: 'text-teal-600',   bg: 'bg-teal-50' },
}

const STATUS_META = {
  draft:      { label: 'Draft',      color: 'bg-slate-100 text-slate-700',   icon: FileText },
  in_review:  { label: 'In Review',  color: 'bg-amber-100 text-amber-700',   icon: Clock },
  approved:   { label: 'Approved',   color: 'bg-blue-100 text-blue-700',     icon: CheckCircle2 },
  scheduled:  { label: 'Scheduled',  color: 'bg-purple-100 text-purple-700', icon: CalendarDays },
  published:  { label: 'Published',  color: 'bg-green-100 text-green-700',   icon: Send },
}

const STATUS_TABS = ['all', 'draft', 'in_review', 'approved', 'scheduled', 'published']

export default function ContentHub() {
  const [items, setItems]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [activeStatus, setStatus] = useState('all')
  const [platform, setPlatform]   = useState('all')
  const [error, setError]         = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const filters = {}
      if (activeStatus !== 'all') filters.status = activeStatus
      if (platform !== 'all')     filters.platform = platform
      setItems(await fetchContentItems(filters))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [activeStatus, platform])

  const counts = items.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1
    return acc
  }, {})

  const needsMedia = items.filter((i) =>
    ['draft', 'in_review', 'approved'].includes(i.status) &&
    ['instagram', 'facebook', 'gbp'].includes(i.platform) &&
    (!i.media_urls || i.media_urls.length === 0)
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Hub</h1>
          <p className="text-muted-foreground text-sm mt-1">Review, approve, and publish your interview content.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/calendar"><CalendarDays className="h-4 w-4 mr-1.5" />Calendar</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={load}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatChip label="Drafts"    value={counts.draft || 0}     color="text-slate-600" />
        <StatChip label="In Review" value={counts.in_review || 0} color="text-amber-600" />
        <StatChip label="Scheduled" value={counts.scheduled || 0} color="text-purple-600" />
        <StatChip label="Published" value={counts.published || 0} color="text-green-600" />
      </div>

      {/* Media needed warning */}
      {needsMedia > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>{needsMedia} posts</strong> need photos or videos before they can be published.{' '}
            <Link to="/calendar" className="underline underline-offset-2">See media calendar →</Link>
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {STATUS_TABS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors capitalize ${
                activeStatus === s ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_META[s]?.label}
              {s !== 'all' && counts[s] ? ` (${counts[s]})` : ''}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="text-xs border rounded-md px-2 py-1.5 bg-background"
          >
            <option value="all">All platforms</option>
            {Object.entries(PLATFORM_META).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
        </div>
      ) : error ? (
        <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-4">{error}</div>
      ) : items.length === 0 ? (
        <EmptyState status={activeStatus} />
      ) : (
        <div className="space-y-2">
          {items.map((item) => <ContentRow key={item.id} item={item} />)}
        </div>
      )}
    </div>
  )
}

function ContentRow({ item }) {
  const pm = PLATFORM_META[item.platform] || PLATFORM_META.blog
  const sm = STATUS_META[item.status]     || STATUS_META.draft
  const Icon = pm.icon
  const preview = item.content?.replace(/[#*_`]/g, '').slice(0, 120)
  const hasMedia = item.media_urls?.length > 0
  const needsMedia = ['instagram', 'facebook', 'gbp'].includes(item.platform) && !hasMedia

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4 flex items-start gap-4">
        {/* Platform icon */}
        <div className={`h-10 w-10 rounded-lg ${pm.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`h-5 w-5 ${pm.color}`} />
        </div>

        {/* Content preview */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-medium">{item.topic}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{item.clinician_name}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{formatRelativeDate(item.created_at)}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{preview}…</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge className={`text-xs ${sm.color} border-0`}>{sm.label}</Badge>
            {needsMedia && (
              <Badge className="text-xs bg-amber-100 text-amber-700 border-0">⚠ Needs media</Badge>
            )}
            {hasMedia && (
              <Badge className="text-xs bg-slate-100 text-slate-600 border-0">
                {item.media_urls.length} media file{item.media_urls.length !== 1 ? 's' : ''}
              </Badge>
            )}
            {item.scheduled_at && (
              <span className="text-xs text-purple-600 font-medium">
                Scheduled {formatRelativeDate(item.scheduled_at)}
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button asChild variant="ghost" size="sm" className="shrink-0">
          <Link to={`/review/${item.id}`}>
            {item.status === 'draft' ? 'Review' : item.status === 'published' ? 'View' : 'Edit'}
            <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function StatChip({ label, value, color }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}

function EmptyState({ status }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
        <FileText className="h-7 w-7 text-muted-foreground" />
      </div>
      <h2 className="text-base font-semibold mb-1">
        {status === 'all' ? 'No content yet' : `No ${status.replace('_', ' ')} content`}
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs">
        {status === 'all'
          ? 'Complete an interview to generate content that will appear here.'
          : 'Content will appear here once interviews are completed and reviewed.'}
      </p>
    </div>
  )
}

export { PLATFORM_META, STATUS_META }
