// import { fetchPhotoDetail } from '@/features/photo-detail/action';
import { fetchPhotos } from '@/features/photo-list/action';
import MasonryList from '@/features/photo-list/components/masonry-list';
import { IPhoto } from '@/types';
import capitalize from 'lodash/capitalize';
import { Metadata } from 'next';

type SearchPageProps = {
  params: Promise<{ query: string }>
}

export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true

// disabled due to too many tags => exceed unsplash rate limit
// export async function generateStaticParams() {
//   const response: IPhoto[] = await fetchPhotos({ pageParam: 1, url: 'photos', perPage: 50, });
//   const detailPromises = await Promise.all(response.map(async (photo) => await fetchPhotoDetail(photo.id)));
//   const tags = detailPromises.flatMap(photo => (photo.tags));
//   const uniqueTags = Array.from(new Set(tags.map(tag => tag.title)));
//   return uniqueTags.map(tag => ({
//     query: tag.replaceAll(' ', '-').toLowerCase()
//   }))
// }

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { query } = await params;
  return {
    title: `${capitalize(decodeURIComponent(query))} Images`,
    description: 'Download the perfect ABC images. Find over 100 of the best free ABC images. Free for commercial use ✓ No attribution required ✓ Royalty-free ✓'
  }
}

export default async function SearchPage({ params }: SearchPageProps) {

  const { query } = await params;
  const url = `/search/photos`;
  const response: IPhoto[] = await fetchPhotos({ pageParam: 1, url, queries: [query] });

  return (
    <>
      <div className='px-4 py-6 md:px-8 xl:px-28'>
        <h1 className='text-3xl font-semibold text-neutral-900 md:text-4xl '>
          {capitalize(decodeURIComponent(query).replaceAll('-', ' '))}</h1>
      </div>
      <MasonryList
        initialItems={response}
        queryKey={`search/photos/${query}`}
        url={url}
        queries={[query.replaceAll('-', ' ')]}
      />
    </>
  )
}
