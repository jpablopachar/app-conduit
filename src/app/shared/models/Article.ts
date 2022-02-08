import { PopularTag } from "./PopularTag";
import { Profile } from "./Profile";

export interface Article {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: PopularTag[];
  description: string;
  author: Profile;
  favorited: boolean;
  favoritesCount: number;
}