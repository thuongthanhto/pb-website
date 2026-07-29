import { AlbumsHero, AlbumsSection } from '@/features/albums/components'
import { getAllImages } from '@/lib/r2-albums'
import {
  generateSEOMetadata,
  generateImageGalleryStructuredData,
} from '@/lib/seo-metadata'
import { breadcrumbSchema, jsonLd } from '@/lib/structured-data'
import { normalizeLocale } from '@/i18n/config'
import { getDictionary, interpolate } from '@/i18n/dictionaries'

// Re-fetch from R2 at most every 60s so newly uploaded photos show up
// without needing a redeploy.
export const revalidate = 60

// Google cắt description quanh 160 ký tự. Số album trên R2 thì tăng dần, nên
// chỉ chèn vừa đủ tên album để mô tả không bị cắt giữa câu.
const DESCRIPTION_LIMIT = 160

function fitFolders(template, count, labels) {
  for (let take = labels.length; take > 0; take -= 1) {
    const text = interpolate(template, {
      count,
      folders: labels.slice(0, take).join(', '),
    })
    if (text.length <= DESCRIPTION_LIMIT) return text
  }
  return interpolate(template, { count, folders: labels[0] ?? '' })
}

export async function generateMetadata({ params }) {
  const locale = normalizeLocale(params.locale)
  const t = getDictionary(locale).albums

  const images = await getAllImages()
  const folderKeys = [...new Set(images.map((img) => img.folder))]
  // Tên album trong description dùng nhãn đã dịch, không dùng key thô của R2.
  const folderLabels = folderKeys.map((key) => t.filters.folders[key] || key)

  return generateSEOMetadata({
    locale,
    title: t.meta.title,
    description: fitFolders(t.meta.description, images.length, folderLabels),
    // keywords thì không bị giới hạn độ dài -> giữ đủ cả 6 nhãn album
    keywords: [...t.meta.keywords, ...folderLabels],
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
