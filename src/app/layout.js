import '@/styles/globals.css'
import { Plus_Jakarta_Sans, Noto_Sans } from 'next/font/google'
import { Header } from '@/features/layout/header'
import { Footer } from '@/features/layout/footer'
import BokehBackground from '@/components/background/BokehBackground'
import FallingEffect from '@/components/background/FallingEffect'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

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

const siteTitle = 'PhatBo Studio - Lưu giữ khoảnh khắc, kiến tạo ký ức'
const siteDescription = 'Chúng tôi kể câu chuyện của bạn qua lăng kính nghệ thuật. Đội ngũ nhiếp ảnh chuyên nghiệp sẵn sàng cho mọi dịp đặc biệt.'

export const metadata = {
  metadataBase: new URL('https://phatbo.info'),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://phatbo.info',
    siteName: 'PhatBo Studio',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/logo-pb.png',
        width: 1200,
        height: 630,
        alt: 'PhatBo Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/logo-pb.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${noto.variable}`}>
      <head>
        <link rel="icon" href="/logo-pb.png" type="image/png" />
      </head>
      <body className="bg-background-light font-display text-text-main antialiased selection:bg-primary selection:text-white">
        <BokehBackground />
        <FallingEffect variant="petals" />
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          <Header />
          {children}
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
