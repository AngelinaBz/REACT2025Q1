import { Component, ReactNode } from 'react';
import { getAllFilmes, searchFilm } from '../../services/api';
import { CardListState } from '../../utils/interfaces';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './CardList.css';

class CardList extends Component<{ query: string }, CardListState> {
  state: CardListState = {
    films: [],
    isLoading: false,
  };

  async loadFilms(query: string) {
    this.setState({ isLoading: true });
    let data;
    try {
      if (query) {
        data = await searchFilm(query);
      } else {
        data = await getAllFilmes();
      }
      this.setState({ films: data.results });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount() {
    this.loadFilms(this.props.query);
  }

  async componentDidUpdate(prevProps: { query: string }) {
    if (prevProps.query !== this.props.query) {
      this.loadFilms(this.props.query);
    }
  }

  render(): ReactNode {
    const { isLoading, films } = this.state;
    return (
      <section className="cardlist-container">
        {isLoading ? (
          <Loading />
        ) : (
          films.map((film, index) => (
            <Card
              key={index}
              title={film.title}
              description={film.opening_crawl}
            />
          ))
        )}
      </section>
    );
  }
}

export default CardList;
