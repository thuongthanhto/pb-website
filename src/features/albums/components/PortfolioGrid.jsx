'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n/I18nProvider';
import { photoAlt } from '@/lib/photo-alt';

// Một ô ảnh dùng chung cho cả lưới vuông mobile lẫn masonry sm+ (chỉ đổi bằng
// CSS, xem PortfolioGrid). Ảnh hiện ngay trong HTML server render — không còn
// opacity-0/blur chờ JS — nền bg-surface làm placeholder trong lúc tải.
// `reveal`: chỉ ô được thêm sau khi trang đã chạy (infinite scroll) mới có
// hiệu ứng trồi lên khi cuộn tới; ô có sẵn từ SSR luôn hiển thị.
function PhotoTile({ image, imageUrl, index, sizes, priority, reveal, onImageClick }) {
  const { dict, locale } = useI18n();
  const [shown, setShown] = useState(!reveal);
  const tileRef = useRef(null);

  // Reveal khi cuộn tới (thay framer-motion whileInView bằng IntersectionObserver)
  useEffect(() => {
    if (!reveal) return;
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
  }, [reveal]);

  // Reserve the exact space before the image loads so tiles never resize on
  // load. Uses the real ratio measured on the server; falls back to 3:4.
  const hasSize = image.width && image.height;
  const ratio = hasSize ? `${image.width} / ${image.height}` : '3 / 4';
  const revealDelay = (index % 4) * 0.05;

  return (
    <div
      ref={tileRef}
      onClick={() => onImageClick(image)}
      style={{
        // Lưới mobile: cột masonry là `display: contents` nên ô xếp theo
        // `order` = thứ tự gốc. Trong masonry, ô trong cùng một cột vốn đã
        // tăng dần theo index nên `order` không ảnh hưởng gì.
        order: index,
        ...(reveal && {
          opacity: shown ? 1 : 0,
          transform: shown ? 'none' : 'translateY(10px)',
          transition: `opacity 0.8s ease-out ${revealDelay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${revealDelay}s`,
        }),
      }}
      className="group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-none sm:rounded-2xl"
    >
      <div
        className="w-full h-full bg-surface relative overflow-hidden aspect-square sm:aspect-[var(--ar)]"
        style={{ '--ar': ratio }}
      >
        <Image
          src={imageUrl}
          alt={photoAlt(image, locale, dict.albums)}
          width={hasSize ? image.width : 1200}
          height={hasSize ? image.height : 1600}
          sizes={sizes}
          quality={75}
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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

// Gallery vừa một trang (không infinite scroll) nhưng quá nhiều ảnh để thử hết:
// greedy theo thứ tự hay để ảnh cao cuối cùng rơi vào một cột, cột kia hụt
// hẳn. Không cần order-stable nên xếp ảnh cao trước vào cột thấp nhất (LPT),
// rồi đổi / chuyển ảnh giữa cột cao nhất và thấp nhất tới khi hết cải thiện.
function balanceLargeGallery(images, cols) {
  const h = images.map((image) =>
    image.width && image.height ? image.height / image.width : 4 / 3
  );
  const colOf = new Array(images.length);
  const heights = new Array(cols).fill(0);
  const counts = new Array(cols).fill(0);
  const add = (i, c) => {
    heights[c] += h[i] + (counts[c] > 0 ? GAP_RATIO : 0);
    counts[c] += 1;
    colOf[i] = c;
  };
  const remove = (i) => {
    const c = colOf[i];
    counts[c] -= 1;
    heights[c] -= h[i] + (counts[c] > 0 ? GAP_RATIO : 0);
  };
  const spread = () => Math.max(...heights) - Math.min(...heights);

  [...h.keys()]
    .sort((a, b) => h[b] - h[a])
    .forEach((i) => add(i, heights.indexOf(Math.min(...heights))));

  for (let improved = true; improved; ) {
    improved = false;
    const tall = heights.indexOf(Math.max(...heights));
    const short = heights.indexOf(Math.min(...heights));
    const before = spread();
    const inTall = [...h.keys()].filter((i) => colOf[i] === tall);
    const inShort = [...h.keys()].filter((i) => colOf[i] === short);
    // Thử chuyển một ảnh, rồi thử đổi chỗ từng cặp; giữ thay đổi đầu tiên có lợi.
    const moves = [
      ...inTall.filter(() => counts[tall] > 1).map((i) => [i, null]),
      ...inTall.flatMap((i) => inShort.map((j) => [i, j])),
    ];
    for (const [i, j] of moves) {
      remove(i);
      if (j !== null) remove(j);
      add(i, short);
      if (j !== null) add(j, tall);
      if (spread() < before - 1e-6) {
        improved = true;
        break;
      }
      remove(i);
      if (j !== null) remove(j);
      add(i, tall);
      if (j !== null) add(j, short);
    }
  }

  const columns = Array.from({ length: cols }, () => []);
  images.forEach((image, index) => columns[colOf[index]].push({ image, index }));
  columns.sort((a, b) => a[0].index - b[0].index);
  return columns;
}

// Chênh lệch tối đa chấp nhận được giữa các cột (theo bề rộng cột). Vượt mức
// này (vd 3 ảnh dọc + 4 ảnh ngang chia 3 cột luôn thừa một ảnh lẻ) thì bớt
// một cột nếu cách đó cân hơn hẳn.
const MAX_SPREAD = 0.5;

function layoutColumns(images, maxCols, singlePage) {
  if (maxCols <= 1) return distributeIntoColumns(images, maxCols);
  if (images.length > SMALL_GALLERY) {
    return singlePage && images.length >= maxCols
      ? balanceLargeGallery(images, maxCols)
      : distributeIntoColumns(images, maxCols);
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

// Số ảnh "ưu tiên" (preload, fetchpriority=high, không lazy): hàng đầu của
// lưới mobile 3 cột / đầu các cột masonry — thường là ảnh LCP.
const PRIORITY_COUNT = 3;

// Thuộc tính `sizes` cho next/image, khớp bề rộng cột thật ở từng breakpoint
// (container max 1280px, padding px-1 / sm:px-4 / md:px-10, gap-1 / gap-6).
// Phần mobile (ô vuông, phụ thuộc tỉ lệ từng ảnh) do mobileSize() thêm vào.
// `colsAt(b)` = số cột thực tế khi breakpoint cho b cột (gallery nhỏ có thể ít
// hơn). Khi bị thu gọn (ít cột hơn breakpoint) mỗi cột đã bị chặn ở
// MAX_COLUMN_WIDTH ở mọi viewport >= sm, nên dùng thẳng 360px.
function buildSizes(colsAt) {
  const col = (b, pad, vw = '100vw') => {
    const c = colsAt(b);
    if (c < b) return `${MAX_COLUMN_WIDTH}px`;
    return `calc((${vw} - ${pad + (c - 1) * COLUMN_GAP}px) / ${c})`;
  };
  const c4 = colsAt(4);
  const xl =
    c4 < 4
      ? `${MAX_COLUMN_WIDTH}px`
      : `${Math.ceil((1280 - 80 - (c4 - 1) * COLUMN_GAP) / c4)}px`;
  return [
    `(max-width: 767px) ${col(2, 32)}`,
    `(max-width: 1023px) ${col(2, 80)}`,
    `(max-width: 1279px) ${col(3, 80)}`,
    xl,
  ].join(', ');
}

// Mobile: ô vuông 1/3 màn hình, object-cover. Ảnh ngang bị cắt hai bên nên
// cần bản rộng hơn ô theo đúng tỉ lệ w/h, không thì ảnh bị phóng to, mờ.
function mobileSize(image) {
  const ar = image.width && image.height ? image.width / image.height : 3 / 4;
  const factor = Math.max(1, ar) / 3;
  return `(max-width: 639px) calc((100vw - 16px) * ${factor.toFixed(3)})`;
}

export function PortfolioGrid({ images = [], singlePage = false, onImageClick = () => {} }) {
  const { dict } = useI18n();
  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';

  const breakpointCols = useMasonryColumns();
  const maxCols = fitColumnsToCount(breakpointCols, images.length);
  const columns = useMemo(
    () => layoutColumns(images, maxCols, singlePage),
    [images, maxCols, singlePage]
  );
  const cols = columns.length;

  // Số cột thực tế ở từng breakpoint (chỉ đọc lại logic layout, không đổi nó)
  // để `sizes` đúng ngay từ HTML server, trước khi biết bề rộng màn hình.
  const sizes = useMemo(() => {
    const memo = {};
    const colsAt = (b) => {
      const max = fitColumnsToCount(b, images.length);
      if (!(max in memo)) memo[max] = layoutColumns(images, max, singlePage).length;
      return memo[max];
    };
    return buildSizes(colsAt);
  }, [images, singlePage]);

  // Ô có từ lần render đầu (SSR) luôn hiển thị; ô nạp thêm khi cuộn mới reveal.
  const initialCount = useRef(images.length);

  const urlFor = (image) => `${publicDomain}/${image.key}`;

  // No filtering needed here - AlbumsSection already filters the images
  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-[1280px] px-4 md:px-10 pb-24 mx-auto">
        <p className="text-text-muted text-center">{dict.albums.empty}</p>
      </div>
    );
  }

  // MỘT lưới duy nhất cho mọi kích thước (trước đây render 2 bản: lưới vuông
  // mobile + masonry sm+, ẩn/hiện bằng CSS -> mỗi ảnh xuất hiện 2 lần trong
  // HTML). Mobile: container là grid 3 cột, các cột masonry `display: contents`
  // nên ô thành grid item, xếp theo `order`. sm+: flex các cột masonry.
  return (
    <div className="w-full max-w-[1280px] px-1 sm:px-4 md:px-10 pb-24 mx-auto">
      <div
        className="grid grid-cols-3 gap-1 sm:flex sm:gap-6 mx-auto sm:max-w-[var(--max-w)]"
        style={
          cols < breakpointCols
            ? { '--max-w': `${cols * MAX_COLUMN_WIDTH + (cols - 1) * COLUMN_GAP}px` }
            : undefined
        }
      >
        {columns.map((column, ci) => (
          <div key={ci} className="contents sm:flex sm:flex-1 sm:min-w-0 sm:flex-col sm:gap-6">
            {column.map(({ image, index }) => (
              <PhotoTile
                key={image.id}
                image={image}
                imageUrl={urlFor(image)}
                index={index}
                sizes={`${mobileSize(image)}, ${sizes}`}
                priority={index < PRIORITY_COUNT}
                reveal={index >= initialCount.current}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
