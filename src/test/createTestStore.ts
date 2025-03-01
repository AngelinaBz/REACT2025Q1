import selectedReducer from '@redux/slices/selectedSlice';
import { starWarsApi } from '@redux/slices/starWarsApi';
import { RootState } from '@redux/store';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export const createTestStore = (preloadedState?: Partial<RootState>) => {
  const rootReducer = combineReducers({
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    selected: selectedReducer,
  });

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
    preloadedState,
  });
};
