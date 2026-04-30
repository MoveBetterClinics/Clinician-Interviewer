/**
 * Pacific Northwest patient questionnaire database.
 *
 * Move Better serves Portland, OR and Vancouver, WA — a region defined by
 * trail runners, cyclists, hikers, skiers, kayakers, and tech desk workers.
 * Patients here tend to be active, health-conscious, skeptical of medication,
 * and highly motivated to maintain their outdoor lifestyle.
 *
 * Each entry contains:
 *   - patientProfile: who typically walks in with this condition
 *   - lifestyleStakes: what they're afraid of losing
 *   - pnwAngles: regional hooks that make content resonate locally
 *   - interviewTopics: specific areas to probe in the interview
 *   - chronicRelevant: true when this condition commonly presents as chronic
 *     or when the acute-vs-chronic distinction is clinically meaningful
 */

export const PNW_CONDITION_BANK = {
  // ── BACK & SPINE ─────────────────────────────────────────────────────────
  'lower back pain': {
    chronicRelevant: true,
    patientProfile:
      'Desk workers, hikers carrying heavy packs, cyclists in aggressive riding positions, and weekend warriors who overdo it on the trail.',
    lifestyleStakes:
      'Missing multi-day hikes on the Gorge, being unable to ski Mt. Hood or Mt. Bachelor, losing their morning run.',
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
    ],
  },

  'sciatica': {
    chronicRelevant: true,
    patientProfile:
      'Cyclists with tight piriformis, long-haul commuters, desk workers, and trail runners with hip imbalances.',
    lifestyleStakes:
      'Inability to sit comfortably on long drives to hiking trailheads, cycling tours, or even airplane seats to reach ski resorts.',
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
    ],
  },

  'disc herniation': {
    chronicRelevant: true,
    patientProfile:
      'Weightlifters, CrossFitters, and hikers who\'ve had one too many heavy pack days.',
    lifestyleStakes:
      'Fear of permanent damage, surgery, and losing their active identity entirely.',
    pnwAngles: [
      'How PNW hikers\' habit of descending steep trails with heavy packs loads discs asymmetrically',
      'The CrossFit and gym culture in Portland and how improper hip hinge mechanics contribute',
      'Why fear of movement after a herniation often causes more long-term damage than the disc itself',
    ],
    interviewTopics: [
      'What does the research actually say about disc herniations and their natural course?',
      'How do you rebuild a patient\'s confidence in movement after they\'ve been told their back is "broken"?',
      'What movement patterns are non-negotiable to restore before returning to hiking or lifting?',
    ],
  },

  // ── NECK & SHOULDERS ─────────────────────────────────────────────────────
  'neck pain': {
    chronicRelevant: true,
    patientProfile:
      'Remote tech workers, cyclists in aggressive riding positions, climbers, and paddlers.',
    lifestyleStakes:
      'Headaches ruining morning runs, inability to look left/right on bike descents, losing the ability to climb.',
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
    ],
  },

  'shoulder pain': {
    chronicRelevant: true,
    patientProfile:
      'Climbers, swimmers, paddlers, overhead athletes, and CrossFitters.',
    lifestyleStakes:
      'Losing climbing grades, being sidelined from kayaking season, giving up overhead lifts.',
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
    ],
  },

  // ── KNEES ─────────────────────────────────────────────────────────────────
  'knee pain': {
    chronicRelevant: true,
    patientProfile:
      'Trail runners, cyclists, skiers, hikers on steep descents, and aging athletes refusing to slow down.',
    lifestyleStakes:
      'Hood to Coast relay, RAMROD cycling event, ski season at Timberline, and everyday stairs.',
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
    ],
  },

  // ── HIPS ─────────────────────────────────────────────────────────────────
  'hip pain': {
    chronicRelevant: true,
    patientProfile:
      'Cyclists, runners, desk workers, and aging active adults.',
    lifestyleStakes:
      'Losing the ability to run, hike, or cycle — the activities that define the PNW lifestyle.',
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
    ],
  },

  // ── FOOT & ANKLE ─────────────────────────────────────────────────────────
  'plantar fasciitis': {
    chronicRelevant: true,
    patientProfile:
      'Runners increasing mileage for spring races, hikers returning to the trail after winter, and people who stand all day.',
    lifestyleStakes:
      'Missing the Eugene Marathon, Portland Marathon, or their first-morning steps on a backpacking trip.',
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
    ],
  },

  'ankle sprain': {
    chronicRelevant: false,
    patientProfile:
      'Trail runners on technical terrain, basketball players, and hikers on rooty PNW trails.',
    lifestyleStakes:
      'Fear of chronic instability — rolling the ankle on every hike or run.',
    pnwAngles: [
      'Technical trails in the Columbia River Gorge and Forest Park create high ankle sprain risk even for experienced runners',
      'Many PNW patients treat their own sprains with ice and rest — and never address the underlying instability',
      'Trail running on wet roots (a constant in Oregon) demands exceptional ankle proprioception',
    ],
    interviewTopics: [
      'Why do so many ankle sprains become chronic instability problems?',
      'What proprioception work is most important for getting back on technical trail terrain?',
      'How long does it actually take to fully rehabilitate an ankle sprain vs. what patients expect?',
    ],
  },

  // ── HEAD & NEUROLOGICAL ──────────────────────────────────────────────────
  'headaches': {
    chronicRelevant: true,
    patientProfile:
      'Tech workers, cyclists, and anyone dealing with chronic tension and screen time.',
    lifestyleStakes:
      'Headaches ruining weekends, making trail runs miserable, or interfering with work.',
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
    ],
  },

  // ── CHRONIC PAIN ─────────────────────────────────────────────────────────
  'chronic pain': {
    chronicRelevant: true,
    patientProfile:
      'Patients who have been in pain for months or years — often told by other providers that nothing more can be done. They\'ve tried medication, injections, or surgery with limited relief. Many are active PNW adults whose quality of life has quietly shrunk around their pain.',
    lifestyleStakes:
      'Getting their life back — not just reducing pain but returning to hiking, sleeping through the night, playing with grandkids, and feeling like themselves again.',
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
      'What does a realistic recovery timeline look like — and how do you manage expectations?',
      'Can you share what a chronic pain success story looks like at Move Better?',
    ],
  },

  'fibromyalgia': {
    chronicRelevant: true,
    patientProfile:
      'Predominantly women, often dismissed by prior providers. Active adults who have watched their world shrink as pain made everyday activities feel impossible.',
    lifestyleStakes:
      'Being believed, being understood, and finding any path back to the life they had before.',
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
    ],
  },

  // ── GENERAL / MOVEMENT ───────────────────────────────────────────────────
  'movement assessment': {
    chronicRelevant: false,
    patientProfile:
      'Athletes who want to prevent injury before it happens — proactive PNW types.',
    lifestyleStakes:
      'Staying injury-free through another ski season, marathon cycle, or climbing season.',
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
    patientProfile:
      'Competitive runners, cyclists, climbers, and triathletes looking for an edge.',
    lifestyleStakes:
      'PR at Hood to Coast, podium at a gravel race, sending a hard climb at Smith Rock.',
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
    patientProfile:
      'Active Portland and Vancouver residents — trail runners, cyclists, climbers, hikers, desk workers — who want to stay active and avoid medication or surgery.',
    lifestyleStakes:
      'Maintaining their outdoor lifestyle: hiking the Gorge, running Forest Park, skiing Mt. Hood, or simply keeping up with their kids.',
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
