import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, Instagram, Facebook, FileText, RefreshCw, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { fetchClinician, fetchInterview } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export default function InterviewOutput() {
  const { clinicianId, interviewId } = useParams()
  const navigate = useNavigate()
  const [clinician, setClinician] = useState(null)
  const [interview, setInterview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchClinician(clinicianId), fetchInterview(interviewId)])
      .then(([c, i]) => {
        if (!c || !i || !i.outputs) { navigate('/'); return }
        setClinician(c)
        setInterview(i)
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [clinicianId, interviewId, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!clinician || !interview?.outputs) return null

  const { blogPost, instagram, facebook, generatedAt } = interview.outputs

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/clinician/${clinicianId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">{interview.topic}</h1>
            <p className="text-sm text-muted-foreground">
              {clinician.name} · Generated {formatDate(generatedAt)}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/interview/${clinicianId}/${interviewId}`}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            View Interview
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="blog">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blog" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Blog Post
          </TabsTrigger>
          <TabsTrigger value="instagram" className="gap-1.5">
            <Instagram className="h-3.5 w-3.5" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="facebook" className="gap-1.5">
            <Facebook className="h-3.5 w-3.5" />
            Facebook
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <OutputCard title="Blog Post" subtitle="Markdown — paste into your CMS or blog editor" content={blogPost} badge="Markdown" />
        </TabsContent>
        <TabsContent value="instagram">
          <OutputCard title="Instagram Caption" subtitle="Copy and paste into your Instagram post" content={instagram} badge="Instagram" />
        </TabsContent>
        <TabsContent value="facebook">
          <OutputCard title="Facebook Post" subtitle="Copy and paste into your Facebook page" content={facebook} badge="Facebook" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OutputCard({ title, subtitle, content, badge }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/30">
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{badge}</Badge>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[480px]">
        <pre className="p-5 text-sm leading-relaxed font-mono whitespace-pre-wrap text-foreground">
          {content}
        </pre>
      </ScrollArea>
    </div>
  )
}
