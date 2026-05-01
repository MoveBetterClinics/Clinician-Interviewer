import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2, Image, Video, Upload, FolderOpen, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchDriveFiles } from '@/lib/publish'

export default function MediaPicker({ onSelect, onClose, topic = '' }) {
  const [tab, setTab]               = useState('drive') // drive | upload
  const [query, setQuery]           = useState(topic)
  const [files, setFiles]           = useState([])
  const [loading, setLoading]       = useState(false)
  const [selected, setSelected]     = useState(null)
  const [nextPage, setNextPage]     = useState(null)
  const [driveError, setDriveError] = useState('')
  const fileInputRef                = useRef(null)

  async function search(q = query, pageToken = '') {
    setLoading(true)
    setDriveError('')
    try {
      const data = await fetchDriveFiles({ query: q, pageToken })
      setFiles(pageToken ? (prev) => [...prev, ...data.files] : data.files)
      setNextPage(data.nextPageToken || null)
    } catch (e) {
      setDriveError(e.message.includes('not configured')
        ? 'Google Drive is not connected yet. Go to Settings → Integrations to set it up.'
        : e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (tab === 'drive') search() }, [tab])

  function handleSearch(e) {
    e.preventDefault()
    setFiles([])
    search(query)
  }

  function handleSelect() {
    if (!selected) return
    onSelect(selected)
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    // For local uploads, create an object URL — in production you'd upload to storage
    const url = URL.createObjectURL(file)
    onSelect({
      id:           crypto.randomUUID(),
      name:         file.name,
      mimeType:     file.type,
      type:         file.type.startsWith('video') ? 'video' : 'image',
      thumbnailUrl: file.type.startsWith('image') ? url : null,
      url,
      size:         file.size,
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-semibold">Add Media</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-5">
          {[
            { id: 'drive',  label: 'Google Drive', icon: FolderOpen },
            { id: 'upload', label: 'Upload',        icon: Upload },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 py-3 text-sm border-b-2 transition-colors -mb-px ${
                tab === id ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </div>

        {tab === 'drive' && (
          <>
            {/* Search */}
            <div className="px-5 py-3 border-b">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search your Drive…"
                    className="pl-8 h-8 text-sm"
                  />
                </div>
                <Button type="submit" size="sm" variant="outline">Search</Button>
              </form>
            </div>

            <ScrollArea className="flex-1 px-5 py-3">
              {driveError ? (
                <div className="text-sm text-muted-foreground bg-muted rounded-lg p-4 text-center">{driveError}</div>
              ) : loading && files.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">No media found in your Drive.</div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {files.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelected(selected?.id === f.id ? null : f)}
                        className={`relative rounded-lg overflow-hidden border-2 aspect-square transition-all ${
                          selected?.id === f.id ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'
                        }`}
                      >
                        {f.type === 'video' ? (
                          <div className="h-full bg-slate-100 flex flex-col items-center justify-center gap-1">
                            <Video className="h-6 w-6 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground px-1 text-center leading-tight line-clamp-2">{f.name}</span>
                          </div>
                        ) : f.thumbnailUrl ? (
                          <img src={f.thumbnailUrl} alt={f.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="h-full bg-muted flex items-center justify-center">
                            <Image className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        {selected?.id === f.id && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {nextPage && (
                    <Button variant="outline" size="sm" className="w-full" onClick={() => search(query, nextPage)} disabled={loading}>
                      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
                      Load more
                    </Button>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            <div className="px-5 py-3 border-t flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {selected ? `Selected: ${selected.name}` : 'Select a file to attach'}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
                <Button size="sm" onClick={handleSelect} disabled={!selected}>Use This File</Button>
              </div>
            </div>
          </>
        )}

        {tab === 'upload' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/20 transition-colors"
            >
              <Upload className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm font-medium mb-1">Click to upload a photo or video</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, GIF, MP4, MOV supported</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleUpload}
            />
            <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          </div>
        )}
      </div>
    </div>
  )
}
