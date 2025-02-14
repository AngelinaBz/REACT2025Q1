import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const starWarsApi = createApi({
  reducerPath: 'starWars',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getAllPeople: builder.query({
      query: (page = 1) => `people/?page=${page}`,
    }),
    searchPeople: builder.query({
      query: ({ query, page = 1 }) => `people/?search=${query}&page=${page}`,
    }),
    fetchDetailPerson: builder.query({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const {
  useGetAllPeopleQuery,
  useSearchPeopleQuery,
  useFetchDetailPersonQuery,
} = starWarsApi;
