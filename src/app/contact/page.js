import { Header } from '@/features/layout/header'
import { Footer } from '@/features/layout/footer'
import {
  AboutHero,
  TeamPersonnel,
  ContactSection,
} from '@/features/contact/components'

export const metadata = {
  title: 'Giới thiệu - Studio Lens',
  description:
    'Tìm hiểu về nhiếp ảnh gia đứng sau Studio Lens. Tìm hiểu về hành trình, đội ngũ và niềm đam mê ghi lại những khoảnh khắc vượt thời gian của tôi.',
}

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <AboutHero />

        {/* Contact Section */}
        <ContactSection />

        {/* Team Personnel Section */}
        <TeamPersonnel />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
