'use client'

import { Icon } from '@iconify/react'

export default function Footer() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 border-t border-slate-800 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 text-slate-100">
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
            className="text-slate-300 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Icon icon="mdi:instagram" width="24" height="24" />
          </a>
          <a
            href="https://www.facebook.com/PhatBo0905"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Icon icon="mdi:facebook" width="24" height="24" />
          </a>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-4 w-px bg-slate-700"></div>

        {/* Links */}
        <div className="flex gap-6 text-slate-300 text-sm">
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

      <p className="text-slate-400 text-sm">© 2025 PhatBo Studio. All rights reserved.</p>
    </div>
  )
}
