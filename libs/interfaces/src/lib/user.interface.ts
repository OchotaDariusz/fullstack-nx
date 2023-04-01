import { Role } from '@fullstack/types';

export interface User {
  id?: string;
  username?: string;
  password?: string;
  roles?: Role[];
}
