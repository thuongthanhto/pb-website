'use client'

import { Icon } from '@iconify/react'

export default function Footer() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 border-t border-gray-100 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 text-gray-900">
        <img src="/logo-pb.svg" alt="PhatBo Logo" className="w-7 h-7 rounded-md" />
        <span className="font-bold text-lg">PhatBo</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/scryer_bo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Icon icon="mdi:instagram" width="24" height="24" />
          </a>
          <a
            href="https://www.facebook.com/PhatBo0905"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Icon icon="mdi:facebook" width="24" height="24" />
          </a>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-4 w-px bg-gray-200"></div>

        {/* Links */}
        <div className="flex gap-6 text-gray-500 text-sm">
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

      <p className="text-gray-400 text-sm">© 2025 PhatBo Studio. All rights reserved.</p>
    </div>
  )
}
