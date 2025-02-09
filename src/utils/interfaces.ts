export interface Person {
  name: string;
  gender: string;
  url: string;
  birth_year?: string;
}

export interface CardListState {
  people: Person[];
  isLoading: boolean;
}
