'use client';

import { useState } from 'react';

export function ImageViewer({ isOpen, image, images, onClose, onNext, onPrev }) {
  const [imageLoading, setImageLoading] = useState(true);

  if (!isOpen || !image) return null;

  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev';

  const imageUrl = `${publicDomain}/${image.key}`;

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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 hover:bg-white/20 rounded-full transition-all"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Center: Info */}
            <div className="text-center flex-1">
              <p className="text-sm font-semibold mb-1">{image.fileName}</p>
              <p className="text-xs text-gray-300">
                {images.indexOf(image) + 1} / {images.length}
              </p>
            </div>

            {/* Right: Next button */}
            <button
              onClick={onNext}
              className="p-2 hover:bg-white/20 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={images.length <= 1}
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
