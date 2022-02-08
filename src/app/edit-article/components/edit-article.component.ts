import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleInput } from 'src/app/shared/models/ArticleInput';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import {
  getArticleAction,
  updateArticleAction
} from '../store/edit-article.actions';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector
} from '../store/edit-article.selectors';

@Component({
  selector: 'app-edit-article',
  template: `
    <app-loading *ngIf="isLoading$ | async"></app-loading>
    <app-article-form
      *ngIf="initialValues$ | async"
      [initialValues]="initialValues$ | async"
      [isSubmitting]="isSubmitting$ | async"
      [errors]="errors$ | async"
      (articleSubmit)="onSubmit($event)"
    ></app-article-form>
  `,
})
export class EditArticleComponent implements OnInit {
  public initialValues$!: Observable<ArticleInput | null>;
  public isSubmitting$!: Observable<boolean>;
  public isLoading$!: Observable<boolean>;
  public errors$!: Observable<BackendErrors | null>;

  public slug: string | null;

  constructor(
    private readonly _store: Store,
    private readonly _route: ActivatedRoute
  ) {
    this.slug = this._route.snapshot.paramMap.get('slug');
  }

  ngOnInit(): void {
    this.isSubmitting$ = this._store.select(isSubmittingSelector);
    this.isLoading$ = this._store.select(isLoadingSelector);
    this.errors$ = this._store.select(validationErrorsSelector);
    this.initialValues$ = this._store.select(articleSelector);
    this._store.dispatch(getArticleAction({ slug: this.slug as string }));
  }

  public onSubmit(articleInput: ArticleInput): void {
    this._store.dispatch(
      updateArticleAction({ slug: this.slug as string, articleInput })
    );
  }
}
