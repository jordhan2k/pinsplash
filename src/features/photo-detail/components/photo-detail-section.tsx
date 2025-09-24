import PhotoCard from '@/features/photo-list/components/photo-card';
import { IPhoto } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import DownloadButton from './download-button';
import MetaSection, { MetaSectionSkeleton } from './meta-section';

type Props = {
  photo: IPhoto;
}

function PhotoDetailSection({ photo }: Props) {
  // const blurDataURL = blurHashToDataURL(photo.blur_hash);
  const ratio = photo.width / photo.height;
  return (
    <div className='py-8 px-4 md:px-8 xl:px-28 flex flex-col'>
      <div className='flex items-center gap-2 mb-4'>
        <Image
          src={photo.user.profile_image.medium}
          width={40}
          height={40}
          alt={`${photo.user.username} avatar`}
          className='rounded-full size-6'
        />
        <div className='flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-base text-neutral-900 font-semibold'>{photo.user.name}</div>

        <DownloadButton
          height={photo.height}
          width={photo.width}
          link={photo.links.download + '?force=true'}
        />
      </div>
      <PhotoCard
        alt={photo.alt_description || ''}
        src={photo.urls.full}
        blurHash={photo.blur_hash}
        blurDataURL={photo.blurDataURL}
        width={photo.width}
        height={photo.height}
        className={clsx('object-contain  mb-8 rounded-lg ', {
          'w-full ': ratio >= 1,
          'h-auto mx-auto w-fit max-h-[800px]': ratio < 1
        })}
      />

      {/* Meta */}
      <MetaSection
        alt_description={photo.alt_description ?? ''}
        created_at={photo.created_at}
        downloads={photo.downloads}
        tags={photo.tags}
        views={photo.views}
      />
    </div>
  )
}


export const PhotoDetailSectionSkeleton = () => {
  return (
    <div className='py-8 px-4 md:px-8 xl:px-28 flex flex-col animate-pulse'>
      <div className='flex items-center gap-2 mb-4'>
        <div className='rounded-full bg-gray-200 size-6' />
        <div className='w-30 h-5 rounded-md bg-gray-200' />
        <div className='flex-1' />
        <div className='h-10 rounded-md bg-gray-200 w-30' />
      </div>
      <div className='bg-gray-200 aspect-[4/3] w-full mb-8 rounded-lg' />

      {/* Meta */}
      <MetaSectionSkeleton />
    </div>
  )
}


export default PhotoDetailSection