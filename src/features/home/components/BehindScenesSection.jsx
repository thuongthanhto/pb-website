import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/Icon';
import { BehindScenesGallery } from './BehindScenesGallery';
import { normalizeLocale, localePath } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export function BehindScenesSection({ locale }) {
  const current = normalizeLocale(locale);
  const dict = getDictionary(current);
  const t = dict.home.behindScenes;

  return (
    <div
      className="w-full py-10 md:py-24 border-t border-stone-800"
      id="behind-the-scenes"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr] gap-8 lg:gap-14 items-center">
          {/* Nội dung */}
          <Reveal className="flex flex-col gap-5 md:gap-6 order-1">
            <p className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm bg-primary/5 px-3 py-1 rounded-full self-start">
              {t.eyebrow}
            </p>
            <h2 className="text-stone-100 text-2xl md:text-5xl font-bold leading-tight">
              {t.titleLine1} <br className="hidden md:block" />
              {t.titleLine2}
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[520px]">
              {t.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mt-2">
              {t.stats.map((stat, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.1}
                  className="flex flex-col gap-1 rounded-2xl border border-stone-800 bg-stone-800/50 p-3 md:p-5"
                >
                  <span className="text-primary text-lg md:text-2xl font-black leading-tight text-balance">
                    {stat.value}
                  </span>
                  <span className="text-text-secondary text-[11px] md:text-sm leading-snug">
                    {stat.label}
                  </span>
                </Reveal>
              ))}
            </div>

            <Link
              href={localePath(current, '/contact')}
              className="inline-flex items-center justify-center self-start rounded-full h-12 md:h-14 px-7 md:px-8 mt-2 bg-primary hover:bg-primary-dark transition-all text-white text-base md:text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
            >
              {dict.common.cta.book}
              <Icon name="arrow_forward" className="text-[20px] ml-1" />
            </Link>
          </Reveal>

          {/* Dải ảnh hậu trường (client component: click mở full 9:16) */}
          <BehindScenesGallery />
        </div>
      </div>
    </div>
  );
}
