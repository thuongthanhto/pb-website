import { Icon } from '@iconify/react'

export function ContactSection() {
  const contactItems = [
    {
      icon: 'mdi:instagram',
      href: 'https://www.instagram.com/scryer_bo',
      label: 'Instagram',
    },
    {
      icon: 'mdi:facebook',
      href: 'https://www.facebook.com/PhatBo0905',
      label: 'Facebook',
    },
    {
      icon: 'mdi:phone',
      href: 'tel:+84909383332',
      label: 'Hotline',
    },
    {
      icon: 'mdi:email',
      href: 'mailto:phatchay95@gmail.com',
      label: 'Email',
    },
  ]

  return (
    <section className="w-full px-4 md:px-10 py-12 md:py-16 flex justify-center">
      <div className="w-full max-w-[1280px]">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="text-text-muted text-sm font-medium mb-2">
              Liên hệ với chúng tôi
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {contactItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="w-24 h-24 rounded-3xl border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                title={item.label}
              >
                <Icon icon={item.icon} width="32" height="32" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
