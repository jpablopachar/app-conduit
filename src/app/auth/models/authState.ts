import { BackendErrors } from "src/app/shared/models/BackendErrors";
import { CurrentUser } from "src/app/shared/models/CurrentUser";

export interface AuthState {
  isSubmitting: boolean;
  currentUser: CurrentUser | null;
  isLoggedIn: boolean | null;
  validationErrors: BackendErrors | null;
  isLoading: boolean;
}