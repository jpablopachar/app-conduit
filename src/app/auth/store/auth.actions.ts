import { createAction, props } from '@ngrx/store';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { CurrentUser } from 'src/app/shared/models/CurrentUser';
import { CurrentUserInput } from 'src/app/shared/models/CurrentUserInput';
import { LoginRequest } from '../models/loginRequest';
import { RegisterRequest } from '../models/registerRequest';

export enum Types {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register success',
  REGISTER_FAILURE = '[Auth] Register failure',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',

  UPDATE_CURRENT_USER = '[Auth] Update current user',
  UPDATE_CURRENT_USER_SUCCESS = '[Auth] Update current user success',
  UPDATE_CURRENT_USER_FAILURE = '[Auth] Update current user failure',

  LOGOUT = '[Auth] Logout',
}

export const registerAction = createAction(
  Types.REGISTER,
  props<{ request: RegisterRequest }>()
);

export const registerSuccessAction = createAction(
  Types.REGISTER_SUCCESS,
  props<{ currentUser: CurrentUser }>()
);

export const registerFailureAction = createAction(
  Types.REGISTER_FAILURE,
  props<{ errors: BackendErrors }>()
);

export const loginAction = createAction(
  Types.LOGIN,
  props<{ request: LoginRequest }>()
);

export const loginSuccessAction = createAction(
  Types.REGISTER,
  props<{ currentUser: CurrentUser }>()
);

export const loginFailureAction = createAction(
  Types.REGISTER,
  props<{ errors: BackendErrors }>()
);

export const getCurrentUserAction = createAction(Types.GET_CURRENT_USER);

export const getCurrentUserSuccessAction = createAction(
  Types.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUser }>()
);

export const getCurrentUserFailureAction = createAction(
  Types.GET_CURRENT_USER_FAILURE
);

export const updateCurrentUserAction = createAction(
  Types.UPDATE_CURRENT_USER,
  props<{ currentUserInput: CurrentUserInput }>()
);

export const updateCurrentUserSuccessAction = createAction(
  Types.UPDATE_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUser }>()
);

export const updateCurrentUserFailureAction = createAction(
  Types.UPDATE_CURRENT_USER_FAILURE,
  props<{ errors: BackendErrors }>()
);

export const logoutAction = createAction(Types.LOGOUT);
