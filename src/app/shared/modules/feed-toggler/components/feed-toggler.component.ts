import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-feed-toggler',
  template: `
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        <li class="nav-item" *ngIf="isLoggedIn$ | async">
          <a [routerLink]="['/feed']" class="nav-link" routerLinkActive="active"
            >Your feed</a
          >
        </li>
        <li class="nav-item">
          <a
            [routerLink]="['/']"
            class="nav-link"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Global feed</a
          >
        </li>
        <li class="nav-item" *ngIf="tagName">
          <a
            [routerLink]="['/tags', tagName]"
            class="nav-link"
            routerLinkActive="active"
          >
            <i class="ion-pound"></i>
            {{ tagName }}
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class FeedTogglerComponent implements OnInit {
  @Input() tagName!: string | null;

  public isLoggedIn$!: Observable<boolean | null>;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this._store.select(isLoggedInSelector);
  }
}
