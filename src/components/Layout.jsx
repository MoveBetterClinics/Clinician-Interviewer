import { Link, useLocation } from 'react-router-dom'
import { Activity, Settings, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function Layout({ children, onOpenSettings }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-sm">Move Better <span className="text-muted-foreground font-normal">/ Clinician Interviewer</span></span>
          </Link>

          <div className="flex-1" />

          {isHome && (
            <Button asChild size="sm">
              <Link to="/new">
                <Plus className="h-4 w-4 mr-1.5" />
                New Interview
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={onOpenSettings} title="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="container py-8">
        {children}
      </main>
    </div>
  )
}
