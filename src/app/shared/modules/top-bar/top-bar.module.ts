import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './components/topbar.component';

@NgModule({
  declarations: [TopbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TopbarComponent]
})
export class TopBarModule { }
