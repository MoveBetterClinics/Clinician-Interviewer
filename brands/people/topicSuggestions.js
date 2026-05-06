// Curated topic database built from PNW chiropractic search patterns,
// common conditions at Move Better, regional activity-specific injuries,
// and patient avatar research (staff profiles + primary avatar, May 2026).
// priority: 'high' = very high patient search volume, 'medium' = solid volume,
//           'low' = niche but relevant to Move Better's patient base
// prototypes: optional array of prototype IDs ('reconnect'|'retain'|'excel')
//             indicating which patient archetypes this topic primarily serves.
//             Omitted for generic condition topics that serve all archetypes.

export const TOPIC_SUGGESTIONS = [
  // ── Spine & Core ──────────────────────────────────────────────────────────
  {
    topic: 'Low back pain',
    category: 'Spine & Core',
    priority: 'high',
    keywords: ['low back', 'lower back', 'lumbar'],
    pnwNote: '#1 searched chiropractic condition nationally and in Oregon',
  },
  {
    topic: 'Neck pain',
    category: 'Spine & Core',
    priority: 'high',
    keywords: ['neck pain', 'cervical'],
    pnwNote: 'High volume — aggravated by desk work and driving',
  },
  {
    topic: 'Sciatica',
    category: 'Spine & Core',
    priority: 'high',
    keywords: ['sciatica', 'sciatic'],
    pnwNote: 'Consistently top-5 searched pain condition',
  },
  {
    topic: 'Disc herniation',
    category: 'Spine & Core',
    priority: 'high',
    keywords: ['disc herniation', 'herniated disc', 'bulging disc', 'disc bulge'],
    pnwNote: 'Patients often search this after an MRI diagnosis',
  },
  {
    topic: 'Text neck & posture',
    category: 'Spine & Core',
    priority: 'high',
    keywords: ['text neck', 'posture', 'forward head'],
    pnwNote: "Portland's large tech workforce drives high search volume",
  },
  {
    topic: 'Work-from-home back & neck pain',
    category: 'Spine & Core',
    priority: 'high',
    keywords: ['work from home', 'desk pain', 'ergonomics', 'home office'],
    pnwNote: 'Post-2020 surge; Portland has one of the highest remote-work rates in the US',
  },
  {
    topic: 'SI joint pain',
    category: 'Spine & Core',
    priority: 'medium',
    keywords: ['si joint', 'sacroiliac', 'sacrum'],
    prototypes: ['reconnect'],
    pnwNote: 'Common in runners and during/after pregnancy',
  },
  {
    topic: 'Mid-back pain',
    category: 'Spine & Core',
    priority: 'medium',
    keywords: ['mid back', 'mid-back', 'thoracic', 'upper back'],
    pnwNote: 'Often overlooked — frequently caused by breathing dysfunction',
  },
  {
    topic: 'Spinal stenosis',
    category: 'Spine & Core',
    priority: 'medium',
    keywords: ['stenosis', 'spinal stenosis'],
    pnwNote: 'Pacific Northwest has above-average spinal procedure rates',
  },
  {
    topic: 'Scoliosis',
    category: 'Spine & Core',
    priority: 'medium',
    keywords: ['scoliosis'],
    pnwNote: 'Parents frequently search for non-surgical options for teens',
  },

  // ── Head & Nervous System ─────────────────────────────────────────────────
  {
    topic: 'Headaches & migraines',
    category: 'Head & Nervous System',
    priority: 'high',
    keywords: ['headache', 'migraine'],
    pnwNote: 'Top-3 searched chiropractic condition; pressure changes in PNW worsen migraines',
  },
  {
    topic: 'Concussion recovery',
    category: 'Head & Nervous System',
    priority: 'medium',
    keywords: ['concussion', 'post-concussion', 'tbi'],
    prototypes: ['reconnect'],
    pnwNote: 'High relevance for Portland contact sports — soccer, rugby, mountain biking',
  },
  {
    topic: 'TMJ & jaw pain',
    category: 'Head & Nervous System',
    priority: 'medium',
    keywords: ['tmj', 'jaw pain', 'temporomandibular'],
    pnwNote: 'Patients struggle to find providers — strong content opportunity',
  },
  {
    topic: 'Vertigo & dizziness',
    category: 'Head & Nervous System',
    priority: 'medium',
    keywords: ['vertigo', 'dizziness', 'bppv'],
    pnwNote: 'Patients rarely know chiropractic can help — high discovery potential',
  },
  {
    topic: 'Numbness & tingling',
    category: 'Head & Nervous System',
    priority: 'medium',
    keywords: ['numbness', 'tingling', 'neuropathy', 'pins and needles'],
    pnwNote: 'Frequently misattributed — content clarifying root causes drives trust',
  },

  // ── Shoulder & Upper Extremity ────────────────────────────────────────────
  {
    topic: 'Shoulder pain',
    category: 'Shoulder & Upper Extremity',
    priority: 'high',
    keywords: ['shoulder pain', 'shoulder impingement'],
    pnwNote: 'Climbing, kayaking, and swimming all stress the shoulder heavily in PNW',
  },
  {
    topic: 'Rotator cuff injury',
    category: 'Shoulder & Upper Extremity',
    priority: 'medium',
    keywords: ['rotator cuff', 'rotator'],
    prototypes: ['reconnect'],
    pnwNote: 'Patients actively searching for non-surgical alternatives',
  },
  {
    topic: 'Frozen shoulder',
    category: 'Shoulder & Upper Extremity',
    priority: 'medium',
    keywords: ['frozen shoulder', 'adhesive capsulitis'],
    prototypes: ['reconnect'],
    pnwNote: 'High frustration condition — clear content about recovery wins trust',
  },
  {
    topic: 'Rock climbing shoulder & elbow injuries',
    category: 'Shoulder & Upper Extremity',
    priority: 'high',
    keywords: ['climbing', 'rock climbing', 'climber'],
    prototypes: ['excel'],
    pnwNote: "Smith Rock is one of the US's top climbing destinations — huge local audience",
  },
  {
    topic: 'Tennis elbow',
    category: 'Shoulder & Upper Extremity',
    priority: 'medium',
    keywords: ['tennis elbow', 'lateral epicondylitis', 'lateral epicondyle'],
    pnwNote: 'Common in cyclists, climbers, and desk workers',
  },
  {
    topic: "Golfer's elbow",
    category: 'Shoulder & Upper Extremity',
    priority: 'low',
    keywords: ["golfer's elbow", 'golfers elbow', 'medial epicondylitis'],
    pnwNote: 'Less searched but relevant for climbing and throwing sports',
  },
  {
    topic: 'Carpal tunnel syndrome',
    category: 'Shoulder & Upper Extremity',
    priority: 'medium',
    keywords: ['carpal tunnel', 'wrist pain', 'wrist numbness'],
    pnwNote: 'Portland tech workforce — strong search demand for non-surgical options',
  },

  // ── Hip & Lower Extremity ─────────────────────────────────────────────────
  {
    topic: 'Knee pain',
    category: 'Hip & Lower Extremity',
    priority: 'high',
    keywords: ['knee pain', 'knee injury', 'runner\'s knee', 'patellar'],
    pnwNote: "Runners, cyclists, and hikers all deal with knee issues — Portland's #1 sports injury",
  },
  {
    topic: 'Hip pain & hip flexor tightness',
    category: 'Hip & Lower Extremity',
    priority: 'medium',
    keywords: ['hip pain', 'hip flexor', 'hip tightness', 'hip impingement'],
    pnwNote: 'Desk workers and runners alike — broad audience',
  },
  {
    topic: 'IT band syndrome',
    category: 'Hip & Lower Extremity',
    priority: 'high',
    keywords: ['it band', 'iliotibial', 'itbs'],
    pnwNote: 'Trail running capital — Forest Park runners are prime audience',
  },
  {
    topic: 'Piriformis syndrome',
    category: 'Hip & Lower Extremity',
    priority: 'medium',
    keywords: ['piriformis', 'deep gluteal'],
    pnwNote: 'Often confused with sciatica — high content discovery opportunity',
  },
  {
    topic: 'Plantar fasciitis',
    category: 'Hip & Lower Extremity',
    priority: 'high',
    keywords: ['plantar fasciitis', 'heel pain', 'plantar'],
    pnwNote: 'Year-round running culture keeps this consistently high-searched',
  },
  {
    topic: 'Achilles tendinitis',
    category: 'Hip & Lower Extremity',
    priority: 'medium',
    keywords: ['achilles', 'achilles tendinitis', 'achilles tendinopathy'],
    prototypes: ['reconnect', 'excel'],
    pnwNote: 'Trail runners and cyclists — returning to activity after injury',
  },
  {
    topic: 'Ankle sprain & instability',
    category: 'Hip & Lower Extremity',
    priority: 'medium',
    keywords: ['ankle sprain', 'ankle instability', 'ankle pain'],
    pnwNote: 'Hiking on uneven PNW terrain — repeated ankle sprains are common',
  },
  {
    topic: 'Shin splints',
    category: 'Hip & Lower Extremity',
    priority: 'medium',
    keywords: ['shin splints', 'medial tibial', 'shin pain'],
    pnwNote: 'New runners starting out on Portland paths',
  },

  // ── PNW Sports & Activity ─────────────────────────────────────────────────
  {
    topic: 'Trail running injuries',
    category: 'PNW Sports & Activity',
    priority: 'high',
    keywords: ['trail running', 'trail run', 'ultra running'],
    prototypes: ['excel'],
    pnwNote: 'Forest Park hosts more trail miles than Central Park — massive local audience',
  },
  {
    topic: 'Cycling & mountain biking injuries',
    category: 'PNW Sports & Activity',
    priority: 'high',
    keywords: ['cycling', 'cyclist', 'mountain biking', 'bike'],
    prototypes: ['excel', 'retain'],
    pnwNote: 'Portland is consistently ranked a top US cycling city',
  },
  {
    topic: 'Skiing & snowboard injuries',
    category: 'PNW Sports & Activity',
    priority: 'high',
    keywords: ['skiing', 'snowboard', 'ski injury', 'mt hood'],
    prototypes: ['excel'],
    pnwNote: 'Mt. Hood has year-round skiing — winter injuries flood clinics Jan–Mar',
  },
  {
    topic: 'Hiking & backpacking injuries',
    category: 'PNW Sports & Activity',
    priority: 'medium',
    keywords: ['hiking', 'backpacking', 'hiker', 'trail'],
    prototypes: ['retain'],
    pnwNote: 'Columbia River Gorge, Mt Hood, and the Cascades bring year-round hikers',
  },
  {
    topic: 'Swimming & paddle sports shoulder',
    category: 'PNW Sports & Activity',
    priority: 'low',
    keywords: ['swimming', 'kayaking', 'paddleboarding', 'swim shoulder'],
    prototypes: ['excel'],
    pnwNote: 'Columbia River and coastal access — active paddling community',
  },
  {
    topic: 'Youth & youth sports injuries',
    category: 'PNW Sports & Activity',
    priority: 'medium',
    keywords: ['youth', 'kids', 'pediatric', 'young athlete', 'youth sports'],
    prototypes: ['excel'],
    pnwNote: 'Parents searching for safe, conservative care for children',
  },

  // ── Special Populations ───────────────────────────────────────────────────
  {
    topic: 'Prenatal & pregnancy pain',
    category: 'Special Populations',
    priority: 'high',
    keywords: ['prenatal', 'pregnancy', 'pregnant'],
    prototypes: ['reconnect'],
    pnwNote: 'Clinics report strong demand — patients actively seek chiropractic during pregnancy',
  },
  {
    topic: 'Postpartum recovery',
    category: 'Special Populations',
    priority: 'medium',
    keywords: ['postpartum', 'post-partum', 'after birth', 'new mom'],
    prototypes: ['reconnect'],
    pnwNote: "Underserved topic with growing search interest — Move Better's content can own this",
  },
  {
    topic: 'Aging & staying active over 50',
    category: 'Special Populations',
    priority: 'medium',
    keywords: ['aging', 'over 50', 'senior', 'older athlete', 'masters'],
    prototypes: ['retain'],
    pnwNote: "PNW's active aging population wants to keep hiking, biking, and skiing",
  },

  // ── Chronic & Systemic ────────────────────────────────────────────────────
  {
    topic: 'Chronic pain management',
    category: 'Chronic & Systemic',
    priority: 'high',
    keywords: ['chronic pain', 'chronic'],
    prototypes: ['reconnect'],
    pnwNote: 'Oregon has above-average opioid awareness — patients seek alternatives',
  },
  {
    topic: 'Whiplash & car accident recovery',
    category: 'Chronic & Systemic',
    priority: 'high',
    keywords: ['whiplash', 'car accident', 'auto accident', 'mva', 'motor vehicle'],
    prototypes: ['reconnect'],
    pnwNote: 'Portland traffic — high MVA volume with patients unsure where to go',
  },
  {
    topic: 'Arthritis & joint pain',
    category: 'Chronic & Systemic',
    priority: 'medium',
    keywords: ['arthritis', 'osteoarthritis', 'joint pain', 'degenerative'],
    prototypes: ['retain'],
    pnwNote: 'Aging active population looking to avoid surgery and stay mobile',
  },
  {
    topic: 'Fibromyalgia',
    category: 'Chronic & Systemic',
    priority: 'medium',
    keywords: ['fibromyalgia', 'fibro'],
    prototypes: ['reconnect'],
    pnwNote: 'Patients feel dismissed by conventional medicine — chiropractic content builds trust',
  },
  {
    topic: 'Stress, tension & pain connection',
    category: 'Chronic & Systemic',
    priority: 'medium',
    keywords: ['stress', 'tension', 'anxiety', 'stress and pain'],
    pnwNote: 'Tech industry stress culture in Portland; patients seeking mind-body approaches',
  },
  {
    topic: 'Movement & strength for pain prevention',
    category: 'Chronic & Systemic',
    priority: 'medium',
    keywords: ['strength', 'prevention', 'movement training', 'rehab exercise'],
    prototypes: ['retain'],
    pnwNote: 'High-value topic aligning directly with Move Better philosophy',
  },

  // ── Physical Therapy & Rehabilitation ────────────────────────────────────
  {
    topic: 'Injury rehab & return to sport',
    category: 'Physical Therapy & Rehab',
    priority: 'high',
    keywords: ['rehab', 'rehabilitation', 'return to sport', 'return to activity'],
    prototypes: ['reconnect', 'excel'],
    pnwNote: 'Active PNW population wants to get back to their sport — not just be pain-free',
  },
  {
    topic: 'Exercise prescription for pain relief',
    category: 'Physical Therapy & Rehab',
    priority: 'high',
    keywords: ['exercise prescription', 'therapeutic exercise', 'corrective exercise', 'rehab exercises'],
    pnwNote: 'Patients searching for specific exercises — high content discovery potential',
  },
  {
    topic: 'Soft tissue therapy & myofascial release',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['soft tissue', 'myofascial', 'trigger point', 'graston', 'iastm', 'instrument assisted'],
    pnwNote: 'Differentiates Move Better from purely adjustment-focused clinics',
  },
  {
    topic: 'Dry needling',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['dry needling', 'trigger point needling', 'intramuscular stimulation'],
    pnwNote: 'Growing awareness — often confused with acupuncture, content can clarify',
  },
  {
    topic: 'Shockwave therapy',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['shockwave', 'shockwave therapy', 'eswt', 'extracorporeal'],
    pnwNote: 'Move Better offers this — very few clinics do, strong content differentiation',
  },
  {
    topic: 'Acupuncture for pain & recovery',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['acupuncture', 'sports acupuncture', 'acupuncture pain'],
    pnwNote: 'Move Better offers this — patients want to know what acupuncture actually treats',
  },
  {
    topic: 'Core stability & functional movement',
    category: 'Physical Therapy & Rehab',
    priority: 'high',
    keywords: ['core stability', 'core strength', 'functional movement', 'movement patterns'],
    prototypes: ['excel'],
    pnwNote: "Directly ties to Move Better's Movement Paradigm — breathing, bracing, hinging",
  },
  {
    topic: 'Hip strength & glute activation',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['hip strength', 'glute activation', 'glutes', 'hip stability'],
    prototypes: ['excel'],
    pnwNote: 'Root cause of many lower extremity issues — core to Move Better philosophy',
  },
  {
    topic: 'Breathing mechanics & diaphragm training',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['breathing mechanics', 'diaphragm', 'breathing paradigm', 'belly breathing'],
    pnwNote: "Move Better's Breathing Paradigm — unique angle very few clinics cover in content",
  },
  {
    topic: 'Load management & overuse injury prevention',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['load management', 'overuse injury', 'overtraining', 'training load'],
    prototypes: ['retain', 'excel'],
    pnwNote: 'Endurance athletes in PNW — cyclists, runners, and triathletes frequently overtrain',
  },
  {
    topic: 'Post-surgical rehabilitation',
    category: 'Physical Therapy & Rehab',
    priority: 'medium',
    keywords: ['post-surgical', 'post surgery', 'after surgery', 'surgical rehab'],
    prototypes: ['reconnect'],
    pnwNote: 'Patients searching for conservative care after or instead of surgery',
  },

  // ── Trust & Differentiation ───────────────────────────────────────────────
  // Topics derived from common patient frustrations with prior providers.
  // These build trust and set Move Better apart without attacking competitors.
  {
    topic: 'What a real treatment plan looks like',
    category: 'Trust & Differentiation',
    priority: 'high',
    keywords: ['treatment plan', 'care plan', 'what to expect', 'realistic results'],
    pnwNote: 'Patients frustrated by open-ended "3x/week forever" plans — content that explains a clear roadmap wins trust',
  },
  {
    topic: 'Why we explain the "why" behind your care',
    category: 'Trust & Differentiation',
    priority: 'high',
    keywords: ['why chiropractic', 'understand your pain', 'explain diagnosis', 'patient education'],
    pnwNote: 'Primary avatar explicitly wants to understand what\'s wrong — not just be adjusted and sent home',
  },
  {
    topic: 'Active care vs. passive care — what\'s the difference',
    category: 'Trust & Differentiation',
    priority: 'high',
    keywords: ['active care', 'passive care', 'adjustments only', 'exercise rehab', 'chiropractic vs PT'],
    pnwNote: 'Core differentiator for Move Better — directly addresses the "I tried chiropractic before" objection',
  },
  {
    topic: 'What "maintenance care" should actually look like',
    category: 'Trust & Differentiation',
    priority: 'medium',
    keywords: ['maintenance care', 'ongoing care', 'long term chiropractic', 'how long do I need care'],
    prototypes: ['retain'],
    pnwNote: 'Patients burned by open-ended maintenance plans need a reframe — Move Better\'s philosophy is progress, not dependency',
  },
  {
    topic: 'How we track your progress — and what to do if you\'re not seeing it',
    category: 'Trust & Differentiation',
    priority: 'medium',
    keywords: ['track progress', 'measurable results', 'goal setting', 'is it working'],
    pnwNote: 'Pain point: patients don\'t feel improvement or have no benchmarks — content that speaks to accountability stands out',
  },
  {
    topic: 'One patient at a time — why undivided attention matters',
    category: 'Trust & Differentiation',
    priority: 'medium',
    keywords: ['one on one', 'individual attention', 'not rushed', 'personalized care'],
    pnwNote: 'Staff value: undivided attention per visit is a differentiator vs. PT mills where patients are delegated to aides',
  },
  {
    topic: 'Why your exercises need to actually progress',
    category: 'Trust & Differentiation',
    priority: 'medium',
    keywords: ['exercise progression', 'individualized exercises', 'generic PT', 'rehab that works'],
    pnwNote: 'PT pain point: one-size-fits-all exercises that never change — Move Better\'s individualized approach is the counterpoint',
  },
  {
    topic: 'What to expect after your first chiropractic adjustment',
    category: 'Trust & Differentiation',
    priority: 'medium',
    keywords: ['after adjustment', 'post treatment symptoms', 'soreness after chiro', 'what to expect'],
    pnwNote: 'Pain point: unexpected post-treatment symptoms with no communication — setting expectations builds trust',
  },
  {
    topic: 'How to know if your provider is right for you',
    category: 'Trust & Differentiation',
    priority: 'low',
    keywords: ['right provider', 'find a chiropractor', 'finding the right PT', 'questions to ask'],
    pnwNote: 'Empowers the patient to advocate for themselves — positions Move Better as confident in its approach',
  },

  // ── Patient Journey & Archetypes ──────────────────────────────────────────
  // Topics aligned to the Reconnect / Continue / Excel prototype framework.
  {
    topic: 'Getting back to the activity you love after injury or life got in the way',
    category: 'Patient Journey',
    priority: 'high',
    keywords: ['return to activity', 'get back to sport', 'after injury', 'postpartum return', 'reconnect'],
    prototypes: ['reconnect'],
    pnwNote: 'Reconnect archetype — the largest patient segment; includes postpartum, post-surgical, chronic pain that stopped activity',
  },
  {
    topic: 'Staying active as you age — protecting what you\'ve built',
    category: 'Patient Journey',
    priority: 'high',
    keywords: ['aging and exercise', 'staying active over 40', 'longevity', 'active aging', 'continue'],
    prototypes: ['retain'],
    pnwNote: 'Continue archetype — proactive patients who want to protect their ability to hike, bike, and ski well into their 60s+',
  },
  {
    topic: 'Breaking through a performance plateau — training smarter, not just harder',
    category: 'Patient Journey',
    priority: 'medium',
    keywords: ['performance plateau', 'training smarter', 'athletic performance', 'weekend warrior', 'excel'],
    prototypes: ['excel'],
    pnwNote: 'Excel archetype — results-oriented patients; respond to data, timelines, and measurable outcomes',
  },
  {
    topic: 'When "I just have to manage this" is no longer acceptable',
    category: 'Patient Journey',
    priority: 'high',
    keywords: ['chronic pain management', 'learned to live with pain', 'accepting pain', 'there has to be another way'],
    prototypes: ['reconnect'],
    pnwNote: 'Primary avatar belief to disrupt — patients who\'ve normalized pain need permission to expect more',
  },
  {
    topic: 'You\'re not broken — what that chronic pain is actually telling you',
    category: 'Patient Journey',
    priority: 'high',
    keywords: ['am I broken', 'chronic pain meaning', 'pain signals', 'fear avoidance', 'body not working'],
    prototypes: ['reconnect'],
    pnwNote: 'Fear-avoidance patients (Sophie\'s specialty) — reframe from "broken body" to "fixable problem"',
  },
  {
    topic: 'Showing up for your kids — why your health is a family decision',
    category: 'Patient Journey',
    priority: 'medium',
    keywords: ['health for family', 'active parent', 'keeping up with kids', 'family motivation'],
    prototypes: ['retain'],
    pnwNote: 'Primary avatar motivation — family-oriented patients respond when health is framed as a family investment',
  },

  // ── Combat Sports & Body Composition ─────────────────────────────────────
  {
    topic: 'Grappling & combat sports injury prevention and recovery',
    category: 'Combat Sports & Body Composition',
    priority: 'medium',
    keywords: ['grappling', 'bjj', 'wrestling', 'combat sports', 'fighter', 'mma', 'jiu jitsu'],
    prototypes: ['excel'],
    pnwNote: 'Zach\'s specialty — Portland has a strong BJJ and grappling community; underserved by most chiro content',
  },
  {
    topic: 'Training around injuries — how to keep competing without breaking down',
    category: 'Combat Sports & Body Composition',
    priority: 'medium',
    keywords: ['train through injury', 'training around pain', 'compete with injury', 'fight prep'],
    prototypes: ['excel'],
    pnwNote: 'Combat athlete pain point — they won\'t stop training; content that helps them do it smarter earns trust',
  },
  {
    topic: 'MCL and ACL injuries — what recovery actually looks like',
    category: 'Combat Sports & Body Composition',
    priority: 'medium',
    keywords: ['mcl injury', 'acl injury', 'knee ligament', 'acl recovery', 'mcl sprain'],
    prototypes: ['reconnect', 'excel'],
    pnwNote: 'Zach specialty + active PNW population; high search volume post-injury',
  },
  {
    topic: 'Body composition, metabolic health, and movement — they\'re all connected',
    category: 'Combat Sports & Body Composition',
    priority: 'medium',
    keywords: ['body composition', 'metabolic health', 'weight loss movement', 'overweight pain', 'obesity and joints'],
    prototypes: ['excel'],
    pnwNote: 'Zach\'s patient focus — body comp and pain are intertwined; content that addresses both is rare and resonant',
  },
  {
    topic: 'Getting back to the gym when you\'re afraid of it',
    category: 'Combat Sports & Body Composition',
    priority: 'high',
    keywords: ['gym anxiety', 'fear of exercise', 'intimidated by gym', 'gym relationship', 'return to exercise'],
    prototypes: ['reconnect'],
    pnwNote: 'Common pain point Zach and Sophie both see — emotional component to exercise is underaddressed in chiro content',
  },

  // ── Powerlifting & Strength Sports ───────────────────────────────────────
  {
    topic: 'Powerlifting injuries — squat, deadlift, and bench pain',
    category: 'Powerlifting & Strength Sports',
    priority: 'medium',
    keywords: ['powerlifting', 'deadlift pain', 'squat injury', 'bench press shoulder', 'strength sport'],
    prototypes: ['excel'],
    pnwNote: 'Sophie\'s passion area — Portland has an active strength community; very little quality chiro content in this niche',
  },
  {
    topic: 'Training the powerlifter — how to coach around injury, not through it',
    category: 'Powerlifting & Strength Sports',
    priority: 'low',
    keywords: ['powerlifter rehab', 'strength athlete rehab', 'lifting with back pain', 'deadlift back pain'],
    prototypes: ['excel'],
    pnwNote: 'Niche but high-loyalty audience — powerlifters who trust a clinic refer aggressively within their community',
  },

  // ── Older Adults & Active Aging ───────────────────────────────────────────
  {
    topic: 'You\'re not too old — what older adults can actually expect from rehab',
    category: 'Older Adults & Active Aging',
    priority: 'high',
    keywords: ['older adult rehab', 'senior chiropractic', 'too old for PT', 'aging and recovery', 'elderly exercise'],
    prototypes: ['retain'],
    pnwNote: 'Hope\'s specialty — older patients are often dismissed and are surprisingly resilient; content that speaks to this demographic is rare',
  },
  {
    topic: 'Balance, fall prevention, and rebuilding body awareness',
    category: 'Older Adults & Active Aging',
    priority: 'high',
    keywords: ['balance training', 'fall prevention', 'proprioception', 'body awareness', 'stability older adult'],
    prototypes: ['retain'],
    pnwNote: 'Hope\'s focus — proprioception deficits in older adults are common and treatable; high-stakes topic for patients and their families',
  },
  {
    topic: 'Golf after 70 — keeping your game without wrecking your body',
    category: 'Older Adults & Active Aging',
    priority: 'medium',
    keywords: ['golf over 60', 'golf over 70', 'senior golfer', 'golf back pain', 'golf hip pain'],
    prototypes: ['retain'],
    pnwNote: 'Alek\'s 70–80 age group + golf community — powerful combination; very little chiro content targets senior golfers specifically',
  },

  // ── Young Athletes & Overtraining ─────────────────────────────────────────
  {
    topic: 'Youth sports overtraining — what parents and coaches need to know',
    category: 'Young Athletes & Overtraining',
    priority: 'medium',
    keywords: ['youth overtraining', 'young athlete injury', 'sports specialization', 'overuse youth', 'football injury'],
    prototypes: ['excel'],
    pnwNote: 'Philip\'s focus — single-sport specialization is epidemic; parents are searching for answers and trust providers who address load management',
  },
  {
    topic: 'Track and field injury prevention — what high school athletes need',
    category: 'Young Athletes & Overtraining',
    priority: 'low',
    keywords: ['track injury', 'high school runner', 'sprint injury', 'track and field pain', 'teenage runner'],
    prototypes: ['excel'],
    pnwNote: 'Philip specialty — content that speaks to high school athletes and their parents is underrepresented in chiro',
  },
  {
    topic: 'Football injuries — what young players and parents should know',
    category: 'Young Athletes & Overtraining',
    priority: 'low',
    keywords: ['football injury', 'youth football', 'high school football', 'football back pain', 'tackle injury'],
    prototypes: ['excel'],
    pnwNote: 'Philip specialty — high school football parents are an anxious, engaged audience looking for conservative care options',
  },
]

/**
 * Returns suggestions sorted by coverage gap:
 * uncovered high-priority topics first, then underrepresented ones.
 *
 * existingTopics: array of topic strings from actual interviews in Supabase.
 * options.prototype: 'reconnect' | 'retain' | 'excel' | null — when set,
 *   topics tagged for that prototype are boosted above all others (coverage-gap
 *   sort still applies within each group). Backward-compatible: omit options
 *   entirely for existing callers.
 */
export function getSuggestedTopics(existingTopics = [], options = {}) {
  const { prototype = null } = options
  const normalized = existingTopics.map((t) => t.toLowerCase())

  function coverageCount(suggestion) {
    return normalized.filter((t) =>
      suggestion.keywords.some((k) => t.includes(k.toLowerCase()))
    ).length
  }

  const priorityRank = { high: 3, medium: 2, low: 1 }

  function coverageSort(a, b) {
    if (a.interviewCount === 0 && b.interviewCount > 0) return -1
    if (a.interviewCount > 0 && b.interviewCount === 0) return 1
    const pd = priorityRank[b.priority] - priorityRank[a.priority]
    if (pd !== 0) return pd
    return a.interviewCount - b.interviewCount
  }

  const suggestions = TOPIC_SUGGESTIONS.map((s) => ({
    ...s,
    interviewCount: coverageCount(s),
  }))

  if (!prototype) {
    return suggestions.sort(coverageSort)
  }

  const boosted = suggestions.filter((s) => s.prototypes?.includes(prototype))
  const rest = suggestions.filter((s) => !s.prototypes?.includes(prototype))

  return [...boosted.sort(coverageSort), ...rest.sort(coverageSort)]
}
