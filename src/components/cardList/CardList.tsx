import React from 'react';
import Card from '../card/Card';
import { Person } from '../../utils/interfaces';
import './CardList.css';

interface CardListProps {
  people: Person[];
  onPersonClick: (url: string) => void;
}

const CardList: React.FC<CardListProps> = ({ people, onPersonClick }) => {
  return (
    <section className="cardlist-container">
      {people.map((people, index) => (
        <Card
          key={index}
          name={people.name}
          gender={people.gender}
          onClick={() => onPersonClick(people.url)}
        />
      ))}
    </section>
  );
};

export default CardList;
