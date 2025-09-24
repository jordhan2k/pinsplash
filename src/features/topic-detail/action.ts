import { fetchApi } from "@/lib/fetchApi";
import { ITopic } from "@/types";

export const fetchTopic = (slug: string): Promise<ITopic> => {
  return fetchApi<ITopic>(`/topics/${slug}`);
};

type FetchTopicListParams = {
  per_page?: number;
  page?: number;
};
export const fetchTopicList = ({
  page = 1,
  per_page = 20,
}: FetchTopicListParams): Promise<ITopic[]> => {
  return fetchApi<ITopic[]>(`/topics`, {
    query: {
      per_page,
      page,
    },
  });
};
