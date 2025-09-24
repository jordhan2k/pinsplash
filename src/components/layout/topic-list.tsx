import { envConfig } from '@/config';
import { fetchTopicList } from '@/features/topic-detail/action';
import { ITopic } from '@/types';
import { PillTab, PillTabSkeleton } from './pill-tab';

async function TopicList() {
  const response: ITopic[] = await fetchTopicList({});

  return (
    <div className='w-full relative'>
      <div className={'w-full overflow-auto scrollbar-hide px-4 md:px-8 xl:px-28 relative'}>
        <div className='flex gap-3 py-2 w-fit'>
          {
            response?.map((topic) => (
              <PillTab
                href={`${envConfig.PUBLIC_URL}/t/${topic.slug}`}
                key={topic.slug}
                label={topic.title}
                src={topic.cover_photo.urls.small}
                slug={topic.slug}
              />
            ))
          }
        </div>
      </div>
      <div className='z-1 absolute h-full top-0 right-0 bottom-0 w-20 pointer-events-none bg-gradient-to-l from-white to-transparent ' />
    </div>
  )
}

const TopicListSkeleton = () => {
  return <div className='w-full overflow-hidden scrollbar-hide px-4 md:px-8 xl:px-28'>
    <div className='flex gap-3 py-2 w-fit'>
      {
        Array.from({ length: 20 }).map((_, index) => (
          <PillTabSkeleton key={`pill-tab-skeleton-${index}`} />
        ))
      }
    </div>
  </div>
}



export { TopicList, TopicListSkeleton };
