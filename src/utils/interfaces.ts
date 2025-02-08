export interface Person {
  name: string;
  gender: string;
  url: string;
}

export interface CardListState {
  people: Person[];
  isLoading: boolean;
}
