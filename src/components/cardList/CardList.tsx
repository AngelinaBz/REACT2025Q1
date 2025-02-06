import React from 'react';
import Card from '../card/Card';
import { Person } from '../../utils/interfaces';
import './CardList.css';

interface CardListProps {
  people: Person[];
}

const CardList: React.FC<CardListProps> = ({ people }) => {
  return (
    <section className="cardlist-container">
      {people.map((people, index) => (
        <Card key={index} name={people.name} gender={people.gender} />
      ))}
    </section>
  );
};

export default CardList;
