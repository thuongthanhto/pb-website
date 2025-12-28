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
    <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <AboutHero />

        {/* Contact Section */}
        <ContactSection />

        {/* Team Personnel Section */}
        <TeamPersonnel />
    </main>
  )
}
