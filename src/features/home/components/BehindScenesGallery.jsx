'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { Lightbox } from '@/components/Lightbox';

// Ảnh tác nghiệp (hậu trường) — đặt trong /public/work. Đều là ảnh dọc 9:16.
const SHOTS = [
  { src: '/work/work01.jpeg', caption: 'Set up ánh sáng tại studio' },
  { src: '/work/work02.jpeg', caption: 'Ekip tác nghiệp tại hiện trường' },
  { src: '/work/work03.jpeg', caption: 'Canh khung & chỉ đạo tạo dáng' },
  { src: '/work/work04.webp', caption: 'Hậu kỳ & chọn ảnh cùng khách' },
];

export function BehindScenesGallery() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <>
      {/* Dải ảnh hậu trường dạng story dọc 9:16 — hiện đủ ảnh, không cắt.
          Mobile: cuộn ngang có snap. Desktop: 4 thẻ so le nhẹ cho sinh động. */}
      <Reveal
        delay={0.15}
        className="order-2 flex items-start gap-3 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
      >
        {SHOTS.map((shot, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setOpenIdx(idx)}
            aria-label={`Xem ảnh: ${shot.caption}`}
            className={`group relative shrink-0 md:shrink w-[72%] sm:w-[46%] md:w-auto md:flex-1 aspect-[9/16] overflow-hidden rounded-2xl shadow-md snap-start cursor-pointer ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-1 ${
              idx % 2 === 1 ? 'md:mt-10' : ''
            }`}
          >
            <Image
              src={shot.src}
              alt={shot.caption}
              fill
              sizes="(max-width: 768px) 72vw, 22vw"
              quality={80}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Gợi ý click để xem full */}
            <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/30 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
              <span className="material-symbols-outlined text-[20px]">
                fullscreen
              </span>
            </span>

            <p className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-left text-white text-xs md:text-sm font-semibold translate-y-1 group-hover:translate-y-0 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
              {shot.caption}
            </p>
          </button>
        ))}
      </Reveal>

      <Lightbox
        items={SHOTS}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onNavigate={setOpenIdx}
      />
    </>
  );
}
