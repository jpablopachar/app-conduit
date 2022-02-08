import { Action, createReducer, on } from "@ngrx/store"
import { EditArticleState } from "../models/edit-article-state"
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction, updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction } from "./edit-article.actions"

const initialState: EditArticleState = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null
}

const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state: EditArticleState): EditArticleState => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    updateArticleSuccessAction,
    (state: EditArticleState): EditArticleState => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    updateArticleFailureAction,
    (state: EditArticleState, action): EditArticleState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    getArticleAction,
    (state: EditArticleState): EditArticleState => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state: EditArticleState, action): EditArticleState => ({
      ...state,
      isLoading: false,
      article: action.article
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleState => ({
      ...state,
      isLoading: false
    })
  )
)

export function reducers(state: EditArticleState, action: Action): EditArticleState {
  return editArticleReducer(state, action)
}
