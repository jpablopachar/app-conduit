import { CurrentUser } from './CurrentUser';

export interface CurrentUserInput extends CurrentUser {
  password: string;
}