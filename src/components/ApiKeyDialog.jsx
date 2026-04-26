import { useState } from 'react'
import { KeyRound, ExternalLink } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setApiKey, getApiKey } from '@/lib/storage'

export default function ApiKeyDialog({ open, onOpenChange, onSaved }) {
  const [key, setKey] = useState(getApiKey)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setApiKey(key)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onOpenChange(false)
      onSaved?.()
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-primary" />
            Anthropic API Key
          </DialogTitle>
          <DialogDescription>
            Your key is stored locally in your browser and never sent anywhere except directly to Anthropic.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="apikey">API Key</Label>
            <Input
              id="apikey"
              type="password"
              placeholder="sk-ant-..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
          >
            Get your API key from console.anthropic.com
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!key.trim()}>
            {saved ? 'Saved!' : 'Save Key'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
