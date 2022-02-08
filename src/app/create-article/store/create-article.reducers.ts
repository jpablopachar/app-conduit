import { Action, createReducer, on } from '@ngrx/store';
import { CreateArticleState } from '../models/create-article-state';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from './create-article.actions';

const initialState: CreateArticleState = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state): CreateArticleState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    createArticleSuccessAction,
    (state): CreateArticleState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    createArticleFailureAction,
    (state, action): CreateArticleState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
);

export function reducers(state: CreateArticleState, action: Action) {
  return createArticleReducer(state, action);
}
