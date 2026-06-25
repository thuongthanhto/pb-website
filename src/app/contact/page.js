import {
  AboutHero,
  TeamPersonnel,
  ContactSection,
} from '@/features/contact/components'

export const metadata = {
  title: 'Giới thiệu - PhatBo Studio',
  description:
    'Tìm hiểu về nhiếp ảnh gia đứng sau PhatBo Studio. Hành trình, đội ngũ và niềm đam mê ghi lại những khoảnh khắc vượt thời gian.',
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
