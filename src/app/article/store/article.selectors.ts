/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Article } from "src/app/shared/models/Article";
import { ArticleState } from "../models/article-state";

export const articleFeatureSelector = createFeatureSelector<ArticleState>('article')

export const isLoadingSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleState): boolean => articleState.isLoading
)

export const errorSelector = createSelector(
  articleFeatureSelector, (articleState: ArticleState): string | null => articleState.error
)

export const articleSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleState): Article | null => articleState.data
)