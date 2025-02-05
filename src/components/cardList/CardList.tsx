import React, { useState, useEffect } from 'react';
import { getAllFilmes, searchFilm } from '../../services/api';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import { Film } from '../../utils/interfaces';
import './CardList.css';

interface CardListProps {
  query: string;
}

const CardList: React.FC<CardListProps> = ({ query }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadFilms = async (query: string) => {
    setIsLoading(true);
    let data;
    try {
      if (query) {
        data = await searchFilm(query);
      } else {
        data = await getAllFilmes();
      }
      setFilms(data.results);
    } catch (error) {
      console.error('Error loading films:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilms(query);
  }, [query]);

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
};

export default CardList;
