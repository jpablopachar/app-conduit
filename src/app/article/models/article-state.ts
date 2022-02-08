import { Article } from 'src/app/shared/models/Article';

export interface ArticleState {
  isLoading: boolean;
  error: string | null;
  data: Article | null;
}