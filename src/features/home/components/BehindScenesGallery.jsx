'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { Lightbox } from '@/components/Lightbox';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n/I18nProvider';

// Ảnh tác nghiệp (hậu trường) — đặt trong /public/work. Khung thẻ 3:4.
// Caption lấy từ dictionary (home.behindScenes.shots) theo cùng thứ tự.
const SHOT_SOURCES = [
  '/work/work01.jpeg',
  '/work/work02.jpeg',
  '/work/work03.jpeg',
  '/work/work04.webp',
  '/work/work05.webp',
  '/work/work06.webp',
  '/work/work07.webp',
];

export function BehindScenesGallery() {
  const { dict } = useI18n();
  const [openIdx, setOpenIdx] = useState(null);

  // Rail cuộn ngang: mờ dần 2 mép để gợi ý còn ảnh phía ngoài khung.
  const railRef = useRef(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: true });

  const syncEdge = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ atStart: el.scrollLeft <= 8, atEnd: el.scrollLeft >= max - 8 });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncEdge();
    const ro = new ResizeObserver(syncEdge);
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncEdge]);

  const shots = SHOT_SOURCES.map((src, idx) => ({
    src,
    caption: dict.home.behindScenes.shots[idx] ?? '',
  }));

  return (
    <>
      {/* Dải ảnh hậu trường 3:4 — cuộn ngang có snap trên mọi kích thước,
          thẻ so le nhẹ trên desktop cho sinh động. */}
      <Reveal delay={0.15} className="order-2 relative min-w-0">
        <div
          ref={railRef}
          onScroll={syncEdge}
          className="flex items-start gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 py-2"
        >
          {shots.map((shot, idx) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setOpenIdx(idx)}
              aria-label={`${dict.common.lightbox.viewImage}: ${shot.caption}`}
              className={`group relative shrink-0 w-[72%] sm:w-[46%] md:w-[190px] lg:w-[210px] aspect-[3/4] overflow-hidden rounded-2xl shadow-md snap-start cursor-pointer ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-1 ${
                idx % 2 === 1 ? 'md:mt-10' : ''
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="(max-width: 640px) 72vw, (max-width: 768px) 46vw, 210px"
                quality={80}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Gợi ý click để xem full */}
              <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/30 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <Icon name="fullscreen" className="text-[20px]" />
              </span>

              <p className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-left text-white text-xs md:text-sm font-semibold translate-y-1 group-hover:translate-y-0 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                {shot.caption}
              </p>
            </button>
          ))}
        </div>

        {/* Mép mờ chỉ hiện khi còn ảnh ở phía đó (desktop) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 hidden md:block w-12 bg-gradient-to-r from-background-light to-transparent transition-opacity duration-300 ${
            edge.atStart ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 hidden md:block w-12 bg-gradient-to-l from-background-light to-transparent transition-opacity duration-300 ${
            edge.atEnd ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </Reveal>

      <Lightbox
        items={shots}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onNavigate={setOpenIdx}
      />
    </>
  );
}
