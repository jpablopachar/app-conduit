import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/auth.selectors';
import { Article } from 'src/app/shared/models/Article';
import { CurrentUser } from 'src/app/shared/models/CurrentUser';
import { isLoadingSelector } from 'src/app/shared/modules/feed/store/feed.selectors';
import {
  deleteArticleAction,
  getArticleAction
} from '../store/article.actions';
import { articleSelector, errorSelector } from '../store/article.selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  public isLoading$!: Observable<boolean>;
  public isAuthor$!: Observable<boolean>;
  public error$!: Observable<string | null>;
  public article$!: Observable<Article | null>;

  public slug: string | null;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _store: Store
  ) {
    this.slug = this._route.snapshot.paramMap.get('slug');
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(isLoadingSelector);
    this.error$ = this._store.select(errorSelector);
    this.isAuthor$ = combineLatest([
      this._store.select(articleSelector),
      this._store.select(currentUserSelector),
    ]).pipe(
      map(([article, currentUser]: [Article | null, CurrentUser]): boolean => {
        if (!article || !currentUser) return false;

        return currentUser.username === article.author.username;
      })
    );
    this.article$ = this._store.select(articleSelector);
  }

  public fetchData(): void {
    this._store.dispatch(getArticleAction({ slug: this.slug as string }));
  }

  public deleteArticle(): void {
    this._store.dispatch(deleteArticleAction({ slug: this.slug as string }));
  }
}
