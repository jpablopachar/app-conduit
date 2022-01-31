import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/CurrentUser';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { AuthService } from '../services/auth.service';
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
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from './auth.actions';

const key: 'accessToken' = 'accessToken';

@Injectable()
export class AuthEffect {
  public register$;
  public login$;
  public getCurrentUser$;
  public updateCurrentUser$;
  public logout$;
  public redirectAfterSubmit$;

  constructor(
    private readonly _router: Router,
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _persistanceService: PersistanceService
  ) {
    this.register$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(registerAction),
        switchMap(({ request }) =>
          this._authService.register(request).pipe(
            map((currentUser: CurrentUser) => {
              this._persistanceService.set(key, currentUser.token);

              return registerSuccessAction({ currentUser });
            }),
            catchError((errorResponse: HttpErrorResponse) =>
              of(registerFailureAction({ errors: errorResponse.error.errors }))
            )
          )
        )
      );
    });

    this.login$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(loginAction),
        switchMap(({ request }) =>
          this._authService.login(request).pipe(
            map((currentUser: CurrentUser) => {
              this._persistanceService.set(key, currentUser.token);

              return loginSuccessAction({ currentUser });
            }),
            catchError((errorResponse: HttpErrorResponse) =>
              of(loginFailureAction({ errors: errorResponse.error.errors }))
            )
          )
        )
      );
    });

    this.getCurrentUser$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
          const token = this._persistanceService.get(key);

          if (!token) return of(getCurrentUserFailureAction());

          return this._authService.getCurrentUser().pipe(
            map((currentUser: CurrentUser) =>
              getCurrentUserSuccessAction({ currentUser })
            ),
            catchError(() => of(getCurrentUserFailureAction()))
          );
        })
      );
    });

    this.updateCurrentUser$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(updateCurrentUserAction),
        switchMap(({ currentUserInput }) =>
          this._authService.updateCurrentUser(currentUserInput).pipe(
            map((currentUser: CurrentUser) =>
              updateCurrentUserSuccessAction({ currentUser })
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              of(
                updateCurrentUserFailureAction({
                  errors: errorResponse.error.errors,
                })
              )
            )
          )
        )
      );
    });

    this.logout$ = createEffect(
      () => {
        return this._actions$.pipe(
          ofType(logoutAction),
          tap(() => {
            this._persistanceService.set(key, '');
            this._router.navigateByUrl('/');
          })
        );
      },
      { dispatch: false }
    );

    this.redirectAfterSubmit$ = createEffect(
      () => {
        return this._actions$.pipe(
          ofType(registerSuccessAction),
          tap((): Promise<boolean> => this._router.navigateByUrl('/'))
        );
      },
      { dispatch: false }
    );
  }
}
