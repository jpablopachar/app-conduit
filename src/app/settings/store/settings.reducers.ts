import { Action, createReducer, on } from '@ngrx/store';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from 'src/app/auth/store/auth.actions';
import { SettingsState } from '../models/settings';

const initialState: SettingsState = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsReducers = createReducer(
  initialState,
  on(
    updateCurrentUserAction,
    (state: SettingsState): SettingsState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state: SettingsState): SettingsState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state: SettingsState, action): SettingsState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
);

export function reducers(state: SettingsState, action: Action): SettingsState {
  return settingsReducers(state, action);
}
