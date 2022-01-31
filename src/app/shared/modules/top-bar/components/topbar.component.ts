import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector
} from 'src/app/auth/store/auth.selectors';
import { CurrentUser } from 'src/app/shared/models/CurrentUser';

@Component({
  selector: 'app-topbar',
  template: `
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['/']"> medium </a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a [routerLink]="['/']" class="nav-link"> Home </a>
          </li>
          <ng-container *ngIf="isLoggedIn$ | async">
            <li class="nav-item">
              <a [routerLink]="['/articles/new']" class="nav-link">
                <i class="ion-compose"></i>
                &nbsp; New Post
              </a>
            </li>
            <li class="nav-item">
              <a [routerLink]="['/settings']" class="nav-link">
                <i class="ion-gear-a"></i>
                &nbsp; Settings
              </a>
            </li>
            <li class="nav-item">
              <a
                [routerLink]="['/profiles', (currentUser$ | async)?.username]"
                class="nav-link"
              >
                <img class="user-pic" [src]="(currentUser$ | async)?.image" />
                &nbsp; {{ (currentUser$ | async)?.username }}
              </a>
            </li>
          </ng-container>
          <ng-container *ngIf="isAnonymous$ | async">
            <li class="nav-item">
              <a [routerLink]="['/login']" class="nav-link"> Sign in </a>
            </li>
            <li class="nav-item">
              <a [routerLink]="['/register']" class="nav-link"> Sign up </a>
            </li>
          </ng-container>
        </ul>
      </div>
    </nav>
  `,
  styles: [],
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean | null>;
  public isAnonymous$!: Observable<boolean>;
  public currentUser$!: Observable<CurrentUser | null>;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this._store.select(isLoggedInSelector);
    this.isAnonymous$ = this._store.select(isAnonymousSelector);
    this.currentUser$ = this._store.select(currentUserSelector);
  }
}
