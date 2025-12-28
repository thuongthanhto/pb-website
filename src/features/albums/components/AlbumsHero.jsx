export function AlbumsHero() {
  return (
    <div className="w-full max-w-[960px] px-4 pt-16 pb-10 text-center animate-fade-in-up mx-auto">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-text-main">
        Lưu giữ khoảnh khắc <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
          Kiến tạo ký ức
        </span>
      </h1>
      <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto font-medium">
        Chúng tôi kể câu chuyện của bạn qua lăng kính nghệ thuật tinh tế.{' '}
        <br className="hidden sm:block" />
        Từ những cái nhìn thoáng qua đến những sự kiện trọng đại nhất.
      </p>
    </div>
  )
}
