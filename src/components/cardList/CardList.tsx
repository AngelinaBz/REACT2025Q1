import { Person } from '../../utils/types';
import Card from '../card/Card';
import './CardList.css';

interface CardListProps {
  people: Person[];
  onPersonClick(url: string): void;
}

const CardList = ({ people, onPersonClick }: CardListProps) => {
  return (
    <section className="cardlist-container">
      {people.length > 0 ? (
        people.map((people) => {
          const id = people.url.match(/\/(\d+)\//)?.[1];
          return (
            <Card
              key={id}
              id={id}
              url={people.url}
              name={people.name}
              gender={people.gender}
              onClick={() => onPersonClick(people.url)}
            />
          );
        })
      ) : (
        <p>No cards available</p>
      )}
    </section>
  );
};

export default CardList;
