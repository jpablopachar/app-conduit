/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeedState } from "../models/FeedState";
import { GetFeedResponse } from "../models/GetFeedResponse";

export const feedFeatureSelector = createFeatureSelector<FeedState>('feed')

export const isLoadingSelector: any = createSelector

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedState): string | null => feedState.error
)

export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedState): GetFeedResponse | null => feedState.data
)