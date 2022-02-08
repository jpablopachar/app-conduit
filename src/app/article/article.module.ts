import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import { ErrorMessageModule } from '../shared/modules/error-message/error-message.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { TagListModule } from '../shared/modules/tag-list/tag-list.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './components/article.component';
import { ArticleService } from './services/article.service';
import { ArticleEffects } from './store/article.effects';
import { reducers } from './store/article.reducers';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([ArticleEffects]),
    LoadingModule,
    ErrorMessageModule,
    TagListModule
  ],
  providers: [ArticleService, SharedArticleService]
})
export class ArticleModule { }