import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { LoginRequest } from '../../models/loginRequest';
import { loginAction } from '../../store/auth.actions';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public isSubmitting$!: Observable<boolean>;
  public errors$!: Observable<BackendErrors>;
  public form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store
  ) {
    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
    this.errors$ = this._store.pipe(select(validationErrorsSelector))
  }

  public onSubmit(): void {
    const request: LoginRequest = { user: this.form.value };

    this._store.dispatch(loginAction({request}))
  }
}
