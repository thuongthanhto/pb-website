'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

// Next render not-found boundary trong shell riêng của nó, không đảm bảo có
// I18nProvider của layout — nên tự suy ra locale từ pathname thay vì dùng
// context (nếu dùng context, trang này sẽ throw đúng lúc cần hiện lỗi nhất).
export default function NotFound() {
  const pathname = usePathname() || '/'
  const segment = pathname.split('/')[1]
  const locale = isLocale(segment) ? segment : defaultLocale
  const t = getDictionary(locale).notFound

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="flex flex-col items-center gap-5 text-center">
        <p className="text-primary text-6xl md:text-8xl font-black tabular-nums leading-none">
          {t.title}
        </p>
        <p className="text-text-secondary text-base md:text-lg max-w-[420px]">
          {t.description}
        </p>
        <Link
          href={localePath(locale, '/')}
          className="mt-2 inline-flex items-center gap-2 rounded-full h-12 px-7 bg-primary hover:bg-primary-dark transition-all text-white text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
        >
          <Icon name="arrow_back" className="text-[20px]" />
          {t.backHome}
        </Link>
      </div>
    </main>
  )
}
