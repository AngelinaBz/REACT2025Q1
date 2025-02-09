import './Card.css';

interface CardProps {
  name: string;
  gender: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, gender, onClick }) => {
  return (
    <section className="card-container" onClick={onClick}>
      <h2>{name}</h2>
      <p className="card-container__description">{gender}</p>
    </section>
  );
};

export default Card;
