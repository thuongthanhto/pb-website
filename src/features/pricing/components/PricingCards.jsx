import { Reveal } from '@/components/motion/Reveal'
import { Icon } from '@/components/Icon'
import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

// Gói nào được highlight là quyết định về layout, không phải nội dung -> để ở
// code thay vì dictionary (tránh 2 bản dịch lệch nhau).
const FEATURED_INDEX = 1

export function PricingCards({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).pricing.cards

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
            return (
              <Reveal
                key={idx}
                delay={idx * 0.1}
                className={`relative flex flex-col gap-6 rounded-3xl p-8 transition-all duration-300 ${
                  featured
                    ? 'border-2 border-primary bg-stone-800/50 shadow-xl shadow-primary/10 hover:-translate-y-1'
                    : 'border border-border-light bg-stone-800/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1'
                }`}
              >
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg shadow-primary/20 flex items-center gap-1">
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
                  <p className={`text-sm mt-2 leading-relaxed font-medium ${featured ? 'text-text-secondary' : 'text-stone-400'}`}>
                    {pkg.description}
                  </p>
                </div>
                <hr className={featured ? 'border-dashed border-border-light' : 'border-border-light'} />
                <ul className="flex flex-col gap-3 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${featured ? 'text-text-main font-semibold' : 'text-text-secondary'}`}>
                      <Icon name="check_circle" className="text-primary text-[20px] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+84909383332"
                  className={`w-full h-12 flex items-center justify-center rounded-xl text-base font-bold transition-all mt-auto ${
                    featured
                      ? 'bg-primary text-white h-14 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30'
                      : 'bg-stone-700 border border-stone-600 text-stone-200 hover:bg-stone-600 hover:text-white'
                  }`}
                >
                  {pkg.buttonText}
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
