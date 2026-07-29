import { siteConfig } from '@/lib/seo-metadata'
import { locales, localeMeta, localePath, defaultLocale } from '@/i18n/config'

// Các route tĩnh của site. Không liệt kê /albums?folder=... vì canonical của
// trang albums luôn là /albums — thêm vào chỉ tạo URL trùng cho Google.
const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/albums', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
]

const absolute = (path) => `${siteConfig.siteUrl}${path === '/' ? '' : path}`

export default function sitemap() {
  const lastModified = new Date()

  // Mỗi route có một entry cho từng ngôn ngữ, kèm alternates.languages để Google
  // ghép chúng thành cùng một cụm bản dịch thay vì coi là nội dung trùng.
  return routes.flatMap(({ path, changeFrequency, priority }) => {
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
