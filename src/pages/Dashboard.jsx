import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Plus, MessageSquare, Clock, ChevronRight, Users, Loader2, LayoutGrid, User, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fetchClinicians } from '@/lib/api'
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
            <div className="space-y-8">
              {Object.entries(byTopic)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([topic, interviews]) => (
                  <TopicSection
                    key={topic}
                    topic={topic}
                    interviews={interviews}
                    currentUserId={user?.id}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

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

function TopicSection({ topic, interviews, currentUserId }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
        <h2 className="text-sm font-semibold">{topic}</h2>
        <span className="text-xs text-muted-foreground ml-1">
          {interviews.length} interview{interviews.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-2 pl-4">
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
