import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParsedUrl, parseUrl, stringify } from 'query-string';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetFeedResponse } from '../models/GetFeedResponse';
import { getFeedAction } from '../store/feed.actions';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector
} from '../store/feed.selectors';

@Component({
  selector: 'app-feed',
  template: `
    <app-loading *ngIf="isLoading$ | async"></app-loading>
    <app-error-message *ngIf="error$ | async"></app-error-message>
    <div *ngIf="feed$ | async">
      <div
        class="article-preview"
        *ngFor="let article of (feed$ | async)?.articles"
      >
        <div class="article-meta">
          <a [routerLink]="['/profiles', article.author.username]">
            <img [src]="article.author.image" />
          </a>
          <div class="info">
            <a
              [routerLink]="['/profiles', article.author.username]"
              class="author"
            >
              {{ article.author.username }}
            </a>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <!-- <mc-add-to-favorites
          [isFavorited]="article.favorited"
          [articleSlug]="article.slug"
          [favoritesCount]="article.favoritesCount"
        >
        </mc-add-to-favorites> -->
          </div>
        </div>
        <a [routerLink]="['/articles', article.slug]" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more..</span>
          <app-tag-list [tags]="article.tagList"></app-tag-list>
        </a>
      </div>
      <app-pagination
        [total]="(feed$ | async)?.articlesCount"
        [limit]="limit"
        [url]="baseUrl"
        [currentPage]="currentPage"
      ></app-pagination>
    </div>
  `
})
export class FeedComponent implements OnChanges, OnInit, OnDestroy {
  @Input() apiUrl!: string;

  public feed$!: Observable<GetFeedResponse | null>;
  public error$!: Observable<string | null>;
  public isLoading$: any;
  public queryParamsSubs!: Subscription;
  public limit: number;
  public baseUrl: string;
  public currentPage: number;

  constructor(
    private readonly _store: Store,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    this.limit = environment.limit;
    this.baseUrl = '';
    this.currentPage = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged: boolean =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnInit(): void {
    this.queryParamsSubs = this._route.queryParams.subscribe(
      (params: Params): void => {
        this.currentPage = Number(params['page'] || '1');

        this.fetchFeed();
      }
    );
    this.feed$ = this._store.select(feedSelector);
    this.error$ = this._store.select(errorSelector);
    this.isLoading$ = this._store.select(isLoadingSelector);
    this.baseUrl = this._router.url.split('?')[0];
  }

  public fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedUrl: ParsedUrl = parseUrl(this.apiUrl);
    const stringifiedParams: string = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams: string = `${parsedUrl.url}?${stringifiedParams}`;

    this._store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  ngOnDestroy(): void {
    this.queryParamsSubs.unsubscribe();
  }
}
