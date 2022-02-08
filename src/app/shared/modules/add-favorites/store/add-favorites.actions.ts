import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/shared/models/Article';

export enum Types {
  ADD_FAVORITES = '[Add to favorites] Add to favorites',
  ADD_FAVORITES_SUCCESS = '[Add to favorites] Add to favorites success',
  ADD_FAVORITES_FAILURE = '[Add to favorites] Add to favorites failure',
}

export const addFavoritesAction = createAction(
  Types.ADD_FAVORITES,
  props<{ isFavorited: boolean; slug: string }>()
);

export const addFavoritesSuccessAction = createAction(
  Types.ADD_FAVORITES_SUCCESS,
  props<{ article: Article }>()
);
export const addFavoritesFailureAction = createAction(
  Types.ADD_FAVORITES_FAILURE
);
