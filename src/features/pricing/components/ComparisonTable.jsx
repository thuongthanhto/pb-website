import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function ComparisonTable({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).pricing.comparison

  return (
    <>
      <section className="w-full pt-10 pb-4 flex justify-center">
        <div className="w-full max-w-[1280px] px-4 md:px-10 text-center">
          <h2 className="text-text-main text-2xl lg:text-3xl font-bold leading-tight">
            {t.title}
          </h2>
          <p className="text-text-secondary mt-2 text-sm lg:text-base">
            {t.subtitle}
          </p>
        </div>
      </section>
      <section className="w-full pb-16 flex justify-center">
        <div className="w-full max-w-[1280px] px-4 md:px-10">
          <div className="w-full overflow-x-auto rounded-2xl border border-border-light bg-stone-800 shadow-lg">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <caption className="sr-only">{t.title}</caption>
              <thead>
                <tr className="bg-stone-900 border-b border-border-light">
                  <th scope="col" className="p-6 text-base font-bold text-text-main w-1/3">
                    {t.featureColumn}
                  </th>
                  <th scope="col" className="p-6 text-base font-bold text-text-secondary w-1/3">
                    {t.planA}
                  </th>
                  <th scope="col" className="p-6 text-base font-bold text-primary w-1/3 bg-primary/10">
                    {t.planB}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {t.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-700/30 transition-colors">
                    <th scope="row" className="p-5 px-6 text-text-main font-medium text-sm text-left">
                      {row.feature}
                    </th>
                    <td className="p-5 px-6 text-text-secondary text-sm">{row.a}</td>
                    <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">
                      {row.b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
