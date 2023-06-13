import { configureStore } from '@reduxjs/toolkit';
import { authReducer, initialAuthState } from '../authReducer';

import { AUTH_STATE_LOCAL_STORAGE_KEY } from '@fullstack/constants';
import { User } from '@fullstack/interfaces';

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

const persistedState = loadLocalState();

const store = configureStore({
  reducer: authReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState()));
});

export { store };
