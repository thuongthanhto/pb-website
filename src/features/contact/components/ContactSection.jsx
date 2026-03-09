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
          <div className="flex flex-wrap justify-center gap-5">
            {contactItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                title={item.label}
              >
                <Icon icon={item.icon} width="22" height="22" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
