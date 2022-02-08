import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTag } from 'src/app/shared/models/PopularTag';
import { PopularTagsService } from '../services/popular-tags.service';
import {
  getPopularTagsAction,
  getPopularTagsFailure,
  getPopularTagsSuccessAction
} from './popular-tags.actions';

@Injectable()
export class GetPopularTagsEffects {
  public getPopularTags$;

  constructor(
    private readonly _actions$: Actions,
    private readonly _popularTagsService: PopularTagsService
  ) {
    this.getPopularTags$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(getPopularTagsAction),
        switchMap(() =>
          this._popularTagsService.getPopularTags().pipe(
            map((popularTags: PopularTag[]) =>
              getPopularTagsSuccessAction({ popularTags })
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              of(getPopularTagsFailure())
            )
          )
        )
      );
    });
  }
}