import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addFavoritesAction } from '../store/add-favorites.actions';

@Component({
  selector: 'app-add-favorites',
  template: `
    <button
      (click)="handleLike()"
      [ngClass]="{
        btn: true,
        'btn-sm': true,
        'btn-primary': isFavoritedTemp,
        'btn-outline-primary': !isFavoritedTemp
      }"
    >
      <i class="ion-heart"></i>
      <span>&nbsp; {{ favoritesCountTemp }}</span>
    </button>
  `,
})
export class AddFavoritesComponent implements OnInit {
  @Input() isFavorited!: boolean;
  @Input() favoritesCount!: number;
  @Input() articleSlug!: string;

  public favoritesCountTemp!: number;
  public isFavoritedTemp!: boolean;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.favoritesCountTemp = this.favoritesCount;
    this.isFavoritedTemp = this.isFavorited;
  }

  public handleLike(): void {
    this._store.dispatch(
      addFavoritesAction({
        isFavorited: this.isFavoritedTemp,
        slug: this.articleSlug,
      })
    );

    if (this.isFavoritedTemp) {
      this.favoritesCountTemp = this.favoritesCountTemp - 1;
    } else {
      this.favoritesCountTemp = this.favoritesCountTemp + 1;
    }

    this.isFavoritedTemp = !this.isFavoritedTemp;
  }
}
