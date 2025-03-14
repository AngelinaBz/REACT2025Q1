import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './slices/countries-slice';
import formReducer from './slices/form-slice';

export const store = configureStore({
  reducer: {
    formData: formReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
