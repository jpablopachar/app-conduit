import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AddFavoritesComponent } from './components/add-favorites.component';
import { AddFavoritesService } from './services/add-favorites.service';
import { AddfavoritesEffects } from './store/add-favorites.effects';

@NgModule({
  declarations: [AddFavoritesComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AddfavoritesEffects])
  ],
  exports: [AddFavoritesComponent],
  providers: [AddFavoritesService]
})
export class AddFavoritesModule { }
