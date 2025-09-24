import { blurHashToDataURL, cn } from '@/lib/utils';
import clsx from 'clsx';
import capitalize from 'lodash/capitalize';
import Image, { ImageProps } from 'next/image';

type PhotoCardProps = ImageProps & {
  blurDataURL?: string;
  blurHash: string;
  detailProps?: {
    avatar: string;
    username: string;
    title: string;
  }

}

function PhotoCard({
  alt,
  blurDataURL,
  height,
  id,
  src,
  width,
  className,
  blurHash,
  //
  detailProps,
  // key,
  ...props
}: PhotoCardProps) {
  let dataUrl = blurDataURL;
  if (blurHash && typeof window === "undefined" && !blurDataURL) {
    dataUrl = blurHashToDataURL(blurHash);
  }

  return (
    <div className='relative group w-full'>
      <Image
        key={id}
        width={width}
        height={height}
        placeholder={dataUrl ? "blur" : "empty"}
        blurDataURL={dataUrl}
        alt={alt}
        src={src}
        className={cn('', className)}
        {...props}
      />
      {detailProps ? <div
        className={clsx(
          'z-1 absolute hidden group-hover:flex',
          'top-0 left-0 bottom-0 w-full',
          'group-hover:bg-black/20',
          'items-end rounded-lg'
        )}>
        <div className='flex p-4 gap-2'>
          <Image
            src={detailProps.avatar ?? ''}
            width={40}
            height={40}
            alt={`${detailProps.username} avatar`}
            className='size-6 rounded-full'
          />
          <p className='mix-blend-difference text-xs text-white font-semibold flex-1 leading-6 overflow-hidden text-ellipsis line-clamp-1'>{capitalize(detailProps.title)}</p>
        </div>
      </div> : null}
    </div>
  )
}

export default PhotoCard