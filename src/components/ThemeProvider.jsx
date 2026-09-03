'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

export const THEME_STORAGE_KEY = 'pb-theme'
export const DEFAULT_THEME = 'dark'

// Màu thanh trạng thái trên mobile (Safari/Chrome) — khớp nền header từng theme.
const THEME_COLOR = {
  dark: '#161210',
  light: '#faf7f5',
}

/**
 * Script chạy đồng bộ trong <head>, TRƯỚC khi trang vẽ lần đầu, nên không bị
 * "nháy" theme (FOUC): đọc lựa chọn đã lưu rồi gắn luôn data-theme.
 * Không đọc prefers-color-scheme — site mặc định tối theo chủ ý thiết kế,
 * muốn theo hệ điều hành thì thêm nhánh matchMedia ở đây.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark')t='${DEFAULT_THEME}';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`

export function ThemeProvider({ children }) {
  // SSR luôn render 'dark' (khớp markup server); useEffect dưới đồng bộ lại
  // với giá trị mà script trong <head> đã gắn.
  const [theme, setThemeState] = useState(DEFAULT_THEME)

  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') setThemeState(attr)
  }, [])

  const setTheme = useCallback((next) => {
    const value = next === 'light' ? 'light' : 'dark'
    setThemeState(value)
    document.documentElement.setAttribute('data-theme', value)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value)
    } catch {
      // Chặn cookie/storage (private mode) thì chỉ mất phần ghi nhớ.
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEME_COLOR[value])
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme phải được dùng bên trong <ThemeProvider>')
  }
  return ctx
}
