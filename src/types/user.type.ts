export interface IUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}

export interface IProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface ISocial {
  instagram_username: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
}

export interface IUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string | null;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string;
  location: string;
  links: IUserLinks;
  profile_image: IProfileImage;
  instagram_username: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: ISocial;
}
