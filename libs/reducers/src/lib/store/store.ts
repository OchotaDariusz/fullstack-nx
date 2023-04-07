import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../authReducer';

const store = configureStore({
  reducer: authReducer,
});

store.subscribe(() => {
  console.log(store.getState());
  localStorage.setItem('auth', JSON.stringify(store.getState()));
});

export { store };
