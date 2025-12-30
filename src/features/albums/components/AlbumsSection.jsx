'use client';

import { useState, useEffect, useCallback } from 'react';
import { FilterButtons, PortfolioGrid, ImageViewer } from '.';

const IMAGES_PER_PAGE = 20; // Load 20 images per batch

export function AlbumsSection({ images = [] }) {
  const [selectedFolder, setSelectedFolder] = useState('Tất cả');
  const [loadedCount, setLoadedCount] = useState(IMAGES_PER_PAGE);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

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
  const folderMap = {
    'Studio': 'studio',
    'Ngoại cảnh': 'outdoor',
    'T&K': 'T&K',
    'V&K': 'V&K',
  };

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
      <FilterButtons images={images} onFilterChange={handleFolderChange} />
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
