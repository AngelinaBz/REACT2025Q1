import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { starWarsApi } from './slices/api';
import selectedReducer from './slices/selectedSlice';

export const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    selected: selectedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
