import '@/styles/globals.css'
import { Header } from '@/features/layout/header'
import { Footer } from '@/features/layout/footer'

export const metadata = {
  title: 'Studio Ảnh Nghệ Thuật - Trang chủ',
  description: 'Chúng tôi kể câu chuyện của bạn qua lăng kính nghệ thuật. Đội ngũ nhiếp ảnh chuyên nghiệp sẵn sàng cho mọi dịp đặc biệt.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/logo-pb.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light font-display text-text-main antialiased selection:bg-primary selection:text-white">
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
