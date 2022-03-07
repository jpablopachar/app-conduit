import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { UserProfileComponent } from './components/user-profile.component';
import { UserProfileService } from './services/user-profile.service';
import { getUserProfileEffects } from './store/user-profile.effects';
import { reducers } from './store/user-profile.reducers';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    EffectsModule.forFeature([getUserProfileEffects]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule
  ],
  providers: [UserProfileService]
})
export class UserProfileModule { }
