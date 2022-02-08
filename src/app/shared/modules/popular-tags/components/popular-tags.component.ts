import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularTag } from 'src/app/shared/models/PopularTag';
import { getPopularTagsAction } from '../store/popular-tags.actions';
import {
  errorSelector,
  isLoadingSelector,
  popularTagsSelector
} from '../store/popular-tags.selectors';

@Component({
  selector: 'app-popular-tags',
  template: `
    <app-loading *ngIf="isLoading$ | async"></app-loading>
    <app-error-message
      *ngIf="error$ | async"
      [message]="error$ | async"
    ></app-error-message>
    <div class="sidebar" *ngIf="popularTags$ | async">
      <p>Popular Tags</p>
      <div class="tag-list">
        <a
          *ngFor="let popularTag of popularTags$ | async"
          [routerLink]="['/tags', popularTag]"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </a>
      </div>
    </div>
  `,
})
export class PopularTagsComponent implements OnInit {
  public popularTags$!: Observable<PopularTag[] | null>;
  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.popularTags$ = this._store.select(popularTagsSelector);
    this.isLoading$ = this._store.select(isLoadingSelector);
    this.error$ = this._store.select(errorSelector);
    this._store.dispatch(getPopularTagsAction());
  }
}
