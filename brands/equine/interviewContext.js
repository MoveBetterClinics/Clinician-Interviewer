/**
 * Move Better Equine — PNW horse-owner questionnaire database.
 *
 * Move Better Equine serves Southwest Washington and the greater Portland, OR
 * region — Ridgefield haul-in plus mobile farm calls. The audience is horse
 * owners, riders, and trainers across English, Western, and pleasure / trail
 * disciplines. Care is always positioned as complementary to veterinary care,
 * never a replacement.
 *
 * Each entry contains:
 *   - horseProfile: which horse / owner combination typically presents this way
 *   - ownerStakes: what the owner is afraid of losing for their horse
 *   - pnwAngles: regional hooks (PNW disciplines, terrain, climate)
 *   - interviewTopics: probes Whitney can speak to in the interview
 *   - chronicRelevant: true when this commonly shows up as a long-standing
 *     compensation pattern rather than a single acute episode
 *
 * NOTE FOR WHITNEY: this database is the seed content for AI-generated
 * interview prompts. Edit, add, or remove entries freely — each entry is a
 * plain JS object and the formatter at the bottom of the file just
 * concatenates them. See `brands/people/interviewContext.js` for the human
 * paradigm reference.
 */

export const PNW_HORSE_CONDITION_BANK = {
  // ── BACK & SPINE ─────────────────────────────────────────────────────────
  'back pain': {
    chronicRelevant: true,
    horseProfile:
      'Sport horses (dressage, jumpers, eventers), ranch and trail horses with packed work weeks, and aging pleasure horses who have quietly tightened up over years.',
    ownerStakes:
      'Their horse stops moving freely under saddle — loss of round work, refusal to lengthen, or a once-soft horse who now braces every ride.',
    pnwAngles: [
      'Soft, wet PNW arena footing in winter and harder summer ground create a yearly load swing that thoracic and lumbar muscles have to absorb',
      'Trailering across the Gorge and over Cascade passes for shows or trail trips loads the back asymmetrically — owners often see "Monday-morning" stiffness after a long haul',
      'Many local horses live out 24/7 on cambered Pacific Northwest pasture; standing on a slope all winter shapes a back that is rarely symmetrical by spring',
    ],
    interviewTopics: [
      'What signs of back pain do owners overlook before they call you out?',
      'How do you separate a primary back issue from secondary compensation for hocks, SI, or saddle fit?',
      'What does a typical adjustment sequence look like through the thoracolumbar region?',
      'When do you tell an owner their horse needs the vet first — and how do you frame that conversation?',
    ],
  },

  'kissing spine': {
    chronicRelevant: true,
    horseProfile:
      'Warmbloods, Thoroughbreds, and stock horses in collected work — most often diagnosed in the T13–T18 region after the horse starts refusing fences, hollowing under saddle, or bucking into the canter.',
    ownerStakes:
      'A confirmed radiograph diagnosis can feel like a death sentence for a riding career — owners want to know whether comfortable work is still on the table.',
    pnwAngles: [
      'PNW dressage and jumper barns see kissing spine workups regularly — Oregon Equine and Columbia Equine both image and refer for it locally',
      'Wet-winter footing changes engagement patterns; horses that compensate all season can present with sudden behavior changes when the ground firms up in spring',
      'Many owners arrive having already tried mesotherapy, shockwave, or steroid injections through their vet and want to know how chiropractic fits alongside that plan',
    ],
    interviewTopics: [
      'How do you talk to an owner whose horse just got a kissing spine diagnosis?',
      'What role does chiropractic care play alongside vet management — injections, mesotherapy, or surgical options like ISLD?',
      'Which compensation patterns through the SI, hips, and abdominals do you almost always find in a kissing spine horse?',
      'What does a realistic return-to-work timeline look like, and what should the owner watch for at home?',
    ],
  },

  'cold-backed': {
    chronicRelevant: false,
    horseProfile:
      'Pleasure and trail horses who feel tight in the first 5–10 minutes of the ride, often described as "humpy" or "scoots forward" when first mounted.',
    ownerStakes:
      'Worry that the horse is unsafe to mount, or guilt that they have been ignoring a real problem and calling it personality.',
    pnwAngles: [
      'PNW horses living out in cold, wet conditions stiffen overnight more than horses in dry climates — cold-backed presentation peaks November through March',
      'Owners who ride before work in dark winter mornings often skip a proper warm-up and the horse pays for it',
      'Older trail horses kept "in a paddock just to keep them happy" often develop true thoracic stiffness that gets blamed on cold weather alone',
    ],
    interviewTopics: [
      'When is "cold-backed" just stiffness, and when is it a sign of a real problem like kissing spine or saddle fit?',
      'What does a smart 10-minute pre-ride check look like for a horse who tends to be cold-backed?',
      'How does the PNW climate factor into a winter management plan?',
      'What home stretches or in-hand work do you give owners to use between visits?',
    ],
  },

  // ── SACROILIAC & PELVIS ──────────────────────────────────────────────────
  'sacroiliac dysfunction': {
    chronicRelevant: true,
    horseProfile:
      'Dressage horses losing collection, jumpers refusing lines, barrel and reining horses with one-sided torque, and any horse showing a "hunter\'s bump" or asymmetric croup.',
    ownerStakes:
      'Loss of hind-end power and the partnership their horse used to offer — collection, lead changes, the canter that used to flow.',
    pnwAngles: [
      'Cambered PNW pasture and uneven trail terrain load the SI joint asymmetrically over months — chronic SI presentations are very common in this region',
      'Trail and ranch horses scrambling up wet, slick hill terrain twist the pelvis in ways that flat-arena horses do not',
      'PNW dressage horses pushing for collection on slick winter footing often guard the SI long before it shows up as overt lameness',
    ],
    interviewTopics: [
      'How do you tell an SI issue apart from a hock or stifle issue when the symptoms overlap?',
      'What does the chiropractic story for the SI joint look like when there is also a kissing spine or hock arthritis diagnosis?',
      'How does the rider\'s seat and asymmetry feed back into the horse\'s SI?',
      'What home work — pole work, hill work, cavaletti — most helps maintain the gains you make at a visit?',
    ],
  },

  'hunters bump': {
    chronicRelevant: true,
    horseProfile:
      'Eventers, jumpers, barrel and reining horses with chronic SI strain — the dorsal sacroiliac ligament has stretched and the tuber sacrale stands up visibly above the croup.',
    ownerStakes:
      'Fear that the visible bump means a permanently broken horse — and confusion when the vet has cleared imaging but the horse still feels off.',
    pnwAngles: [
      'Common in PNW barrel racers and reining horses who train and compete on tight-pattern arena work',
      'Eventers training cross-country on wet, holding ground in Oregon and Washington can develop hunter\'s bump from repeated take-off and landing torque',
      'Many owners notice the bump only after a barn move or new bodyworker mentions it — and have ridden with mild SI strain for months before that',
    ],
    interviewTopics: [
      'What does a hunter\'s bump actually mean about the structures underneath?',
      'How much function can you realistically restore once the bump is visible?',
      'What does a maintenance schedule look like for a horse with a hunter\'s bump still doing their job?',
      'How do you coordinate with the vet on imaging, joint injections, or rehab when the SI is involved?',
    ],
  },

  // ── NECK, POLL & TMJ ─────────────────────────────────────────────────────
  'poll restriction': {
    chronicRelevant: true,
    horseProfile:
      'Dressage and English horses asked for poll flexion daily, plus any horse who has pulled back when tied or had a halter incident.',
    ownerStakes:
      'A horse who will not soften at the poll — heavy in the bridle, head tilted at the canter, or simply uncomfortable to ride on the bit.',
    pnwAngles: [
      'PNW dressage barns often spend the wet winter focused on poll flexion and lateral suppleness — poll restrictions surface during this exact phase of training',
      'Many local trail horses have a pull-back history from being tied at a trailer in a busy show or campground — the poll story starts with that incident',
      'Cold winter mornings followed by long warm-ups make subtle poll asymmetry more visible to a careful rider',
    ],
    interviewTopics: [
      'What is the chain reaction when the poll is restricted — through the cervical spine, withers, and even the hind end?',
      'How does a chiropractor evaluate poll motion in a horse who would rather not let you near their head?',
      'What rider habits or bit choices drive poll tension that owners don\'t realize?',
      'When does poll work need to be paired with a dental exam or a veterinary work-up first?',
    ],
  },

  'tmj': {
    chronicRelevant: true,
    horseProfile:
      'Bridle horses showing bit resistance, head-shaking, ear sensitivity, balling feed, or refusing one direction more than the other.',
    ownerStakes:
      'A horse who fights the bridle every ride — owners often blame themselves or the bit before realizing the jaw is the source.',
    pnwAngles: [
      'PNW dressage and hunter barns spend a lot of time on contact and connection — TMJ issues show up in the way the horse takes the bit',
      'The hyoid–poll–withers–hind end chain is a hallmark of equine bodywork education and it is real: a TMJ horse rarely has only a TMJ problem',
      'Local equine dentistry standards are good, which means owners often arrive having had a recent float and are puzzled their horse still resists',
    ],
    interviewTopics: [
      'How does the TMJ connect to the rest of the horse\'s body, and what does that mean for treatment order?',
      'When does TMJ resistance need a dental work-up before chiropractic?',
      'What signs of TMJ pain do owners chronically overlook?',
      'How can a rider tell if a problem is in the bit, the dental work, or the jaw joint itself?',
    ],
  },

  'cervical pain': {
    chronicRelevant: true,
    horseProfile:
      'Older sport horses with arthritis at C5–C7, young horses recovering from pasture wrecks, and any horse who has fallen, flipped, or been cast in a stall.',
    ownerStakes:
      'Worry about a serious neurological diagnosis like wobblers — and the heartbreak of a horse who cannot bend or look around comfortably.',
    pnwAngles: [
      'PNW pasture turnout on slick mud and wet ground produces seasonal pasture-fall injuries that show up as cervical pain weeks later',
      'Local sport-horse vets routinely image C5–C7 arthritis; many owners arrive wanting to understand how chiropractic complements ultrasound-guided injections',
      'Trail horses scrambling on rooty Cascade trails often catch a cervical strain that owners attribute to "just getting older"',
    ],
    interviewTopics: [
      'What red-flag cervical signs send a horse to the vet for imaging before any chiropractic work happens?',
      'How does cervical arthritis show up under saddle, and what does maintenance care look like?',
      'How do you build trust with a horse who has learned that the neck is a painful place?',
      'How do you coordinate with a vet who is doing cervical facet injections?',
    ],
  },

  // ── WITHERS & SHOULDER ───────────────────────────────────────────────────
  'withers and shoulder restriction': {
    chronicRelevant: true,
    horseProfile:
      'Horses in poorly fitted or aging saddles, jumpers absorbing repeated landing forces, and any horse with a girthy or cinchy reaction at tacking up.',
    ownerStakes:
      'A horse who is "sticky in the front end" — short-striding, choppy at the trot, or unable to lengthen.',
    pnwAngles: [
      'PNW saddle-fit professionals are very active in this region and routinely catch a withers issue before the rider does — owners often arrive after a fitting visit',
      'Trail horses carrying packs or saddle bags through the Cascades load the withers in ways that arena horses do not',
      'Local jumper riders descending steep cross-country fences put significant load on the shoulder and withers — repeated over a season this builds restriction',
    ],
    interviewTopics: [
      'How do saddle fit, withers anatomy, and shoulder mobility interact?',
      'What signs at tacking up tell you the withers, not the back, are the issue?',
      'How does shoulder restriction limit stride length and front-end mobility?',
      'When should a saddle fitter and a chiropractor be working together on the same horse?',
    ],
  },

  // ── BEHAVIORAL & PERFORMANCE ─────────────────────────────────────────────
  'lead refusal': {
    chronicRelevant: false,
    horseProfile:
      'Sport horses asked for clean lead changes — dressage, jumpers, eventers — plus any horse cross-cantering or repeatedly picking up the same lead regardless of direction.',
    ownerStakes:
      'A horse losing the lead change — and the rider losing scores, jumper rounds, or trust in their partner.',
    pnwAngles: [
      'Lead issues are one of the most common reasons PNW sport-horse owners call out a chiropractor — Columbia Equine and Hooves and Paws both list this prominently',
      'Wet PNW arenas in winter can mask a lead issue (the horse just slips) until summer footing reveals it as a real asymmetry',
      'Local dressage and jumper trainers are quick to send a horse for bodywork when changes get messy — Whitney sees this referral pattern often',
    ],
    interviewTopics: [
      'What does a lead refusal tell you about the horse\'s body before you even see them move?',
      'How do you separate a training problem from a physical problem?',
      'When does a horse who cross-canters need a vet lameness exam vs. chiropractic?',
      'What does a typical body-work fix look like, and how soon should the rider expect a clean change?',
    ],
  },

  'bucking and rearing': {
    chronicRelevant: false,
    horseProfile:
      'Horses bucking into transitions, rearing under saddle, or refusing to move forward — often after a saddle change, a layoff, or an unexplained behavior shift.',
    ownerStakes:
      'Safety. Owners are often scared, frustrated, or doubting their training before they think to look at the horse\'s body.',
    pnwAngles: [
      'Local trainers and coaches almost universally rule out pain before training when bucking is new — chiropractic is part of that work-up',
      'Wet-season layoffs are common in the PNW — horses returning to work in March often present with bucking that is really just a stiff back',
      'Many regional rescues and OTTBs come into chiropractic care for unexplained behavior issues that turn out to be back, SI, or poll restrictions',
    ],
    interviewTopics: [
      'What is the order of operations when a horse starts bucking — vet, dental, saddle fit, chiropractic, training?',
      'What signs in the buck itself tell you it is pain, not training?',
      'How do you reassure an owner who is questioning everything about their horse?',
      'When does behavior alone tell you to refuse to work and send the horse back to the vet first?',
    ],
  },

  'head tossing': {
    chronicRelevant: true,
    horseProfile:
      'English horses on contact, trail horses who shake or twist their heads in a particular gait, and horses with recent dental, bit, or poll changes.',
    ownerStakes:
      'A frustrated, dangerous, or simply unenjoyable ride — and worry that this is a permanent problem.',
    pnwAngles: [
      'PNW pollen and bug seasons aggravate true photic head-shaking — important to differentiate from pain-driven head tossing',
      'Local trail horses crossing rivers or bridges with bridle pressure changes often show transient head-tossing that resolves with poll work',
      'Many regional dressage horses develop a head-toss pattern in a single direction tied to TMJ and poll asymmetry',
    ],
    interviewTopics: [
      'How do you tell pain-driven head tossing from photic or environmental head-shaking?',
      'Where does the chain reaction start — TMJ, poll, atlas, dental?',
      'What are the most common bit and bridle mistakes that drive head tossing?',
      'When does head tossing need a vet referral first?',
    ],
  },

  'girthiness': {
    chronicRelevant: true,
    horseProfile:
      'Mares more than geldings, sport horses in tight-fitting saddles, and any horse who pins ears, snaps, or moves away when girthed.',
    ownerStakes:
      'A horse who hates being tacked up — and an owner who feels guilty every time they pull the girth.',
    pnwAngles: [
      'PNW saddle-fit professionals are active here, and many owners discover girthiness through a fitting visit',
      'Wet-season blanketing creates skin and rib-cage discomfort that shows up at the girth area in winter',
      'Local mare owners often hear "she\'s just a mare" — chiropractic can sort out the rib, sternal, or pectoral component that gets blamed on hormones',
    ],
    interviewTopics: [
      'When is girthiness a chiropractic story (sternum, ribs, pectorals) vs. a saddle fit story vs. an ulcer story?',
      'How does rib mobility connect to the rest of the back and shoulder?',
      'What is the right work-up order when an owner says "she has always been girthy"?',
      'How can owners change their tacking-up routine to reduce the response while care is in progress?',
    ],
  },

  // ── LAMENESS & ORTHOPEDIC ────────────────────────────────────────────────
  'mystery lameness': {
    chronicRelevant: true,
    horseProfile:
      'Horses with intermittent or shifting lameness, vague "off" presentations, or horses cleared by the vet after blocks and imaging but who still feel wrong to the rider.',
    ownerStakes:
      'A horse the rider knows is not right — and a sense that no one is going to find the answer.',
    pnwAngles: [
      'PNW vets are excellent at imaging and blocking; many owners arrive at chiropractic after a clean lameness exam, looking for the soft-tissue or compensation story',
      'Wet, slick PNW pasture turnout creates whole-body compensation patterns that classic lameness blocks do not always reveal',
      'Sport-horse trainers in this region are quick to call a chiropractor when a horse is "just off" before pushing through training',
    ],
    interviewTopics: [
      'How do you approach a horse who has had a clean vet lameness exam but the rider says is still off?',
      'What chiropractic findings most often correlate with intermittent or shifting lameness?',
      'When do you send the horse back to the vet for further imaging or referral?',
      'What does a realistic timeline and re-evaluation plan look like for these cases?',
    ],
  },

  'hock arthritis': {
    chronicRelevant: true,
    horseProfile:
      'Aging sport horses, ranch and reining horses with years of stop-and-spin, and any horse on a hock-injection schedule.',
    ownerStakes:
      'Wanting to keep their horse working at a meaningful level for years to come — without escalating drugs or losing soundness.',
    pnwAngles: [
      'Hock injections are routine in the PNW sport-horse world — many owners ask Whitney how chiropractic care fits between vet appointments',
      'Older trail horses on the wet, hilly terrain of the Cascades and Coast Range tend to compensate for hock pain through the SI and back',
      'Local vets often pair Adequan or Legend with chiropractic and saddle-fit work as a maintenance plan',
    ],
    interviewTopics: [
      'How does chiropractic care fit alongside hock injections, joint supplements, and PRP?',
      'What does the SI and back compensation pattern look like in a horse with hock arthritis?',
      'How do you coach an owner on conditioning work that supports the hocks?',
      'What does a long-term maintenance schedule look like for a working horse with hock arthritis?',
    ],
  },

  // ── SADDLE FIT ───────────────────────────────────────────────────────────
  'saddle fit pain': {
    chronicRelevant: true,
    horseProfile:
      'Any horse whose saddle has not been re-fitted as their topline, age, or muscle mass changed — most owners assume the saddle still fits because nothing has changed in their tack room.',
    ownerStakes:
      'Discovering that years of asymmetric back work might have come from a fixable equipment issue — both relief and frustration.',
    pnwAngles: [
      'PNW saddle fitters are well-respected and active — Whitney often refers in this network and sees horses post-fitting',
      'Seasonal turnout, winter weight loss, and summer condition swings change a horse\'s topline meaningfully across a year — saddles need to follow',
      'Trail and pack saddles get less attention than English performance saddles; many local trail horses have never had a real fitting',
    ],
    interviewTopics: [
      'What signs of saddle fit pain do you see most often, and when do you stop and call a fitter?',
      'How does back work hold up if the saddle is still wrong?',
      'What changes in the horse\'s body should trigger a re-fit?',
      'How do you coordinate between saddle fitter, chiropractor, and trainer on a recovering horse?',
    ],
  },

  // ── SENIOR & MAINTENANCE ─────────────────────────────────────────────────
  'senior horse stiffness': {
    chronicRelevant: true,
    horseProfile:
      'Horses in their late teens through 30s — pleasure, trail, retired sport horses — with morning stiffness, slow lying down or getting up, and reduced range under saddle.',
    ownerStakes:
      'Keeping a beloved horse comfortable as long as possible, and knowing when adjustments and care are still helping vs. when they are pushing past what the horse can give.',
    pnwAngles: [
      'PNW winters are especially hard on senior horses — wet, cold ground worsens stiffness and getting up and down on slick footing is a real risk',
      'Many local owners keep retired horses out 24/7 — they need a maintenance plan that reflects the demands of pasture life, not just under-saddle work',
      'A growing local senior-horse community is open to integrative care — chiropractic, acupuncture, laser therapy, and tailored exercise paired together',
    ],
    interviewTopics: [
      'What does maintenance care look like for a 25-year-old who still does light trail work?',
      'How do you tell a stiff senior who can be helped from one whose comfort needs more than chiropractic?',
      'What home management changes — footing, blanketing, turnout, exercise — make the biggest difference?',
      'When do you have the conversation about quality of life with an owner?',
    ],
  },

  // ── PERFORMANCE & DISCIPLINE ─────────────────────────────────────────────
  'performance maintenance': {
    chronicRelevant: false,
    horseProfile:
      'Sport horses in active competition — dressage, hunter/jumpers, eventers, reiners, barrel racers, endurance — whose owners want a maintenance schedule, not a problem fix.',
    ownerStakes:
      'Staying competitive and protecting an athletic career; preventing the small issues that cost a season or a placing.',
    pnwAngles: [
      'PNW dressage, eventing, and hunter/jumper circuits all run heavy spring through fall — riders want pre-show and between-show care that fits the calendar',
      'Reining and barrel racing in this region demand discipline-specific shoulder, lower-cervical, and pelvis work',
      'Endurance and competitive trail in Oregon and Washington put unique sustained-work demands on a horse — recovery between events is a real conversation',
    ],
    interviewTopics: [
      'What does a maintenance schedule look like for a competitive horse — by discipline?',
      'What pre-show and post-show care helps performance and recovery?',
      'Which discipline-specific patterns do you almost always find in a dressage horse vs. a jumper vs. a barrel horse?',
      'How do you coach a rider who wants to use chiropractic care as a competitive edge, not just a problem fix?',
    ],
  },

  'cross cantering': {
    chronicRelevant: false,
    horseProfile:
      'Sport horses asked for connected canter work — dressage, jumpers, eventers — whose canter has gotten disunited or who are lugging onto one rein.',
    ownerStakes:
      'A canter that used to flow and is now a fight — affecting scores, rounds, and the horse\'s confidence.',
    pnwAngles: [
      'Cross-cantering is one of the most common owner-reported reasons for an equine chiropractor visit in the PNW sport-horse world',
      'Slick winter arena footing teaches some horses to brace through the canter — patterns that persist into summer',
      'Local trainers are quick to send a horse out for bodywork when the canter quality drops — Whitney sees this referral early in the issue',
    ],
    interviewTopics: [
      'What does cross-cantering tell you about the SI, hips, and spine?',
      'How do you separate a training problem from a body problem?',
      'What home pole work, hill work, or transitions help retrain a clean canter after the body is sorted?',
      'What is the realistic timeline from "the canter is a mess" to "the canter is back"?',
    ],
  },

  // ── POST-INJURY ──────────────────────────────────────────────────────────
  'post injury rehab': {
    chronicRelevant: true,
    horseProfile:
      'Horses returning from stall rest, suspensory or check ligament rehab, post-colic surgery, or post-trauma — with secondary compensations to address.',
    ownerStakes:
      'A safe, full return to work — without trading one fixed problem for three new ones from compensation.',
    pnwAngles: [
      'Local sport-horse vets and rehab facilities increasingly include chiropractic in return-to-work plans — Whitney is often part of that team',
      'Stall-rest patterns in PNW barns are tough — wet weather limits turnout options, so compensation patterns from limited movement are common',
      'Cold-hosing, icing, and limited turnout build their own kind of stiffness — owners are often surprised how much body work the horse needs after a layup',
    ],
    interviewTopics: [
      'What does a chiropractic return-to-work plan look like — and at what point in rehab does it start?',
      'What compensation patterns do you almost always find after stall rest?',
      'How do you coordinate with the vet, the farrier, and the trainer during a long rehab?',
      'How do you tell the owner when their horse is ready for the next step — and when to wait?',
    ],
  },

  'pull back trauma': {
    chronicRelevant: true,
    horseProfile:
      'Horses with a history of pulling back when tied — at the trailer, the wash rack, a hitching post — sometimes years before the symptoms surface.',
    ownerStakes:
      'A horse with mysterious head, neck, or poll symptoms whose owner had forgotten the pull-back incident entirely.',
    pnwAngles: [
      'Trailering across the Gorge and to PNW shows means horses are tied at busy show grounds and campgrounds where pull-back incidents happen',
      'Many local trail and pleasure horses have an "old halter incident" in their history that surfaces years later as poll or atlas restriction',
      'Owners often discover the connection only when a chiropractor finds the C1–C2 issue and asks about a pull-back history',
    ],
    interviewTopics: [
      'How does a pull-back show up in the body — even years later?',
      'Why is the atlas–axis (C1–C2) area especially vulnerable in these incidents?',
      'What does treatment look like, and how many visits does it usually take?',
      'How can owners prevent pull-back trauma — tying methods, equipment, and training?',
    ],
  },
}

/**
 * Returns the most relevant horse-owner context for a given condition string.
 * Does a fuzzy keyword match against the database keys.
 */
export function getPNWHorseContext(condition) {
  const lower = condition.toLowerCase()

  if (PNW_HORSE_CONDITION_BANK[lower]) return PNW_HORSE_CONDITION_BANK[lower]

  const keywordMap = {
    'kissing spine': 'kissing spine',
    'dorsal spinous': 'kissing spine',
    'cold-back': 'cold-backed',
    'cold back': 'cold-backed',
    'humpy': 'cold-backed',
    'back pain': 'back pain',
    'thoracic': 'back pain',
    'lumbar': 'back pain',
    'sore back': 'back pain',
    'sacroiliac': 'sacroiliac dysfunction',
    'si joint': 'sacroiliac dysfunction',
    'si dysfunction': 'sacroiliac dysfunction',
    'sacrum': 'sacroiliac dysfunction',
    'hunter': 'hunters bump',
    'tuber sacrale': 'hunters bump',
    'poll': 'poll restriction',
    'tmj': 'tmj',
    'jaw': 'tmj',
    'bit grinding': 'tmj',
    'cervical': 'cervical pain',
    'neck pain': 'cervical pain',
    'wobbler': 'cervical pain',
    'withers': 'withers and shoulder restriction',
    'shoulder': 'withers and shoulder restriction',
    'lead': 'lead refusal',
    'cross-canter': 'cross cantering',
    'cross canter': 'cross cantering',
    'disunited': 'cross cantering',
    'buck': 'bucking and rearing',
    'rear': 'bucking and rearing',
    'head toss': 'head tossing',
    'head shak': 'head tossing',
    'head shy': 'head tossing',
    'girth': 'girthiness',
    'cinch': 'girthiness',
    'lame': 'mystery lameness',
    'mystery': 'mystery lameness',
    'off': 'mystery lameness',
    'hock': 'hock arthritis',
    'spavin': 'hock arthritis',
    'saddle fit': 'saddle fit pain',
    'saddle pain': 'saddle fit pain',
    'senior': 'senior horse stiffness',
    'older horse': 'senior horse stiffness',
    'aging': 'senior horse stiffness',
    'arthritis': 'senior horse stiffness',
    'performance': 'performance maintenance',
    'maintenance': 'performance maintenance',
    'rehab': 'post injury rehab',
    'post-injury': 'post injury rehab',
    'stall rest': 'post injury rehab',
    'pull back': 'pull back trauma',
    'pulled back': 'pull back trauma',
    'tied': 'pull back trauma',
  }

  for (const [keyword, key] of Object.entries(keywordMap)) {
    if (lower.includes(keyword)) return PNW_HORSE_CONDITION_BANK[key]
  }

  // Generic PNW equine fallback — no compensation angle assumed
  return {
    chronicRelevant: false,
    horseProfile:
      'Horse owners across Southwest Washington and the Portland area — sport-horse competitors, trail and pleasure riders, ranch hands, and aging-horse caretakers who want their horse moving and feeling well.',
    ownerStakes:
      'Keeping the horse comfortable and capable — for the next ride, the next show, or simply a long, sound retirement.',
    pnwAngles: [
      'PNW horses live with cold, wet winters and active spring–fall competition seasons — patterns of stiffness and recovery follow that calendar',
      'Trail, ranch, and sport-horse work are all common locally — discipline-specific compensation patterns vary widely',
      'Local owners are educated and integrative — they want to understand how chiropractic, vet care, saddle fit, and farrier work fit together',
      'Cambered pasture and uneven trail terrain create asymmetries that owners often miss until a bodyworker points them out',
    ],
    interviewTopics: [
      'What does this issue look like in a PNW horse vs. a horse in another region?',
      'How does the local climate, terrain, or competition calendar shape this presentation?',
      'What does a realistic resolution timeline look like — and what would put the horse on the slower end of that range?',
      'When does this need a vet referral first, and how do you frame that conversation with the owner?',
    ],
  }
}

/**
 * Formats horse-owner context into a string block for injection into a system
 * prompt. Includes a long-standing-compensation angle only when clinically
 * relevant. The function name matches the human paradigm so prompts.js can
 * import a single symbol regardless of brand.
 */
export function formatPNWContextForPrompt(condition) {
  const ctx = getPNWHorseContext(condition)

  return `
PACIFIC NORTHWEST HORSE-OWNER CONTEXT — use this to shape your questions:
- The horse and owner who walk into this conversation: ${ctx.horseProfile}
- What the owner is afraid of losing: ${ctx.ownerStakes}
- Regional angles that make content resonate with PNW horse owners:
${ctx.pnwAngles.map(a => `  • ${a}`).join('\n')}
- Key interview areas specific to this condition and audience:
${ctx.interviewTopics.map(q => `  • ${q}`).join('\n')}
${ctx.chronicRelevant ? `
LONG-STANDING COMPENSATION ANGLE — explore this when it fits naturally:
${condition} often presents not as a fresh injury but as a long-standing compensation pattern the horse has been quietly carrying. Where relevant, draw out:
  • How does treating a horse with chronic ${condition} (months or years of compensation) differ from a fresh case?
  • What chain reaction through the rest of the body — neck, withers, back, hips — do you almost always find?
  • How do you frame realistic timelines and expectations for an owner who has been living with this for a long time?
  • How does chiropractic care complement the veterinary work this horse may have already had?
` : ''}`
}
