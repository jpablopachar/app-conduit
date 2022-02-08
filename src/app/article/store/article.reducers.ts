import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import { ArticleState } from '../models/article-state';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction
} from './article.actions';

const initialState: ArticleState = {
  data: null,
  isLoading: false,
  error: null,
};

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state: ArticleState): ArticleState => ({ ...state, isLoading: true })
  ),
  on(
    getArticleSuccessAction,
    // eslint-disable-next-line ngrx/on-function-explicit-return-type
    (state: ArticleState, action) => ({ ...state, isLoading: false, data: action.article })
  ),
  on(
    getArticleFailureAction,
    (state: ArticleState): ArticleState => ({ ...state, isLoading: false })
  ),
  on(routerNavigatedAction, (): ArticleState => initialState)
);

export function reducers(state: ArticleState, action: Action): ArticleState {
  return articleReducer(state, action);
}
