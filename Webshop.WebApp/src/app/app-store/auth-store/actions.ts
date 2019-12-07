import { createAction, props, union } from '@ngrx/store';
import { LoginDto } from 'src/models/auth/login';
import { RegisterDto } from 'src/models/auth/register';
import { AuthenticatedUser } from 'src/models/auth/user';

export enum ActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',

  LOGOUT = '[Auth] Logout',

  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',

  CHECK_EMAIL_TAKEN = '[Auth] Check Email Taken',
  CHECK_EMAIL_TAKEN_SUCCESS = '[Auth] Check Email Taken Success',
  CHECK_EMAIL_TAKEN_FAILURE = '[Auth] Check Email Taken Failure',
}

// Login
export const login = createAction(ActionTypes.LOGIN, props<{ credentials: LoginDto }>());
export const loginSuccess = createAction(ActionTypes.LOGIN_SUCCESS, props<{ user: AuthenticatedUser }>());
export const loginFailure = createAction(ActionTypes.LOGIN_FAILURE, props<{ error: any }>());

// Register
export const register = createAction(ActionTypes.REGISTER, props<{ credentials: RegisterDto }>());
export const registerSuccess = createAction(ActionTypes.REGISTER_SUCCESS);
export const registerFailure = createAction(ActionTypes.REGISTER_FAILURE, props<{ error: any }>());

// Check if email is taken
export const checkEmailTaken = createAction(ActionTypes.CHECK_EMAIL_TAKEN, props<{ email: string }>());
export const checkEmailTakenSuccess = createAction(ActionTypes.CHECK_EMAIL_TAKEN_SUCCESS, props<{ result: boolean }>());
export const checkEmailTakenFailure = createAction(ActionTypes.CHECK_EMAIL_TAKEN_FAILURE, props<{ error: any}>());

// Logout
export const logout = createAction(ActionTypes.LOGOUT);

const allActions = union({
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  checkEmailTaken,
  checkEmailTakenSuccess,
  checkEmailTakenFailure,
  logout,
});

export type AuthActionUnion = typeof allActions;
