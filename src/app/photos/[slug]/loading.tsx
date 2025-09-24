import { PhotoDetailSectionSkeleton } from '@/features/photo-detail/components/photo-detail-section'
import { MasonryListSkeleton } from '@/features/photo-list/components/masonry-list-skeleton'
import React from 'react'

function Loading() {
  return (
    <>
      <PhotoDetailSectionSkeleton />
      <div className='px-4 md:px-8 xl:px-28 animate-pulse'>
        <div className='h-8 bg-gray-200' />
      </div>
      <MasonryListSkeleton />
    </>
  )
}

export default Loading