import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  template: `
    <app-topbar></app-topbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(getCurrentUserAction())
  }
}
