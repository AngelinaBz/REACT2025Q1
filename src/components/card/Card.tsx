import { CardProps } from '../../utils/interfaces';
import './Card.css';

const Card: React.FC<CardProps> = ({ name, gender }) => {
  return (
    <section className="card-container">
      <h2>{name}</h2>
      <p className="card-container__description">{gender}</p>
    </section>
  );
};

export default Card;
