import { createAction, props } from '@ngrx/store';
import { PopularTag } from 'src/app/shared/models/PopularTag';

export enum Types {
  GET_POPULAR_TAGS = '[Popular Tags] Get popular tags',
  GET_POPULAR_TAGS_SUCCESS = '[Popular Tags] Get popular tags success',
  GET_POPULAR_TAGS_FAILURE = '[Popular Tags] Get popular tags failure',
}

export const getPopularTagsAction = createAction(Types.GET_POPULAR_TAGS);

export const getPopularTagsSuccessAction = createAction(
  Types.GET_POPULAR_TAGS_SUCCESS,
  props<{ popularTags: PopularTag[] }>()
);

export const getPopularTagsFailure = createAction(
  Types.GET_POPULAR_TAGS_FAILURE
);
