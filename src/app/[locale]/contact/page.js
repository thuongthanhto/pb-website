import {
  AboutHero,
  TeamPersonnel,
  ContactSection,
} from '@/features/contact/components'
import {
  defaultOgImages,
  localizedAlternates,
  openGraphLocales,
  siteName,
} from '@/lib/seo-metadata'
import { breadcrumbSchema, jsonLd } from '@/lib/structured-data'
import { normalizeLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function generateMetadata({ params }) {
  const locale = normalizeLocale(params.locale)
  const { title, description, keywords } = getDictionary(locale).contact.meta

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: localizedAlternates(locale, '/contact'),
    openGraph: {
      ...openGraphLocales(locale),
      url: localePath(locale, '/contact'),
      siteName: siteName(locale),
      title,
      description,
      images: defaultOgImages,
    },
  }
}

export default function ContactPage({ params }) {
  const locale = normalizeLocale(params.locale)
  const dict = getDictionary(locale)

  return (
    <main className="flex-1 flex flex-col items-center w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema(locale, [
              { name: dict.common.nav.home, path: '/' },
              { name: dict.common.nav.contact, path: '/contact' },
            ])
          ),
        }}
      />

      {/* Hero Section */}
      <AboutHero locale={locale} />

      {/* Contact Section */}
      <ContactSection locale={locale} />

      {/* Team Personnel Section */}
      <TeamPersonnel locale={locale} />
    </main>
  )
}
