import '@/styles/globals.css'
import { Plus_Jakarta_Sans, Noto_Sans } from 'next/font/google'
import { Header } from '@/features/layout/header'
import { Footer } from '@/features/layout/footer'
import BokehBackground from '@/components/background/BokehBackground'
import FallingEffect from '@/components/background/FallingEffect'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import {
  siteConfig,
  defaultOgImages,
  localizedAlternates,
  openGraphLocales,
  siteName,
} from '@/lib/seo-metadata'
import { localBusinessSchema, webSiteSchema, jsonLd } from '@/lib/structured-data'
import { locales, localeMeta, normalizeLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { I18nProvider } from '@/i18n/I18nProvider'

// Self-host fonts qua next/font: tự tải, subset (kèm tiếng Việt), preload,
// và loại bỏ request CSS render-blocking từ Google Fonts.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-jakarta',
})
const noto = Noto_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-noto',
})

// Prerender cả 2 locale ở build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// metadataBase để Next resolve các URL tương đối (canonical, ảnh OG) thành
// absolute URL — thiếu nó thì thẻ og:image build ra sẽ không có domain.
export function generateMetadata({ params }) {
  const locale = normalizeLocale(params.locale)
  const { title, description, keywords } = getDictionary(locale).home.meta

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    keywords: keywords.join(', '),
    alternates: localizedAlternates(locale, '/'),
    openGraph: {
      type: 'website',
      ...openGraphLocales(locale),
      url: localePath(locale, '/'),
      siteName: siteName(locale),
      title,
      description,
      images: defaultOgImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.defaultImage],
    },
  }
}

export default function RootLayout({ children, params }) {
  const locale = normalizeLocale(params.locale)
  const dictionary = getDictionary(locale)

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${jakarta.variable} ${noto.variable}`}
    >
      <head>
        <link rel="icon" href="/logo-pb.png" type="image/png" />
        {/* Nhận diện doanh nghiệp: studio ảnh cưới ở TP.HCM, khoảng giá, ngôn
            ngữ phục vụ và các nước nhận khách. Đặt ở layout nên có trên mọi trang. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(
              localBusinessSchema(locale),
              webSiteSchema(locale)
            ),
          }}
        />
      </head>
      <body className="bg-background-light font-display text-text-main antialiased selection:bg-primary selection:text-white">
        <I18nProvider locale={locale} dictionary={dictionary}>
          <BokehBackground />
          <FallingEffect variant="petals" />
          <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header />
            {children}
            <Footer />
          </div>
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
