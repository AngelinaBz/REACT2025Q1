import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormDataRedux } from '../../types/types';

interface FormState {
  uncontrolledFormData: FormDataRedux[];
  controlledFormData: FormDataRedux[];
  lastAddedDataId?: string;
}

const initialState: FormState = {
  uncontrolledFormData: [],
  controlledFormData: [],
  lastAddedDataId: undefined,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<FormDataRedux>) => {
      state.uncontrolledFormData.push(action.payload);
      state.lastAddedDataId = action.payload.id;
    },
    addControlledFormData: (state, action: PayloadAction<FormDataRedux>) => {
      state.controlledFormData.push(action.payload);
      state.lastAddedDataId = action.payload.id;
    },
    clearLastAddedDataId: (state) => {
      state.lastAddedDataId = undefined;
    },
  },
});

export const {
  addUncontrolledFormData,
  addControlledFormData,
  clearLastAddedDataId,
} = formSlice.actions;

export default formSlice.reducer;
