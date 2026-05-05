import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Plus, MessageSquare, Clock, ChevronRight, Users, Loader2, LayoutGrid, User, Tag, TrendingUp, AlertCircle, Target, Check, FileText, Share2, Globe, Video, Mail, Mic, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { fetchClinicians, fetchCampaign, updateCampaign } from '@/lib/api'
import { CAMPAIGN_MODES } from '@/lib/campaigns'
import { getSuggestedTopics } from '@brand-overlay/topicSuggestions'
import { getInitials, formatRelativeDate } from '@/lib/utils'
import { brand } from '@/lib/brand'

export default function Dashboard() {
  const { user } = useUser()
  const [clinicians, setClinicians] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [campaign, setCampaign] = useState({ mode: 'bookings', notes: '' })
  const [campaignSaving, setCampaignSaving] = useState(false)
  const [notesSaved, setNotesSaved] = useState(false)
  const notesTimerRef = useRef(null)

  useEffect(() => {
    fetchClinicians()
      .then(setClinicians)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
    fetchCampaign()
      .then(setCampaign)
      .catch(() => {})
  }, [])

  async function handleModeChange(mode) {
    const next = { ...campaign, mode }
    setCampaign(next)
    setCampaignSaving(true)
    try {
      await updateCampaign({ mode }, user?.id)
    } catch {}
    setCampaignSaving(false)
  }

  function handleNotesChange(notes) {
    setCampaign((c) => ({ ...c, notes }))
    setNotesSaved(false)
    clearTimeout(notesTimerRef.current)
    notesTimerRef.current = setTimeout(async () => {
      try {
        await updateCampaign({ notes }, user?.id)
        setNotesSaved(true)
        setTimeout(() => setNotesSaved(false), 2000)
      } catch {}
    }, 800)
  }

  const allInterviews = clinicians.flatMap((c) =>
    (c.interviews || []).map((i) => ({ ...i, clinicianName: c.name, clinicianId: c.id }))
  )
  const completedCount = allInterviews.filter((i) => i.status === 'completed').length

  const byInterviewer = groupBy(allInterviews, (i) => i.owner_email || 'unknown')
  const byTopic = groupBy(allInterviews, (i) => i.topic)

  // Topic coverage analysis
  const existingTopics = allInterviews.map((i) => i.topic)
  const topicGaps = getSuggestedTopics(existingTopics)
    .filter((t) => t.interviewCount === 0 && t.priority === 'high')
    .slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive mb-2">Failed to load data</p>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{brand.appName}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Capture your clinicians' expertise and turn it into patient-facing content.
          </p>
        </div>
        <Button asChild>
          <Link to="/new">
            <Plus className="h-4 w-4 mr-1.5" />
            New Interview
          </Link>
        </Button>
      </div>

      <AboutPanel />

      {clinicians.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Clinicians" value={clinicians.length} icon={<Users className="h-4 w-4" />} />
          <StatCard label="Interviews" value={allInterviews.length} icon={<MessageSquare className="h-4 w-4" />} />
          <StatCard label="Completed" value={completedCount} icon={<Clock className="h-4 w-4" />} />
        </div>
      )}

      {/* Campaign Mode */}
      <CampaignWidget
        campaign={campaign}
        saving={campaignSaving}
        notesSaved={notesSaved}
        onModeChange={handleModeChange}
        onNotesChange={handleNotesChange}
      />

      {/* Content gaps callout */}
      {topicGaps.length > 0 && allInterviews.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-900">
                High-search topics with no content yet
              </p>
              <p className="text-xs text-amber-700 mt-0.5 mb-3">
                Patients in the Pacific Northwest are actively searching for these — consider scheduling interviews to cover them.
              </p>
              <div className="flex flex-wrap gap-2">
                {topicGaps.map((t) => (
                  <Link
                    key={t.topic}
                    to={`/new?topic=${encodeURIComponent(t.topic)}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 hover:bg-amber-200 transition-colors"
                  >
                    + {t.topic}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {clinicians.length === 0 ? (
        <EmptyState />
      ) : (
        <Tabs defaultValue="clinician">
          <TabsList className="mb-6">
            <TabsTrigger value="clinician" className="gap-2">
              <LayoutGrid className="h-3.5 w-3.5" />
              By Clinician
            </TabsTrigger>
            <TabsTrigger value="interviewer" className="gap-2">
              <User className="h-3.5 w-3.5" />
              By Interviewer
            </TabsTrigger>
            <TabsTrigger value="topic" className="gap-2">
              <Tag className="h-3.5 w-3.5" />
              By Topic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clinician">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clinicians.map((c) => (
                <ClinicianTile key={c.id} clinician={c} />
              ))}
              <NewClinicianTile />
            </div>
          </TabsContent>

          <TabsContent value="interviewer">
            <div className="space-y-8">
              {Object.entries(byInterviewer)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([email, interviews]) => (
                  <InterviewerSection
                    key={email}
                    email={email}
                    interviews={interviews}
                    currentUserId={user?.id}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="topic">
            <TopicView byTopic={byTopic} existingTopics={existingTopics} currentUserId={user?.id} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

// ── By Topic view ────────────────────────────────────────────────────────────

function TopicView({ byTopic, existingTopics, currentUserId }) {
  const [selected, setSelected] = useState(null)

  const allSuggestions = getSuggestedTopics(existingTopics)
  const gaps = allSuggestions.filter((t) => t.interviewCount === 0 && t.priority !== 'low')

  // Build sorted topic rows from actual interviews
  const topicRows = Object.entries(byTopic)
    .map(([topic, interviews]) => ({
      topic,
      interviews,
      total: interviews.length,
      completed: interviews.filter((i) => i.status === 'completed').length,
    }))
    .sort((a, b) => b.total - a.total)

  const maxCount = topicRows[0]?.total || 1

  return (
    <div className="space-y-8">
      {/* Topic count grid */}
      <div>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Interview Count by Topic
        </h2>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Topic</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-40 hidden sm:table-cell">Coverage</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground w-24">Interviews</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {topicRows.map(({ topic, interviews, total, completed }) => (
                <>
                  <tr
                    key={topic}
                    className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={() => setSelected(selected === topic ? null : topic)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{topic}</span>
                        {completed > 0 && (
                          <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                            {completed} complete
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${(total / maxCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold tabular-nums">{total}</span>
                    </td>
                    <td className="px-2 py-3">
                      <ChevronRight
                        className={`h-4 w-4 text-muted-foreground transition-transform ${selected === topic ? 'rotate-90' : ''}`}
                      />
                    </td>
                  </tr>
                  {selected === topic && (
                    <tr key={`${topic}-detail`} className="bg-muted/10">
                      <td colSpan={4} className="px-4 pb-3 pt-1">
                        <div className="space-y-2">
                          {interviews.map((i) => (
                            <InterviewListRow key={i.id} interview={i} currentUserId={currentUserId} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coverage gaps */}
      {gaps.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Not yet covered — high patient search interest
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {gaps.slice(0, 12).map((t) => (
              <Link
                key={t.topic}
                to={`/new?topic=${encodeURIComponent(t.topic)}`}
                className="flex items-center justify-between rounded-lg border border-dashed px-3 py-2.5 hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{t.topic}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.category}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs shrink-0 ml-2 ${t.priority === 'high' ? 'border-amber-300 text-amber-700' : ''}`}
                >
                  {t.priority}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
}

function formatInterviewerName(email) {
  if (!email || email === 'unknown') return 'Unknown'
  const [local] = email.split('@')
  return local
    .split('.')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function CampaignWidget({ campaign, saving, notesSaved, onModeChange, onNotesChange }) {
  const currentMode = CAMPAIGN_MODES[campaign.mode] || CAMPAIGN_MODES.bookings
  const showNotes = currentMode.showNotes

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold">Content Focus</p>
        </div>
        {saving && <span className="text-xs text-muted-foreground">Saving…</span>}
        {!saving && notesSaved && (
          <span className="flex items-center gap-1 text-xs text-green-600">
            <Check className="h-3 w-3" /> Saved
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Object.entries(CAMPAIGN_MODES).map(([key, def]) => (
          <button
            key={key}
            onClick={() => onModeChange(key)}
            className={`text-left rounded-lg border p-3 transition-colors text-sm ${
              campaign.mode === key
                ? 'bg-primary/5 border-primary/40 text-primary'
                : 'hover:bg-muted/50 text-foreground'
            }`}
          >
            <p className="font-medium text-xs leading-snug">{def.label}</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-snug line-clamp-2">{def.description}</p>
          </button>
        ))}
      </div>

      {showNotes && (
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">{currentMode.notesPlaceholder}</p>
          <Textarea
            value={campaign.notes || ''}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder={currentMode.notesPlaceholder}
            className="text-sm min-h-[72px] resize-none"
          />
          <p className="text-[11px] text-muted-foreground">
            These details are injected into every content generation for this condition. Update them whenever event or campaign details change.
          </p>
        </div>
      )}
    </div>
  )
}

function AboutPanel() {
  const outputs = [
    { icon: <FileText className="h-3.5 w-3.5" />, label: 'Blog Post', detail: 'SEO-optimized, 700–950 words, with internal and external links' },
    { icon: <Share2 className="h-3.5 w-3.5" />, label: 'Social Media', detail: 'Instagram, Facebook, LinkedIn, Pinterest — each formatted for the platform' },
    { icon: <Globe className="h-3.5 w-3.5" />, label: 'Google', detail: 'Business Profile post, Search Ad copy (RSA), and a landing page with SEO meta' },
    { icon: <Video className="h-3.5 w-3.5" />, label: 'Video Scripts', detail: 'YouTube script (5–8 min, with B-roll cues) and TikTok / Reels script (45–60 sec)' },
    { icon: <Mail className="h-3.5 w-3.5" />, label: 'Email Newsletter', detail: 'GoHighLevel-ready with subject lines, preview text, and body copy' },
  ]

  return (
    <div className="rounded-xl border bg-card divide-y">
      {/* What and why */}
      <div className="p-5 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="space-y-1.5">
            <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">What this is</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              A structured interview tool that captures how each {brand.name} clinician practices {brand.tagline} — in their own words. That clinical perspective is what patients and referring providers actually want to know, but it rarely makes it off the treatment table.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Why the interview format</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              Clinicians don't have time to write content — and generic health articles don't reflect {brand.name}'s movement-first philosophy anyway. An interview takes 15–30 minutes of conversation. The AI does the writing. The result sounds like {brand.name} because it came directly from your clinicians.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">How to get started</p>
            <p className="text-sm leading-relaxed text-foreground/80">
              Click <strong>New Interview</strong>, choose a clinician and a condition, then speak naturally when the interviewer asks questions. When you're satisfied with the conversation, click <strong>Finish</strong> and the AI generates everything below automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Output types */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What each interview produces — automatically
          </p>
        </div>
        <div className="grid sm:grid-cols-5 gap-2">
          {outputs.map(({ icon, label, detail }) => (
            <div key={label} className="rounded-lg bg-muted/40 border px-3 py-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-primary">
                {icon}
                <span className="text-xs font-semibold">{label}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution strategy link */}
      <div className="px-5 py-3 border-t bg-muted/20 rounded-b-xl">
        <p className="text-xs text-muted-foreground">
          Want to understand how this content gets distributed across channels?{' '}
          <Link
            to="/strategy"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            Read the {brand.name} Content Distribution Strategy
          </Link>
        </p>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function ClinicianTile({ clinician }) {
  const interviews = clinician.interviews || []
  const completed = interviews.filter((i) => i.status === 'completed').length
  const inProgress = interviews.filter((i) => i.status === 'in_progress').length
  const last = interviews[0]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 text-base">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(clinician.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{clinician.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {interviews.length === 0
                ? 'No interviews yet'
                : `${interviews.length} interview${interviews.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {interviews.length > 0 && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {completed > 0 && (
                <Badge variant="secondary" className="text-xs">{completed} completed</Badge>
              )}
              {inProgress > 0 && (
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                  {inProgress} in progress
                </Badge>
              )}
            </div>
            {last && (
              <p className="text-xs text-muted-foreground">
                Last: {last.topic} · {formatRelativeDate(last.updated_at)}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="ghost" size="sm" className="w-full justify-between">
          <Link to={`/clinician/${clinician.id}`}>
            View Profile
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function InterviewerSection({ email, interviews, currentUserId }) {
  const name = formatInterviewerName(email)
  const isMe = interviews.some((i) => i.owner_id === currentUserId)

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {name[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-sm font-semibold">{name}</h2>
        {isMe && <Badge variant="outline" className="text-xs">You</Badge>}
        <span className="text-xs text-muted-foreground ml-1">
          {interviews.length} interview{interviews.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-2 pl-9">
        {interviews.map((i) => (
          <InterviewListRow key={i.id} interview={i} currentUserId={currentUserId} showClinician />
        ))}
      </div>
    </div>
  )
}

function InterviewListRow({ interview, currentUserId, showClinician }) {
  const isOwner = interview.owner_id === currentUserId
  const isComplete = interview.status === 'completed'
  const href = isComplete
    ? `/output/${interview.clinicianId}/${interview.id}`
    : isOwner
    ? `/interview/${interview.clinicianId}/${interview.id}`
    : null

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          {showClinician && (
            <p className="text-xs text-muted-foreground truncate">{interview.clinicianName}</p>
          )}
          <p className="font-medium text-sm truncate">{interview.topic}</p>
          <p className="text-xs text-muted-foreground">{formatRelativeDate(interview.updated_at)}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge
            variant={isComplete ? 'secondary' : 'outline'}
            className={`text-xs ${!isComplete ? 'border-amber-300 text-amber-700' : ''}`}
          >
            {isComplete ? 'Complete' : 'In progress'}
          </Badge>
          {href ? (
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <Link to={href}>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div className="h-8 w-8" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function NewClinicianTile() {
  return (
    <Card className="border-dashed hover:border-primary/50 hover:bg-accent/30 transition-colors">
      <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full min-h-[160px] text-center">
        <Button asChild variant="ghost" className="flex-col gap-2 h-auto py-4 w-full">
          <Link to="/new">
            <div className="h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <Plus className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <span className="text-sm text-muted-foreground">New Interview</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Mic className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-lg font-semibold mb-1">Ready when you are</h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Choose a clinician and a condition to cover. The interview takes 15–30 minutes and the AI handles all the writing.
      </p>
      <Button asChild>
        <Link to="/new">
          <Plus className="h-4 w-4 mr-1.5" />
          Start First Interview
        </Link>
      </Button>
    </div>
  )
}
