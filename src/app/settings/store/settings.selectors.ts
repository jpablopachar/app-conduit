/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { SettingsState } from '../models/settings';

export const settingsFeatureSelector =
  createFeatureSelector<SettingsState>('settings');

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsState): boolean => settingsState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsState): BackendErrors | null => settingsState.validationErrors
);
