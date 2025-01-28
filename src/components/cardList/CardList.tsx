import { Component, ReactNode } from 'react';
import { getAllFilmes, searchFilm } from '../../services/api';
import { CardListState } from '../../utils/interfaces';
import Card from '../card/Card';

class CardList extends Component<{ query: string }, CardListState> {
  state: CardListState = {
    films: [],
  };

  async loadFilms(query: string) {
    let data;
    if (query) {
      data = await searchFilm(query);
    } else {
      data = await getAllFilmes();
    }
    this.setState({ films: data.results });
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
    return (
      <>
        {this.state.films.map((film, index) => (
          <Card
            key={index}
            title={film.title}
            description={film.opening_crawl}
          />
        ))}
      </>
    );
  }
}

export default CardList;
