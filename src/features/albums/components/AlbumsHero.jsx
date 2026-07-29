import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function AlbumsHero({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).albums.hero

  return (
    <div className="w-full max-w-[960px] px-4 pt-10 md:pt-16 pb-8 md:pb-10 text-center animate-fade-in-up mx-auto">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 md:mb-6 text-text-main">
        {t.titleTop} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
          {t.titleBottom}
        </span>
      </h1>
      <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
        {t.subtitleLine1} <br className="hidden sm:block" />
        {t.subtitleLine2}
      </p>
    </div>
  )
}
