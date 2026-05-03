import { brand } from './brand'

export const CAMPAIGN_MODES = {
  bookings: {
    label: 'Drive Online Bookings',
    description: `All content drives prospective ${brand.prompt.audienceTerm} to book a visit at ${brand.name}.`,
    showNotes: false,
  },
  seminars: {
    label: 'Free Public Seminars',
    description: `Content promotes free community education events at the ${brand.prompt.venueDescriptor} — inviting the public in, not just selling appointments.`,
    showNotes: true,
    notesPlaceholder: 'Event details: date, time, location, topic, registration link…',
  },
  referrals: {
    label: 'Build Referral Network',
    description: `Content is framed for ${brand.prompt.referralAudienceShort} who can refer ${brand.prompt.audienceTerm} to ${brand.name}.`,
    showNotes: true,
    notesPlaceholder: 'Referral targets or messaging context (e.g. who you\'re trying to reach and why)…',
  },
}

export function getCampaignPromptContext(campaign) {
  if (!campaign || campaign.mode === 'bookings') return ''

  if (campaign.mode === 'seminars') {
    return `

CAMPAIGN FOCUS — FREE PUBLIC SEMINARS:
${brand.name} is hosting free educational seminars for the public in the ${brand.prompt.locationKeyword} area. This reflects a core value: sharing clinical knowledge openly with the community, not just selling appointments. All CTAs in this content must invite readers to attend the upcoming free seminar — not simply book a one-on-one visit.
${campaign.notes ? `Event details: ${campaign.notes}` : 'Reference "our upcoming free seminar" — specific event details will be added separately.'}
CTA language to use: "Join us for a free seminar", "Attend our free community talk", "Reserve your spot — it's free and open to everyone", "This event is free and open to the public"
Tone: lean into education and community generosity. ${brand.name} is giving something valuable away.`
  }

  if (campaign.mode === 'referrals') {
    return `

CAMPAIGN FOCUS — REFERRAL NETWORK:
${brand.name} is currently building relationships with ${brand.prompt.referralPartnersDescription}. Frame content with a professional, peer-to-peer voice — ${brand.prompt.referralAudienceShort} talking to one another.
${campaign.notes ? `Context: ${campaign.notes}` : ''}
CTA language to use: "${brand.prompt.referralCtaVerb} ${brand.name}", "Connect with our team", "We'd love to collaborate", "Happy to be a resource for your ${brand.prompt.audienceTerm}"
Tone: authoritative and collegial — professionals talking to professionals.`
  }

  return ''
}
