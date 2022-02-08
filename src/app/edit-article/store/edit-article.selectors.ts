/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Article } from 'src/app/shared/models/Article';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { EditArticleState } from '../models/edit-article-state';

export const editArticleFeatureSelector =
  createFeatureSelector<EditArticleState>('editArticle');

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleState): Article | null =>
    editArticleState.article
);

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleState): boolean => editArticleState.isLoading
);

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleState): boolean => editArticleState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleState): BackendErrors | null =>
    editArticleState.validationErrors
);
