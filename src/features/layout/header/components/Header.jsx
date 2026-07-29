'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { stripLocale } from '@/i18n/config'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function Header() {
  const { dict, path } = useI18n()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/albums', label: dict.common.nav.albums },
    { href: '/pricing', label: dict.common.nav.pricing },
    { href: '/contact', label: dict.common.nav.contact },
  ]

  // So sánh trên path đã bỏ prefix locale để /albums và /en/albums cùng active.
  const currentPath = stripLocale(pathname || '/')
  const isActive = (href) => {
    if (href === '/') return currentPath === '/'
    return currentPath === href || currentPath.startsWith(href + '/')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <div className="w-full bg-stone-900/90 backdrop-blur-md border-b border-stone-800 sticky top-0 z-50">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto w-full">
          <Link
            href={path('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            onClick={closeMenu}
          >
            <Image
              src="/logo-pb.png"
              alt={`${dict.common.brand} logo`}
              width={56}
              height={56}
              className="w-12 h-12 rounded-lg"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base md:text-lg font-extrabold tracking-tight text-text-main">
                {dict.common.brand}
              </span>
              <span className="hidden sm:block text-[11px] md:text-xs font-medium tracking-wide text-text-secondary">
                {dict.common.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex items-center gap-9">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={path(link.href)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-stone-200 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <LanguageSwitcher className="hidden md:flex" />

            {/* Mobile Burger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-stone-400 hover:text-primary transition-colors"
              aria-label={
                isMenuOpen ? dict.common.menu.close : dict.common.menu.open
              }
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                // Close icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Burger icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-stone-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800">
              <h3 className="text-lg font-bold text-stone-100">
                {dict.common.menu.label}
              </h3>
              <button
                onClick={closeMenu}
                className="p-2 text-stone-400 hover:text-primary transition-colors"
                aria-label={dict.common.menu.close}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                href={path('/')}
                onClick={closeMenu}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-primary/10 text-primary'
                    : 'text-stone-200 hover:bg-stone-800'
                }`}
              >
                {dict.common.nav.home}
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={path(link.href)}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Đổi ngôn ngữ đặt cuối drawer để không chiếm chỗ của nav chính */}
            <div className="mt-auto border-t border-stone-800 p-4">
              <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
                {dict.common.language.label}
              </p>
              <LanguageSwitcher variant="block" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
