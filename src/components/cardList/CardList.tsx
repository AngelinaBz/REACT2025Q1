import React, { useState, useEffect } from 'react';
import { getAllPeople, searchPeople } from '../../services/api';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import { Person } from '../../utils/interfaces';
import './CardList.css';

interface CardListProps {
  query: string;
  page: number;
}

const CardList: React.FC<CardListProps> = ({ query, page }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadFilms = async (query: string, page: number) => {
    setIsLoading(true);
    let data;
    try {
      if (query) {
        data = await searchPeople(query, page);
      } else {
        data = await getAllPeople(page);
      }
      setPeople(data.results);
    } catch (error) {
      console.error('Error loading people:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilms(query, page);
  }, [query, page]);

  return (
    <section className="cardlist-container">
      {isLoading ? (
        <Loading />
      ) : (
        people.map((people, index) => (
          <Card key={index} name={people.name} gender={people.gender} />
        ))
      )}
    </section>
  );
};

export default CardList;
