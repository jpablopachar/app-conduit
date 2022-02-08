import { Article } from "src/app/shared/models/Article";

export interface GetFeedResponse {
  articles: Article[];
  articlesCount: number;
}