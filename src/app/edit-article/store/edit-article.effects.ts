import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/shared/models/Article';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import { EditArticleService } from '../services/edit-article.service';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from './edit-article.actions';

@Injectable()
export class EditArticleEffects {
  public getArticle$;
  public updateArticle$;
  public redirectAfterUpdate$;

  constructor(
    private readonly _router: Router,
    private readonly _actions$: Actions,
    private readonly _sharedArticleService: SharedArticleService,
    private readonly _editArticleService: EditArticleService
  ) {
    this.getArticle$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(getArticleAction),
        switchMap(({ slug }) =>
          this._sharedArticleService.getArticle(slug).pipe(
            map((article: Article) => getArticleSuccessAction({ article })),
            catchError(() => of(getArticleFailureAction()))
          )
        )
      );
    });
    this.updateArticle$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(updateArticleAction),
        switchMap(({ slug, articleInput }) =>
          this._editArticleService.updateArticle(slug, articleInput).pipe(
            map((article: Article) => updateArticleSuccessAction({ article })),
            catchError((errorResponse: HttpErrorResponse) =>
              of(
                updateArticleFailureAction({
                  errors: errorResponse.error.errors,
                })
              )
            )
          )
        )
      );
    });
    this.redirectAfterUpdate$ = createEffect(
      () => {
        return this._actions$.pipe(
          ofType(updateArticleSuccessAction),
          tap(({ article }) =>
            this._router.navigate(['/article', article.slug])
          )
        );
      },
      { dispatch: false }
    );
  }
}
