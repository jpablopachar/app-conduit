import { createAction, props } from '@ngrx/store';
import { GetFeedResponse } from '../models/GetFeedResponse';

export enum Types {
  GET_FEED = '[Feed] Get feed',
  GET_FEED_SUCCESS = '[Feed] Get feed success',
  GET_FEED_FAILURE = '[Feed] Get feed failure',
}

export const getFeedAction = createAction(
  Types.GET_FEED,
  props<{ url: string }>()
);

export const getFeedSuccessAction = createAction(
  Types.GET_FEED_SUCCESS,
  props<{ feed: GetFeedResponse }>()
);

export const getFeedFailureAction = createAction(Types.GET_FEED_FAILURE);