import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/auth.selectors';
import { CurrentUser } from 'src/app/shared/models/CurrentUser';
import { UserProfile } from '../models/user-profile';
import { getUserProfileAction } from '../store/user-profile.actions';
import {
  errorSelector,
  isLoadingSelector,
  UserProfileSelector
} from '../store/user-profile.selectors';

@Component({
  selector: 'app-user-profile',
  template: `
    <div class="profile-page" *ngIf="userProfile$ | async as userProfile">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img class="user-img" [src]="userProfile.image" />
              <h4>{{ userProfile.username }}</h4>
              <p>{{ userProfile.bio }}</p>
              <div>
                FOLLOW USER BUTTON
                <a
                  *ngIf="isCurrentUserProfile$ | async"
                  class="btn btn-sm btn-outline-secondary action-btn"
                  [routerLink]="['/settings']"
                  >Edit Profile Settings</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" *ngIf="userProfile$ | async as userProfile">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a
                    [routerLink]="['/profiles', userProfile.username]"
                    class="nav-link"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: true }"
                  >
                    My Posts
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    [routerLink]="[
                      '/profiles',
                      userProfile.username,
                      'favorites'
                    ]"
                    class="nav-link"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: true }"
                  >
                    Favorites Posts
                  </a>
                </li>
              </ul>
            </div>
            <app-feed [apiUrl]="getApiUrl()"></app-feed>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class UserProfileComponent implements OnInit {
  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;
  public isCurrentUserProfile$!: Observable<boolean>;

  public userProfile$!: Observable<UserProfile | null>;
  public slug: string | null;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store
  ) {
    this.slug = '';
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  public initializeValues(): void {
    this.slug = this._route.snapshot.paramMap.get('slug');
    this.isLoading$ = this._store.select(isLoadingSelector);
    this.error$ = this._store.select(errorSelector);
    this.isCurrentUserProfile$ = combineLatest([
      this._store.select(currentUserSelector).pipe(filter(Boolean)),
      this._store.select(UserProfileSelector).pipe(filter(Boolean)),
    ]).pipe(
      map(
        ([currentUser, userProfile]: [CurrentUser, UserProfile]): boolean =>
          currentUser.username === userProfile.username
      )
    );
  }

  public initializeListeners(): void {
    this.userProfile$ = this._store.select(UserProfileSelector);

    this._route.params.subscribe((params: Params): void => {
      this.slug = params[`slug`];

      this.fetchUserProfile();
    });
  }

  public getApiUrl(): string {
    const isFavorites: boolean = this._router.url.includes('favorites');

    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  public fetchUserProfile(): void {
    this._store.dispatch(getUserProfileAction({ slug: this.slug }));
  }
}
