/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfile } from '../models/user-profile';
import { UserProfileState } from '../models/user-profile-state';

export const userProfileFeatureSelector =
  createFeatureSelector<UserProfileState>('userProfile');

export const UserProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileState): UserProfile | null =>
    userProfileState.data
);

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileState): boolean => userProfileState.isLoading
);

export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileState): string | null => userProfileState.error
);
