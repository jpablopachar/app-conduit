import { Article } from "src/app/shared/models/Article";
import { BackendErrors } from "src/app/shared/models/BackendErrors";

export interface EditArticleState {
  article: Article | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrors | null
}