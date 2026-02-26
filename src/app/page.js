import Link from 'next/link'
import { AlbumsSwiper } from '@/features/home/components'
import { getAllImages } from '@/lib/r2-albums'

export default async function Home() {
  // Fetch images from R2 and pick up to 10 for the carousel
  const allImages = await getAllImages();
  const swiperImages = allImages.slice(0, 10);

  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12">
          <div className="@container">
            <div className="flex min-h-[420px] md:min-h-[600px] flex-col gap-5 md:gap-6 rounded-2xl items-center justify-center p-6 md:p-8 relative overflow-hidden group shadow-2xl shadow-gray-200">
              <iframe
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
                src="https://www.youtube.com/embed/D4xpVntBzek?autoplay=1&mute=1&loop=1&playlist=D4xpVntBzek&controls=0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Studio Video Background"
              ></iframe>
              {/* Mobile fallback background */}
              <div className="absolute inset-0 md:hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
              <div className="absolute inset-0 bg-black/50 md:bg-black/40 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 z-0"></div>
              <div className="flex flex-col gap-4 text-center z-10 max-w-[800px]">
                <h1 className="text-white text-3xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-xl">
                  Lưu giữ từng khoảnh khắc <br />{' '}
                  <span className="text-primary">vô giá</span> của bạn
                </h1>
                <h2 className="text-gray-100 text-base md:text-xl font-normal leading-relaxed drop-shadow-md max-w-[600px] mx-auto">
                  Chúng tôi kể câu chuyện của bạn qua lăng kính nghệ thuật. Đội
                  ngũ nhiếp ảnh chuyên nghiệp sẵn sàng cho mọi dịp đặc biệt.
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full h-12 md:h-14 px-6 md:px-8 bg-primary hover:bg-primary-dark transition-all text-white text-base md:text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
                  >
                    Đặt lịch ngay
                  </Link>
                  <Link
                    href="/albums"
                    className="inline-flex items-center justify-center rounded-full h-12 md:h-14 px-6 md:px-8 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-all text-white text-base md:text-lg font-bold active:scale-95"
                  >
                    Xem bộ sưu tập
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="w-full bg-surface-light py-8" id="portfolio">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col gap-10">
          <div className="flex justify-between items-end border-b border-gray-200 pb-6">
            <div>

            </div>
            <a
              className="hidden md:flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium"
              href="/albums"
            >
              Xem tất cả{' '}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
          </div>
          <AlbumsSwiper images={swiperImages} />
          <div className="flex md:hidden justify-center mt-4">
            <Link
              href="/albums"
              className="text-primary font-bold text-sm flex items-center gap-2"
            >
              Xem tất cả dự án{' '}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full bg-white py-10 md:py-24" id="services">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-3 md:gap-4 text-center items-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm bg-primary/5 px-3 py-1 rounded-full">
                Dịch Vụ Của Chúng Tôi
              </h2>
              <h1 className="text-gray-900 text-2xl md:text-5xl font-bold leading-tight max-w-[720px]">
                Gói chụp ảnh đa dạng
              </h1>
              <p className="text-text-secondary text-base md:text-lg font-normal leading-relaxed max-w-[600px]">
                Chúng tôi cung cấp các gói chụp ảnh chuyên nghiệp được thiết kế
                riêng để đáp ứng mọi nhu cầu của bạn.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  icon: 'favorite',
                  title: 'Chụp ảnh cưới',
                  description:
                    'Ghi lại những khoảnh khắc lãng mạn, cảm xúc chân thật nhất trong ngày trọng đại của đôi lứa với phong cách cinematic.',
                },
                {
                  icon: 'face',
                  title: 'Chụp chân dung',
                  description:
                    'Thể hiện cá tính độc đáo và vẻ đẹp riêng biệt qua từng khung hình chân dung nghệ thuật với ánh sáng studio chuyên nghiệp.',
                },
                {
                  icon: 'celebration',
                  title: 'Chụp sự kiện',
                  description:
                    'Bắt trọn không khí sôi động và những điểm nhấn quan trọng trong các sự kiện công ty, hội nghị hay tiệc tất niên.',
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 md:gap-6 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group active:border-primary/30"
                >
                  <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-[36px]">
                      {service.icon}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-gray-900 text-xl font-bold">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <a
                    className="text-primary text-sm font-bold mt-2 hover:text-primary-dark transition-colors flex items-center gap-1"
                    href="/pricing"
                  >
                    Xem chi tiết{' '}
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full bg-surface-light py-10 md:py-24 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <h2 className="text-gray-900 text-xl md:text-4xl font-bold text-center mb-8 md:mb-16">
            Khách hàng nói gì về chúng tôi?
          </h2>
          <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              {
                text: '"Đội ngũ cực kỳ chuyên nghiệp và tận tâm. Bộ ảnh cưới của mình đẹp ngoài sức tưởng tượng. Màu ảnh trong trẻo, tự nhiên đúng ý mình. Cảm ơn studio rất nhiều!"',
                name: 'Lan Anh',
                role: 'Chụp ảnh cưới',
                avatar:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBLUHcBs9wo3mYwfbP3jsysp-wZUtete7eoZzLRJaKbRZhjIGnMAlDrhSax9V9TxuaWYIfqb68esXGZ1zCEhnt-WbHKjj1oLw8HwdOtp2ErNgceollMKhbEsFFieO-PL2kCo-DsR4ZFxtHKjrfECS2E1sF3God5hcru4TOGKKCqbGDqfAtbBeJxEHGvdcsgwS-f9HAzwGHGZ-7MSn6MHo2BSz12GDc3T5caBa9PtrXiFY1z0oA6xRRghLXmglcQEpLuQwekDsGIdBk',
              },
              {
                text: '"Mình chụp profile cá nhân để làm CV và LinkedIn. Ánh sáng rất đẹp, thợ chụp hướng dẫn tạo dáng nhiệt tình, không bị ngại. Rất đáng tiền!"',
                name: 'Minh Tuấn',
                role: 'Chụp chân dung',
                avatar:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCsfrNGKMz-QBQDTOufUPrszjPaMHRTaEjwcnXPU2gjnes5vrgPsGwr2jblypEaD0gCe4jPVPTcNvcgYdhoFR2bOWLlYffXxZk60IaAOcXMEEwGuM7vxzi5BCmsSCb_Rtf6G_e5GARyl5GhsP-4jHHW6mrPxN9Oc1R0IjihGGPD_0xecey4MYQmCC1oxB1butum-uw-S5Y2oeeH2VS2fj0q_PBBIA5zWGBRgV-riugudnvEqieUjzypc1O6p_UeAdypcIk54gBL7Uc',
              },
              {
                text: '"Công ty mình đã thuê studio chụp tiệc cuối năm. Ảnh trả rất nhanh, bắt trọn khoảnh khắc vui vẻ của mọi người. Sẽ ủng hộ dài dài."',
                name: 'Thu Hà',
                role: 'HR Manager',
                avatar:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAbwghWN5JKuS9col-X56CleCAWG8N1CoFNNArgYcAo2OE68PqIT0Zad_5EBGeq7qQklo_aHoLE3KnadYCCFMV1_U0olwtmpjHJF6wC-wwyXIRa--LDIvaf7w7JPZopM5WfBBzpDv-MzVY51A0ngLLBDnrgkAMoWic7o3Pp5MnJfZImEtgSbn1-OrJiIJ6iIfC67a9_nQ0oHgal5p5x59DzA4PUEpj5KgH0tQlt3kIH1rnsMeza_0r19fbi2qhtGBkfwNGuF3SHuM',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 shadow-sm p-6 md:p-8 rounded-2xl flex flex-col gap-4 relative min-w-[280px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink"
              >
                <div className="absolute top-6 right-6 text-gray-100">
                  <span className="material-symbols-outlined text-[48px]">
                    format_quote
                  </span>
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill-current text-[20px]"
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed relative z-10">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-50">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/20"
                    style={{ backgroundImage: `url('${testimonial.avatar}')` }}
                  ></div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary text-xs font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-white pt-12 md:pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-[960px] mx-auto px-4 md:px-10 flex flex-col items-center text-center gap-5 md:gap-6 mb-12 md:mb-20">
          <h2 className="text-gray-900 text-2xl md:text-5xl font-black tracking-tight">
            Sẵn sàng để tỏa sáng?
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-[600px] leading-relaxed">
            Hãy để chúng tôi giúp bạn lưu giữ những khoảnh khắc đẹp nhất ngay
            hôm nay với phong cách tinh tế và hiện đại.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 md:mt-6 w-full sm:w-auto">
            <Link
              href="/contact"
              className="flex w-full sm:w-auto sm:min-w-[160px] cursor-pointer items-center justify-center rounded-full h-12 md:h-14 px-8 bg-primary hover:bg-primary-dark transition-all text-white text-base md:text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
            >
              Đặt lịch ngay
            </Link>
            <Link
              href="/contact"
              className="flex w-full sm:w-auto sm:min-w-[160px] cursor-pointer items-center justify-center rounded-full h-12 md:h-14 px-8 bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all text-gray-700 text-base md:text-lg font-bold hover:shadow-lg active:scale-95"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
