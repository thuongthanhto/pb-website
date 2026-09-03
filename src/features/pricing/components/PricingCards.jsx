import { Reveal } from '@/components/motion/Reveal'
import { Icon } from '@/components/Icon'
import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { BookingButton } from '@/components/BookingButton'
import { HaggleButton } from './HaggleButton'

// Gói nào được highlight là quyết định về layout, không phải nội dung -> để ở
// code thay vì dictionary (tránh 2 bản dịch lệch nhau).
const FEATURED_INDEX = 1

// Chỉ 2 gói Pre-Wedding cho trả giá. 2 gói phóng sự 12tr đã sát đáy, mở mặc cả
// ở đó chỉ ăn vào biên lợi nhuận chứ không đổi được quyết định của khách.
const HAGGLE_INDEXES = [0, 1]

// Sàn giảm giá theo ngày chụp: ngày trống thì nhả sâu hơn. Đây là bán capacity
// còn dư (như vé máy bay), không phải phá giá niêm yết.
const HAGGLE_FLOORS = { weekday: 0.85, weekend: 0.94, unsure: 0.9 }

/** "15.000.000đ" / "15,000,000 VND" -> 15000000. Không parse được thì trả null. */
function parsePrice(text) {
  const digits = String(text).replace(/\D/g, '')
  const value = Number(digits)
  return digits && Number.isFinite(value) && value > 0 ? value : null
}

export function PricingCards({ locale }) {
  const lang = normalizeLocale(locale)
  const dict = getDictionary(lang)
  const t = dict.pricing.cards
  const haggle = dict.pricing.haggle
  const booking = dict.common.booking

  return (
    <section className="w-full pb-20 pt-8 flex justify-center">
      <div className="w-full max-w-[1280px] px-4 md:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-text-main tracking-tight">
            {t.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          {t.packages.map((pkg, idx) => {
            const featured = idx === FEATURED_INDEX
            const basePrice = HAGGLE_INDEXES.includes(idx) ? parsePrice(pkg.price) : null
            return (
              <Reveal
                key={idx}
                delay={idx * 0.1}
                className={`relative flex flex-col gap-6 rounded-3xl p-8 transition-all duration-300 ${
                  featured
                    ? 'border-2 border-primary bg-surface/50 shadow-xl shadow-primary/10 hover:-translate-y-1'
                    : 'border border-border bg-surface/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1'
                }`}
              >
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded-full text-xs font-bold text-on-primary uppercase tracking-wider shadow-lg shadow-primary/20 flex items-center gap-1">
                    <Icon name="stars" className="text-[16px]" />
                    {t.mostLoved}
                  </div>
                )}
                <div className={`flex flex-col gap-2 ${featured ? 'mt-2' : ''}`}>
                  <h3 className={`text-xl font-bold min-h-[3.5rem] flex items-end ${featured ? 'text-primary' : 'text-text-main'}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 text-text-main">
                    <span className="text-4xl font-extrabold tracking-tighter tabular-nums">{pkg.price}</span>
                  </div>
                  <p className={`text-sm mt-2 leading-relaxed font-medium ${featured ? 'text-text-secondary' : 'text-text-secondary'}`}>
                    {pkg.description}
                  </p>
                </div>
                <hr className={featured ? 'border-dashed border-border' : 'border-border'} />
                <ul className="flex flex-col gap-3 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${featured ? 'text-text-main font-semibold' : 'text-text-secondary'}`}>
                      <Icon name="check_circle" className="text-primary text-[20px] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-2">
                  <BookingButton
                    t={booking}
                    label={pkg.buttonText}
                    context={pkg.name}
                    source={`pricing-card-${idx}`}
                    className={`w-full h-12 flex items-center justify-center rounded-xl text-base font-bold transition-all ${
                      featured
                        ? 'bg-primary text-on-primary h-14 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30'
                        : 'bg-surface-raised border border-border-strong text-text-main hover:bg-surface-strong'
                    }`}
                  />
                  {basePrice && (
                    <HaggleButton
                      t={haggle}
                      locale={lang}
                      storageKey={String(idx)}
                      packageName={pkg.name}
                      basePrice={basePrice}
                      floors={HAGGLE_FLOORS}
                      gifts={haggle.gifts}
                    />
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
