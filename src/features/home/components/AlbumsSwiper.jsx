'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';

export function AlbumsSwiper({ images = [] }) {
  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';
  const swiperRef = useRef(null);
  const [ready, setReady] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`albums-swiper-wrapper relative group/nav transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setReady(true);
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="!pb-14"
      >
        {images.map((image, idx) => {
          const imageUrl = `${publicDomain}/${image.key}`;
          return (
            <SwiperSlide key={image.id || idx}>
              <Link
                href="/albums"
                className="group relative block overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={imageUrl}
                  alt={image.title || image.folder || `Ảnh ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary shadow-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300 cursor-pointer"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary shadow-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300 cursor-pointer"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18"></polyline>
        </svg>
      </button>

      <style jsx global>{`
        .albums-swiper-wrapper .swiper:not(.swiper-initialized) {
          overflow: hidden;
          visibility: hidden;
        }
        .albums-swiper-wrapper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .albums-swiper-wrapper .swiper-pagination-bullet-active {
          background: #e8633b;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
