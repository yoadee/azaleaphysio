import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { SITE, locations, type Faq } from '@/lib/clinic'
import { faqPageSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'فیزیوتراپی ICBC به زبان فارسی در وست ونکوور',
  description:
    'بعد از تصادف رانندگی، ICBC در ۱۲ هفتهٔ اول تا ۲۵ جلسه فیزیوتراپی را بدون نیاز به ارجاع پوشش می‌دهد. ما مستقیم با ICBC تسویه می‌کنیم. راهنمای کامل به زبان فارسی.',
  alternates: {
    canonical: '/fa/icbc',
    languages: { 'en-CA': '/icbc', fa: '/fa/icbc' },
  },
}

const steps = [
  { name: 'تصادف را به ICBC گزارش دهید', text: 'با تماس تلفنی یا به‌صورت آنلاین یک پرونده باز کنید و شمارهٔ پرونده دریافت می‌کنید. این کار را خودتان می‌توانید انجام دهید؛ به وکیل یا پزشک نیاز ندارید.' },
  { name: 'نوبت فیزیوتراپی بگیرید', text: 'با هر یک از دو کلینیک تماس بگیرید یا آنلاین رزرو کنید. به ارجاع پزشک نیاز نیست و لازم نیست منتظر تأیید کارشناس بیمه بمانید.' },
  { name: 'شمارهٔ پرونده را همراه بیاورید', text: 'شمارهٔ پروندهٔ ICBC و تاریخ تصادف را به اولین جلسه بیاورید. همین برای تسویهٔ مستقیم با ICBC کافی است.' },
  { name: 'درمان از همان روز شروع می‌شود', text: 'فیزیوتراپیست آسیب را ارزیابی می‌کند، یافته‌ها را توضیح می‌دهد و درمان در همان جلسهٔ اول آغاز می‌شود. کارهای اداری ICBC را ما انجام می‌دهیم.' },
]

const covered = [
  { label: 'جلسات از پیش تأییدشده', value: '۲۵ جلسه فیزیوتراپی در ۱۲ هفتهٔ اول' },
  { label: 'ارجاع', value: 'لازم نیست، فقط شمارهٔ پرونده' },
  { label: 'پرداخت اولیه', value: 'برای سهم تحت پوشش هیچ، مستقیم با ICBC تسویه می‌شود' },
  { label: 'پوشش دیگر', value: 'توان‌بخشی فعال (کینزیولوژی) و طب سوزنی در برنامهٔ شما' },
]

const faqs: Faq[] = [
  { category: 'insurance', q: 'ICBC چند جلسه فیزیوتراپی را پوشش می‌دهد؟', a: 'ICBC در ۱۲ هفتهٔ اول پس از تصادف تا ۲۵ جلسه فیزیوتراپی را برای هر کسی که در تصادف رانندگی در بریتیش کلمبیا آسیب دیده، فارغ از اینکه مقصر چه کسی بوده، از پیش تأیید می‌کند. اگر به درمان بیشتری نیاز باشد، فیزیوتراپیست از طرف شما درخواست تمدید می‌دهد.' },
  { category: 'insurance', q: 'آیا برای شروع به ارجاع پزشک نیاز دارم؟', a: 'نه. با ICBC Enhanced Care می‌توانید فقط با شمارهٔ پرونده فیزیوتراپی را شروع کنید، بدون ارجاع پزشک و بدون انتظار برای تأیید کارشناس. بازهٔ ۱۲ هفته از روز تصادف شروع می‌شود، پس بهتر است زود نوبت بگیرید.' },
  { category: 'insurance', q: 'آیا باید مبلغی از پیش پرداخت کنم؟', a: 'نه. ما برای جلسات تحت پوشش مستقیم با ICBC تسویه می‌کنیم، پس برای سهم تحت پوشش چیزی از پیش پرداخت نمی‌کنید. فقط شمارهٔ پرونده را به اولین جلسه بیاورید.' },
  { category: 'insurance', q: 'چقدر بعد از تصادف باید شروع کنم؟', a: 'هرچه زودتر بهتر. ۲۵ جلسهٔ از پیش تأییدشده در بازهٔ ۱۲ هفته‌ای قرار دارد که از روز تصادف آغاز می‌شود، و آسیب‌های بافت نرم مثل ضربهٔ شلاقی (whiplash) به درمان زودهنگام بهتر از استراحت پاسخ می‌دهند.' },
  { category: 'treatment', q: 'چه آسیب‌هایی را بعد از تصادف درمان می‌کنید؟', a: 'بیشتر ضربهٔ شلاقی و درد گردن، کمردرد، سردرد و کشیدگی‌های بافت نرم در شانه، زانو و دیگر مفاصل. علت را ارزیابی می‌کنیم، درد را درمان می‌کنیم و قدرت و حرکت را بازمی‌سازیم تا مشکل باقی نماند یا برنگردد.' },
  { category: 'insurance', q: 'آیا کینزیولوژی یا درمان‌های دیگر هم تحت پروندهٔ من پوشش دارد؟', a: 'اغلب بله. ICBC توان‌بخشی فعال (کینزیولوژی)، طب سوزنی و درمان‌های دیگر را هم در برنامهٔ شما پوشش می‌دهد. چون کلینیک چندتخصصی است، فیزیوتراپیست می‌تواند همه را زیر یک برنامهٔ هماهنگ بیاورد.' },
]

export default function FaIcbc() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={howToSchema('چگونه فیزیوتراپی ICBC را در وست ونکوور شروع کنیم', steps)} />

      {/* Hero */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 lg:px-16 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-[1100px] mx-auto">
          <nav className="text-[13px] text-muted mb-8">
            <Link href="/fa" className="hover:text-text no-underline transition-colors">خانه</Link>
            <span className="px-2 text-muted/50">/</span>
            <span className="text-text">فیزیوتراپی ICBC</span>
          </nav>
          <p className="text-[12px] font-medium tracking-[0.1em] text-muted mb-4">بعد از تصادف رانندگی</p>
          <h1 className="text-[clamp(2rem,5.5vw,3.5rem)] font-light leading-[1.3] text-text mb-7 max-w-[820px]">
            فیزیوتراپی ICBC در وست ونکوور.
          </h1>
          <p className="text-[18px] text-text/80 leading-[2] mb-9 max-w-[640px]">
            تصادف کرده‌اید؟ ICBC در ۱۲ هفتهٔ اول تا ۲۵ جلسه فیزیوتراپی را بدون نیاز به ارجاع پوشش می‌دهد. شمارهٔ پرونده را بیاورید و ما مستقیم با ICBC تسویه می‌کنیم، پس برای جلسات تحت پوشش چیزی از پیش پرداخت نمی‌کنید.
          </p>
          <div className="flex flex-wrap items-center gap-4">
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
        </div>
      </section>

      {/* What's covered */}
      <section className="bg-bg px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20">
          <div>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.4] text-text mb-7">ICBC چه چیزی را پوشش می‌دهد</h2>
            <p className="text-[18px] text-text leading-[2] mb-6">
              بعد از تصادف رانندگی در بریتیش کلمبیا، برنامهٔ Enhanced Care در ICBC برای هر کسی که آسیب دیده، فارغ از اینکه مقصر چه کسی بوده، ۲۵ جلسه فیزیوتراپی را در ۱۲ هفتهٔ اول پوشش می‌دهد. برای شروع به نامهٔ پزشک یا تأیید کارشناس نیاز ندارید؛ فقط یک شمارهٔ پرونده کافی است.
            </p>
            <p className="text-[16px] text-muted leading-[2]">
              بازهٔ ۱۲ هفته از روز تصادف شروع می‌شود، پس هرچه زودتر نوبت بگیرید، از پوشش خود بیشتر استفاده می‌کنید و آسیب‌های بافت نرم بهتر پاسخ می‌دهند. اگر به درمان بیشتری نیاز داشته باشید، تمدید را از طرف شما درخواست می‌کنیم. ICBC توان‌بخشی فعال و طب سوزنی را هم در برنامهٔ شما پوشش می‌دهد که همه را زیر یک سقف هماهنگ می‌کنیم.
            </p>
          </div>
          <aside className="md:sticky md:top-12 md:self-start">
            <p className="text-[12px] font-medium tracking-[0.1em] text-muted mb-6">در یک نگاه</p>
            <dl style={{ borderTop: '1px solid var(--color-border)' }}>
              {covered.map((f) => (
                <div key={f.label} className="py-4 flex flex-col gap-1" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <dt className="text-[13px] text-muted">{f.label}</dt>
                  <dd className="text-[15px] text-text leading-[1.7]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* How to start */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[560px] mb-14 md:mb-20">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.4] text-dark-text mb-6">چطور شروع کنیم</h2>
            <p className="text-[16px] text-dark-text/75 leading-[2]">
              چهار قدم از تصادف تا درمان. بیشتر بیماران ظرف همان هفته برای اولین نوبت می‌آیند.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 list-none">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-6">
                <span className="text-[22px] font-light text-gold leading-none pt-1 shrink-0" aria-hidden="true">
                  {['۰۱', '۰۲', '۰۳', '۰۴'][i]}
                </span>
                <div className="pt-4 grow" style={{ borderTop: '1px solid rgba(237,233,228,0.14)' }}>
                  <h3 className="text-[20px] font-medium text-dark-text mb-2">{step.name}</h3>
                  <p className="text-[15px] text-dark-text/70 leading-[1.9]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone px-6 sm:px-10 md:px-14 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20">
          <div className="md:sticky md:top-12 md:self-start">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-[1.3] text-text mb-5">سؤال‌های ICBC</h2>
            <p className="text-[15px] text-muted leading-[2] mb-6">آنچه بیماران بیش از همه بعد از تصادف می‌پرسند.</p>
            <a href={`tel:${locations[0].tel}`} className="text-[14px] text-text no-underline hover:text-rose-dark transition-colors">
              سؤال دیگری دارید؟ تماس بگیرید: <span dir="ltr">{locations[0].telLabel}</span>
            </a>
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

      {/* CTA */}
      <section className="bg-dark px-6 sm:px-10 md:px-14 py-24 md:py-28">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-light leading-[1.4] text-dark-text mb-7">
            درمان ICBC خود را همین هفته شروع کنید.
          </h2>
          <p className="text-[16px] text-dark-text/80 leading-[2] mb-10 max-w-[480px] mx-auto">
            شمارهٔ پرونده را بیاورید، بقیه با ماست. بدون ارجاع، بدون پرداخت اولیه برای جلسات تحت پوشش، و معمولاً نوبت در همان هفته.
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
