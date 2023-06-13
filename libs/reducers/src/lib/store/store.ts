import { configureStore } from '@reduxjs/toolkit';
import { authReducer, initialAuthState } from '../authReducer';

import { AUTH_STATE_LOCAL_STORAGE_KEY } from '@fullstack/constants';
import { User } from '@fullstack/interfaces';
import { loadLocalThemeMode, themeModeReducer } from '../theme-mode-reducer';
import { ThemeMode } from '@fullstack/types';

const loadLocalState = (): User => {
  const localState = localStorage.getItem(AUTH_STATE_LOCAL_STORAGE_KEY);
  if (localState) {
    try {
      const { id, username, roles } = JSON.parse(localState) as User;
      return { id: id ?? '', username: username ?? '', roles: roles ?? [] };
    } catch (_e) {
      return { ...initialAuthState };
    }
  } else {
    return { ...initialAuthState };
  }
};

const persistedAuthState = loadLocalState();
const persistedThemeModeSettings: ThemeMode = { mode: loadLocalThemeMode() };

const store = configureStore({
  reducer: { auth: authReducer, mode: themeModeReducer },
  preloadedState: {
    auth: persistedAuthState,
    mode: persistedThemeModeSettings,
  },
});

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth));
  localStorage.setItem('theme_mode', JSON.stringify(store.getState().mode));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
