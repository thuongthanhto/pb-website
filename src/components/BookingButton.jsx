'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { track } from '@vercel/analytics'
import { Icon } from '@/components/Icon'
import { useDialog } from '@/components/useDialog'
import { CONTACT, mailtoHref, telHref } from '@/lib/contact'

// Xếp theo mức khách Việt thực sự hay dùng: nhắn tin trước, gọi sau.
// `value` là thứ hiển thị thay cho note — số điện thoại và email cần đọc được
// ngay trên màn hình vì trên desktop bấm vào chỉ mở hộp thoại "Open Phone?"
// chẳng dẫn tới đâu.
const CHANNELS = [
  { id: 'zalo', icon: 'zalo', href: CONTACT.zalo, external: true },
  { id: 'messenger', icon: 'mdi:facebook', href: CONTACT.messenger, external: true },
  { id: 'phone', icon: 'mdi:phone', href: telHref, value: CONTACT.phoneDisplay },
  { id: 'email', icon: 'mdi:email', href: mailtoHref, value: CONTACT.email },
]

/**
 * Nút đặt lịch: mở modal cho khách chọn kênh liên hệ thay vì quăng thẳng vào
 * `tel:`. Trigger nhận nguyên className của nơi gọi nên giao diện các nút cũ
 * giữ y như trước.
 */
export function BookingButton({ t, label, className, children, source, context }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const close = useCallback(() => setOpen(false), [])
  const dialogRef = useDialog(open, close)

  const openPanel = () => {
    setOpen(true)
    track('booking_open', { source })
  }

  return (
    <>
      <button type="button" onClick={openPanel} className={className}>
        {children ?? <span className="truncate">{label}</span>}
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-surface-raised hover:text-text-main transition"
            >
              <Icon name="close" className="text-[20px]" />
            </button>

            {context && (
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                {context}
              </p>
            )}
            <h3 className="text-xl font-extrabold text-text-main mb-2">{t.title}</h3>
            <p className="text-sm text-text-secondary mb-6">{t.subtitle}</p>

            <div className="flex flex-col gap-3">
              {CHANNELS.map((channel) => {
                const copy = t.channels[channel.id]
                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    {...(channel.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    onClick={() => track('booking_channel', { source, channel: channel.id })}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface/50 px-4 py-3.5 transition hover:border-primary hover:bg-surface group"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-text-secondary transition group-hover:bg-primary group-hover:text-on-primary">
                      <Icon name={channel.icon} className="text-[20px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-text-main">{copy.label}</span>
                      <span className="block truncate text-xs text-text-secondary mt-0.5">
                        {channel.value ?? copy.note}
                      </span>
                    </span>
                    <Icon
                      name="chevron_right"
                      className="ml-auto text-[20px] text-text-muted shrink-0"
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
