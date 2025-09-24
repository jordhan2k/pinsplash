import { MasonryListSkeleton } from '@/features/photo-list/components/masonry-list-skeleton'
import React from 'react'

function Loading() {
  return (
    <>
      <div className='px-4 py-6 md:px-8 xl:px-28 animate-pulse'>
        <div className='h-9 md:h-10 w-30 bg-gray-200' />
      </div>
      <MasonryListSkeleton />
    </>
  )
}

export default Loading