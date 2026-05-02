import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2, Image, Video, Upload, FolderOpen, Check, ChevronRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchDriveFiles } from '@/lib/publish'

// Build suggested search chips from the interview topic
function buildSuggestions(topic) {
  if (!topic) return []
  const full  = topic.trim()
  const words = full.split(/\s+/).filter((w) => w.length >= 4)
  return [full, ...words].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 5)
}

// ── Video thumbnail with play-button overlay and graceful fallback ────────────
function VideoThumb({ item }) {
  const [thumbFailed, setThumbFailed] = useState(false)

  return (
    <div className="relative h-full w-full">
      {item.thumbnailUrl && !thumbFailed ? (
        <img
          src={item.thumbnailUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={() => setThumbFailed(true)}
        />
      ) : (
        <div className="h-full bg-slate-800 flex flex-col items-center justify-center gap-1 px-1">
          <Video className="h-6 w-6 text-slate-400 shrink-0" />
          <span className="text-[9px] text-slate-400 text-center leading-tight line-clamp-3">{item.name}</span>
        </div>
      )}
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-8 w-8 rounded-full bg-black/55 flex items-center justify-center">
          <Play className="h-4 w-4 text-white ml-0.5" />
        </div>
      </div>
    </div>
  )
}

// ── Image thumbnail ───────────────────────────────────────────────────────────
function ImageThumb({ item }) {
  const [failed, setFailed] = useState(false)
  if (item.thumbnailUrl && !failed) {
    return (
      <img
        src={item.thumbnailUrl}
        alt={item.name}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    )
  }
  return (
    <div className="h-full bg-muted flex items-center justify-center">
      <Image className="h-6 w-6 text-muted-foreground" />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MediaPicker({ onSelect, onClose, topic = '' }) {
  const [tab, setTab]         = useState('drive')
  const [query, setQuery]     = useState('')
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [driveError, setDriveError] = useState('')
  // Folder navigation: stack of { id, name }. Empty id = drive root.
  const [folderStack, setFolderStack] = useState([{ id: '', name: 'Drive' }])
  const fileInputRef = useRef(null)
  const debounceRef  = useRef(null)
  const suggestions  = buildSuggestions(topic)

  const currentFolder = folderStack[folderStack.length - 1]
  const isSearching   = !!query

  async function load(opts = {}) {
    const { q = '', folderId = currentFolder.id, pageToken = '', append = false } = opts
    setLoading(true)
    setDriveError('')
    try {
      const data = await fetchDriveFiles({ query: q, folderId, pageToken })
      const incoming = data.items || []
      setItems(append ? (prev) => [...prev, ...incoming] : incoming)
      setNextPage(data.nextPageToken || null)
    } catch (e) {
      setDriveError(
        e.message.includes('not configured')
          ? 'Google Drive is not connected yet. Go to Settings → Integrations to set it up.'
          : e.message,
      )
    } finally {
      setLoading(false)
    }
  }

  // Initial load when tab / folder changes
  useEffect(() => {
    if (tab === 'drive') {
      setItems([])
      setSelected(null)
      load({ q: query, folderId: currentFolder.id })
    }
  }, [tab, currentFolder.id])

  // Debounced search
  function handleQueryChange(e) {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setItems([])
      setSelected(null)
      load({ q: val, folderId: currentFolder.id })
    }, 400)
  }

  function handleChip(chip) {
    setQuery(chip)
    setItems([])
    setSelected(null)
    load({ q: chip, folderId: currentFolder.id })
  }

  function handleClear() {
    setQuery('')
    setItems([])
    setSelected(null)
    load({ q: '', folderId: currentFolder.id })
  }

  function enterFolder(folder) {
    setQuery('')           // clear search when navigating
    setSelected(null)
    setFolderStack((prev) => [...prev, { id: folder.id, name: folder.name }])
    // the useEffect on currentFolder.id will trigger load
  }

  function goToLevel(index) {
    setQuery('')
    setSelected(null)
    setFolderStack((prev) => prev.slice(0, index + 1))
  }

  function handleSelect() {
    if (!selected) return
    const file = {
      ...selected,
      type:     selected.kind,   // backward compat for editor / preview
      proxyUrl: selected.kind === 'image' ? `/api/drive/media?id=${selected.id}` : undefined,
    }
    onSelect(file)
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onSelect({
      id:           crypto.randomUUID(),
      name:         file.name,
      mimeType:     file.type,
      kind:         file.type.startsWith('video') ? 'video' : 'image',
      type:         file.type.startsWith('video') ? 'video' : 'image',
      thumbnailUrl: file.type.startsWith('image') ? url : null,
      url,
      size:         file.size,
    })
  }

  const mediaItems  = items.filter((i) => i.kind !== 'folder')
  const folderItems = items.filter((i) => i.kind === 'folder')

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
          <h2 className="font-semibold">Add Media</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-5 shrink-0">
          {[
            { id: 'drive',  label: 'Google Drive', icon: FolderOpen },
            { id: 'upload', label: 'Upload',        icon: Upload },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 py-3 text-sm border-b-2 transition-colors -mb-px ${
                tab === id
                  ? 'border-primary text-foreground font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </div>

        {tab === 'drive' && (
          <>
            {/* Search + chips */}
            <div className="px-5 pt-3 pb-2 border-b shrink-0 space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Filter by filename…"
                  className="pl-8 pr-8 h-8 text-sm"
                />
                {query && (
                  <button
                    onClick={handleClear}
                    className="absolute right-2.5 top-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-0.5">
                  <span className="text-[11px] text-muted-foreground self-center">Suggest:</span>
                  {suggestions.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleChip(chip)}
                      className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                        query === chip
                          ? 'bg-primary text-white border-primary'
                          : 'bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Breadcrumb — hidden when searching */}
            {!isSearching && folderStack.length > 1 && (
              <div className="flex items-center gap-1 px-5 py-2 text-xs text-muted-foreground border-b shrink-0 overflow-x-auto">
                {folderStack.map((f, i) => (
                  <span key={i} className="flex items-center gap-1 shrink-0">
                    {i > 0 && <ChevronRight className="h-3 w-3" />}
                    <button
                      onClick={() => goToLevel(i)}
                      className={i === folderStack.length - 1
                        ? 'text-foreground font-medium'
                        : 'hover:text-foreground transition-colors'}
                    >
                      {f.name}
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3">
              {driveError ? (
                <div className="text-sm text-muted-foreground bg-muted rounded-lg p-4 text-center">{driveError}</div>
              ) : loading && items.length === 0 ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground text-sm">
                  {isSearching ? 'No media matching that search.' : 'No media in this folder.'}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Folders — not selectable, click to navigate */}
                  {!isSearching && folderItems.length > 0 && (
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium mb-2 uppercase tracking-wide">Folders</p>
                      <div className="grid grid-cols-4 gap-2">
                        {folderItems.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => enterFolder(f)}
                            className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border bg-muted/40 aspect-square hover:bg-accent hover:border-primary/40 transition-colors p-2"
                          >
                            <FolderOpen className="h-8 w-8 text-primary/70" />
                            <span className="text-[10px] text-muted-foreground text-center leading-tight line-clamp-2 w-full">{f.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Media files */}
                  {mediaItems.length > 0 && (
                    <div>
                      {!isSearching && folderItems.length > 0 && (
                        <p className="text-[11px] text-muted-foreground font-medium mb-2 uppercase tracking-wide">Files</p>
                      )}
                      <div className="grid grid-cols-4 gap-2">
                        {mediaItems.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setSelected(selected?.id === f.id ? null : f)}
                            className={`relative rounded-lg overflow-hidden border-2 aspect-square transition-all ${
                              selected?.id === f.id
                                ? 'border-primary'
                                : 'border-transparent hover:border-muted-foreground/30'
                            }`}
                          >
                            {f.kind === 'video'
                              ? <VideoThumb item={f} />
                              : <ImageThumb item={f} />
                            }
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
                    </div>
                  )}

                  {nextPage && (
                    <Button
                      variant="outline" size="sm" className="w-full"
                      onClick={() => load({ q: query, folderId: currentFolder.id, pageToken: nextPage, append: true })}
                      disabled={loading}
                    >
                      {loading && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />}
                      Load more
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t flex items-center justify-between shrink-0">
              <p className="text-xs text-muted-foreground truncate max-w-[55%]">
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
            <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleUpload} />
            <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          </div>
        )}

      </div>
    </div>
  )
}
