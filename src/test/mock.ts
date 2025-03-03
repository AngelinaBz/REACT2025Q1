import { DetailPersonResponse, PeopleResponse } from 'src/utils/types';

export const mockPeopleResponse: PeopleResponse = {
  results: [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
  count: 1,
};

export const mockDetailsResponse: DetailPersonResponse = {
  name: 'Luke Skywalker',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
  birth_year: '19BBY',
};
