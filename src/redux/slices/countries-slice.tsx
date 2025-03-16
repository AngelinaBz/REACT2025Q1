import { createSlice } from '@reduxjs/toolkit';

import { countries } from '../../types/countries';

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: countries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: { countries: CountriesState }) =>
  state.countries.countries;

export default countriesSlice.reducer;
