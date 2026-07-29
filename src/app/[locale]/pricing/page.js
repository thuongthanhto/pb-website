import {
  PricingHero,
  PricingCards,
  ComparisonTable,
  Testimonials,
  PricingFAQ,
  PricingCTA,
} from '@/features/pricing/components'
import {
  defaultOgImages,
  localizedAlternates,
  openGraphLocales,
  siteName,
} from '@/lib/seo-metadata'
import {
  serviceOfferSchema,
  faqSchema,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/structured-data'
import { normalizeLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function generateMetadata({ params }) {
  const locale = normalizeLocale(params.locale)
  const { title, description, keywords } = getDictionary(locale).pricing.meta

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: localizedAlternates(locale, '/pricing'),
    openGraph: {
      ...openGraphLocales(locale),
      url: localePath(locale, '/pricing'),
      siteName: siteName(locale),
      title,
      description,
      images: defaultOgImages,
    },
  }
}

export default function PricingPage({ params }) {
  const locale = normalizeLocale(params.locale)
  const dict = getDictionary(locale)

  // Giá trong JSON-LD đọc từ đúng dictionary đang render, nên con số Google thấy
  // luôn trùng con số trên trang.
  const structuredData = jsonLd(
    serviceOfferSchema(locale, dict.pricing.cards.packages),
    faqSchema(locale, dict.pricing.faq.items),
    breadcrumbSchema(locale, [
      { name: dict.common.nav.home, path: '/' },
      { name: dict.common.nav.pricing, path: '/pricing' },
    ])
  )

  return (
    <main className="flex-1 flex flex-col items-center w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      {/* Hero Section */}
      <PricingHero locale={locale} />

      {/* Pricing Cards */}
      <PricingCards locale={locale} />

      {/* Comparison Table */}
      <ComparisonTable locale={locale} />

      {/* Testimonials */}
      <Testimonials locale={locale} />

      {/* FAQ — trả lời đúng câu khách tìm trên Google */}
      <PricingFAQ locale={locale} />

      {/* CTA Section */}
      <PricingCTA locale={locale} />
    </main>
  )
}
