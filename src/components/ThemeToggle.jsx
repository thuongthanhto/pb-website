'use client'

import { Icon } from '@/components/Icon'
import { useTheme } from '@/components/ThemeProvider'
import { useI18n } from '@/i18n/I18nProvider'

/**
 * Đổi giao diện sáng/tối. Đặt cạnh LanguageSwitcher nên dùng chung 2 variant:
 *
 * @param {'inline'|'block'} variant - inline: nút tròn trên header;
 *                                    block: segmented full-width cho drawer mobile.
 */
export function ThemeToggle({ variant = 'inline', className = '' }) {
  const { theme, isDark, setTheme, toggleTheme } = useTheme()
  const { dict } = useI18n()
  const labels = dict.common.theme

  if (variant === 'block') {
    const options = [
      { value: 'light', icon: 'light_mode', label: labels.light },
      { value: 'dark', icon: 'dark_mode', label: labels.dark },
    ]
    return (
      <div
        className={`flex w-full items-center gap-2 ${className}`}
        role="group"
        aria-label={labels.label}
      >
        {options.map((opt) => {
          const active = theme === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTheme(opt.value)}
              aria-pressed={active}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-surface-raised'
              }`}
            >
              <Icon name={opt.icon} className="text-[18px]" />
              {opt.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // aria-label mô tả HÀNH ĐỘNG (chuyển sang theme kia), không phải trạng thái.
      aria-label={isDark ? labels.switchToLight : labels.switchToDark}
      title={isDark ? labels.switchToLight : labels.switchToDark}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-text-secondary transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      <Icon name={isDark ? 'light_mode' : 'dark_mode'} className="text-[18px]" />
    </button>
  )
}
