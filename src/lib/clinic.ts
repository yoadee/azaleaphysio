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
    practitioners: ['braedan-lalor'],
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
      { category: 'treatment', q: 'Do you offer IMS or dry needling?', a: 'Yes. Alongside traditional acupuncture, our practitioners use intramuscular stimulation (IMS), a dry-needling technique that releases tight muscle bands and trigger points. Your practitioner will tell you which approach suits your problem, and the two are often combined.' },
    ],
    practitioners: ['kambiz-navirian'],
    relatedConditions: ['headaches-jaw-pain', 'back-neck-pain', 'arthritis-joint-pain'],
  },
  {
    slug: 'massage-therapy',
    name: 'Massage Therapy',
    excerpt: 'Registered massage therapy in West Vancouver for muscle tension, pain, and recovery, alongside physiotherapy under one roof.',
    whoThisHelps: [
      'Tight, aching muscles that will not settle on their own.',
      'Tension headaches, a stiff neck, or a tight back from desk work or training.',
      'You want massage that works with your recovery, not separately from it.',
      'You are managing a long-standing issue and want to ease the tension between treatment sessions.',
    ],
    whatWeDo: 'A registered massage therapist (RMT) works on the muscles and soft tissue driving your pain and tension, easing tightness and improving how the area moves. At Azalea it most often runs alongside physiotherapy in one plan, so the massage and the hands-on rehabilitation reinforce each other instead of pulling in different directions.',
    approach: 'Treatment is tailored to what your assessment finds, not a fixed routine. Your therapist works on the areas actually holding tension and restriction, and where a problem needs more than massage to resolve, the physiotherapy and rehabilitation team is already in the same building, working from the same notes.',
    firstVisit: [
      { name: 'A short assessment', text: 'Your therapist asks what is bothering you and where, and checks the areas of tension and restriction before treatment begins.' },
      { name: 'A plan for the session', text: 'You agree on what to focus on and the pressure that suits you, so the treatment matches what your body needs that day.' },
      { name: 'Treatment', text: 'Hands-on massage targets the muscles and soft tissue driving your pain and tension, at a pace and pressure that works for you.' },
      { name: 'Coordinated with your care', text: 'If physiotherapy or another discipline would help the result hold, your therapist flags it and the team builds it into one plan.' },
    ],
    goodToKnow: [
      { label: 'Session length', value: '30, 45 or 60 minutes' },
      { label: 'Referral', value: 'Not required, book directly' },
      { label: 'Direct billing', value: 'Most extended health plans' },
      { label: 'Pairs with', value: 'Physiotherapy, one coordinated plan' },
    ],
    faqs: [
      { category: 'treatment', q: 'What does a registered massage therapist treat?', a: 'An RMT treats muscle tension, soft-tissue pain, and the tightness that builds up from injury, training, or daily strain. At Azalea it is often used alongside physiotherapy, so the massage eases the tension while the rehabilitation rebuilds strength and movement.' },
      { category: 'booking', q: 'Do I need a referral for massage therapy?', a: 'No. You can book massage therapy directly in BC. Some extended health plans ask for a physician referral before they reimburse, so it is worth checking your own policy first.' },
      { category: 'insurance', q: 'Do you direct-bill massage therapy?', a: 'Yes, to most major extended health plans that include registered massage therapy. You pay only the portion your plan does not cover, and our insurance page lists the providers we bill.' },
      { category: 'treatment', q: 'How long is a massage session?', a: 'Sessions run 30, 45, or 60 minutes. Your therapist can help you choose based on the area being treated and what you are dealing with.' },
    ],
    practitioners: ['behzad-azari-mobarakeh'],
    relatedConditions: ['back-neck-pain', 'sports-injuries', 'arthritis-joint-pain'],
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
    practitioners: ['faranak-shekoohi'],
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
    practitioners: ['sirus-vakilian'],
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
      { label: 'Program length', value: 'Typically 4 to 10 sessions over 1 to 2 months' },
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
    whatWeDo: 'Our Enhanced Care Program tailors physiotherapy to older adults, working on balance, strength, and confident movement to reduce the risk of falls and protect independence. We see patients in either clinic, and at home where getting to an appointment is difficult, coordinating care around the realities of aging, recovery, and daily life at a pace that respects where you or your family member is starting from.',
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
      { label: 'Where', value: 'In clinic, or at home where travel is hard' },
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
  // Enriched fields. Present on the priority conditions (the big four + whiplash);
  // thinner conditions omit them and render the basic template gracefully.
  symptoms?: string[] // "Is this you" checklist
  approach?: string // How we treat it, answer-first paragraph
  recovery?: string // How long recovery takes, answer-first
  faqs?: Faq[] // condition Q&A → FAQPage JSON-LD
  // Shows a cross-link band to the matching insurance landing page.
  insuranceCallout?: 'icbc' | 'worksafebc'
}

export const conditions: Condition[] = [
  {
    slug: 'back-neck-pain',
    name: 'Back & Neck Pain',
    short: 'Desk strain, disc trouble, and the ache that will not settle.',
    intro: 'Most back and neck pain comes from how you move and hold yourself all day, not from one dramatic moment. We find what is driving it and treat the cause, so relief lasts past the appointment.',
    relatedServices: ['physiotherapy', 'osteopathy', 'chiropractic', 'acupuncture'],
    symptoms: [
      'A deep ache in your lower back that worsens after sitting or standing too long.',
      'Neck stiffness and tension that creeps into headaches by the end of the day.',
      'Pain that travels into a buttock, leg, shoulder, or arm.',
      'A back that has gone out before and you want to stop it happening again.',
      'Morning stiffness that takes longer and longer to loosen off.',
    ],
    approach: 'We start by finding what is actually driving the pain, because back and neck pain is rarely just about the spot that hurts. Your physiotherapist assesses how you move, where the load is concentrated, and what is weak or restricted, then treats the pain directly with hands-on therapy and rebuilds the strength and movement that keep it settled. Where it helps, acupuncture, osteopathy, or chiropractic care run in the same plan rather than at a separate clinic.',
    recovery: 'Many people feel meaningful relief within two to four weeks, and a simple flare-up can settle faster. Long-standing or disc-related problems take longer and are worked in stages. Your physiotherapist gives you a realistic timeline after the first assessment rather than an open-ended schedule.',
    faqs: [
      { category: 'treatment', q: 'Should I see a physiotherapist for back or neck pain?', a: 'Yes, particularly if the pain has lasted more than a week, keeps returning, or travels into a limb. A physiotherapist can diagnose what is driving it and treat the cause, which is what stops it coming back. You do not need a referral to book in BC.' },
      { category: 'treatment', q: 'Should I rest or keep moving with back pain?', a: 'For most back pain, gentle movement helps more than bed rest. Staying still too long tends to stiffen things and slow recovery. The assessment tells us which movements help you and which to ease off, so you are not guessing.' },
      { category: 'treatment', q: 'How long does back and neck pain take to heal?', a: 'Often two to four weeks for relief with the right treatment, though long-standing or disc-related issues take longer. We give you a realistic range after the first visit and build the plan in stages.' },
      { category: 'treatment', q: 'What causes most back and neck pain?', a: 'Usually how you load and hold your body over time rather than one injury: long hours at a desk, repetitive strain, weak supporting muscles, or old movement habits. That is why treating only the sore spot rarely lasts. We treat the pattern behind it.' },
    ],
  },
  {
    slug: 'knee-pain',
    name: 'Knee Pain',
    short: 'From sports injuries to recovery after surgery.',
    intro: 'Knees rarely hurt in isolation. We look at the hip, the ankle, and how you load the joint, then build a plan that gets you back to walking, training, or the stairs without thinking about it.',
    relatedServices: ['physiotherapy', 'sports-injury', 'kinesiology'],
    symptoms: [
      'Pain at the front of the knee going up or down stairs, or after sitting a while.',
      'A knee that aches or swells after running, hiking, or sport.',
      'Catching, locking, or a feeling that the knee might give way.',
      'Lingering pain from an old injury that never fully settled.',
      'Stiffness and pain from arthritis that limits how far you walk.',
    ],
    approach: 'We trace the pain to its source, which is often not the knee itself but how the hip, ankle, and surrounding muscles load it. Your physiotherapist treats the painful structure, then rebuilds the strength and control that take the strain off the joint, with kinesiology-led strengthening where the knee needs reconditioning. The aim is a knee you stop thinking about on the stairs, not just one that hurts less today.',
    recovery: 'A straightforward overuse problem often eases within a few weeks. Ligament, cartilage, or post-surgical cases are staged over a longer period and progressed as the joint regains strength. You get a realistic timeline and clear milestones after the first assessment.',
    faqs: [
      { category: 'treatment', q: 'Should I see a physiotherapist for knee pain?', a: 'Yes, especially if the pain has lasted more than a couple of weeks, swells, catches, or affects how you walk or climb stairs. A physiotherapist can diagnose the cause and treat it without surgery in most cases. No referral is needed to book in BC.' },
      { category: 'treatment', q: 'Can physiotherapy help knee pain without surgery?', a: 'Very often, yes. Most knee pain, including many cases of cartilage and tendon trouble and early arthritis, responds well to targeted treatment and strengthening. We tell you honestly if we think a problem needs a surgical opinion.' },
      { category: 'treatment', q: 'How long does knee pain take to recover?', a: 'A simple overuse strain can settle in a few weeks; ligament, cartilage, or post-surgical recovery is staged over longer and progressed as strength returns. We give you a realistic range and milestones at the first visit.' },
      { category: 'treatment', q: 'Why does my knee hurt on the stairs?', a: 'Pain going up or down stairs usually points to how the kneecap tracks and the strength of the muscles around the hip and thigh, rather than damage inside the joint. That is good news: it tends to respond well to the right strengthening, which is exactly what the plan targets.' },
    ],
  },
  {
    slug: 'shoulder-injuries',
    name: 'Shoulder Injuries',
    short: 'Rotator cuff, frozen shoulder, and impingement.',
    intro: 'A shoulder that catches, aches at night, or will not lift overhead needs an accurate diagnosis first. We assess what is actually restricted, then treat and rebuild it in the right order.',
    relatedServices: ['physiotherapy', 'sports-injury', 'acupuncture'],
    symptoms: [
      'Pain reaching overhead, behind your back, or out to the side.',
      'A deep ache that wakes you when you roll onto that shoulder at night.',
      'Weakness or pain lifting, carrying, or pushing.',
      'A shoulder that is slowly getting stiffer and harder to move (frozen shoulder).',
      'Clicking, catching, or a sense the shoulder is unstable.',
    ],
    approach: 'The shoulder is a complex joint, so an accurate diagnosis comes first: rotator cuff, impingement, frozen shoulder, and instability all look similar but need different treatment, and in the wrong order they get worse. Your physiotherapist works out exactly what is restricted or irritated, settles the pain with hands-on treatment, then rebuilds the strength and control through the right range, in the right sequence. Acupuncture can help with stubborn night pain alongside the plan.',
    recovery: 'It depends heavily on the diagnosis. A mild rotator-cuff irritation can settle in a few weeks; a frozen shoulder runs through predictable stages over months and the plan is paced to each one. The first assessment gives you an honest timeline for your specific shoulder.',
    faqs: [
      { category: 'treatment', q: 'Should I see a physiotherapist for shoulder pain?', a: 'Yes, particularly if the pain wakes you at night, limits reaching overhead, or has lasted more than a couple of weeks. Shoulder problems are easy to misjudge and treating the wrong one slows recovery, so an accurate assessment matters. No referral is needed in BC.' },
      { category: 'treatment', q: 'How do I know if it is my rotator cuff or a frozen shoulder?', a: 'They feel similar but behave differently: a frozen shoulder progressively loses range in every direction, while rotator-cuff problems are more about pain and weakness with specific movements. The assessment distinguishes them, because the right treatment for one can aggravate the other.' },
      { category: 'treatment', q: 'How long do shoulder injuries take to heal?', a: 'A mild strain or impingement can ease in a few weeks; a frozen shoulder progresses through stages over months. We pace the plan to your specific diagnosis and give you a realistic timeline at the first visit.' },
      { category: 'treatment', q: 'Why does my shoulder hurt more at night?', a: 'Night pain is common with rotator-cuff and inflammatory shoulder problems, because lying on it or still positions load the irritated tissue. It is a sign worth getting assessed rather than waiting out, and it usually settles as treatment progresses.' },
    ],
  },
  {
    slug: 'car-accident-icbc',
    name: 'Car Accident Injuries',
    short: 'Whiplash and soft-tissue recovery, billed straight to ICBC.',
    intro: 'After a motor vehicle accident you can start physiotherapy as soon as you have a claim number, with no adjuster approval needed. We treat whiplash and soft-tissue injuries and bill ICBC directly.',
    relatedServices: ['physiotherapy', 'kinesiology', 'occupational-therapy'],
    insuranceCallout: 'icbc',
    symptoms: [
      'Neck pain, stiffness, or headaches that came on in the hours or days after a crash.',
      'Back, shoulder, or other soft-tissue pain from the impact.',
      'Dizziness, poor sleep, or difficulty concentrating since the accident.',
      'You have an ICBC claim number and want to start treatment.',
      'Pain that seemed minor at first but is not settling on its own.',
    ],
    approach: 'ICBC pre-approves 25 physiotherapy visits in your first 12 weeks, and you can start with just a claim number, no referral or adjuster approval. Your physiotherapist assesses what the impact actually injured, treats the pain, and rebuilds the movement and strength so it does not linger or turn chronic. We bill ICBC directly and request any extension you need, so you focus on recovery, not paperwork.',
    recovery: 'Many soft-tissue and whiplash injuries settle over six to twelve weeks with early, guided treatment, which is why starting soon matters. More significant injuries take longer and are staged. Your physiotherapist gives you a realistic timeline and manages the ICBC side throughout.',
    faqs: [
      { category: 'insurance', q: 'How soon can I start physiotherapy after a car accident?', a: 'As soon as you have an ICBC claim number. You do not need a doctor’s referral or adjuster approval, and the 25 pre-approved visits sit inside a 12-week window that starts on the day of the crash, so booking early gets you more from your coverage.' },
      { category: 'insurance', q: 'Do you bill ICBC directly?', a: 'Yes. Bring your claim number and date of accident to the first visit and we bill ICBC directly for your covered visits, with nothing to pay upfront. If you need treatment beyond the pre-approved visits, we request the extension for you.' },
      { category: 'treatment', q: 'My pain seemed minor at first. Should I still get assessed?', a: 'Yes. Whiplash and soft-tissue injuries often feel worse a day or two later and can linger if left alone. An early assessment catches what is going on and treats it before it becomes a longer-term problem. There is no downside to getting checked.' },
    ],
  },
  {
    slug: 'whiplash',
    name: 'Whiplash',
    short: 'Neck pain and stiffness after a car accident, treated early.',
    intro: 'Whiplash is the sudden neck strain caused when your head is thrown back and forward in a collision. It is the most common car-accident injury, and it responds far better to early, guided treatment than to rest. We treat it and bill ICBC directly.',
    relatedServices: ['physiotherapy', 'acupuncture', 'kinesiology'],
    insuranceCallout: 'icbc',
    symptoms: [
      'Neck pain and stiffness that started within a day or two of a crash.',
      'Headaches that begin at the base of the skull.',
      'Reduced movement turning or tilting your head.',
      'Pain spreading into the shoulders or upper back.',
      'Dizziness, fatigue, or trouble sleeping since the accident.',
    ],
    approach: 'The old advice to rest a whiplash in a collar is out of date; the neck recovers better with early, carefully guided movement. Your physiotherapist confirms what is injured, settles the pain and protective muscle guarding with hands-on treatment, and restores movement and strength in a controlled progression. Acupuncture can ease stubborn neck tension alongside the plan. Because whiplash follows a car accident, ICBC covers the treatment and we bill it directly.',
    recovery: 'Most whiplash improves within six to twelve weeks when treatment starts early. Left to rest alone, a meaningful share of cases turn into longer-lasting neck pain, which is exactly what early, active treatment prevents. Your physiotherapist gives you a realistic timeline at the first visit.',
    faqs: [
      { category: 'treatment', q: 'How long does whiplash take to heal?', a: 'Most cases improve within six to twelve weeks with early, guided treatment. Recovery is slower when the neck is simply rested, because the muscles stiffen and guard. Starting physiotherapy soon after the crash gives you the best and fastest recovery.' },
      { category: 'treatment', q: 'Should I rest my neck or keep it moving after whiplash?', a: 'Keep it moving, within comfortable limits and guided by your physiotherapist. Prolonged rest and collars are no longer recommended for most whiplash; controlled movement settles the pain faster and prevents long-term stiffness. The assessment shows you exactly what is safe.' },
      { category: 'insurance', q: 'Is whiplash treatment covered by ICBC?', a: 'Yes. As a car-accident injury, whiplash physiotherapy is covered, with 25 visits pre-approved in your first 12 weeks. You can start with just a claim number, no referral needed, and we bill ICBC directly.' },
      { category: 'treatment', q: 'My neck did not hurt until the next day. Is that normal?', a: 'Very. Whiplash pain commonly sets in twelve to seventy-two hours after the impact as inflammation builds. A delayed onset does not mean it is minor, and getting assessed early still gives the best outcome.' },
    ],
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
    symptoms: [
      'You have a knee, hip, or shoulder replacement or repair scheduled and want to recover properly.',
      'You are out of the sling or off the crutches and unsure how hard to push.',
      'Your surgeon has given you a protocol and you want it run by someone who knows it.',
      'Range or strength has stalled and you want it moving again safely.',
      'You want to return to sport or full activity, not just to daily function.',
    ],
    approach: 'We follow your surgeon’s protocol to the letter and add the part a protocol cannot give you: supervised, progressive rehabilitation that restores range, strength, and normal movement on the right schedule. Your physiotherapist knows when to protect the repair and when to load it, so you neither rush it nor lose time being too cautious. Kinesiology-led strengthening carries the later stages back toward full activity.',
    recovery: 'It follows the surgery. A knee or hip replacement, an ACL reconstruction, or a rotator-cuff repair each has its own timeline, typically several months in staged phases. We work to your surgeon’s milestones and tell you at each stage what is on track and what is next.',
    faqs: [
      { category: 'treatment', q: 'When should I start physiotherapy after surgery?', a: 'Often sooner than people expect, and usually on a timeline your surgeon sets. Early, guided rehabilitation protects the repair while preventing the stiffness and weakness that set recovery back. Bring your surgical protocol or discharge notes and we work from those.' },
      { category: 'treatment', q: 'Do you follow my surgeon’s protocol?', a: 'Yes, exactly. Your surgeon’s protocol sets the boundaries, and we run the supervised progression inside them, knowing when to protect the repair and when it is safe to load it. If anything is unclear, we coordinate rather than guess.' },
      { category: 'treatment', q: 'How long does rehab take after a knee or shoulder operation?', a: 'It depends on the procedure, but most major joint surgeries run several months through staged phases. We work to your surgeon’s milestones and give you a clear picture of each phase at the first visit.' },
      { category: 'treatment', q: 'Can you get me back to sport after surgery, not just daily life?', a: 'Yes. Returning to sport is a later, distinct phase of rehabilitation that rebuilds the strength, control, and confidence the activity demands. We carry the plan through to that point rather than stopping at pain-free walking.' },
    ],
  },
  {
    slug: 'workplace-injuries',
    name: 'Workplace Injuries',
    short: 'WorkSafeBC claims and a managed return to work.',
    intro: 'Once your WorkSafeBC claim is open, we coordinate the treatment plan and the reporting, including the documentation for a safe, graded return to your job.',
    relatedServices: ['physiotherapy', 'occupational-therapy', 'kinesiology'],
    insuranceCallout: 'worksafebc',
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
  // Regulatory college, for E-E-A-T. Only set where the body is certain (BC
  // physiotherapists are registered with CPTBC). Not a fabricated number.
  registration?: string
}

export const team: Practitioner[] = [
  {
    slug: 'mary-ghoroghi',
    name: 'Mary Ghoroghi',
    role: 'Registered Physiotherapist',
    credentials: 'Registered Physiotherapist, MSc (PT), CMA, MCPA',
    img: '/images/existing/team-Mary-Gheissari.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Complex and chronic pain', 'Post-surgical rehab', 'Manual therapy'],
    bio: 'Mary founded Azalea in 2011 and still treats most days. She trained at Tehran University of Medical Sciences, holds a master’s in physiotherapy, and is a certified medical acupuncturist who has taught the next generation of clinicians as a placement instructor at the University of Alberta Hospital. Patients come to her for the problems other clinics have only managed: she finds the cause, then explains it in plain language. She treats in English and Farsi.',
    registration: 'Registered with the College of Physical Therapists of British Columbia',
  },
  {
    slug: 'braedan-lalor',
    name: 'Braedan Lalor',
    role: 'Physiotherapist',
    credentials: 'Registered Physiotherapist (PT)',
    img: '/images/existing/team-Braedan.jpg',
    languages: ['English'],
    focus: ['Sports injuries', 'Athletic performance', 'Return to activity'],
    bio: 'Braedan works with active patients who want a clear route back to training and sport. Trained at the University of Alberta with further acupuncture study in Beijing, he has worked alongside professional and national-team athletes, ran the BC Lions’ training centre through their championship years, and is recognised internationally for his work in golf performance. His rehab pairs hands-on treatment with progressive loading, so recovery holds up under real demand.',
    registration: 'Registered with the College of Physical Therapists of British Columbia',
  },
  {
    slug: 'noushin-nouri',
    name: 'Noushin Nouri',
    role: 'Registered Physiotherapist',
    credentials: 'Registered Physiotherapist',
    img: '/images/existing/team-Noushin.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Orthopaedic rehab', 'Neck and back pain', 'ICBC recovery'],
    bio: 'Noushin focuses on orthopaedic and motor-vehicle-accident recovery, guiding patients from the acute, painful stage through to full function. A physiotherapist since 2011 whose career began in Iran before she qualified in Canada, she works through manual therapy and active rehabilitation, and treats in English and Farsi.',
    registration: 'Registered with the College of Physical Therapists of British Columbia',
  },
  {
    slug: 'asal-akbari',
    name: 'Asal Akbari',
    role: 'Registered Clinical Counsellor',
    credentials: 'Registered Clinical Counsellor, MA Psychology',
    img: '/images/existing/team-asal.jpg',
    languages: ['Farsi'],
    focus: ['Cognitive behavioural therapy', 'Pain and stress', 'Recovery support'],
    bio: 'Asal supports patients whose recovery carries a mental and emotional weight, from the strain of a long injury to the anxiety that can follow an accident. She holds a master’s in psychology and works through cognitive behavioural therapy, ACT, and mindfulness. Her sessions are offered in Farsi, by video.',
  },
  {
    slug: 'faranak-shekoohi',
    name: 'Faranak Shekoohi',
    role: 'Kinesiologist',
    credentials: 'Practicing Kinesiologist (BCAK), BSc Physiotherapy',
    img: '/images/existing/team-Faranak-Shekoohi.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Kinesiology and active rehab', 'ICBC programs', 'Strength rebuilding'],
    bio: 'With a physiotherapy degree from Shiraz University and fifteen years in active rehabilitation across two countries, Faranak designs and supervises the exercise programs that turn early recovery into lasting strength. She runs many of our ICBC active-rehab plans, and offers home-based sessions for patients who cannot easily travel.',
  },
  {
    slug: 'kambiz-navirian',
    name: 'Kambiz Navirian',
    role: 'Acupuncture',
    credentials: 'Registered Acupuncturist, MD, Physical Medicine & Rehabilitation',
    img: '/images/existing/team-kambiz.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Pain relief', 'Tension and headaches', 'Integrative care'],
    bio: 'Kambiz brings unusual depth to acupuncture: a physician by training, with a specialization in physical medicine and rehabilitation and more than thirty years of practice, he once led a hospital rehabilitation ward. He treats pain, tension, and headaches with acupuncture, moxibustion, and cupping, integrating it with the physiotherapy running alongside so the two reinforce each other.',
  },
  {
    slug: 'sirus-vakilian',
    name: 'Dr. Sirus Vakilian',
    role: 'Chiropractor',
    credentials: 'Chiropractor (DC), BSc Kinesiology',
    languages: ['English', 'Farsi'],
    focus: ['Chiropractic care', 'Sports injury and rehab', 'Movement assessment'],
    bio: 'Sirus is the clinic’s chiropractor. He holds a kinesiology degree from UBC and a Doctor of Chiropractic from the Canadian Memorial Chiropractic College, and a background in high-level tennis shapes how he treats sport and movement. He works on the structural side of recovery, using adjustment and manual techniques alongside the rest of the team’s plan so the result holds.',
  },
  {
    slug: 'behzad-azari-mobarakeh',
    name: 'Behzad Azari Mobarakeh',
    role: 'Registered Massage Therapist',
    credentials: 'Registered Massage Therapist (RMT)',
    languages: ['English', 'Farsi'],
    focus: ['Therapeutic massage', 'Muscle tension and pain', 'Recovery support'],
    bio: 'Behzad is a registered massage therapist who works alongside the physiotherapy and rehabilitation team. He uses massage to release the muscle tension and soft-tissue restriction that sit behind a lot of pain, so the hands-on and active sides of your recovery reinforce each other rather than work in isolation.',
  },
]

/** Natural-language list of a practitioner's languages: "English", "English and Farsi", "Farsi". */
export function formatLanguages(langs: string[]): string {
  if (langs.length <= 1) return langs[0] ?? ''
  return `${langs.slice(0, -1).join(', ')} and ${langs[langs.length - 1]}`
}

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
  {
    category: 'general',
    q: 'Can I be treated in Farsi?',
    a: 'Yes. Several of our practitioners, across physiotherapy, kinesiology, acupuncture, and counselling, treat in Farsi as well as English. If you would prefer your appointment in Farsi, tell us when you book and we will match you with the right practitioner.',
  },
  {
    category: 'booking',
    q: 'What is your cancellation policy?',
    a: 'We ask that you give as much notice as you can if you need to change or cancel, ideally at least 24 hours, so we can offer the time to someone who is waiting. Repeated late cancellations or missed appointments may be subject to a fee. If something comes up, call your clinic and we will sort it out.',
  },
]

export type Testimonial = {
  quote: string
  name: string
  detail: string
  service?: string
}

// Real 5-star Google reviews (pulled from the clinic's Google Business listing).
// Excerpted to the strongest passage in the reviewer's own words; names as shown
// publicly on Google. `detail` summarizes the context from each review.
export const testimonials: Testimonial[] = [
  {
    quote: 'I visited Azalea with my chronic pain. She was able to diagnose the cause, and with the correct treatments my 5-year lasting pain was gone. Her knowledge and experience are outstanding.',
    name: 'Tomáš Majzel',
    detail: '5-year chronic pain, resolved',
    service: 'physiotherapy',
  },
  {
    quote: 'I struggled with a nagging ankle injury that had significantly decreased my mobility. Mary worked with me to significantly reduce my pain, and gave me exercises to improve my ankle strength and mobility.',
    name: 'Steven Merriman',
    detail: 'ankle injury',
    service: 'physiotherapy',
  },
  {
    quote: 'I had been to several clinics for my torn meniscus, and after three sessions I was able to walk and put more weight on my knee. The physios were very professional and knowledgeable.',
    name: 'Kiana Shahbazi',
    detail: 'torn meniscus recovery',
    service: 'sports-injury',
  },
  {
    quote: 'Braedan was a great help in the physiotherapy process for my son and incredibly helpful in his recovery. He has the skill to bring a physically and mentally injured athlete back to sport, strong and confident.',
    name: 'Maryam Zinati',
    detail: 'son’s sports recovery',
    service: 'sports-injury',
  },
  {
    quote: 'Great staff and professional practitioners. Braedan is an incredible physiotherapist, and Faranak is very knowledgeable and works to strengthen your muscles without pain. Thank you all.',
    name: 'Lili Molavi',
    detail: 'physiotherapy and kinesiology',
    service: 'kinesiology',
  },
  {
    quote: 'This is one of the best physical therapy clinics you might find. Mary knows many techniques that help you long term and short term, and the clinic is beautiful and clean.',
    name: 'Mahsoo Naderi',
    detail: 'physiotherapy',
    service: 'physiotherapy',
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug)
export const practitionerBySlug = (slug: string) => team.find((p) => p.slug === slug)
