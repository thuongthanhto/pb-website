'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/i18n/I18nProvider'
import { CONTACT } from '@/lib/contact'

export default function Footer() {
  const { dict, path } = useI18n()

  const links = [
    { href: '/contact', label: dict.common.nav.contact },
    { href: '/albums', label: dict.common.nav.albums },
    { href: '/dia-diem', label: dict.common.nav.locations },
    { href: '/pricing', label: dict.common.nav.pricing },
  ]

  return (
    <footer className="w-full border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link
          href={path('/')}
          className="flex items-center gap-2 text-text-main hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo-pb.png"
            alt={`${dict.common.brand} logo`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-md"
          />
        </Link>

        {/* Mobile: mạng xã hội và link xếp 2 hàng — 4 link chung một hàng với
            icon thì bị bẻ chữ ("Bộ sưu / tập"). */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Icon name="mdi:instagram" className="text-[24px]" />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Icon name="mdi:facebook" className="text-[24px]" />
            </a>
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="Zalo"
            >
              <Icon name="zalo" className="text-[24px]" />
            </a>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-4 w-px bg-border-strong"></div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 whitespace-nowrap text-text-secondary text-sm">
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

        <p className="text-text-muted text-sm">{dict.common.footer.rights}</p>
      </div>
    </footer>
  )
}
