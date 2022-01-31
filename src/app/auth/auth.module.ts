import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backend-error-messages.module';
import { PersistanceService } from '../shared/services/persistance.service';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthEffect } from './store/auth.effects';
import { reducers } from './store/auth.reducers';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffect])
  ],
  providers: [AuthService, PersistanceService]
})
export class AuthModule { }
