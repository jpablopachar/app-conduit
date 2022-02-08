import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Article } from 'src/app/shared/models/Article';
import { AddFavoritesService } from '../services/add-favorites.service';
import {
  addFavoritesAction,
  addFavoritesFailureAction,
  addFavoritesSuccessAction
} from './add-favorites.actions';

@Injectable()
export class AddfavoritesEffects {
  public addFavorites$;

  constructor(
    private readonly _actions$: Actions,
    private addFavoritesService: AddFavoritesService
  ) {
    this.addFavorites$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(addFavoritesAction),
        switchMap(({ isFavorited, slug }) => {
          const article$ = isFavorited
            ? this.addFavoritesService.removeFromFavorites(slug)
            : this.addFavoritesService.addToFavorites(slug);

          return article$.pipe(
            map((article: Article) => addFavoritesSuccessAction({ article })),
            catchError(() => of(addFavoritesFailureAction()))
          );
        })
      );
    });
  }
}
