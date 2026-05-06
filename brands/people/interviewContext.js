/**
 * Pacific Northwest patient questionnaire database.
 *
 * Move Better serves Portland, OR and Vancouver, WA — a region defined by
 * trail runners, cyclists, hikers, skiers, kayakers, and tech desk workers.
 * Patients here tend to be active, health-conscious, skeptical of medication,
 * and highly motivated to maintain their outdoor lifestyle.
 *
 * Each entry contains:
 *   - prototypes: which patient archetypes this condition most often maps to
 *       'reconnect' — wants to get back to what they loved (postpartum, post-injury, chronic pain)
 *       'retain'   — wants to keep doing what they love (proactive, longevity-focused)
 *       'excel'    — wants to perform at a higher level (athlete, goal-driven)
 *   - patientProfile: who typically walks in with this condition
 *   - lifestyleStakes: what they're afraid of losing (activity, family, identity, surgery)
 *   - pnwAngles: regional hooks that make content resonate locally
 *   - interviewTopics: specific areas to probe in the interview
 *   - chronicRelevant: true when this condition commonly presents as chronic
 *     or when the acute-vs-chronic distinction is clinically meaningful
 *
 * Avatar alignment: content should speak to "The Frustrated Active Adult" —
 * ages 30–55, formerly or currently active, family-oriented, has tried other
 * providers and left feeling unheard or given a generic plan. See
 * brands/people/patientContext.js for the full avatar and prototype definitions.
 */

export const PNW_CONDITION_BANK = {
  // ── BACK & SPINE ─────────────────────────────────────────────────────────
  'lower back pain': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain', 'excel'],
    patientProfile:
      'Desk workers, hikers carrying heavy packs, cyclists in aggressive riding positions, and weekend warriors who overdo it on the trail. Often 35–50, family-oriented, and have already seen at least one other provider without lasting relief. Many have normalized the pain and are surprised there\'s a better answer.',
    lifestyleStakes:
      'Missing multi-day hikes on the Gorge, being unable to ski Mt. Hood or Mt. Bachelor, losing their morning run — and showing up for their kids\' games and activities without wincing or bracing. The underlying fear: is this just my life now?',
    pnwAngles: [
      'How trail running and hiking with loaded packs loads the lumbar spine differently than everyday movement',
      'Why sitting at a standing desk all day in a Portland tech job can be just as damaging as heavy labor',
      'The connection between hip mobility and lower back pain in cyclists who spend hours in a forward-flexed position',
      'How rain and cold weather affect patients\' willingness to stay active — and how that inactivity feeds the pain cycle',
    ],
    interviewTopics: [
      'What movement patterns are almost always broken in lower back pain patients?',
      'How does a hiker\'s lower back problem differ from a cyclist\'s?',
      'What\'s the biggest mistake PNW patients make when their back goes out?',
      'How does the Move Better breathing and bracing approach apply specifically here?',
      'What does recovery look like for someone who wants to get back to backpacking?',
      'What do you tell a patient who has already seen two other providers — a chiropractor and a PT — and didn\'t get lasting results?',
    ],
  },

  'sciatica': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain'],
    patientProfile:
      'Cyclists with tight piriformis, long-haul commuters, desk workers, and trail runners with hip imbalances. Many arrive convinced they have a serious disc problem and that surgery may be inevitable — often based on a scary MRI report.',
    lifestyleStakes:
      'Inability to sit comfortably on long drives to hiking trailheads, cycling tours, or airplane seats to ski resorts. The deeper fear: permanent damage, loss of sensation, or ending up on an operating table.',
    pnwAngles: [
      'How saddle position on road and mountain bikes creates piriformis compression that mimics true sciatica',
      'Why long drives out to trailheads or ski mountains aggravate symptoms',
      'The role of hip external rotation strength — critical for trail running on uneven PNW terrain',
    ],
    interviewTopics: [
      'How do you distinguish true disc sciatica from piriformis syndrome in a cyclist or runner?',
      'What movement tests reveal the root cause quickly?',
      'What\'s the typical recovery arc for an active person?',
      'What do patients try before they find you — and why doesn\'t it last?',
      'What do you say to a patient who\'s been told their MRI looks bad and surgery might be their only option?',
    ],
  },

  'disc herniation': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'excel'],
    patientProfile:
      'Weightlifters, CrossFitters, and hikers who\'ve had one too many heavy pack days. Also 30–50-year-olds who lifted something wrong and are now terrified they\'ve permanently broken their spine. Many come in after being told by a specialist that they need surgery.',
    lifestyleStakes:
      'Fear of permanent damage, surgery, and losing their active identity entirely. The family angle is real: they\'re afraid of not being able to play with their kids or carry their grandkids. They want someone to tell them it\'s fixable.',
    pnwAngles: [
      'How PNW hikers\' habit of descending steep trails with heavy packs loads discs asymmetrically',
      'The CrossFit and gym culture in Portland and how improper hip hinge mechanics contribute',
      'Why fear of movement after a herniation often causes more long-term damage than the disc itself',
    ],
    interviewTopics: [
      'What does the research actually say about disc herniations and their natural course?',
      'How do you rebuild a patient\'s confidence in movement after they\'ve been told their back is "broken"?',
      'What movement patterns are non-negotiable to restore before returning to hiking or lifting?',
      'How do you work with a patient who\'s been told surgery is their only option and they\'re scared?',
      'What\'s the most important thing a disc herniation patient needs to hear in the first visit?',
    ],
  },

  // ── NECK & SHOULDERS ─────────────────────────────────────────────────────
  'neck pain': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain'],
    patientProfile:
      'Remote tech workers, cyclists in aggressive riding positions, climbers, and paddlers. Often 30–50, have tried massage or generic chiropractic adjustments, and are frustrated that it keeps coming back. They want to understand why — not just get temporary relief.',
    lifestyleStakes:
      'Headaches ruining morning runs, inability to look left/right on bike descents, losing the ability to climb — and the daily toll of waking up stiff and tight. For many, it\'s affecting their work and patience with their family.',
    pnwAngles: [
      'Portland\'s booming tech and remote-work culture has created an epidemic of screen-neck posture',
      'Road cyclists and gravel riders who spend hours in a dropped handlebar position',
      'Rock climbers who constantly look up on overhung routes load the cervical spine in a unique way',
      'Kayakers and paddlers with neck rotation restrictions — a serious safety issue on the water',
    ],
    interviewTopics: [
      'What posture habits are you seeing most in Portland patients right now?',
      'How does bike fit relate to chronic neck pain in cyclists?',
      'What\'s the breathing connection to neck tension most patients don\'t know about?',
      'What\'s the fastest thing a desk worker can do today to reduce their neck pain?',
      'Why does neck pain keep coming back after adjustments or massage — and what actually breaks the cycle?',
    ],
  },

  'shoulder pain': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'excel'],
    patientProfile:
      'Climbers, swimmers, paddlers, overhead athletes, and CrossFitters. Also the 40-something who used to play rec sports and now can\'t lift their arm above shoulder height without pain. Many have been told they have a "bad rotator cuff" and are considering whether surgery is worth it.',
    lifestyleStakes:
      'Losing climbing grades, being sidelined from kayaking season, giving up overhead lifts — and the quiet identity loss that comes with it. For parents, it\'s not being able to throw a ball with their kid or lift them up.',
    pnwAngles: [
      'The climbing boom in Portland — shoulder overuse injuries are at an all-time high at indoor gyms like Crux and Movement',
      'Sea kayaking and SUP on the Columbia River create sustained shoulder loading patterns',
      'Trail running with trekking poles — improper technique creates rotator cuff imbalances',
      'Shoulder impingement in swimmers who train in preparation for open-water events in the Puget Sound or Oregon coast',
    ],
    interviewTopics: [
      'What\'s the most common shoulder mistake you see in climbers?',
      'How do thoracic spine mobility and shoulder health connect?',
      'What does a typical shoulder rehab arc look like for an athlete who wants to stay active during recovery?',
      'How does the Move Better approach differ from what a surgeon or traditional PT would recommend?',
      'What do you tell a patient who\'s been told they have a partial rotator cuff tear and surgery is being recommended?',
    ],
  },

  // ── KNEES ─────────────────────────────────────────────────────────────────
  'knee pain': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain', 'excel'],
    patientProfile:
      'Trail runners, cyclists, skiers, hikers on steep descents, and aging athletes refusing to slow down. Spans 25–65: the 30-year-old who can\'t run anymore and the 55-year-old who\'s been told their knee is "bone on bone" and they\'re headed for replacement.',
    lifestyleStakes:
      'Hood to Coast relay, RAMROD cycling event, ski season at Timberline, and everyday stairs — and being able to kneel down to play with their kids without pain. The fear: knee replacement, losing the sport that defines them, or just accepting decline.',
    pnwAngles: [
      'IT band syndrome is almost a Portland rite of passage for trail runners — the hilly terrain makes it worse',
      'Patellar tendinopathy in cyclists from too much volume too fast on the spring cycling season return',
      'Ski knee injuries — ACL tears and meniscus issues — spike every winter on Mt. Hood and Mt. Bachelor',
      'The steep descents on PNW trails (Forest Park, Gorge trails) place massive eccentric load on the quads and knees',
    ],
    interviewTopics: [
      'What does IT band syndrome tell you about a runner\'s movement patterns beyond the knee itself?',
      'How do you treat a skier who needs to be back on snow in 6 weeks?',
      'What\'s the hip-knee connection most knee pain patients don\'t know about?',
      'What running or cycling modifications allow patients to stay active during treatment?',
      'What do you say to a patient who\'s been told they have "bone on bone" arthritis and surgery is inevitable?',
    ],
  },

  // ── HIPS ─────────────────────────────────────────────────────────────────
  'hip pain': {
    chronicRelevant: true,
    prototypes: ['retain', 'reconnect'],
    patientProfile:
      'Cyclists, runners, desk workers, and aging active adults. Often the 40–60-year-old who has quietly adapted their movement to avoid the pain — shortening their stride, skipping certain exercises, or stopping the activities they love.',
    lifestyleStakes:
      'Losing the ability to run, hike, or cycle — the activities that define the PNW lifestyle — and the dignity of moving without restriction. For some, hip pain is threatening their ability to keep up with young kids or grandkids.',
    pnwAngles: [
      'Hip flexor tightness is rampant in Portland\'s cycling commuter culture — hours in saddle + hours at desk',
      'Trail runners on technical PNW terrain need significant lateral hip stability that flat-road runners don\'t develop',
      'Hip labral issues in young active adults who do yoga and climbing — hypermobility with poor motor control',
    ],
    interviewTopics: [
      'What does hip pain in a cyclist look like vs. hip pain in a trail runner?',
      'How does the hinge pattern connect to hip health in Move Better\'s system?',
      'What\'s the biggest hip mobility myth you\'d want PNW patients to know?',
      'When does hip pain warrant imaging vs. when can you treat without it?',
      'What do you tell the patient who has been quietly adapting their life around hip pain for years?',
    ],
  },

  // ── FOOT & ANKLE ─────────────────────────────────────────────────────────
  'plantar fasciitis': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain'],
    patientProfile:
      'Runners increasing mileage for spring races, hikers returning to the trail after winter, and people who stand all day. Often the 35–50-year-old whose first steps out of bed every morning are excruciating — and who has tried every insole, stretch, and boot on the market.',
    lifestyleStakes:
      'Missing the Eugene Marathon, Portland Marathon, or their first-morning steps on a backpacking trip — and the slow erosion of the morning run that was their mental health anchor.',
    pnwAngles: [
      'Portland\'s rainy winters push runners inside and change their stride — spring outdoor return spikes plantar fasciitis',
      'The Portland marathon training season creates a predictable surge of heel pain every spring',
      'Hiking in waterlogged trail shoes with compromised cushioning is a major PNW contributor',
      'Standing desk workers in Portland tech often develop plantar fasciitis from standing on hard floors all day',
    ],
    interviewTopics: [
      'What does plantar fasciitis tell you about ankle and calf mobility upstream?',
      'What are the most common mistakes people make when they try to treat this themselves?',
      'How do you keep a marathon runner training while treating their heel?',
      'What footwear advice do you give to PNW patients who hike in all weather?',
      'Why do so many plantar fasciitis patients try everything — orthotics, night splints, cortisone — and still not get lasting results?',
    ],
  },

  'ankle sprain': {
    chronicRelevant: false,
    prototypes: ['reconnect', 'excel'],
    patientProfile:
      'Trail runners on technical terrain, basketball players, and hikers on rooty PNW trails. Many rolled an ankle months ago, were told to rest and ice it, and never addressed the underlying instability — now they re-roll it constantly.',
    lifestyleStakes:
      'Fear of chronic instability — rolling the ankle on every hike or run — and the cascading effect on their entire lower extremity and training.',
    pnwAngles: [
      'Technical trails in the Columbia River Gorge and Forest Park create high ankle sprain risk even for experienced runners',
      'Many PNW patients treat their own sprains with ice and rest — and never address the underlying instability',
      'Trail running on wet roots (a constant in Oregon) demands exceptional ankle proprioception',
    ],
    interviewTopics: [
      'Why do so many ankle sprains become chronic instability problems?',
      'What proprioception work is most important for getting back on technical trail terrain?',
      'How long does it actually take to fully rehabilitate an ankle sprain vs. what patients expect?',
      'What\'s missing in the typical "RICE and wait" approach that most patients get after a sprain?',
    ],
  },

  // ── HEAD & NEUROLOGICAL ──────────────────────────────────────────────────
  'headaches': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain'],
    patientProfile:
      'Tech workers, cyclists, and anyone dealing with chronic tension and screen time. Often have been managing with ibuprofen for years and are surprised to learn there may be a structural cause — and a structural solution.',
    lifestyleStakes:
      'Headaches ruining weekends, making trail runs miserable, or interfering with work — and the quiet dread of waking up knowing today might be a headache day.',
    pnwAngles: [
      'Cervicogenic headaches — driven by neck dysfunction — are common in Portland\'s screen-heavy tech workforce',
      'Cyclists getting headaches from sustained neck extension on long rides',
      'Weather-related headache patterns that PNW patients often experience with the barometric pressure swings of the rainy season',
    ],
    interviewTopics: [
      'How do you identify whether a headache is coming from the neck or something else entirely?',
      'What\'s the breathing connection to chronic tension headaches?',
      'What posture changes make the most immediate difference for a desk worker with headaches?',
      'What should a patient ask their doctor if they\'ve been getting headaches for years without answers?',
      'What do you say to the patient who\'s been taking ibuprofen every few days for years and doesn\'t realize there might be a better answer?',
    ],
  },

  // ── CHRONIC PAIN ─────────────────────────────────────────────────────────
  'chronic pain': {
    chronicRelevant: true,
    prototypes: ['reconnect'],
    patientProfile:
      'Patients who have been in pain for months or years — often told by other providers that nothing more can be done. They\'ve tried medication, injections, or surgery with limited relief. Many are active PNW adults in their 30s–50s whose quality of life has quietly shrunk around their pain. They\'ve learned to manage rather than heal — and most have stopped believing better is possible.',
    lifestyleStakes:
      'Getting their life back — not just reducing pain but returning to hiking, sleeping through the night, playing with grandkids, and feeling like themselves again. The stakes are identity-level: they don\'t want to be a "chronic pain patient" anymore.',
    pnwAngles: [
      'Portland\'s health-conscious culture means many chronic pain patients have already tried acupuncture, massage, PT, and medication — and are skeptical but still hopeful',
      'The PNW\'s active lifestyle makes chronic pain especially identity-threatening — patients define themselves by what they can do outdoors',
      'Rainy, grey winters in Oregon can amplify pain sensitivity and depression, creating seasonal pain flares that are often misunderstood',
      'Many chronic pain patients in the Portland area are drawn to Move Better because of the movement-first, root-cause philosophy — they\'re tired of being managed rather than fixed',
      'Tech workers with years of desk posture pain have often normalized their suffering before finally seeking help',
    ],
    interviewTopics: [
      'How is treating chronic pain fundamentally different from treating an acute injury?',
      'What\'s happening in the nervous system with chronic pain that most patients don\'t understand?',
      'Why do so many chronic pain patients fall through the cracks of conventional medicine?',
      'What does a first visit look like for someone who has been in pain for years?',
      'How does the Move Better movement-first approach address the root cause of chronic pain rather than just the symptoms?',
      'What role does patient mindset and pain education play in recovery?',
      'What does a realistic recovery timeline look like — and how do you manage expectations for someone who\'s been told nothing will help?',
      'Can you share what a chronic pain success story looks like at Move Better?',
    ],
  },

  'fibromyalgia': {
    chronicRelevant: true,
    prototypes: ['reconnect'],
    patientProfile:
      'Predominantly women, often dismissed by prior providers as overly sensitive or told it\'s psychological. Active adults who have watched their world shrink as pain made everyday activities feel impossible. They arrive with a mix of desperation and skepticism — they want to be believed before anything else.',
    lifestyleStakes:
      'Being believed, being understood, and finding any path back to the life they had before. Even small wins — sleeping better, being able to walk more — feel enormous after years of being dismissed.',
    pnwAngles: [
      'Portland has a large population of fibromyalgia patients who feel underserved by conventional medicine',
      'The rain and lack of sunlight in PNW winters can significantly worsen fibromyalgia symptoms — a local factor worth addressing',
      'Many fibromyalgia patients arrive at Move Better after years of being told their pain isn\'t real',
    ],
    interviewTopics: [
      'How do you approach a patient whose pain has been dismissed or labeled as purely psychological?',
      'What does movement do for the nervous system in fibromyalgia that medication can\'t replicate?',
      'What does early success look like for a fibromyalgia patient — and how do you celebrate it?',
      'How do you pace treatment for someone whose pain can spike unpredictably?',
      'What\'s the single most important thing you want a fibromyalgia patient to know in their first visit?',
    ],
  },

  // ── UPPER EXTREMITY ──────────────────────────────────────────────────────
  'tennis elbow': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'excel'],
    patientProfile:
      'Climbers, cyclists, paddlers, and desk workers with repetitive gripping or forearm strain. Often the patient who has been dealing with it for months, tried rest, tried braces, maybe tried a cortisone shot — and is now frustrated it keeps coming back.',
    lifestyleStakes:
      'Being unable to grip a paddle, handlebar, or climbing hold — activities that define their PNW life. Or, for desk workers, not being able to get through a workday without pain.',
    pnwAngles: [
      'Portland\'s indoor climbing boom has made lateral epicondylitis one of the most common overuse injuries at gyms like Crux and Movement',
      'Road and gravel cyclists gripping handlebars for 4–6 hour rides develop chronic forearm tendon stress',
      'Kayakers and SUP paddlers with high stroke volume overload the forearm extensors in a way most patients don\'t anticipate',
      'Tech workers who type all day already have loaded forearm tendons before they ever pick up a paddle or a hold',
    ],
    interviewTopics: [
      'What does the forearm and elbow tell you about mechanics higher up the chain — shoulder, thoracic spine?',
      'What\'s the biggest mistake climbers make that turns a minor elbow issue into a 6-month injury?',
      'How do you load a tendon back to health without making it worse?',
      'What activity modifications let a patient stay climbing or paddling during recovery?',
      'Why does rest and bracing often not solve tennis elbow — and what actually does?',
    ],
  },

  'golfer\'s elbow': {
    chronicRelevant: true,
    prototypes: ['excel', 'reconnect'],
    patientProfile:
      'Climbers, paddlers, and anyone with heavy gripping demands — despite the name, rarely golfers. Many are surprised to learn this has a name and a treatment protocol; they\'ve been told to just "rest it" and are frustrated it keeps coming back.',
    lifestyleStakes:
      'Losing the ability to crimp holds, paddle strokes, or even carry grocery bags without pain.',
    pnwAngles: [
      'Medial epicondylitis is extremely common in Portland\'s climbing community — crimping and pinching create enormous flexor tendon load',
      'Paddlers with high stroke volume on the Columbia and Willamette develop medial elbow stress over a season',
      'CrossFitters doing high-rep kipping pull-ups or muscle-ups frequently present with medial elbow pain',
    ],
    interviewTopics: [
      'How do you differentiate medial epicondylitis from UCL stress or pronator teres involvement?',
      'What grip and wrist mechanics contribute most to golfer\'s elbow in climbers?',
      'How does treatment differ from lateral epicondylitis?',
      'What\'s the return-to-climbing protocol you use?',
    ],
  },

  'carpal tunnel': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain'],
    patientProfile:
      'Tech workers, cyclists, and anyone with sustained wrist flexion demands — often misdiagnosed or overtreated. Many arrive after being told surgery is their only option, and are skeptical but don\'t want to go under the knife.',
    lifestyleStakes:
      'Numbness and weakness that interfere with typing, cycling, and anything requiring grip — and the fear of permanent nerve damage or a surgery that doesn\'t fully solve it.',
    pnwAngles: [
      'Portland\'s large tech and creative workforce makes carpal tunnel one of the most common repetitive strain presentations',
      'Road cyclists in a dropped handlebar position put sustained pressure on the median nerve at the wrist',
      'Many patients arrive after being told surgery is their only option — and are surprised there\'s a movement-based alternative',
    ],
    interviewTopics: [
      'How do you determine whether symptoms are truly coming from the wrist vs. the neck or thoracic outlet?',
      'What ergonomic and movement changes make the biggest immediate difference for a desk worker?',
      'How does the Move Better approach compare to what a hand surgeon would recommend?',
      'What\'s the role of nerve mobility work in recovery?',
      'What do you tell a patient who\'s been advised to have carpal tunnel surgery but isn\'t sure they want to?',
    ],
  },

  // ── SPINE & PELVIS ────────────────────────────────────────────────────────
  'mid-back pain': {
    chronicRelevant: true,
    prototypes: ['retain', 'reconnect'],
    patientProfile:
      'Cyclists in aggressive positions, desk workers with poor thoracic mobility, and climbers with restricted upper back extension. Often overlooked — patients are told their problem is their neck or lower back, and the thoracic spine is never addressed.',
    lifestyleStakes:
      'Inability to rotate fully on the bike, reach overhead in climbing, or sit comfortably at a desk for a full workday — and the ripple effect on neck and lower back pain that most patients don\'t connect.',
    pnwAngles: [
      'Road and gravel cyclists spending hours in thoracic flexion develop progressively worse mid-back stiffness over a season',
      'Remote tech workers in Portland sit in the same position for 8+ hours — the thoracic spine bears the cost',
      'Climbers need thoracic extension and rotation for overhanging routes — restriction here limits performance and causes pain',
      'Backpackers carrying heavy packs compress the mid-thoracic spine in ways that accumulate over a multi-day trip',
    ],
    interviewTopics: [
      'How does thoracic mobility affect the neck, shoulders, and lower back — the chain reaction most patients don\'t know about?',
      'What does Move Better\'s bracing system mean for thoracic function specifically?',
      'What\'s the single best thing a Portland desk worker can do for their mid-back today?',
      'How does mid-back restriction limit athletic performance in cyclists and climbers?',
    ],
  },

  'si joint pain': {
    chronicRelevant: true,
    prototypes: ['reconnect'],
    patientProfile:
      'Runners, hikers, pregnant and postpartum women, and anyone with asymmetrical loading patterns. Postpartum women are a key population — often undertreated or dismissed, told to just do kegel exercises while dealing with debilitating one-sided pain.',
    lifestyleStakes:
      'One-sided hip and low back pain that makes running, hiking stairs, or even rolling over in bed unbearable — and for new mothers, the inability to care for their baby comfortably.',
    pnwAngles: [
      'Trail runners on cambered PNW trails — one foot always higher than the other — develop asymmetrical SI joint stress',
      'Pregnant and postpartum women in Portland\'s active community frequently experience SI joint dysfunction and are underserved',
      'Single-leg activities like hiking steep switchbacks on Gorge trails load the SI joint in ways flat-surface running doesn\'t',
    ],
    interviewTopics: [
      'How do you distinguish SI joint pain from lower back or hip pain — and why does it matter for treatment?',
      'What\'s the role of the glutes and pelvic floor in stabilizing the SI joint?',
      'How do you treat a postpartum runner who wants to get back to the trails?',
      'What movement patterns most commonly stress the SI joint in active PNW patients?',
      'What do postpartum patients with SI joint pain usually get told — and what are they not getting that they need?',
    ],
  },

  'whiplash': {
    chronicRelevant: true,
    prototypes: ['reconnect'],
    patientProfile:
      'Auto accident patients, often dismissed or undertreated, arriving weeks or months after the initial injury. Many were told to rest and wait it out — and are now stuck in a cycle of chronic neck pain, headaches, and cognitive fog.',
    lifestyleStakes:
      'Chronic neck pain, headaches, and cognitive fog that have quietly derailed their work, workouts, and quality of life — and the frustration of an injury that "shouldn\'t still be this bad."',
    pnwAngles: [
      'Portland\'s rainy winters and congested bridges create higher rear-end collision rates — whiplash is a consistent referral source',
      'Many whiplash patients are told to rest and wait it out — and arrive at Move Better months later with entrenched dysfunction',
      'Cyclists who crash on wet roads present with both whiplash and other orthopedic injuries that need coordinated care',
    ],
    interviewTopics: [
      'What happens in the neck during a whiplash injury that makes it so easy to underestimate?',
      'Why do so many whiplash patients develop chronic symptoms when the acute injury seemed minor?',
      'What does the Move Better assessment reveal in a whiplash patient that standard X-rays miss?',
      'What does recovery look like for someone who has had symptoms for months vs. someone who comes in right after the accident?',
      'What do you tell the patient who was sent home with "nothing serious on imaging" and is still in pain three months later?',
    ],
  },

  'osteoarthritis': {
    chronicRelevant: true,
    prototypes: ['retain', 'reconnect'],
    patientProfile:
      'Aging active adults — the 55–70 hiker, cyclist, or runner who has been told their pain is "just arthritis" and to expect decline. They\'re often frustrated by the fatalism of their prior providers, and are looking for someone who will actually help them stay active rather than bench them.',
    lifestyleStakes:
      'Being told to stop doing the outdoor activities that have defined their identity for decades — and the prospect of a joint replacement they\'re not ready for. They want to keep hiking the Gorge, skiing Mt. Hood, and playing golf without being told age is the problem.',
    pnwAngles: [
      'Portland has a large and growing population of active adults in their 50s, 60s, and 70s who refuse to accept "just take it easy" as a care plan',
      'The PNW\'s aging outdoor community wants to keep hiking the Gorge and skiing Mt. Hood — and they\'re looking for providers who will help them, not bench them',
      'Many osteoarthritis patients arrive having been told by orthopedists that their only option is replacement surgery',
    ],
    interviewTopics: [
      'What does the research actually say about movement and cartilage health — and how is it different from what most patients are told?',
      'How do you treat an arthritic knee or hip in a 62-year-old who wants to keep hiking?',
      'What role does load management and movement quality play in reducing arthritic pain?',
      'What does success look like for an osteoarthritis patient — and how do you reframe their expectations in a positive direction?',
      'What do you say to the patient who\'s been told "your X-ray looks like a 90-year-old" and they\'re 58?',
    ],
  },

  // ── NEUROLOGICAL / NERVE ─────────────────────────────────────────────────
  'numbness and tingling': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'retain'],
    patientProfile:
      'Cyclists, desk workers, and anyone with nerve compression from the neck, thoracic outlet, elbow, or wrist. Often arrive after a Google rabbit hole convinced they have MS or a serious neurological condition — and relieved when the source turns out to be mechanical.',
    lifestyleStakes:
      'Pins and needles that make cycling uncomfortable, disrupt sleep, or create fear of a serious neurological condition. The anxiety around unknown nerve symptoms is often as debilitating as the symptoms themselves.',
    pnwAngles: [
      'Road cyclists gripping handlebars for hours compress the ulnar nerve at the wrist and elbow — a very common Portland presentation',
      'Remote tech workers with forward head posture develop cervical nerve root compression that radiates into the arms and hands',
      'Many patients come in convinced they have carpal tunnel when the source is actually the neck or thoracic outlet',
    ],
    interviewTopics: [
      'How do you trace numbness and tingling back to its true source — neck, thoracic outlet, elbow, or wrist?',
      'What red flags tell you this needs imaging or specialist referral vs. conservative care?',
      'How does bike fit contribute to upper extremity nerve symptoms in cyclists?',
      'What does nerve mobility work look like in practice?',
      'What do you tell a patient who has been Google-diagnosing themselves and is scared it\'s something serious?',
    ],
  },

  'vertigo': {
    chronicRelevant: false,
    prototypes: ['reconnect'],
    patientProfile:
      'Anyone experiencing dizziness, spinning sensations, or balance disturbances — often mismanaged or left untreated. Many have been to their GP, told it\'s an inner ear issue, and given no treatment beyond "wait it out."',
    lifestyleStakes:
      'Fear of falling on the trail, dizziness on the bike, or simply not feeling safe in their own body.',
    pnwAngles: [
      'Hikers who experience sudden vertigo on exposed trails — where balance failure has real consequences — are highly motivated to get treated',
      'Many PNW patients don\'t know that chiropractic care can effectively treat cervicogenic dizziness and BPPV',
      'Cyclists who get dizzy during or after rides often have a cervical spine component that\'s never been evaluated',
    ],
    interviewTopics: [
      'How do you determine whether dizziness is coming from the inner ear (BPPV) vs. the cervical spine?',
      'What does the Epley maneuver do, and when is it the right tool?',
      'What does cervicogenic dizziness look like and how is it treated with movement?',
      'What should a patient who\'s been dismissed with "inner ear issues" know about their options?',
    ],
  },

  // ── PREGNANCY & POSTPARTUM ────────────────────────────────────────────────
  'pregnancy pain': {
    chronicRelevant: false,
    prototypes: ['reconnect'],
    patientProfile:
      'Active pregnant women who want to stay mobile and comfortable through their pregnancy — and postpartum patients returning to activity. Many have been treated as fragile by their OB or told to "just do kegel exercises" for postpartum pain. They want someone who takes their symptoms seriously and has a real plan.',
    lifestyleStakes:
      'Staying active through pregnancy, recovering fully after birth, and not accepting pain as an inevitable part of having a baby. For postpartum patients: getting back to running, lifting, or the active life they had before — and being able to fully show up for their baby.',
    pnwAngles: [
      'Portland\'s active culture means many pregnant patients were trail running or cycling before pregnancy and want to stay as active as safely possible',
      'Postpartum women in the PNW are often returning to trail running, yoga, or cycling sooner than conventional guidance recommends — and need smart, individualized support',
      'SI joint pain, pubic symphysis dysfunction, and pelvic girdle pain are undertreated in the obstetric system — chiropractic fills that gap',
    ],
    interviewTopics: [
      'What are the most common musculoskeletal complaints you see in pregnant patients?',
      'How does the Move Better approach adapt during pregnancy — what\'s safe and what changes?',
      'What does postpartum return-to-activity look like and what are the movement milestones you work toward?',
      'What do most OBs miss when it comes to the musculoskeletal side of pregnancy and recovery?',
      'What do you tell the postpartum patient who was told to just do kegels and rest — but is still in pain three months later?',
    ],
  },

  // ── TENDONS ───────────────────────────────────────────────────────────────
  'achilles tendinitis': {
    chronicRelevant: true,
    prototypes: ['reconnect', 'excel'],
    patientProfile:
      'Runners ramping up mileage, hikers doing back-to-back days, and anyone returning to activity after a period of rest. Often the dedicated runner in their 30s–40s who has tried stretching, foam rolling, and rest — and is frustrated it keeps flaring up.',
    lifestyleStakes:
      'Missing race season, losing the morning run that anchors their day, or being unable to hike the trails they love.',
    pnwAngles: [
      'The Portland spring running season — runners returning after rainy winter indoor training — is peak Achilles tendinopathy season',
      'Hilly trail terrain in Forest Park and the Gorge places heavy eccentric load on the Achilles with every descent',
      'Many PNW runners try to push through Achilles pain until it becomes a chronic tendinopathy that takes months to resolve',
      'Waterlogged trail shoes with compromised heel counters are a contributing factor unique to Oregon\'s wet trails',
    ],
    interviewTopics: [
      'What\'s the difference between Achilles tendinitis and Achilles tendinopathy — and why does it matter for treatment?',
      'What does the research say about eccentric loading for the Achilles, and how do you apply it?',
      'How do you keep a runner running while the tendon heals?',
      'What calf and ankle mobility issues almost always accompany Achilles problems?',
      'Why does rest alone almost never solve Achilles tendinopathy — and what patients are surprised to hear instead?',
    ],
  },

  'it band syndrome': {
    chronicRelevant: false,
    prototypes: ['reconnect', 'excel'],
    patientProfile:
      'Trail runners and cyclists — especially those ramping mileage for a race or returning after a break. Almost always frustrated: they\'ve been told to foam roll their IT band, they\'ve been doing it religiously, and it\'s not helping.',
    lifestyleStakes:
      'DNS at Hood to Coast, dropping out of a gravel race, or being unable to run the Forest Park trails that are part of their daily rhythm.',
    pnwAngles: [
      'Portland\'s hilly terrain — Forest Park, the West Hills, Gorge trails — makes IT band syndrome almost inevitable for high-mileage trail runners',
      'The spring cycling season return sees a surge of cyclists with lateral knee pain from too much volume too fast',
      'Hood to Coast training cycles are a predictable driver — runners push weekly mileage too aggressively in August',
      'Many patients have been told to just stretch their IT band — and are frustrated when it hasn\'t worked after weeks of trying',
    ],
    interviewTopics: [
      'What is the IT band actually doing — and why is stretching it rarely the answer?',
      'What does IT band syndrome reveal about hip strength and running mechanics?',
      'What training load changes make the most immediate difference?',
      'How do you get someone back to trail running without losing too much fitness?',
      'What do you tell the patient who\'s been foam rolling their IT band every day and wondering why it\'s not working?',
    ],
  },

  // ── GENERAL / MOVEMENT ───────────────────────────────────────────────────
  'movement assessment': {
    chronicRelevant: false,
    prototypes: ['retain', 'excel'],
    patientProfile:
      'Athletes who want to prevent injury before it happens — proactive PNW types. Often the 35–50-year-old who has watched friends or teammates get hurt and wants to know what their movement weaknesses are before they become injuries.',
    lifestyleStakes:
      'Staying injury-free through another ski season, marathon cycle, or climbing season — and the confidence of knowing their body is built to last.',
    pnwAngles: [
      'Portland\'s active population is increasingly proactive — they want to know their movement weaknesses before they become injuries',
      'Seasonal sport transitions (cycling summer → skiing winter) create predictable injury windows that a movement screen can catch',
      'CrossFit and gym culture here means many patients have strength but poor movement quality — a dangerous combination',
    ],
    interviewTopics: [
      'What does Move Better\'s Movement Paradigm Scoring reveal that most patients are surprised by?',
      'What are the three most common movement faults you see in active PNW patients?',
      'How does a movement screen change the care plan compared to just treating the chief complaint?',
      'What\'s the one movement test every person should be able to pass?',
    ],
  },

  'sports performance': {
    chronicRelevant: false,
    prototypes: ['excel', 'retain'],
    patientProfile:
      'Competitive runners, cyclists, climbers, and triathletes looking for an edge. Also the motivated amateur — the 40-something who runs halfs and takes their training seriously — who wants to train harder without breaking down.',
    lifestyleStakes:
      'PR at Hood to Coast, podium at a gravel race, sending a hard climb at Smith Rock — and being able to keep doing this for decades, not just this season.',
    pnwAngles: [
      'The PNW has a deep endurance sports culture — Portland Marathon, RAMROD, Gorge Waterfalls 50K, Wildflower Triathlon',
      'Smith Rock State Park draws climbers from across the region — performance at altitude and on technical rock',
      'Mt. Hood year-round skiing creates a unique demand for ski-specific strength and conditioning',
    ],
    interviewTopics: [
      'How does chiropractic care fit into a competitive athlete\'s performance plan?',
      'What movement qualities separate athletes who stay injury-free from those who don\'t?',
      'What\'s the most overlooked performance limiter you see in endurance athletes?',
      'How do you balance pushing for performance vs. managing injury risk?',
    ],
  },
}

/**
 * Returns the most relevant PNW context for a given condition string.
 * Does a fuzzy keyword match against the database keys.
 */
export function getPNWContext(condition) {
  const lower = condition.toLowerCase()

  if (PNW_CONDITION_BANK[lower]) return PNW_CONDITION_BANK[lower]

  const keywordMap = {
    'back': 'lower back pain',
    'lumbar': 'lower back pain',
    'sciatica': 'sciatica',
    'disc': 'disc herniation',
    'herniat': 'disc herniation',
    'neck': 'neck pain',
    'cervical': 'neck pain',
    'shoulder': 'shoulder pain',
    'rotator': 'shoulder pain',
    'knee': 'knee pain',
    'it band': 'knee pain',
    'patell': 'knee pain',
    'hip': 'hip pain',
    'plantar': 'plantar fasciitis',
    'heel': 'plantar fasciitis',
    'ankle': 'ankle sprain',
    'headache': 'headaches',
    'migraine': 'headaches',
    'chronic': 'chronic pain',
    'fibromyalgia': 'fibromyalgia',
    'fibro': 'fibromyalgia',
    'persistent': 'chronic pain',
    'tennis elbow': 'tennis elbow',
    'lateral epicondyl': 'tennis elbow',
    'golfer': 'golfer\'s elbow',
    'medial epicondyl': 'golfer\'s elbow',
    'carpal': 'carpal tunnel',
    'wrist': 'carpal tunnel',
    'mid-back': 'mid-back pain',
    'thoracic': 'mid-back pain',
    'upper back': 'mid-back pain',
    'si joint': 'si joint pain',
    'sacroiliac': 'si joint pain',
    'whiplash': 'whiplash',
    'auto accident': 'whiplash',
    'car accident': 'whiplash',
    'osteoarthritis': 'osteoarthritis',
    'arthritis': 'osteoarthritis',
    'numb': 'numbness and tingling',
    'tingling': 'numbness and tingling',
    'nerve pain': 'numbness and tingling',
    'vertigo': 'vertigo',
    'dizziness': 'vertigo',
    'dizzy': 'vertigo',
    'pregnan': 'pregnancy pain',
    'postpartum': 'pregnancy pain',
    'achilles': 'achilles tendinitis',
    'it band': 'it band syndrome',
    'iliotibial': 'it band syndrome',
    'movement': 'movement assessment',
    'performance': 'sports performance',
    'athletic': 'sports performance',
    'sport': 'sports performance',
  }

  for (const [keyword, key] of Object.entries(keywordMap)) {
    if (lower.includes(keyword)) return PNW_CONDITION_BANK[key]
  }

  // Generic PNW fallback — no chronic angle assumed
  return {
    chronicRelevant: false,
    prototypes: ['reconnect', 'retain'],
    patientProfile:
      'Active Portland and Vancouver residents — trail runners, cyclists, climbers, hikers, desk workers — who want to stay active and avoid medication or surgery. Often 30–55, family-oriented, and have tried other providers without lasting relief.',
    lifestyleStakes:
      'Maintaining their outdoor lifestyle: hiking the Gorge, running Forest Park, skiing Mt. Hood, or simply keeping up with their kids — and not becoming a patient who just manages pain forever.',
    pnwAngles: [
      'Portland\'s active, health-conscious culture means patients have often tried everything before arriving',
      'The PNW patient wants to understand the WHY — they respond to education over prescription',
      'Seasonal outdoor activities create predictable injury patterns throughout the year',
      'Tech-worker culture means many patients sit for 8+ hours before and after their athletic pursuits',
    ],
    interviewTopics: [
      'What does this condition look like in an active PNW patient vs. a more sedentary patient?',
      'What lifestyle factors unique to the Pacific Northwest contribute to or worsen this condition?',
      'What does success look like — what activity do patients want to get back to?',
      'What makes the Move Better approach different from what patients have already tried?',
      'What do you tell the patient who has already seen other providers and hasn\'t found lasting relief?',
    ],
  }
}

/**
 * Formats PNW context into a string block for injection into a system prompt.
 * Includes a chronic pain angle only for conditions where it is clinically relevant.
 */
export function formatPNWContextForPrompt(condition) {
  const ctx = getPNWContext(condition)

  return `
PACIFIC NORTHWEST PATIENT CONTEXT — use this to shape your questions:
- Who walks through the door: ${ctx.patientProfile}
- What they're afraid of losing: ${ctx.lifestyleStakes}
- Regional angles that make content resonate with PNW patients:
${ctx.pnwAngles.map(a => `  • ${a}`).join('\n')}
- Key interview areas specific to this condition and audience:
${ctx.interviewTopics.map(q => `  • ${q}`).join('\n')}
${ctx.chronicRelevant ? `
CHRONIC VS. ACUTE ANGLE — explore this when it fits naturally:
${condition} often presents as a chronic, long-standing problem rather than a fresh injury. Where relevant, draw out:
  • How does treating someone with chronic ${condition} (months or years of pain) differ from an acute case?
  • Why do chronic ${condition} patients often exhaust conventional options (medication, injections, imaging) before finding lasting relief?
  • What does the Move Better root-cause, movement-first approach offer these patients?
  • What does recovery realistically look like — and how do you manage a patient's expectations when they've been hurting for a long time?
` : ''}`
}
