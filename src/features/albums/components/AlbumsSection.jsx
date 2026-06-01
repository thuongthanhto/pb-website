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

  const handleLoadMore = () => {
    setLoadedCount((prev) => prev + IMAGES_PER_PAGE);
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
        <div className="w-full flex justify-center py-8 pb-12">
          <button
            onClick={handleLoadMore}
            className="flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-primary hover:bg-primary-dark transition-all text-white text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            <span>Xem thêm ảnh</span>
          </button>
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
