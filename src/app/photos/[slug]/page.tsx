import { fetchPhotoDetail } from '@/features/photo-detail/action';
import PhotoDetailSection from '@/features/photo-detail/components/photo-detail-section';
import MasonryList from '@/features/photo-list/components/masonry-list';
import { blurHashToDataURL } from '@/lib/utils';
import { IPhoto } from '@/types';
import capitalize from 'lodash/capitalize';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type PhotoDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PhotoDetailPageProps,
  parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const response: IPhoto = await fetchPhotoDetail(slug as string);

  const defaultDesc = (await parent).description;
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: capitalize(response.alt_description ?? 'Photo Detail'),
    description: defaultDesc,
    openGraph: {
      images: [
        response.urls.regular,
        ...previousImages
      ]
    }
  }
}

export default async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const { slug } = await params;
  const response: IPhoto = await fetchPhotoDetail(slug as string);

  if (!response) {
    return notFound();
  }
  const blurDataURL = await blurHashToDataURL(response.blur_hash);
  response.blurDataURL = blurDataURL;

  return (<>
    <PhotoDetailSection photo={response} />
    <div className='px-4 md:px-8 xl:px-28'>
      <h2 className='text-2xl text-neutral-900 font-semibold '>Related images</h2>
    </div>
    <MasonryList
      queryKey={`${slug}-related-images`}
      url={`/search/photos`}
      queries={response.tags.map(t => t.title)}
    />
  </>
  )
}
