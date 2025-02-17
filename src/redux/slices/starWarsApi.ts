import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DetailPersonResponse, PeopleResponse } from '../../utils/types';

export const starWarsApi = createApi({
  reducerPath: 'starWars',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<PeopleResponse, number>({
      query: (page = 1) => `people/?page=${page}`,
    }),
    searchPeople: builder.query<
      PeopleResponse,
      { query: string; page: number }
    >({
      query: ({ query, page = 1 }) => `people/?search=${query}&page=${page}`,
    }),
    fetchDetailPerson: builder.query<DetailPersonResponse, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const {
  useGetAllPeopleQuery,
  useSearchPeopleQuery,
  useFetchDetailPersonQuery,
} = starWarsApi;
