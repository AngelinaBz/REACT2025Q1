import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonDetail } from 'src/utils/types.ts';

interface DetailsState {
  person: PersonDetail | null;
}

const initialState: DetailsState = {
  person: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<PersonDetail>) => {
      state.person = action.payload;
    },
  },
});

export const { setDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
