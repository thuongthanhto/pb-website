'use client';

export function ImageViewer({ isOpen, image, images, onClose, onNext, onPrev }) {
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
          className="absolute top-6 right-6 z-50 p-2 hover:bg-white/20 rounded-full transition-all"
        >
          <span className="material-symbols-outlined text-white text-[32px]">close</span>
        </button>

        {/* Image */}
        <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
          <img
            src={imageUrl}
            alt={image.fileName}
            className="max-w-full max-h-full object-contain"
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
            >
              <span className="material-symbols-outlined text-[28px]">chevron_left</span>
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
            >
              <span className="material-symbols-outlined text-[28px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
