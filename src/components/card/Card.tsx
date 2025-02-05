import { CardProps } from '../../utils/interfaces';
import './Card.css';

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <section className="card-container">
      <h2>{title}</h2>
      <p className="card-container__description">{description}</p>
    </section>
  );
};

export default Card;
