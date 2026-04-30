import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, MessageSquare, Clock, ChevronRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getClinicians } from '@/lib/storage'
import { getInitials, formatRelativeDate } from '@/lib/utils'

export default function Dashboard() {
  const [clinicians, setClinicians] = useState([])

  useEffect(() => {
    setClinicians(getClinicians())
  }, [])

  const totalInterviews = clinicians.reduce((sum, c) => sum + c.interviews.length, 0)
  const completedInterviews = clinicians.reduce(
    (sum, c) => sum + c.interviews.filter((i) => i.status === 'completed').length,
    0
  )

  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Stats */}
      {clinicians.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Clinicians" value={clinicians.length} icon={<Users className="h-4 w-4" />} />
          <StatCard label="Interviews" value={totalInterviews} icon={<MessageSquare className="h-4 w-4" />} />
          <StatCard label="Completed" value={completedInterviews} icon={<Clock className="h-4 w-4" />} />
        </div>
      )}

      {/* Clinician tiles */}
      {clinicians.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Clinicians</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clinicians.map((clinician) => (
              <ClinicianTile key={clinician.id} clinician={clinician} />
            ))}
            <NewClinicianTile />
          </div>
        </div>
      )}
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
  const completed = clinician.interviews.filter((i) => i.status === 'completed').length
  const inProgress = clinician.interviews.filter((i) => i.status === 'in_progress').length
  const lastInterview = clinician.interviews[0]

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
              {clinician.interviews.length === 0
                ? 'No interviews yet'
                : `${clinician.interviews.length} interview${clinician.interviews.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {clinician.interviews.length > 0 && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {completed > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {completed} completed
                </Badge>
              )}
              {inProgress > 0 && (
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                  {inProgress} in progress
                </Badge>
              )}
            </div>
            {lastInterview && (
              <p className="text-xs text-muted-foreground">
                Last: {lastInterview.topic} · {formatRelativeDate(lastInterview.updatedAt)}
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
