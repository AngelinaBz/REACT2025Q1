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
  const selectedIds = useAppSelector((state) => state.selected.selectedIds);
  const dispatch = useAppDispatch();
  const isSelected = selectedIds.includes(id!);
  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(unselectItem(id!));
    } else {
      dispatch(selectItem(id!));
    }
  };
  return (
    <section className="card-container" onClick={onClick}>
      <h2>{name}</h2>
      <p className="card-container__description">{gender}</p>
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
