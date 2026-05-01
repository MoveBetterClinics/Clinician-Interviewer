import { useState } from 'react'
import { ExternalLink, CheckCircle2, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const INTEGRATIONS = [
  {
    id: 'buffer',
    name: 'Buffer',
    description: 'Schedule and publish to Instagram, LinkedIn, and Pinterest.',
    platforms: ['Instagram', 'LinkedIn', 'Pinterest'],
    envVars: [{ key: 'BUFFER_ACCESS_TOKEN', label: 'Buffer Access Token', placeholder: 'access_token_...' }],
    setupSteps: [
      'Go to buffer.com and create a free account.',
      'Connect your Instagram, LinkedIn, and Pinterest pages inside Buffer.',
      'Go to buffer.com/developers/apps → Create an app.',
      'Copy the Access Token from your app settings.',
      'Paste it in the field below and add it to Vercel (see instructions).',
    ],
    docsUrl: 'https://buffer.com/developers/api',
  },
  {
    id: 'facebook',
    name: 'Facebook Page',
    description: 'Post directly to your Move Better Facebook Page.',
    platforms: ['Facebook'],
    envVars: [
      { key: 'FACEBOOK_PAGE_ID',    label: 'Page ID',           placeholder: '123456789' },
      { key: 'FACEBOOK_PAGE_TOKEN', label: 'Page Access Token', placeholder: 'EAABsbCS...' },
    ],
    setupSteps: [
      'Go to developers.facebook.com → Create App → Business type.',
      'Add the "Pages" product to your app.',
      'Go to Tools → Graph API Explorer.',
      'Select your app and Page, request pages_manage_posts permission.',
      'Generate a long-lived Page Access Token.',
      'Your Page ID is in your Facebook Page URL or About section.',
    ],
    docsUrl: 'https://developers.facebook.com/docs/pages/getting-started',
  },
  {
    id: 'gbp',
    name: 'Google Business Profile',
    description: 'Post updates directly to your Move Better GBP listing.',
    platforms: ['Google Business Profile'],
    envVars: [
      { key: 'GBP_ACCOUNT_ID',  label: 'Account ID',  placeholder: 'accounts/123456789' },
      { key: 'GBP_LOCATION_ID', label: 'Location ID', placeholder: 'locations/987654321' },
    ],
    setupSteps: [
      'Go to console.cloud.google.com → Create a project.',
      'Enable the "Business Information API" and "Profile Performance API".',
      'Create a Service Account under IAM & Admin → Service Accounts.',
      'Give it the "Editor" role. Download the JSON key.',
      'Share your Google Business Profile with the service account email.',
      'Find your Account ID and Location ID via the GBP API or Google Business dashboard URL.',
      'Add GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_KEY (from the JSON key) to Vercel.',
    ],
    docsUrl: 'https://developers.google.com/my-business/content/get-started',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    description: 'Browse your Team Drive to attach existing photos and videos to posts.',
    platforms: ['Media Library'],
    envVars: [
      { key: 'GOOGLE_DRIVE_ID', label: 'Team Drive ID', placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs' },
    ],
    setupSteps: [
      'Uses the same Google Service Account as GBP above.',
      'Share your Team Drive with the service account email (Viewer access is enough).',
      'Find your Team Drive ID in the URL when you open the drive: drive.google.com/drive/folders/DRIVE_ID.',
      'Add it as GOOGLE_DRIVE_ID in Vercel.',
    ],
    docsUrl: 'https://developers.google.com/drive/api/guides/about-sdk',
  },
]

export default function Integrations() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Connect publishing platforms. All credentials are stored as Vercel environment variables — never in the browser.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/40 px-4 py-3 flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          After adding any env var to Vercel, go to <strong>Vercel → Deployments → Redeploy</strong> for it to take effect.
        </p>
      </div>

      <div className="space-y-4">
        {INTEGRATIONS.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>
    </div>
  )
}

function IntegrationCard({ integration }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-accent/30 transition-colors text-left"
      >
        <div className="flex items-start gap-3">
          <div>
            <p className="font-medium">{integration.name}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{integration.description}</p>
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {integration.platforms.map((p) => (
                <span key={p} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{p}</span>
              ))}
            </div>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 border-t pt-4">
          {/* Setup steps */}
          <div>
            <p className="text-sm font-medium mb-2">Setup steps</p>
            <ol className="space-y-1.5">
              {integration.setupSteps.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href={integration.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
            >
              Full documentation <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <Separator />

          {/* Env vars */}
          <div>
            <p className="text-sm font-medium mb-3">Vercel environment variables to add</p>
            <div className="space-y-3">
              {integration.envVars.map(({ key, label, placeholder }) => (
                <VercelEnvRow key={key} envKey={key} label={label} placeholder={placeholder} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function VercelEnvRow({ envKey, label, placeholder }) {
  const [copied, setCopied] = useState(false)

  function copyKey() {
    navigator.clipboard.writeText(envKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1 space-y-1">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <div className="flex gap-1.5">
          <code
            className="flex-1 text-xs bg-muted px-3 py-2 rounded-md font-mono border cursor-pointer hover:bg-accent transition-colors"
            onClick={copyKey}
            title="Click to copy variable name"
          >
            {envKey}
          </code>
          <Button variant="outline" size="sm" className="text-xs shrink-0" onClick={copyKey}>
            {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : 'Copy name'}
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground">Value example: <code className="font-mono">{placeholder}</code></p>
      </div>
    </div>
  )
}
