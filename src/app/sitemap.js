import { siteConfig } from '@/lib/seo-metadata'

// Các route tĩnh của site. Không liệt kê /albums?folder=... vì canonical của
// trang albums luôn là /albums — thêm vào chỉ tạo URL trùng cho Google.
const routes = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/albums', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
]

export default function sitemap() {
  const lastModified = new Date()

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
