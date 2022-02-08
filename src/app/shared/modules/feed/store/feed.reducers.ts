import { routerNavigationAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import { FeedState } from '../models/FeedState';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction
} from './feed.actions';

const initialState: FeedState = {
  data: null,
  isLoading: false,
  error: null,
};

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state: FeedState): FeedState => ({ ...state, isLoading: true })
  ),
  on(
    getFeedSuccessAction,
    (state: FeedState, action): FeedState => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })
  ),
  on(
    getFeedFailureAction,
    (state: FeedState): FeedState => ({ ...state, isLoading: false })
  ),
  on(routerNavigationAction, (): FeedState => initialState)
);

export function reducers(state: FeedState, action: Action): FeedState {
  return feedReducer(state, action);
}