'use client'

import { createContext, useContext, useMemo } from 'react'
import { localePath } from './config'

const I18nContext = createContext(null)

/**
 * Đưa locale + dictionary xuống các client component (Header, Footer, gallery...).
 * Server component thì đọc dictionary trực tiếp qua getDictionary(), không cần hook này.
 */
export function I18nProvider({ locale, dictionary, children }) {
  const value = useMemo(
    () => ({
      locale,
      dict: dictionary,
      // Localize một path nội bộ: path('/albums') -> '/en/albums' khi đang ở EN
      path: (p) => localePath(locale, p),
    }),
    [locale, dictionary]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n phải được dùng bên trong <I18nProvider>')
  }
  return ctx
}
