import MasonryList from '@/features/photo-list/components/masonry-list';
import { fetchTopic } from '@/features/topic-detail/action';
import Cover from '@/features/topic-detail/components/cover';
import { ITopic } from '@/types';
import { Metadata, ResolvingMetadata } from 'next';

type TopicPageProps = {
  params: Promise<{ slug: string }>
}
// Commented due to rate limit
// export async function generateStaticParams() {
//   const topics = await fetchTopicList({ per_page: 20, page: 1 });

//   return topics.map((t) => ({
//     slug: t.slug
//   }))
// }

export async function generateMetadata(
  { params }: TopicPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const response: ITopic = await fetchTopic(slug);
  const defaultDesc = (await parent).description;

  return {
    title: response.title,
    description: response.description ?? defaultDesc
  }
}

export const revalidate = 3600;
export const dynamicParams = true;

async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const response: ITopic = await fetchTopic(slug);


  return (
    <>
      <Cover
        coverPhoto={response.cover_photo ?? null}
        description={response.description}
        title={response.title} />
      <MasonryList
        queryKey={`topics/${slug}/photos`}
        url={`/topics/${slug}/photos`}
      />
    </>
  )
}

export default TopicPage