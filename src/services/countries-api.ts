import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1/all';

export const getCountries = async (): Promise<Country[]> => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error('Error');
    }
    const data: Country[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
