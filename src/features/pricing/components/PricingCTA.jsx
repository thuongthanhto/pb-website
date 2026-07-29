import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function PricingCTA({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).pricing.cta

  return (
    <section className="w-full py-20 flex justify-center relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-700/60 before:to-transparent">
      <div className="w-full max-w-[800px] px-4 md:px-10 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-text-main">{t.title}</h2>
        <p className="text-text-secondary text-lg font-medium max-w-2xl">
          {t.description}
        </p>
        <a href="tel:+84909383332" className="mt-4 flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-10 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-105 transition-all">
          <span className="truncate">{t.button}</span>
        </a>
      </div>
    </section>
  )
}
