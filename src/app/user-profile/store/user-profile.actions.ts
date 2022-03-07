import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../models/user-profile';

export enum ActionTypes {
  GET_USER_PROFILE = '[User profile] Get user profile',
  GET_USER_PROFILE_SUCCESS = '[User profile] Get user profile success',
  GET_USER_PROFILE_FAILURE = '[User profile] Get user profile failure',
}

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{ slug: string | null }>()
);

export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{ userProfile: UserProfile }>()
);

export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE
);
