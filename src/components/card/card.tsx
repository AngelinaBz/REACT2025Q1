import { FormDataRedux } from '../../types/types';
import './card.css';

interface CardProps {
  data: FormDataRedux;
}

const Card = ({ data }: CardProps) => {
  return (
    <div className="data-card">
      {data.picture && (
        <div>
          <strong>Profile Picture:</strong>
          <img src={data.picture} alt="Profile" className="profile-picture" />
        </div>
      )}
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Age:</strong> {data.age}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Password:</strong> {data.password}
      </p>
      <p>
        <strong>Gender:</strong> {data.gender}
      </p>
      <p>
        <strong>Country:</strong> {data.country}
      </p>
      <p>
        <strong>Terms Accepted:</strong> {data.terms ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default Card;
