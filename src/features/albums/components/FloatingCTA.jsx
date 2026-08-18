'use client'

import { useViewerState } from './ViewerContext'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/i18n/I18nProvider'
import { CONTACT, telHref } from '@/lib/contact'

export function FloatingCTA({ isHidden = false }) {
  const { dict } = useI18n()
  const viewerState = useViewerState()
  const shouldHide = isHidden || (viewerState?.viewerOpen ?? false)

  if (shouldHide) return null

  return (
    <div className="fixed bottom-8 right-8 z-40 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
      {/* Nhiều khách ngại gọi -> để sẵn một đường nhắn tin ngay cạnh nút đặt lịch. */}
      <a
        href={CONTACT.zalo}
        target="_blank"
        rel="noopener noreferrer"
        title={dict.common.cta.chatZalo}
        aria-label={dict.common.cta.chatZalo}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-800/95 backdrop-blur-sm border border-stone-700 text-stone-200 shadow-xl hover:bg-primary hover:text-white hover:border-primary hover:scale-105 transition-all duration-300"
      >
        <Icon name="zalo" className="text-[24px]" />
      </a>
      <a href={telHref} className="flex items-center justify-center gap-3 rounded-full h-14 pl-5 pr-7 bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/40 hover:scale-105 transition-all duration-300 group">
        <Icon name="calendar_today" className="text-[24px] group-hover:-rotate-12 transition-transform" />
        <span className="text-base font-bold tracking-wide">
          {dict.common.cta.bookShoot}
        </span>
      </a>
    </div>
  );
}
