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

// Cover images. The covers are a cohesive set of quiet, warm-stone material and
// light studies (no people, no text) — kept here rather than in each article file
// because they are a shared visual system, not article-authored content. On a
// Sanity migration each becomes the document's own `coverImage` asset.
const covers: Record<string, string> = {
  'does-icbc-cover-physiotherapy': '/blog-covers/plaster-steps.webp',
  'knee-pain-going-up-stairs': '/blog-covers/river-stones.webp',
  'how-long-does-whiplash-take-to-heal': '/blog-covers/still-water.webp',
  'what-to-do-after-a-car-accident-in-bc': '/blog-covers/plaster-stilllife.webp',
  'icbc-active-rehab-explained': '/blog-covers/travertine.webp',
  'worksafebc-physiotherapy-how-it-works': '/blog-covers/paper-fold.webp',
  'do-you-need-a-referral-for-physiotherapy-in-bc': '/blog-covers/light-shadow-wall.webp',
  'physiotherapy-vs-chiropractor-vs-osteopath': '/blog-covers/oak-grain.webp',
  'what-to-expect-at-your-first-physiotherapy-appointment': '/blog-covers/sheer-curtain.webp',
  'how-much-does-physiotherapy-cost-in-west-vancouver': '/blog-covers/ceramic-bowl.webp',
  'lower-back-pain-causes-and-treatment': '/blog-covers/clay-dune.webp',
  'neck-pain-and-tension-headaches': '/blog-covers/linen.webp',
  'sciatica-causes-and-what-helps': '/blog-covers/branch-shadow.webp',
  'rotator-cuff-vs-frozen-shoulder': '/blog-covers/pebble-linen.webp',
  'recovery-after-knee-replacement-surgery': '/blog-covers/wool-blanket.webp',
  'tennis-elbow-treatment-and-recovery': '/blog-covers/rattan.webp',
  'returning-to-sport-after-injury': '/blog-covers/ocean-fog.webp',
  'fall-prevention-and-balance-for-seniors': '/blog-covers/rolled-towels.webp',
  'farsi-speaking-physiotherapy-on-the-north-shore': '/blog-covers/eucalyptus-vase.webp',
}

// Newest first, with each article's cover image attached.
export const posts: BlogPost[] = [...all]
  .map((p) => ({ ...p, coverImage: p.coverImage ?? covers[p.slug] }))
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

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
