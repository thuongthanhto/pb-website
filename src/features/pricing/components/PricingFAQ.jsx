import { Reveal } from '@/components/motion/Reveal'
import { Icon } from '@/components/Icon'
import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/**
 * FAQ trả lời đúng những câu khách gõ vào Google ("chụp ảnh cưới bao nhiêu
 * tiền", "phóng sự cưới là gì", "destination wedding vietnam cost"...).
 *
 * Dùng <details>/<summary> thay vì accordion JS: nội dung luôn nằm trong HTML
 * nên Google đọc được, và không cần thêm client component nào.
 */
export function PricingFAQ({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).pricing.faq

  return (
    <section
      id="faq"
      className="w-full py-16 md:py-20 flex justify-center relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-stone-700/60 before:to-transparent"
    >
      <div className="w-full max-w-[860px] px-4 md:px-10">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
            {t.title}
          </h2>
          <p className="text-text-secondary text-base md:text-lg mt-3">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {t.items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <details className="group rounded-2xl border border-border-light bg-stone-800/40 open:bg-stone-800/60 transition-colors">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 md:p-6 list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-text-main text-base md:text-lg font-bold">
                    {item.question}
                  </h3>
                  <Icon
                    name="expand_more"
                    className="text-[24px] text-primary shrink-0 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-text-secondary text-sm md:text-base leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
