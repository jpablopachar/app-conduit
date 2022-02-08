import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../loading/loading.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TagListModule } from '../tag-list/tag-list.module';
import { FeedComponent } from './components/feed.component';
import { FeedService } from './services/feed.service';
import { FeedEffect } from './store/feed.effects';
import { reducers } from './store/feed.reducers';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([FeedEffect]),
    StoreModule.forFeature('feed', reducers),
    LoadingModule,
    PaginationModule,
    TagListModule,
    ErrorMessageModule
  ],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule { }
