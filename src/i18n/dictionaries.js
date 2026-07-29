import { normalizeLocale } from './config'

import vi from './dictionaries/vi.json'
import en from './dictionaries/en.json'

// Import tĩnh (không dynamic import) để cả 2 dictionary được bundle sẵn — page
// đều là static/ISR nên không có lợi gì khi lazy-load, mà lại tránh await.
const dictionaries = { vi, en }

/** Lấy dictionary cho một locale, luôn trả về object hợp lệ. */
export function getDictionary(locale) {
  return dictionaries[normalizeLocale(locale)]
}

/**
 * Thay các placeholder dạng {name} trong một chuỗi dịch.
 * interpolate('Có {count} ảnh', { count: 12 }) -> 'Có 12 ảnh'
 */
export function interpolate(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  )
}
