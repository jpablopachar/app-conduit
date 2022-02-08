import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/shared/models/Article';
import { ArticleInput } from 'src/app/shared/models/ArticleInput';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';

export enum Types {
  UPDATE_ARTICLE = '[Update article] Update Article',
  UPDATE_ARTICLE_SUCCESS = '[Update article] Update Article success',
  UPDATE_ARTICLE_FAILURE = '[Update article] Update Article failure',
  GET_ARTICLE = '[Update article] Get Article',
  GET_ARTICLE_SUCCESS = '[Update article] Get Article success',
  GET_ARTICLE_FAILURE = '[Update article] Get Article failure',
}

export const getArticleAction = createAction(
  Types.GET_ARTICLE,
  props<{ slug: string }>()
);

export const getArticleSuccessAction = createAction(
  Types.GET_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const getArticleFailureAction = createAction(Types.GET_ARTICLE_FAILURE);

export const updateArticleAction = createAction(
  Types.UPDATE_ARTICLE,
  props<{ slug: string; articleInput: ArticleInput }>()
);

export const updateArticleSuccessAction = createAction(
  Types.UPDATE_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const updateArticleFailureAction = createAction(
  Types.UPDATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrors }>()
);
