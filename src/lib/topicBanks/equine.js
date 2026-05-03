// Move Better Equine topic-suggestion bank.
// Built from common equine chiropractic presentations, owner search
// patterns, and discipline-specific concerns across English, Western,
// and pleasure horses in Southwest Washington and the greater Portland area.
//
// priority: 'high' = very high owner search interest, 'medium' = solid
//           interest, 'low' = niche but relevant.
//
// `pnwNote` retains the same key as the human bank for the index — for
// equine, treat it as a regional / discipline note.

export const TOPIC_SUGGESTIONS = [
  // ── Subtle Signs & Owner Observations ────────────────────────────────────
  {
    topic: "Subtle signs your horse's movement may be restricted",
    category: 'Subtle Signs & Owner Observations',
    priority: 'high',
    keywords: ['subtle', "something's off", 'tail swish', 'bit grind', 'lead refusal'],
    pnwNote: 'Owner-language entry-point content — high discovery and shareability',
  },
  {
    topic: 'When behavior change is actually pain',
    category: 'Subtle Signs & Owner Observations',
    priority: 'high',
    keywords: ['behavior', 'behaviour', 'buck', 'bolt', 'attitude', 'pinning ears'],
    pnwNote: 'Major reframe owners need — drives both trust and bookings',
  },
  {
    topic: 'Reading your horse from the ground',
    category: 'Subtle Signs & Owner Observations',
    priority: 'medium',
    keywords: ['posture', 'standing posture', 'in-hand', 'asymmetry from the ground'],
    pnwNote: 'Empowers owners between visits — strong educational content',
  },

  // ── Back & Spine ─────────────────────────────────────────────────────────
  {
    topic: 'Back pain in performance horses',
    category: 'Back & Spine',
    priority: 'high',
    keywords: ['back pain', 'sore back', 'topline', 'thoracolumbar'],
    pnwNote: 'Common across dressage, jumping, and trail — broad audience',
  },
  {
    topic: 'Kissing spines: complementary care alongside the vet',
    category: 'Back & Spine',
    priority: 'high',
    keywords: ['kissing spines', 'kissing spine', 'overriding dorsal', 'dsp'],
    pnwNote: 'Owners actively researching after diagnosis — high-intent search',
  },
  {
    topic: 'Girthiness, cinchiness, and tacking-up resistance',
    category: 'Back & Spine',
    priority: 'medium',
    keywords: ['girthy', 'cinchy', 'cinch', 'tacking up', 'saddling'],
    pnwNote: 'Common owner complaint — easy entry point into broader back conversation',
  },

  // ── Pelvis & Sacroiliac ──────────────────────────────────────────────────
  {
    topic: 'Sacroiliac dysfunction in sport horses',
    category: 'Pelvis & Sacroiliac',
    priority: 'high',
    keywords: ['sacroiliac', 'si joint', 'si dysfunction', 'pelvis'],
    pnwNote: 'Often-overlooked driver of canter and jumping issues',
  },
  {
    topic: 'Bunny-hop canter and lead refusals',
    category: 'Pelvis & Sacroiliac',
    priority: 'medium',
    keywords: ['bunny hop', 'canter problems', 'disunited canter'],
    pnwNote: 'Specific symptom-language search — strong discovery content',
  },

  // ── Neck, Poll & TMJ ─────────────────────────────────────────────────────
  {
    topic: 'Poll and TMJ tension: why your horse fights the bridle',
    category: 'Neck, Poll & TMJ',
    priority: 'high',
    keywords: ['poll', 'tmj', 'jaw', 'bridling', 'headshy', 'bit'],
    pnwNote: 'High-resonance topic for dressage and Western pleasure owners',
  },
  {
    topic: 'Cervical stiffness and one-sided contact',
    category: 'Neck, Poll & TMJ',
    priority: 'medium',
    keywords: ['neck stiffness', 'cervical', 'one-rein', 'bending'],
    pnwNote: 'Trainers actively look for content explaining suppleness limits',
  },

  // ── Forelimb & Shoulder ──────────────────────────────────────────────────
  {
    topic: 'Short stride and shoulder restriction',
    category: 'Forelimb & Shoulder',
    priority: 'medium',
    keywords: ['short stride', 'pottery', 'shoulder', 'forelimb'],
    pnwNote: 'Pre-show and pre-purchase concern — competitive owners search this',
  },

  // ── Hindquarter, Hock & Stifle ───────────────────────────────────────────
  {
    topic: 'Hindquarter weakness and engagement',
    category: 'Hindquarter, Hock & Stifle',
    priority: 'high',
    keywords: ['hindquarter', 'hind end', 'engagement', 'impulsion'],
    pnwNote: 'Universal performance concern across English and Western',
  },
  {
    topic: 'Stifle and hock changes in older sport horses',
    category: 'Hindquarter, Hock & Stifle',
    priority: 'medium',
    keywords: ['stifle', 'hock', 'aging joint', 'joint changes'],
    pnwNote: 'PNW has many older performance horses still in light work',
  },

  // ── Discipline-Specific ──────────────────────────────────────────────────
  {
    topic: 'Chiropractic for the dressage horse',
    category: 'Discipline-Specific',
    priority: 'high',
    keywords: ['dressage', 'collection', 'lateral work', 'half pass'],
    pnwNote: 'Active dressage community across Washington and Oregon',
  },
  {
    topic: 'Chiropractic for jumpers and eventers',
    category: 'Discipline-Specific',
    priority: 'high',
    keywords: ['jumping', 'jumper', 'eventing', 'event horse', 'cross country'],
    pnwNote: 'Strong PNW eventing scene — Aspen Farms, Inavale, regional shows',
  },
  {
    topic: 'Chiropractic for hunters',
    category: 'Discipline-Specific',
    priority: 'medium',
    keywords: ['hunter', 'hunter under saddle', 'expression', 'movement quality'],
    pnwNote: 'Hunters judged on movement quality — direct fit for chiropractic',
  },
  {
    topic: 'Chiropractic for reining and Western performance',
    category: 'Discipline-Specific',
    priority: 'medium',
    keywords: ['reining', 'sliding stop', 'rollback', 'western performance', 'cutting'],
    pnwNote: 'Active Western performance community in Southwest Washington',
  },
  {
    topic: 'Chiropractic for the trail and pleasure horse',
    category: 'Discipline-Specific',
    priority: 'medium',
    keywords: ['trail horse', 'pleasure horse', 'trail riding'],
    pnwNote: 'Cascade and Coast Range trail riders — large recreational audience',
  },

  // ── Saddle Fit & Tack ────────────────────────────────────────────────────
  {
    topic: 'Saddle fit changes through the season',
    category: 'Saddle Fit & Tack',
    priority: 'high',
    keywords: ['saddle fit', 'saddle slipping', 'withers', 'topline change'],
    pnwNote: 'Wet-winter topline changes drive predictable spring saddle-fit issues',
  },
  {
    topic: 'Bits, contact, and the poll connection',
    category: 'Saddle Fit & Tack',
    priority: 'medium',
    keywords: ['bit', 'contact', 'curb', 'snaffle'],
    pnwNote: 'Bit-fit concerns surface in Western pleasure and dressage alike',
  },

  // ── Senior Horse, Layup & Return-to-Work ─────────────────────────────────
  {
    topic: 'Returning to work after layup',
    category: 'Senior Horse, Layup & Return-to-Work',
    priority: 'high',
    keywords: ['layup', 'lay-up', 'return to work', 'rehab', 'comeback'],
    pnwNote: 'Wet-winter pasture turnout often becomes unintended layup',
  },
  {
    topic: 'Older horse comfort and active retirement',
    category: 'Senior Horse, Layup & Return-to-Work',
    priority: 'high',
    keywords: ['older horse', 'senior', 'retired horse', 'aged horse'],
    pnwNote: 'Large population of long-retired sport horses on small acreage',
  },
  {
    topic: 'Coordinating chiropractic with the rehab vet',
    category: 'Senior Horse, Layup & Return-to-Work',
    priority: 'medium',
    keywords: ['rehab vet', 'sports medicine vet', 'post-surgery'],
    pnwNote: 'Coordination with WSU/OSU and regional sports-med vets is common',
  },

  // ── Asymmetry & Crookedness ──────────────────────────────────────────────
  {
    topic: 'One-sided horse, one-sided rider',
    category: 'Asymmetry & Crookedness',
    priority: 'high',
    keywords: ['one-sided', 'crooked', 'asymmetr', 'handedness'],
    pnwNote: 'Universal training concern — strong ongoing search interest',
  },

  // ── Proactive & General ─────────────────────────────────────────────────
  {
    topic: 'Pre-season movement evaluation',
    category: 'Proactive & General',
    priority: 'high',
    keywords: ['pre-season', 'baseline', 'evaluation', 'tune-up'],
    pnwNote: 'Spring pre-show-season window drives concentrated demand',
  },
  {
    topic: 'Pre-purchase chiropractic considerations',
    category: 'Proactive & General',
    priority: 'medium',
    keywords: ['pre-purchase', 'vetting', 'buyer evaluation'],
    pnwNote: 'Buyers spending serious money want a movement perspective alongside the PPE',
  },
  {
    topic: 'When to call the vet vs. the chiropractor',
    category: 'Proactive & General',
    priority: 'medium',
    keywords: ['vet vs chiro', 'when to call', 'red flags'],
    pnwNote: "Foundational trust-building content — clarifies the practice's role",
  },
  {
    topic: 'What an equine chiropractic visit actually looks like',
    category: 'Proactive & General',
    priority: 'high',
    keywords: ['first visit', 'what to expect', 'evaluation process', 'mobile equine'],
    pnwNote: 'High-conversion content for owners on the fence about booking',
  },
]
