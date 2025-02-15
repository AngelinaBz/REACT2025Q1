import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedState {
  selectedIds: string[];
}

const initialState: SelectedState = {
  selectedIds: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      if (!state.selectedIds.includes(action.payload)) {
        state.selectedIds.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedIds = state.selectedIds.filter(
        (id) => id !== action.payload
      );
    },
    unselectAllItems: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } =
  selectedSlice.actions;
export const selectSelectedIds = (state: { selected: SelectedState }) =>
  state.selected.selectedIds;

export default selectedSlice.reducer;
