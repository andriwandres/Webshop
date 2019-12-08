import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import * as authActions from './actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    exhaustMap(action => this.authService.login(action.credentials).pipe(
      map(user => authActions.loginSuccess({ user })),
      catchError(error => of(authActions.loginFailure({ error }))),
    )),
  ));

  register$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.register),
    switchMap(action => this.authService.register(action.credentials).pipe(
      map(() => authActions.registerSuccess()),
      catchError(error => of(authActions.registerFailure({ error }))),
    )),
  ));

  checkEmailTaken = createEffect(() => this.actions$.pipe(
    ofType(authActions.checkEmailTaken),
    switchMap(action => this.authService.checkEmailTaken(action.email).pipe(
      map(result => authActions.checkEmailTakenSuccess({ result })),
      catchError(error => of(authActions.checkEmailTakenFailure({ error }))),
    )),
  ));

  constructor(
    private readonly authService: AuthService,
    private readonly actions$: Actions<authActions.AuthActionUnion>,
  ) {}
}
