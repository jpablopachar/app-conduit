import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { EditArticleComponent } from './components/edit-article.component';
import { EditArticleRoutingModule } from './edit-article-routing.module';
import { EditArticleService } from './services/edit-article.service';
import { EditArticleEffects } from './store/edit-article.effects';
import { reducers } from './store/edit-article.reducers';

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    EditArticleRoutingModule,
    EffectsModule.forFeature([EditArticleEffects]),
    StoreModule.forFeature('editArticle', reducers),
    ArticleFormModule,
    LoadingModule
  ],
  providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule { }
