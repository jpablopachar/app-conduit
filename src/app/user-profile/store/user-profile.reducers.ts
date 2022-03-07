/* eslint-disable ngrx/on-function-explicit-return-type */
import { Action, createReducer, on } from '@ngrx/store';
import { UserProfileState } from '../models/user-profile-state';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from './user-profile.actions';

const initialState: UserProfileState = {
  data: null,
  isLoading: false,
  error: null,
};

const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (state: UserProfileState): UserProfileState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getUserProfileSuccessAction,
    (state: UserProfileState, action): UserProfileState => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })
  ),
  on(
    getUserProfileFailureAction,
    (state: UserProfileState): UserProfileState => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducers(
  state: UserProfileState,
  action: Action
): UserProfileState {
  return userProfileReducer(state, action);
}
