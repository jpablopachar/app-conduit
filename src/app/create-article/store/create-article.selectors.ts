/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { CreateArticleState } from '../models/create-article-state';

export const createArticleFeatureSelector =
  createFeatureSelector<CreateArticleState>('createArticle');

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleState): boolean =>
    createArticleState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleState): BackendErrors | null =>
    createArticleState.validationErrors
);
