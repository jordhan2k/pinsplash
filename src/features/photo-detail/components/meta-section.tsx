import capitalize from 'lodash/capitalize'
import React from 'react'
import StatItem, { StatItemSkeleton } from './stat-item';
import { formatNumberToGroup } from '@/lib/utils';
import dayjs from 'dayjs';
import { ITag } from '@/types';
import TagLink from '@/components/ui/tag-link';

type MetaSectionProps = {
  alt_description: string;
  views: number;
  created_at: string;
  downloads: number;
  tags: ITag[];
}
function MetaSection({
  alt_description,
  views,
  created_at,
  downloads,
  tags
}: MetaSectionProps) {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl text-neutral-900 font-semibold'>{capitalize(alt_description ?? '')}</h1>
      {/* stats */}
      <div className='flex gap-6 flex-col md:flex-row flex-wrap'>
        <StatItem label='Views' value={`${formatNumberToGroup(views)}`} />
        <StatItem label='Date' value={`${dayjs(created_at).format('DD MMM, YYYY')}`} />
        <StatItem label='Downloads' value={`${formatNumberToGroup(downloads)}`} />
      </div>
      {/* tags */}
      <div className='flex flex-wrap gap-3 gap-y-3' >
        {tags?.map((tag) => <TagLink
          href={`/s/photos/${tag.title?.replaceAll(' ', '-')}`}
          key={tag.title}>
          {capitalize(tag.title)}
        </TagLink>)}
      </div>
    </div>
  )
}

export const MetaSectionSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='h-8 w-1/2 bg-gray-200 rounded-md animate-pulse' />
      {/* stats */}
      <div className='flex gap-6 flex-col md:flex-row flex-wrap'>
        <StatItemSkeleton />
        <StatItemSkeleton />
        <StatItemSkeleton />
      </div>
      {/* tags */}
      <div className='flex flex-wrap gap-3 gap-y-3' >
        <div className='h-7 w-20 bg-gray-200 rounded-md animate-pulse' />
        <div className='h-7 w-16 bg-gray-200 rounded-md animate-pulse' />
        <div className='h-7 w-24 bg-gray-200 rounded-md animate-pulse' />
      </div>
    </div>
  )
}

export default MetaSection