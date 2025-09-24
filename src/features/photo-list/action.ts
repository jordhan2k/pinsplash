"use server";

import { fetchApi } from "@/lib/fetchApi";
import { blurHashToDataURL } from "@/lib/utils";
import { IPhoto, ISearchPhotos } from "@/types";

type FetchPhotosParams = {
  pageParam?: number;
  url?: string;
  perPage?: number;
  queries?: string[];
};

export const fetchPhotos = async ({
  pageParam = 1,
  url = "/photos",
  perPage = 24,
  queries,
}: FetchPhotosParams): Promise<IPhoto[]> => {
  const query: Record<string, number | string[]> = {
    per_page: perPage,
    page: pageParam,
  };

  if (queries?.length) {
    query.query = queries;
  }

  let data = await fetchApi<ISearchPhotos | IPhoto[]>(`${url}`, {
    query,
    cache: "no-store",
  });

  data =
    ((data as ISearchPhotos)?.results ?? data)?.map((photo: IPhoto) => ({
      ...photo,
      blurDataURL: photo.blur_hash
        ? blurHashToDataURL(photo.blur_hash)
        : undefined,
    })) ?? [];
  return data as IPhoto[];
};
