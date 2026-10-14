import { AlbumsHero, AlbumsSection } from '@/features/albums/components'
import { getAllImages } from '@/lib/r2-albums'
import {
  generateSEOMetadata,
  generateImageGalleryStructuredData,
} from '@/lib/seo-metadata'
import { breadcrumbSchema, jsonLd } from '@/lib/structured-data'
import { normalizeLocale } from '@/i18n/config'
import { getDictionary, interpolate } from '@/i18n/dictionaries'
import { getLocationName, getLocationSlugsInUse } from '@/data/locations'

// Re-fetch from R2 at most every 60s so newly uploaded photos show up
// without needing a redeploy.
export const revalidate = 60

export async function generateMetadata({ params }) {
  const locale = normalizeLocale(params.locale)
  const t = getDictionary(locale).albums

  const images = await getAllImages()
  // Tên địa điểm (đã dịch) chỉ đưa vào keywords: chèn vào description thì số
  // địa điểm tăng dần sẽ vượt ~160 ký tự Google hiển thị.
  const locationLabels = getLocationSlugsInUse(images).map((slug) =>
    getLocationName(slug, locale)
  )

  return generateSEOMetadata({
    locale,
    title: t.meta.title,
    description: interpolate(t.meta.description, { count: images.length }),
    // keywords thì không bị giới hạn độ dài -> giữ đủ tên mọi địa điểm
    keywords: [...t.meta.keywords, ...locationLabels],
    url: '/albums',
  })
}

export default async function AlbumsPage({ params }) {
  const locale = normalizeLocale(params.locale)
  const dict = getDictionary(locale)

  // Fetch all images from photos/ folder
  const images = await getAllImages()

  // Generate structured data for SEO
  const structuredData = jsonLd(
    generateImageGalleryStructuredData(images, locale),
    breadcrumbSchema(locale, [
      { name: dict.common.nav.home, path: '/' },
      { name: dict.common.nav.albums, path: '/albums' },
    ])
  )

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <AlbumsHero locale={locale} />

        {/* Filter Buttons, Portfolio Grid, and FloatingCTA */}
        <AlbumsSection images={images} />
      </main>
    </>
  )
}
