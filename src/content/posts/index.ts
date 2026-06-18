/**
 * Registry of all blog articles. Each article is a file in this directory that
 * default-exports a BlogPost. Add a new article by importing it here and adding it
 * to the `all` array. Order in the array does not matter; helpers sort by date.
 */
import type { BlogPost } from '@/content/blog'

import doesIcbcCoverPhysiotherapy from './does-icbc-cover-physiotherapy'
import kneePainGoingUpStairs from './knee-pain-going-up-stairs'
import howLongDoesWhiplashTakeToHeal from './how-long-does-whiplash-take-to-heal'
import whatToDoAfterACarAccidentInBc from './what-to-do-after-a-car-accident-in-bc'
import icbcActiveRehabExplained from './icbc-active-rehab-explained'
import worksafebcPhysiotherapyHowItWorks from './worksafebc-physiotherapy-how-it-works'
import doYouNeedAReferralForPhysiotherapyInBc from './do-you-need-a-referral-for-physiotherapy-in-bc'
import physiotherapyVsChiropractorVsOsteopath from './physiotherapy-vs-chiropractor-vs-osteopath'
import whatToExpectAtYourFirstPhysiotherapyAppointment from './what-to-expect-at-your-first-physiotherapy-appointment'
import howMuchDoesPhysiotherapyCostInWestVancouver from './how-much-does-physiotherapy-cost-in-west-vancouver'
import lowerBackPainCausesAndTreatment from './lower-back-pain-causes-and-treatment'
import neckPainAndTensionHeadaches from './neck-pain-and-tension-headaches'
import sciaticaCausesAndWhatHelps from './sciatica-causes-and-what-helps'
import rotatorCuffVsFrozenShoulder from './rotator-cuff-vs-frozen-shoulder'
import recoveryAfterKneeReplacementSurgery from './recovery-after-knee-replacement-surgery'
import tennisElbowTreatmentAndRecovery from './tennis-elbow-treatment-and-recovery'
import returningToSportAfterInjury from './returning-to-sport-after-injury'
import fallPreventionAndBalanceForSeniors from './fall-prevention-and-balance-for-seniors'
import farsiSpeakingPhysiotherapyOnTheNorthShore from './farsi-speaking-physiotherapy-on-the-north-shore'

const all: BlogPost[] = [
  doesIcbcCoverPhysiotherapy,
  kneePainGoingUpStairs,
  howLongDoesWhiplashTakeToHeal,
  whatToDoAfterACarAccidentInBc,
  icbcActiveRehabExplained,
  worksafebcPhysiotherapyHowItWorks,
  doYouNeedAReferralForPhysiotherapyInBc,
  physiotherapyVsChiropractorVsOsteopath,
  whatToExpectAtYourFirstPhysiotherapyAppointment,
  howMuchDoesPhysiotherapyCostInWestVancouver,
  lowerBackPainCausesAndTreatment,
  neckPainAndTensionHeadaches,
  sciaticaCausesAndWhatHelps,
  rotatorCuffVsFrozenShoulder,
  recoveryAfterKneeReplacementSurgery,
  tennisElbowTreatmentAndRecovery,
  returningToSportAfterInjury,
  fallPreventionAndBalanceForSeniors,
  farsiSpeakingPhysiotherapyOnTheNorthShore,
]

// Newest first.
export const posts: BlogPost[] = [...all].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
)

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)

export const postsByCategory = () => {
  const map = new Map<string, BlogPost[]>()
  for (const p of posts) {
    const list = map.get(p.category) ?? []
    list.push(p)
    map.set(p.category, list)
  }
  return map
}

// Up to `limit` other posts, preferring the same category, for "related reading".
export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = postBySlug(slug)
  if (!current) return posts.slice(0, limit)
  const sameCat = posts.filter((p) => p.slug !== slug && p.category === current.category)
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCat, ...rest].slice(0, limit)
}
