'use client'

import { IPhoto } from '@/types';
import { RiLoaderLine } from '@remixicon/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchPhotos } from '../action';
import PhotoCard from './photo-card';
import Link from 'next/link';
import { MasonryListSkeleton } from './masonry-list-skeleton';

type MasonryListProps = {
  initialItems?: IPhoto[];
  queryKey: string;
  url: string;
  queries?: string[];
}

function MasonryList({
  initialItems, queryKey, url, queries
}: MasonryListProps) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetchPhotos({ pageParam, url, queries }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.length) return undefined
      return allPages.length + 1
    },
    initialPageParam: 1,
    initialData: initialItems ? { pages: [initialItems], pageParams: [1] } : undefined,
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, isLoading, fetchNextPage]);


  const columnData = useMemo(() => {
    const mergedData = data?.pages.flat() ?? initialItems;
    const uniqueData = mergedData ? Array.from(new Map(mergedData?.map(item => [item.id, item])).values()) : [];

    if (!uniqueData.length) return null;
    const twoColumns: IPhoto[][] = Array.from({ length: 2 }, (_, index) => {
      return uniqueData.filter((_, i) => i % 2 === index % 2)
    });
    const threeColumns: IPhoto[][] = Array.from({ length: 3 }, (_, index) => {
      return uniqueData.filter((_, i) => i % 3 === index % 3)
    });

    return {
      twoColumns,
      threeColumns
    }
  }, [data?.pages, initialItems]);

  if (isLoading && !data?.pages?.length) {
    return <MasonryListSkeleton />
  }

  return (
    <>
      <div className='w-full py-10 xl:py-12 px-4 md:px-8 xl:px-28'>
        <div
          className="w-full hidden xl:grid grid-cols-3 gap-x-2 "
        >
          {
            columnData?.threeColumns?.map((columnImages, columnIndex) => (
              <div
                key={`3-column-${columnIndex}`}
                className='flex flex-col gap-2 col-span-1'
              >
                {
                  columnImages.map(renderPhotoCard)
                }
              </div>
            ))
          }
        </div>
        <div
          className="grid xl:hidden w-full grid-cols-2 gap-x-2"
        >
          {
            columnData?.twoColumns?.map((columnImages, columnIndex) => (
              <div
                key={`2-column-${columnIndex}`}
                className='flex flex-col gap-2 col-span-1'
              >
                {
                  columnImages.map(renderPhotoCard)
                }
              </div>
            ))
          }
        </div>
      </div>
      {hasNextPage && !isLoading ? <div ref={ref} className='text-sm font-medium text-neutral-600 flex w-full py-4 justify-center gap-4'>
        <RiLoaderLine className='animate-spin' />
        Loading more
      </div> : null}
    </>
  )
}

const renderPhotoCard = (photo: IPhoto) => (
  <Link href={`/photos/${photo.slug}`} key={photo.slug}>
    <PhotoCard
      key={photo.slug}
      className='w-full h-auto rounded-xl bg-stone-200'
      width={photo.width}
      height={photo.height}
      alt={photo.alt_description ?? ''}
      src={photo.urls.regular}
      blurDataURL={photo.blurDataURL}
      blurHash={photo.blur_hash}
      detailProps={{
        avatar: photo.user.profile_image.small,
        // href: `/photos/${photo.slug}-${photo.id}`,
        title: photo.alt_description ?? '',
        username: photo.user.username
      }}
    />
  </Link>
)


export default MasonryList