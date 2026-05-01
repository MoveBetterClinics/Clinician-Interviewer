import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Copy, Check, Instagram, Facebook, FileText, RefreshCw, Loader2,
  Globe, Video, Mail, Linkedin, Youtube, MapPin, Search, Layout, Smartphone, Pin, Share2,
} from 'lucide-react'
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

  const o = interview.outputs

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
              {clinician.name} · Generated {formatDate(o.generatedAt)}
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="blog" className="gap-1.5 text-xs">
            <FileText className="h-3.5 w-3.5" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-1.5 text-xs">
            <Share2 className="h-3.5 w-3.5" />
            Social
          </TabsTrigger>
          <TabsTrigger value="google" className="gap-1.5 text-xs">
            <Globe className="h-3.5 w-3.5" />
            Google
          </TabsTrigger>
          <TabsTrigger value="video" className="gap-1.5 text-xs">
            <Video className="h-3.5 w-3.5" />
            Video
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-1.5 text-xs">
            <Mail className="h-3.5 w-3.5" />
            Email
          </TabsTrigger>
        </TabsList>

        {/* ── Blog ── */}
        <TabsContent value="blog">
          <OutputCard
            title="Blog Post"
            subtitle="Markdown — paste into your CMS or blog editor"
            content={o.blogPost}
            badge="Markdown"
          />
        </TabsContent>

        {/* ── Social Media ── */}
        <TabsContent value="social">
          <Tabs defaultValue="instagram">
            <TabsList className="grid w-full grid-cols-4 mt-1">
              <TabsTrigger value="instagram" className="gap-1.5 text-xs">
                <Instagram className="h-3.5 w-3.5" />
                Instagram
              </TabsTrigger>
              <TabsTrigger value="facebook" className="gap-1.5 text-xs">
                <Facebook className="h-3.5 w-3.5" />
                Facebook
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="gap-1.5 text-xs">
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </TabsTrigger>
              <TabsTrigger value="pinterest" className="gap-1.5 text-xs">
                <Pin className="h-3.5 w-3.5" />
                Pinterest
              </TabsTrigger>
            </TabsList>
            <TabsContent value="instagram">
              <OutputCard
                title="Instagram Caption"
                subtitle="Copy and paste into your Instagram post — no URLs in body, use bio link"
                content={o.instagram}
                badge="Instagram"
              />
            </TabsContent>
            <TabsContent value="facebook">
              <OutputCard
                title="Facebook Post"
                subtitle="Copy and paste into your Facebook page — URL generates a rich link preview"
                content={o.facebook}
                badge="Facebook"
              />
            </TabsContent>
            <TabsContent value="linkedin">
              <OutputCard
                title="LinkedIn Post"
                subtitle="Post from the clinician's personal LinkedIn for maximum reach"
                content={o.linkedin}
                badge="LinkedIn"
              />
            </TabsContent>
            <TabsContent value="pinterest">
              <OutputCard
                title="Pinterest Pins"
                subtitle="3 pin variations — use with a vertical image linked to the blog post"
                content={o.pinterest}
                badge="Pinterest"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ── Google ── */}
        <TabsContent value="google">
          <Tabs defaultValue="gbp">
            <TabsList className="grid w-full grid-cols-3 mt-1">
              <TabsTrigger value="gbp" className="gap-1.5 text-xs">
                <MapPin className="h-3.5 w-3.5" />
                GBP Post
              </TabsTrigger>
              <TabsTrigger value="ads" className="gap-1.5 text-xs">
                <Search className="h-3.5 w-3.5" />
                Google Ads
              </TabsTrigger>
              <TabsTrigger value="landing" className="gap-1.5 text-xs">
                <Layout className="h-3.5 w-3.5" />
                Landing Page
              </TabsTrigger>
            </TabsList>
            <TabsContent value="gbp">
              <OutputCard
                title="Google Business Profile Post"
                subtitle="Post directly to your GBP — appears in Maps and Search results"
                content={o.gbpPost}
                badge="GBP"
              />
            </TabsContent>
            <TabsContent value="ads">
              <OutputCard
                title="Google Search Ad Copy"
                subtitle="Responsive Search Ad — 15 headlines, 4 descriptions, extensions"
                content={o.googleAds}
                badge="Google Ads"
              />
            </TabsContent>
            <TabsContent value="landing">
              <OutputCard
                title="Landing Page Copy"
                subtitle="Conversion-focused page copy — includes SEO title tag and meta description"
                content={o.landingPage}
                badge="Landing Page"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ── Video ── */}
        <TabsContent value="video">
          <Tabs defaultValue="youtube">
            <TabsList className="grid w-full grid-cols-2 mt-1">
              <TabsTrigger value="youtube" className="gap-1.5 text-xs">
                <Youtube className="h-3.5 w-3.5" />
                YouTube Script
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="gap-1.5 text-xs">
                <Smartphone className="h-3.5 w-3.5" />
                TikTok / Reels
              </TabsTrigger>
            </TabsList>
            <TabsContent value="youtube">
              <OutputCard
                title="YouTube Video Script"
                subtitle="5–8 minute script with B-roll cues, patient story, and video description"
                content={o.youtubeScript}
                badge="YouTube"
              />
            </TabsContent>
            <TabsContent value="tiktok">
              <OutputCard
                title="TikTok / Reels Script"
                subtitle="45–60 second vertical video script with on-screen text cues and caption"
                content={o.tiktokScript}
                badge="TikTok / Reels"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ── Email ── */}
        <TabsContent value="email">
          <OutputCard
            title="Email Newsletter"
            subtitle="GoHighLevel-ready — subject lines, preview text, and body copy included"
            content={o.emailNewsletter}
            badge="Newsletter"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OutputCard({ title, subtitle, content, badge }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(content || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!content) {
    return (
      <div className="rounded-xl border bg-muted/30 p-10 text-center space-y-2 mt-2">
        <p className="text-sm font-medium text-muted-foreground">Not generated yet</p>
        <p className="text-xs text-muted-foreground">
          This format is available on newly generated interviews. Return to the interview and click Generate to create all formats.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden mt-2">
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
