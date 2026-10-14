'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n/I18nProvider';
import { photoAlt } from '@/lib/photo-alt';

function PhotoTile({ image, imageUrl, index, onImageClick, square = false }) {
  const { dict, locale } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const [shown, setShown] = useState(false);
  const imgRef = useRef(null);
  const tileRef = useRef(null);

  // Ảnh đã cache có thể "complete" ngay khi mount -> onLoad không bắn, xử lý ở đây.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  // Reveal khi cuộn tới (thay framer-motion whileInView bằng IntersectionObserver)
  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reserve the exact space before the image loads so tiles never resize on
  // load. Uses the real ratio measured on the server; falls back to 3:4.
  const ratio =
    image.width && image.height ? `${image.width} / ${image.height}` : '3 / 4';
  const revealDelay = (index % 4) * 0.05;

  return (
    <div
      ref={tileRef}
      onClick={() => onImageClick(image)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(10px)',
        transition: `opacity 0.8s ease-out ${revealDelay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${revealDelay}s`,
      }}
      className={`group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 ${
        square ? 'rounded-none' : 'rounded-2xl'
      }`}
    >
      <div
        className={`w-full h-full bg-surface relative overflow-hidden ${
          square ? 'aspect-square' : ''
        }`}
        style={square ? undefined : { aspectRatio: ratio }}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt={photoAlt(image, locale, dict.albums)}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-[opacity,filter,transform] duration-700 ease-out group-hover:scale-105 ${
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          loading="lazy"
        />

        {/* Overlay hiện khi hover: lớp tối + icon phóng to gợi ý click */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/30 scale-90 transition-transform duration-300 group-hover:scale-100">
            <Icon name="zoom_in" className="text-[26px]" />
          </div>
        </div>
      </div>
    </div>
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

// Gallery nhỏ (<= 9 ảnh, không phân trang thêm) thì không cần order-stable:
// thử mọi cách chia ảnh vào cột (tối đa 3^9 ≈ 20k phương án, rất nhanh) và
// chọn cách có chênh lệch chiều cao giữa cột cao nhất và thấp nhất nhỏ nhất.
// Thứ tự ảnh trong từng cột vẫn giữ theo thứ tự gốc.
const SMALL_GALLERY = 9;
const GAP_RATIO = 0.08; // gap 24px so với cột ~300px, tính theo đơn vị bề rộng cột

function balanceSmallGallery(images, cols) {
  const tileHeights = images.map((image) =>
    image.width && image.height ? image.height / image.width : 4 / 3
  );
  const heights = new Array(cols).fill(0);
  const counts = new Array(cols).fill(0);
  const assign = new Array(images.length).fill(0);
  let best = null;
  let bestSpread = Infinity;

  const visit = (i) => {
    if (i === images.length) {
      if (counts.some((c) => c === 0)) return;
      const spread = Math.max(...heights) - Math.min(...heights);
      if (spread < bestSpread) {
        bestSpread = spread;
        best = assign.slice();
      }
      return;
    }
    for (let c = 0; c < cols; c++) {
      const add = tileHeights[i] + (counts[c] > 0 ? GAP_RATIO : 0);
      heights[c] += add;
      counts[c] += 1;
      assign[i] = c;
      visit(i + 1);
      heights[c] -= add;
      counts[c] -= 1;
    }
  };
  visit(0);

  const columns = Array.from({ length: cols }, () => []);
  images.forEach((image, index) => columns[best[index]].push({ image, index }));
  // Cột chứa ảnh đầu tiên đứng trái để thứ tự đọc vẫn tự nhiên.
  columns.sort((a, b) => a[0].index - b[0].index);
  return { columns, spread: bestSpread };
}

// Chênh lệch tối đa chấp nhận được giữa các cột (theo bề rộng cột). Vượt mức
// này (vd 3 ảnh dọc + 4 ảnh ngang chia 3 cột luôn thừa một ảnh lẻ) thì bớt
// một cột nếu cách đó cân hơn hẳn.
const MAX_SPREAD = 0.5;

function layoutColumns(images, maxCols) {
  if (images.length > SMALL_GALLERY || maxCols <= 1) {
    return distributeIntoColumns(images, maxCols);
  }
  let best = null;
  for (let cols = Math.min(maxCols, images.length); cols >= 2; cols--) {
    const result = balanceSmallGallery(images, cols);
    if (!best || result.spread < best.spread) best = result;
    if (result.spread <= MAX_SPREAD) return result.columns;
  }
  return best ? best.columns : distributeIntoColumns(images, maxCols);
}

// Ít ảnh thì giảm số cột: 7 ảnh / 4 cột để lại 1 ảnh lẻ và khoảng trống lớn
// dưới các cột khác. Chỉ áp dụng cho gallery nhỏ; từ 10 ảnh trở lên giữ nguyên
// số cột theo breakpoint (trang phân trang 20 ảnh/lần nên thêm ảnh không đổi cột).
function fitColumnsToCount(cols, count) {
  if (count <= 1) return 1;
  if (count <= 4) return Math.min(cols, 2);
  if (count <= 9) return Math.min(cols, 3);
  return cols;
}

// Bề rộng tối đa của một cột khi gallery bị thu gọn, để lưới ít cột vẫn nằm
// giữa trang thay vì kéo mỗi ảnh rộng cả nửa màn hình.
const MAX_COLUMN_WIDTH = 360;
const COLUMN_GAP = 24; // = gap-6

export function PortfolioGrid({ images = [], onImageClick = () => {} }) {
  const { dict } = useI18n();
  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';

  const breakpointCols = useMasonryColumns();
  const maxCols = fitColumnsToCount(breakpointCols, images.length);
  const columns = useMemo(
    () => layoutColumns(images, maxCols),
    [images, maxCols]
  );
  const cols = columns.length;

  const urlFor = (image) => `${publicDomain}/${image.key}`;

  // No filtering needed here - AlbumsSection already filters the images
  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-[1280px] px-4 md:px-10 pb-24 mx-auto">
        <p className="text-text-muted text-center">{dict.albums.empty}</p>
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
      <div
        className="hidden sm:flex gap-6 mx-auto"
        style={
          cols < breakpointCols
            ? { maxWidth: cols * MAX_COLUMN_WIDTH + (cols - 1) * COLUMN_GAP }
            : undefined
        }
      >
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
