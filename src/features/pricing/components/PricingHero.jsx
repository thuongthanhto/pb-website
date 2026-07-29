import Link from 'next/link'
import { normalizeLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function PricingHero({ locale }) {
  const current = normalizeLocale(locale)
  const dict = getDictionary(current)
  const t = dict.pricing.hero

  return (
    <section className="w-full py-8 lg:py-12 flex justify-center">
      <div className="flex w-full max-w-[1280px] flex-col px-4 md:px-10">
        <div className="@container">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPJ3eOZWpf93pExTuCmR5D_RaZnU2Bqu22hJlocm6M7CjTpGO61eLmKd6qlpWCrbz1V7arqbd0ogiojXDdhnKGWvxTAqxMhn3QcO8tX-KIFGimrEovLMwaOkH5-vD17v8bMEKb66rxZs_glNO78xxyu9lhCBEORipr9Jpz1N8QuESx6NmRGbbf172GeCwvDYWcdMVpUrjaZqFWFEx3RvIDE1GNGI0vSHpiR53Li3XZ2oKu-PRGNsSSP6MqUhZqCFKqWB7jbGP4xTQ")`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            <div className="relative z-10 flex min-h-[400px] flex-col gap-6 items-start justify-center p-8 lg:p-16 text-left">
              <div className="flex flex-col gap-4 max-w-2xl">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/30 w-fit">
                  {t.badge}
                </span>
                <h1 className="text-white text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
                  {t.title}
                </h1>
                <p className="text-stone-100 text-base lg:text-lg font-medium leading-relaxed max-w-lg text-shadow-sm">
                  {t.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <a href="tel:+84909383332" className="flex h-12 px-6 lg:px-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-stone-800 text-primary text-base font-bold transition-all hover:bg-stone-700 shadow-lg">
                  <span>{dict.common.cta.consultNow}</span>
                </a>
                <Link href={localePath(current, '/albums')} className="flex h-12 px-6 lg:px-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-black/30 backdrop-blur-md border border-white/30 text-white text-base font-bold transition-all hover:bg-black/50 hover:border-white/50">
                  <span>{dict.common.cta.viewPortfolio}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
