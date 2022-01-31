/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/authState';

export const authFeatureSelector = createFeatureSelector<AuthState>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState): boolean => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState): any => authState.validationErrors
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState): boolean | null => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState): boolean => authState.isLoggedIn === false
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState): any => authState.currentUser
)