'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function PhotoTile({ image, imageUrl, index, onImageClick }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Ảnh đã cache có thể "complete" ngay khi mount -> onLoad không bắn, xử lý ở đây.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <motion.div
      onClick={() => onImageClick(image)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="break-inside-avoid sm:mb-6 group relative rounded-none sm:rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="w-full h-full bg-stone-800 relative overflow-hidden aspect-square sm:aspect-auto">
        <img
          ref={imgRef}
          src={imageUrl}
          alt={image.fileName}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full sm:h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'
          }`}
          loading="lazy"
        />

        {/* Overlay hiện khi hover: lớp tối + icon phóng to gợi ý click */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/30 scale-90 transition-transform duration-300 group-hover:scale-100">
            <span className="material-symbols-outlined text-[26px]">zoom_in</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioGrid({
  images = [],
  selectedFolder = 'Tất cả',
  onImageClick = () => {},
}) {
  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';

  // No filtering needed here - AlbumsSection already filters the images
  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-[1280px] px-4 md:px-10 pb-24 mx-auto">
        <p className="text-stone-500 text-center">Không tìm thấy ảnh nào.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] px-1 sm:px-4 md:px-10 pb-24 mx-auto">
      <div className="grid grid-cols-3 gap-1 sm:block sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-6">
        {images.map((image, index) => (
          <PhotoTile
            key={image.id}
            image={image}
            imageUrl={`${publicDomain}/${image.key}`}
            index={index}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </div>
  );
}
