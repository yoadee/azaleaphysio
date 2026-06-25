// Azalea Google Ads build generator.
// Emits Google Ads Editor import CSVs + validates character limits.
// Run: node gen-ads.mjs   (outputs into ./out)
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = 'https://azaleaphysio.com'

// ---- reusable description pool (<=90 chars each) ----
const D = {
  noReferral: 'No referral needed in BC. Book directly and start treatment at your first visit.',
  directBill: 'We direct bill ICBC, WorkSafeBC and most extended health plans. Less to pay upfront.',
  hours: 'Open until 7pm and Saturdays, with two West Vancouver clinics. Book online in minutes.',
  cause: 'We find the cause, not just the symptom, so relief lasts past the appointment.',
  farsiTeam: 'English and Farsi speaking team. Same-week appointments across two clinics.',
  multi: 'Physiotherapy, massage, acupuncture and more under one roof in West Vancouver.',
  icbcStart: 'Injured in a car accident? We direct bill ICBC and can treat you the same week.',
  icbc25: 'ICBC pre-approves up to 25 physio visits in 12 weeks. No referral needed to start.',
  icbcCalm: 'Bring your claim number and we handle the billing. You focus on getting better.',
  icbcZero: 'ICBC injury? Treatment is $0 out of pocket. We bill ICBC directly, no referral.',
  wsbc: 'Hurt at work? We are a WorkSafeBC provider and bill them directly for your care.',
  wsbcRtw: 'Recovery built around getting you safely back to work, at a pace that holds.',
  backpain: 'Back or neck pain that will not settle? We treat what is driving it, not just the ache.',
  sciatica: 'Sciatic pain down the leg? We trace it to the source and build a plan to settle it.',
  knee: 'Knee pain on stairs or after sport? We assess the whole leg, not just the joint.',
  shoulder: 'Shoulder pain or stiffness? We diagnose the cause and rebuild the movement.',
  sports: 'Sprain, strain or tear? We treat the injury then rebuild strength for a safe return.',
  massage: 'Registered massage therapy for tension and pain. Direct billing to most plans.',
  acu: 'Registered acupuncture for pain, tension and headaches. Often paired with physio.',
  chiro: 'Chiropractic care for back, neck and joint pain. Coordinated with physio in one plan.',
  kin: 'Active rehab to rebuild strength after injury. ICBC active rehab billed direct.',
  persian: 'Farsi and English speaking physiotherapy in West Vancouver. We direct bill ICBC.',
  persianZero: 'Farsi-speaking physio in West Vancouver. ICBC injuries billed direct, $0 to you.',
  ot: 'Occupational therapy to get you back to work and daily life. ICBC & WSBC billed.',
  branded: 'Book your visit at Azalea Physiotherapy, West Vancouver. Two clinics, open until 7pm.',
  golf: 'Golf injury or lost distance? Performance physio minutes from the North Shore.',
  ski: 'Ski or snowboard injury? Get assessed and back on the mountain with a staged plan.',
}

// ---- reusable headline pools (<=30 chars each) ----
const H = {
  // Shared assurance headlines appended to most ad groups. NOTE: the cause/symptom
  // line lives only in ad groups that don't already carry "Treat the Cause of Pain"
  // (added explicitly where wanted) so the two never stack and waste an RSA slot.
  assur: [
    'No Referral Needed in BC',
    'Open Until 7pm & Saturdays',
    'Same-Week Appointments',
    'English & Farsi Speaking',
    'Two West Vancouver Clinics',
    'Book Online in Minutes',
    'Rated 4.6 on Google',
  ],
}

// helper to assemble 15-cap headline list, de-duped, trimmed
const mk = (...arrs) => {
  const seen = new Set(); const out = []
  for (const a of arrs) for (const h of a) { if (!seen.has(h)) { seen.add(h); out.push(h) } }
  return out.slice(0, 15)
}

// ================= CAMPAIGN STRUCTURE =================
// Each campaign: `budget` = LAUNCH daily CAD (Tier-1 $200/mo state), `start` = launch status,
// `target` = daily budget at full rollout (documented in strategy doc). Paused campaigns are
// fully built and upload ready-to-enable.
const campaigns = [
  {
    name: 'AZ | 1 ICBC & Car Accident',
    budget: 3.5, start: 'Enabled', target: 12, tier: 1, maxCpc: 20, // daily CAD
    adGroups: [
      {
        name: 'ICBC Physiotherapy', url: `${BASE}/icbc`, p1: 'icbc', p2: 'physio',
        keywords: [
          ['icbc physiotherapy west vancouver','Phrase'],['icbc physio north vancouver','Phrase'],
          ['icbc physiotherapy','Phrase'],['icbc physio near me','Phrase'],
          ['icbc active rehab north shore','Phrase'],['icbc physiotherapy','Exact'],
        ],
        headlines: mk([
          'ICBC Physio West Vancouver','ICBC: $0 Out of Pocket','ICBC Physiotherapy Clinic',
          'Direct Billing to ICBC','No Referral, We Bill ICBC','Up to 25 Visits Covered',
          'Start Active Rehab Now','Same-Week ICBC Appointments','We Handle the ICBC Billing',
          'West Vancouver Physio Team',
        ], H.assur),
        descriptions: [D.icbcZero, D.icbc25, D.multi, D.farsiTeam],
      },
      {
        name: 'Car Accident & Whiplash', url: `${BASE}/icbc`, p1: 'icbc', p2: 'car-accident',
        keywords: [
          ['car accident physio west vancouver','Phrase'],['car accident physiotherapy','Phrase'],
          ['whiplash treatment north vancouver','Phrase'],['whiplash physio','Phrase'],
          ['icbc car accident rehab','Phrase'],
        ],
        headlines: mk([
          'Car Accident? Start Today','Car Accident? $0 to You','Whiplash Treatment Clinic',
          'ICBC Car Accident Physio','We Direct Bill ICBC','No Referral to Begin',
          'Treat Whiplash Properly','Same-Week Appointments','Start Recovery This Week',
        ], H.assur),
        descriptions: [D.icbcStart, D.icbcZero, D.cause, D.hours],
      },
      {
        name: 'ICBC Direct Billing', url: `${BASE}/icbc`, p1: 'icbc', p2: 'direct-billing',
        keywords: [
          ['icbc physiotherapy direct billing','Phrase'],['icbc direct billing physio','Phrase'],
          ['physio that bills icbc','Phrase'],['direct billing icbc west vancouver','Phrase'],
          ['direct billing physiotherapy west vancouver','Phrase'],['direct billing physio north vancouver','Phrase'],
        ],
        headlines: mk([
          'ICBC Direct Billing Physio','$0 Out of Pocket on ICBC','We Bill ICBC Directly',
          'Nothing to Pay Upfront','No Referral, We Bill ICBC','Up to 25 Visits Covered',
          'Bring Your Claim Number','Same-Week Appointments','West Vancouver Physio Team',
        ], H.assur),
        descriptions: [D.icbcCalm, D.icbcZero, D.directBill, D.hours],
      },
    ],
  },
  {
    name: 'AZ | 2 WorkSafeBC',
    budget: 3, start: 'Paused', target: 5, tier: 2, maxCpc: 16,
    adGroups: [
      {
        name: 'WorkSafeBC Physio', url: `${BASE}/worksafebc`, p1: 'worksafebc', p2: 'physio',
        keywords: [
          ['worksafebc physiotherapy west vancouver','Phrase'],['worksafebc physio north vancouver','Phrase'],
          ['workplace injury physio north shore','Phrase'],['wcb physiotherapy','Phrase'],
          ['worksafebc physiotherapy','Exact'],
        ],
        headlines: mk([
          'WorkSafeBC Physiotherapy','Hurt at Work? We Can Help','We Bill WorkSafeBC Direct',
          'WorkSafeBC Provider','Return to Work Safely','No Referral to Start',
          'Start Recovery This Week','West Vancouver Physio Team',
        ], H.assur),
        descriptions: [D.wsbc, D.wsbcRtw, D.multi, D.hours],
      },
    ],
  },
  {
    name: 'AZ | 3 Core Physiotherapy',
    budget: 8, start: 'Paused', target: 14, tier: 3, maxCpc: 14,
    adGroups: [
      {
        name: 'Physiotherapy West Vancouver', url: `${BASE}/services/physiotherapy`, p1: 'physiotherapy', p2: 'west-van',
        keywords: [
          ['physiotherapy west vancouver','Phrase'],['physio west vancouver','Phrase'],
          ['physiotherapist west vancouver','Phrase'],['physiotherapy west vancouver','Exact'],
          ['best physiotherapy west vancouver','Phrase'],
        ],
        headlines: mk([
          'Physiotherapy West Vancouver','Physio in West Vancouver','Treat the Cause of Pain',
          'Registered Physiotherapists','Same-Day Treatment','Two West Vancouver Clinics',
          'Direct Billing Available',
        ], H.assur),
        descriptions: [D.cause, D.noReferral, D.directBill, D.hours],
      },
      {
        name: 'Physiotherapy North Vancouver', url: `${BASE}/services/physiotherapy`, p1: 'physiotherapy', p2: 'north-shore',
        keywords: [
          ['physiotherapy north vancouver','Phrase'],['physio north vancouver','Phrase'],
          ['physiotherapist north shore','Phrase'],['physiotherapy north shore','Phrase'],
        ],
        headlines: mk([
          'North Shore Physiotherapy','Physio Near North Vancouver','Treat the Cause of Pain',
          'Registered Physiotherapists','Same-Day Treatment','Direct Billing Available',
        ], H.assur),
        descriptions: [D.cause, D.noReferral, D.directBill, D.hours],
      },
      {
        name: 'Physio Near Me', url: `${BASE}/services/physiotherapy`, p1: 'physiotherapy', p2: 'book',
        keywords: [
          ['physiotherapist near me','Phrase'],['physio near me','Phrase'],
          ['physiotherapy clinic near me','Phrase'],['physio clinic near me','Phrase'],
          ['saturday physiotherapy north vancouver','Phrase'],['same day physiotherapy','Phrase'],
        ],
        headlines: mk([
          'Physiotherapy Near You','Physio Clinic Nearby','Same-Week Appointments',
          'Treat the Cause of Pain','Two West Vancouver Clinics','Direct Billing Available',
          'Open Until 7pm & Saturdays',
        ], H.assur),
        descriptions: [D.cause, D.hours, D.noReferral, D.directBill],
      },
    ],
  },
  {
    name: 'AZ | 4 Conditions',
    budget: 6, start: 'Paused', target: 10, tier: 2, maxCpc: 12,
    adGroups: [
      {
        name: 'Back & Neck Pain', url: `${BASE}/conditions/back-neck-pain`, p1: 'back-pain', p2: 'west-van',
        keywords: [
          ['back pain physio north vancouver','Phrase'],['back pain physiotherapy west vancouver','Phrase'],
          ['neck pain treatment west vancouver','Phrase'],['lower back pain physio','Phrase'],
        ],
        headlines: mk([
          'Back & Neck Pain Relief','Back Pain Physiotherapy','Treat the Cause of Pain',
          'Lasting Relief, Not a Patch','Neck Pain Treatment','Same-Week Appointments',
          'West Vancouver Physio Team',
        ], H.assur),
        descriptions: [D.backpain, D.cause, D.noReferral, D.directBill],
      },
      {
        name: 'Sciatica', url: `${BASE}/conditions/sciatica`, p1: 'sciatica', p2: 'west-van',
        keywords: [
          ['sciatica treatment west vancouver','Phrase'],['sciatica physio north vancouver','Phrase'],
          ['sciatica pain relief','Phrase'],['sciatic nerve pain treatment','Phrase'],
        ],
        headlines: mk([
          'Sciatica Treatment Clinic','Sciatica Pain Relief','Settle the Pain at Source',
          'Treat the Cause of Pain','Physio for Sciatica','Same-Week Appointments',
          'West Vancouver Physio Team',
        ], H.assur),
        descriptions: [D.sciatica, D.cause, D.noReferral, D.directBill],
      },
      {
        name: 'Knee Pain', url: `${BASE}/conditions/knee-pain`, p1: 'knee-pain', p2: 'west-van',
        keywords: [
          ['knee pain physiotherapy north shore','Phrase'],['knee pain physio west vancouver','Phrase'],
          ['knee injury physiotherapy','Phrase'],['knee pain treatment','Phrase'],
        ],
        headlines: mk([
          'Knee Pain Physiotherapy','Knee Pain Treatment','Back to the Stairs Pain-Free',
          'Treat the Cause of Pain','Physio for Knee Injuries','Same-Week Appointments',
          'West Vancouver Physio Team',
        ], H.assur),
        descriptions: [D.knee, D.cause, D.noReferral, D.directBill],
      },
      {
        name: 'Shoulder Pain', url: `${BASE}/conditions/shoulder-injuries`, p1: 'shoulder', p2: 'west-van',
        keywords: [
          ['shoulder injury physio vancouver','Phrase'],['shoulder pain physiotherapy','Phrase'],
          ['rotator cuff physio','Phrase'],['frozen shoulder treatment','Phrase'],
        ],
        headlines: mk([
          'Shoulder Pain Physiotherapy','Shoulder Injury Treatment','Rebuild the Movement',
          'Treat the Cause of Pain','Rotator Cuff & Frozen Shoulder','Same-Week Appointments',
          'West Vancouver Physio Team',
        ], H.assur),
        descriptions: [D.shoulder, D.cause, D.noReferral, D.directBill],
      },
      {
        name: 'Sports Injury', url: `${BASE}/services/sports-injury`, p1: 'sports-injury', p2: 'west-van',
        keywords: [
          ['sports injury clinic north vancouver','Phrase'],['sports physio west vancouver','Phrase'],
          ['sports injury physiotherapy','Phrase'],['sports injury clinic','Phrase'],
        ],
        headlines: mk([
          'Sports Injury Physio','Sports Injury Clinic','Safe Return to Your Sport',
          'Treat Then Rebuild Strength','West Vancouver Sports Physio','Same-Week Appointments',
          'Treat the Cause Not Symptom',
        ], H.assur),
        descriptions: [D.sports, D.cause, D.noReferral, D.hours],
      },
    ],
  },
  {
    name: 'AZ | 5 Other Services',
    budget: 6, start: 'Paused', target: 9, tier: 3, maxCpc: 9,
    adGroups: [
      {
        name: 'Massage Therapy RMT', url: `${BASE}/services/massage-therapy`, p1: 'massage', p2: 'west-van',
        keywords: [
          ['massage therapy west vancouver','Phrase'],['registered massage therapist west vancouver','Phrase'],
          ['rmt west vancouver','Phrase'],['deep tissue massage west vancouver','Phrase'],
        ],
        headlines: mk([
          'Massage Therapy West Van','Registered Massage (RMT)','RMT in West Vancouver',
          'Relief for Tension & Pain','30, 45, 60 & 90 Min','Direct Billing Available',
          'Same-Week Appointments',
        ], H.assur),
        descriptions: [D.massage, D.multi, D.noReferral, D.hours],
      },
      {
        name: 'Acupuncture', url: `${BASE}/services/acupuncture`, p1: 'acupuncture', p2: 'west-van',
        keywords: [
          ['acupuncture west vancouver','Phrase'],['acupuncturist west vancouver','Phrase'],
          ['acupuncture north vancouver','Phrase'],['dry needling west vancouver','Phrase'],
        ],
        headlines: mk([
          'Acupuncture West Vancouver','Registered Acupuncture','Relief for Pain & Tension',
          'IMS & Dry Needling','Paired With Physio','Direct Billing Available',
          'Same-Week Appointments',
        ], H.assur),
        descriptions: [D.acu, D.multi, D.noReferral, D.hours],
      },
      {
        name: 'Chiropractic', url: `${BASE}/services/chiropractic`, p1: 'chiropractic', p2: 'west-van',
        keywords: [
          ['chiropractor west vancouver','Phrase'],['chiropractic west vancouver','Phrase'],
          ['chiropractor north shore','Phrase'],['back pain chiropractor','Phrase'],
        ],
        headlines: mk([
          'Chiropractor West Vancouver','Chiropractic Care','Relief for Back & Neck',
          'Coordinated With Physio','Treat the Cause of Pain','Direct Billing Available',
          'Same-Week Appointments',
        ], H.assur),
        descriptions: [D.chiro, D.multi, D.noReferral, D.hours],
      },
      {
        name: 'Kinesiology', url: `${BASE}/services/kinesiology`, p1: 'kinesiology', p2: 'active-rehab',
        keywords: [
          ['kinesiology north vancouver','Phrase'],['active rehab west vancouver','Phrase'],
          ['kinesiologist west vancouver','Phrase'],['icbc active rehab','Phrase'],
        ],
        headlines: mk([
          'Kinesiology & Active Rehab','Supervised Active Rehab','Rebuild Strength Safely',
          'ICBC Active Rehab','Picks Up Where Physio Ends','Direct Billing Available',
          'Same-Week Appointments',
        ], H.assur),
        descriptions: [D.kin, D.multi, D.noReferral, D.hours],
      },
      {
        name: 'Occupational Therapy', url: `${BASE}/services/occupational-therapy`, p1: 'occupational', p2: 'therapy',
        keywords: [
          ['occupational therapy north vancouver','Phrase'],['occupational therapist west vancouver','Phrase'],
          ['occupational therapy west vancouver','Phrase'],['return to work therapy','Phrase'],
        ],
        headlines: mk([
          'Occupational Therapy','OT in West Vancouver','Back to Work & Daily Life',
          'ICBC & WorkSafeBC Billed','Return-to-Work Focused','Direct Billing Available',
          'Same-Week Appointments',
        ], H.assur),
        descriptions: [D.ot, D.multi, D.noReferral, D.hours],
      },
    ],
  },
  {
    name: 'AZ | 6 Farsi & Persian',
    budget: 2, start: 'Enabled', target: 4, tier: 1, maxCpc: 6,
    adGroups: [
      {
        name: 'Persian Physio (English)', url: `${BASE}/fa`, p1: 'farsi', p2: 'physio',
        keywords: [
          ['persian physiotherapist vancouver','Phrase'],['farsi speaking physio north vancouver','Phrase'],
          ['iranian physiotherapist vancouver','Phrase'],['persian physio west vancouver','Phrase'],
          ['farsi physiotherapy','Broad'],
        ],
        headlines: mk([
          'Persian Physio West Van','Farsi-Speaking Physio','Persian Physio, ICBC Billed',
          'Iranian Physiotherapists','We Speak Farsi & English','ICBC: $0 Out of Pocket',
          'No Referral, Book Direct','Same-Week Appointments','West Vancouver Clinic',
        ], H.assur),
        descriptions: [D.persianZero, D.persian, D.farsiTeam, D.noReferral],
      },
      {
        name: 'Farsi Physio (Script)', url: `${BASE}/fa`, p1: 'farsi', p2: 'vancouver',
        farsi: true,
        keywords: [
          ['فیزیوتراپی ونکوور','Broad'],['فیزیوتراپی نورت ونکوور','Broad'],
          ['فیزیوتراپی فارسی زبان','Broad'],['فیزیوتراپی ونکوور غربی','Broad'],
        ],
        headlines: [
          'فیزیوتراپی در ونکوور غربی','فیزیوتراپیست فارسی‌زبان','کلینیک فیزیوتراپی آزالیا',
          'نوبت در همین هفته','بدون نیاز به ارجاع','تسویه مستقیم با ICBC',
          'تیم فارسی‌زبان و انگلیسی','باز تا ۷ عصر و شنبه‌ها','رزرو آنلاین نوبت',
          'دو کلینیک در ونکوور غربی',
        ],
        descriptions: [
          'فیزیوتراپی فارسی‌زبان در ونکوور غربی. تسویه مستقیم با ICBC و بیمه‌های مکمل.',
          'بدون نیاز به ارجاع، همین هفته نوبت بگیرید. تیم فارسی‌زبان و انگلیسی.',
          'علت درد را درمان می‌کنیم، نه فقط علامت آن. باز تا ۷ عصر و شنبه‌ها.',
          'دو کلینیک در ونکوور غربی. رزرو آنلاین در چند دقیقه.',
        ],
      },
    ],
  },
  {
    name: 'AZ | 7 Branded',
    budget: 1, start: 'Enabled', target: 2, tier: 1, maxCpc: 3,
    adGroups: [
      {
        name: 'Azalea Brand', url: `${BASE}/`, p1: 'west-vancouver', p2: 'book',
        keywords: [
          ['azalea physiotherapy','Phrase'],['azalea physio west vancouver','Phrase'],
          ['azalea physiotherapy clinic','Phrase'],['azalea physio','Exact'],
          ['mary ghoroghi physiotherapy','Phrase'],
        ],
        headlines: mk([
          'Azalea Physiotherapy','Azalea Physio West Van','Book Your Visit Online',
          'Two West Vancouver Clinics','Open Until 7pm & Saturdays','Direct Billing Available',
          'English & Farsi Speaking',
        ], ['Rated 4.6 on Google','Find the Cause Not the Symptom']),
        descriptions: [D.branded, D.cause, D.directBill, D.farsiTeam],
      },
    ],
  },
  {
    name: 'AZ | 8 Seasonal Sport',
    budget: 4, start: 'Paused', target: 5, tier: 4, maxCpc: 10,
    adGroups: [
      {
        name: 'Golf Injury', url: `${BASE}/conditions/golf-injury`, p1: 'golf-injury', p2: 'west-van',
        keywords: [
          ['golf injury physio west vancouver','Phrase'],['golf performance physiotherapy vancouver','Phrase'],
          ['golf injury treatment','Phrase'],
        ],
        headlines: mk([
          'Golf Injury Physiotherapy','Golf Performance Physio','Back to Your Best Swing',
          'Treat the Cause of Pain','West Vancouver Golf Physio','Same-Week Appointments',
        ], H.assur),
        descriptions: [D.golf, D.cause, D.noReferral, D.hours],
      },
      {
        name: 'Ski & Snowboard Injury', url: `${BASE}/conditions/ski-snowboard-injury`, p1: 'ski-injury', p2: 'north-shore',
        keywords: [
          ['ski injury physiotherapy west vancouver','Phrase'],['snowboard injury rehab north shore','Phrase'],
          ['ski injury treatment','Phrase'],
        ],
        headlines: mk([
          'Ski & Snowboard Injury','Ski Injury Physiotherapy','Back on the Mountain',
          'Treat the Cause of Pain','Minutes From Cypress','Same-Week Appointments',
        ], H.assur),
        descriptions: [D.ski, D.cause, D.noReferral, D.hours],
      },
    ],
  },
]

// ================= ACCOUNT-LEVEL NEGATIVES =================
const negatives = [
  // job / education / DIY / bargain
  'free','cheap','jobs','job','careers','career','hiring','salary','wage','resume','cv',
  'course','courses','class','classes','school','schools','college','university','training',
  'certification','certificate','diploma','degree','student','students','exam','npte',
  'assistant','pta','aide','volunteer','internship','practicum','recruiter',
  'diy','exercises','stretches','youtube','video','videos','pdf','definition','meaning',
  'what is','how to','wikipedia','reddit',
  // wrong service (services Azalea does not offer)
  'naturopath','naturopathic','dietitian','nutritionist','aesthetic','botox','filler','cosmetic',
  'prolotherapy','gla:d',
  // wrong audience / animals / public system
  'dog','pet','horse','veterinary','equine','free physiotherapy','government physiotherapy',
  // out-of-area geos (also enforced via location targeting)
  'downtown','kitsilano','burnaby','richmond','surrey','coquitlam','langley','victoria',
  'squamish','whistler','toronto','ontario',
]

// ================= ASSETS =================
const sitelinks = [
  ['Book Online','Reserve your visit in minutes','Open until 7pm and Saturdays',`${BASE}/book`],
  ['ICBC Direct Billing','Car accident? No referral needed','Up to 25 visits covered',`${BASE}/icbc`],
  ['WorkSafeBC Injuries','Hurt at work, we bill direct','Return-to-work focused care',`${BASE}/worksafebc`],
  ['Our Services','Physio, massage, acupuncture','One team, one coordinated plan',`${BASE}/services`],
  ['Pricing','Clear fees by service','Direct billing to most plans',`${BASE}/pricing`],
  ['Our Locations','16th Street and Ocean Walk','Two clinics in West Vancouver',`${BASE}/locations`],
  ['Meet the Team','Registered, experienced team','English and Farsi speaking',`${BASE}/team`],
]
const callouts = [
  'No referral needed','Direct billing to ICBC','Open until 7pm','Open Saturdays',
  'Same-week appointments','English & Farsi speaking','Two West Van locations',
  'Multidisciplinary clinic','Book online or by phone','Rated 4.6 on Google',
]
const snippets = [
  ['Service catalog','Physiotherapy','Massage Therapy','Acupuncture','Chiropractic','Kinesiology','Occupational Therapy'],
  ['Insurance coverage','ICBC','WorkSafeBC','Pacific Blue Cross','Sun Life','Manulife','Canada Life'],
]

// ================= VALIDATION =================
const issues = []
const chk = (label, s, max) => { if ([...s].length > max) issues.push(`${label}: ${[...s].length}/${max} -> "${s}"`) }
for (const c of campaigns) for (const ag of c.adGroups) {
  ag.headlines.forEach((h,i)=>chk(`${c.name}>${ag.name} H${i+1}`, h, 30))
  ag.descriptions.forEach((d,i)=>chk(`${c.name}>${ag.name} D${i+1}`, d, 90))
  chk(`${c.name}>${ag.name} P1`, ag.p1, 15); chk(`${c.name}>${ag.name} P2`, ag.p2, 15)
  if (ag.headlines.length < 3) issues.push(`${c.name}>${ag.name}: only ${ag.headlines.length} headlines`)
  if (ag.descriptions.length < 2) issues.push(`${c.name}>${ag.name}: only ${ag.descriptions.length} descriptions`)
}
sitelinks.forEach((s,i)=>{chk(`Sitelink${i+1} text`,s[0],25);chk(`Sitelink${i+1} d1`,s[1],35);chk(`Sitelink${i+1} d2`,s[2],35)})
callouts.forEach((c,i)=>chk(`Callout${i+1}`,c,25))
snippets.forEach((s,i)=>s.slice(1).forEach((v,j)=>chk(`Snippet${i+1} v${j+1}`,v,25)))

// ================= CSV EMITTERS =================
const BOM='﻿'
const q = (v) => { v = (v??'').toString(); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v }
mkdirSync('out', { recursive: true })

// BUILD csv (campaigns + ad groups + keywords + RSAs in one Editor-importable file)
const cols = ['Campaign','Campaign Type','Campaign Status','Campaign Daily Budget','Bid Strategy Type',
  'Ad Group','Ad Group Status','Max CPC','Keyword','Match Type','Ad Status','Ad Type',
  ...Array.from({length:15},(_,i)=>`Headline ${i+1}`),
  ...Array.from({length:4},(_,i)=>`Description ${i+1}`),'Path 1','Path 2','Final URL']
const rows = [cols]
for (const c of campaigns) {
  const cStatus = c.start || 'Enabled'
  // campaign row
  rows.push([c.name,'Search',cStatus,c.budget,'Manual CPC', '','','','','','','', ...Array(19).fill(''),'','',''])
  for (const ag of c.adGroups) {
    rows.push([c.name,'','','','', ag.name,'Enabled',(c.maxCpc||1.5).toFixed(2),'','','','', ...Array(19).fill(''),'','',''])
    for (const [kw,mt] of ag.keywords) {
      rows.push([c.name,'','','','', ag.name,'','', kw, mt,'','', ...Array(19).fill(''),'','',''])
    }
    const hs = [...ag.headlines, ...Array(15).fill('')].slice(0,15)
    const ds = [...ag.descriptions, ...Array(4).fill('')].slice(0,4)
    rows.push([c.name,'','','','', ag.name,'','','','', 'Enabled','Responsive search ad', ...hs, ...ds, ag.p1, ag.p2, ag.url])
  }
}
writeFileSync('out/azalea-google-ads-BUILD.csv', BOM+rows.map(r=>r.map(q).join(',')).join('\r\n'),'utf8')

// NEGATIVES csv — paste-ready list for a shared negative keyword list (built in-UI:
// Tools > Shared library > Negative keyword lists > create "Azalea master negatives"
// > paste the terms below > apply to all campaigns). One term per line, broad-match
// negatives (broad negative blocks any query containing the term).
const negRows = [['Negative keyword (paste into a shared negative list, broad match)'],
  ...negatives.map(n=>[n])]
writeFileSync('out/azalea-google-ads-NEGATIVES.csv', BOM+negRows.map(r=>r.map(q).join(',')).join('\r\n'),'utf8')

// ASSETS csv (sitelinks + callouts + structured snippets)
const aRows = [['Asset type','Field 1','Field 2','Field 3','Field 4']]
aRows.push(['','','','',''])
aRows.push(['SITELINKS','Link text','Description 1','Description 2','Final URL'])
for (const s of sitelinks) aRows.push(['Sitelink',...s])
aRows.push(['','','','',''])
aRows.push(['CALLOUTS','Callout text','','',''])
for (const c of callouts) aRows.push(['Callout',c,'','',''])
aRows.push(['','','','',''])
aRows.push(['STRUCTURED SNIPPETS','Header','Values (comma separated)','',''])
for (const s of snippets) aRows.push(['Structured snippet', s[0], s.slice(1).join(', '),'',''])
writeFileSync('out/azalea-google-ads-ASSETS.csv', BOM+aRows.map(r=>r.map(q).join(',')).join('\r\n'),'utf8')

// ---- report ----
let totHeadlines=0, totKw=0, totAg=0
for (const c of campaigns) for (const ag of c.adGroups){totAg++;totHeadlines+=ag.headlines.length;totKw+=ag.keywords.length}
console.log(`Campaigns: ${campaigns.length} | Ad groups: ${totAg} | Keywords: ${totKw} | Headlines: ${totHeadlines}`)
console.log(`Negatives: ${negatives.length} | Sitelinks: ${sitelinks.length} | Callouts: ${callouts.length} | Snippet sets: ${snippets.length}`)
console.log(issues.length ? `\nVALIDATION ISSUES (${issues.length}):\n`+issues.join('\n') : '\nVALIDATION: all character limits OK')
