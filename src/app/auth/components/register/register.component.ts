import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrors } from 'src/app/shared/models/BackendErrors';
import { RegisterRequest } from '../../models/registerRequest';
import { registerAction } from '../../store/auth.actions';
import {
  isSubmittingSelector,
  validationErrorsSelector
} from '../../store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public isSubmitting$!: Observable<boolean>;
  public errors$!: Observable<BackendErrors>;
  public form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store
  ) {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isSubmitting$ = this._store.select(isSubmittingSelector);
    this.errors$ = this._store.select(validationErrorsSelector);
  }

  public onSubmit(): void {
    const request: RegisterRequest = { user: this.form.value };

    this._store.dispatch(registerAction({ request }));
  }
}
