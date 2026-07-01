'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

function PhotoTile({ image, imageUrl, index, onImageClick, square = false }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Ảnh đã cache có thể "complete" ngay khi mount -> onLoad không bắn, xử lý ở đây.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  // Reserve the exact space before the image loads so tiles never resize on
  // load. Uses the real ratio measured on the server; falls back to 3:4.
  const ratio =
    image.width && image.height ? `${image.width} / ${image.height}` : '3 / 4';

  return (
    <motion.div
      onClick={() => onImageClick(image)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        opacity: { duration: 0.8, delay: (index % 4) * 0.05, ease: 'easeOut' },
        y: { duration: 0.9, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 ${
        square ? 'rounded-none' : 'rounded-2xl'
      }`}
    >
      <div
        className={`w-full h-full bg-stone-800 relative overflow-hidden ${
          square ? 'aspect-square' : ''
        }`}
        style={square ? undefined : { aspectRatio: ratio }}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt={image.fileName}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-[opacity,filter,transform] duration-700 ease-out group-hover:scale-105 ${
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
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

// Column count for the sm+ masonry, matching the old sm:2 / lg:3 / xl:4 breakpoints.
// Starts at a fixed value so SSR and first client render agree (no hydration
// mismatch); the real value is applied in an effect right after mount.
function useMasonryColumns() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 4;
      if (w >= 1024) return 3;
      return 2; // sm .. lg
    };
    const update = () => setCols(compute());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cols;
}

// Greedily place each image into the currently-shortest column. This is
// order-stable: an image's column depends only on the images before it, so
// appending more images (infinite scroll) never moves already-placed tiles.
function distributeIntoColumns(images, cols) {
  const columns = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);

  images.forEach((image, index) => {
    const ar =
      image.width && image.height ? image.width / image.height : 3 / 4;
    const tileHeight = 1 / ar; // relative height for equal-width columns
    let shortest = 0;
    for (let c = 1; c < cols; c++) {
      if (heights[c] < heights[shortest]) shortest = c;
    }
    columns[shortest].push({ image, index });
    heights[shortest] += tileHeight;
  });

  return columns;
}

export function PortfolioGrid({
  images = [],
  selectedFolder = 'Tất cả',
  onImageClick = () => {},
}) {
  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';

  const cols = useMasonryColumns();
  const columns = useMemo(
    () => distributeIntoColumns(images, cols),
    [images, cols]
  );

  const urlFor = (image) => `${publicDomain}/${image.key}`;

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
      {/* Mobile: uniform square grid (CSS grid never reflows on append) */}
      <div className="grid grid-cols-3 gap-1 sm:hidden">
        {images.map((image, index) => (
          <PhotoTile
            key={image.id}
            image={image}
            imageUrl={urlFor(image)}
            index={index}
            onImageClick={onImageClick}
            square
          />
        ))}
      </div>

      {/* sm+: fixed-column masonry. Items only ever append to the bottom of a
          column, so scrolling in more photos can't reshuffle existing tiles. */}
      <div className="hidden sm:flex gap-6">
        {columns.map((column, ci) => (
          <div key={ci} className="flex-1 min-w-0 flex flex-col gap-6">
            {column.map(({ image, index }) => (
              <PhotoTile
                key={image.id}
                image={image}
                imageUrl={urlFor(image)}
                index={index}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
