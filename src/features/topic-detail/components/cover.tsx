import PhotoCard from '@/features/photo-list/components/photo-card';
import { IPhoto } from '@/types'
import clsx from 'clsx';
import React from 'react'

type CoverProps = {
  coverPhoto: IPhoto | null;
  title: string;
  description: string;
}

function Cover({
  coverPhoto, description, title
}: CoverProps) {
  return (
    <div className='py-10 px-4 md:px-8 xl:px-28 xl:py-8 gap-2'>
      <div className='w-full relative flex items-center'>
        {coverPhoto ? <PhotoCard
          blurHash={coverPhoto.blur_hash}
          src={coverPhoto.urls.regular}
          alt={coverPhoto.alt_description ?? ''}
          width={coverPhoto.width}
          height={coverPhoto.height}
          className='h-[240px] w-full md:h-[384px] object-cover rounded-tr-lg rounded-br-lg'
        /> : null}
        <div className={clsx('w-full bg-linear-to-r from-white to-transparent flex items-center', {
          'h-auto absolute -left-1 -top-1 -bottom-1': !!coverPhoto,
          'h-[240px] md:h-[384px]': !coverPhoto
        })}>
          <div className='px-3 md:px-6 flex flex-col gap-2 md:gap-6 max-w-[240px] md:max-w-[384px] w-full'>
            <h1 className='text-foreground text-xl font-semibold md:text-3xl'>{title}</h1>
            <p className='text-foreground text-xs font-medium md:text-base'>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cover