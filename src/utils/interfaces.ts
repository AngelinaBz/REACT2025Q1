export interface Person {
  name: string;
  gender: string;
}

export interface CardListState {
  people: Person[];
  isLoading: boolean;
}

export interface CardProps {
  name: string;
  gender: string;
}
