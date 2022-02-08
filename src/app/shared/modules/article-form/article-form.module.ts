import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesModule } from '../backendErrorMessages/backend-error-messages.module';
import { ArticleFormComponent } from './components/article-form.component';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule
  ],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule { }
