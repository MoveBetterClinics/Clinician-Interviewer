import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Plus, MessageSquare, Clock, ChevronRight, Users, Loader2, LayoutGrid, User, Tag, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fetchClinicians } from '@/lib/api'
import { getSuggestedTopics } from '@/lib/topicSuggestions'
import { getInitials, formatRelativeDate } from '@/lib/utils'

export default function Dashboard() {
  const { user } = useUser()
  const [clinicians, setClinicians] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchClinicians()
      .then(setClinicians)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

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
          <h1 className="text-2xl font-bold tracking-tight">Welcome to the Move Better Interview</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Interview your clinicians and generate on-brand content.
          </p>
        </div>
        <Button asChild>
          <Link to="/new">
            <Plus className="h-4 w-4 mr-1.5" />
            New Interview
          </Link>
        </Button>
      </div>

      {clinicians.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Clinicians" value={clinicians.length} icon={<Users className="h-4 w-4" />} />
          <StatCard label="Interviews" value={allInterviews.length} icon={<MessageSquare className="h-4 w-4" />} />
          <StatCard label="Completed" value={completedCount} icon={<Clock className="h-4 w-4" />} />
        </div>
      )}

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
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold mb-1">No interviews yet</h2>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        Start by interviewing a clinician about a condition they treat. We'll help generate blog posts and social content from the conversation.
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
