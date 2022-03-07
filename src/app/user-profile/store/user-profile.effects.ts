import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { UserProfileService } from '../services/user-profile.service';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from './user-profile.actions';

@Injectable()
export class getUserProfileEffects {
  public getUserProfile$;

  constructor(
    private readonly _actions$: Actions,
    private readonly _userProfileService: UserProfileService
  ) {
    this.getUserProfile$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(getUserProfileAction),
        switchMap(({ slug }) =>
          this._userProfileService.getUserProfile(slug).pipe(
            map((userProfile: UserProfile) =>
              getUserProfileSuccessAction({ userProfile })
            ),
            catchError(() => of(getUserProfileFailureAction()))
          )
        )
      );
    });
  }
}
