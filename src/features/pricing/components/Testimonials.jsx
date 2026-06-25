import { Reveal } from '@/components/motion/Reveal'

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
    <section className="w-full py-20 border-t border-border-light flex justify-center">
      <div className="w-full max-w-[1280px] px-4 md:px-10 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-text-main">Khách hàng nói gì về chúng tôi?</h2>
        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((testimonial, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.1}
              className="bg-stone-800/50 p-8 rounded-2xl border border-border-light shadow-sm hover:shadow-lg transition-shadow w-[82vw] max-w-[340px] md:w-auto md:max-w-none snap-center flex-shrink-0 md:flex-shrink"
            >
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-text-secondary text-base italic mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-4 border-t border-border-light pt-4">
                <div
                  className="size-12 rounded-full bg-stone-200 bg-cover bg-center shadow-inner"
                  style={{
                    backgroundImage: `url("${testimonial.image}")`,
                  }}
                ></div>
                <div>
                  <p className="font-bold text-text-main text-sm">{testimonial.name}</p>
                  <p className="text-xs text-text-secondary font-medium">{testimonial.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
