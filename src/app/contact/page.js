import {
  AboutHero,
  TeamPersonnel,
  ContactSection,
} from '@/features/contact/components'
import { defaultOgImages } from '@/lib/seo-metadata'

const title = 'Giới thiệu - PhatBo Photography'
const description =
  'Tìm hiểu về nhiếp ảnh gia đứng sau PhatBo Photography. Hành trình, đội ngũ và niềm đam mê ghi lại những khoảnh khắc vượt thời gian.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title, description, images: defaultOgImages },
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
