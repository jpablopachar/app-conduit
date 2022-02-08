import { Action, createReducer, on } from '@ngrx/store';
import { PopularTagsState } from '../models/popular-tags-state';
import {
  getPopularTagsAction,
  getPopularTagsFailure,
  getPopularTagsSuccessAction
} from './popular-tags.actions';

const initialState: PopularTagsState = {
  data: null,
  isLoading: false,
  error: null,
};

const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state: PopularTagsState): PopularTagsState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state: PopularTagsState, action): PopularTagsState => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })
  ),
  on(
    getPopularTagsFailure,
    (state: PopularTagsState): PopularTagsState => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducers(
  state: PopularTagsState,
  action: Action
): PopularTagsState {
  return popularTagsReducer(state, action);
}
