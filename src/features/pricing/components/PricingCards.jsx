export function PricingCards() {
  const packages = [
    {
      name: 'Gói Pre-Wedding Studio',
      price: '15.000.000đ',
      description: '2 Layouts chụp tại Studio. Tinh tế và nghệ thuật.',
      featured: false,
      features: [
        'Hoa tươi, Make up & Hair',
        'Retouch 30 ảnh hoàn chỉnh',
        'Album 30x30 (30 trang) & Hộp đựng',
        '2 Hình lớn 60x90 ép gỗ',
        'Album giấy HD siêu nét',
        'Slide chiếu nhà hàng & Full file gốc',
      ],
      buttonText: 'Đặt lịch Studio',
    },
    {
      name: 'Pre-Wedding Studio & Street',
      price: '19.000.000đ',
      description: '3 Layouts (Indoor & Outdoor Sài Gòn). Đa dạng phong cách.',
      featured: true,
      badge: 'Được yêu thích nhất',
      features: [
        'Bối cảnh Studio & Streetstyle Sài Gòn',
        'Hoa tươi, Make up & Hair thay đổi',
        'Retouch 35 ảnh cao cấp',
        'Album 30x30 (30 trang) & Hộp cao cấp',
        '2 Hình lớn 60x90cm',
        'Slide nhà hàng & Giao toàn bộ file gốc',
      ],
      buttonText: 'Đặt lịch ngay',
    },
    {
      name: 'Gói Phóng Sự Cưới',
      price: '12.000.000đ',
      description: 'Ghi lại khoảnh khắc chân thực ngày trọng đại.',
      featured: false,
      features: [
        '2 Máy phóng sự + 1 Máy truyền thống',
        'Thời gian: Full Day (Cả ngày)',
        'Chụp 2 bên nhà (Lễ gia tiên & Đón khách)',
        'Hỗ trợ hướng dẫn làm lễ gia tiên',
        'Đi bàn tiệc',
        'Chụp không giới hạn file',
      ],
      buttonText: 'Liên hệ tư vấn',
    },
    {
      name: 'Gói Quay Phóng Sự',
      price: '12.000.000đ',
      description: 'Video nghệ thuật chất lượng cao.',
      featured: false,
      features: [
        '2 Máy quay PS thiết bị cao cấp',
        'Thời gian: Full Day (Cả ngày)',
        'Quay tại 2 bên nhà & Tiệc cưới',
        'Chất lượng Video 2K',
        'Tùy chọn nâng cấp lên 4K',
      ],
      buttonText: 'Liên hệ tư vấn',
    },
  ]

  return (
    <section className="w-full px-4 lg:px-40 pb-20 pt-8 flex justify-center bg-white">
      <div className="w-full max-w-[1200px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-text-main tracking-tight">
            Lựa chọn gói phù hợp
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Đa dạng lựa chọn từ Pre-Wedding đến ngày trọng đại với những gói dịch vụ chuyên nghiệp nhất.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col gap-6 rounded-3xl p-8 transition-all duration-300 ${
                pkg.featured
                  ? 'border-2 border-primary bg-white shadow-xl shadow-primary/5 hover:-translate-y-1'
                  : 'border border-border-light bg-white hover:shadow-hover hover:-translate-y-1'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg shadow-primary/20 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  {pkg.badge}
                </div>
              )}
              <div className="flex flex-col gap-2 mt={pkg.featured ? 2 : 0}">
                <h3 className={`text-xl font-bold ${pkg.featured ? 'text-primary' : 'text-text-main'}`}>
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 text-text-main">
                  <span className="text-4xl font-extrabold tracking-tighter">{pkg.price}</span>
                </div>
                <p className={`text-sm mt-2 leading-relaxed font-medium ${pkg.featured ? 'text-text-secondary' : 'text-text-muted'}`}>
                  {pkg.description}
                </p>
              </div>
              <hr className={pkg.featured ? 'border-dashed border-border-light' : 'border-border-light'} />
              <ul className="flex flex-col gap-3 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${pkg.featured ? 'text-text-main font-semibold' : 'text-text-secondary'}`}>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {pkg.featured ? 'check_circle' : 'check_circle'}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full h-12 rounded-xl text-base font-bold transition-all mt-auto ${
                  pkg.featured
                    ? 'bg-primary text-white h-14 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30'
                    : 'bg-background-alt border border-border-light text-text-main hover:bg-border-light hover:text-text-main'
                }`}
              >
                {pkg.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
