import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { SITE, locations, type Faq } from '@/lib/clinic'
import { faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'فیزیوتراپی فارسی‌زبان در وست ونکوور',
  description:
    'کلینیک فیزیوتراپی آزالیا در وست ونکوور؛ تیمی فارسی‌زبان که علت اصلی درد را پیدا می‌کند. بدون نیاز به ارجاع، تسویهٔ مستقیم با ICBC و بیمه‌های تکمیلی، نوبت معمولاً در همان هفته.',
  alternates: {
    canonical: '/fa',
    languages: { 'en-CA': '/', fa: '/fa', 'x-default': '/' },
  },
}

// Farsi disciplines, shown as the "one roof" list. Links go to the English
// service pages by design — the audience is bilingual and we do not mirror the
// whole site in Farsi.
const disciplines = [
  'فیزیوتراپی',
  'فیزیوتراپی ورزشی',
  'ماساژ‌درمانی (RMT)',
  'طب سوزنی',
  'کاردرمانی',
  'کینزیولوژی',
  'کایروپراکتیک',
  'برنامهٔ کاهش وزن',
  'یوگادرمانی',
  'مراقبت از سالمندان',
]

const trust = [
  { h: 'بدون نیاز به ارجاع', p: 'برای فیزیوتراپی در بریتیش کلمبیا به نامهٔ پزشک نیاز ندارید. مستقیم نوبت بگیرید.' },
  { h: 'تسویهٔ مستقیم بیمه', p: 'مستقیم با ICBC، WorkSafeBC و بیشتر بیمه‌های تکمیلی تسویه می‌کنیم.' },
  { h: 'تیم فارسی‌زبان', p: 'چند نفر از درمانگران ما به فارسی و انگلیسی درمان می‌کنند.' },
  { h: 'نوبت در همان هفته', p: 'بیشتر بیماران جدید در همان هفته‌ای که تماس می‌گیرند ویزیت می‌شوند.' },
]

const faqs: Faq[] = [
  {
    category: 'booking',
    q: 'آیا برای فیزیوتراپی به ارجاع پزشک نیاز دارم؟',
    a: 'نه. در بریتیش کلمبیا برای مراجعه به فیزیوتراپیست به نامهٔ پزشک نیاز ندارید و می‌توانید مستقیم نوبت بگیرید. بعضی بیمه‌های تکمیلی پیش از پرداخت خسارت ارجاع می‌خواهند، پس بهتر است شرایط بیمهٔ خودتان را بررسی کنید.',
  },
  {
    category: 'treatment',
    q: 'آیا به فارسی درمان می‌کنید؟',
    a: 'بله. چند نفر از درمانگران ما، از جمله مری قروقی بنیان‌گذار کلینیک، به فارسی و انگلیسی درمان می‌کنند، و می‌توانید کل روند ارزیابی و درمان را به فارسی پیش ببرید.',
  },
  {
    category: 'insurance',
    q: 'آیا ICBC هزینهٔ فیزیوتراپی بعد از تصادف را پوشش می‌دهد؟',
    a: 'بله. ICBC در ۱۲ هفتهٔ اول پس از تصادف تا ۲۵ جلسه فیزیوتراپی را از پیش تأیید کرده است، بدون نیاز به ارجاع. فقط شمارهٔ پروندهٔ خود را بیاورید و ما مستقیم با ICBC تسویه می‌کنیم.',
  },
  {
    category: 'insurance',
    q: 'آیا بیمه را مستقیم تسویه می‌کنید؟',
    a: 'بله. ما مستقیم با ICBC، WorkSafeBC و بیشتر بیمه‌های تکمیلی تسویه می‌کنیم. شما فقط سهمی را که بیمه‌تان پوشش نمی‌دهد پرداخت می‌کنید.',
  },
  {
    category: 'booking',
    q: 'کلینیک‌های شما کجاست؟',
    a: 'دو کلینیک در وست ونکوور داریم، یکی در خیابان ۱۶ و دیگری روی مرین درایو (اوشن واک). هر دو همان خدمات و همان تسویهٔ مستقیم بیمه را ارائه می‌دهند.',
  },
]

export default function FaHome() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />

      {/* Hero */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 lg:px-16 pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[12px] font-medium tracking-[0.1em] text-muted mb-7">وست ونکوور · از سال ۲۰۱۱</p>
          <h1 className="text-[clamp(2.25rem,7vw,4.25rem)] font-light leading-[1.25] text-text mb-8 max-w-[820px]">
            فیزیوتراپی به زبان فارسی، در وست ونکوور.
          </h1>
          <p className="text-[18px] text-text/80 leading-[2] mb-10 max-w-[620px]">
            در آزالیا، تیمی فارسی‌زبان علت اصلی درد شما را پیدا می‌کند، نه فقط نشانه را. بدون نیاز به ارجاع پزشک، با تسویهٔ مستقیم بیمه، و معمولاً نوبت در همان هفته.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href={SITE.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-rose hover:bg-rose-dark text-white text-[13px] font-bold px-9 py-4 transition-colors duration-200 min-h-[48px] no-underline"
            >
              رزرو آنلاین
            </a>
            <a
              href={`tel:${locations[0].tel}`}
              className="inline-flex items-center text-[14px] font-medium text-text hover:text-rose-dark px-3 py-4 transition-colors duration-200 min-h-[48px] no-underline"
            >
              یا تماس بگیرید: <span dir="ltr" className="px-1">{locations[0].telLabel}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold text-[15px]" aria-hidden="true">★★★★★</span>
            <span className="text-[14px] text-text font-medium">امتیاز ۴.۶ از ۵ در گوگل، از بیش از ۸۰ نظر</span>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {trust.map(({ h, p }) => (
            <div key={h}>
              <p className="text-[20px] text-dark-text mb-3 font-medium">{h}</p>
              <p className="text-[14px] text-dark-text/75 leading-[1.9]">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Find the cause */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20">
          <div>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.4] text-text mb-7">
              علت را درمان می‌کنیم، نه فقط درد را.
            </h2>
          </div>
          <div>
            <p className="text-[18px] text-text leading-[2] mb-6">
              مری قروقی، بنیان‌گذار آزالیا، به این شناخته می‌شود که وقتی کلینیک‌های دیگر فقط نشانه را درمان کرده‌اند، او علت اصلی مشکل را پیدا می‌کند و آن را به زبانی ساده توضیح می‌دهد. همین معیار، استاندارد کل کلینیک است.
            </p>
            <p className="text-[16px] text-muted leading-[2]">
              چون کلینیک چندتخصصی است، فیزیوتراپی، طب سوزنی، کینزیولوژی و ماساژ‌درمانی همگی زیر یک سقف کار می‌کنند. برنامهٔ درمان شما بدون ارجاع تازه یا نوبت جدید بین این تخصص‌ها جابه‌جا می‌شود.
            </p>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.3] text-text mb-4">یازده تخصص، زیر یک سقف.</h2>
          <p className="text-[16px] text-muted leading-[2] mb-10 max-w-[620px]">
            بیشتر کلینیک‌ها به محض پیچیده‌شدن مشکل شما را جای دیگری می‌فرستند. ما این کار را نمی‌کنیم.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px list-none" style={{ background: 'var(--color-border)' }}>
            {disciplines.map((d) => (
              <li key={d} className="bg-stone p-6 text-[16px] text-text leading-[1.6]">{d}</li>
            ))}
          </ul>
          <Link href="/services" className="inline-block mt-8 text-[14px] font-medium text-text hover:text-rose-dark no-underline transition-colors">
            دیدن همهٔ خدمات (انگلیسی) →
          </Link>
        </div>
      </section>

      {/* ICBC band */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[12px] font-medium tracking-[0.1em] text-gold mb-4">تصادف کرده‌اید؟</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-light leading-[1.4] text-dark-text mb-5 max-w-[680px]">
            ICBC هزینهٔ فیزیوتراپی شما را پوشش می‌دهد.
          </h2>
          <p className="text-[16px] text-dark-text/75 leading-[2] mb-7 max-w-[620px]">
            بعد از تصادف رانندگی، ICBC در ۱۲ هفتهٔ اول تا ۲۵ جلسه فیزیوتراپی را بدون نیاز به ارجاع پوشش می‌دهد. فقط شمارهٔ پرونده را بیاورید و ما مستقیم تسویه می‌کنیم.
          </p>
          <Link href="/fa/icbc" className="text-[14px] font-bold text-dark-text hover:text-gold no-underline transition-colors">
            راهنمای کامل ICBC به فارسی →
          </Link>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.3] text-text mb-12">دو کلینیک در وست ونکوور.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc, i) => (
              <div key={loc.slug} className="bg-stone p-8 sm:p-10">
                <p className="text-[22px] font-medium text-text mb-5">
                  {i === 0 ? 'کلینیک خیابان ۱۶' : 'کلینیک اوشن واک'}
                </p>
                <div className="text-[15px] text-muted leading-[2] mb-7" dir="ltr" style={{ textAlign: 'right' }}>
                  <p>{loc.street}</p>
                  <p>{loc.city} {loc.postal}</p>
                  <a href={`tel:${loc.tel}`} className="block text-text font-semibold no-underline hover:text-rose-dark transition-colors mt-1">
                    {loc.telLabel}
                  </a>
                </div>
                <a
                  href={SITE.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-rose hover:bg-rose-dark text-white text-[12px] font-bold px-7 py-3.5 transition-colors duration-200 min-h-[44px] no-underline"
                >
                  رزرو نوبت
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <div>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.3] text-text mb-5">سؤال‌های پرتکرار</h2>
            <p className="text-[15px] text-muted leading-[2]">آنچه بیماران بیش از همه پیش از اولین ویزیت می‌پرسند.</p>
          </div>
          <dl style={{ borderTop: '1px solid var(--color-border)' }}>
            {faqs.map((f, i) => (
              <div key={i} className="py-7" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <dt className="text-[19px] font-medium text-text leading-[1.7] mb-3">{f.q}</dt>
                <dd className="text-[16px] text-muted leading-[2]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-24 md:py-28">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.3] text-dark-text mb-7">
            بیایید بفهمیم مشکل واقعاً چیست.
          </h2>
          <p className="text-[16px] text-dark-text/80 leading-[2] mb-10 max-w-[480px] mx-auto">
            بدون ارجاع، بدون پرداخت اولیه برای سهم بیمه، و معمولاً نوبت در همان هفته. آنلاین رزرو کنید یا با نزدیک‌ترین کلینیک تماس بگیرید.
          </p>
          <a
            href={SITE.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-rose hover:bg-rose-dark text-white text-[13px] font-bold px-12 py-5 transition-colors duration-200 mb-8 min-h-[52px] no-underline"
          >
            رزرو آنلاین
          </a>
          <p className="text-[14px] text-dark-text/65" dir="ltr">
            16th Street <a href={`tel:${locations[0].tel}`} className="text-dark-text font-medium no-underline hover:text-gold transition-colors">{locations[0].telLabel}</a>
            <span className="px-3 text-dark-text/30">·</span>
            Ocean Walk <a href={`tel:${locations[1].tel}`} className="text-dark-text font-medium no-underline hover:text-gold transition-colors">{locations[1].telLabel}</a>
          </p>
        </div>
      </section>
    </>
  )
}
