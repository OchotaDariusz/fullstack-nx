import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../authReducer';

import { AUTH_STATE_LOCAL_STORAGE_KEY } from '@fullstack/constants';

const persistedState = localStorage.getItem(AUTH_STATE_LOCAL_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(AUTH_STATE_LOCAL_STORAGE_KEY) as string)
  : undefined;

const store = configureStore({
  reducer: authReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  console.log(store.getState());
  localStorage.setItem('auth', JSON.stringify(store.getState()));
});

export { store };
