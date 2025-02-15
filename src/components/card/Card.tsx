import { selectItem, unselectItem } from '../../redux/slices/selectedSlice';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import './Card.css';

interface CardProps {
  id: string | undefined;
  name: string;
  gender: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ id, name, gender, onClick }) => {
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );
  const dispatch = useAppDispatch();
  const isSelected = selectedPeople.some((person) => person.id === id);
  const handleCheckboxChange = () => {
    const personData = { id: id!, name, gender };
    if (isSelected) {
      dispatch(unselectItem(id!));
    } else {
      dispatch(selectItem(personData));
    }
  };
  return (
    <section className="card-container">
      <div className="card-information" onClick={onClick}>
        <h2>{name}</h2>
        <p>{gender}</p>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        readOnly
      />
    </section>
  );
};

export default Card;
