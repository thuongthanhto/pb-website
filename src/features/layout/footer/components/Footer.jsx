'use client'

export default function Footer() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 text-gray-900">
        <span className="material-symbols-outlined text-primary">camera</span>
        <span className="font-bold text-lg">PhatBo</span>
      </div>
      <div className="flex gap-6 text-gray-500 text-sm">
        <a className="hover:text-primary transition-colors" href="#">
          Điều khoản
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Chính sách bảo mật
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Instagram
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Facebook
        </a>
      </div>
      <p className="text-gray-400 text-sm">© 2025 Studio. All rights reserved.</p>
    </div>
  )
}
