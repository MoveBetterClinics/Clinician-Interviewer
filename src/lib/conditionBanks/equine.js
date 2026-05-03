/**
 * Move Better Equine condition bank.
 *
 * Move Better Equine is a mobile equine chiropractic practice serving
 * Southwest Washington and the greater Portland, Oregon region. Dr. Whitney
 * Phillips visits horses on-site at farms and barns, with a haul-in option
 * to Ridgefield, WA. Care is positioned as complementary to veterinary
 * medicine — restoring movement, balance, and comfort across English,
 * Western, and sport-horse disciplines.
 *
 * Per-bank exports (matched in every brand bank):
 *   CONDITION_BANK — keyed by lowercase condition / presenting-sign name
 *   KEYWORD_MAP    — fuzzy keyword → canonical bank key
 *   FALLBACK       — generic context when nothing matches
 *
 * Entries are written from the perspective of the rider/owner observing
 * their horse. The "subject" is the horse; the audience is the human.
 */

export const CONDITION_BANK = {
  // ── BACK & SPINE ─────────────────────────────────────────────────────────
  'back pain': {
    chronicRelevant: true,
    subjectProfile:
      'Sport and pleasure horses showing reluctance to round through the back, hollow posture under saddle, girthiness, sensitivity to grooming over the topline, or behavioral resistance during tacking up. Common in horses that jump, do dressage, or carry riders for long trail miles.',
    stakes:
      'Loss of training progress, having to scratch from a show season, watching a once-willing horse become resistant or unwilling to perform — and the worry that something more serious is being missed.',
    regionalAngles: [
      'Saddle fit changes through PNW seasons as horses gain or lose topline condition — winter pasture body to spring conditioning is when back issues surface',
      'Long trail miles in the Gorge and Cascade foothills load the thoracolumbar spine over hours of variable terrain',
      'Wet, slippery footing through the rainy season produces compensatory bracing patterns owners often miss until the horse is clearly sore',
      'Boarding barns in the Portland area typically have indoor arenas where small-circle work concentrates one-sided loading',
    ],
    interviewTopics: [
      'What postural and gait signs do you look for that point to thoracic vs. lumbar involvement?',
      'How do you differentiate primary back pain from compensatory back tension driven by a hindlimb issue?',
      'What does saddle-fit assessment look like in your evaluation, and when do you involve the saddle fitter or vet?',
      'What changes do owners typically notice in the first few sessions that tell you the back is responding?',
      'How do you stage a return to ridden work for a horse that\'s been backing off due to back soreness?',
    ],
  },

  'kissing spines': {
    chronicRelevant: true,
    subjectProfile:
      'Horses formally diagnosed via radiographs — often jumpers, eventers, and dressage horses — whose owners are looking for conservative complementary care alongside their veterinary plan. Frequently presents as a sudden change in willingness, bucking under saddle, or resistance to lateral work.',
    stakes:
      'Avoiding or delaying surgical intervention where possible, keeping a competition horse in work, and managing a diagnosis that owners often hear as career-ending.',
    regionalAngles: [
      'PNW eventing and hunter-jumper barns frequently haul out for veterinary imaging — owners arrive already armed with a diagnosis and looking for the next step',
      'Dressage barns in the Portland area have a high concentration of older, more developed warmbloods where overriding dorsal spinous processes become symptomatic with age',
      'Owners are often weighing surgical options at WSU or OSU veterinary teaching hospitals against conservative management',
    ],
    interviewTopics: [
      'How do you frame your role alongside the veterinary diagnosis and treatment plan?',
      'What postural patterns do you see in horses with confirmed kissing spines that the owner can learn to monitor at home?',
      'What ridden-work modifications do you typically recommend during a complementary-care plan?',
      'What does success look like for a kissing-spine horse over a season — what should owners realistically expect?',
    ],
  },

  // ── PELVIS & SACROILIAC ──────────────────────────────────────────────────
  'sacroiliac dysfunction': {
    chronicRelevant: true,
    subjectProfile:
      'Horses showing one-sided lead refusals, difficulty maintaining the canter, popping out behind on jumps, asymmetrical hindquarter muscling, or a "bunny-hop" canter. Common in jumpers, barrel and reining horses, and any horse doing repetitive one-sided work.',
    stakes:
      'A subtle, slow-building loss of performance that owners often blame on training before recognizing it as physical — and the risk of compensatory strain higher up the chain if it goes unaddressed.',
    regionalAngles: [
      'Indoor arena work through PNW winters concentrates one-sided circles and small turns',
      'Trail riding on cambered, root-strewn Cascade trails creates asymmetrical pelvic loading',
      'Western performance barns in Southwest Washington see SI strain from sliding stops, rollbacks, and quick directional changes',
    ],
    interviewTopics: [
      'What hands-on findings tell you the SI is involved versus the lumbar spine or hip?',
      'How do you assess pelvic symmetry standing and in motion?',
      'What ridden patterns most commonly produce SI strain — and what do you tell owners and trainers about modifying them?',
      'How does SI dysfunction change the canter quality in a way owners can learn to feel from the saddle?',
      'What\'s your typical care frequency and progression for an SI case in active competition?',
    ],
  },

  // ── NECK / POLL / TMJ ────────────────────────────────────────────────────
  'poll and tmj tension': {
    chronicRelevant: true,
    subjectProfile:
      'Horses that grind or chew the bit, shake or tilt their heads, resist bridling, lean on one rein, or show difficulty bending evenly. Common in young horses still learning contact, and in older horses with dental or long-standing bridling history.',
    stakes:
      'Inability to develop honest contact in dressage, headshyness that interferes with daily handling, and the worry that a behavioral problem is actually a pain problem being missed.',
    regionalAngles: [
      'PNW dressage barns place heavy demands on poll flexion and supple contact — small restrictions become very visible',
      'Trail and Western pleasure horses ridden in mechanical bits or curbs over long distances often present with poll-side restriction owners haven\'t connected to bit choice',
      'Coordinating with equine dentists in the Portland and Vancouver area — TMJ tension and dental balance often need addressing together',
    ],
    interviewTopics: [
      'What does your poll and TMJ evaluation actually involve, and what do you look for?',
      'How do you sort poll/TMJ pain from behavioral issues like greenness or training holes?',
      'When do you refer to or coordinate with the equine dentist?',
      'What changes do owners typically notice in contact and bridling after the first few sessions?',
      'What home-care or groundwork can owners do between visits to maintain poll suppleness?',
    ],
  },

  'cervical stiffness': {
    chronicRelevant: true,
    subjectProfile:
      'Horses with restricted lateral neck flexion, difficulty bending evenly to one side, hollow on one rein, or showing a stiff base of the neck during groundwork. Often older performance horses or horses recovering from a pasture incident or trailer fall.',
    stakes:
      'Loss of suppleness essential to dressage, jumping, and reining; concern about underlying cervical arthritis; difficulty progressing in training.',
    regionalAngles: [
      'Older sport horses competing into their late teens are common in the PNW — cervical arthritis becomes a frequent finding',
      'Pasture turnout on uneven ground and trailer hauling on Cascade and Coast Range routes contribute to neck strain owners may never witness',
      'Coordinating imaging through Pilchuck or local referral hospitals when red flags appear',
    ],
    interviewTopics: [
      'What range-of-motion patterns tell you cervical involvement vs. poll-only restriction?',
      'How do you decide when neck stiffness needs imaging or veterinary referral?',
      'What lateral and bending exercises do you build into a return-to-work plan?',
      'How do you communicate with the trainer about expected progression in suppleness?',
    ],
  },

  // ── FORELIMB / SHOULDER ──────────────────────────────────────────────────
  'forelimb shortness or shoulder restriction': {
    chronicRelevant: true,
    subjectProfile:
      'Horses showing a short or "pottery" front-limb stride, uneven landing on jumps, reluctance to extend in trot, or unilateral shoulder muscle atrophy. Common in jumpers, hunters, and event horses.',
    stakes:
      'Inability to produce the open, ground-covering stride sport horses are judged on; concern about an underlying lameness; loss of competitive standing.',
    regionalAngles: [
      'Hunter and jumper circuits across Washington and Oregon reward expressive, even forelimb mechanics',
      'Trail descents on technical PNW terrain place high concussive load on the forelimbs over hours',
      'Footing transitions between indoor sand, outdoor grass, and arena footing changes how shoulders load through a season',
    ],
    interviewTopics: [
      'What gait observations tell you the restriction is shoulder vs. lower-limb in origin?',
      'How do you involve the farrier and the vet when shoulder-driven gait changes appear?',
      'What changes in the canter or trot do owners notice first when the shoulder responds to care?',
      'What conditioning work supports lasting shoulder freedom between sessions?',
    ],
  },

  // ── HINDLIMB / STIFLE / HOCK ─────────────────────────────────────────────
  'hindquarter weakness': {
    chronicRelevant: true,
    subjectProfile:
      'Horses lacking impulsion, struggling to engage the hind end up hills or in collected work, dragging toes, or showing diminished hindquarter musculature. Common in young horses still developing strength and older horses dealing with stifle or hock changes.',
    stakes:
      'Performance plateau, difficulty progressing in collection or jumping power, and worry that age-related decline is starting earlier than expected.',
    regionalAngles: [
      'Hill work on Cascade-foothill trails is a defining test of hindquarter function for PNW performance horses',
      'Older performance horses common in Southwest Washington dressage and trail communities benefit from chiropractic alongside hock or stifle veterinary care',
      'Wet, deep footing in spring quickly reveals horses who lack hindquarter strength to push through it',
    ],
    interviewTopics: [
      'How do you separate weakness from pain-driven offloading in the hind end?',
      'What postural and gait clues point to stifle vs. hock vs. SI involvement?',
      'How do you coordinate with the vet when joint-injection plans are part of the picture?',
      'What conditioning exercises do you ask owners to add between sessions to build hindquarter strength?',
    ],
  },

  // ── PERFORMANCE & TRAINING ──────────────────────────────────────────────
  'lead refusals and canter issues': {
    chronicRelevant: false,
    subjectProfile:
      'Horses that consistently refuse one canter lead, swap leads behind, break to trot, or canter "disunited." Often the first sign owners and trainers notice that something physical is off.',
    stakes:
      'Inability to progress in flatwork, dressage, or jumping where clean leads are required; trainers and owners often spend months on it as a training problem before considering the body.',
    regionalAngles: [
      'PNW dressage and hunter-jumper trainers expect clean lead changes early in a horse\'s career — physical interference shows up quickly in training notes',
      'Western performance barns rely on flying lead changes for reining and rail classes — small SI or stifle issues block progress',
    ],
    interviewTopics: [
      'How do you decide whether a lead issue is training, conformation, or a physical restriction?',
      'What hands-on findings most consistently accompany a one-sided lead refusal?',
      'How do you coordinate with the trainer so they know what to ask for after a session?',
      'What\'s the typical timeline from first session to clean leads when the issue is chiropractic in origin?',
    ],
  },

  'subtle movement restriction': {
    chronicRelevant: false,
    subjectProfile:
      'Horses whose owners notice "something\'s off" without a clear lameness — refusal to pick up a lead, shifted posture in the cross-ties, tail swishing during transitions, bit grinding, reluctance to move forward, asymmetrical sweat patterns, or a saddle that suddenly slips to one side.',
    stakes:
      'Catching a problem before it becomes a frank lameness or behavior issue; validating the owner\'s observation when others have dismissed it.',
    regionalAngles: [
      'PNW horse owners tend to be observant and educated — they notice subtle changes early and want a provider who takes them seriously',
      'Boarding-barn culture across the region means owners often see their horse in motion daily and pick up changes others miss',
    ],
    interviewTopics: [
      'What subtle owner-observable signs most often turn out to be physically meaningful in your evaluations?',
      'How do you walk an owner through what to look for between visits?',
      'When does a subtle sign warrant veterinary follow-up before chiropractic?',
      'What does the first evaluation typically reveal in a "something\'s off" case?',
    ],
  },

  // ── BEHAVIOR-AS-PAIN ─────────────────────────────────────────────────────
  'behavior change under saddle': {
    chronicRelevant: false,
    subjectProfile:
      'Horses showing new bucking, bolting, balking, or refusing to go forward — or a previously willing horse becoming pinning-eared, tail-swishing, or grinding teeth. Often labeled a training or attitude problem before owners consider the body.',
    stakes:
      'Avoiding the spiral of escalating training pressure on a horse that\'s actually communicating pain; protecting the horse-rider partnership.',
    regionalAngles: [
      'PNW horse-owning culture is increasingly aware of pain-as-behavior — owners are open to investigating before disciplining',
      'Show-circuit pressure across Washington and Oregon can mask early pain signs until they become unmanageable',
    ],
    interviewTopics: [
      'How do you screen for pain-driven behavior change versus a true training issue?',
      'What postural and gait findings typically accompany the behaviors owners describe?',
      'What\'s your conversation with the rider and trainer when you suspect the body is the source?',
      'How quickly do behavior patterns typically resolve once the physical contributor is addressed?',
    ],
  },

  // ── RETURN TO WORK / OLDER HORSE ─────────────────────────────────────────
  'return to work after layup': {
    chronicRelevant: false,
    subjectProfile:
      'Horses coming back from injury, surgery, foaling, or extended pasture rest. Owners want to rebuild work without re-aggravating the original problem or creating new compensations.',
    stakes:
      'Avoiding setbacks during a vulnerable rebuilding period; rebuilding posture, topline, and confidence on schedule.',
    regionalAngles: [
      'Wet PNW winters often force longer pasture layups than planned — spring return-to-work brings a wave of compensation patterns',
      'Coordination with the rehab vet at WSU/OSU referral hospitals or local sports-medicine vets is common during return-to-work',
    ],
    interviewTopics: [
      'What does your role look like alongside the veterinary rehab plan during return-to-work?',
      'What postural and movement milestones do you watch for as the horse rebuilds?',
      'How do you adjust care frequency through the rebuilding phases?',
      'What home or in-hand work do you typically prescribe between visits?',
    ],
  },

  'older horse comfort': {
    chronicRelevant: true,
    subjectProfile:
      'Performance horses in their late teens and twenties still in light work; pasture-retired companions whose owners want to keep them moving comfortably; senior horses managing arthritis or long-standing compensations.',
    stakes:
      'Quality of life, soundness for the work the horse still loves, and helping the owner extend a partnership they\'ve built over decades.',
    regionalAngles: [
      'Southwest Washington and the Portland area have a large population of long-retired sport horses on small acreage where owners want active senior care',
      'Wet winter pasture footing is hard on senior horses — comfort and movement maintenance through the rainy months matters',
    ],
    interviewTopics: [
      'How does your evaluation and care change for a horse over twenty?',
      'What signs tell you the senior horse is comfortable enough for the level of work proposed?',
      'How do you coordinate with the vet on age-related joint or metabolic considerations?',
      'What does a maintenance care schedule look like for a healthy senior?',
    ],
  },

  // ── ASYMMETRY / GENERAL ─────────────────────────────────────────────────
  'one-sidedness and asymmetry': {
    chronicRelevant: true,
    subjectProfile:
      'Horses notably stiffer on one rein, with uneven muscling, asymmetrical hoof wear, a saddle that slips to one side, or a rider who feels they "can\'t sit straight" on the horse. Owners often describe it as the horse being "right-sided" or "left-sided."',
    stakes:
      'Limits the ceiling of training in any discipline that requires symmetry; compensatory loading that can shorten the horse\'s working career.',
    regionalAngles: [
      'Indoor-arena winters in the PNW reinforce one-sided habits because direction of work is repetitive',
      'Trail riding on cambered Cascade and Coast Range terrain reinforces handedness over time',
    ],
    interviewTopics: [
      'What objective findings do you use to characterize handedness and asymmetry?',
      'What\'s the role of the rider\'s own asymmetry in the horse\'s pattern, and how do you raise that?',
      'How do you coordinate with the saddle fitter and farrier on asymmetric findings?',
      'What groundwork patterns help owners maintain progress between visits?',
    ],
  },

  // ── PROACTIVE / GENERAL ─────────────────────────────────────────────────
  'movement evaluation': {
    chronicRelevant: false,
    subjectProfile:
      'Owners who want a baseline evaluation before show season, after a purchase, or simply as part of proactive care for a horse showing no specific complaint. Common ahead of breed inspections, year-end championships, or major moves up the levels.',
    stakes:
      'Catching small restrictions before they become training holes or visible lamenesses; building a documented baseline of how the horse moves when comfortable.',
    regionalAngles: [
      'PNW horse-show seasons clump in spring and summer — proactive pre-season evaluations are increasingly standard',
      'Pre-purchase coordination with sports-medicine vets in the Portland and Vancouver area is common for buyers spending serious money',
    ],
    interviewTopics: [
      'What does a baseline evaluation actually involve from start to finish?',
      'What posture and gait findings most often surprise owners on a "well horse" exam?',
      'How does an evaluation feed into the season\'s training and show plan?',
      'How often do you recommend re-evaluation through a competitive year?',
    ],
  },

  'sport horse performance': {
    chronicRelevant: false,
    subjectProfile:
      'Actively competing horses across dressage, jumping, eventing, reining, hunters, and cutting/cow work whose owners and riders want to optimize movement quality, recovery, and longevity in the sport.',
    stakes:
      'Marginal gains in suppleness, symmetry, and recovery that translate to competitive results and a longer career.',
    regionalAngles: [
      'PNW eventing, dressage, hunter-jumper, and Western performance circuits all draw competitive horses across Washington and Oregon',
      'Discipline-specific demands — collection in dressage, scope and bascule in jumping, sliding stops in reining — shape what we look for',
    ],
    interviewTopics: [
      'How does discipline change what you prioritize in a sport-horse evaluation?',
      'What\'s the most overlooked physical limiter you see in PNW sport horses across disciplines?',
      'How do you structure care frequency around the show calendar?',
      'How do you communicate findings to riders and trainers in language that translates to the saddle?',
    ],
  },
}

export const KEYWORD_MAP = {
  'back': 'back pain',
  'topline': 'back pain',
  'girthy': 'back pain',
  'cinchy': 'back pain',
  'kissing spines': 'kissing spines',
  'kissing spine': 'kissing spines',
  'overriding dorsal': 'kissing spines',
  'sacroiliac': 'sacroiliac dysfunction',
  'si joint': 'sacroiliac dysfunction',
  'si dysfunction': 'sacroiliac dysfunction',
  'pelvis': 'sacroiliac dysfunction',
  'poll': 'poll and tmj tension',
  'tmj': 'poll and tmj tension',
  'jaw': 'poll and tmj tension',
  'bridling': 'poll and tmj tension',
  'bit': 'poll and tmj tension',
  'headshy': 'poll and tmj tension',
  'neck': 'cervical stiffness',
  'cervical': 'cervical stiffness',
  'shoulder': 'forelimb shortness or shoulder restriction',
  'forelimb': 'forelimb shortness or shoulder restriction',
  'front limb': 'forelimb shortness or shoulder restriction',
  'short stride': 'forelimb shortness or shoulder restriction',
  'hind end': 'hindquarter weakness',
  'hindquarter': 'hindquarter weakness',
  'stifle': 'hindquarter weakness',
  'hock': 'hindquarter weakness',
  'lead': 'lead refusals and canter issues',
  'canter': 'lead refusals and canter issues',
  'lead change': 'lead refusals and canter issues',
  'flying change': 'lead refusals and canter issues',
  'subtle': 'subtle movement restriction',
  "something's off": 'subtle movement restriction',
  'tail swish': 'subtle movement restriction',
  'bit grind': 'subtle movement restriction',
  'buck': 'behavior change under saddle',
  'bolt': 'behavior change under saddle',
  'balk': 'behavior change under saddle',
  'pinning': 'behavior change under saddle',
  'attitude': 'behavior change under saddle',
  'behavior': 'behavior change under saddle',
  'behaviour': 'behavior change under saddle',
  'layup': 'return to work after layup',
  'lay-up': 'return to work after layup',
  'rehab': 'return to work after layup',
  'return to work': 'return to work after layup',
  'senior': 'older horse comfort',
  'older horse': 'older horse comfort',
  'retired': 'older horse comfort',
  'aged': 'older horse comfort',
  'asymmetr': 'one-sidedness and asymmetry',
  'one-sided': 'one-sidedness and asymmetry',
  'crooked': 'one-sidedness and asymmetry',
  'stiff one rein': 'one-sidedness and asymmetry',
  'evaluation': 'movement evaluation',
  'baseline': 'movement evaluation',
  'pre-purchase': 'movement evaluation',
  'pre-season': 'movement evaluation',
  'performance': 'sport horse performance',
  'dressage': 'sport horse performance',
  'jump': 'sport horse performance',
  'eventing': 'sport horse performance',
  'reining': 'sport horse performance',
  'hunter': 'sport horse performance',
  'sport horse': 'sport horse performance',
}

export const FALLBACK = {
  chronicRelevant: false,
  subjectProfile:
    'Horses across English, Western, and pleasure disciplines whose owners and riders have noticed a change in posture, gait, willingness, or performance and want a thorough evaluation. Owners are typically observant, evidence-minded, and respect their veterinarian — they\'re looking for complementary care that supports long-term soundness.',
  stakes:
    'Maintaining the work and partnership the horse and rider have built — through show seasons, trail miles, and the everyday joy of riding a horse that feels good in their body.',
  regionalAngles: [
    'PNW boarding and training culture means owners see their horses in motion almost daily and notice early changes',
    'Wet winters and uneven turnout terrain across Southwest Washington and Oregon shape compensation patterns through the off-season',
    'Owners across the region value evidence-informed, systems-based explanations and want chiropractic care that fits cleanly alongside their veterinary plan',
    'Seasonal show calendars and trail seasons create predictable windows where small restrictions surface as performance issues',
  ],
  interviewTopics: [
    'What does this presentation typically look like in the discipline most common for the horse?',
    'What postural or gait findings most often accompany this complaint in your evaluations?',
    'How do you coordinate with the veterinarian, farrier, or saddle fitter on a case like this?',
    'What does success look like for an owner — what observable change tells them the horse is responding?',
  ],
}
