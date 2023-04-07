export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface AuthObject {
  id: string;
  username: string;
  roles: Role[];
}
