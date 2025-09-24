import { fetchApi } from "@/lib/fetchApi";
import { IPhoto } from "@/types";

export const fetchPhotoDetail = (id: string): Promise<IPhoto> => {
  return fetchApi<IPhoto>(`/photos/${id}`);
};
