'use client';

import { useState, useMemo } from 'react';

export function FilterButtons({ images = [], onFilterChange }) {
  const [activeFolder, setActiveFolder] = useState('Tất cả');

  // Get unique folder names from images
  const folderNames = useMemo(() => {
    const folderMap = {
      'studio': 'Studio',
      'outdoor': 'Ngoại cảnh',
      'couples': 'Chụp couples',
      'T&K': 'T&K',
      'V&K': 'V&K',
    };

    const uniqueFolders = [...new Set(images.map((img) => img.folder))];
    const displayNames = uniqueFolders.map((folder) => folderMap[folder] || folder).sort();

    return ['Tất cả', ...displayNames];
  }, [images]);

  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
    onFilterChange(folder);
  };

  return (
    <div className="w-full max-w-[1200px] px-4 pb-10 mx-auto">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar justify-center py-2 px-2">
        {folderNames.map((folder) => (
          <button
            key={folder}
            onClick={() => handleFolderClick(folder)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all whitespace-nowrap ${
              activeFolder === folder
                ? 'bg-primary text-white hover:shadow-lg hover:shadow-primary/30 font-bold'
                : 'bg-surface-alt border border-transparent hover:border-primary/20 hover:bg-white text-gray-600 hover:text-primary font-semibold'
            }`}
          >
            {folder}
          </button>
        ))}
      </div>
    </div>
  );
}
