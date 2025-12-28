'use client'

import { useState } from 'react'
import { FilterButtons, PortfolioGrid, ImageViewer } from '.'
import { ViewerContext } from './ViewerContext'

const IMAGES_PER_PAGE = 20 // Load 20 images per batch

export function AlbumsSection({ images = [], onViewerStateChange = null }) {
  const [selectedFolder, setSelectedFolder] = useState('Tất cả')
  const [loadedCount, setLoadedCount] = useState(IMAGES_PER_PAGE)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  // Notify parent of viewer state changes
  const handleViewerStateChange = (isOpen) => {
    setViewerOpen(isOpen)
    if (onViewerStateChange) {
      onViewerStateChange(isOpen)
    }
  }

  const handleFolderChange = (folder) => {
    setSelectedFolder(folder)
    setLoadedCount(IMAGES_PER_PAGE) // Reset pagination when changing folder
  }

  const handleLoadMore = () => {
    setLoadedCount((prev) => prev + IMAGES_PER_PAGE)
  }

  // Filter images by folder
  const folderMap = {
    Makeup: 'makeup',
    Studio: 'studio',
    Reportage: 'reportage',
  }

  const filteredImages =
    selectedFolder === 'Tất cả'
      ? images
      : images.filter((img) => img.folder === folderMap[selectedFolder])

  const paginatedImages = filteredImages.slice(0, loadedCount)
  const hasMoreImages = paginatedImages.length < filteredImages.length

  const handleImageClick = (image) => {
    setSelectedImage(image)
    handleViewerStateChange(true)
  }

  const handleCloseViewer = () => {
    handleViewerStateChange(false)
    setSelectedImage(null)
  }

  const handleNextImage = () => {
    const currentIndex = filteredImages.indexOf(selectedImage)
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1])
    }
  }

  const handlePrevImage = () => {
    const currentIndex = filteredImages.indexOf(selectedImage)
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1])
    }
  }

  return (
    <ViewerContext.Provider value={{ viewerOpen, selectedImage }}>
      <FilterButtons images={images} onFilterChange={handleFolderChange} />
      <PortfolioGrid
        images={paginatedImages}
        selectedFolder={selectedFolder}
        onImageClick={handleImageClick}
      />
      <ImageViewer
        isOpen={viewerOpen}
        image={selectedImage}
        images={filteredImages}
        onClose={handleCloseViewer}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
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
    </ViewerContext.Provider>
  )
}
