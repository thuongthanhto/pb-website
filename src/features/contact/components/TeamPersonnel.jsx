import { Reveal } from '@/components/motion/Reveal'
import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

// Ảnh của từng thành viên — ghép theo index với dict.contact.team.members.
const MEMBER_PHOTOS = [
  { image: '/teams/linh.webp', hasGrayscale: true },
  { image: '/teams/avatar.webp', hasGrayscale: false },
  { image: '/teams/phototruyenthong.jpeg', hasGrayscale: false },
  { image: '/teams/phongsusuppot.webp', hasGrayscale: false },
]

export function TeamPersonnel({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).contact.team

  return (
    <div className="flex justify-center py-20">
      <div className="max-w-[1280px] w-full px-4 md:px-10 flex flex-col items-center gap-12">
        <Reveal className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-main">
            {t.title}
          </h2>
          <div className="w-16 h-1 bg-text-main rounded-full"></div>
          <div className="text-text-secondary text-lg leading-relaxed font-light italic flex flex-col gap-4">
            {t.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <div className="flex flex-col md:flex-row justify-center items-start gap-16 mt-8 w-full">
          {t.members.map((member, idx) => {
            const photo = MEMBER_PHOTOS[idx] ?? {
              image: '/teams/avatar.webp',
              hasGrayscale: false,
            }
            return (
              <Reveal
                key={`${member.name}-${idx}`}
                delay={idx * 0.12}
                className="flex flex-col items-center gap-5 w-full md:w-1/2 max-w-md"
              >
                <div
                  role="img"
                  aria-label={`${member.name} — ${member.role}`}
                  className={`aspect-square w-full rounded-3xl bg-cover bg-center shadow-lg hover:shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                    photo.hasGrayscale ? 'grayscale hover:grayscale-0' : ''
                  }`}
                  style={{ backgroundImage: `url("${photo.image}")` }}
                ></div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-display font-bold uppercase tracking-wide text-text-main min-h-[3.5rem] flex items-center justify-center">
                    {member.name}
                  </h3>
                  <p className="text-base text-text-secondary font-body italic mt-1">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}
