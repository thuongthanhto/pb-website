'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export function ImageViewer({ isOpen, image, images, onClose, onNext, onPrev }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  if (!isOpen || !image) return null;

  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';

  const imageUrl = `${publicDomain}/${image.key}`;

  // Check if image has custom metadata
  const hasMetadata = image.title || image.description || image.photographer ||
                      image.camera || image.tags?.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Main content */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="absolute top-6 right-6 z-50 flex gap-2">
          {/* Info button */}
          {hasMetadata && (
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 hover:bg-white/20 rounded-full transition-all"
              aria-label="Toggle info"
            >
              <Icon
                icon={showInfo ? "mdi:information-off" : "mdi:information"}
                width="24"
                height="24"
                className="text-white"
              />
            </button>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/20 rounded-full transition-all"
            aria-label="Close"
          >
            <Icon icon="mdi:close" width="24" height="24" className="text-white" />
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={imageUrl}
            alt={image.fileName}
            className="max-w-full max-h-full object-contain"
            onLoad={() => setImageLoading(false)}
            onLoadStart={() => setImageLoading(true)}
          />
        </div>

        {/* Metadata Sidebar */}
        {hasMetadata && (
          <div
            className={`absolute top-0 right-0 bottom-0 w-80 bg-black/90 backdrop-blur-lg text-white p-6 overflow-y-auto transition-transform duration-300 ${
              showInfo ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Image Details</h3>

            {image.title && image.title !== image.fileName && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Title</p>
                <p className="text-sm font-semibold">{image.title}</p>
              </div>
            )}

            {image.description && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-sm">{image.description}</p>
              </div>
            )}

            {image.photographer && (
              <div className="mb-4 flex items-center gap-2">
                <Icon icon="mdi:camera" width="16" height="16" className="text-primary" />
                <div>
                  <p className="text-xs text-gray-400">Photographer</p>
                  <p className="text-sm font-medium">{image.photographer}</p>
                </div>
              </div>
            )}

            {image.location && (
              <div className="mb-4 flex items-center gap-2">
                <Icon icon="mdi:map-marker" width="16" height="16" className="text-primary" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm">{image.location}</p>
                </div>
              </div>
            )}

            {image.date && (
              <div className="mb-4 flex items-center gap-2">
                <Icon icon="mdi:calendar" width="16" height="16" className="text-primary" />
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm">{image.date}</p>
                </div>
              </div>
            )}

            {(image.camera || image.lens) && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Equipment</p>
                {image.camera && (
                  <div className="flex items-center gap-2 mb-1">
                    <Icon icon="mdi:camera-iris" width="16" height="16" className="text-gray-400" />
                    <p className="text-sm">{image.camera}</p>
                  </div>
                )}
                {image.lens && (
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:circle-outline" width="16" height="16" className="text-gray-400" />
                    <p className="text-sm">{image.lens}</p>
                  </div>
                )}
              </div>
            )}

            {image.settings && Object.keys(image.settings).length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Camera Settings</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {image.settings.iso && (
                    <div>
                      <span className="text-gray-400">ISO:</span> {image.settings.iso}
                    </div>
                  )}
                  {image.settings.aperture && (
                    <div>
                      <span className="text-gray-400">Aperture:</span> {image.settings.aperture}
                    </div>
                  )}
                  {image.settings.shutterSpeed && (
                    <div>
                      <span className="text-gray-400">Shutter:</span> {image.settings.shutterSpeed}
                    </div>
                  )}
                  {image.settings.focalLength && (
                    <div>
                      <span className="text-gray-400">Focal:</span> {image.settings.focalLength}
                    </div>
                  )}
                </div>
              </div>
            )}

            {image.tags && image.tags.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation and Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <div className="flex items-center justify-between">
            {/* Left: Prev button */}
            <button
              onClick={onPrev}
              className="p-2 hover:bg-white/20 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={images.length <= 1}
              aria-label="Previous image"
            >
              <Icon icon="mdi:chevron-left" width="32" height="32" className="text-white" />
            </button>

            {/* Center: Info */}
            <div className="text-center flex-1">
              <p className="text-sm font-semibold mb-1">
                {(image.title && image.title !== image.fileName) ? image.title : image.fileName}
              </p>
              <p className="text-xs text-gray-300">
                {images.findIndex(img => img.id === image.id) + 1} / {images.length}
              </p>
            </div>

            {/* Right: Next button */}
            <button
              onClick={onNext}
              className="p-2 hover:bg-white/20 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={images.length <= 1}
              aria-label="Next image"
            >
              <Icon icon="mdi:chevron-right" width="32" height="32" className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
