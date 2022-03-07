import { UserProfile } from "./user-profile";

export interface UserProfileState {
  data: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}