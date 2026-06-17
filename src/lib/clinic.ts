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
  reviewCount: '75+',
  tagline: 'Multidisciplinary physiotherapy, rooted on the North Shore since 2011.',
}

export type Location = {
  slug: string
  name: string
  street: string
  city: string
  postal: string
  tel: string
  telLabel: string
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
    hours: [
      { days: 'Mon to Fri', time: '8:30am to 7pm' },
      { days: 'Saturday', time: '9am to 3pm' },
    ],
    maps: 'https://maps.google.com/?q=1884+Marine+Drive+West+Vancouver+BC',
    area: 'West side, Marine Drive',
  },
]

export const insurers = [
  'ICBC',
  'WorkSafeBC',
  'Pacific Blue Cross',
  'Sun Life',
  'Manulife',
  'Canada Life',
  'Green Shield',
  'Desjardins',
]

export type Service = {
  slug: string
  name: string
  excerpt: string
  whoThisHelps: string[]
  whatWeDo: string
  relatedConditions: string[]
}

export const services: Service[] = [
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    excerpt: 'Physiotherapy in West Vancouver for back pain, joint injuries, and recovery after surgery, with no referral needed.',
    whoThisHelps: [
      'You are in pain after an injury, surgery, or accident and want it properly assessed.',
      'A nagging ache in your back, neck, knee, or shoulder is not settling on its own.',
      'You have been told to rest it, and resting has not worked.',
    ],
    whatWeDo: 'We assess the injury to find the cause, not just the sore spot, then treat it with hands-on therapy, targeted exercise, and a plan you can follow at home. Most patients leave the first visit knowing what is wrong and what comes next.',
    relatedConditions: ['back-neck-pain', 'knee-pain', 'shoulder-injuries', 'post-surgical-rehab'],
  },
  {
    slug: 'sports-injury',
    name: 'Sports Injury',
    excerpt: 'Sports injury physiotherapy in West Vancouver for sprains, strains, and a safe return to your sport.',
    whoThisHelps: [
      'You have sprained, strained, or torn something and want back in the game.',
      'A recurring injury keeps flaring up every season.',
      'You are training toward an event and something has started to hurt.',
    ],
    whatWeDo: 'We treat the injury, then rebuild the strength and movement that prevent the next one. Your plan is built around your sport and your timeline, so the goal is not just pain-free, it is match-ready.',
    relatedConditions: ['sports-injuries', 'knee-pain', 'shoulder-injuries'],
  },
  {
    slug: 'acupuncture',
    name: 'Acupuncture',
    excerpt: 'Acupuncture in West Vancouver for pain, tension, and recovery, offered alongside physiotherapy under one roof.',
    whoThisHelps: [
      'Persistent pain or muscle tension has not fully responded to other treatment.',
      'You get frequent tension headaches or stiffness.',
      'You want a drug-free option to add to your recovery plan.',
    ],
    whatWeDo: 'A registered practitioner places fine needles at specific points to ease pain and release muscle tension. We often pair it with physiotherapy in the same plan, so the two treatments reinforce each other.',
    relatedConditions: ['headaches-jaw-pain', 'back-neck-pain', 'arthritis-joint-pain'],
  },
  {
    slug: 'occupational-therapy',
    name: 'Occupational Therapy',
    excerpt: 'Occupational therapy in West Vancouver to help you return to daily life, work, and independence after injury or illness.',
    whoThisHelps: [
      'An injury or condition is making everyday tasks hard at home or work.',
      'You are recovering and need your environment adapted to manage safely.',
      'You are navigating an ICBC or WorkSafeBC claim that involves daily function.',
    ],
    whatWeDo: 'We assess how you manage day to day, then adapt the task, the tools, or the space so you can do it more safely and independently. The focus is practical: getting you back to the things your day actually requires.',
    relatedConditions: ['workplace-injuries', 'car-accident-icbc', 'balance-mobility'],
  },
  {
    slug: 'kinesiology',
    name: 'Kinesiology',
    excerpt: 'Kinesiology in West Vancouver. Supervised, active rehab that rebuilds strength and movement after injury.',
    whoThisHelps: [
      'You have finished hands-on treatment and need to rebuild strength.',
      'You want a structured exercise program supervised by a professional.',
      'You are managing an ICBC active-rehab plan.',
    ],
    whatWeDo: 'A kinesiologist designs and supervises an exercise program built around your injury and goals, correcting movement as you go. It is the active half of recovery, the part that makes results last after the pain is gone.',
    relatedConditions: ['post-surgical-rehab', 'car-accident-icbc', 'sports-injuries'],
  },
  {
    slug: 'osteopathy',
    name: 'Osteopathy',
    excerpt: 'Osteopathy in West Vancouver. Whole-body manual therapy for pain, stiffness, and restricted movement.',
    whoThisHelps: [
      'Pain or stiffness that seems connected across more than one area.',
      'You respond well to hands-on, whole-body treatment.',
      'Other approaches have helped but not fully resolved the problem.',
    ],
    whatWeDo: 'An osteopath uses hands-on techniques to ease restriction and improve how your body moves as a whole, rather than treating one joint in isolation. It complements physiotherapy well, and we often run the two together.',
    relatedConditions: ['back-neck-pain', 'arthritis-joint-pain', 'headaches-jaw-pain'],
  },
  {
    slug: 'chiropractic',
    name: 'Chiropractic',
    excerpt: 'Chiropractic care in West Vancouver for back pain, neck pain, and joint function.',
    whoThisHelps: [
      'Back or neck pain that affects how you move through the day.',
      'Recurring joint stiffness or restricted range of motion.',
      'You prefer manual adjustment as part of your care.',
    ],
    whatWeDo: 'A chiropractor assesses your spine and joints, then uses adjustment and manual techniques to improve movement and reduce pain. Because we are multidisciplinary, your chiropractic care can sit alongside physiotherapy in a single plan.',
    relatedConditions: ['back-neck-pain', 'arthritis-joint-pain'],
  },
  {
    slug: 'weight-loss',
    name: 'Weight Loss Program',
    excerpt: 'A clinician-led weight loss program in West Vancouver, built on movement, structure, and realistic goals.',
    whoThisHelps: [
      'You want to lose weight in a way that is supervised, not guesswork.',
      'A previous injury or joint pain makes exercise feel risky.',
      'You want a plan tied to your physical health, not a fad.',
    ],
    whatWeDo: 'Our practitioners build a program around safe, progressive movement and sustainable structure, accounting for any injuries or limitations you have. The aim is steady, lasting change, not a crash diet.',
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
    ],
    whatWeDo: 'This is not a class. A practitioner adapts yoga to your specific body and recovery goals, using breath, posture, and movement to build mobility and ease tension. It works well as a bridge between active rehab and everyday life.',
    relatedConditions: ['back-neck-pain', 'arthritis-joint-pain', 'balance-mobility'],
  },
  {
    slug: 'elderly-care',
    name: 'Elderly Care',
    excerpt: 'The Enhanced Care Program in West Vancouver. Physiotherapy for seniors focused on mobility, balance, and independence.',
    whoThisHelps: [
      'An older adult who wants to stay mobile and independent at home.',
      'Recovery is needed after a fall, fracture, or hospital stay.',
      'Balance or strength has declined and falls are a worry.',
    ],
    whatWeDo: 'Our Enhanced Care Program tailors physiotherapy to older adults, working on balance, strength, and confident movement to reduce falls and protect independence. We coordinate care around the realities of aging, recovery, and daily life at home.',
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
    role: 'Registered Physiotherapist, Owner',
    credentials: 'Registered Physiotherapist, CPTBC',
    img: '/images/existing/team-Mary-Gheissari.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Complex and chronic pain', 'Post-surgical rehab', 'Manual therapy'],
    bio: 'Mary founded Azalea in 2011 and still treats patients most days. She is known for finding the cause of a problem when other clinics have only treated the symptom, and for explaining what she finds in language that makes sense. She treats in both English and Farsi.',
  },
  {
    slug: 'braedan-lalor',
    name: 'Braedan Lalor',
    role: 'Physiotherapist',
    credentials: 'Registered Physiotherapist, CPTBC',
    img: '/images/existing/team-Braedan.jpg',
    languages: ['English'],
    focus: ['Sports injuries', 'Manual therapy', 'Return to activity'],
    bio: 'Braedan works with active patients who want a clear path back to training and sport. His approach pairs hands-on treatment with progressive loading, so recovery holds up under real-world demands.',
  },
  {
    slug: 'mehdi-tafreshi',
    name: 'Mehdi Tafreshi',
    role: 'Osteopath',
    credentials: 'Osteopathic Manual Practitioner',
    img: '/images/existing/team-mehdi-tafreshi.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Whole-body manual therapy', 'Chronic stiffness', 'Postural pain'],
    bio: 'Mehdi treats the body as a connected system rather than a set of separate joints. Patients come to him for stubborn, multi-area pain that has not resolved with a single-region approach.',
  },
  {
    slug: 'noushin-nouri',
    name: 'Noushin Nouri',
    role: 'Registered Physiotherapist',
    credentials: 'Registered Physiotherapist, CPTBC',
    img: '/images/existing/team-Noushin.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Orthopaedic rehab', 'Neck and back pain', 'ICBC recovery'],
    bio: 'Noushin focuses on orthopaedic and motor-vehicle-accident recovery, guiding patients from the acute, painful stage through to full function. She treats in English and Farsi.',
  },
  {
    slug: 'ali-shafiei',
    name: 'Ali Shafiei',
    role: 'Sports & MSK Physiotherapy',
    credentials: 'Registered Physiotherapist, CPTBC',
    img: '/images/existing/team-Ali-Shafiei.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Sports and musculoskeletal injuries', 'Neurological rehab', 'Performance'],
    bio: 'Ali treats across sports, musculoskeletal, and neurological cases, with a particular interest in getting athletes back to performance. He builds rehab that respects the timeline of the sport, not just the injury.',
  },
  {
    slug: 'asal',
    name: 'Asal',
    role: 'CBT & Psychotherapy',
    credentials: 'Registered Clinical Counsellor',
    img: '/images/existing/team-asal.jpg',
    languages: ['English', 'Farsi'],
    focus: ['Cognitive behavioural therapy', 'Pain and stress', 'Recovery support'],
    bio: 'Asal supports patients whose recovery has a mental and emotional side, from the stress of a long injury to the anxiety that can follow an accident. Her counselling sits naturally alongside physical treatment.',
  },
  {
    slug: 'faranak-shekoohi',
    name: 'Faranak Shekoohi',
    role: 'Kinesiologist',
    credentials: 'Registered Kinesiologist, BCAK',
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
    bio: 'Kambiz brings a medical background to his acupuncture practice, treating pain, tension, and headaches in a way that integrates with the physiotherapy plans running alongside it.',
  },
  {
    slug: 'sirus-vakilian',
    name: 'Dr. Sirus Vakilian',
    role: 'Kinesiology',
    credentials: 'Kinesiologist',
    languages: ['English', 'Farsi'],
    focus: ['Exercise prescription', 'Movement assessment', 'Conditioning'],
    bio: 'Sirus works on the conditioning side of recovery, assessing movement and prescribing exercise that rebuilds capacity safely. He helps patients close the gap between out of pain and back to full activity.',
  },
  {
    slug: 'ramin-keshmiri',
    name: 'Ramin Keshmiri',
    role: 'Acupuncture',
    credentials: 'Registered Acupuncturist',
    languages: ['English', 'Farsi'],
    focus: ['Acupuncture', 'Chronic pain', 'Stress and sleep'],
    bio: 'Ramin treats chronic pain, stress, and sleep through acupuncture, often as one part of a broader plan that the rest of the team contributes to.',
  },
  {
    slug: 'azam-hosseini',
    name: 'Dr. Azam Hosseini',
    role: 'Psychiatry',
    credentials: 'Psychiatrist, MD',
    languages: ['English', 'Farsi'],
    focus: ['Psychiatric assessment', 'Mental health', 'Recovery and wellbeing'],
    bio: 'Dr. Hosseini provides psychiatric assessment and support for patients whose health and recovery have a mental health dimension, completing the range of care available under one roof.',
  },
  {
    slug: 'melina-raad',
    name: 'Melina Raad',
    role: 'Office Manager',
    credentials: 'Clinic Office Manager',
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
    a: 'Yes. We bill ICBC, WorkSafeBC, and the major extended health plans directly, so you pay only the portion your plan does not cover, rather than the full fee followed by a wait for reimbursement.',
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
    quote: 'Mary found what three other physiotherapists had missed and had me back on the slopes in six weeks. She did not treat the symptom. She went looking for the cause.',
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
