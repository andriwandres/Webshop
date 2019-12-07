import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from './actions';
import { initialState, State } from './state';
import { AppUser } from 'src/models/auth/user';

const reducer = createReducer(
  initialState,

  // Login
  on(authActions.login, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(authActions.loginSuccess, (state, { user }) => {
    localStorage.setItem('token', user.token);

    return {
      ...state,
      token: user.token,
      user: user as AppUser,
      isLoading: false,
      error: null,
    };
  }),
  on(authActions.loginFailure, (state, { error }) => {
    return {
      ...state,
      user: null,
      token: null,
      isLoading: false,
      error,
    };
  }),

  // Register
  on(authActions.register, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(authActions.registerSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  }),
  on(authActions.registerFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Logout
  on(authActions.logout, (state) => {
    localStorage.removeItem('token');

    return {
      ...state,
      token: null,
      user: null,
    };
  }),

  // Check if email taken
  on(authActions.checkEmailTaken, (state) => {
    return {
      ...state,
      emailTaken: null,
      isLoading: true,
      error: null,
    };
  }),
  on(authActions.checkEmailTakenSuccess, (state, { result }) => {
    return {
      ...state,
      emailTaken: result,
      isLoading: false,
      error: null,
    };
  }),
  on(authActions.checkEmailTakenFailure, (state, { error }) => {
    return {
      ...state,
      emailTaken: null,
      isLoading: false,
      error,
    };
  })
);

export function authReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
