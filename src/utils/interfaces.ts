export interface Film {
  title: string;
  opening_crawl: string;
}

export interface CardListState {
  films: Film[];
}

export interface CardProps {
  title: string;
  description: string;
}
