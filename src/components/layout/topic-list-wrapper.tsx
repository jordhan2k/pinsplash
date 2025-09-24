'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

function TopicListWrapper({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/t/') || pathname === '/') {
    return children
  }
  return null
}

export default TopicListWrapper