import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import {
  logoutAction,
  updateCurrentUserAction
} from 'src/app/auth/store/auth.actions';
import { currentUserSelector } from 'src/app/auth/store/auth.selectors';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { CurrentUser } from 'src/app/shared/models/CurrentUser';
import { CurrentUserInput } from 'src/app/shared/models/CurrentUserInput';
import {
  isSubmittingSelector,
  validationErrorsSelector
} from '../store/settings.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public isSubmitting$!: Observable<boolean>;
  public backendErrors$!: Observable<BackendErrors | null>;
  public form: FormGroup;
  public currentUser!: CurrentUser;

  private _currentUserSubs!: Subscription;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store
  ) {
    this.form = this._formBuilder.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.isSubmitting$ = this._store.select(isSubmittingSelector);
    this.backendErrors$ = this._store.select(validationErrorsSelector);
    this._currentUserSubs = this._store
      .select(currentUserSelector)
      .pipe(filter(Boolean))
      .subscribe((currentUser: CurrentUser): void => {
        this.currentUser = currentUser;

        this.form.patchValue({
          image: currentUser.image,
          username: currentUser.username,
          bio: currentUser.bio,
          email: currentUser.email,
        });
      });
  }

  public submit(): void {
    const currentUserInput: CurrentUserInput = {
      ...this.currentUser,
      ...this.form.value,
    };

    this._store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  public logout(): void {
    this._store.dispatch(logoutAction());
  }

  ngOnDestroy(): void {
    this._currentUserSubs.unsubscribe();
  }
}
