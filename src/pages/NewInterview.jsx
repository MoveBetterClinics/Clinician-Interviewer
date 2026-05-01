import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowLeft, ArrowRight, Stethoscope, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getOrCreateClinician, createInterview } from '@/lib/api'

const SUGGESTED_CONDITIONS = [
  'Low back pain', 'Neck pain', 'Shoulder impingement', 'Knee pain',
  'Sciatica', 'Hip flexor tightness', 'Headaches & migraines', 'Plantar fasciitis',
  'Rotator cuff injury', 'Text neck', 'IT band syndrome', 'Whiplash',
]

export default function NewInterview() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [clinicianName, setClinicianName] = useState('')
  const [condition, setCondition] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleNext() {
    if (step === 1 && clinicianName.trim()) setStep(2)
  }

  async function handleStart(selectedCondition) {
    const topic = (selectedCondition ?? condition).trim()
    if (!clinicianName.trim() || !topic || !user) return

    setLoading(true)
    setError('')
    try {
      const clinician = await getOrCreateClinician({
        name: clinicianName.trim(),
        createdById: user.id,
        createdByEmail: user.primaryEmailAddress?.emailAddress,
      })
      const interview = await createInterview({
        clinicianId: clinician.id,
        topic,
        ownerId: user.id,
        ownerEmail: user.primaryEmailAddress?.emailAddress,
      })
      navigate(`/interview/${clinician.id}/${interview.id}`)
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold">New Interview</h1>
          <p className="text-sm text-muted-foreground">Step {step} of 2</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">{error}</div>
      )}

      {step === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Who are we interviewing?</CardTitle>
                <CardDescription>Enter the clinician's full name</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Clinician Name</Label>
              <Input
                id="name"
                placeholder="e.g. Dr. Michael Quasney"
                value={clinicianName}
                onChange={(e) => setClinicianName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                If this clinician has been interviewed before, they'll be linked to their existing profile.
              </p>
            </div>
            <Button onClick={handleNext} disabled={!clinicianName.trim()} className="w-full">
              Continue
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">What condition are we covering?</CardTitle>
                <CardDescription>Pick a suggestion or type your own</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="condition">Condition / Topic</Label>
              <Input
                id="condition"
                placeholder="e.g. Low back pain"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                autoFocus
              />
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Suggested topics:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_CONDITIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleStart(c)}
                    disabled={loading}
                    className="text-xs px-2.5 py-1 rounded-full border border-input hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-50"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={loading}>
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back
              </Button>
              <Button onClick={() => handleStart()} disabled={!condition.trim() || loading} className="flex-1">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Start Interview
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
