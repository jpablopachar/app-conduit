import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/authState';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
  registerAction,
  registerFailureAction,
  registerSuccessAction,
  updateCurrentUserSuccessAction
} from './auth.actions';

const initialState: AuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state: AuthState): AuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state: AuthState, action): AuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state: AuthState, action): AuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state: AuthState): AuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state: AuthState, action): AuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state: AuthState, action): AuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state: AuthState): AuthState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state: AuthState, action): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state: AuthState): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state: AuthState, action): AuthState => ({
      ...state,
      currentUser: action.currentUser,
    })
  ),
  on(
    logoutAction,
    (state: AuthState): AuthState => ({
      ...state,
      ...initialState,
      isLoggedIn: false,
    })
  )
);

export function reducers(state: AuthState, action: Action): AuthState {
  return authReducer(state, action);
}
