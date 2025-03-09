export interface Person {
  name: string;
  gender: string;
  url: string;
}

export interface SelectedPerson extends Person {
  id: string | undefined;
}

export interface PersonDetail extends Person {
  birth_year: string;
}

export interface PeopleResponse {
  results: Person[];
  count: number;
}

export type DetailPersonResponse = PersonDetail;

export type Theme = 'light' | 'dark';
