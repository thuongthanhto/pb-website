// Cấu hình đa ngôn ngữ dùng chung cho cả server và client.
//
// Chiến lược URL: locale mặc định (vi) KHÔNG có prefix để giữ nguyên các URL đã
// được Google index (/albums, /pricing...). Tiếng Anh nằm dưới /en.
//   vi -> /            /albums        /pricing
//   en -> /en          /en/albums     /en/pricing
// Về mặt filesystem mọi route đều nằm trong app/[locale], middleware chịu trách
// nhiệm rewrite path không prefix về /vi/... (xem src/middleware.js).

export const locales = ['vi', 'en']
export const defaultLocale = 'vi'

// Dùng cho thẻ <html lang> và hreflang.
//
// `extraHrefLangs`: các thị trường nói tiếng Anh mà studio nhắm tới (khách
// Singapore / Malaysia / Mỹ bay sang Việt Nam chụp). Google cho phép nhiều
// hreflang cùng trỏ về một URL, nên đây là cách báo hiệu thị trường mà không
// phải tạo thêm bản dịch nào.
export const localeMeta = {
  vi: { htmlLang: 'vi', hrefLang: 'vi-VN', ogLocale: 'vi_VN', extraHrefLangs: [] },
  en: {
    htmlLang: 'en',
    hrefLang: 'en',
    ogLocale: 'en_US',
    extraHrefLangs: ['en-SG', 'en-MY', 'en-US', 'en-AU', 'en-GB'],
  },
}

export function isLocale(value) {
  return locales.includes(value)
}

/** Chuẩn hoá về một locale hợp lệ (fallback về mặc định). */
export function normalizeLocale(value) {
  return isLocale(value) ? value : defaultLocale
}

/**
 * Thêm prefix locale vào một path nội bộ.
 * localePath('en', '/albums') -> '/en/albums'
 * localePath('vi', '/albums') -> '/albums'
 */
export function localePath(locale, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (normalizeLocale(locale) === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/**
 * Bỏ prefix locale khỏi pathname, trả về path "trung tính".
 * stripLocale('/en/albums') -> '/albums'
 */
export function stripLocale(pathname = '/') {
  const [, first, ...rest] = pathname.split('/')
  if (!isLocale(first)) return pathname || '/'
  const remainder = rest.join('/')
  return remainder ? `/${remainder}` : '/'
}
