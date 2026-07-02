'use client'

import { Icon } from '@/components/Icon'

export default function Footer() {
  return (
    <div className="w-full border-t border-stone-800">
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 text-stone-100">
        <img src="/logo-pb.png" alt="PhatBo Logo" className="w-12 h-12 rounded-md" />
      </div>

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
        <div className="flex gap-6 text-stone-300 text-sm">
          <a className="hover:text-primary active:text-primary transition-colors" href="/contact">
            Liên hệ
          </a>
          <a className="hover:text-primary active:text-primary transition-colors" href="/albums">
            Bộ sưu tập
          </a>
          <a className="hover:text-primary active:text-primary transition-colors" href="/pricing">
            Bảng giá
          </a>
        </div>
      </div>

      <p className="text-stone-400 text-sm">© 2025 PhatBo Studio. All rights reserved.</p>
    </div>
    </div>
  )
}
