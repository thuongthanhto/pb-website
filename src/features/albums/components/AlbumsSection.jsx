'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { FilterButtons, PortfolioGrid, ImageViewer } from '.';

const IMAGES_PER_PAGE = 20; // Load 20 images per batch

// Map display label <-> URL slug for the ?category= param
const folderMap = {
  'Studio': 'studio',
  'Ngoại cảnh': 'outdoor',
  'Chụp couples': 'couples',
  'T&K': 'T&K',
  'Phóng sự ngày cưới': 'V&K',
};
const slugToFolder = Object.fromEntries(
  Object.entries(folderMap).map(([label, slug]) => [slug, label])
);

export function AlbumsSection({ images = [] }) {
  const [selectedFolder, setSelectedFolder] = useState('Tất cả');
  const [loadedCount, setLoadedCount] = useState(IMAGES_PER_PAGE);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const didInit = useRef(false);
  const loadMoreRef = useRef(null);

  // Read the selected tab + opened photo from the URL on mount (and on back/forward)
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);

      const slug = params.get('category');
      setSelectedFolder(slug && slugToFolder[slug] ? slugToFolder[slug] : 'Tất cả');

      const photo = params.get('photo');
      const img = photo ? images.find((i) => i.fileName === photo) : null;
      if (img) {
        setCurrentImage(img);
        setViewerOpen(true);

        // Make sure the opened photo is within the paginated slice so next/prev work
        const folderLabel = slug && slugToFolder[slug] ? slugToFolder[slug] : 'Tất cả';
        const list =
          folderLabel === 'Tất cả'
            ? images
            : images.filter((i) => i.folder === folderMap[folderLabel]);
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
  }, [images]);

  // Mirror the selected tab + opened photo into the URL so it can be reloaded/shared
  useEffect(() => {
    if (!didInit.current) {
      didInit.current = true; // skip first run so we don't overwrite the URL before reading it
      return;
    }
    const params = new URLSearchParams(window.location.search);

    if (selectedFolder === 'Tất cả') params.delete('category');
    else params.set('category', folderMap[selectedFolder]);

    if (viewerOpen && currentImage) params.set('photo', currentImage.fileName);
    else params.delete('photo');

    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  }, [selectedFolder, viewerOpen, currentImage]);

  const handleFolderChange = (folder) => {
    setSelectedFolder(folder);
    setLoadedCount(IMAGES_PER_PAGE); // Reset pagination when changing folder
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
  };

  // Filter images by folder
  const filteredImages =
    selectedFolder === 'Tất cả'
      ? images
      : images.filter((img) => img.folder === folderMap[selectedFolder]);

  const paginatedImages = filteredImages.slice(0, loadedCount);
  const hasMoreImages = paginatedImages.length < filteredImages.length;

  const handleNextImage = useCallback(() => {
    const currentIndex = paginatedImages.findIndex((img) => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % paginatedImages.length;
    setCurrentImage(paginatedImages[nextIndex]);
  }, [paginatedImages, currentImage]);

  const handlePrevImage = useCallback(() => {
    const currentIndex = paginatedImages.findIndex((img) => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + paginatedImages.length) % paginatedImages.length;
    setCurrentImage(paginatedImages[prevIndex]);
  }, [paginatedImages, currentImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!viewerOpen) return;

      if (e.key === 'Escape') {
        handleCloseViewer();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerOpen, handleNextImage, handlePrevImage]);

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
  }, [hasMoreImages, selectedFolder]);

  return (
    <>
      <FilterButtons
        images={images}
        activeFolder={selectedFolder}
        onFilterChange={handleFolderChange}
      />
      <PortfolioGrid
        images={paginatedImages}
        selectedFolder={selectedFolder}
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

      <ImageViewer
        isOpen={viewerOpen}
        image={currentImage}
        images={paginatedImages}
        onClose={handleCloseViewer}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </>
  );
}
