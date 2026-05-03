import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  ArrowLeft, Copy, Check, Instagram, Facebook, FileText, RefreshCw, Loader2,
  Globe, Video, Mail, Linkedin, Youtube, MapPin, Search, Layout, Smartphone, Pin, Share2, Pencil, Sparkles, Megaphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { fetchClinician, fetchInterview, fetchCampaign, updateInterview } from '@/lib/api'
import { fetchContentItemsByInterview, createContentItems } from '@/lib/publish'
import { generateContent } from '@/lib/claude'
import { brand } from '@/lib/brand'
import {
  getSocialBatchSystemPrompt,
  getVideoScriptBatchSystemPrompt,
  getMarketingBatchSystemPrompt,
} from '@/lib/prompts'
import { getCampaignPromptContext } from '@/lib/campaigns'
import { formatDate } from '@/lib/utils'

function parseSection(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker)
  if (start === -1) return ''
  const contentStart = start + startMarker.length
  const end = endMarker ? text.indexOf(endMarker, contentStart) : -1
  return (end === -1 ? text.slice(contentStart) : text.slice(contentStart, end)).trim()
}

export default function InterviewOutput() {
  const { clinicianId, interviewId } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()
  const [clinician, setClinician] = useState(null)
  const [interview, setInterview] = useState(null)
  const [outputs, setOutputs] = useState(null)
  const [loading, setLoading] = useState(true)
  const [itemMap, setItemMap] = useState({})
  const [generating, setGenerating] = useState(null) // 'social' | 'video' | 'marketing'
  const [genError, setGenError] = useState('')
  const [campaign, setCampaign] = useState(null)

  useEffect(() => {
    Promise.all([fetchClinician(clinicianId), fetchInterview(interviewId), fetchCampaign()])
      .then(([c, i, camp]) => {
        if (!c || !i || !i.outputs?.blogPost) { navigate('/'); return }
        setClinician(c)
        setInterview(i)
        setOutputs(i.outputs)
        setCampaign(camp)
        fetchContentItemsByInterview(interviewId)
          .then((items) => {
            const map = {}
            items.forEach((item) => { map[item.platform] = item.id })
            setItemMap(map)
          })
          .catch(() => {})
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [clinicianId, interviewId, navigate])

  async function generateGroup(group) {
    if (!outputs?.blogPost) return
    setGenerating(group)
    setGenError('')
    try {
      const tone = interview.tone || 'smart'
      const blogInput = [{ role: 'user', content: outputs.blogPost }]
      const campaignContext = getCampaignPromptContext(campaign)
      let updates = {}

      if (group === 'social') {
        const result = await generateContent(blogInput, getSocialBatchSystemPrompt(clinician.name, interview.topic, campaignContext, tone))
        updates = {
          instagram: parseSection(result, '---INSTAGRAM---', '---FACEBOOK---'),
          facebook: parseSection(result, '---FACEBOOK---', '---GBP POST---'),
          gbpPost: parseSection(result, '---GBP POST---', '---LINKEDIN---'),
          linkedin: parseSection(result, '---LINKEDIN---', '---PINTEREST---'),
          pinterest: parseSection(result, '---PINTEREST---', null),
        }
      } else if (group === 'video') {
        const result = await generateContent(blogInput, getVideoScriptBatchSystemPrompt(clinician.name, interview.topic, campaignContext, tone))
        updates = {
          youtubeScript: parseSection(result, '---YOUTUBE SCRIPT---', '---TIKTOK SCRIPT---'),
          tiktokScript: parseSection(result, '---TIKTOK SCRIPT---', null),
        }
      } else if (group === 'marketing') {
        const result = await generateContent(blogInput, getMarketingBatchSystemPrompt(clinician.name, interview.topic, campaignContext, tone))
        updates = {
          emailNewsletter: parseSection(result, '---EMAIL NEWSLETTER---', '---LANDING PAGE---'),
          landingPage: parseSection(result, '---LANDING PAGE---', '---GOOGLE ADS---'),
          googleAds: parseSection(result, '---GOOGLE ADS---', '---INSTAGRAM ADS---'),
          instagramAds: parseSection(result, '---INSTAGRAM ADS---', null),
        }
      }

      const newOutputs = { ...outputs, ...updates }
      setOutputs(newOutputs)
      if (user?.id) {
        await updateInterview(interviewId, { outputs: newOutputs }, user.id)
      }

      // Create content items in the database for each generated platform
      const platformsByGroup = {
        social: [
          { platform: 'instagram',    key: 'instagram' },
          { platform: 'facebook',     key: 'facebook' },
          { platform: 'gbp',          key: 'gbpPost' },
          { platform: 'linkedin',     key: 'linkedin' },
          { platform: 'pinterest',    key: 'pinterest' },
        ],
        video: [
          { platform: 'youtube',      key: 'youtubeScript' },
          { platform: 'tiktok',       key: 'tiktokScript' },
        ],
        marketing: [
          { platform: 'email',         key: 'emailNewsletter' },
          { platform: 'landing_page',  key: 'landingPage' },
          { platform: 'google_ads',    key: 'googleAds' },
          { platform: 'instagram_ads', key: 'instagramAds' },
        ],
      }
      const toCreate = (platformsByGroup[group] || [])
        .filter(({ platform, key }) => updates[key] && !itemMap[platform])
        .map(({ platform, key }) => ({
          interview_id: interviewId,
          clinician_id: clinicianId,
          clinician_name: clinician.name,
          topic: interview.topic,
          platform,
          content: updates[key],
          status: 'draft',
        }))
      if (toCreate.length > 0) {
        createContentItems(toCreate)
          .then((created) => {
            setItemMap((prev) => {
              const next = { ...prev }
              created.forEach((item) => { next[item.platform] = item.id })
              return next
            })
          })
          .catch(() => {})
      }
    } catch (err) {
      setGenError(err.message || 'Generation failed')
    } finally {
      setGenerating(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!clinician || !interview || !outputs) return null

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
              {clinician.name} · Generated {formatDate(outputs.generatedAt)}
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="blog" className="gap-1.5 text-xs">
            <FileText className="h-3.5 w-3.5" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-1.5 text-xs">
            <Share2 className="h-3.5 w-3.5" />
            Social
          </TabsTrigger>
          <TabsTrigger value="instagram_ads" className="gap-1.5 text-xs">
            <Megaphone className="h-3.5 w-3.5" />
            IG Ads
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
            content={outputs.blogPost}
            badge="Markdown"
            editId={itemMap['blog']}
          />
        </TabsContent>

        {/* ── Social Media ── */}
        <TabsContent value="social">
          {outputs.instagram ? (
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
                <OutputCard title="Instagram Caption" subtitle="Copy and paste into your Instagram post — no URLs in body, use bio link" content={outputs.instagram} badge="Instagram" editId={itemMap['instagram']} />
              </TabsContent>
              <TabsContent value="facebook">
                <OutputCard title="Facebook Post" subtitle="Copy and paste into your Facebook page — URL generates a rich link preview" content={outputs.facebook} badge="Facebook" editId={itemMap['facebook']} />
              </TabsContent>
              <TabsContent value="linkedin">
                <OutputCard title="LinkedIn Post" subtitle={`Post from the ${brand.name} LinkedIn page`} content={outputs.linkedin} badge="LinkedIn" editId={itemMap['linkedin']} />
              </TabsContent>
              <TabsContent value="pinterest">
                <OutputCard title="Pinterest Pins" subtitle="3 pin variations — use with a vertical image linked to the blog post" content={outputs.pinterest} badge="Pinterest" editId={itemMap['pinterest']} />
              </TabsContent>
            </Tabs>
          ) : (
            <GeneratePrompt group="social" generating={generating} error={genError} onGenerate={generateGroup} label="Social Media" description="Instagram, Facebook, LinkedIn, Pinterest, and GBP post" />
          )}
        </TabsContent>

        {/* ── Instagram Ads ── */}
        <TabsContent value="instagram_ads">
          {outputs.instagramAds ? (
            <OutputCard
              title="Instagram Ads Copy"
              subtitle="Meta Ads Manager creative — primary text, headline, description, CTA, destination URL"
              content={outputs.instagramAds}
              badge="Instagram Ads"
              editId={itemMap['instagram_ads']}
            />
          ) : (
            <GeneratePrompt group="marketing" generating={generating} error={genError} onGenerate={generateGroup} label="Instagram Ads" description="Meta Ads Manager creative — generated alongside GBP, Google Ads, landing page, and email" />
          )}
        </TabsContent>

        {/* ── Google ── */}
        <TabsContent value="google">
          {outputs.googleAds ? (
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
                <OutputCard title="Google Business Profile Post" subtitle="Post directly to your GBP — appears in Maps and Search results" content={outputs.gbpPost} badge="GBP" editId={itemMap['gbp']} />
              </TabsContent>
              <TabsContent value="ads">
                <OutputCard title="Google Search Ad Copy" subtitle="Responsive Search Ad — 15 headlines, 4 descriptions, extensions" content={outputs.googleAds} badge="Google Ads" editId={itemMap['google_ads']} />
              </TabsContent>
              <TabsContent value="landing">
                <OutputCard title="Landing Page Copy" subtitle="Conversion-focused page copy — includes SEO title tag and meta description" content={outputs.landingPage} badge="Landing Page" editId={itemMap['landing_page']} />
              </TabsContent>
            </Tabs>
          ) : (
            <GeneratePrompt group="marketing" generating={generating} error={genError} onGenerate={generateGroup} label="Google & Marketing" description="GBP post, Google Ads, Instagram Ads, and landing page copy" />
          )}
        </TabsContent>

        {/* ── Video ── */}
        <TabsContent value="video">
          {outputs.youtubeScript ? (
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
                <OutputCard title="YouTube Video Script" subtitle="5–8 minute script with B-roll cues, patient story, and video description" content={outputs.youtubeScript} badge="YouTube" editId={itemMap['youtube']} />
              </TabsContent>
              <TabsContent value="tiktok">
                <OutputCard title="TikTok / Reels Script" subtitle="45–60 second vertical video script with on-screen text cues and caption" content={outputs.tiktokScript} badge="TikTok / Reels" editId={itemMap['tiktok']} />
              </TabsContent>
            </Tabs>
          ) : (
            <GeneratePrompt group="video" generating={generating} error={genError} onGenerate={generateGroup} label="Video Scripts" description="YouTube (5–8 min) and TikTok/Reels (45–60 sec) scripts" />
          )}
        </TabsContent>

        {/* ── Email ── */}
        <TabsContent value="email">
          {outputs.emailNewsletter ? (
            <OutputCard
              title="Email Newsletter"
              subtitle="GoHighLevel-ready — subject lines, preview text, and body copy included"
              content={outputs.emailNewsletter}
              badge="Newsletter"
              editId={itemMap['email']}
            />
          ) : (
            <GeneratePrompt group="marketing" generating={generating} error={genError} onGenerate={generateGroup} label="Email Newsletter" description="Subject lines, preview text, and full newsletter body" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GeneratePrompt({ group, generating, error, onGenerate, label, description }) {
  const isGenerating = generating === group

  return (
    <div className="rounded-xl border bg-muted/30 p-10 text-center space-y-4 mt-2">
      {isGenerating ? (
        <>
          <Loader2 className="h-6 w-6 text-primary animate-spin mx-auto" />
          <p className="text-sm font-medium">Generating {label}…</p>
          <p className="text-xs text-muted-foreground">This takes about 15–30 seconds.</p>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-muted-foreground">{label} not generated yet</p>
          <p className="text-xs text-muted-foreground">{description}</p>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button size="sm" onClick={() => onGenerate(group)}>
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Generate {label}
          </Button>
        </>
      )}
    </div>
  )
}

function OutputCard({ title, subtitle, content, badge, editId }) {
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
          {editId && (
            <Button size="sm" variant="outline" asChild>
              <Link to={`/review/${editId}`}>
                <Pencil className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Link>
            </Button>
          )}
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
