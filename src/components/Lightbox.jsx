'use client';

import { useEffect, useCallback } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Viewer ảnh toàn màn hình dùng chung (style giống phần Hậu trường).
 *
 * Controlled component:
 * @param {Array<{src: string, alt?: string, caption?: string}>} items - danh sách ảnh
 * @param {number|null} index - vị trí ảnh đang mở (null = đóng)
 * @param {() => void} onClose
 * @param {(nextIndex: number) => void} onNavigate - đổi sang ảnh khác
 */
export function Lightbox({ items = [], index = null, onClose, onNavigate }) {
  const isOpen = index !== null && index >= 0 && !!items[index];
  const many = items.length > 1;

  const go = useCallback(
    (dir) => {
      if (!items.length || index === null) return;
      onNavigate?.((index + dir + items.length) % items.length);
    },
    [items.length, index, onNavigate]
  );

  // Điều hướng bàn phím + khóa scroll nền khi mở
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, go, onClose]);

  if (!isOpen) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition"
      >
        <Icon name="close" className="text-[24px]" />
      </button>

      {many && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Ảnh trước"
          className="absolute left-2 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition"
        >
          <Icon name="chevron_left" className="text-[24px]" />
        </button>
      )}

      <figure
        className="flex flex-col items-center gap-4 max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={item.src}
          src={item.src}
          alt={item.alt || item.caption || 'Ảnh'}
          className="max-h-[80vh] max-w-[92vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
        />
        {item.caption && (
          <figcaption className="text-center text-white/90 text-sm font-medium">
            {item.caption}
          </figcaption>
        )}
      </figure>

      {many && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Ảnh tiếp theo"
          className="absolute right-2 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition"
        >
          <Icon name="chevron_right" className="text-[24px]" />
        </button>
      )}

      {many && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/70 tabular-nums pointer-events-none">
          {index + 1} / {items.length}
        </div>
      )}
    </div>
  );
}
