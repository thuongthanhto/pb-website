'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { PortfolioGrid } from '.';
import { LocationDropdown } from './LocationDropdown';
import { FloatingCTA } from './FloatingCTA';
import { ViewerContext } from './ViewerContext';
import { Lightbox } from '@/components/Lightbox';
import { getLocationSlugsInUse } from '@/data/locations';
import { photoAlt, photoLocationName } from '@/lib/photo-alt';

const publicDomain =
  process.env.NEXT_PUBLIC_R2_DOMAIN ||
  'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';

const IMAGES_PER_PAGE = 20; // Load 20 images per batch

// Gallery chỉ lọc theo địa điểm chụp (slug trong src/data/locations.js) — đã
// bỏ tab theo album/folder. State + URL param dùng slug chứ không dùng nhãn
// hiển thị, nên link ?location=... share được giữa bản tiếng Việt / tiếng Anh.
// Landing page /dia-diem/<slug> truyền ảnh đã lọc sẵn và tắt bộ lọc.
const ALL = 'all';

const matches = (img, location) =>
  location === ALL || img.locationSlug === location;

// ?photo= dùng đường dẫn tương đối sau 'photos/' (vd 'Thuong&Phuong/grand-
// mercure-da-lat/DSC05346.webp') vì tên file trùng nhau giữa các album.
const PHOTO_PREFIX = 'photos/';
const photoParam = (img) =>
  img.key.startsWith(PHOTO_PREFIX) ? img.key.slice(PHOTO_PREFIX.length) : img.key;
// Link cũ chỉ có tên file -> vẫn nhận, lấy ảnh đầu tiên trùng tên.
const findPhoto = (images, value) =>
  images.find((i) => i.key === PHOTO_PREFIX + value) ??
  images.find((i) => i.fileName === value) ??
  null;

export function AlbumsSection({ images = [], showLocations = true }) {
  const [selectedLocation, setSelectedLocation] = useState(ALL);
  const { dict, locale, path } = useI18n();
  const [loadedCount, setLoadedCount] = useState(IMAGES_PER_PAGE);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const didInit = useRef(false);
  const loadMoreRef = useRef(null);

  // Read the selected tab + opened photo from the URL on mount (and on back/forward)
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);

      // Slug lạ / chưa có ảnh -> về 'all' thay vì hiện lưới rỗng.
      const requested = showLocations ? params.get('location') : null;
      let location =
        requested && getLocationSlugsInUse(images).includes(requested) ? requested : ALL;

      const photo = params.get('photo');
      const img = photo ? findPhoto(images, photo) : null;
      // Ảnh không thuộc địa điểm đang lọc -> bỏ lọc để ảnh nằm trong danh sách.
      if (img && !matches(img, location)) location = ALL;
      setSelectedLocation(location);

      if (img) {
        setCurrentImage(img);
        setViewerOpen(true);

        // Make sure the opened photo is within the paginated slice so next/prev work
        const list = images.filter((i) => matches(i, location));
        const idx = list.findIndex((i) => i.id === img.id);
        if (idx >= 0) {
          setLoadedCount((prev) =>
            Math.max(prev, Math.ceil((idx + 1) / IMAGES_PER_PAGE) * IMAGES_PER_PAGE)
          );
        }
      } else {
        setViewerOpen(false);
      }
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [images, showLocations]);

  // Mirror the selected tab + opened photo into the URL so it can be reloaded/shared
  useEffect(() => {
    if (!didInit.current) {
      didInit.current = true; // skip first run so we don't overwrite the URL before reading it
      return;
    }
    const params = new URLSearchParams(window.location.search);

    params.delete('category'); // link cũ từ thời còn tab album

    if (selectedLocation === ALL) params.delete('location');
    else params.set('location', selectedLocation);

    if (viewerOpen && currentImage) params.set('photo', photoParam(currentImage));
    else params.delete('photo');

    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  }, [selectedLocation, viewerOpen, currentImage]);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setLoadedCount(IMAGES_PER_PAGE); // Reset pagination when changing filter
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
  };

  const filteredImages = images.filter((img) => matches(img, selectedLocation));

  const paginatedImages = filteredImages.slice(0, loadedCount);
  const hasMoreImages = paginatedImages.length < filteredImages.length;

  // Dữ liệu cho Lightbox dùng chung (điều hướng + phím tắt do Lightbox lo)
  const viewerItems = paginatedImages.map((img) => ({
    src: `${publicDomain}/${img.key}`,
    alt: photoAlt(img, locale, dict.albums),
    // Tên địa điểm dịch theo ngôn ngữ đang xem (img.location luôn là tiếng Việt).
    caption:
      photoLocationName(img, locale) ||
      (img.title && img.title !== img.fileName ? img.title : undefined),
  }));
  const viewerIndex =
    viewerOpen && currentImage
      ? paginatedImages.findIndex((img) => img.id === currentImage.id)
      : null;

  // Infinite scroll (Instagram-style): auto-load the next batch when the
  // sentinel near the bottom of the grid scrolls into view.
  //
  // QUAN TRỌNG: KHÔNG đưa `loadedCount` vào deps. Nếu có, mỗi lần load thêm sẽ
  // tạo lại observer; cú observe() mới bắn callback ngay với trạng thái hiện tại,
  // mà ảnh mới (lazy) chưa có chiều cao nên sentinel vẫn nằm trong vùng 600px ->
  // fire liên tục -> load sạch 1 lần. Giữ observer ổn định: nó chỉ bắn khi
  // sentinel thực sự cross vào vùng lúc người dùng cuộn.
  useEffect(() => {
    if (!hasMoreImages) return;
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadedCount((prev) => prev + IMAGES_PER_PAGE);
        }
      },
      { rootMargin: '600px' } // start loading before the user hits the bottom
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMoreImages, selectedLocation]);

  return (
    <ViewerContext.Provider value={{ viewerOpen }}>
      <div className="w-full max-w-[1280px] px-4 md:px-10 pb-4 md:pb-10 mx-auto">
        {showLocations && (
          <LocationDropdown
            images={images}
            active={selectedLocation}
            onChange={handleLocationChange}
          />
        )}
        {showLocations && selectedLocation !== ALL && filteredImages.length > 0 && (
          <p className="mt-3 text-center">
            <Link
              href={path(`/dia-diem/${selectedLocation}`)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {dict.locations.viewPage}
            </Link>
          </p>
        )}
      </div>
      <PortfolioGrid
        images={paginatedImages}
        // Vừa một trang thì không bao giờ nạp thêm -> được cân lại cả lưới.
        singlePage={filteredImages.length <= IMAGES_PER_PAGE}
        onImageClick={handleImageClick}
      />

      {hasMoreImages && (
        <div
          ref={loadMoreRef}
          className="w-full flex justify-center py-10 pb-14"
          aria-hidden="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      )}

      <Lightbox
        items={viewerItems}
        index={viewerIndex}
        onClose={handleCloseViewer}
        onNavigate={(n) => setCurrentImage(paginatedImages[n])}
      />

      <FloatingCTA />
    </ViewerContext.Provider>
  );
}
