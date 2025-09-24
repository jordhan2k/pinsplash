import { ILinks } from "./link.type";
import { IPhoto, IUrls } from "./photo.type";
import { IUser } from "./user.type";

export interface ITopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  published_at: string;
  updated_at: string;
  starts_at: string;
  ends_at: string | null;
  only_submissions_after: string | null;
  visibility: string;
  featured: boolean;
  total_photos: number;
  current_user_contributions: string[];
  total_current_user_submissions: number | null;
  links: ILinks;
  media_types: string[];
  status: string;
  owners: IUser[];
  cover_photo: IPhoto;
  preview_photos: IPreviewPhoto[];
}

export interface IPreviewPhoto {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  blur_hash: string;
  asset_type: string;
  urls: IUrls;
}
