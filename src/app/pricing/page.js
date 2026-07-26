import {
  PricingHero,
  PricingCards,
  ComparisonTable,
  Testimonials,
  PricingCTA,
} from '@/features/pricing/components'
import { defaultOgImages } from '@/lib/seo-metadata'

const title = 'Dịch vụ & Giá - PhatBo Photography'
const description = 'Khám phá các gói chụp ảnh và bảng giá của chúng tôi. Từ Pre-Wedding đến phóng sự cưới, chúng tôi có những gói dịch vụ phù hợp với bạn.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: { url: '/pricing', title, description, images: defaultOgImages },
}

export default function PricingPage() {
  return (
    <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <PricingHero />

        {/* Pricing Cards */}
        <PricingCards />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <PricingCTA />
    </main>
  )
}
