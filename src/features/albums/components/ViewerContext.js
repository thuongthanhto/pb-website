'use client'

import { createContext, useContext } from 'react'

// Context to share viewer state between AlbumsSection and FloatingCTA
export const ViewerContext = createContext(null)

export function useViewerState() {
  return useContext(ViewerContext)
}
