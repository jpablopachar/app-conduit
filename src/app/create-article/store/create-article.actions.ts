import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/shared/models/Article';
import { ArticleInput } from 'src/app/shared/models/ArticleInput';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';

export enum Types {
  CREATE_ARTICLE = '[Create article] Create Article',
  CREATE_ARTICLE_SUCCESS = '[Create article] Create Article success',
  CREATE_ARTICLE_FAILURE = '[Create article] Create Article failure',
}

export const createArticleAction = createAction(
  Types.CREATE_ARTICLE,
  props<{ articleInput: ArticleInput }>()
);

export const createArticleSuccessAction = createAction(
  Types.CREATE_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const createArticleFailureAction = createAction(
  Types.CREATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrors }>()
);
