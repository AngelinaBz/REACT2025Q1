import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { starWarsApi } from './slices/api';

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});
setupListeners(store.dispatch);
