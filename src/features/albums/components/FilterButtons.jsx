'use client';

import { useMemo } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

const ALL = 'all';

export function FilterButtons({ images = [], activeFolder = ALL, onFilterChange }) {
  const { dict } = useI18n();
  const t = dict.albums.filters;

  // Tab giữ key folder của R2, chỉ nhãn hiển thị là được dịch. Folder mới thêm
  // trên R2 mà chưa có trong dictionary thì hiển thị luôn key thô.
  const tabs = useMemo(() => {
    const uniqueFolders = [...new Set(images.map((img) => img.folder))]
      .map((folder) => ({ folder, label: t.folders[folder] || folder }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return [{ folder: ALL, label: t.all }, ...uniqueFolders];
  }, [images, t]);

  return (
    <div className="w-full max-w-[1280px] px-4 md:px-10 pb-4 md:pb-10 mx-auto">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar justify-start md:justify-center py-2 px-2">
        {tabs.map(({ folder, label }) => (
          <button
            key={folder}
            onClick={() => onFilterChange(folder)}
            aria-pressed={activeFolder === folder}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all whitespace-nowrap ${
              activeFolder === folder
                ? 'bg-primary text-white hover:shadow-lg hover:shadow-primary/30 font-bold'
                : 'bg-stone-800 border border-stone-700 hover:border-primary/40 hover:bg-stone-700 text-stone-300 hover:text-white font-semibold'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
