import {
  PricingHero,
  PricingCards,
  ComparisonTable,
  Testimonials,
  PricingCTA,
} from '@/features/pricing/components'

export const metadata = {
  title: 'Dịch vụ & Giá - Studio Ảnh Nghệ Thuật',
  description: 'Khám phá các gói chụp ảnh và bảng giá của chúng tôi. Từ Pre-Wedding đến phóng sự cưới, chúng tôi có những gói dịch vụ phù hợp với bạn.',
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
