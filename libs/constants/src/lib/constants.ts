export const dbConstants = {
  host: process.env['NX_DB_HOST'],
  port: process.env['NX_DB_PORT'],
  user: process.env['NX_DB_USER'],
  password: process.env['NX_DB_PASSWORD'],
  name: process.env['NX_DB_NAME'],
};

export const jwtConstants = {
  secret: process.env['NX_JWT_SECRET'],
};

export const ROLES_KEY = 'roles';

export enum ACTION {
  GET_TEXT,
  LOGIN,
  LOGOUT,
}

export const JWT_LOCAL_STORAGE_KEY = 'access_token';

export const AUTH_STATE_LOCAL_STORAGE_KEY = 'auth';
