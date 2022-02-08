import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/shared/models/Article';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import { ArticleService } from '../services/article.service';
import {
    deleteArticleAction,
    deleteArticleFailureAction,
    deleteArticleSuccessAction,
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction
} from './article.actions';

@Injectable()
export class ArticleEffects {
  public getArticle$;
  public deleteArticle$;
  public redirectAfterDelete$;

  constructor(
    private readonly _router: Router,
    private readonly _actions$: Actions,
    private readonly _articleService: ArticleService,
    private readonly _sharedArticleService: SharedArticleService
  ) {
    this.getArticle$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(getArticleAction),
        switchMap(({ slug }) =>
          this._sharedArticleService.getArticle(slug).pipe(
            map(
              (article: Article) => getArticleSuccessAction({ article }),
              catchError(() => of(getArticleFailureAction()))
            )
          )
        )
      );
    });

    this.deleteArticle$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(deleteArticleAction),
        switchMap(({ slug }) =>
          this._articleService.deleteArticle(slug).pipe(
            map(() => deleteArticleSuccessAction()),
            catchError(() => of(deleteArticleFailureAction()))
          )
        )
      );
    });

    this.redirectAfterDelete$ = createEffect(
      () => {
        return this._actions$.pipe(
          ofType(deleteArticleSuccessAction),
          tap(() => this._router.navigate(['/']))
        );
      },
      { dispatch: false }
    );
  }
}
