import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { countries } from '../../types/countries';
import { FormDataRedux } from '../../types/types';

interface FormState {
  uncontrolledFormData: FormDataRedux[];
  controlledFormData: FormDataRedux[];
  countries: string[];
}

const initialState: FormState = {
  uncontrolledFormData: [],
  controlledFormData: [],
  countries: countries,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<FormDataRedux>) => {
      state.controlledFormData.push(action.payload);
    },
    addControlledFormData: (state, action: PayloadAction<FormDataRedux>) => {
      state.controlledFormData.push(action.payload);
    },
  },
});

export const { addUncontrolledFormData, addControlledFormData } =
  formSlice.actions;

export default formSlice.reducer;
