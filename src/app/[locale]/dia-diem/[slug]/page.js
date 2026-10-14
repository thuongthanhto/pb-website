import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AlbumsSection } from '@/features/albums/components'
import { getAllImages } from '@/lib/r2-albums'
import {
  generateSEOMetadata,
  generateImageGalleryStructuredData,
} from '@/lib/seo-metadata'
import { breadcrumbSchema, placeSchema, jsonLd } from '@/lib/structured-data'
import { normalizeLocale, localePath } from '@/i18n/config'
import { getDictionary, interpolate } from '@/i18n/dictionaries'
import {
  CITIES,
  getLocation,
  getLocationSlugsInUse,
  googleMapsUrl,
} from '@/data/locations'

export const revalidate = 60

// Chỉ prerender địa điểm đã có ảnh. Slug có trong locations.js nhưng chưa có
// ảnh vẫn trả 404 — trang rỗng chỉ làm loãng SEO.
export async function generateStaticParams() {
  const images = await getAllImages()
  return getLocationSlugsInUse(images).map((slug) => ({ slug }))
}

async function loadLocation(slug) {
  const location = getLocation(slug)
  if (!location) return null
  const images = (await getAllImages()).filter((img) => img.locationSlug === slug)
  return images.length > 0 ? { location, images } : null
}

export async function generateMetadata({ params }) {
  const locale = normalizeLocale(params.locale)
  const t = getDictionary(locale).locations.meta
  const data = await loadLocation(params.slug)
  if (!data) return {}

  const { location, images } = data
  const vars = {
    name: location.name[locale],
    city: CITIES[location.city]?.[locale] ?? '',
    count: images.length,
  }

  // Địa điểm dạng "nhóm" tự khai title / metaDescription (xem locations.js).
  return generateSEOMetadata({
    locale,
    title: location.title?.[locale] ?? interpolate(t.title, vars),
    description: interpolate(location.metaDescription?.[locale] ?? t.description, vars),
    keywords: [location.name.vi, location.name.en, vars.city],
    url: `/dia-diem/${params.slug}`,
  })
}

export default async function LocationPage({ params }) {
  const locale = normalizeLocale(params.locale)
  const dict = getDictionary(locale)
  const t = dict.locations
  const data = await loadLocation(params.slug)
  if (!data) notFound()

  const { location, images } = data
  const name = location.name[locale]
  const city = CITIES[location.city]?.[locale]
  const path = `/dia-diem/${params.slug}`
  const galleryTitle =
    location.galleryTitle?.[locale] ?? interpolate(t.galleryTitle, { name })

  const structuredData = jsonLd(
    generateImageGalleryStructuredData(images, locale, {
      path,
      name: galleryTitle,
    }),
    placeSchema(locale, {
      slug: params.slug,
      name,
      description: location.description[locale],
      address: location.address,
      website: location.website,
      geo: location.geo,
    }),
    breadcrumbSchema(locale, [
      { name: dict.common.nav.home, path: '/' },
      { name: t.nav, path: '/dia-diem' },
      { name, path },
    ])
  )

  const details = [
    location.address && { label: t.address, value: location.address },
    location.bestTime && { label: t.bestTime, value: location.bestTime[locale] },
    location.permit && { label: t.permit, value: location.permit[locale] },
  ].filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-[960px] px-4 pt-10 md:pt-16 pb-8 md:pb-10 text-center animate-fade-in-up mx-auto">
          <nav className="mb-4 text-sm font-semibold text-text-muted">
            <Link href={localePath(locale, '/dia-diem')} className="hover:text-primary transition-colors">
              {t.nav}
            </Link>
            {city && <span> · {city}</span>}
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 md:mb-6 text-text-main">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {name}
            </span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            {location.description[locale]}
          </p>

          <dl className="mt-6 grid gap-3 text-sm text-left sm:text-center max-w-2xl mx-auto">
            {details.map(({ label, value }) => (
              <div key={label}>
                <dt className="inline font-bold text-text-main">{label}: </dt>
                <dd className="inline text-text-secondary">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {location.address && (
              <a
                href={googleMapsUrl(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center rounded-full px-5 bg-surface border border-border hover:border-primary/40 hover:bg-surface-raised text-text-secondary hover:text-text-main font-semibold transition-all"
              >
                {t.map}
              </a>
            )}
            {location.website && (
              <a
                href={location.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center rounded-full px-5 bg-surface border border-border hover:border-primary/40 hover:bg-surface-raised text-text-secondary hover:text-text-main font-semibold transition-all"
              >
                {t.website}
              </a>
            )}
            <Link
              href={localePath(locale, '/pricing')}
              className="flex h-10 items-center rounded-full px-5 bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/30 font-bold transition-all"
            >
              {t.ctaPricing}
            </Link>
          </div>
        </div>

        <h2 className="w-full max-w-[1280px] px-4 md:px-10 pb-2 text-xl md:text-2xl font-bold text-text-main text-center">
          {galleryTitle}{' '}
          <span className="text-text-muted font-semibold text-base">
            ({interpolate(t.photoCount, { count: images.length })})
          </span>
        </h2>
        <AlbumsSection images={images} showLocations={false} />
      </main>
    </>
  )
}
