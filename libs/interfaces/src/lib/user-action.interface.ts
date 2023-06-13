import { ACTION } from '@fullstack/constants';
import { User } from './user.interface';

export interface UserAction {
  type: ACTION;
  payload?: User;
}
