import '@/styles/globals.css'
import { Plus_Jakarta_Sans, Noto_Sans } from 'next/font/google'
import { Header } from '@/features/layout/header'
import { Footer } from '@/features/layout/footer'
import BokehBackground from '@/components/background/BokehBackground'
import FallingEffect from '@/components/background/FallingEffect'

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

export const metadata = {
  title: 'PhatBo Studio - Lưu giữ khoảnh khắc, kiến tạo ký ức',
  description: 'Chúng tôi kể câu chuyện của bạn qua lăng kính nghệ thuật. Đội ngũ nhiếp ảnh chuyên nghiệp sẵn sàng cho mọi dịp đặc biệt.',
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
      </body>
    </html>
  )
}
