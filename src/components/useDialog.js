'use client'

import { useEffect, useRef } from 'react'

// Những phần tử nhận được focus bên trong dialog.
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Hành vi chuẩn cho một dialog: khoá scroll nền, Esc để đóng, nhốt Tab bên
 * trong và trả focus về đúng nút đã mở nó.
 *
 * Trả về ref để gắn vào phần tử bọc nội dung dialog:
 *   const dialogRef = useDialog(open, close)
 *   <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true">
 *
 * Không nhốt Tab thì người dùng bàn phím Tab một hồi là ra sau lưng lớp phủ,
 * focus vào trang bên dưới mà không thấy con trỏ đâu.
 */
export function useDialog(open, onClose) {
  const ref = useRef(null)
  const opener = useRef(null)
  const closeRef = useRef(onClose)

  // Giữ onClose trong ref để effect chính chỉ phụ thuộc `open` — nếu không,
  // mỗi lần cha render lại là effect chạy lại và cướp focus của người dùng.
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const node = ref.current
    opener.current = document.activeElement

    const items = () => Array.from(node?.querySelectorAll(FOCUSABLE) ?? [])
    ;(items()[0] ?? node)?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeRef.current?.()
        return
      }
      if (e.key !== 'Tab' || !node) return

      const list = items()
      if (!list.length) return

      const first = list[0]
      const last = list[list.length - 1]
      const active = document.activeElement

      // Chạm mép thì vòng lại đầu bên kia; focus lỡ ra ngoài thì kéo về.
      if (!node.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener.current?.focus?.()
    }
  }, [open])

  return ref
}
