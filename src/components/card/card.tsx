import { FormDataRedux } from '../../types/types';
import './card.css';

interface CardProps {
  data: FormDataRedux;
  isLastAdded: boolean;
}

const Card = ({ data, isLastAdded }: CardProps) => {
  return (
    <div className={`card ${isLastAdded ? 'highlight' : ''}`}>
      {data.picture && (
        <div>
          <img src={data.picture} alt="Profile" className="profile-picture" />
        </div>
      )}
      <p className="card-information">
        <strong>Name:</strong> {data.name}
      </p>
      <p className="card-information">
        <strong>Age:</strong> {data.age}
      </p>
      <p className="card-information">
        <strong>Email:</strong> {data.email}
      </p>
      <p className="card-information">
        <strong>Password:</strong> {data.password}
      </p>
      <p className="card-information">
        <strong>Gender:</strong> {data.gender}
      </p>
      <p className="card-information">
        <strong>Country:</strong> {data.country}
      </p>
      <p className="card-information">
        <strong>Terms Accepted:</strong> {data.terms ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default Card;
