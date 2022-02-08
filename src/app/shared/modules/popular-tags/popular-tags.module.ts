import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../loading/loading.module';
import { PopularTagsComponent } from './components/popular-tags.component';
import { GetPopularTagsEffects } from './store/popular-tags.effects';
import { reducers } from './store/popular-tags.reducers';

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffects]),
    LoadingModule,
    ErrorMessageModule
  ],
  exports: [PopularTagsComponent]
})
export class PopularTagsModule { }
