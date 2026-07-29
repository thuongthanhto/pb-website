import { Reveal } from '@/components/motion/Reveal'
import { Icon } from '@/components/Icon'
import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

// Avatar + số sao là dữ liệu đi kèm review, ghép theo index với
// dict.pricing.testimonials.items.
const TESTIMONIAL_META = [
  {
    rating: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjCljzgnD_Q4seJEeOJYgYBsI4BmMRbOdC-MsxprgfBWfFZAkzpUtnMdTDXpfIqtZ2OkZPyf8C7w-0BpAFpxh0iyEdzw5zNsvqkwNfoLXqEGFtTAaJX68fkkbHVQniONrxFxfoyJErbLiYgAZePC2hiLQxXPV6gU9mqCXz_de216IlrrXdRFER-YM7gl1B_4610v14Ht1T1dbk4NLomYZUXkkGzo4jtstwbPfeywNFi6i9w0hkPLTUETluYJSEsus4CSp81_iP4LA',
  },
  {
    rating: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsIsUKnijjSBeADOxHDiTYBIARxa5F2ZBjpg-QeuQ3_9dQ6zPaENrFOQw1XI9aIxE_5U8Ym1kNOb42x-Bi7t7wxWDzHG3JqxOQh25jHWGUf2IEFtgOxqRpCla06iTzIMmGPOsyepRtHeZKi_u35E2xLLWVzZoWtzG1OKc9GsRa-txfVrSuNyCiUge_Ys412uY1IaWojojWKp-W6ZVAH_OnZC6UCMO-okHGpwxv8cqqKE1DOnAkogcBrcnbxTfIyPhONywSwlS8xc8',
  },
  {
    rating: 4.5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVijOPFT0A9PRMoBKyyr4VL5feyiHP6teY0UUBfRegPojr0UkexYML87hLyQp5epxzAPAYI5ByX4DS8u2J7uhRmTYUIFtKs8-om_gcIkBmfOEtIOsm0wD6QHE3TgkuoCpSVTGEkST65ULgRXmWhyN1qXzh72kSn__eoVZpoQROreBHcpE_rYlH2UFHziqOUYEig0RRtxlgq1S0pKGCxdQTZj07DaYJOH-PgFMVW-x3jN5iQ8Di8vlCjY2bIyvULzQMC3i9XYeACZE',
  },
]

const renderStars = (rating) =>
  Array.from({ length: 5 }).map((_, i) => (
    <Icon
      key={i}
      name={i < Math.floor(rating) ? 'star' : i < rating ? 'star_half' : 'star_outline'}
      className="text-[22px] text-yellow-400"
    />
  ))

export function Testimonials({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).pricing.testimonials

  return (
    <section className="w-full py-20 flex justify-center relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-700/60 before:to-transparent">
      <div className="w-full max-w-[1280px] px-4 md:px-10 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-text-main">
          {t.title}
        </h2>
        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {t.items.map((testimonial, idx) => {
            const meta = TESTIMONIAL_META[idx] ?? { rating: 5, image: '' }
            return (
              <Reveal
                key={idx}
                delay={idx * 0.1}
                className="bg-stone-800/50 p-8 rounded-2xl border border-border-light shadow-sm hover:shadow-lg transition-shadow w-[82vw] max-w-[340px] md:w-auto md:max-w-none snap-center flex-shrink-0 md:flex-shrink"
              >
                <div
                  className="flex items-center gap-1 mb-4"
                  aria-label={`${meta.rating}/5`}
                >
                  {renderStars(meta.rating)}
                </div>
                <p className="text-text-secondary text-base italic mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 border-t border-border-light pt-4">
                  <div
                    className="size-12 rounded-full bg-stone-200 bg-cover bg-center shadow-inner"
                    style={{ backgroundImage: `url("${meta.image}")` }}
                  ></div>
                  <div>
                    <p className="font-bold text-text-main text-sm">{testimonial.name}</p>
                    <p className="text-xs text-text-secondary font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
