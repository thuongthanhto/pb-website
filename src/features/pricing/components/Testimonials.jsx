export function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: 'Gói Pre-Wedding Studio & Street thực sự đáng tiền. Ekip nhiệt tình, hướng dẫn tạo dáng rất chuyên nghiệp. Ảnh nhận về đẹp hơn mong đợi!',
      name: 'Minh Anh',
      role: 'Khách hàng cá nhân',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjCljzgnD_Q4seJEeOJYgYBsI4BmMRbOdC-MsxprgfBWfFZAkzpUtnMdTDXpfIqtZ2OkZPyf8C7w-0BpAFpxh0iyEdzw5zNsvqkwNfoLXqEGFtTAaJX68fkkbHVQniONrxFxfoyJErbLiYgAZePC2hiLQxXPV6gU9mqCXz_de216IlrrXdRFER-YM7gl1B_4610v14Ht1T1dbk4NLomYZUXkkGzo4jtstwbPfeywNFi6i9w0hkPLTUETluYJSEsus4CSp81_iP4LA',
    },
    {
      rating: 5,
      text: 'Studio đã giúp chúng mình lưu giữ trọn vẹn khoảnh khắc ngày cưới với gói Phóng sự cưới. Màu ảnh rất nghệ thuật và sang trọng.',
      name: 'Vợ chồng Tuấn & Lan',
      role: 'Chụp phóng sự cưới',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsIsUKnijjSBeADOxHDiTYBIARxa5F2ZBjpg-QeuQ3_9dQ6zPaENrFOQw1XI9aIxE_5U8Ym1kNOb42x-Bi7t7wxWDzHG3JqxOQh25jHWGUf2IEFtgOxqRpCla06iTzIMmGPOsyepRtHeZKi_u35E2xLLWVzZoWtzG1OKc9GsRa-txfVrSuNyCiUge_Ys412uY1IaWojojWKp-W6ZVAH_OnZC6UCMO-okHGpwxv8cqqKE1DOnAkogcBrcnbxTfIyPhONywSwlS8xc8',
    },
    {
      rating: 4.5,
      text: 'Dịch vụ chuyên nghiệp, tư vấn tận tâm. Mình rất thích cách studio setup ánh sáng trong gói Studio, nhìn rất có chiều sâu.',
      name: 'Hoàng Nam',
      role: 'Chụp Profile Doanh nhân',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVijOPFT0A9PRMoBKyyr4VL5feyiHP6teY0UUBfRegPojr0UkexYML87hLyQp5epxzAPAYI5ByX4DS8u2J7uhRmTYUIFtKs8-om_gcIkBmfOEtIOsm0wD6QHE3TgkuoCpSVTGEkST65ULgRXmWhyN1qXzh72kSn__eoVZpoQROreBHcpE_rYlH2UFHziqOUYEig0RRtxlgq1S0pKGCxdQTZj07DaYJOH-PgFMVW-x3jN5iQ8Di8vlCjY2bIyvULzQMC3i9XYeACZE',
    },
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="material-symbols-outlined text-[22px] fill-current text-yellow-400">
        {i < Math.floor(rating) ? 'star' : i < rating ? 'star_half' : 'star_outline'}
      </span>
    ))
  }

  return (
    <section className="w-full px-4 lg:px-40 py-20 bg-white border-t border-border-light flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-text-main">Khách hàng nói gì về chúng tôi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-background-alt p-8 rounded-2xl border border-border-light shadow-sm hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-text-secondary text-base italic mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-4 border-t border-border-light pt-4">
                <div
                  className="size-12 rounded-full bg-gray-200 bg-cover bg-center shadow-inner"
                  style={{
                    backgroundImage: `url("${testimonial.image}")`,
                  }}
                ></div>
                <div>
                  <p className="font-bold text-text-main text-sm">{testimonial.name}</p>
                  <p className="text-xs text-text-muted font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
