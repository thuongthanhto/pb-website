import Link from 'next/link'
import { getAllImages } from '@/lib/r2-albums'
import { generateSEOMetadata } from '@/lib/seo-metadata'
import { breadcrumbSchema, jsonLd } from '@/lib/structured-data'
import { normalizeLocale, localePath } from '@/i18n/config'
import { getDictionary, interpolate } from '@/i18n/dictionaries'
import { CITIES, LOCATIONS, getLocationSlugsInUse } from '@/data/locations'

export const revalidate = 60

const publicDomain =
  process.env.NEXT_PUBLIC_R2_DOMAIN ||
  'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev'

export function generateMetadata({ params }) {
  const locale = normalizeLocale(params.locale)
  const t = getDictionary(locale).locations.meta

  return generateSEOMetadata({
    locale,
    title: t.indexTitle,
    description: t.indexDescription,
    url: '/dia-diem',
  })
}

export default async function LocationsIndexPage({ params }) {
  const locale = normalizeLocale(params.locale)
  const dict = getDictionary(locale)
  const t = dict.locations

  const images = await getAllImages()
  // Mỗi địa điểm: số ảnh + ảnh bìa (ảnh featured, không có thì ảnh mới nhất).
  const cards = getLocationSlugsInUse(images).map((slug) => {
    const photos = images.filter((img) => img.locationSlug === slug)
    return {
      slug,
      location: LOCATIONS[slug],
      count: photos.length,
      cover: photos.find((img) => img.featured) ?? photos[0],
    }
  })
  const groups = Object.keys(CITIES)
    .map((city) => ({ city, cards: cards.filter((c) => c.location.city === city) }))
    .filter((group) => group.cards.length > 0)

  const structuredData = jsonLd(
    breadcrumbSchema(locale, [
      { name: dict.common.nav.home, path: '/' },
      { name: t.nav, path: '/dia-diem' },
    ])
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-[960px] px-4 pt-10 md:pt-16 pb-8 md:pb-10 text-center animate-fade-in-up mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 md:mb-6 text-text-main">
            {t.indexTitleTop} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {t.indexTitleBottom}
            </span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            {t.indexSubtitle}
          </p>
        </div>

        <div className="w-full max-w-[1280px] px-4 md:px-10 pb-16 flex flex-col gap-10">
          {groups.length === 0 && (
            <p className="text-text-muted text-center">{t.empty}</p>
          )}
          {groups.map(({ city, cards }) => (
            <section key={city}>
              <h2 className="mb-4 text-xl md:text-2xl font-bold text-text-main">
                {CITIES[city][locale]}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map(({ slug, location, count, cover }) => (
                  <Link
                    key={slug}
                    href={localePath(locale, `/dia-diem/${slug}`)}
                    className="group overflow-hidden rounded-2xl bg-surface border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-surface-raised">
                      {cover && (
                        <img
                          src={`${publicDomain}/${cover.key}`}
                          alt={location.name[locale]}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-text-main group-hover:text-primary transition-colors">
                        {location.name[locale]}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {interpolate(t.photoCount, { count })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}
