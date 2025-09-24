import { fetchPhotos } from '@/features/photo-list/action';
import MasonryList from '@/features/photo-list/components/masonry-list';
import { IPhoto } from '@/types';

export default async function Page() {
  const response: IPhoto[] = await fetchPhotos({ pageParam: 1 });
  return (
    <MasonryList
      initialItems={response}
      queryKey='photos'
      url='/photos'
    />
  )
}
