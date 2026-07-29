'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localePath, stripLocale } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'

/**
 * Chuyển ngôn ngữ bằng cách đổi prefix locale của URL hiện tại.
 * Render thật thẻ <a> (có href) để crawler thấy được bản dịch tương ứng.
 *
 * @param {'inline'|'block'} variant - inline: segmented nhỏ trên header;
 *                                    block: full-width cho drawer mobile.
 */
export function LanguageSwitcher({ variant = 'inline', className = '' }) {
  const { locale, dict } = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  const neutralPath = stripLocale(pathname || '/')
  const labels = dict.common.language

  // Giữ lại query (?category=&photo=) khi đổi ngôn ngữ. Không dùng
  // useSearchParams để tránh bắt cả trang phải render động.
  const handleClick = (event, href) => {
    if (typeof window === 'undefined') return
    const { search } = window.location
    if (!search) return
    event.preventDefault()
    router.push(`${href}${search}`)
  }

  const isBlock = variant === 'block'

  return (
    <div
      className={`flex items-center ${
        isBlock
          ? 'gap-2 w-full'
          : 'gap-0.5 rounded-full border border-stone-700 bg-stone-800/60 p-0.5'
      } ${className}`}
      role="group"
      aria-label={labels.label}
    >
      {locales.map((code) => {
        const href = localePath(code, neutralPath)
        const active = code === locale
        return (
          <Link
            key={code}
            href={href}
            hrefLang={code}
            aria-current={active ? 'true' : undefined}
            onClick={(event) => handleClick(event, href)}
            className={
              isBlock
                ? `flex-1 rounded-lg px-3 py-2 text-center text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-stone-300 hover:bg-stone-800'
                  }`
                : `rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition-colors ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-stone-400 hover:text-primary'
                  }`
            }
          >
            {isBlock ? labels[code] : labels[`${code}Short`]}
          </Link>
        )
      })}
    </div>
  )
}
