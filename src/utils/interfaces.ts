export interface Film {
  title: string;
  opening_crawl: string;
}

export interface CardListState {
  films: Film[];
  isLoading: boolean;
}

export interface CardProps {
  title: string;
  description: string;
}
