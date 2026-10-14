import { siteConfig } from '@/lib/seo-metadata'
import { locales, localeMeta, localePath, defaultLocale } from '@/i18n/config'
import { getAllImages } from '@/lib/r2-albums'
import { getLocationSlugsInUse } from '@/data/locations'

// Các route tĩnh của site. Không liệt kê /albums?folder=... vì canonical của
// trang albums luôn là /albums — thêm vào chỉ tạo URL trùng cho Google.
const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/albums', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
]

// Sitemap tự build lại mỗi giờ để có trang địa điểm mới.
export const revalidate = 3600

const absolute = (path) => `${siteConfig.siteUrl}${path === '/' ? '' : path}`

export default async function sitemap() {
  const lastModified = new Date()

  // Landing page địa điểm: chỉ những địa điểm đã có ảnh (khớp generateStaticParams).
  // R2 lỗi thì vẫn trả sitemap với các route tĩnh, đừng để cả sitemap 500.
  let locationSlugs = []
  try {
    locationSlugs = getLocationSlugsInUse(await getAllImages())
  } catch (error) {
    console.error('Sitemap: không lấy được danh sách ảnh, chỉ dùng route tĩnh:', error)
  }
  const allRoutes = [
    ...routes,
    ...(locationSlugs.length > 0
      ? [{ path: '/dia-diem', changeFrequency: 'weekly', priority: 0.8 }]
      : []),
    ...locationSlugs.map((slug) => ({
      path: `/dia-diem/${slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ]

  // Mỗi route có một entry cho từng ngôn ngữ, kèm alternates.languages để Google
  // ghép chúng thành cùng một cụm bản dịch thay vì coi là nội dung trùng.
  return allRoutes.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [
        localeMeta[locale].hrefLang,
        absolute(localePath(locale, path)),
      ])
    )

    return locales.map((locale) => ({
      url: absolute(localePath(locale, path)),
      lastModified,
      changeFrequency,
      // Tiếng Việt là bản chính -> ưu tiên cao hơn bản dịch một chút.
      priority: locale === defaultLocale ? priority : Number((priority * 0.9).toFixed(2)),
      alternates: { languages },
    }))
  })
}
