'use client'

export default function Header() {
  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <div className="flex items-center gap-4 text-text-main">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined !text-[32px]">camera</span>
          </div>
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] hidden md:block">
            PhatBo
          </h2>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-gray-600 text-sm font-medium hover:text-primary transition-colors" href="#portfolio">
              Portfolio
            </a>
            <a className="text-gray-600 text-sm font-medium hover:text-primary transition-colors" href="#services">
              Dịch vụ
            </a>
            <a className="text-gray-600 text-sm font-medium hover:text-primary transition-colors" href="#about">
              Giới thiệu
            </a>
            <a className="text-gray-600 text-sm font-medium hover:text-primary transition-colors" href="#contact">
              Liên hệ
            </a>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
            <span className="truncate">Đặt lịch ngay</span>
          </button>
        </div>
      </div>
    </div>
  )
}
