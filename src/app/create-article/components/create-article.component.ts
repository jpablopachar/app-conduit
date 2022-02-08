import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from 'src/app/auth/store/auth.selectors';
import { ArticleInput } from 'src/app/shared/models/ArticleInput';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { createArticleAction } from '../store/create-article.actions';
import { validationErrorsSelector } from '../store/create-article.selectors';

@Component({
  selector: 'app-create-article',
  template: `
    <app-article-form
      [initialValues]="initialValues"
      [isSubmitting]="isSubmitting$ | async"
      [errors]="errors$ | async"
      (articleSubmit)="onSubmit($event)"
    ></app-article-form>
  `,
})
export class CreateArticleComponent implements OnInit {
  public isSubmitting$!: Observable<boolean>;
  public errors$!: Observable<BackendErrors | null>;

  public initialValues: ArticleInput;

  constructor(private readonly _store: Store) {
    this.initialValues = {
      title: '',
      description: '',
      body: '',
      tagList: [],
    };
  }

  ngOnInit(): void {
    this.isSubmitting$ = this._store.select(isSubmittingSelector);
    this.errors$ = this._store.select(validationErrorsSelector);
  }

  public onSubmit(articleInput: ArticleInput): void {
    this._store.dispatch(createArticleAction({ articleInput }));
  }
}