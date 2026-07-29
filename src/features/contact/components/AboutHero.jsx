import Link from 'next/link'
import { normalizeLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function AboutHero({ locale }) {
  const current = normalizeLocale(locale)
  const dict = getDictionary(current)
  const t = dict.contact.hero

  return (
    <div className="w-full">
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1280px] px-4 md:px-10">
          <div
            className="flex min-h-[500px] flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center p-8 relative overflow-hidden group shadow-lg"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAw19dMU6z3tscwtrLXiVro7Twovw9-bhygYQTGtBoOOV0uNywUODIyBG6ZTphlsBbttifkIgtBOjR7hRTdIl_9hZC0CRZ8JC3FrU8qrTOFYvsJbT8Oznhl2EyoJZOA5TBDJdxuhxiql3BYcNsEDPJ__EXSNrC1eJIVFgWCrsxlP1rn-BN6hX86iSVZqUm_cR_pSBWgyZWTN5h4YRGIBIedSS22zOcb-5xPr1NLJISlDNC_qLfrCUlOPCAkgwqRFQ4T4paIgog12hE")`,
            }}
          >
            <div className="flex flex-col gap-5 text-center max-w-3xl z-10">
              <h1 className="text-white text-5xl md:text-6xl font-display font-bold leading-tight tracking-tight drop-shadow-md">
                {t.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed drop-shadow-sm max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>
            <Link
              href={localePath(current, '/albums')}
              className="z-10 mt-2 flex min-w-[140px] cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-stone-800 hover:bg-stone-700 text-primary text-base font-bold transition-transform hover:scale-105 shadow-lg"
            >
              {dict.common.cta.viewCollection}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
