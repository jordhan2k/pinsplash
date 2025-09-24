import { ILinks } from "./link.type";
import { ITopic } from "./topic.type";
import { IUser } from "./user.type";

export interface IAlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
  id: string;
}

export interface IUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface ISponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: IUser;
}

export interface ITag {
  type: string;
  title: string;
}

export interface IPhoto {
  id: string;
  slug: string;
  alternative_slugs: IAlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  breadcrumbs: string[]; // can type further if you know structure
  urls: IUrls;
  links: ILinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[]; // can type further if needed
  sponsorship: ISponsorship | null;
  topic_submissions: Record<string, unknown>;
  topics: ITopic[]; // can type further if you know structure
  asset_type: string;
  user: IUser;
  tags: ITag[];

  views: number;
  downloads: number;

  blurDataURL?: string;
}

export interface ISearchPhotos {
  results: IPhoto[];
  total: number;
  total_pages: number;
}
