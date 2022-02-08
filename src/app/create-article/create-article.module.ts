import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { CreateArticleComponent } from './components/create-article.component';
import { CreateArticleRoutingModule } from './create-article-routing.module';
import { CreateArticleService } from './services/create-article.service';

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    CreateArticleRoutingModule,
    ArticleFormModule
  ],
  providers: [CreateArticleService]
})
export class CreateArticleModule { }
