import detailsReducer from '@redux/slices/detailsSlice';
import peopleReducer from '@redux/slices/peopleSlice';
import selectedReducer from '@redux/slices/selectedSlice';
import { RootState } from '@redux/store';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export const createTestStore = (preloadedState?: Partial<RootState>) => {
  const rootReducer = combineReducers({
    people: peopleReducer,
    details: detailsReducer,
    selected: selectedReducer,
  });

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });
};
