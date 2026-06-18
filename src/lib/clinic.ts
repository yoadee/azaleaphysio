/**
 * Canonical clinic content for the MVP.
 *
 * Pages currently read from this module so the site is fully functional without
 * manual CMS entry. The Sanity schemas in src/sanity/schemaTypes mirror these
 * shapes; once content is entered in the Studio, swap these reads for Sanity
 * queries (GROQ) of the same fields. Keep this file as the single source of
 * truth until that migration happens.
 */

export const SITE = {
  name: 'Azalea Physiotherapy',
  url: 'https://www.azaleaphysio.com',
  email: 'info@azaleaphysio.com',
  founded: '2011',
  googleRating: 4.6,
  reviewCount: '83',
  tagline: 'Multidisciplinary physiotherapy, rooted on the North Shore since 2011.',
  // Live ClinicMaster online booking portal (handles both locations + practitioner choice).
  booking: 'https://azaleaphysio.clinicmaster.com/landing?clinicId=1897&lang=en-CA',
  social: [
    'https://www.facebook.com/AzaleaPhysio/',
    'https://www.instagram.com/azaleaphysiowestvancouver/',
    'https://twitter.com/azaleaphysio',
  ],
}

export type Location = {
  slug: string
  name: string
  street: string
  city: string
  postal: string
  tel: string
  telLabel: string
  fax: string
  hours: { days: string; time: string }[]
  maps: string
  area: string
}

export const locations: Location[] = [
  {
    slug: '16th-street',
    name: '16th Street Clinic',
    street: 'Unit 207, 585 16th Street',
    city: 'West Vancouver, BC',
    postal: 'V7V 3R8',
    tel: '+16042813345',
    telLabel: '(604) 281-3345',
    fax: '(604) 281-3346',
    hours: [
      { days: 'Mon to Fri', time: '8am to 7pm' },
      { days: 'Saturday', time: '9am to 3pm' },
    ],
    maps: 'https://maps.google.com/?q=585+16th+Street+West+Vancouver+BC',
    area: 'Central West Vancouver',
  },
  {
    slug: 'ocean-walk',
    name: 'Ocean Walk Clinic',
    street: '1884 Marine Drive',
    city: 'West Vancouver, BC',
    postal: 'V6B 5C6',
    tel: '+16042813122',
    telLabel: '(604) 281-3122',
    fax: '(604) 281-3123',
    hours: [
      { days: 'Mon to Fri', time: '8:30am to 7pm' },
      { days: 'Saturday', time: '9am to 3pm' },
    ],
    maps: 'https://maps.google.com/?q=1884+Marine+Drive+West+Vancouver+BC',
    area: 'West side, Marine Drive',
  },
]

// Government claims billed directly (auto accident + workplace injury). Handled
// separately from extended health, and each has its own section on /insurance.
export const governmentBilling = ['ICBC', 'WorkSafeBC']

// Full extended-health and benefit-plan list we direct-bill (pulled from the
// clinic's billing network / Telus eClaims). Beyond these, a range of union and
// association benefit plans are also accepted.
export const insurers = [
  'Pacific Blue Cross',
  'Sun Life',
  'Manulife',
  'Canada Life',
  'Green Shield Canada',
  'Desjardins Insurance',
  'iA Financial Group',
  'Beneva',
  'Equitable Life of Canada',
  'ClaimSecure',
  'GMS',
  'Johnson',
  'Johnston Group',
  'Coughlin & Associates',
  'Cowan',
  'D.A. Townley',
  'First Canadian',
  'GroupHEALTH',
  'GroupSource',
  'Manion',
  'Maximum Benefit',
  'People Corporation',
  'RWAM',
  'Simply Benefits',
  'Union Benefits',
  'BPA',
  'CINUP',
  'Chambers of Commerce Group Insurance Plan',
  'Public Service Health Care Plan',
  'UV Insurance',
]

// Curated, recognizable subset for the compact home-page billing strip.
export const insurersFeatured = [
  'ICBC',
  'WorkSafeBC',
  'Pacific Blue Cross',
  'Sun Life',
  'Manulife',
  'Canada Life',
  'Green Shield Canada',
  'Desjardins',
  'Beneva',
]

// One step in the "Your first visit" sequence. Ordered, so it renders numbered
// and feeds HowTo JSON-LD.
export type ServiceStep = { name: string; text: string }

// A single practical fact in the "Good to know" rail (referral, billing, length).
export type ServiceFact = { label: string; value: string }

export type Service = {
  slug: string
  name: string
  excerpt: string
  whoThisHelps: string[]
  whatWeDo: string
  // Optional second paragraph that deepens "What we do" without bloating the lead.
  approach?: string
  // Ordered arc of a first appointment. Present on enriched services; absent ones
  // fall back gracefully (section simply does not render).
  firstVisit?: ServiceStep[]
  // Practical logistics rail. Falls back to defaultGoodToKnow when omitted.
  goodToKnow?: ServiceFact[]
  // Service-specific Q&A → FAQPage JSON-LD. Distinct from the global faqs array
  // used on /faq.
  faqs?: Faq[]
  // Explicit practitioner slugs for "Who you might see". When omitted, the page
  // falls back to a name/focus heuristic.
  practitioners?: string[]
  relatedConditions: string[]
}

// Shared logistics every service shares, derived from clinic facts. Services may
// override or extend via their own goodToKnow.
export const defaultGoodToKnow: ServiceFact[] = [
  { label: 'Referral', value: 'Not required in BC, book directly' },
  { label: 'Direct billing', value: 'ICBC, WorkSafeBC & most extended health' },
  { label: 'Availability', value: 'Usually same week, open until 7pm' },
  { label: 'Locations', value: '16th Street & Ocean Walk, West Vancouver' },
]

export const services: Service[] = [
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    excerpt: 'Physiotherapy in West Vancouver for back pain, joint injuries, and recovery after surgery, with no referral needed.',
    whoThisHelps: [
      'You are in pain after an injury, surgery, or accident and want it properly assessed, not just told to rest.',
      'A nagging ache in your back, neck, knee, or shoulder has been there longer than it should be.',
      'You are recovering from surgery and want a structured plan built around your timeline, not a generic one.',
      'You have a recurring problem and want to understand what is actually causing it.',
    ],
    whatWeDo: 'A registered physiotherapist assesses what is happening, not just where it hurts. Your plan covers both the immediate pain and the underlying cause, and adjusts as you progress. No referral needed, and no doctor’s note to chase first.',
    approach: 'Treatment is hands-on and active in equal measure. Manual therapy and targeted techniques settle the pain; a progressive exercise plan rebuilds the strength and movement that keep it from returning. Because the clinic is multidisciplinary, your physiotherapist can bring in acupuncture, kinesiology, or massage from the same building, working from the same notes, when your recovery calls for it.',
    firstVisit: [
      {
        name: 'A full history',
        text: 'Your physiotherapist starts with the whole picture, not just the sore spot: how the problem began, what makes it worse, what you need to get back to, and anything previous treatment missed.',
      },
      {
        name: 'A hands-on assessment',
        text: 'They examine how you move, test strength and range, and trace the pain to its source. The goal is a precise diagnosis, not a guess.',
      },
      {
        name: 'A plain explanation',
        text: 'You hear what is actually wrong in language that makes sense, with the why behind it. No jargon, no vague reassurance.',
      },
      {
        name: 'Treatment the same day',
        text: 'You begin treatment in the first session and leave with a clear plan: what to do at home, what to expect, and roughly how long recovery should take.',
      },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, assessment and treatment' },
      { label: 'Fees', value: 'Assessment $110 to $135, follow-ups from $90' },
      { label: 'Referral', value: 'Not required in BC, book directly' },
      { label: 'Direct billing', value: 'ICBC, WorkSafeBC & most extended health' },
    ],
    faqs: [
      {
        category: 'booking',
        q: 'Do I need a referral to see a physiotherapist in BC?',
        a: 'No. Physiotherapy in British Columbia does not require a doctor’s referral, so you can book with Azalea directly. Some extended health plans ask for a referral before they reimburse you, so it is worth checking your own policy.',
      },
      {
        category: 'treatment',
        q: 'What happens at my first visit?',
        a: 'A full assessment followed by same-day treatment. Your physiotherapist reviews your history, examines the injury, explains what they have found in plain language, and begins hands-on treatment. Plan for 45 to 60 minutes.',
      },
      {
        category: 'insurance',
        q: 'How much does physiotherapy cost?',
        a: 'An initial assessment runs roughly $110 to $135 and follow-ups roughly $90 to $110, depending on length and practitioner. Most extended health plans reimburse a significant share, and ICBC and WorkSafeBC visits are typically covered in full with nothing to pay upfront.',
      },
      {
        category: 'insurance',
        q: 'Can you treat my ICBC car accident claim?',
        a: 'Yes. Once you have an ICBC claim number you can start physiotherapy without an adjuster’s approval, and we bill ICBC directly. Bring your claim number and date of accident to your first visit.',
      },
      {
        category: 'treatment',
        q: 'How many sessions will I need?',
        a: 'It depends on the problem, and your physiotherapist will give you a realistic range after the first assessment. A simple strain may resolve in a few visits; post-surgical or long-standing issues take longer. The plan is to get you independent, not to keep you coming back.',
      },
    ],
    practitioners: ['mary-ghoroghi', 'braedan-lalor', 'noushin-nouri'],
    relatedConditions: ['back-neck-pain', 'knee-pain', 'shoulder-injuries', 'post-surgical-rehab'],
  },
  {
    slug: 'sports-injury',
    name: 'Sports Injury',
    excerpt: 'Sports injury physiotherapy in West Vancouver for sprains, strains, and a safe return to your sport.',
    whoThisHelps: [
      'You have sprained, strained, or torn something and want a clear path back to your sport.',
      'A recurring injury flares up every season and you want to understand why.',
      'You are training toward an event and something has started to hurt.',
      'You came back too soon last time and do not want to repeat it.',
      'You want more than rest and ice, you want to know when it is safe to load it again.',
    ],
    whatWeDo: 'We treat the injury, then rebuild the strength and movement that prevent the next one. Your physiotherapist assesses how you move under the demands of your sport, not just at rest, and builds the plan around your sport and your timeline. The goal is not just pain-free, it is ready to return with confidence.',
    approach: 'Recovery is staged. Early on we settle the pain and protect the injury with hands-on treatment; from there the work turns active, progressively loading the tissue so it holds up under a sprint, a cut, a lift, or a swing. Because the clinic is multidisciplinary, your physiotherapist can bring in kinesiology for supervised strength work or acupuncture for stubborn tension, all from the same building and the same plan.',
    firstVisit: [
      { name: 'The full story', text: 'Your physiotherapist asks how the injury happened, what your sport demands, and what returning actually looks like for you, whether that is a podium or a weekend hike.' },
      { name: 'A movement assessment', text: 'They test strength, range, and how you move under load, then trace the injury to its cause so the plan addresses why it happened, not just where it hurts.' },
      { name: 'A staged plan', text: 'You get a clear picture of the stages between now and return, what each one needs, and a realistic timeline. No vague rest it and see.' },
      { name: 'Treatment the same day', text: 'Hands-on treatment starts in the first session, and you leave knowing exactly what to do, what to avoid, and when to progress.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, assessment and treatment' },
      { label: 'Referral', value: 'Not required in BC, book directly' },
      { label: 'Direct billing', value: 'Extended health, WorkSafeBC & ICBC' },
      { label: 'Availability', value: 'Usually same week, open until 7pm' },
    ],
    faqs: [
      { category: 'booking', q: 'Do I need a referral for sports physiotherapy?', a: 'No. You can book directly in BC. If your extended health plan asks for a referral before it reimburses, check your own policy first.' },
      { category: 'treatment', q: 'When can I get back to my sport?', a: 'Your physiotherapist gives you a realistic timeline after the first assessment, based on the injury and your sport. The plan is built in stages so you return when the tissue can handle the load, not before, which is what prevents re-injury.' },
      { category: 'treatment', q: 'Should I rest it or keep moving?', a: 'It depends on the injury, and that is exactly what the assessment determines. For most sports injuries complete rest sets you back; the right kind of loading at the right time is what rebuilds it. We tell you which applies to you.' },
      { category: 'treatment', q: 'Do you treat my specific sport?', a: 'Yes. The principles of loading and recovery apply across sports, and the plan is tailored to the demands of yours, whether that is running, skiing, racquet sports, lifting, or a team sport.' },
      { category: 'insurance', q: 'How much does it cost?', a: 'An initial assessment runs roughly $110 to $135 and follow-ups roughly $90 to $110. Most extended health plans reimburse a significant share, and WorkSafeBC and ICBC visits are typically covered in full with nothing to pay upfront.' },
    ],
    practitioners: ['braedan-lalor', 'ali-shafiei'],
    relatedConditions: ['sports-injuries', 'knee-pain', 'shoulder-injuries'],
  },
  {
    slug: 'acupuncture',
    name: 'Acupuncture',
    excerpt: 'Acupuncture in West Vancouver for pain, tension, and recovery, offered alongside physiotherapy under one roof.',
    whoThisHelps: [
      'Persistent pain or muscle tension has not fully responded to other treatment.',
      'You get frequent tension headaches, a stiff neck, or a tight jaw.',
      'You want a drug-free option to add to your recovery plan.',
      'You are managing a long-standing issue and want to calm it between physiotherapy sessions.',
    ],
    whatWeDo: 'A registered acupuncturist places fine needles at specific points to ease pain, release muscle tension, and settle the nervous system. At Azalea it rarely works alone: we most often pair it with physiotherapy in the same plan, so the hands-on treatment and the needling reinforce each other and you progress faster than either would on its own.',
    approach: 'Treatment is calm and precise. Your acupuncturist works from an assessment of where the tension and pain actually sit, not a fixed template, and adjusts the points as you respond over a course of sessions. Because the clinic is multidisciplinary, your acupuncture can sit inside a broader plan with physiotherapy or massage, coordinated from the same notes rather than scattered across clinics.',
    firstVisit: [
      { name: 'A proper assessment', text: 'Your acupuncturist reviews your history and what you are dealing with, then examines where the pain and tension are coming from before any needling begins.' },
      { name: 'A clear explanation', text: 'You hear what they have found and how acupuncture is expected to help, in plain language, including how many sessions a problem like yours usually takes.' },
      { name: 'Treatment the same day', text: 'Fine needles are placed at the points that fit your assessment. Most people find it calming rather than painful, and many notice some relief within the first few visits.' },
      { name: 'A coordinated plan', text: 'If physiotherapy or massage would speed things up, your acupuncturist flags it, and the team builds one plan rather than sending you elsewhere.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, assessment and treatment' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Direct billing', value: 'Most extended health plans' },
      { label: 'Pairs with', value: 'Physiotherapy & massage, one plan' },
    ],
    faqs: [
      { category: 'treatment', q: 'Does acupuncture hurt?', a: 'Most people are surprised by how little they feel. The needles are very fine, far thinner than the ones used for injections, and many patients find the treatment calming. Any sensation is usually brief.' },
      { category: 'treatment', q: 'What does acupuncture help with?', a: 'We use it most for persistent pain, muscle tension, tension headaches, and stress-related tightness, often as part of a physiotherapy plan. Your acupuncturist will tell you honestly at the first visit whether it is likely to help your particular problem.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book acupuncture directly. Some extended health plans ask for a referral before they reimburse, so it is worth a quick check of your own policy.' },
      { category: 'insurance', q: 'Do you direct-bill acupuncture?', a: 'Yes, to most major extended health plans that include acupuncture coverage. You pay only the portion your plan does not cover, and our insurance page lists the providers we bill.' },
      { category: 'treatment', q: 'How many sessions will I need?', a: 'It varies with the problem, and your acupuncturist gives you a realistic range after the first visit. Some issues settle in a few sessions; longer-standing ones take a course of treatment. The aim is to resolve it, not to keep you booked indefinitely.' },
    ],
    practitioners: ['kambiz-navirian', 'ramin-keshmiri'],
    relatedConditions: ['headaches-jaw-pain', 'back-neck-pain', 'arthritis-joint-pain'],
  },
  {
    slug: 'occupational-therapy',
    name: 'Occupational Therapy',
    excerpt: 'Occupational therapy in West Vancouver to help you return to daily life, work, and independence after injury or illness.',
    whoThisHelps: [
      'An injury or condition is making everyday tasks at home or work hard or unsafe.',
      'You are recovering and need your home or routine adapted so you can manage on your own.',
      'You are navigating an ICBC or WorkSafeBC claim that turns on your daily function.',
      'You want to get back to the specific things your day requires, not a generic exercise sheet.',
    ],
    whatWeDo: 'An occupational therapist looks at how you actually manage day to day, then adapts the task, the tools, or the space so you can do it more safely and independently. The focus is practical and specific to your life: returning to work, getting through your morning, caring for your family, or living safely at home.',
    approach: 'We start from what you need to do, not from a textbook list of exercises. Your occupational therapist assesses the real demands of your day, identifies what is getting in the way, and changes the task or the environment so it works for your body as it is now. Because the clinic is multidisciplinary, this sits naturally alongside physiotherapy, with one team coordinating your recovery rather than separate clinics pulling in different directions.',
    firstVisit: [
      { name: 'A practical assessment', text: 'Your occupational therapist asks what your day actually requires and where it has become hard or unsafe, at home, at work, or both.' },
      { name: 'Finding the real barrier', text: 'They work out what is getting in the way, whether that is strength, movement, fatigue, or an environment that no longer fits.' },
      { name: 'A plan you can use', text: 'You leave with specific changes to the task, the tools, or the space, plus any retraining needed, all aimed at the things you need to get back to.' },
      { name: 'Coordinated with your recovery', text: 'If physiotherapy or other treatment would help, it is folded into one plan rather than sent to a separate clinic.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, assessment and plan' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Direct billing', value: 'ICBC, WorkSafeBC & most extended health' },
      { label: 'Focus', value: 'Daily function at home and work' },
    ],
    faqs: [
      { category: 'treatment', q: 'What does an occupational therapist do?', a: 'An occupational therapist helps you return to the everyday activities an injury or condition has made difficult, by retraining the activity and adapting your tools or environment. Where a physiotherapist rebuilds the body, an occupational therapist rebuilds your ability to do your day.' },
      { category: 'insurance', q: 'Is occupational therapy covered by ICBC or WorkSafeBC?', a: 'Yes. Occupational therapy is a recognized part of ICBC and WorkSafeBC recovery where daily function or return to work is affected, and we bill both directly. Bring your claim number to the first visit.' },
      { category: 'treatment', q: 'Do you do home assessments?', a: 'When your recovery depends on your home environment, an assessment of how you manage there is part of the work. Your occupational therapist will tell you at the first visit whether that applies to your situation.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book occupational therapy directly. Some extended health plans ask for a referral before they reimburse, so check your own policy.' },
      { category: 'insurance', q: 'Do you direct-bill?', a: 'Yes, to ICBC, WorkSafeBC, and most extended health plans that include occupational therapy. You pay only the portion your plan does not cover.' },
    ],
    relatedConditions: ['workplace-injuries', 'car-accident-icbc', 'balance-mobility'],
  },
  {
    slug: 'kinesiology',
    name: 'Kinesiology',
    excerpt: 'Kinesiology in West Vancouver. Supervised, active rehab that rebuilds strength and movement after injury.',
    whoThisHelps: [
      'You have finished hands-on treatment and need to rebuild strength before you are truly recovered.',
      'You want a structured exercise program supervised by a professional, not a generic handout.',
      'You are on an ICBC active-rehab plan and need it run properly.',
      'You keep re-injuring the same area because it was never fully reconditioned.',
    ],
    whatWeDo: 'A kinesiologist designs and supervises an exercise program built around your injury, your body, and your goals, correcting your movement as you go. It is the active half of recovery, the part that turns short-term relief into lasting strength. At Azalea it usually follows or runs alongside physiotherapy, so the active work picks up exactly where the hands-on treatment leaves off.',
    approach: 'The work is progressive and supervised. Your kinesiologist starts where you are, loads the tissue safely, and advances the program as you get stronger, watching your form so you rebuild the right movement pattern rather than reinforcing the one that caused the problem. Because the clinic is multidisciplinary, your kinesiologist works from the same notes as your physiotherapist, so the plan stays one continuous line rather than a handoff between clinics.',
    firstVisit: [
      { name: 'A baseline assessment', text: 'Your kinesiologist measures where your strength, movement, and endurance actually are now, so the program starts at the right level and you can see your progress later.' },
      { name: 'A program built for you', text: 'You get an exercise plan matched to your injury and your goal, whether that is climbing stairs without pain or getting back to your sport.' },
      { name: 'Supervised, corrected sessions', text: 'You work through the program with the kinesiologist watching and correcting your form, which is the part a handout cannot do.' },
      { name: 'A plan that progresses', text: 'As you get stronger the program advances, and you leave each stage knowing what to do on your own between sessions.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, assessment and program' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Direct billing', value: 'ICBC active rehab & most extended health' },
      { label: 'Pairs with', value: 'Physiotherapy, one continuous plan' },
    ],
    faqs: [
      { category: 'treatment', q: 'What does a kinesiologist do?', a: 'A kinesiologist designs and supervises exercise to rebuild strength and movement after injury. Think of it as the active, coached half of rehabilitation: the part that makes recovery hold once the hands-on treatment has settled the pain.' },
      { category: 'insurance', q: 'Is kinesiology covered by ICBC?', a: 'Yes. Kinesiology-led active rehabilitation is part of ICBC recovery plans, and we bill ICBC directly. Bring your claim number and we will run the active-rehab portion of your plan.' },
      { category: 'treatment', q: 'How is this different from a personal trainer?', a: 'A kinesiologist is a movement and rehabilitation professional who works from your injury and your clinical assessment, in coordination with your physiotherapist. The focus is recovering function safely, not general fitness, though it often bridges you back to it.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book kinesiology directly. If it is part of an ICBC or extended health plan, bring the relevant claim or policy details.' },
      { category: 'insurance', q: 'Do you direct-bill?', a: 'Yes, to ICBC for active rehab and to most extended health plans that include kinesiology. You pay only the portion your plan does not cover.' },
    ],
    practitioners: ['faranak-shekoohi', 'sirus-vakilian'],
    relatedConditions: ['post-surgical-rehab', 'car-accident-icbc', 'sports-injuries'],
  },
  {
    slug: 'osteopathy',
    name: 'Osteopathy',
    excerpt: 'Osteopathy in West Vancouver. Whole-body manual therapy for pain, stiffness, and restricted movement.',
    whoThisHelps: [
      'Pain or stiffness that seems connected across more than one area of the body.',
      'A stubborn problem that has improved with other treatment but never fully resolved.',
      'You respond well to hands-on, whole-body treatment rather than one joint at a time.',
      'Tension, postural strain, or restricted movement that keeps returning.',
    ],
    whatWeDo: 'An osteopath treats the body as a connected system rather than a set of separate joints. Using hands-on techniques, they ease restriction and improve how you move as a whole, often finding that the source of a problem sits some distance from where you feel it. It complements physiotherapy well, and at Azalea the two often run together in one plan.',
    approach: 'Treatment is entirely manual and unhurried. Your osteopath works through the assessment with their hands, releasing restriction and restoring movement where the body has compensated, then gives you a sense of how many sessions a problem like yours usually needs. Because the clinic is multidisciplinary, osteopathy can sit alongside physiotherapy or acupuncture, coordinated from the same notes instead of treated in isolation.',
    firstVisit: [
      { name: 'A whole-picture history', text: 'Your osteopath asks about the current problem and the history around it, because long-standing strain in one area often explains pain somewhere else.' },
      { name: 'A hands-on assessment', text: 'They assess how your body moves as a connected system, by hand, to find where the restriction actually originates rather than only where it hurts.' },
      { name: 'A plain explanation', text: 'You hear what they have found and how they intend to treat it, including a realistic sense of how many sessions it should take.' },
      { name: 'Treatment the same day', text: 'Hands-on treatment begins in the first visit, and you leave with simple guidance for keeping the improvement between sessions.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, assessment and treatment' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Direct billing', value: 'Most extended health plans' },
      { label: 'Pairs with', value: 'Physiotherapy & acupuncture, one plan' },
    ],
    faqs: [
      { category: 'treatment', q: 'What is the difference between osteopathy and physiotherapy?', a: 'They overlap but emphasize different things. Physiotherapy combines hands-on treatment with active exercise to rebuild strength and function. Osteopathy is wholly hands-on and treats the body as one connected system, which is why it often helps with pain that spans more than one area. Many patients do best with both, coordinated in a single plan.' },
      { category: 'treatment', q: 'Is osteopathy hands-on the whole time?', a: 'Yes. Osteopathy is a manual therapy, so the treatment is hands-on throughout. Your osteopath may also give you a few simple things to do at home to hold the improvement between visits.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book osteopathy directly. Some extended health plans ask for a referral before they reimburse, so check your own policy.' },
      { category: 'insurance', q: 'Do you direct-bill osteopathy?', a: 'Yes, to most major extended health plans that include osteopathy coverage. You pay only the portion your plan does not cover.' },
      { category: 'treatment', q: 'How many sessions will I need?', a: 'Your osteopath gives you a realistic range after the first assessment. Some problems ease in a few sessions; older, more layered ones take longer. The goal is to resolve the restriction, not to keep you returning indefinitely.' },
    ],
    practitioners: ['mehdi-tafreshi'],
    relatedConditions: ['back-neck-pain', 'arthritis-joint-pain', 'headaches-jaw-pain'],
  },
  {
    slug: 'chiropractic',
    name: 'Chiropractic',
    excerpt: 'Chiropractic care in West Vancouver for back pain, neck pain, and joint function.',
    whoThisHelps: [
      'Back or neck pain that affects how you move through the day.',
      'Recurring joint stiffness or a restricted range of motion.',
      'You prefer manual adjustment as part of your care.',
      'You want chiropractic that works with the rest of your recovery, not in isolation.',
    ],
    whatWeDo: 'A chiropractor assesses your spine and joints, then uses adjustment and manual techniques to improve how they move and reduce pain. Because Azalea is multidisciplinary, your chiropractic care does not sit on its own: it can run alongside physiotherapy in a single coordinated plan, so the adjustment and the rehabilitation reinforce each other.',
    approach: 'Treatment is hands-on and specific to what the assessment finds. Your chiropractor works on the joints and movement that are actually restricted, and where a problem needs more than adjustment to hold, the wider team is already in the same building. That coordination is the difference between a one-off adjustment and a plan that lasts.',
    firstVisit: [
      { name: 'A focused assessment', text: 'Your chiropractor examines how your spine and joints move and where the restriction and pain are coming from before any treatment.' },
      { name: 'A plain explanation', text: 'You hear what they have found and how they intend to treat it, in language that makes sense.' },
      { name: 'Treatment the same day', text: 'Adjustment and manual techniques begin in the first visit, matched to what your assessment showed.' },
      { name: 'A coordinated plan', text: 'If physiotherapy or another discipline would make the result hold, it is built into one plan rather than referred out.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '30 to 45 minutes, assessment and treatment' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Direct billing', value: 'Most extended health plans' },
      { label: 'Pairs with', value: 'Physiotherapy, one coordinated plan' },
    ],
    faqs: [
      { category: 'treatment', q: 'What is the difference between a chiropractor and a physiotherapist?', a: 'A chiropractor focuses on assessing and adjusting the joints of the spine and body to improve movement and reduce pain. A physiotherapist combines hands-on treatment with active rehabilitation to rebuild strength and function. They complement each other well, which is why we can run them together in one plan.' },
      { category: 'treatment', q: 'Does an adjustment hurt?', a: 'For most people, no. An adjustment is a quick, controlled movement that is usually painless and often brings immediate relief. Your chiropractor explains what to expect before anything is done.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book chiropractic directly. Some extended health plans ask for a referral before they reimburse, so check your own policy.' },
      { category: 'insurance', q: 'Do you direct-bill chiropractic?', a: 'Yes, to most major extended health plans that include chiropractic coverage. You pay only the portion your plan does not cover.' },
      { category: 'treatment', q: 'How many visits will I need?', a: 'Your chiropractor gives you a realistic range after the first assessment rather than signing you up for an open-ended schedule. The aim is to resolve the problem and keep it resolved, not to keep you returning indefinitely.' },
    ],
    relatedConditions: ['back-neck-pain', 'arthritis-joint-pain'],
  },
  {
    slug: 'weight-loss',
    name: 'Weight Loss Program',
    excerpt: 'A clinician-led weight loss program in West Vancouver, built on movement, structure, and realistic goals.',
    whoThisHelps: [
      'You want to lose weight in a way that is supervised and clinical, not guesswork.',
      'A previous injury or joint pain makes starting exercise feel risky.',
      'You want a plan tied to your physical health and how your body moves, not a fad diet.',
      'You have tried on your own and want structure and accountability that holds.',
    ],
    whatWeDo: 'Our clinician designs a program around safe, progressive movement and sustainable structure, accounting for any injury, joint pain, or limitation you bring. This is weight loss approached through how your body actually moves, built to produce steady, lasting change rather than a short-lived result you cannot maintain.',
    approach: 'The program is progressive and supervised. We start at a level your body can handle today, build movement and capacity safely, and adjust as you go, which is exactly what makes the change last. Because the clinic is multidisciplinary, if an old injury or a joint problem is in the way, physiotherapy is in the same building and folded into the same plan.',
    firstVisit: [
      { name: 'An honest assessment', text: 'We look at your current health, your movement, any injuries or limitations, and what you actually want to achieve.' },
      { name: 'A realistic plan', text: 'You get a program matched to your body and your goal, built to be sustainable rather than punishing.' },
      { name: 'Supervised progression', text: 'You work the plan with guidance and form correction, so it stays safe as the intensity builds.' },
      { name: 'Adjusted as you go', text: 'The program advances with you, and any injury or limitation is managed by the wider team rather than ignored.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, assessment and plan' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Built around', value: 'Safe, progressive movement' },
      { label: 'Pairs with', value: 'Physiotherapy & kinesiology' },
    ],
    faqs: [
      { category: 'treatment', q: 'How is this different from a regular weight loss program?', a: 'It is clinician-led and built around how your body moves, not a generic diet or a one-size class. We account for injuries, joint pain, and limitations from the start, which is what makes it safe and sustainable for people who have found other programs too punishing or too risky.' },
      { category: 'treatment', q: 'I have an injury or joint pain. Can I still do this?', a: 'Yes, and it is exactly who the program is built for. We start at a level your body can handle and progress safely, with physiotherapy available in the same clinic if an injury needs treating alongside the program.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book directly. If you have a relevant extended health plan, bring the details and we will tell you what it covers.' },
      { category: 'insurance', q: 'Is any of it covered by insurance?', a: 'Coverage depends on which practitioner delivers your program and your specific plan. We will tell you honestly at the first visit what your plan covers and what it does not.' },
      { category: 'treatment', q: 'How long until I see results?', a: 'We set a realistic timeline at the start rather than promising a number. The aim is steady, lasting change, and the plan is designed so the results hold after the program ends.' },
    ],
    practitioners: ['faranak-shekoohi'],
    relatedConditions: ['arthritis-joint-pain', 'knee-pain'],
  },
  {
    slug: 'yoga-therapy',
    name: 'Yoga Therapy',
    excerpt: 'Yoga therapy in West Vancouver. Therapeutic, one-on-one yoga adapted to your injury and recovery.',
    whoThisHelps: [
      'You want the benefits of yoga but have an injury or limitation to work around.',
      'Stiffness, stress, or chronic pain is part of your daily picture.',
      'You are looking to support recovery with gentle, guided movement.',
      'Group classes move too fast or do not account for your body.',
    ],
    whatWeDo: 'This is not a class. A practitioner adapts yoga to your specific body and recovery goals, using breath, posture, and movement to build mobility and ease tension. Working one-on-one means every posture is matched to what your body can do and where it needs to go, which makes it a safe bridge between active rehabilitation and everyday life.',
    approach: 'Sessions are one-on-one and built around you. Your practitioner works from your injury, your stiffness, and your goals, adapting each posture so it helps rather than strains, and progresses the practice as your mobility improves. Because the clinic is multidisciplinary, yoga therapy can follow on from physiotherapy as a way to keep the gains, coordinated from the same notes.',
    firstVisit: [
      { name: 'Understanding your body', text: 'Your practitioner reviews your injury or limitation, your stiffness, and what you want the practice to do for you.' },
      { name: 'A practice adapted to you', text: 'Postures, breath, and movement are matched to your body as it is now, not to a fixed sequence.' },
      { name: 'Guided, one-on-one', text: 'You move through the session with hands-on guidance, so every posture is safe and doing what it should.' },
      { name: 'A practice you can keep', text: 'You leave with a manageable practice to continue, and the team coordinates it with any other treatment you are having.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '60 minutes, one-on-one' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Format', value: 'Individual, adapted to your body' },
      { label: 'Pairs with', value: 'Physiotherapy, to keep the gains' },
    ],
    faqs: [
      { category: 'treatment', q: 'How is yoga therapy different from a yoga class?', a: 'A class teaches a set sequence to a room. Yoga therapy is one-on-one and built around your body, your injury, and your recovery goals, so every posture is adapted to what you can do safely. It is therapeutic, not a workout.' },
      { category: 'treatment', q: 'I am not flexible or experienced. Is this for me?', a: 'Yes. Because it is individual and adapted, your starting point does not matter. The practice meets your body where it is and progresses from there.' },
      { category: 'treatment', q: 'Can it help with an injury or chronic pain?', a: 'It can, particularly as a way to maintain mobility and ease tension after active rehabilitation. Your practitioner will tell you honestly whether it suits your situation, and coordinate with physiotherapy where needed.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book yoga therapy directly. If you have relevant extended health coverage, bring the details.' },
      { category: 'insurance', q: 'Is it covered by insurance?', a: 'Coverage varies by plan and by the practitioner delivering it. We will tell you at the first visit what your plan covers.' },
    ],
    relatedConditions: ['back-neck-pain', 'arthritis-joint-pain', 'balance-mobility'],
  },
  {
    slug: 'elderly-care',
    name: 'Elderly Care',
    excerpt: 'The Enhanced Care Program in West Vancouver. Physiotherapy for seniors focused on mobility, balance, and independence.',
    whoThisHelps: [
      'An older adult who wants to stay mobile and independent at home.',
      'Recovery is needed after a fall, a fracture, or a hospital stay.',
      'Balance or strength has declined and falls have become a worry.',
      'A family member wants safer movement and confidence for an aging parent.',
    ],
    whatWeDo: 'Our Enhanced Care Program tailors physiotherapy to older adults, working on balance, strength, and confident movement to reduce the risk of falls and protect independence. We coordinate care around the realities of aging, recovery, and daily life at home, at a pace that respects where you or your family member is starting from.',
    approach: 'The work is patient and specific to later life. Treatment focuses on the things that keep an older adult safe and independent: steady balance, the strength to get up and move, and the confidence to manage daily tasks without the fear of falling. Because the clinic is multidisciplinary, the program coordinates with the rest of their care rather than treating one problem in isolation.',
    firstVisit: [
      { name: 'An unhurried assessment', text: 'Your physiotherapist looks at balance, strength, mobility, and the specific tasks that have become harder, at a pace that suits an older patient.' },
      { name: 'A clear, realistic plan', text: 'You and your family hear what is going on and what the program will work on, with goals tied to staying safe and independent at home.' },
      { name: 'Gentle treatment the same day', text: 'The program begins in the first visit, matched to their current ability, with nothing rushed.' },
      { name: 'Coordinated around real life', text: 'The plan accounts for other conditions, medications, and home circumstances, and brings in the wider team where it helps.' },
    ],
    goodToKnow: [
      { label: 'First visit', value: '45 to 60 minutes, unhurried' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Focus', value: 'Balance, strength, fall prevention' },
      { label: 'Direct billing', value: 'Most extended health plans' },
    ],
    faqs: [
      { category: 'treatment', q: 'What is the Enhanced Care Program?', a: 'It is physiotherapy tailored to older adults, focused on balance, strength, and confident movement to reduce falls and protect independence. The pace, the goals, and the coordination with other care are all built around the realities of later life.' },
      { category: 'treatment', q: 'Can it help prevent falls?', a: 'Yes. Balance and strength are trainable at any age, and reducing the risk of falls is one of the central goals of the program. We work on steadiness, the strength to recover a stumble, and the confidence to keep moving.' },
      { category: 'treatment', q: 'My parent is recovering from a fall or hospital stay. Can you help?', a: 'Yes. Structured recovery after a fall, fracture, or hospital stay is exactly what the program is for. We rebuild strength and confidence safely and coordinate with their other care.' },
      { category: 'booking', q: 'Do I need a referral?', a: 'No. You can book directly for yourself or a family member. If there is extended health coverage, bring the details.' },
      { category: 'insurance', q: 'Do you direct-bill?', a: 'Yes, to most extended health plans that include physiotherapy. You pay only the portion the plan does not cover.' },
    ],
    practitioners: ['mary-ghoroghi', 'noushin-nouri'],
    relatedConditions: ['balance-mobility', 'arthritis-joint-pain', 'post-surgical-rehab'],
  },
]

export type Condition = {
  slug: string
  name: string
  short: string
  intro: string
  relatedServices: string[]
}

export const conditions: Condition[] = [
  {
    slug: 'back-neck-pain',
    name: 'Back & Neck Pain',
    short: 'Desk strain, disc trouble, and the ache that will not settle.',
    intro: 'Most back and neck pain comes from how you move and hold yourself all day, not from one dramatic moment. We find what is driving it and treat the cause, so relief lasts past the appointment.',
    relatedServices: ['physiotherapy', 'osteopathy', 'chiropractic', 'acupuncture'],
  },
  {
    slug: 'knee-pain',
    name: 'Knee Pain',
    short: 'From sports injuries to recovery after surgery.',
    intro: 'Knees rarely hurt in isolation. We look at the hip, the ankle, and how you load the joint, then build a plan that gets you back to walking, training, or the stairs without thinking about it.',
    relatedServices: ['physiotherapy', 'sports-injury', 'kinesiology'],
  },
  {
    slug: 'shoulder-injuries',
    name: 'Shoulder Injuries',
    short: 'Rotator cuff, frozen shoulder, and impingement.',
    intro: 'A shoulder that catches, aches at night, or will not lift overhead needs an accurate diagnosis first. We assess what is actually restricted, then treat and rebuild it in the right order.',
    relatedServices: ['physiotherapy', 'sports-injury', 'acupuncture'],
  },
  {
    slug: 'car-accident-icbc',
    name: 'Car Accident Injuries',
    short: 'Whiplash and soft-tissue recovery, billed straight to ICBC.',
    intro: 'After a motor vehicle accident you can start physiotherapy as soon as you have a claim number, with no adjuster approval needed. We treat whiplash and soft-tissue injuries and bill ICBC directly.',
    relatedServices: ['physiotherapy', 'kinesiology', 'occupational-therapy'],
  },
  {
    slug: 'sports-injuries',
    name: 'Sports Injuries',
    short: 'Sprains, strains, and the return to your sport.',
    intro: 'Getting back to sport is not the same as getting out of pain. We treat the injury and then rebuild the strength, control, and confidence that keep you in the game next season.',
    relatedServices: ['sports-injury', 'physiotherapy', 'kinesiology'],
  },
  {
    slug: 'post-surgical-rehab',
    name: 'Post-Surgical Rehab',
    short: 'Structured recovery after knee, hip, or shoulder surgery.',
    intro: 'Surgery is the start of recovery, not the end. We follow your surgeon’s protocol and add the supervised progression that restores range, strength, and normal movement on schedule.',
    relatedServices: ['physiotherapy', 'kinesiology', 'osteopathy'],
  },
  {
    slug: 'workplace-injuries',
    name: 'Workplace Injuries',
    short: 'WorkSafeBC claims and a managed return to work.',
    intro: 'Once your WorkSafeBC claim is open, we coordinate the treatment plan and the reporting, including the documentation for a safe, graded return to your job.',
    relatedServices: ['physiotherapy', 'occupational-therapy', 'kinesiology'],
  },
  {
    slug: 'arthritis-joint-pain',
    name: 'Arthritis & Joint Pain',
    short: 'Keeping stiff, painful joints moving.',
    intro: 'Arthritis responds to the right kind of movement. We help you stay active without flaring the joint, using hands-on treatment and a program matched to how the pain behaves.',
    relatedServices: ['physiotherapy', 'kinesiology', 'acupuncture'],
  },
  {
    slug: 'headaches-jaw-pain',
    name: 'Headaches & Jaw Pain',
    short: 'Tension headaches and TMJ that physiotherapy can ease.',
    intro: 'Many headaches and jaw problems trace back to the neck and the muscles around it. We assess that link and treat it directly, often alongside acupuncture for tension relief.',
    relatedServices: ['physiotherapy', 'acupuncture', 'osteopathy'],
  },
  {
    slug: 'balance-mobility',
    name: 'Balance & Mobility',
    short: 'Fall prevention and staying independent at home.',
    intro: 'Balance is trainable at any age. Through our Enhanced Care Program we work on strength, steadiness, and confident movement to reduce falls and keep older adults independent at home.',
    relatedServices: ['elderly-care', 'physiotherapy', 'kinesiology'],
  },
]

export type Practitioner = {
  slug: string
  name: string
  role: string
  credentials: string
  img?: string
  languages: string[]
  focus: string[]
  bio: string
}

export const team: Practitioner[] = [
  {
    slug: 'mary-ghoroghi',
    name: 'Mary Ghoroghi',
    role: 'Registered Physiotherapist',
    credentials: 'Registered Physiotherapist (MPT), CMA, MCPA',
    img: '/images/existing/team-Mary-Gheissari.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Complex and chronic pain', 'Post-surgical rehab', 'Manual therapy'],
    bio: 'Mary founded Azalea in 2011 and still treats patients most days. She is known for finding the cause of a problem when other clinics have only treated the symptom, and for explaining what she finds in language that makes sense. She treats in both English and Farsi.',
  },
  {
    slug: 'braedan-lalor',
    name: 'Braedan Lalor',
    role: 'Physiotherapist',
    credentials: 'Registered Physiotherapist (PT)',
    img: '/images/existing/team-Braedan.jpg',
    languages: ['English'],
    focus: ['Sports injuries', 'Manual therapy', 'Return to activity'],
    bio: 'Braedan works with active patients who want a clear path back to training and sport. His approach pairs hands-on treatment with progressive loading, so recovery holds up under real-world demands.',
  },
  {
    slug: 'mehdi-tafreshi',
    name: 'Mehdi Tafreshi',
    role: 'Osteopath',
    credentials: 'Osteopath, D.O.M.P.',
    img: '/images/existing/team-mehdi-tafreshi.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Whole-body manual therapy', 'Chronic stiffness', 'Postural pain'],
    bio: 'Mehdi treats the body as a connected system rather than a set of separate joints. Patients come to him for stubborn, multi-area pain that has not resolved with a single-region approach.',
  },
  {
    slug: 'noushin-nouri',
    name: 'Noushin Nouri',
    role: 'Registered Physiotherapist',
    credentials: 'Registered Physiotherapist',
    img: '/images/existing/team-Noushin.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Orthopaedic rehab', 'Neck and back pain', 'ICBC recovery'],
    bio: 'Noushin focuses on orthopaedic and motor-vehicle-accident recovery, guiding patients from the acute, painful stage through to full function. She treats in English and Farsi.',
  },
  {
    slug: 'ali-shafiei',
    name: 'Ali Shafiei',
    role: 'Sports & MSK Physiotherapy',
    credentials: 'Registered Physiotherapist, Clinical Specialist',
    img: '/images/existing/team-Ali-Shafiei.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Sports and musculoskeletal injuries', 'Neurological rehab', 'Performance'],
    bio: 'Ali treats across sports, musculoskeletal, and neurological cases, with a particular interest in getting athletes back to performance. He builds rehab that respects the timeline of the sport, not just the injury.',
  },
  {
    slug: 'asal',
    name: 'Asal',
    role: 'CBT & Psychotherapy',
    credentials: 'Counselling Therapist (CBT, ACT, Mindfulness)',
    img: '/images/existing/team-asal.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Cognitive behavioural therapy', 'Pain and stress', 'Recovery support'],
    bio: 'Asal supports patients whose recovery has a mental and emotional side, from the stress of a long injury to the anxiety that can follow an accident. Her counselling sits naturally alongside physical treatment.',
  },
  {
    slug: 'faranak-shekoohi',
    name: 'Faranak Shekoohi',
    role: 'Kinesiologist',
    credentials: 'Practicing Kinesiologist',
    img: '/images/existing/team-Faranak-Shekoohi.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Active rehab', 'ICBC programs', 'Strength rebuilding'],
    bio: 'With fifteen years in active rehabilitation, Faranak designs and supervises the exercise programs that turn early recovery into lasting strength. She runs many of our ICBC active-rehab plans.',
  },
  {
    slug: 'kambiz-navirian',
    name: 'Kambiz Navirian',
    role: 'Acupuncture',
    credentials: 'Registered Acupuncturist',
    img: '/images/existing/team-kambiz.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Pain relief', 'Tension and headaches', 'Integrative care'],
    bio: 'Kambiz treats pain, tension, and headaches with acupuncture, integrating it with the physiotherapy plans running alongside it so the two reinforce each other.',
  },
  {
    slug: 'sirus-vakilian',
    name: 'Dr. Sirus Vakilian',
    role: 'Kinesiology',
    credentials: 'Kinesiologist, BSc',
    languages: ['English', 'Farsi'],
    focus: ['Exercise prescription', 'Movement assessment', 'Conditioning'],
    bio: 'Sirus works on the conditioning side of recovery, assessing movement and prescribing exercise that rebuilds capacity safely. He helps patients close the gap between out of pain and back to full activity.',
  },
  {
    slug: 'ramin-keshmiri',
    name: 'Ramin Keshmiri',
    role: 'Acupuncture',
    credentials: 'Registered Acupuncturist, B.Sc., M.Sc.',
    languages: ['English', 'Farsi'],
    focus: ['Acupuncture', 'Chronic pain', 'Stress and sleep'],
    bio: 'Ramin treats chronic pain, stress, and sleep through acupuncture, often as one part of a broader plan that the rest of the team contributes to.',
  },
  {
    slug: 'azam-hosseini',
    name: 'Dr. Azam Hosseini',
    role: 'Psychiatry & Counselling',
    credentials: 'Psychiatrist, Registered Therapeutic Counsellor (RTC)',
    languages: ['English', 'Farsi'],
    focus: ['Psychiatric assessment', 'Mental health', 'Recovery and wellbeing'],
    bio: 'Dr. Hosseini provides psychiatric assessment and support for patients whose health and recovery have a mental health dimension, completing the range of care available under one roof.',
  },
  {
    slug: 'melina-raad',
    name: 'Melina Raad',
    role: 'Office Manager',
    credentials: 'Office Manager, CMA',
    img: '/images/existing/team-Melina-Raad.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Booking and scheduling', 'Insurance and billing', 'Patient coordination'],
    bio: 'Melina runs the front of the clinic, from booking and scheduling to direct billing. She is usually the first person you speak with, and the one who makes the insurance side simple.',
  },
]

export type Faq = {
  q: string
  a: string
  category: 'booking' | 'insurance' | 'treatment' | 'general'
}

export const faqs: Faq[] = [
  {
    category: 'booking',
    q: 'Do I need a referral to see a physiotherapist in BC?',
    a: 'No. Physiotherapy in British Columbia does not require a doctor’s referral, so you can book with Azalea directly. Some extended health plans ask for a referral before they reimburse you, so it is worth checking your own policy.',
  },
  {
    category: 'booking',
    q: 'How soon can I get an appointment?',
    a: 'Usually within the same week. We hold same-week openings for new patients across both clinics, and our longer hours, open until 7pm on weekdays and Saturday mornings, make it easier to find a time.',
  },
  {
    category: 'insurance',
    q: 'Do you direct-bill my insurance?',
    a: 'Yes. We direct-bill ICBC, WorkSafeBC, and most major extended health and benefit plans, including Pacific Blue Cross, Sun Life, Manulife, Canada Life, Green Shield, Desjardins and Beneva. You pay only the portion your plan does not cover, and our insurance page lists every provider we bill.',
  },
  {
    category: 'treatment',
    q: 'What happens at my first visit?',
    a: 'A full assessment followed by same-day treatment. Your practitioner reviews your history, examines the injury, explains what they have found in plain language, and begins hands-on treatment. Plan for 45 to 60 minutes.',
  },
  {
    category: 'insurance',
    q: 'Can you treat my ICBC car accident claim?',
    a: 'Yes. Once you have an ICBC claim number you can start physiotherapy without an adjuster’s approval, and we bill ICBC directly. Bring your claim number and date of accident to your first visit.',
  },
  {
    category: 'general',
    q: 'Are your practitioners qualified?',
    a: 'Yes. Our physiotherapists are registered with the College of Physical Therapists of BC, and each discipline is delivered by a licensed practitioner in their field. The clinic has operated on the North Shore since 2011.',
  },
  {
    category: 'booking',
    q: 'Which of your two locations should I choose?',
    a: 'Either one. Both serve the whole North Shore and offer the same disciplines. The 16th Street clinic sits in central West Vancouver, and Ocean Walk on Marine Drive suits the west side. Choose by proximity, or by the practitioner you want to see.',
  },
  {
    category: 'insurance',
    q: 'How much does physiotherapy cost?',
    a: 'An initial assessment runs roughly $110 to $135 and follow-ups roughly $90 to $110, depending on length and practitioner. Most extended health plans reimburse a significant share, and ICBC and WorkSafeBC visits are typically covered in full with nothing to pay upfront.',
  },
]

export type Testimonial = {
  quote: string
  name: string
  detail: string
  service?: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Mary found what three other physiotherapists had missed and had me back on the slopes in six weeks. She went looking for the cause, not just the symptom.',
    name: 'Marcus L.',
    detail: 'ski instructor, North Vancouver',
    service: 'physiotherapy',
  },
  {
    quote: 'After my accident I had no idea where to start. They handled the ICBC paperwork, booked me in the same week, and I never paid a cent upfront.',
    name: 'Sahar R.',
    detail: 'ICBC patient, West Vancouver',
    service: 'physiotherapy',
  },
  {
    quote: 'Being able to see the physiotherapist and the kinesiologist in the same building, working from the same notes, made my knee recovery far smoother than last time.',
    name: 'David K.',
    detail: 'post-surgical knee rehab',
    service: 'kinesiology',
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug)
export const practitionerBySlug = (slug: string) => team.find((p) => p.slug === slug)
