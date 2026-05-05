// Curated topic database for Move Better Equine — built from regional PNW
// equine chiropractic practices (Haak, Oregon Equine, Columbia Equine, Hooves
// and Paws, Rogue Equine, Tacoma Equine), AVCA / IVCA materials, and the
// owner-search vocabulary horse owners use when they look for help.
//
// priority: 'high' = strong owner search volume + clear local fit
//           'medium' = solid volume or strong content differentiation
//           'low' = niche but relevant to a specific PNW audience slice
//
// NOTE FOR WHITNEY: this is the seed list that drives suggested-topic chips
// in the New Interview screen. Edit topics, change categories, retire the
// ones you don't want, and add the ones you do — each entry is a plain JS
// object. The Dashboard and New Interview pages re-read this file on every
// build.

export const TOPIC_SUGGESTIONS = [
  // ── Spine & Back ──────────────────────────────────────────────────────────
  {
    topic: 'Back pain in horses',
    category: 'Spine & Back',
    priority: 'high',
    keywords: ['back pain', 'sore back', 'thoracic', 'lumbar'],
    pnwNote: 'One of the most common owner-reported issues in PNW sport and pleasure horses',
  },
  {
    topic: 'Kissing spine: causes, signs, and management',
    category: 'Spine & Back',
    priority: 'high',
    keywords: ['kissing spine', 'dorsal spinous', 'dsp', 'islip'],
    pnwNote: 'PNW dressage and jumper barns refer regularly — owners want to know what care looks like alongside vet management',
  },
  {
    topic: 'The cold-backed horse',
    category: 'Spine & Back',
    priority: 'medium',
    keywords: ['cold backed', 'cold-backed', 'humpy', 'sensitive at mounting'],
    pnwNote: 'PNW wet winters worsen morning stiffness — peak owner-search topic November through March',
  },
  {
    topic: 'Trailering and back stiffness across the Gorge',
    category: 'Spine & Back',
    priority: 'medium',
    keywords: ['trailering', 'long haul', 'gorge', 'travel stiffness'],
    pnwNote: 'PNW horses regularly cross the Gorge or the Cascades for shows and trail trips — a unique local angle',
  },

  // ── Sacroiliac & Hindquarters ─────────────────────────────────────────────
  {
    topic: "Sacroiliac dysfunction and hind-end power",
    category: 'Sacroiliac & Hindquarters',
    priority: 'high',
    keywords: ['sacroiliac', 'si joint', 'si dysfunction', 'sacrum'],
    pnwNote: 'Cambered PNW pasture and uneven trail terrain make SI dysfunction extremely common locally',
  },
  {
    topic: "What a hunter's bump really means",
    category: 'Sacroiliac & Hindquarters',
    priority: 'medium',
    keywords: ["hunter's bump", 'hunters bump', 'tuber sacrale', 'sacroiliac ligament'],
    pnwNote: 'Common in PNW eventers, jumpers, and barrel and reining horses — high owner-search interest',
  },
  {
    topic: 'Pelvic asymmetry and one-sided horses',
    category: 'Sacroiliac & Hindquarters',
    priority: 'medium',
    keywords: ['pelvic asymmetry', 'crooked', 'one-sided', 'pelvis'],
    pnwNote: 'A useful crossover topic for trainers, riders, and bodyworkers in this region',
  },

  // ── Neck, Poll & TMJ ──────────────────────────────────────────────────────
  {
    topic: 'Poll restriction and the heavy-bridled horse',
    category: 'Neck, Poll & TMJ',
    priority: 'high',
    keywords: ['poll', 'poll flexion', 'heavy in the bridle', 'bridle resistance'],
    pnwNote: 'Top-of-mind for PNW dressage and English riders working on contact and connection',
  },
  {
    topic: 'TMJ in horses — beyond just dental',
    category: 'Neck, Poll & TMJ',
    priority: 'high',
    keywords: ['tmj', 'jaw', 'bit grinding', 'head shaking', 'temporomandibular'],
    pnwNote: 'Owners often arrive after a recent dental float wondering why the horse still resists the bit',
  },
  {
    topic: 'Cervical pain and neck issues in older sport horses',
    category: 'Neck, Poll & TMJ',
    priority: 'medium',
    keywords: ['cervical', 'neck pain', 'c5', 'c6', 'c7', 'cervical arthritis'],
    pnwNote: 'PNW sport-horse vets routinely image and inject C5–C7 — strong local audience for integrative care content',
  },
  {
    topic: 'Pull-back trauma — the old halter incident that surfaces years later',
    category: 'Neck, Poll & TMJ',
    priority: 'medium',
    keywords: ['pull back', 'pulled back', 'tied', 'atlas', 'c1'],
    pnwNote: 'Common backstory in trailered show and trail horses — owners rarely make the connection on their own',
  },

  // ── Withers & Shoulders ───────────────────────────────────────────────────
  {
    topic: 'Withers and shoulder restriction — the sticky front end',
    category: 'Withers & Shoulders',
    priority: 'medium',
    keywords: ['withers', 'shoulder', 'short stride', 'choppy', 'front end'],
    pnwNote: 'A natural pairing with PNW saddle-fit content — strong network of fitters in this region',
  },

  // ── Behavioral & Performance ──────────────────────────────────────────────
  {
    topic: "Why your horse won't pick up the correct lead",
    category: 'Behavioral & Performance',
    priority: 'high',
    keywords: ['lead', 'wrong lead', 'lead refusal', 'lead change'],
    pnwNote: 'Most-cited reason owners and trainers call an equine chiropractor in the PNW',
  },
  {
    topic: 'Cross-cantering and the disunited canter',
    category: 'Behavioral & Performance',
    priority: 'high',
    keywords: ['cross canter', 'cross-canter', 'disunited canter', 'canter changes'],
    pnwNote: 'High search interest among PNW dressage, hunter, and eventing riders',
  },
  {
    topic: 'Bucking and rearing — when behavior is really pain',
    category: 'Behavioral & Performance',
    priority: 'high',
    keywords: ['buck', 'bucking', 'rearing', 'broncing'],
    pnwNote: 'Owners often arrive scared and questioning their training — strong opportunity to explain the body work-up',
  },
  {
    topic: 'Head tossing and head shaking under saddle',
    category: 'Behavioral & Performance',
    priority: 'medium',
    keywords: ['head tossing', 'head shaking', 'head shy', 'head tilt'],
    pnwNote: 'Pollen and bug seasons aggravate true photic head shaking locally — useful differential to address',
  },
  {
    topic: "Girthy and cinchy horses — what's really going on",
    category: 'Behavioral & Performance',
    priority: 'medium',
    keywords: ['girthy', 'cinchy', 'girth', 'cinch', 'tacking up'],
    pnwNote: '"She\'s just a mare" is a common line locally — chiropractic, ulcer, and saddle fit angles all matter',
  },
  {
    topic: 'Loss of collection and the sport horse',
    category: 'Behavioral & Performance',
    priority: 'medium',
    keywords: ['collection', 'loss of collection', 'engagement', "won't round"],
    pnwNote: 'PNW dressage circuit is strong — a clean fit for collection-focused content',
  },
  {
    topic: 'Refusing fences and stop-outs in jumpers',
    category: 'Behavioral & Performance',
    priority: 'medium',
    keywords: ['refusing fences', 'stop out', 'jumper refusal', 'rushed fences'],
    pnwNote: 'Active jumper and eventing scene in Oregon and Washington — high owner relevance',
  },

  // ── Lameness & Orthopedic ─────────────────────────────────────────────────
  {
    topic: 'The mystery lameness — when the vet finds nothing',
    category: 'Lameness & Orthopedic',
    priority: 'high',
    keywords: ['mystery lameness', 'undiagnosed lameness', 'shifting lameness', 'just off'],
    pnwNote: 'Local sport-horse vets routinely refer to chiropractic after a clean lameness exam — one of the highest-value topics',
  },
  {
    topic: 'Hock arthritis and the working horse',
    category: 'Lameness & Orthopedic',
    priority: 'high',
    keywords: ['hock', 'hock arthritis', 'hock injection', 'spavin'],
    pnwNote: 'Hock injections are routine here — owners want to know how chiropractic care fits between appointments',
  },
  {
    topic: 'Stifle issues and weak hind ends',
    category: 'Lameness & Orthopedic',
    priority: 'medium',
    keywords: ['stifle', 'patella', 'upward fixation', 'hind end weakness'],
    pnwNote: 'Common in growing young horses and aging working horses across PNW disciplines',
  },
  {
    topic: 'Navicular syndrome — beyond the diagnosis',
    category: 'Lameness & Orthopedic',
    priority: 'medium',
    keywords: ['navicular', 'caudal heel pain', 'palmar heel'],
    pnwNote: 'Strong farrier and vet network in the PNW — integrative content fits the local culture',
  },
  {
    topic: 'Tendon and ligament strain rehab',
    category: 'Lameness & Orthopedic',
    priority: 'medium',
    keywords: ['tendon', 'ligament', 'suspensory', 'check ligament', 'soft tissue'],
    pnwNote: 'Common return-to-work conversation; chiropractic care addresses the compensation patterns rehab often misses',
  },

  // ── Saddle Fit & Tack ─────────────────────────────────────────────────────
  {
    topic: 'Saddle fit and back pain',
    category: 'Saddle Fit & Tack',
    priority: 'high',
    keywords: ['saddle fit', 'saddle fitting', 'tree fit', 'panel fit'],
    pnwNote: 'PNW has an active community of professional saddle fitters — a natural cross-referral and content audience',
  },
  {
    topic: 'When to re-fit your saddle',
    category: 'Saddle Fit & Tack',
    priority: 'medium',
    keywords: ['re-fit', 'refit', 'topline change', 'saddle adjustment'],
    pnwNote: 'Seasonal turnout and topline swings make re-fits relevant to most local horses every year',
  },
  {
    topic: 'Bit and bridle choices that drive poll tension',
    category: 'Saddle Fit & Tack',
    priority: 'low',
    keywords: ['bit', 'bridle', 'noseband', 'bit pressure'],
    pnwNote: 'Niche but valuable for English / dressage audiences working on contact',
  },

  // ── Discipline-Specific (PNW) ─────────────────────────────────────────────
  {
    topic: 'Chiropractic care for the dressage horse',
    category: 'Discipline-Specific',
    priority: 'high',
    keywords: ['dressage', 'collection', 'lateral work', 'piaffe'],
    pnwNote: 'Strong PNW dressage circuit — top-of-funnel topic for a discipline-aware audience',
  },
  {
    topic: 'Chiropractic care for the hunter and jumper',
    category: 'Discipline-Specific',
    priority: 'high',
    keywords: ['hunter', 'jumper', 'show jumping', 'equitation'],
    pnwNote: 'Active hunter / jumper circuit in Washington and Oregon',
  },
  {
    topic: 'Chiropractic care for the eventing horse',
    category: 'Discipline-Specific',
    priority: 'medium',
    keywords: ['eventing', 'event horse', 'cross country', 'three day'],
    pnwNote: 'Strong eventing presence in the Pacific Northwest — Aspen Farms and other regional venues',
  },
  {
    topic: 'Chiropractic care for the reining and ranch horse',
    category: 'Discipline-Specific',
    priority: 'medium',
    keywords: ['reining', 'ranch', 'cow horse', 'cutting', 'western'],
    pnwNote: 'Regional reining and ranch community is strong — discipline-specific shoulder and SI angles',
  },
  {
    topic: 'Chiropractic care for the barrel racer',
    category: 'Discipline-Specific',
    priority: 'medium',
    keywords: ['barrel', 'barrel racing', 'rodeo', 'speed event'],
    pnwNote: 'High-torque, one-direction work makes for predictable left-vs-right asymmetries',
  },
  {
    topic: 'Chiropractic care for the trail and pleasure horse',
    category: 'Discipline-Specific',
    priority: 'medium',
    keywords: ['trail', 'pleasure', 'pack horse', 'trail riding'],
    pnwNote: 'PNW trail community is enormous — Cascades, Coast Range, Gorge — and underserved by discipline-targeted content',
  },
  {
    topic: 'Chiropractic care for the endurance horse',
    category: 'Discipline-Specific',
    priority: 'low',
    keywords: ['endurance', 'distance', 'competitive trail', 'ride and tie'],
    pnwNote: 'Active PNW endurance scene — niche but devoted audience',
  },

  // ── Senior & Maintenance ──────────────────────────────────────────────────
  {
    topic: 'The senior horse — keeping comfort and movement',
    category: 'Senior & Maintenance',
    priority: 'high',
    keywords: ['senior horse', 'older horse', 'aging horse', 'retired horse'],
    pnwNote: 'Cold, wet PNW winters are hard on seniors — strong owner search interest from October through April',
  },
  {
    topic: 'Maintenance schedules for the working horse',
    category: 'Senior & Maintenance',
    priority: 'medium',
    keywords: ['maintenance', 'preventive', 'body work schedule', 'tune-up'],
    pnwNote: 'Sport-horse competition season is concentrated April through October — a maintenance schedule conversation lands locally',
  },
  {
    topic: 'Pre-show and post-show care',
    category: 'Senior & Maintenance',
    priority: 'medium',
    keywords: ['pre-show', 'post-show', 'show prep', 'recovery'],
    pnwNote: 'Active show calendars across English and Western disciplines in the PNW',
  },

  // ── Post-Injury & Rehab ───────────────────────────────────────────────────
  {
    topic: 'Returning a horse to work after stall rest',
    category: 'Post-Injury & Rehab',
    priority: 'medium',
    keywords: ['stall rest', 'return to work', 'rehab', 'layup'],
    pnwNote: 'Wet PNW winters limit rehab turnout — chiropractic care addresses the compensation that builds during a layup',
  },
  {
    topic: 'Post-colic surgery recovery and chiropractic',
    category: 'Post-Injury & Rehab',
    priority: 'low',
    keywords: ['colic surgery', 'post colic', 'abdominal recovery'],
    pnwNote: 'Niche but high-trust topic for owners working with the local equine surgical hospitals',
  },
  {
    topic: 'After the trail wreck — pasture falls and slips',
    category: 'Post-Injury & Rehab',
    priority: 'medium',
    keywords: ['fall', 'pasture fall', 'cast', 'flipped', 'trail wreck'],
    pnwNote: 'Slick PNW pasture and rooty Cascade trails make this a familiar story locally',
  },

  // ── Foundational Education ────────────────────────────────────────────────
  {
    topic: 'Does my horse need a chiropractor?',
    category: 'Foundational Education',
    priority: 'high',
    keywords: ['need chiropractor', 'signs', 'how do i know', 'first signs'],
    pnwNote: 'The single highest-volume top-of-funnel search for equine chiropractic',
  },
  {
    topic: 'What to expect at your first appointment',
    category: 'Foundational Education',
    priority: 'high',
    keywords: ['first appointment', 'what to expect', 'first visit', 'before appointment'],
    pnwNote: 'Mobile farm-call format means the visit looks different than at a clinic — content can set local expectations',
  },
  {
    topic: 'AVCA, IVCA, and how to choose a practitioner',
    category: 'Foundational Education',
    priority: 'medium',
    keywords: ['avca', 'ivca', 'certification', 'choose a chiropractor', 'qualified'],
    pnwNote: 'Owners often ask what makes a qualified animal chiropractor — strong trust-building topic',
  },
  {
    topic: 'How chiropractic complements veterinary care',
    category: 'Foundational Education',
    priority: 'high',
    keywords: ['veterinary', 'vet care', 'complementary', 'integrative'],
    pnwNote: 'Local sport-horse community works closely with vets — integrative framing is the right local positioning',
  },
  {
    topic: 'Chiropractic, acupuncture, laser, and bodywork — how they fit together',
    category: 'Foundational Education',
    priority: 'medium',
    keywords: ['acupuncture', 'laser', 'bodywork', 'massage', 'integrative'],
    pnwNote: 'PNW owners are open to integrative care — many already use one or more of these modalities',
  },
  {
    topic: 'The hyoid–poll–withers–hind end chain',
    category: 'Foundational Education',
    priority: 'low',
    keywords: ['hyoid', 'fascial chain', 'whole horse', 'systems'],
    pnwNote: 'Speaks directly to the systems-based brand voice — niche but defining content for the brand',
  },
  {
    topic: 'Mobile vs. haul-in: what is the right fit for your horse?',
    category: 'Foundational Education',
    priority: 'low',
    keywords: ['mobile', 'haul in', 'farm call', 'trailer in'],
    pnwNote: 'Move Better Equine offers both — useful operational explainer for owners deciding which to book',
  },
]

/**
 * Returns suggestions sorted by coverage gap:
 * uncovered high-priority topics first, then underrepresented ones.
 * existingTopics: array of topic strings from actual interviews in Supabase.
 *
 * Identical shape to the people/animals overlays so consumers don't need to
 * branch on brand.
 */
export function getSuggestedTopics(existingTopics = []) {
  const normalized = existingTopics.map((t) => t.toLowerCase())

  function coverageCount(suggestion) {
    return normalized.filter((t) =>
      suggestion.keywords.some((k) => t.includes(k.toLowerCase()))
    ).length
  }

  const priorityRank = { high: 3, medium: 2, low: 1 }

  return TOPIC_SUGGESTIONS.map((s) => ({
    ...s,
    interviewCount: coverageCount(s),
  })).sort((a, b) => {
    if (a.interviewCount === 0 && b.interviewCount > 0) return -1
    if (a.interviewCount > 0 && b.interviewCount === 0) return 1
    const pd = priorityRank[b.priority] - priorityRank[a.priority]
    if (pd !== 0) return pd
    return a.interviewCount - b.interviewCount
  })
}
