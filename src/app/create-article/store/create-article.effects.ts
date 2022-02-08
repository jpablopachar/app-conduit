import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/shared/models/Article';
import { CreateArticleService } from '../services/create-article.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from './create-article.actions';

@Injectable()
export class CreateArticleEffects {
  public createArticle$;
  public redirectAfterCreate$;

  constructor(
    private readonly _router: Router,
    private readonly _actions$: Actions,
    private readonly _createArticleService: CreateArticleService
  ) {
    this.createArticle$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(createArticleAction),
        switchMap(({ articleInput }) =>
          this._createArticleService.createArticle(articleInput).pipe(
            map((article: Article) => createArticleSuccessAction({ article })),
            catchError((errorResponse: HttpErrorResponse) =>
              of(
                createArticleFailureAction({
                  errors: errorResponse.error.errors,
                })
              )
            )
          )
        )
      );
    });
    this.redirectAfterCreate$ = createEffect(
      () => {
        return this._actions$.pipe(
          ofType(createArticleSuccessAction),
          tap(({ article }) =>
            this._router.navigate(['/articles', article.slug])
          )
        );
      },
      { dispatch: false }
    );
  }
}
