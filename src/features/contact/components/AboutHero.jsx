export function AboutHero() {
  return (
    <div className="w-full bg-white">
      <div className="px-4 md:px-10 lg:px-40 flex justify-center py-8">
        <div className="w-full max-w-[1024px]">
          <div
            className="flex min-h-[500px] flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center p-8 relative overflow-hidden group shadow-soft"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAw19dMU6z3tscwtrLXiVro7Twovw9-bhygYQTGtBoOOV0uNywUODIyBG6ZTphlsBbttifkIgtBOjR7hRTdIl_9hZC0CRZ8JC3FrU8qrTOFYvsJbT8Oznhl2EyoJZOA5TBDJdxuhxiql3BYcNsEDPJ__EXSNrC1eJIVFgWCrsxlP1rn-BN6hX86iSVZqUm_cR_pSBWgyZWTN5h4YRGIBIedSS22zOcb-5xPr1NLJISlDNC_qLfrCUlOPCAkgwqRFQ4T4paIgog12hE")`,
            }}
          >
            <div className="flex flex-col gap-5 text-center max-w-3xl z-10">
              <h1 className="text-white text-5xl md:text-6xl font-display font-bold leading-tight tracking-tight drop-shadow-md">
                Ghi lại những khoảnh khắc thực tế của cuộc đời
              </h1>
              <h2 className="text-white/90 text-lg md:text-xl font-light leading-relaxed drop-shadow-sm max-w-2xl mx-auto">
                Chụp ảnh chuyên nghiệp kể câu chuyện độc đáo của bạn thông qua những hình ảnh chân thực và vượt thời gian.
              </h2>
            </div>
            <a href="/albums" className="z-10 mt-2 flex min-w-[140px] cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-white hover:bg-gray-50 text-primary text-base font-bold transition-transform hover:scale-105 shadow-lg">
              Xem bộ sưu tập
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
