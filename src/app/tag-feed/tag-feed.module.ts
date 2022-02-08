import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedTogglerModule } from '../shared/modules/feed-toggler/feed-toggler.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { PopularTagsModule } from '../shared/modules/popular-tags/popular-tags.module';
import { TagFeedComponent } from './components/tag-feed.component';
import { TagFeedRoutingModule } from './tag-feed-routing.module';

@NgModule({
  declarations: [TagFeedComponent],
  imports: [
    CommonModule,
    TagFeedRoutingModule,
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule
  ]
})
export class TagFeedModule { }
