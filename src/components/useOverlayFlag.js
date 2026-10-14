'use client'

import { useEffect } from 'react'

// Đếm số lớp phủ đang mở (drawer mobile, dropdown địa điểm...) — đếm chứ không
// bật/tắt thẳng, để đóng một lớp không xoá cờ của lớp khác còn đang mở.
let openCount = 0

/**
 * Bật `data-overlay-open` trên <body> khi `open` = true. CSS dựa vào cờ này để
 * ẩn các nút nổi (FloatingCTA) — chúng nằm trên cùng và che mất drawer /
 * dropdown, nhất là trên mobile.
 */
export function useOverlayFlag(open) {
  useEffect(() => {
    if (!open) return
    openCount += 1
    document.body.dataset.overlayOpen = ''
    return () => {
      openCount -= 1
      if (openCount <= 0) {
        openCount = 0
        delete document.body.dataset.overlayOpen
      }
    }
  }, [open])
}
