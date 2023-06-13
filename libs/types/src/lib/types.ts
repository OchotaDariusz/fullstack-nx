export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type ColorMode = 'light' | 'dark';

export type ThemeMode = {
  mode: ColorMode | string;
};
