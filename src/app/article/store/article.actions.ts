import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/shared/models/Article';

export enum Types {
  GET_ARTICLE = '[Article] Get article',
  GET_ARTICLE_SUCCESS = '[Article] Get article success',
  GET_ARTICLE_FAILURE = '[Article] Get article failure',
  DELETE_ARTICLE = '[Article] Delete article',
  DELETE_ARTICLE_SUCCESS = '[Article] Delete article success',
  DELETE_ARTICLE_FAILURE = '[Article] Delete article failure',
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

export const deleteArticleAction = createAction(
  Types.DELETE_ARTICLE,
  props<{ slug: string }>()
);

export const deleteArticleSuccessAction = createAction(
  Types.DELETE_ARTICLE_SUCCESS
);

export const deleteArticleFailureAction = createAction(
  Types.DELETE_ARTICLE_FAILURE
);
