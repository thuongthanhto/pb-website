'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/i18n/I18nProvider'

export default function Footer() {
  const { dict, path } = useI18n()

  const links = [
    { href: '/contact', label: dict.common.nav.contact },
    { href: '/albums', label: dict.common.nav.albums },
    { href: '/pricing', label: dict.common.nav.pricing },
  ]

  return (
    <footer className="w-full border-t border-stone-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link
          href={path('/')}
          className="flex items-center gap-2 text-stone-100 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo-pb.png"
            alt={`${dict.common.brand} logo`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-md"
          />
        </Link>

        <div className="flex items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/scryer_bo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Icon name="mdi:instagram" className="text-[24px]" />
            </a>
            <a
              href="https://www.facebook.com/PhatBo0905"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Icon name="mdi:facebook" className="text-[24px]" />
            </a>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-4 w-px bg-stone-700"></div>

          {/* Links */}
          <nav className="flex gap-6 text-stone-300 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                className="hover:text-primary active:text-primary transition-colors"
                href={path(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="text-stone-400 text-sm">{dict.common.footer.rights}</p>
      </div>
    </footer>
  )
}
