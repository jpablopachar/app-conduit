import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { GetFeedResponse } from '../models/GetFeedResponse';
import { FeedService } from '../services/feed.service';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction
} from './feed.actions';

@Injectable()
export class FeedEffect {
  public getFeed$;

  constructor(
    private readonly _actions$: Actions,
    private readonly _feedService: FeedService
  ) {
    this.getFeed$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(getFeedAction),
        switchMap(({ url }) =>
          this._feedService.getFeed(url).pipe(
            map((feed: GetFeedResponse) => getFeedSuccessAction({ feed })),
            catchError(() => of(getFeedFailureAction))
          )
        )
      );
    });
  }
}
