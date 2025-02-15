import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  id: string;
  name: string;
  gender: string;
}

interface SelectedState {
  selectedPeople: Person[];
}

const initialState: SelectedState = {
  selectedPeople: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Person>) => {
      if (
        !state.selectedPeople.some((person) => person.id === action.payload.id)
      ) {
        state.selectedPeople.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedPeople = state.selectedPeople.filter(
        (person) => person.id !== action.payload
      );
    },
    unselectAllItems: (state) => {
      state.selectedPeople = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } =
  selectedSlice.actions;
export const selectSelectedIds = (state: { selected: SelectedState }) =>
  state.selected.selectedPeople;

export default selectedSlice.reducer;
