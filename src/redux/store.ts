import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import detailsReducer from './slices/detailsSlice';
import peopleReducer from './slices/peopleSlice';
import selectedReducer from './slices/selectedSlice';

const rootReducer = combineReducers({
  people: peopleReducer,
  details: detailsReducer,
  selected: selectedReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
