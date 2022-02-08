import { BackendErrors } from "src/app/shared/models/BackendErrors";

export interface CreateArticleState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}