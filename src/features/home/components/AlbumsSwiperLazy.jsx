'use client';

import dynamic from 'next/dynamic';

// Lazy-load swiper (JS + CSS) chỉ ở client -> bỏ khỏi initial bundle của trang.
// Skeleton giữ đúng chiều cao (~aspect 3/4) để tránh nhảy layout khi tải.
const AlbumsSwiper = dynamic(
  () => import('./AlbumsSwiper').then((m) => m.AlbumsSwiper),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-14">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-2xl bg-stone-800/60 animate-pulse"
          />
        ))}
      </div>
    ),
  }
);

export function AlbumsSwiperLazy(props) {
  return <AlbumsSwiper {...props} />;
}
