export const dbConstants = {
  url: process.env['NX_DB_URL'],
};

export const jwtConstants = {
  secret: process.env['NX_JWT_SECRET'],
};

export const serverConstants = {
  frontendHost: process.env['NX_FRONTEND_HOST'],
  backendHost: process.env['NX_BACKEND_HOST'],
};

export const ROLES_KEY = 'roles';

export enum ACTION {
  GET_TEXT,
  LOGIN,
  LOGOUT,
  TOGGLE_THEME,
}

export const JWT_LOCAL_STORAGE_KEY = 'access_token';

export const AUTH_STATE_LOCAL_STORAGE_KEY = 'auth';

export const THEME_MODE_LOCAL_SETTINGS = 'theme_mode';
