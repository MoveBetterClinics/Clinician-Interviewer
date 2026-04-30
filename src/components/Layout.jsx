import { Link, useLocation } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container flex h-14 items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            {/* Move Better wordmark using brand colors */}
            <span className="text-base font-semibold tracking-tight" style={{ fontFamily: "'Titillium Web', sans-serif" }}>
              <span style={{ color: '#E36525' }}>Move Better</span>
              <span className="text-muted-foreground font-light mx-1.5">/</span>
              <span className="text-foreground font-light text-sm">Clinician Interviewer</span>
            </span>
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

        </div>
      </header>

      <main className="container py-8">
        {children}
      </main>
    </div>
  )
}
