import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectItem, unselectItem } from '../../redux/slices/selectedSlice';
import { SelectedPerson } from '../../utils/types';
import './Card.css';

interface CardProps extends SelectedPerson {
  onClick: () => void;
}

const Card = ({ id, name, gender, url, onClick }: CardProps) => {
  const selectedPeople = useAppSelector(
    (state) => state.selected.selectedPeople
  );
  const dispatch = useAppDispatch();
  const isSelected = selectedPeople.some((person) => person.id === id);
  const handleCheckboxChange = () => {
    const personData = { id: id!, name, gender, url };
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
