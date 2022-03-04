import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backend-error-messages.module';
import { SettingsComponent } from './components/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { reducers } from './store/settings.reducers';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', reducers),
    BackendErrorMessagesModule
  ]
})
export class SettingsModule { }
