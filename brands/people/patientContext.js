/**
 * Move Better People — patient context reference.
 *
 * Source: patient prototype documents, staff ideal patient profiles,
 * and primary avatar research (May 2026).
 *
 * Imported by prompts.js to ground AI-generated content and interview
 * questions in the real patients Move Better serves.
 */

// ── Primary Patient Avatar ────────────────────────────────────────────────────

export const PRIMARY_AVATAR = {
  name: 'The Frustrated Active Adult',
  demographics: [
    'Ages 30–55',
    'Physically active or formerly active',
    'College educated, professionally employed',
    'Family oriented — motivated by showing up for their kids, partners, and community',
    'Has disposable income and is willing to invest in their health when they trust the provider',
    'Located in a community with access to gyms, CrossFit, golf, recreational sports, or outdoor activity',
  ],
  story:
    'They were once active and athletic, or they currently are — but something is getting in the way. Maybe it\'s a nagging injury that never fully healed, postpartum changes, chronic pain they\'ve just "learned to live with," or a performance plateau they can\'t break through. They\'ve seen other providers and left feeling unheard, rushed, or handed a generic plan that didn\'t stick.',
  painPoints: [
    'Pain or limitations that won\'t go away no matter what they try',
    'Short, impersonal visits where they felt like just another number',
    'Being told to "rest" or "just get adjusted" without any real explanation',
    'Fear that they\'ll never get back to doing what they love',
    'Feeling like their body is working against them',
  ],
  beliefs: [
    'I\'ve tried chiropractic before and it didn\'t really work long term',
    'I just have to manage this — it\'s probably not going to get better',
    'I don\'t want surgery or medication — there has to be another way',
    'I want to understand what\'s actually wrong with me',
    'I want someone who sees me as an individual, not a diagnosis',
  ],
  fears: [
    'Will I be able to keep up with my kids as they get older?',
    'Am I going to have to give up the sport or activity I love?',
    'Is this just what getting older feels like?',
    'Why haven\'t any of my previous providers actually fixed this?',
    'Am I going to end up needing surgery?',
  ],
  whatTheyWant:
    'A provider who actually listens, takes the time to understand the full picture, explains the "why" behind their pain, and gives them a real plan — not just temporary relief. They want to feel empowered, not dependent. They want a partner in their health, not just someone to crack their back and send them home.',
}

// ── Three Patient Prototypes ──────────────────────────────────────────────────

export const PATIENT_PROTOTYPES = [
  {
    id: 'reconnect',
    label: 'Recover — "Reconnect"',
    summary:
      'This patient was once active and engaged in something they loved, but life got in the way — through childbirth, surgery, an old injury, or chronic pain. Their core desire is to get back to the activities and identity they\'ve lost. They may carry frustration, grief, or fear around movement, and often feel like their body has failed them.',
    coreDesire: 'Get back to doing what they love',
    triggers: ['postpartum', 'post-surgical', 'old injuries that stopped activity', 'chronic pain'],
    whatTheyNeed:
      'A provider who can help them rebuild trust in their body and create a clear path back to what matters most to them.',
    contentAngles: [
      'It\'s not too late to get back',
      'Your body hasn\'t failed you — it needs the right support',
      'What recovery actually looks like with a real plan',
      'Why "just rest it" isn\'t the answer',
    ],
  },
  {
    id: 'retain',
    label: 'Longevity — "Continue"',
    summary:
      'This patient is currently active and wants to stay that way. They\'re not chasing a new peak — they want to protect what they have. They\'re proactive about their health, understand the value of investing in their body now, and are motivated by the idea of compounding small gains over time.',
    coreDesire: 'Keep doing what they love as they age',
    triggers: ['aging concerns', 'wanting to stay ahead of injury', 'fear of losing capability'],
    whatTheyNeed:
      'A long-term health partner, not just a fix for a single problem.',
    contentAngles: [
      'Small investments now that pay off in decades',
      'How to train smarter, not just harder',
      'What proactive care actually looks like',
      'Staying active into your 50s, 60s, and beyond',
    ],
  },
  {
    id: 'excel',
    label: 'Performance — "Excel"',
    summary:
      'This patient has a specific goal they\'re working toward — a competition, a personal record, or simply being the best version of themselves in their sport or activity. They\'re driven, results-oriented, and respond well to data and measurable progress.',
    coreDesire: 'Perform at a higher level without breaking down',
    triggers: ['performance plateau', 'training for a competition', 'optimizing athletic output'],
    whatTheyNeed:
      'A provider who takes their goals seriously and can help them perform at a higher level.',
    contentAngles: [
      'What separates athletes who improve from those who plateau',
      'How to optimize your body for your sport',
      'Understanding the mechanics behind your performance',
      'Training without accumulating damage',
    ],
  },
]

// ── Common Pain Points (with prior providers) ─────────────────────────────────
// Use these to frame content that differentiates Move Better from generic care.

export const PRIOR_PROVIDER_PAIN_POINTS = [
  'Coming in for treatment 3× a week or long-term weekly without a clear end in sight',
  'Lack of clarity around treatment plan or what realistic results to expect',
  'Short, rushed visits that feel impersonal',
  'Maintenance care without meaningful progress or explanation',
  'Unexpected pain or worsening symptoms following care with no communication',
  'Perceived over-treatment — too many visits without justification',
  'Unwanted post-treatment symptoms that weren\'t warned about',
  // PT-specific
  'One-size-fits-all exercise programs that are generic or repetitive',
  'Little individualization or meaningful progression in exercises',
  'Not perceiving significant improvement over time; goals aren\'t clearly set or tracked',
  'Seeing multiple patients at once, being delegated to aides, feeling rushed',
  'Concerns not being heard or addressed during visits',
  'Not enough explanation about the condition or why certain exercises matter',
]

// ── Staff Ideal Patient Profiles ──────────────────────────────────────────────

export const STAFF_PROFILES = [
  {
    name: 'Dr. Q',
    idealPatient:
      'Intellectually curious, self-aware individuals who think they want passive care but can be guided toward active engagement. Someone with a personal story around aging well, flexible in their thinking, passionate about something they pursue. May include younger patients just beginning to explore exercise.',
    conditions: [],
    notes:
      'Enjoys mentally disarming patients and getting them out of their own way. Values flexibility of thought and personal motivation over age or activity level.',
  },
  {
    name: 'Tyler',
    idealPatient:
      'Someone with a positive relationship with movement, a clear goal in mind, who genuinely enjoys the challenge of learning new movement patterns.',
    conditions: [],
    notes: '',
  },
  {
    name: 'Zach',
    idealPatient:
      'Combat athletes (fighters, grapplers), overweight individuals, and people with secondary goals of body composition improvement, metabolic health, and staying injury-free while continuing to train and compete.',
    conditions: ['neck pain', 'neck/scapula shoulder dysfunction', 'MCL and ACL injuries', 'chronic low back pain', 'weight-related pain'],
    notes:
      'Skilled at working with patients who have a poor relationship with the gym, fear of working out, or an emotional component tied to exercise.',
  },
  {
    name: 'Sophie',
    idealPatient:
      'Once-athletic individuals — especially middle-aged — who had a poor experience or injury and developed fear-avoidance patterns, but still have the desire to get back into activity. Often live in a "it\'s broken and that\'s just how it is" mindset. Also loves working with powerlifters.',
    conditions: ['shoulder cases', 'knee cases', 'chronic injury', 'multiple aches and pains'],
    notes:
      'Connects especially well with middle-aged dads who have softened and want to get better for their kids — patients who recognize they\'re not as athletic as they once were and are ready to listen.',
  },
  {
    name: 'Alek',
    idealPatient:
      'Outgoing, active, motivated patients who are driven by performance and don\'t want pain to stop them from doing what they love (golf, CrossFit, etc.). Family-oriented, higher education, lots of life experience. Great conversationalists with interesting lives — patients you can learn from.',
    conditions: ['low back pain', 'hip instability', 'shoulder dysfunction'],
    notes:
      'Primarily works with age groups 30–40 and 70–80. Patients often frustrated by non-personal care and short visits from prior providers. Enjoys tempering quads and calves.',
  },
  {
    name: 'Hope',
    idealPatient:
      'Older adults who have been dismissed or underestimated due to age, and pregnant individuals who\'ve been treated as overly fragile.',
    conditions: ['proprioception deficits', 'poor body awareness', 'pregnancy-related pain'],
    notes:
      'Surprised by how robust and resilient older patients can be. Loves rebuilding mind-muscle connection and body awareness. Committed to helping both populations feel seen, heard, and genuinely cared for.',
  },
  {
    name: 'Philip',
    idealPatient:
      'Patients seeking a long-term perspective shift — moving away from peak performance toward sustainable health and feeling good in their body. Also enjoys working with young athletes, specifically football and track.',
    conditions: ['breathing dysfunction', 'overtraining'],
    notes:
      'His own perspective has matured: prioritizes feeling good, moving well, and compounding small changes over time. Attentive to over-training in young athletes.',
  },
  {
    name: 'Alli',
    idealPatient:
      'Open-minded patients ready to make real life changes — a perspective shift from "I can\'t do that" to "how can I do that?" Often have had poor experiences elsewhere or are dealing with chronic issues that haven\'t resolved.',
    conditions: ['chronic unresolved conditions'],
    notes: 'Works with patients who have financial barriers, bad prior patient experiences, or simply haven\'t found a provider willing to dig into root causes.',
  },
  {
    name: 'Whitney',
    idealPatient:
      'Persistent pain patients who have exhausted other options. Postpartum individuals given only passive care. Proactive people committed to long-term results who want to avoid medications, rest, or surgery.',
    conditions: ['persistent pain', 'postpartum back pain', 'chronic conditions'],
    notes:
      'Drawn to patients who are motivated, have movement goals, and are actively searching for solutions — not just symptom management.',
  },
]

/**
 * Returns a compact description of the patient context for prompt injection.
 * Used by prompts.js to orient the AI toward who Move Better's content serves.
 */
export function getPatientContextForPrompt() {
  const prototypeLines = PATIENT_PROTOTYPES.map(
    (p) => `  • ${p.label}: ${p.coreDesire}. ${p.whatTheyNeed}`
  ).join('\n')

  const painPointLines = PRIOR_PROVIDER_PAIN_POINTS.slice(0, 6)
    .map((pp) => `  • ${pp}`)
    .join('\n')

  return `PATIENT CONTEXT — WHO THIS CONTENT SERVES:
Move Better's primary patient is "The Frustrated Active Adult" — ages 30–55, active or formerly active, family-oriented, college-educated. They've seen other providers and left feeling unheard, rushed, or handed a generic plan. They don't want surgery or medication. They want someone who sees them as an individual and gives them a real plan.

Three archetypes define this patient base:
${prototypeLines}

Common frustrations with prior providers (address these indirectly in content):
${painPointLines}`
}
