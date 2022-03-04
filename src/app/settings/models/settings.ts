import { BackendErrors } from "src/app/shared/models/BackendErrors";

export interface SettingsState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null
}