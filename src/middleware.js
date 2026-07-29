import { NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

// Route thật nằm ở app/[locale]/..., nhưng URL của tiếng Việt không có prefix.
// Middleware làm 2 việc:
//   1. /vi/... -> redirect 308 về /... để chỉ tồn tại một URL canonical.
//   2. /...    -> rewrite (giữ nguyên URL trên thanh địa chỉ) sang /vi/...
//   3. /en/... -> để nguyên, khớp trực tiếp với [locale] = 'en'.
export function middleware(request) {
  const { pathname } = request.nextUrl
  const segment = pathname.split('/')[1]

  if (segment === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  if (locales.includes(segment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Bỏ qua asset nội bộ của Next, API route và mọi file có phần mở rộng
  // (/sitemap.xml, /robots.txt, /logo-pb.png, /cover.webp...).
  matcher: ['/((?!_next/|api/|.*\\.).*)'],
}
