'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/albums', label: 'Bộ sưu tập' },
    { href: '/pricing', label: 'Bảng giá' },
    { href: '/contact', label: 'Liên hệ' },
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Image
            src="/logo.svg"
            alt="PhatBo Studio Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] hidden md:block">
            PhatBo
          </h2>
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
