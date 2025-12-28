'use client'

import { useViewerState } from './ViewerContext'

export function FloatingCTA({ isHidden = false }) {
  const viewerState = useViewerState()
  const shouldHide = isHidden || (viewerState?.viewerOpen ?? false)

  if (shouldHide) return null

  return (
    <div className="fixed bottom-8 right-8 z-40 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
      <button className="flex items-center justify-center gap-3 rounded-full h-14 pl-5 pr-7 bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/40 hover:scale-105 transition-all duration-300 group">
        <span className="material-symbols-outlined group-hover:-rotate-12 transition-transform">calendar_today</span>
        <span className="text-base font-bold tracking-wide">Đặt lịch chụp</span>
      </button>
    </div>
  );
}
